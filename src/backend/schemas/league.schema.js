const Joi = require('joi');
const {
	createAddressSchema,
	updateAddressSchema,
} = require('./address.schema');

// Data rules
const id = Joi.number().integer();
const name = Joi.string().max(100);
const responsable = Joi.string().max(100);
const phone = Joi.string().max(10);
const ageStart = Joi.number().integer().max(60);
const ageEnd = Joi.number().integer().max(60);
const logo = Joi.string().uri();

const getLeagueSchema = Joi.object({
	id: id.required(),
});

const createLeagueSchema = Joi.object({
	name: name.required(),
	responsable,
	phone,
	ageStart: ageStart.required(),
	ageEnd: ageEnd.required(),
	logo,
	address: createAddressSchema,
});

const updateLeagueSchema = Joi.object({
	name,
	responsable,
	phone,
	ageStart,
	ageEnd,
	logo,
	address: updateAddressSchema,
});

module.exports = { getLeagueSchema, createLeagueSchema, updateLeagueSchema };
