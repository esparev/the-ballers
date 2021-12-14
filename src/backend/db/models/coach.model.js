const { Model, DataTypes } = require('sequelize');

// Database table name
const COACH_TABLE = 'coach';
const { TEAM_TABLE } = require('./team.model');

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
const CoachSchema = {
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
	birthday: {
		allowNull: true,
		type: DataTypes.DATEONLY,
	},
	image: {
		allowNull: true,
		defaultValue: 'https://i.imgur.com/CFJ2k8J.png',
		type: DataTypes.STRING,
	},
	teamId: {
		allowNull: false,
		field: 'team_id',
		type: DataTypes.INTEGER,
		references: {
			model: TEAM_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
};

/**
 * Model class
 */
class Coach extends Model {
	/**
	 * Associates relations between models
	 * @param {*} models
	 */
	static associate(models) {
		// One to one (1-1) relation between Player and Team
		this.belongsTo(models.Team, { as: 'team' });
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
			tableName: COACH_TABLE,
			modelName: 'Coach',
			timestamps: false,
		};
	}
}

module.exports = { COACH_TABLE, CoachSchema, Coach };
