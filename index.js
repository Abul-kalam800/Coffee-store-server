const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.icyvogv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.icyvogv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {

    try {
        await client.connect()

        const collectionCoffees = client.db('coffeesdb').collection('coffee')

        app.get('/coffees', async (req, res) => {
            const coursor = collectionCoffees.find()
            const result = await coursor.toArray();
            res.send(result)
        })

        app.get('/coffees/:id', async (req, res) => {

            const coursor =await collectionCoffees.findOne({_id:new ObjectId(req.params.id)})
           
            res.send(coursor)
        })


        app.post('/coffees', async (req, res) => {
            const coffdata = req.body;
            console.log(coffdata);
            const result = await collectionCoffees.insertOne(coffdata);
            res.send(result)
        })

        app.put('/coffees/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updateobj = req.body;
            const updateDoc = {
                $set: updateobj
                
            }
            const result = await collectionCoffees.updateOne(filter, updateDoc, options)
            res.send(result)

        })

        app.delete('/coffees/:id', async (req, res) => {
            const id = req.params.id;
            const queary = { _id: new ObjectId(id) }
            const result = await collectionCoffees.deleteOne(queary)
            res.send(result)
        })

        await client.db('admin').command({ ping: 1 });
        console.log('Ping your debplment, you sucessfully connect your mongodb')
    }
    finally {


    }

}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('server is rouning')
})



app.listen(port, () => {
    console.log(`server is : ${port}`)
})