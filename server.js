const { ApolloServer } = require('apollo-server');
const resolvers = require('./graphQL/resolvers');
const typeDefs = require('./graphQL/typeDefs');
const { sequelize } = require('./models');

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);

	sequelize
		.authenticate()
		.then(() => console.log('Database connected.'))
		.catch((err) => console.error(err));
});
