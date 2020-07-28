const express = require('express')
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const { miniql } = require("miniql");
const port = 3000;

//
// This function is the main entry point for the backend.
//
async function main() {

    //
    // Connect to the database.
    //
    const dbHost = process.env.DBHOST || "mongodb://localhost:27017";
    const client = await mongodb.MongoClient.connect(dbHost);
    const db = client.db("starwars");
    const speciesCollection = db.collection("species");
    const planetCollection = db.collection("planet");

    const app = express();

    //
    // Parses HTTP request body as JSON.
    //
    app.use(bodyParser.json());

    //
    // Serves static files from the "public" sub-directory.
    //
    app.use(express.static("public"));

    //
    // Create a query resolver that can load entities from MongoDB.
    //
    const queryResolver = {
        //
        // Gets entities from the database.
        //
        get: {
            species: {
                invoke: (args, context) => { // Gets species entity or entites from the database.
                    if (args.id !== undefined) {
                        return speciesCollection.findOne({ id: new mongodb.ObjectID(args.id) });
                    }
                    else if (args.name !== undefined) {
                        return speciesCollection.findOne({ name: args.name });
                    }
                    else {
                        return speciesCollection.find().toArray(); //TODO: paginate.
                    }
                },

                nested: {
                    homeworld: { 
                        invoke: (parent, args, context) => { // Resolves nested "homeworld" entity.
                            return planetCollection.findOne({ name: parent.homeworld });
                        },
                    },
                },
            },

            planet: {
                invoke: (args, context) => { // Gets planet entity or entites from the database.
                    if (args.id !== undefined) {
                        return planetCollection.findOne({ id: new mongodb.ObjectID(args.id) });
                    }
                    else if (args.name !== undefined) {
                        return planetCollection.findOne({ name: new mongodb.ObjectID(args.name) });
                    }
                    else {
                        return planetCollection.find().toArray(); //TODO: paginate.
                    }
                },

                nested: {
                    species: { 
                        invoke: (parent, args, context) => { // Resolves nested "species" entities.
                            return speciesCollection.find({ homeworld: parent.name }).toArray();
                        },
                    },
                },
           },
        },

        //
        // Update entities in the database.
        //
        update: {
            species: {
                invoke: async (args, context) => {
                    await speciesCollection.updateOne(
                        { name: args.name }, 
                        { 
                            $set: args.set,
                        }
                    );
                },
            },

            planet: {
                invoke: async (args, context) => {
                    await planet.updateOne(
                        { name: args.name }, 
                        { 
                            $set: args.set,
                        }
                    );
                },
            },
        },
    };
    
    //
    // HTTP POST route for queries.
    //
    app.post("/query", (req, res) => {
       
        miniql(req.body.query, queryResolver, {})
            .then(queryResult => {
                res.json({
                    data: queryResult,
                });
            })
            .catch(err => {
                console.error("Query failed.");
                console.error(err && err.stack || err);
                res.sendStatus(500); // Return error code to the browser.
            });
    });
    
    //
    // Start the web server.
    //
    app.listen(port, () => {
        console.log(`Point your web browser at http://localhost:${port}`);
    });
}

//
// Starts the backend.
//
main()
    .then(() => {
        console.log("Server online.");
    })
    .catch(err => {
        console.error("Server failed to start.");
        console.error(err && err.stack || err);
    });
