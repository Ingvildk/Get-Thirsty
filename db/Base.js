"use strict";

var dblite = require('dblite');
var Promise = require('bluebird');
var fs = require('fs');
var db = dblite(':memory:', '-header');

module.exports =
    class BaseTable {
        constructor() {
            this.db = db;
            this.query = Promise.promisify(this.db.query);
        }

        readSchema(filename) {
            return fs.readFileSync(filename).toString();
        }

        close() {
            this.db.close();
        }
}

