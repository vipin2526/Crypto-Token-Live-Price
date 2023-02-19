const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb+srv://root:root@cluster0.oovckw5.mongodb.net/test')
const dbname = 'cloud';

async function dbconnect() {
    const result = await client.connect()
    const db = result.db(dbname);
    return db.collection('price')
}
module.exports = dbconnect;