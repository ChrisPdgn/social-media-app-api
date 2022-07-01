import { NextFunction, Request, Response } from 'express';
import { Connect, Query } from '../config/mysql';

const createUser = async (req:Request, res: Response, next: NextFunction) => {
    //to do
};

const getUser = async (req:Request, res: Response, next: NextFunction) => {
    let username = req.params.username
    let query = `SELECT * FROM users WHERE username = "${username}"`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    connection.end();
                });
        });
};

export default { createUser, getUser };