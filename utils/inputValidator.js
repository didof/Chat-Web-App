const { User } = require('../models');

const initializeErrorObject = () => {
	return {
		empty: {},
		unique: {},
	};
};

// const checkpoint = (errorObject) => {
// 	let thereAreErrors = false;
// 	Object.keys(errorObject).forEach((sub) => {
// 		if (Object.keys(errorObject[sub].length !== 0)) thereAreErrors = true;
// 	});
// };

const _next = (errorObject, sub) => {
	return Object.keys(errorObject[sub]).length !== 0;
};

const runTest = (test, argsObject, errorObject) => {
	const args = Object.entries(argsObject);
	switch (test) {
		case 'isEmpty':
			args.forEach(([key, value]) => {
				_isEmpty(key, value, errorObject);
			});
			return _next(errorObject, 'empty');
		case 'isUnique':
			args.forEach(([key, value]) => {
				_findByField(key, value, errorObject);
			});
			return _next(errorObject, 'unique');
		default:
			console.error(`[runTest] test ${test} is not avaiable`);
			return false;
	}
};

const _isEmpty = (key, value, errorObject) => {
	if (value.trim() === '') {
		errorObject.empty[key] = `${key} must not be empty`;
	}
};

const _findByField = async (key, value, errorObject) => {
	try {
		const found = await User.findOne({
			where: { [key]: value },
		});
		if (found) {
			errorObject.unique[key] = `${key} is already taken`;
		}
	} catch (err) {
		console.error('[_findByField]', err);
	}
};

module.exports = {
	initializeErrorObject,
	// checkpoint,
	runTest,
};
