# API Recipes

API to CRUD Recipes, categories and users, with GraphQL and Apollo Server

<a href=""> <p>API RECIPES</p> 
<img style="max-width:700px;" src="https://res.cloudinary.com/dtovjoem4/image/upload/v1625609673/Screenshot_1_vvwmgo.png"> </a>


## How to test

You can test API just visit [API Recipes Playground](https://apollo-graphql-server-recipes.herokuapp.com/graphql) 

### Requirements
- [Node](https://nodejs.org/es/) >= 14.17.3
- [yarn](https://yarnpkg.com/getting-started/install) >= 1.22.10
- [mysql](https://www.mysql.com/downloads/) or [sqlite](https://www.sqlite.org/download.html)

### Installation

Use the package manager NPM or Yarn to install dependencies.

bash
npm install or yarn install


### Configuration
Rename .env.example to .env

Fill .env file with your information, about database, port server and key secret for jwt auth

Do not change entities path for stable running server.

### Running

1. Start the server with

bash
npm run dev or yarn dev

2. Go to http://localhost:5000/graphql to test API, where localhost is your host and port entry in .env file

3. Begin to CRUD entities and query them, dont forget to login for some entities query.


You can review schema.gql for queries and mutation.


## Contributing
Pull requests are welcome.


## License
[MIT](https://choosealicense.com/licenses/mit/)
