"use strict";


var BaseTable = require('./Base');
var _ = require('underscore');

module.exports =
    class PersonTable extends BaseTable {

        constructor() {
            super();
            this.schema = `
                CREATE TABLE IF NOT EXISTS person
                (
                    id TEXT PRIMARY KEY,
                    bio TEXT,
                    birth_date TEXT,
                    gender INTEGER,
                    name TEXT,
                    ping_time TEXT,
                    distance_mi INTEGER,
                    connection_count INTEGER,
                    common_like_count INTEGER,
                    common_friend_count INTEGER,
                    birth_date_info TEXT,
                    timestamp DATETIME
                )
            `;
            this.query(this.schema);
        }

        insert(person) {
            return this.query(
                    `INSERT INTO person VALUES
                        (:id, :bio, :birth_date, :gender, :name, :ping_time,
                        :distance_mi, :connection_count, :common_like_count,
                        :common_friend_count, :birth_date_info, :timestamp)`, {
                        id: person._id,
                        bio: person.bio,
                        birth_date: person.birth_date,
                        gender: person.gender,
                        name: person.name,
                        ping_time: person.ping_time,
                        distance_mi: person.distance_mi,
                        connection_count: person.connection_count,
                        common_like_count: person.common_like_count,
                        common_friend_count: person.common_friend_count,
                        birth_date_info: person.birth_date_info,
                        timestamp: new Date()
                    }
                );
        }

        insertMultiple(persons) {
            _.forEach(persons, this.insert);
        }

        select(userid) {
            return this.query(`SELECT * FROM person WHERE id = :userid`, {
                userid: userid
            });
        }
    }

