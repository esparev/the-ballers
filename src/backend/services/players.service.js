const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

/**
 * Service layer with CRUD methods
 */
class PlayersService {
	constructor() {}

	/**
	 * Finds all players in the database
	 * @returns all the players in the database
	 */
	async find() {
		const players = await models.Player.findAll({
			include: ['team'],
		});
		return players;
	}

	/**
	 * Finds the player with the provided id
	 * @param {number} id - player id
	 * @returns player that matches the id
	 */
	async findOne(id) {
		const player = await models.Player.findByPk(id);
		if (!player) {
			throw boom.notFound('Jugador no encontrado');
		}
		return player;
	}

	/**
	 * Creates a player with the provided data
	 * @param {*} data - player data
	 * @returns player created
	 */
	async create(data) {
		const newPlayer = await models.Player.create(data);
		return newPlayer;
	}

	/**
	 * Updates partially the player with the provided id
	 * @param {number} id - player id
	 * @param {*} changes - player data to update
	 * @returns player updated
	 */
	async update(id, changes) {
		const player = await this.findOne(id);
		const response = await player.update(changes);
		return response;
	}

	/**
	 * Deletes the player with the provided id
	 * @param {number} id - player id
	 * @returns player deleted
	 */
	async delete(id) {
		const player = await this.findOne(id);
		await player.destroy();
		return { id };
	}
}

module.exports = PlayersService;
