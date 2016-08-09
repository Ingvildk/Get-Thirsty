var fs = require('fs');
var jsonfile = require('jsonfile')
var util = require('util')
var alt = require('../alt');

var file = 'data.json'

export default {
    write: function dump() {
        jsonfile.writeFile(file, alt.takeSnapshot(), () => {
            console.log('Dump.');
        });
    },
    read: function read() {
        if (fs.existsSync(file)) {
            try {
                return JSON.stringify(jsonfile.readFileSync(file));
            }
            catch (err){
                return JSON.stringify('{}');
            }
        } else {
            return JSON.stringify('{}');
        }
    }
}
