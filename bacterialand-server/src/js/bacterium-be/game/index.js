const util = require('util');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID

// Connection URL
const url = process.env.URI_DB || ''

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true  });
const mongoConnect = util.promisify(client.connect).bind(client);
let mongoConnection = null;

module.exports = async function (context, req) {
    console.dir(context)
    context.log('JavaScript HTTP trigger function processed a request.');
    await connectToMongo()
    const collection = await client.db('bacterium-store').collection('game');
    console.dir('connected to DB');
    const gameId = req.query.gameId
    const game = await collection.find({_id: ObjectId(gameId)}).toArray()
    // client.close();
    console.dir(`returning ${game.length} doc`);
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: JSON.stringify(game[0] || {})
    };
}

async function connectToMongo() {
    if (!mongoConnection) mongoConnection = await mongoConnect()
    return mongoConnection
}
