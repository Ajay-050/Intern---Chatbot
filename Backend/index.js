const port = 4000

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const axios = require('axios')
const cors = require('cors')

app.use(cors())
app.use(express.json())

// mongoose.connect("mongodb+srv://ajaybanoth693:h5BpZnyojAwbgLqb@cluster0.unc7b3a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/chatbot")

const msgSchema = {
    text: String,
    sender: String,
}

const Message = mongoose.model('Message',msgSchema)


app.post("/sendmsg", async (req,res)=>{

    const {text,sender} = req.body

    const userText = new Message({
        text:text,
        sender:sender,
    })

    // userText.save()

    try{
        const response = await axios.post('http://localhost:5005/webhooks/rest/webhook',{
            message:text,
            sender:sender,
        })

        const rasaResponse = response.data

        // console.log(rasaResponse[0])
        
        const botText = new Message({
            text:rasaResponse[0].text,
            sender:'Bot'
        })
        // botText.save()

        // let messages = await Message.find({})
        // console.log(messages)
        res.send(botText)
    }
    catch{
        console.error("Error communicating with Rasa");
        res.status(500).send("Error communicating with Rasa");
    }
})

app.listen(port,(error)=>{
    if(!error){
        console.log("Sever is up and running")
    }
    else{
        console.log(error)
    }
})