const express = require( 'express' );
const { MongoClient } = require( 'mongodb' );
const ObjectId = require( 'mongodb' ).ObjectId;

const cors = require( 'cors' );
require( 'dotenv' ).config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use( cors() );
app.use( express.json() );

// password     BpYE6bSOn8P70NAg BpYE6bSOn8P70NAg
// userName  mydbuser2
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9mcb6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology: true } );

async function products() {
    try {
        await client.connect();
        const database = client.db( 'hero' );
        const productsCollection = database.collection( 'products' );

        // GET API
        app.get( '/products', async ( req, res ) => {
            const cursor = productsCollection.find( {} );
            const products = await cursor.toArray();
            res.send( products );
        } );

        // GET Single Service
        app.get( '/products/:id', async ( req, res ) => {
            const id = req.params.id;
            const query = { _id: ObjectId( id ) };
            const product = await productsCollection.findOne( query );
            res.json( product );
        } )

        // POST API
        app.post( '/products', async ( req, res ) => {
            const product = req.body;
            const result = await productsCollection.insertOne( product );
            res.json( result )
        } );

        // DELETE API
        app.delete( '/deleteProduct/:id', async ( req, res ) => {
            const id = req.params.id;
            const query = { _id: ObjectId( id ) };
            const result = await productsCollection.deleteOne( query );
            res.json( result );
        } )
    }
    finally {
        // await client.close();
    }
}

products().catch( console.dir );

async function users() {
    try {
        await client.connect();
        const database = client.db( 'hero' );
        const userCollection = database.collection( 'user' );

        // GET API
        app.get( "/user/:email", async ( req, res ) => {
            const result = await userCollection
                .find( { email: req.params.email } )
                .toArray();
            res.send( result );
        } );

        app.get( '/user', async ( req, res ) => {
            const user = userCollection.find( {} );
            const review = await user.toArray();
            res.send( review );
        } );

        // POST API
        app.post( '/user', async ( req, res ) => {
            const user = req.body;
            const result = await userCollection.insertOne( user );
            res.json( result )
        } );



    }
    finally {
        // await client.close();
    }
}

users().catch( console.dir );


async function reviews() {
    try {
        await client.connect();
        const database = client.db( 'hero' );
        const reviewCollection = database.collection( 'review' );

        // GET API
        app.get( '/reviews', async ( req, res ) => {
            const cursor = reviewCollection.find( {} );
            const review = await cursor.toArray();
            res.send( review );
        } );

        // POST API
        app.post( '/reviews', async ( req, res ) => {
            const product = req.body;
            const result = await reviewCollection.insertOne( product );
            res.json( result )
        } );

    }
    finally {
        // await client.close();
    }
}

reviews().catch( console.dir );

async function carusel() {
    try {
        await client.connect();
        const database = client.db( 'hero' );
        const caruselCollection = database.collection( 'carusel' );

        // GET API
        app.get( '/carusel', async ( req, res ) => {
            const cursor = caruselCollection.find( {} );
            const carusel = await cursor.toArray();
            res.send( carusel );
        } );

    }
    finally {
        // await client.close();
    }
}

carusel().catch( console.dir );


// purchease data base 
async function purchase() {
    try {
        await client.connect();
        const database = client.db( 'hero' );
        const purchaseCollection = database.collection( 'purchese' );

        // cofirm order
        app.post( "/purchase", async ( req, res ) => {
            const result = await purchaseCollection.insertOne( req.body );
            res.send( result );
        } );

        // my confirmOrder

        app.get( "/myOrders/:email", async ( req, res ) => {
            const result = await purchaseCollection
                .find( { email: req.params.email } )
                .toArray();
            res.send( result );
        } );

        /// delete order
        app.delete( "/deleteOrder/:id", async ( req, res ) => {
            const result = await purchaseCollection.deleteOne( {
                _id: ObjectId( req.params.id ),
            } );
            res.send( result );
        } );

        // all order
        app.get( "/allOrders", async ( req, res ) => {
            const result = await purchaseCollection.find( {} ).toArray();
            res.send( result );
        } );

    }
    finally {
        // await client.close();
    }
}

purchase().catch( console.dir );




app.get( '/', ( req, res ) => {
    res.send( 'Running my server from mongoDB' )
} )

app.listen( port, () => {
    console.log( `Example app listening at http://localhost:${port}` )
} )