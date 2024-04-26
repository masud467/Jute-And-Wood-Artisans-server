const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 6001;

// Wooden-Crafts
// e73uVXqPTRKOnOtn

// middleware
app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://Wooden-Crafts:e73uVXqPTRKOnOtn@cluster0.uoysey8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('jute and wood artisan is running this server')
})

app.listen(port, () => {
  console.log(`jute and wood artisan running  on port ${port}`)
})