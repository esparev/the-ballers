const express = require('express');
const router = express.Router();
const passport = require('passport');

const AddressesService = require('../services/addresses.service');
const service = new AddressesService();

const validatorHandler = require('../middlewares/validator.handler');
const {
	getAddressSchema,
	createAddressSchema,
	updateAddressSchema,
} = require('../schemas/address.schema');

/**
 * Addresses main route
 * Shows all Addresses
 */
router.get('/', async (req, res, next) => {
	try {
		const addresses = await service.find();

		res.status(200).json(addresses);
	} catch (error) {
		next(error);
	}
});

/**
 * Individual Address route
 * Shows the Address with the provided id
 */
router.get(
	'/:id',
	validatorHandler(getAddressSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const address = await service.findOne(id);

			res.status(200).json(address);
		} catch (error) {
			next(error);
		}
	}
);

/**
 * Add Address route
 * Creates a Address with the provided data in body
 */
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(createAddressSchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newAddress = await service.create(body);

			res.status(201).json({
				newAddress,
				message: 'direccion creada',
			});
		} catch (error) {
			next(error);
		}
	}
);

/**
 * Edit Address route
 * Updates partial or entire data of the Address with the provided id
 */
router.patch(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(getAddressSchema, 'params'),
	validatorHandler(updateAddressSchema, 'body'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const address = await service.update(id, body);

			res.status(200).json({
				address,
				message: 'direccion actualizada',
			});
		} catch (error) {
			next(error);
		}
	}
);

/**
 * Delete Address route
 * Deletes the Address with the provided id
 */
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const address = await service.delete(id);

			res.status(200).json({
				address,
				message: 'direccion eliminada',
			});
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
