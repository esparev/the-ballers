const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

/**
 * Service layer with CRUD methods
 */
class AddressesService {
	constructor() {}

	/**
	 * Finds all addresses in the database
	 * @returns all the addresses in the database
	 */
	async find() {
		const addresses = await models.Address.findAll();
		return addresses;
	}

	/**
	 * Finds the address with the provided id
	 * @param {number} id - address id
	 * @returns address that matches the id
	 */
	async findOne(id) {
		const address = await models.Address.findByPk(id);
		if (!address) {
			throw boom.notFound('direccion no encontrada');
		}
		return address;
	}

	/**
	 * Creates an address with the provided data
	 * @param {*} data - address data
	 * @returns address created
	 */
	async create(data) {
		const newAddress = await models.Address.create(data);
		return newAddress;
	}

	/**
	 * Updates partially the address with the provided id
	 * @param {number} id - address id
	 * @param {*} changes - address data to update
	 * @returns address updated
	 */
	async update(id, changes) {
		const address = await this.findOne(id);
		const response = await address.update(changes);
		return response;
	}

	/**
	 * Deletes the address with the provided id
	 * @param {number} id - address id
	 * @returns address deleted
	 */
	async delete(id) {
		const address = await this.findOne(id);
		await address.destroy();
		return { id };
	}
}

module.exports = AddressesService;
