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

async function services() {
    try {
        await client.connect();
        const database = client.db( 'assignment12' );
        const welcomeCollection = database.collection( 'welcome' );


    }
    finally {
        // await client.close();
    }
}

services().catch( console.dir );


app.get( '/', ( req, res ) => {
    res.send( 'Running my CRUD server , Form My heart, hey you' )
} )

app.listen( port, () => {
    console.log( `Example app listening at http://localhost:${port}` )
} )