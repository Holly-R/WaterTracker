import express from 'express'
import data from './data.json'

const app = express() 
app.get('/', function(req, res){
    res.send(data)
})
app.get('/search', function(req,res){
    const query = req.query.q as string
    const matchesSearch = function(event){
       return event.drinkType.toLowerCase() === query.toLowerCase()
    }
    res.send(data.events.filter(matchesSearch))
})
app.get('/total', function (req,res){
    let totalAmount = data.events.reduce((accumulator, currentValue) => accumulator + currentValue.amountInMl, 0)
    console.log(totalAmount)

  res.send({total: totalAmount})
})


//    const totalAmountOnDate


app.listen(3000, function(){
    console.log('Hello World!')
})