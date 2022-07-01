import { NextFunction, Request, Response } from 'express';
import { Connect, Query } from '../config/mysql';

const createPost = async (req:Request, res: Response, next: NextFunction) => {
    //to do
}

const getPost = async (req:Request, res: Response, next: NextFunction) => {
    //to do
};

const updatePost = async (req:Request, res: Response, next: NextFunction) => {
    //to do
};

const deletePost = async (req:Request, res: Response, next: NextFunction) => {
    //to do
};

export default { createPost, getPost, updatePost, deletePost };