import express from 'express'
import database from './database';
import { getAllEvents } from './callbacks/getAllEvents';
import { createNewEvent } from './callbacks/createNewEvent';
import { deleteEvent} from './callbacks/deleteEvent';
import { getEventById } from './callbacks/getEventsById';
import { putEvent } from './callbacks/putEvent';

const app = express() 
app.use(express.json())
app.get('/events', (req, res) => getAllEvents(database, res))
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

app.post('/events', (req, res) => createNewEvent(database, req, res))

app.delete('/events/:id', (req, res) => deleteEvent(database, req, res))

app.get('/events/:id', (req, res) => getEventById(database, req, res))

app.put('/events', (req, res) => createNewEvent(database, req, res))

app.put('/events/:id', (req, res) => putEvent(database, req, res))

export {app}
