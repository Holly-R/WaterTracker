import { Request, Response } from 'express';
import database from '../database';
import { findEvent } from '../helpers/findEvent';

function putEvent (req: Request,res: Response){
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
            id: parseInt(req.params.id as string, 10)
            })
        }
    } else {
        res.status(404).send('Event not found')
    }
}

export { putEvent }