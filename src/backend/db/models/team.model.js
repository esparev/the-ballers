const { Model, DataTypes } = require('sequelize');

// Database table name
const TEAM_TABLE = 'team';
const { LEAGUE_TABLE } = require('./league.model');

/**
 * Schema model to create in the database
 * @description description of each field in the table
 * @typedef {Object} field definition
 * @property {boolean} allowNull - false = NOT NULL
 * @property {boolean} autoIncrement - each insert, increase the counter
 * @property {boolean} primaryKey - define is primary key
 * @property {*} defaultValue - default value of the field
 * @property {boolean} type - expresion to match SQL type
 * @property {boolean} field - rename the field
 */
const TeamSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	name: {
		allowNull: false,
		type: DataTypes.STRING(100),
	},
	manager: {
		allowNull: false,
		type: DataTypes.STRING(100),
	},
	logo: {
		allowNull: true,
		defaultValue: 'https://i.imgur.com/chid3RN.png',
		type: DataTypes.STRING,
	},
	leagueId: {
		allowNull: false,
		field: 'league_id',
		type: DataTypes.INTEGER,
		references: {
			model: LEAGUE_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
};

/**
 * Model class
 */
class Team extends Model {
	/**
	 * Associates relations between models
	 * @param {*} models
	 */
	static associate(models) {
		// One to one (1-1) relation between Team and League
		this.belongsTo(models.League, { as: 'league' });
		// One to many (1-N) relation between Team and Players
		this.hasMany(models.Player, {
			as: 'player',
			foreignKey: 'teamId',
		});
		// One to many (1-N) relation between Team and Coaches
		this.hasMany(models.Coach, {
			as: 'coach',
			foreignKey: 'teamId',
		});
	}

	/**
	 * @param {*} sequelize - ORM connection type
	 * @property {any} sequelize - ORM connection type
	 * @property {string} tableName - define table name
	 * @property {string} modelName - define model name same as class name
	 * @returns the configuration of the model
	 */
	static config(sequelize) {
		return {
			sequelize,
			tableName: TEAM_TABLE,
			modelName: 'Team',
			timestamps: false,
		};
	}
}

module.exports = { TEAM_TABLE, TeamSchema, Team };
