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



