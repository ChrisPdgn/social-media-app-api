import mysql from 'mysql';
import { resolve } from 'path';

const params = {
    host: 'localhost',
    user: 'hbstudent',
    password: 'changeit',
    database: 'mobile_app_db',
    insecureAuth : true
};


const Connect = async () =>
    new Promise<mysql.Connection>((resolve, reject) => {
        const connection = mysql.createConnection(params);

        connection.connect((error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(connection);
        });
    });

const Query = async (connection: mysql.Connection, query: string) =>
    new Promise((resolve, reject) => {
        connection.query(query, connection, (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(result);
        });
    });

export { Connect, Query };