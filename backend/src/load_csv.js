const fs = require('fs')
const { finished } = require('stream/promises');
const parse = require('csv-parse');
const mongoose = require('mongoose')
const Drug = require('./schemas/Drug');


async function loadCSV() {
    const results = [];

    const parser = fs.createReadStream(`${__dirname}/../data.csv`)
    .pipe(parse({
        columns: true,
        delimiter: ','
    }));
    
    parser.on('readable', () => {
        let record;
        while (record = parser.read()) {
            results.push(record);
        }
    })

    parser.on('error', function() {
        console.error(err.message)
    })

    await finished(parser);
    return results;
}

async function insertData(data) {
    for (const res of data ) {
      const query = {id: res.id};
      await Drug.updateOne(query, res, {upsert: true});
    }

}


module.exports = {loadCSV, insertData};