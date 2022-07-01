import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import routers from './routes/routers';


const app = express();
const port = 3000;

app.use('/', routers);
app.use(bodyParser.json());

const httpServer = http.createServer(app);
httpServer.listen(port);

//$ npx ts-node src/server.ts

/*endpoints
post user (make sure they are unique)
login
post/update/delete posts (keep in mind access control)
post/update/delete comments (keep in mind access control)
get comment of a post
get my posts
get other user's posts
get all the posts chronologically ordered

entities

users (username, password)
posts (title, context)
comments(post-title, username, context)
*/