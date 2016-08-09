"use strict";


var BaseTable = require('./Base');
var _ = require('underscore');

module.exports =
    class PhotoTable extends BaseTable {

        constructor() {
            super();

            this.schema =
            `
                CREATE TABLE IF NOT EXISTS photo
                (
                    id TEXT PRIMARY KEY,
                    url TEXT,
                    userid TEXT,
                    main BOOLEAN,
                    filename TEXT,
                    extension TEXT,
                    timestamp DATETIME
                );

            `;

            this.query(this.schema);
        }

        insert(userid, photo) {
            return this.query(
                    `
                    INSERT INTO photo VALUES
                        (:id, :url, :userid, :main,
                         :filename, :extension, :timestamp)
                    `,
                    {
                        id: photo.id,
                        url: photo.url,
                        userid: userid,
                        main: photo.main,
                        filename: photo.fileName,
                        extension: photo.extension,
                        timestamp: new Date()
                    }
                );
        }

        insertMultiple(userid, photos) {
            var that = this;
            _.each(photos, (photo) => {
                that.insert(userid, photo);
            });
        }

        select(userid) {
            return this.query(`SELECT * FROM photo
                                WHERE userid = :userid`, {
                userid: userid
            }, {
                main: Boolean
            });
        }
    }



