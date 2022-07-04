import "reflect-metadata";
import { DataSource } from "typeorm"
import { User } from "./entity/user"
import { Post } from "./entity/post"
import { Comment } from "./entity/comment"

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./data/social-media-app",
    entities: [User, Post, Comment],
    synchronize: true,
    logging: true
})

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(() => {
        console.log("Initialized!!");
    })
    .catch((error) => console.log(error))