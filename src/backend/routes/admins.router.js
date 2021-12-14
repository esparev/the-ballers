const express = require('express');
const passport = require('passport');
const router = express.Router();

const AdminsService = require('../services/admins.service');
const service = new AdminsService();

const validatorHandler = require('../middlewares/validator.handler');
const {
	getAdminSchema,
	createAdminSchema,
	updateAdminSchema,
} = require('../schemas/admin.schema');

/**
 * Admins main route
 * Shows all Admins
 */
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	async (req, res, next) => {
		try {
			const admins = await service.find();

			res.status(200).json(admins);
		} catch (error) {
			next(error);
		}
	}
);

/**
 * Individual Admin route
 * Shows the Admin with the provided id
 */
router.get(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(getAdminSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const admin = await service.findOne(id);

			res.status(200).json(admin);
		} catch (error) {
			next(error);
		}
	}
);

/**
 * Add Admin route
 * Creates an Admin with the provided data in body
 */
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(createAdminSchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newAdmin = await service.create(body);

			res.status(201).json({
				newAdmin,
				message: 'admin creado',
			});
		} catch (error) {
			next(error);
		}
	}
);

/**
 * Edit Admin route
 * Updates partial or entire data of the Admin with the provided id
 */
router.patch(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(getAdminSchema, 'params'),
	validatorHandler(updateAdminSchema, 'body'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const admin = await service.update(id, body);

			res.status(200).json({
				admin,
				message: 'admin actualizado',
			});
		} catch (error) {
			next(error);
		}
	}
);

/**
 * Delete Admin route
 * Deletes the Admin with the provided id
 */
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const admin = await service.delete(id);

			res.status(200).json({
				admin,
				message: 'admin eliminado',
			});
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
