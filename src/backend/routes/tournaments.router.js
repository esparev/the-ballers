const express = require('express');
const passport = require('passport');
const router = express.Router();

const TournamentsService = require('../services/tournaments.service');
const service = new TournamentsService();

const validatorHandler = require('../middlewares/validator.handler');
const {
	getTournamentSchema,
	createTournamentSchema,
	updateTournamentSchema,
	queryTournamentSchema,
} = require('../schemas/tournament.schema');

/**
 * Tournaments main route
 * Shows all Tournaments
 */
router.get(
	'/',
	validatorHandler(queryTournamentSchema, 'query'),
	async (req, res, next) => {
		try {
			const tournaments = await service.find(req.query);

			res.status(200).json(tournaments);
		} catch (error) {
			next(error);
		}
	}
);

/**
 * Individual Tournament route
 * Shows the Tournament with the provided id
 */
router.get(
	'/:id',
	validatorHandler(getTournamentSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const tournament = await service.findOne(id);

			res.status(200).json(tournament);
		} catch (error) {
			next(error);
		}
	}
);

/**
 * Add Tournament route
 * Creates a Tournament with the provided data in body
 */
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(createTournamentSchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newTournament = await service.create(body);

			res.status(201).json({
				newTournament,
				message: 'torneo creado',
			});
		} catch (error) {
			next(error);
		}
	}
);

/**
 * Edit Tournament route
 * Updates partial or entire data of the Tournament with the provided id
 */
router.patch(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(getTournamentSchema, 'params'),
	validatorHandler(updateTournamentSchema, 'body'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const tournament = await service.update(id, body);

			res.status(200).json({
				tournament,
				message: 'torneo actualizado',
			});
		} catch (error) {
			next(error);
		}
	}
);

/**
 * Delete Tournament route
 * Deletes the Tournament with the provided id
 */
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const tournament = await service.delete(id);

			res.status(200).json({
				tournament,
				message: 'torneo eliminado',
			});
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
