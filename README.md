# Build Node.js RESTful API with JSON Web Token

## Demo

![Demo](demo.PNG)

## Using

#### Json Web Token :custard:

> Use JWT to verify actions :memo:
#### RESTful API :speaker:

> Connected Frontend & Backend with RESTful API :heart:

#### Separate Frontend & Backend  :airplane:

> Frontend(React.js) & Backend(Node.js) separate structure :zap:

#### MVC structure :hammer:

> Modal-View-Controller structure in both frontend & backend :rocket:

#### React Component lifecycle

> Using Hooks to achieve lifecycle of React function components :ocean:

#### faker.js

> random generate user and post and comment :rabbit:

## What I learned from this project

1. How to design a RESTful API
2. Usage of JSON web token
3. Improve Coding Style by design MVC structure

## How 2 install

Install modules

```
npm install
```

Add environment variable

```
DATA_BASEURI=YOUR_MONGODB_URI
SECRET_JWT=YOUR_TOKEN_SECRET_KEY
```

You can generate secret key by running "crypto_generator.js" file

```
node crypto_generator
```

## Run Server

Now You can run the server and see it on localhost:3000

```
npm start
```

## Update React

#### You can customize your frontend in client folder !

Customize React ( you should open second terminal to run backend while dev !)

```
// terminal 1 (React)
cd client
npm start

// terminal 2 (Node.js)
npm start
```

After dev, Build frontend before deploy !

```
// at client folder
npm run build
```

Done ! Now You can run the server and see it on localhost:3000

```
npm start
```




