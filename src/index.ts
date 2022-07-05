import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/user";
import { Post } from "./entity/post";
import { Comment } from "./entity/comment";
import routes from "./routes/index";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./data/social-media-app",
    entities: [User, Post, Comment],
    migrations: ['./migration/**/*.ts'],
    synchronize: true,
    logging: true
})

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(async connection => {
        console.log("Initialized!!");
        const app = express();

        app.use(cors());
        app.use(helmet());
        app.use(bodyParser.json());

        //Set all routes from routes folder
        app.use("/", routes);

        app.listen(3000, () => {
            console.log("Server started on port 3000!");
        });
    })
    .catch((error) => console.log(error))

export {AppDataSource};

