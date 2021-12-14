const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

/**
 * Service layer with CRUD methods
 */
class TournamentsService {
	constructor() {}

	/**
	 * Finds all tournaments in the database
	 * @returns all the tournaments in the database
	 */
	async find(query) {
		const options = {
			order: [],
		};
		const { limit, offset } = query;
		if (limit && offset) {
			options.limit = limit;
			options.offset = offset;
		}
		const { sort } = query;
		if (sort) {
			options.order = [['created_at', sort]];
		}
		const tournaments = await models.Tournament.findAll(options);
		return tournaments;
	}

	/**
	 * Finds the tournament with the provided id
	 * @param {number} id - tournament id
	 * @returns tournament that matches the id
	 */
	async findOne(id) {
		const tournament = await models.Tournament.findByPk(id);
		if (!tournament) {
			throw boom.notFound('Torneo no encontrado');
		}
		return tournament;
	}

	/**
	 * Creates a tournament with the provided data
	 * @param {*} data - tournament data
	 * @returns tournament created
	 */
	async create(data) {
		const newTournament = await models.Tournament.create(data);
		return newTournament;
	}

	/**
	 * Updates partially the tournament with the provided id
	 * @param {number} id - tournament id
	 * @param {*} changes - tournament data to update
	 * @returns tournament updated
	 */
	async update(id, changes) {
		const tournament = await this.findOne(id);
		const response = await tournament.update(changes);
		return response;
	}

	/**
	 * Deletes the tournament with the provided id
	 * @param {number} id - tournament id
	 * @returns tournament deleted
	 */
	async delete(id) {
		const tournament = await this.findOne(id);
		await tournament.destroy();
		return { id };
	}
}

module.exports = TournamentsService;
