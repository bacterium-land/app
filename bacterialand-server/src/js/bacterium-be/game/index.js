const util = require('util');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID

// Connection URL
const url = process.env.URI_DB || ''

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true  });
let mongoConnection = null;

module.exports = async function (context, req) {
    console.dir(req)
    console.dir(context)
    context.log('JavaScript HTTP trigger function processed a request.');
    /* connectToMongo()
    .then(connectionToMongo => {
        getGame(context, req)
        .then(() => {
            //..... 
        })
    })
    .catch(err => {

    }) */
    await connectToMongo()
    console.dir('connected to DB');
    if (req.method === 'GET') {
        await getGame(context, req);
    }
    else if (req.method === 'POST'){
        await createGame(context, req);
    }
    else {
        context.res = {
            status: 404,
            body: 'Invalid method'
        };
    }
}

function makeMove() {
    // req.body = {gameid=123, player=p1, move=0,0,1} = {...state}
    // push al array, del gameid, para ese player
        // Que no sea repetido
        // Comprobar limites del tablero
        // Que sea su turno
        // Cambiar turno
        // Anadir move al array
    // recuperar estado del juego
    // comprobamos checks
    // updateamos
    // devolver estado
    /* const result = await db.getCollection('game').findOneAndUpdate({
        _id: ObjectId(req.body.gameId),
        turn: req.body.turn,
        [req.body.turn]: {
            $nin: [req.body.move]
        },
        "8c6c4614-d6a8-c8c2-3dd6-451d397597e0.16": {$exists: false }
    },
    {
        "$set":{
            turn: "8c6c4614-d6a8-c8c2-3dd6-451d397597e0"
        }
    },
    {
        returnDocument: true
    }) */
    if (result) {
        /* 
        context.res = {
        // status: 200, /* Defaults to 200
        body: JSON.stringify({'game-id': insertResult.insertedId.toString()})
    */
    }
}

async function getGame(context, req) {
    const collection = await client.db('bacterium-store').collection('game');
    const gameId = req.query.gameId
    const game = await collection.find({_id: ObjectId(gameId)}).toArray()
    console.dir(`returning ${game.length} doc`);
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: JSON.stringify(game[0] || {})
    };
}

async function createGame(context, req) {
    const collection = await client.db('bacterium-store').collection('game');
    const insertResult = await collection.insertOne({
        turn: req.body.player_id,
        player1: [],
        player2:[]
    })
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: JSON.stringify({'game-id': insertResult.insertedId.toString()})
    };
}

async function connectToMongo() {
    if (!mongoConnection) mongoConnection = await client.connect()
    return mongoConnection
}
