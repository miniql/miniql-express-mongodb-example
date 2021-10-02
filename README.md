# MiniQL - Express and MongoDB example

An example of MiniQL - the tiny JSON-based query language inspired by GraphQL.

This example shows how to run [MiniQL](https://www.npmjs.com/package/miniql) queries against a MongoDB database.

Example [Star Wars data is courtesy of Kaggle](https://www.kaggle.com/jsphyg/star-wars/data).

Any problems? Please log an issue on this repo.

Love this? Please [star the repo](https://github.com/miniql/miniql) and [support my work](https://www.codecapers.com.au/about#support-my-work)

# Setup

## Prerequisites

To run this example you need, either:
- Docker and Docker Compose installed; or
- Vagrant and VirtualBox installed; or
- Node.js and MongoDB installed.

See below for set up instructions.

Once you are setup please skip to the last section to see what you can do.


## Set up for Docker / Docker Compose

This is the easiest way to run this example.

You already have Docker and Docker Compose installed.

Open a terminal and run the following commands:

```bash
cd miniql-express-mongodb-example
docker-compose up --build
```

You have a MongoDB available on mongodb://localhost:27017.

The frontend is available on http://localhost:3000.

## Set up for Vagrant / VirtualBox

This is the 2nd easiest way to run this example.

You already have Vagrant and VirtualBox installed, open a terminal and start by booting up the Vagrant virtual machine:

```bash
cd miniql-express-mongodb-example
vagrant up
```

After the virtual machine has started, open a terminal to it:

```bash
vagrant ssh
```

Now start the example with Docker Compose:

```bash
docker-compose up --build
```

You have a MongoDB available on mongodb://localhost:5000.

The frontend is available on http://localhost:3000.

## Set up for Node.js / MongoDB

This is the most difficult option, because you have to load the data into your own MonogoDB database.

You already have Node.js and MongoDB installed.

Use `mongoimport` to load the JSON files from `./db-fixture/fixtures` into your database. You can see examples of this command in `./db-fixture/Dockerfile`.

Now install npm dependencies and start the HTTP server:

```bash
cd miniql-express-mongodb-example
npm install
npm start
```

# Testing it out

After starting the example application check out the frontend at http://localhost:3000.

It makes a REST API call to the backend to execute a MiniQL query. The result of the query is rendered in the web browser. It's a list of Star Wars planets with a sublist of each planet's native specis.

Please also check out the files `query-test.http` and `update-test.http` these contain a bunch of HTTP requests for queries that you can invoke using the Visual Studio Code plugin [Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) (check it out - it's awesome!).

Don't forget to [star the repo](https://github.com/miniql/miniql) and [follow the developer on Twitter](https://twitter.com/ashleydavis75).
