const { Admin, AdminSchema } = require('./admin.model');
const { Address, AddressSchema } = require('./address.model');
const { League, LeagueSchema } = require('./league.model');
const { Team, TeamSchema } = require('./team.model');
const { Player, PlayerSchema } = require('./player.model');
const { Coach, CoachSchema } = require('./coach.model');
const { News, NewsSchema } = require('./news.model');
const { Tournament, TournamentSchema } = require('./tournament.model');

/**
 * Configures all the models to follow the rules of
 * each belonging schema
 * @param {*} sequelize - sequelize connection
 */
function setupModels(sequelize) {
	Admin.init(AdminSchema, Admin.config(sequelize));
	Address.init(AddressSchema, Address.config(sequelize));
	League.init(LeagueSchema, League.config(sequelize));
	Team.init(TeamSchema, Team.config(sequelize));
	Player.init(PlayerSchema, Player.config(sequelize));
	Coach.init(CoachSchema, Coach.config(sequelize));
	News.init(NewsSchema, News.config(sequelize));
	Tournament.init(TournamentSchema, Tournament.config(sequelize));

	// Initialize associations
	Address.associate(sequelize.models);
	League.associate(sequelize.models);
	Team.associate(sequelize.models);
	Player.associate(sequelize.models);
	Coach.associate(sequelize.models);
}

module.exports = setupModels;
