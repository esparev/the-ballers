const express = require('express');
const passport = require('passport');
const router = express.Router();

const TeamsService = require('../services/teams.service');
const service = new TeamsService();

const validatorHandler = require('../middlewares/validator.handler');
const {
	getTeamSchema,
	createTeamSchema,
	updateTeamSchema,
} = require('../schemas/team.schema');

/**
 * Teams main route
 * Shows all Teams
 */
router.get('/', async (req, res, next) => {
	try {
		const teams = await service.find();

		res.status(200).json(teams);
	} catch (error) {
		next(error);
	}
});

/**
 * Individual Team route
 * Shows the Team with the provided id
 */
router.get(
	'/:id',
	validatorHandler(getTeamSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const team = await service.findOne(id);

			res.status(200).json(team);
		} catch (error) {
			next(error);
		}
	}
);

/**
 * Add Team route
 * Creates a Team with the provided data in body
 */
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(createTeamSchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newTeam = await service.create(body);

			res.status(201).json({
				newTeam,
				message: 'equipo creado',
			});
		} catch (error) {
			next(error);
		}
	}
);

/**
 * Edit Team route
 * Updates partial or entire data of the Team with the provided id
 */
router.patch(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(getTeamSchema, 'params'),
	validatorHandler(updateTeamSchema, 'body'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const team = await service.update(id, body);

			res.status(200).json({
				team,
				message: 'equipo actualizado',
			});
		} catch (error) {
			next(error);
		}
	}
);

/**
 * Delete Team route
 * Deletes the Team with the provided id
 */
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const team = await service.delete(id);

			res.status(200).json({
				team,
				message: 'equipo eliminado',
			});
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
