# social-media-app-api  

### Project Description  
A basic REST API for a social media app with Typescript, Express, TypeORM, SQLite, JWT & Pagination.  

### Functionality  
• Register new users using email/password making sure the user emails are unique for every user  
• Login using email/password and authenticate users using JWTs and refresh tokens  
• Create/edit/delete posts (keeping in mind correct access control e.g. a user can’t delete or edit another user’s posts)  
• Create/edit/delete comments on posts with the same access control concerns as with the posts  
• Get comments of a post (with pagination)  
• Get my posts (with pagination)  
• Get another user's posts (with pagination)  
• Get all the posts on the platform in chronological order (with pagination)  

### Install & Run project
1. Git clone or download project and unzip  
2. Open project folder and run  
```
$ npm install  
```
3. Start server with:  
```
npx ts-node src/index.ts
```
4. Use methods with Postman  

### Class Diagram  
Relations are bydirectional  

![Class Diagram](https://user-images.githubusercontent.com/59121443/177770904-71a6b727-b29d-4576-a53d-b4000f223e63.jpg)

### API Methods  
### Important  
1. Parameters are passed through req.body  
2. In all GET method calls you need to include parameters page (selection of page) & limit (number of objects/page) for pagination  
  
**Methods available for users:**  
  
POST http://localhost:3000/auth/login → Login with email & password  
GET http://localhost:3000/user/user → Get one user with their email  
POST http://localhost:3000/post/post → Create a new post  
PATCH http://localhost:3000/post/post → Edit a post  
DELETE http://localhost:3000/post/post → Delete a post  
GET http://localhost:3000/post/post → Get a user's posts  
GET http://localhost:3000/post/posts →  Get all posts chronologically ordered  
POST http://localhost:3000/comment/comment → Create a new comment  
PATCH http://localhost:3000/comment/comment → Edit a comment  
DELETE http://localhost:3000/comment/comment → Delete a comment  
GET http://localhost:3000/comment/comments → Get all comments of a post  

**Methods available for admin:**  
  
GET http://localhost:3000/user/users → Get all users  
POST http://localhost:3000/user/user → Create new user (to specify role)  
DELETE http://localhost:3000/user/user → Delete a user  


