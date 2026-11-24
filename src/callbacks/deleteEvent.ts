import { Request, Response } from 'express';
import { DatabaseSync } from 'node:sqlite';

function deleteEvent (database: DatabaseSync, req: Request,res: Response){
    const deleteRequest = req.params
    console.log(deleteRequest)
    const deleteQuery = database.prepare('DELETE FROM Events WHERE id = ?')
    const queryResult = deleteQuery.run(deleteRequest.id as string)
    if (queryResult.changes === 0){
        res.status(500).send('Data creation failure')
    } else {
        res.status(200).send()
    }
}

export { deleteEvent }