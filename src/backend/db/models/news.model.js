const { Model, DataTypes, Sequelize } = require('sequelize');

// Database table name
const NEWS_TABLE = 'news';

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
const NewsSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	title: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	description: {
		allowNull: false,
		type: DataTypes.STRING(1000),
	},
	createdAt: {
		allowNull: false,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
		type: DataTypes.DATE,
	},
	author: {
		allowNull: false,
		defaultValue: 'Asociación de Beisbolistas Michoacanos',
		type: DataTypes.STRING(100),
	},
	cover: {
		allowNull: true,
		type: DataTypes.STRING,
	},
};

/**
 * Model class
 */
class News extends Model {
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
			tableName: NEWS_TABLE,
			modelName: 'News',
			timestamps: false,
		};
	}
}

module.exports = { NEWS_TABLE, NewsSchema, News };
