const bcrypt = require('bcryptjs');
const { UserInputError } = require('apollo-server');
const { User } = require('../models');
const myValidator = require('../utils/inputValidator');

module.exports = {
	Query: {
		getUsers: async () => {
			try {
				const users = await User.findAll();
				return users;
			} catch (err) {
				console.error(err);
			}
		},
	},
	Mutation: {
		register: async (parent, args, context, info) => {
			let errors = myValidator.initializeErrorObject();

			try {
				// validate input data
				if (myValidator.runTest('isEmpty', args, errors)) {
					console.info('[test:isEmpty]', errors);
					throw errors;
				}

				// check if username / email is unique
				const { username, email } = args;
				if (myValidator.runTest('isUnique', { username, email }, errors)) {
					console.info('[test:isUnique]', errors);
					throw errors;
				}

				// TODO: confront passwords

				// TODO: hash password
				// password = await bcrypt.hash(password, 6);

				// TODO: create and return the user
				// const user = await User.create({
				// 	username,
				// 	email,
				// 	password,
				// });
				// return user;
			} catch (err) {
				console.error(err);
				throw new UserInputError('Bad Input', { errors: err });
			}
		},
	},
};
