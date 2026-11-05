import express from 'express'
import database from './database';
import { BADFAMILY } from 'dns';

function createNewEvent (req,res){
   const payload = req.body
   const query = database.prepare('INSERT INTO Events(date, amount_in_ml, drink_type) VALUES(?,?,?)')
   const result = query.run(payload.date, payload.amount_in_ml, payload.drink_type)
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
}

function findEvent (req){
    const retrieveId = req.params
    const idQuery = database.prepare('SELECT * FROM Events WHERE id = ?')
    const idQueryResult = idQuery.get(retrieveId.id)
    return idQueryResult
}

const app = express() 
app.use(express.json())
app.get('/events', function(req, res){
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

app.post('/events', createNewEvent)

app.delete('/events/:id', function(req,res){
    const deleteRequest = req.params
    console.log(deleteRequest)
    const deleteQuery = database.prepare('DELETE FROM Events WHERE id = ?')
    const queryResult = deleteQuery.run(deleteRequest.id)
    if (queryResult.changes === 0){
        res.status(500).send('Data creation failure')
    } else {
        res.status(200).send()
    }
})

app.get('/events/:id', function(req,res){
    const idQueryResult = findEvent(req)
    if (idQueryResult) {
 res.send(idQueryResult)
    } else {
        res.status(404).send()
    }
   
})

app.put('/events', createNewEvent)

app.put('/events/:id', function(req,res){
    const event = findEvent(req)
    if (event){
        const payload = req.body
        const query = database.prepare('UPDATE Events SET date = ?, amount_in_ml = ?, drink_type = ? WHERE id = ?')
        const result = query.run(payload.date, payload.amount_in_ml, payload.drink_type, req.params.id)
        if (result.changes === 0){
            res.status(500).send('Update failed')
        } else {
            res.status(200).send({
            date: payload.date, 
            amount_in_ml: payload.amount_in_ml, 
            drink_type: payload.drink_type,
            id: parseInt(req.params.id, 10)
            })
        }
    } else {
        res.status(404).send('Event not found')
    }
})

export {app}
