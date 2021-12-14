const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

/**
 * Service layer with CRUD methods
 */
class LeaguesService {
	constructor() {}

	/**
	 * Finds all leagues in the database
	 * @returns all the leagues in the database
	 */
	async find() {
		const leagues = await models.League.findAll({
			include: ['address'],
		});
		return leagues;
	}

	/**
	 * Finds the league with the provided id
	 * @param {number} id - league id
	 * @returns league that matches the id
	 */
	async findOne(id) {
		const league = await models.League.findByPk(id, {
			include: ['team'],
		});
		if (!league) {
			throw boom.notFound('Liga no encontrada');
		}
		return league;
	}

	/**
	 * Creates a league with the provided data
	 * @param {*} data - league data
	 * @returns league created
	 */
	async create(data) {
		const newLeague = await models.League.create(data, {
			include: ['address'],
		});
		return newLeague;
	}

	/**
	 * Updates partially the league with the provided id
	 * @param {number} id - league id
	 * @param {*} changes - league data to update
	 * @returns league updated
	 */
	async update(id, changes) {
		const league = await this.findOne(id);
		const response = await league.update(changes);
		return response;
	}

	/**
	 * Deletes the league with the provided id
	 * @param {number} id - league id
	 * @returns league deleted
	 */
	async delete(id) {
		const league = await this.findOne(id);
		await league.destroy();
		return { id };
	}
}

module.exports = LeaguesService;
