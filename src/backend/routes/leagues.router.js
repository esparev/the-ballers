const express = require('express');
const passport = require('passport');
const router = express.Router();

const LeaguesService = require('../services/leagues.service');
const service = new LeaguesService();

const validatorHandler = require('../middlewares/validator.handler');
const {
	getLeagueSchema,
	createLeagueSchema,
	updateLeagueSchema,
} = require('../schemas/league.schema');

/**
 * Leagues main route
 * Shows all Leagues
 */
router.get('/', async (req, res, next) => {
	try {
		const leagues = await service.find();

		res.status(200).json(leagues);
	} catch (error) {
		next(error);
	}
});

/**
 * Individual League route
 * Shows the League with the provided id
 */
router.get(
	'/:id',
	validatorHandler(getLeagueSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const league = await service.findOne(id);

			res.status(200).json(league);
		} catch (error) {
			next(error);
		}
	}
);

/**
 * Add League route
 * Creates a League with the provided data in body
 */
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(createLeagueSchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newLeague = await service.create(body);

			res.status(201).json({
				newLeague,
				message: 'liga creada',
			});
		} catch (error) {
			next(error);
		}
	}
);

/**
 * Edit League route
 * Updates partial or entire data of the League with the provided id
 */
router.patch(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(getLeagueSchema, 'params'),
	validatorHandler(updateLeagueSchema, 'body'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const league = await service.update(id, body);

			res.status(200).json({
				league,
				message: 'liga actualizada',
			});
		} catch (error) {
			next(error);
		}
	}
);

/**
 * Delete League route
 * Deletes the League with the provided id
 */
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const league = await service.delete(id);

			res.status(200).json({
				league,
				message: 'liga eliminada',
			});
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
