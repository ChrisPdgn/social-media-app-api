import { NextFunction, Request, Response } from 'express';
import { Connect, Query } from '../config/mysql';

const createComment = async (req:Request, res: Response, next: NextFunction) => {
    //to do
}

const getComment = async (req:Request, res: Response, next: NextFunction) => {
    //to do
};

const updateComment = async (req:Request, res: Response, next: NextFunction) => {
    //to do
};

const deleteComment = async (req:Request, res: Response, next: NextFunction) => {
    //to do
};

export default { createComment, getComment, updateComment, deleteComment };