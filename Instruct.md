# Node instructions

check versions node -v and npm -v

# Create a file using Command Line Interface

echo. >hello.js

# create Node Server

1. npm init y
2. npm i express multer mssql
3. npm i -D nodemon concurrently
4. in package.json
   "scripts": {
   "start": "node server.js",
   "server": "nodemon server.js --ignore client",
   "client": "npm start --prefix client",
   "clientinstall": "npm install --prefix client",
   "dev": "concurrently \"npm run server\" \"npm run client\""
   },

# create Client App

1. npx create-react-app client
2. npm i -D concurrently
3. in package.json after devDependencies
   "proxy": "http://localhost:5000",
4. npm install @material-ui/core @material-ui/lab @material-ui/icons
5. npm i react-router-dom
6. npm i redux react-redux redux-thunk redux-devtools-extension
   (state management, add redux extension for chrome for debugging purposes.)
7. npm i axios
8. npm i express-fileupload
9. add folder name uploads in public folder
10. fileupload from bradtraversy instructions in Uploader.md
11. npm i file-saver in client folder
12. touch index.js to create file

//IMPORTANT: ginamit ko robo3t na server, open server using NOTES APP - IOS shortcutkeys no.7 instruction, using mongoose model and mongodb database.

//NOTE:
a. https://mongoosejs.com/docs/
b. https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo
c. https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/

13. npm install mongodb or npm install mongodb@3.6 (exact version)
14. npm i mongoose@5.3.16
15. npm i validator@10.9.0
16. npm i bcryptjs jsonwebtoken
17. npm i @sendgrid/mail@6.3.1
