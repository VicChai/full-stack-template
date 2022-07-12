const express = require('express')
const app = express()
const cors = require('cors')
const { isErrored } = require('stream')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
    dbConnectionString = process.env.DB_STRING,
    db_Name = "sample_mflix",
    collection
    

MongoClient.connect(dbConnectionString)    
    .then(client => {
        console.log('Connected to Database')
        db = client.db(db_Name)
        collection = db.collection('movies')
    })

app.set('view engine', 'ejs')
app.use(express.static('public')) 
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())   

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port`)
})