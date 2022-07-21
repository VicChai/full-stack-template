const express = require('express')
const app = express()
const cors = require('cors')
//const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
require('dotenv').config()
const PORT = 8000
const TestModel = require('./models/schema')

// let db,
//     dbConnectionString = process.env.DB_STRING,
//     db_Name = "sample_mflix",
//     collection
    

// MongoClient.connect(dbConnectionString)    
//     .then(client => {
//         console.log('Connected to Database')
//         db = client.db(db_Name)
//         collection = db.collection('movies')
//     })

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_STRING, 
            {useNewUrlParser: true })
        console.log(`Connected to database: ${mongoose.connection.name}`)    
    } catch (err) {
        console.log('Failed to connect', err)
    }
}

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public')) 
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())   

app.get('/', async (request, response)=>{
    try {
        //Get data from DB - specific collection
        //After data is found, then render ejs AND pass the data so that it can render on the page
        const content = await TestModel.find({})
        console.log(content)
        response.render('index.ejs', {contentKey: content})
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port`)
})