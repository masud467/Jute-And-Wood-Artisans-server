const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 6001;

// 
// 

// middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.SECRET_USER}:${process.env.SECRET_PASS}@cluster0.uoysey8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    const productCollection = client.db("productDB").collection("product")
    const userCollection = client.db("userDB").collection("user")

    app.post('/user',async(req,res)=>{
      const user = req.body
      console.log(user)
      const result = await userCollection.insertOne(user)
      res.send(result)
    })

    app.get('/user', async(req,res)=>{
      const cursor = userCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.post('/item',async(req,res)=>{
      const newItem = req.body
      console.log(newItem)
      const result = await productCollection.insertOne(newItem)
      res.send(result)
    })

    app.get('/item',async(req,res)=>{
      const cursor = productCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/myProduct/:email',async(req,res)=>{
      console.log(req.params.email)
      const result = await productCollection.find({email:req.params.email}).toArray()
      res.send(result)
    })

    app.delete('/item/:id',async(req,res)=>{
      const id = req.params.id
      const query = {_id:new ObjectId(id)} 
      const result = await productCollection.deleteOne(query)
      res.send(result)

    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);


app.get('/', (req, res) => {
  res.send('jute and wood artisan is running this server')
})

app.listen(port, () => {
  console.log(`jute and wood artisan running  on port ${port}`)
})