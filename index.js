const express = require('express')
const {MongoClient,ServerApiVersion} = require('mongodb')
require('dotenv').config()
const app = express()
const port = 5000




const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env. DB_PASSWORD}@cluster0.icyvogv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.icyvogv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    try{ await client.connect()
        await client.db('admin').command({ping:1});
        console.log('Ping your debplment, you sucessfully connect your mongodb')
    }
    finally{}
    
}

run().catch( console.dir)

app.get('/', (req, res) => {
    res.send('server is rouning')
})



app.listen(port, () => {
    console.log(`server is : ${port}`)
})