const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

/**
 * Service layer with CRUD methods
 */
class AdminsService {
	constructor() {}

	/**
	 * Finds all admins in the database
	 * @returns all the admins in database
	 */
	async find() {
		const admins = await models.Admin.findAll();
		return admins;
	}

	/**
	 * Finds the admin with the provided id
	 * @param {number} id - admin id
	 * @returns admin that matches the id
	 */
	async findOne(id) {
		const admin = await models.Admin.findByPk(id);
		if (!admin) {
			throw boom.notFound('Admin no encontrado');
		}
		if (admin.isHero) {
			throw boom.unauthorized('No tienes permisos');
		}
		return admin;
	}

	/**
	 * Finds the admin with the provided email
	 * @param {string} email - admin email
	 * @returns admin that matches the email
	 */
	async findByEmail(email) {
		const admin = await models.Admin.findOne({
			where: { email },
		});
		return admin;
	}

	/**
	 * Creates an admin with the provided data and
	 * encrypts the admin's password with a hash method
	 * @param {*} data - admin data
	 * @returns admin created
	 */
	async create(data) {
		const hash = await bcrypt.hash(data.password, 13);
		const newAdmin = await models.Admin.create({
			...data,
			password: hash,
		});
		delete newAdmin.dataValues.password;
		delete newAdmin.dataValues.recoveryToken;
		return newAdmin;
	}

	/**
	 * Updates partially the admin with the provided id
	 * @param {number} id - admin id
	 * @param {*} changes - admin data to update
	 * @returns admin updated
	 */
	async update(id, changes) {
		const admin = await this.findOne(id);
		const response = await admin.update(changes);
		return response;
	}

	/**
	 * Deletes the admin with the provided id
	 * @param {number} id - admin id
	 * @returns admin deleted
	 */
	async delete(id) {
		const admin = await this.findOne(id);
		await admin.destroy();
		return { id };
	}
}

module.exports = AdminsService;
