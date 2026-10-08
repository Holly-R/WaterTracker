import express from 'express'
import database from './database';
import { BADFAMILY } from 'dns';

const app = express() 
app.use(express.json())
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

  const query = database.prepare('SELECT SUM(amount_in_ml) AS TotalMl, date(date) AS Date FROM Events GROUP BY date(date)');
  res.send(query.all());
})
app.post('/create', function (req,res){
   const payload = req.body
   const query = database.prepare('INSERT INTO Events(date, amount_in_ml, drink_type) VALUES(?,?,?)')
   //const lookUpQuery = database.prepare('SELECT * FROM Events WHERE date=? AND amount_in_ml=? AND drink_type=?')
   const result = query.run(payload.date, payload.amount_in_ml, payload.drink_type)
   /*const lookUpQueryResult = lookUpQuery.get(payload.date, payload.amount_in_ml, payload.drink_type)
   console.log(lookUpQueryResult)
    res.send(lookUpQueryResult) */
    if (result.changes === 0){
        res.status(500).send('Data creation failure')
    } else {
        res.status(200).send({
           date: payload.date, 
           amount_in_ml: payload.amount_in_ml, 
           drink_type: payload.drink_type,
           id: result.lastInsertRowid
        })
    }
})

app.delete('/delete/:id', function(req,res){
    const deleteRequest = req.params
    console.log(deleteRequest)
    const deleteQuery = database.prepare('DELETE FROM Events WHERE id = ?')
    //const lookUpDeleteQuery = database.prepare("SELECT * FROM Events WHERE date = '2023-09-29'") 
    const queryResult = deleteQuery.run(deleteRequest.id)
    if (queryResult.changes === 0){
        res.status(500).send('Data creation failure')
    } else {
        res.status(200).send()
    }
})


/* rename the end point for create and delete so we have a post endpoint for /events and a delete endpoint for /events 
so you're renaming /create or /delete with /events
then add a get API to get an individual event for a specific ID e.g /events get id  12
read over the documentation on route paramaters 
good luck with an update API - stretch goal - have a look at post vs put documentation 

//    const totalAmountOnDate

*/
app.listen(3000, function(){
    console.log('Hello World!')
})