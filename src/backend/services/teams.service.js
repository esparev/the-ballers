const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

/**
 * Service layer with CRUD methods
 */
class TeamsService {
	constructor() {}

	/**
	 * Finds all teams in the database
	 * @returns all the teams in the database
	 */
	async find() {
		const teams = await models.Team.findAll({
			include: ['league'],
		});
		return teams;
	}

	/**
	 * Finds the team with the provided id
	 * @param {number} id - team id
	 * @returns team that matches the id
	 */
	async findOne(id) {
		const team = await models.Team.findByPk(id, {
			include: ['player', 'coach'],
		});
		if (!team) {
			throw boom.notFound('Equipo no encontrado');
		}
		return team;
	}

	/**
	 * Creates a team with the provided data
	 * @param {*} data - team data
	 * @returns team created
	 */
	async create(data) {
		const newTeam = await models.Team.create(data);
		return newTeam;
	}

	/**
	 * Updates partially the team with the provided id
	 * @param {number} id - team id
	 * @param {*} changes - team data to update
	 * @returns team updated
	 */
	async update(id, changes) {
		const team = await this.findOne(id);
		const response = await team.update(changes);
		return response;
	}

	/**
	 * Deletes the team with the provided id
	 * @param {number} id - team id
	 * @returns team deleted
	 */
	async delete(id) {
		const team = await this.findOne(id);
		await team.destroy();
		return { id };
	}
}

module.exports = TeamsService;
