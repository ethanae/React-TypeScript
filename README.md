# A small React and TypeScript-based application demonstrating their integration as well as integration with MongoDB through Mongoose.

## React, TypeScript, Mongoose, Express

# Setup
### Note: you need to include a .env file in your project root with a valid MongoDB connection string and a collection name.

### .env
```
DB_CONN_STRING=<your_mongodb_connection>
COLL_NAME=<your_collection_name>
```

`npm install`

### To run the front-end
`npm run client`

### To the run server
`npm run server`

### Run both client and server in development
`npm run dev`
###### The front-end will be served from `localhost:8080`, Webpack will proxy API requests to `localhost:3000` where the NodeJS back-end is running.

### Run both client and server in production
`npm run prod`

### Tests
`npm test`