const { Model, DataTypes } = require('sequelize');

// Database table name
const ADDRESS_TABLE = 'address';

/**
 * Schema model to create in the database
 * @description description of each field in the table
 * @typedef {Object} field definition
 * @property {boolean} allowNull - false = NOT NULL
 * @property {boolean} autoIncrement - each insert, increase the counter
 * @property {boolean} primaryKey - define is primary key
 * @property {*} defaultValue - default value of the field
 * @property {boolean} type - expresion to match SQL type
 * @property {boolean} unique - define as unique the field
 * @property {boolean} field - rename the field
 */
const AddressSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	streetName: {
		allowNull: false,
		field: 'street_name',
		type: DataTypes.STRING(100),
	},
	streetNumber: {
		allowNull: false,
		field: 'street_number',
		type: DataTypes.STRING(10),
	},
	zipCode: {
		allowNull: false,
		field: 'zip_code',
		type: DataTypes.STRING(10),
	},
	suburb: {
		allowNull: false,
		type: DataTypes.STRING(100),
	},
	location: {
		allowNull: false,
		type: DataTypes.STRING(100),
	},
};

/**
 * Model class
 */
class Address extends Model {
	/**
	 * Associates relations between models
	 * @param {*} models
	 */
	static associate(models) {
		// One to one (1-1) relation between Address and League
		this.hasOne(models.League, {
			as: 'league',
			foreignKey: 'addressId',
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
			tableName: ADDRESS_TABLE,
			modelName: 'Address',
			timestamps: false,
		};
	}
}

module.exports = { ADDRESS_TABLE, AddressSchema, Address };
