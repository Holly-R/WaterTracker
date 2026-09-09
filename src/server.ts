import express from 'express'

const app = express() 
app.get('/', function(req, res){
    res.send('My First API')
})
app.listen(3000, function(){
    console.log('Hello World!')
})