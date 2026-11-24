import { Request, Response } from 'express';
import { DatabaseSync } from 'node:sqlite';

function getAllEvents (database: DatabaseSync, res: Response){
    const query = database.prepare('SELECT * FROM Events');
    res.send(query.all());
}

export {getAllEvents}