const util = require('util');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID

// Connection URL
const url = process.env.URI_DB || ''

// Create a new MongoClient
const client = new MongoClient(url, {useNewUrlParser: true});
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
    } else if (req.method === 'POST') {
        await createGame(context, req);
    } else if (req.method === 'PUSH') {
        await updateGame(context, req);
    } else {
        context.res = {
            status: 404,
            body: 'Invalid method'
        };
    }
}

/**
 * Funtions of that does part of the validatio of update board
 *  *  @see  updateGame
 * */
function makeMove(context, req) {
    /* Mock
     * req.body = {gameid=123, player=p1, move=0,0,1} = {...state}
     * push al array, del gameid, para ese player */

    // 1 Que no sea repetido
    // 2 Comprobar limites del tablero
    // 3 Que sea su turno
    // Si se cumplen todas devuelve true


    // Doesn't exists
    let existQuery = getGame(req);
    if (existQuery == null) {
        // Not duplicated

        let dims = req.body.move;
        //TODO to add the data in the model
        //Check of size constraints this is just test I know it should be done by the query
        if (dims[0] >= 0 && dims[0] < req.body.board.size.x) {
            if (dims[1] >= 0 && dims[1] < req.body.board.size.y) {
                if (req.body.turn == existQuery.turn) {

                }
            }
        }
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
        player2: []
    })
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: JSON.stringify({'game-id': insertResult.insertedId.toString()})
    };
}


/**
 * All Conditions
 *  Condiciones 1, 2, 3
 *  1 Que no sea repetido
 *  2 Comprobar límites del tablero
 *  3 Que sea su turno
 *  @see  makeMove
 *
 *  Si se cumplen todas devuelve true
 *
 *  In this method
 *  4 Cambiar turno
 *  5 Añadir move al array
 *  6 recuperar estado del juego
 *  7 comprobamos checks
 *  8 updateamos
 *  9 devolver estado
 *
 * @param context
 * @param req
 * @returns {Promise<void>}
 */
async function updateGame(context, req) {

    if (makeMove(context, req)) {
        /*
          4 Cambiar turno
          5 Añadir move al array
          6 recuperar estado del juego
          7 comprobamos checks
          8 updateamos
          9 devolver estado */

        let parser = ''.concat(turn, '16');
        const collection = await client.db('bacterium-store').collection('game');
        collection.findOneAndUpdate({
                _id: ObjectId(req.body.gameId),
            // How add the 5 6 7 an seven checks?
                turn: req.body.turn,
                turn: {
                    $nin: req.body.move
                },
                parser: {$exists: false}
            },
            {
                "$set": {

                    turn: req.body.turn
                }
            },
            {
                returnDocument: true
            })
    }

    const updateResult = await Collection.prototype.updateOne({
        turn: req.body.player_id,
        player1: [],
        player2: []
    })
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: JSON.stringify({'game-id': updateResult.status.toString()})
    };
}


async function connectToMongo() {
    if (!mongoConnection) mongoConnection = await client.connect()
    return mongoConnection
}
