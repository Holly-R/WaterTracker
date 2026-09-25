import express from 'express'
import database from './database';

const app = express() 
app.get('/', function(req, res){
    const query = database.prepare('SELECT * FROM Events');
    res.send(query.all());
})
/*app.get('/search', function(req,res){
    const query = req.query.q as string
    const matchesSearch = function(event){
       return event.drinkType.toLowerCase() === query.toLowerCase()
    }
    res.send(data.events.filter(matchesSearch))
}) */
app.get('/total', function (req,res){
    //let totalAmount = data.events.reduce((accumulator, currentValue) => accumulator + currentValue.amountInMl, 0)

  //res.send({total: totalAmount})

  const query = database.prepare('SELECT SUM(amount_in_ml) FROM Events GROUP BY date');
  res.send(query.all());
})
/*
redo the above using the database connection and SQL (lines 16-21) - can use the sqlite website to practice/try out sql requests first 

SELECT x FROM Events amount_in_ml

//    const totalAmountOnDate

*/
app.listen(3000, function(){
    console.log('Hello World!')
})