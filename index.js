const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000
// middlewre 
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ep562.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)
async function run() {
    try {
        await client.connect();
        const database = client.db("todoDB");
        const todoCollection = database.collection("todo_planner");
        // post api
        app.post('/mytodo', async(req, res) => {
            const newList = req.body;
            console.log(newList)
            const result = await todoCollection.insertOne(newList)
            console.log(result)
            res.json(result)
        })

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})