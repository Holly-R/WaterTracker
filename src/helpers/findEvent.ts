import { Request, Response } from 'express';
import { DatabaseSync } from 'node:sqlite';

function findEvent (database: DatabaseSync, req: Request){
    const retrieveId = req.params
    const idQuery = database.prepare('SELECT * FROM Events WHERE id = ?')
    const idQueryResult = idQuery.get(retrieveId.id as string)
    return idQueryResult
}

export { findEvent }