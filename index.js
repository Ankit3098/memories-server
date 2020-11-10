import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import postRoters from './routes/post.js'


const app = express()
dotenv.config()

app.use(bodyParser.json({limit:"30mb", extended:true }))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true }))
app.use(cors())

app.get('/',(req,res)=>{
    res.send('Hello this is a memories server');
})

app.use('/post',postRoters)

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        app.listen(PORT,()=>console.log('Server is up and running'));
    }).catch(err=>console.log(err.message));

mongoose.set('useFindAndModify', false)