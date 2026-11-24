import { Request, Response } from 'express';
import { DatabaseSync } from 'node:sqlite';
import { findEvent } from '../helpers/findEvent';

function getEventById (database: DatabaseSync, req: Request,res: Response){
    const idQueryResult = findEvent(database, req)
    if (idQueryResult) {
 res.send(idQueryResult)
    } else {
        res.status(404).send()
    }
}

export { getEventById }