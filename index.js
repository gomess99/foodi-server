const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 6001;
require("dotenv").config();


// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Devlopers!");
});

// mongodb config

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodi-cluster.xrmfk.mongodb.net/?retryWrites=true&w=majority&appName=demo-foodi-cluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");

    // database & collections
    const menuCollections = client.db("demo-foodi-client").collection("menus")
    const cartCollections = client.db("demo-foodi-client").collection("cartItems")


    // all menu items operations
    app.get('/menu', async(req, res)=>{
        const result = await menuCollections.find().toArray();
        res.send(result)

    })

    // all carts operations


    //posting cart to db
    app.post('/carts', async(req, res) =>{
        const cartItem = req.body;
        const result = await cartCollections.insertOne(cartItem);
        res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  }catch (error){
    console.error("Failed to connect to MongoDB:", error);
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
