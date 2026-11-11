import { Request, Response } from 'express';
import database from '../database';

function findEvent (req: Request){
    const retrieveId = req.params
    const idQuery = database.prepare('SELECT * FROM Events WHERE id = ?')
    const idQueryResult = idQuery.get(retrieveId.id as string)
    return idQueryResult
}

export { findEvent }