const { Model, DataTypes } = require('sequelize');

// Database table name
const LEAGUE_TABLE = 'league';
const { ADDRESS_TABLE } = require('./address.model');

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
const LeagueSchema = {
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
	responsable: {
		allowNull: false,
		type: DataTypes.STRING(100),
	},
	phone: {
		allowNull: true,
		type: DataTypes.STRING(10),
	},
	ageStart: {
		allowNull: true,
		field: 'age_start',
		type: DataTypes.INTEGER,
	},
	ageEnd: {
		allowNull: true,
		field: 'age_end',
		type: DataTypes.INTEGER,
	},
	logo: {
		allowNull: true,
		defaultValue: 'https://i.imgur.com/PEZQ6jS.png',
		type: DataTypes.STRING,
	},
	addressId: {
		field: 'address_id',
		allowNull: false,
		type: DataTypes.INTEGER,
		unique: true,
		references: {
			model: ADDRESS_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
};

/**
 * Model class
 */
class League extends Model {
	/**
	 * Associates relations between models
	 * @param {*} models
	 */
	static associate(models) {
		// One to one (1-1) relation between League and Address
		this.belongsTo(models.Address, { as: 'address' });
		// One to many (1-N) relation between League and Teams
		this.hasMany(models.Team, {
			as: 'team',
			foreignKey: 'leagueId',
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
			tableName: LEAGUE_TABLE,
			modelName: 'League',
			timestamps: false,
		};
	}
}

module.exports = { LEAGUE_TABLE, LeagueSchema, League };
