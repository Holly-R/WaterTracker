import { Request, Response } from 'express';
import database from '../database';

function getAllEvents (req: Request, res: Response){
    const query = database.prepare('SELECT * FROM Events');
    res.send(query.all());
}

export {getAllEvents}