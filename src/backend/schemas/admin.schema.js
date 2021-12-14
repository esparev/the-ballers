const Joi = require('joi');

// Data rules
const id = Joi.number().integer();
const role = Joi.string();
const name = Joi.string().max(100);
const email = Joi.string().email();
const password = Joi.string();
const image = Joi.string().uri();

const getAdminSchema = Joi.object({
	id: id.required(),
});

const createAdminSchema = Joi.object({
	role,
	name: name.required(),
	email: email.required(),
	password: password.required(),
	image,
});

const updateAdminSchema = Joi.object({
	name,
	email,
	password,
	image,
});

module.exports = { getAdminSchema, createAdminSchema, updateAdminSchema };
