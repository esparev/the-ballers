const Joi = require('joi');

// Data rules
const id = Joi.number().integer();
const name = Joi.string().max(100);
const manager = Joi.string().max(100);
const logo = Joi.string().uri();
const leagueId = Joi.number().integer();

const getTeamSchema = Joi.object({
	id: id.required(),
});

const createTeamSchema = Joi.object({
	name: name.required(),
	manager: manager.required(),
	logo,
	leagueId: leagueId.required(),
});

const updateTeamSchema = Joi.object({
	name,
	manager,
	logo,
	leagueId,
});

module.exports = { getTeamSchema, createTeamSchema, updateTeamSchema };
