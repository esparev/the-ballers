const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

/**
 * Service layer with CRUD methods
 */
class CoachesService {
	constructor() {}

	/**
	 * Finds all coaches in the database
	 * @returns all the coaches in the database
	 */
	async find() {
		const coaches = await models.Coach.findAll({
			include: ['team'],
		});
		return coaches;
	}

	/**
	 * Finds the coach with the provided id
	 * @param {number} id - coach id
	 * @returns coach that matches the id
	 */
	async findOne(id) {
		const coach = await models.Coach.findByPk(id);
		if (!coach) {
			throw boom.notFound('Entrenador no encontrado');
		}
		return coach;
	}

	/**
	 * Creates a coach with the provided data
	 * @param {*} data - coach data
	 * @returns coach created
	 */
	async create(data) {
		const newCoach = await models.Coach.create(data);
		return newCoach;
	}

	/**
	 * Updates partially the coach with the provided id
	 * @param {number} id - coach id
	 * @param {*} changes - coach data to update
	 * @returns coach updated
	 */
	async update(id, changes) {
		const coach = await this.findOne(id);
		const response = await coach.update(changes);
		return response;
	}

	/**
	 * Deletes the coach with the provided id
	 * @param {number} id - coach id
	 * @returns coach deleted
	 */
	async delete(id) {
		const coach = await this.findOne(id);
		await coach.destroy();
		return { id };
	}
}

module.exports = CoachesService;
