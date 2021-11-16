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
        app.delete( '/products/:id', async ( req, res ) => {
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


app.get( '/', ( req, res ) => {
    res.send( 'Running my server from mongoDB' )
} )

app.listen( port, () => {
    console.log( `Example app listening at http://localhost:${port}` )
} )