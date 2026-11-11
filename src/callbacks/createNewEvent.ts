import { Request, Response } from 'express';
import database from '../database';

function createNewEvent (req: Request,res: Response){
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

export { createNewEvent }