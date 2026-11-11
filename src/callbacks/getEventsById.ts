import { Request, Response } from 'express';
import database from '../database';
import { findEvent } from '../helpers/findEvent';

function getEventById (req: Request,res: Response){
    const idQueryResult = findEvent(req)
    if (idQueryResult) {
 res.send(idQueryResult)
    } else {
        res.status(404).send()
    }
}

export { getEventById }