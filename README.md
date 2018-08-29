## MERN Stack Dev Connector
Built using **MongoDB**, **Express JS**, **React JS/Redux**, **Node JS**

## Check it in Heroku:
[devConnector](http://react-node-nosql.herokuapp.com/)

## To Run in Your Computer:
Follow the below steps

    git clone https://github.com/arjunkesava/mern_dev.git
    cd mern_dev		// Project Root Directory
    npm install     // <-- Install Node dependencies
    cd client		// <-- Go to React client
	npm install		// <-- Install React dependencies
	cd ../			// <-- Go back to server (mern_dev)
	npm run dev		// <-- Check Database Configuration below and run this command

## Database Configuration:
I had used [mLab](https://mlab.com/)  (mLab is the leading Database-as-a-Service for MongoDB).
Steps to run configure mLab

 1. Visit https://mlab.com/
 2. Create a free account (mLab gives you 500Mb Sandbox for free)
 3. It will give you a mongoURI like "mongodb://\<username>:\<password>@\<databasedomain>:\<port>/\<database>"
 4. And also secret key will be provided to you in mLab account
 5. Create a file named "**key_dev.js**" at "./config/<key_dev.js>"
 6. Write the above generated keys in it (example given below).
  ```
   module.exports = {
	mongoURI: "mongodb://<username>:<password>@<databasedomain>:<port>/<database>",
	secretKey: "<secret-key>"
   }
   ```

## Authorization
For Private API`s, I used [JWT-Bearer](https://jwt.io/introduction/) Token and passport js	

## Issues/Bugs:

I know some minor bugs (which will surprice you) when I`m writing this markdown, even if you find them just raise an issue [here](https://github.com/arjunkesava/mern_dev/issues/new)

## Packages | Dependencies
> For Node JS - Server
> 
| Name | Version |
|--|--|
|bcryptjs | ^2.4.3|
|body-parser | ^1.18.3|
|concurrently | ^3.5.1|
|express | ^4.16.3|
|gravatar | ^1.6.0|
|jsonwebtoken | ^8.2.1|
|mongoose | ^5.1.1|
|passport | ^0.4.0|
|passport-jwt | ^4.0.0|
|validator | ^10.2|

> For React - Client
> 
|  |  |
|--|--|
| axios | ^0.18.0 |
| classnames | ^2.2.6 |
| jwt-decode | ^2.2.0 |
| moment | ^2.22.2 |
| react | 6.4.0 |
| react-dom | 6.4.0 |
| react-moment | ^0.7.9 |
| react-redux | ^5.0.7 |
| react-router-dom | ^4.2.2 |
| react-scripts | 1.1.4 |
| redux | ^4.0.0 |
| redux-thunk | ^2.3.0 |
