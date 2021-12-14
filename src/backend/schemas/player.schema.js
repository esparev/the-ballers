const Joi = require('joi');

// Data rules
const id = Joi.number().integer();
const name = Joi.string().max(100);
const position = Joi.string().max(100);
const birthday = Joi.string().isoDate();
const image = Joi.string().uri();
const teamId = Joi.number().integer();

const getPlayerSchema = Joi.object({
	id: id.required(),
});

const createPlayerSchema = Joi.object({
	name: name.required(),
	position,
	birthday,
	image,
	teamId: teamId.required(),
});

const updatePlayerSchema = Joi.object({
	name,
	position,
	birthday,
	image,
	teamId,
});

module.exports = { getPlayerSchema, createPlayerSchema, updatePlayerSchema };
