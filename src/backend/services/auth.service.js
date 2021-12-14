const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const AdminsService = require('./admins.service');
const service = new AdminsService();
const { config } = require('../config/config');

/**
 * Service layer with CRUD methods
 */
class AuthService {
	constructor() {}

	/**
	 * Finds the admin with the provided email and password
	 * Also validates the existence of a username to
	 * the comparison of the provided password with
	 * the stored password
	 * @param {number} email - admin email
	 * @param {number} password - admin password
	 * @returns admin that matches the email
	 */
	async getUser(email, password) {
		// Validates if an admin with the provided email exists
		const admin = await service.findByEmail(email);
		if (!admin) {
			throw boom.unauthorized();
		}
		// Validates if the entered password matches the password stored in the database
		const isMatch = await bcrypt.compare(password, admin.password);
		if (!isMatch) {
			throw boom.unauthorized();
		}
		// Remove password from return response
		delete admin.dataValues.password;
		return admin;
	}

	/**
	 * Signs a json web token with the necessary information
	 * about the admin to define its roles
	 * @param {*} admin - admin object
	 * @returns the admin and its token
	 */
	signToken(admin) {
		const payload = {
			// Subject to identify the admin
			sub: admin.id,
			// Permissions of the admin
			scope: admin.role,
		};
		const token = jwt.sign(payload, config.jwtSecret);
		delete admin.dataValues.recoveryToken;
		return {
			admin,
			token,
		};
	}

	/**
	 * Provides information to the mail
	 * @param {*} email - admin email
	 * @returns send mail
	 */
	async sendRecovery(email) {
		// Validates if an admin with the provided email exists
		const admin = await service.findByEmail(email);
		if (!admin) {
			throw boom.unauthorized();
		}

		const payload = { sub: admin.id };
		const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
		const link = `https://beismich.netlify.app/recuperar?token=${token}`;
		await service.update(admin.id, { recoveryToken: token });

		const mail = {
			from: config.smtpEmail, // sender address
			to: `${admin.email}`, // list of receivers
			subject: 'Recuperar contraseña', // Subject line
			html: `<b>Ingresa a este link: ${link}</b>`, // html body
		};
		const response = await this.sendMail(mail);
		return response;
	}

	async changePassword(token, newPassword) {
		try {
			const payload = jwt.verify(token, config.jwtSecret);
			const admin = await service.findOne(payload.sub);
			if (admin.recoveryToken !== token) {
				throw boom.unauthorized();
			}
			const hash = await bcrypt.hash(newPassword, 13);
			await service.update(admin.id, { recoveryToken: null, password: hash });
			return { message: 'Contraseña modificada' };
		} catch (error) {
			throw boom.unauthorized();
		}
	}

	/**
	 * Sends a mail to the email info with the nodemailer
	 * transporter
	 * @param {*} infoMail - admin email
	 * @returns message
	 */
	async sendMail(infoMail) {
		// create reusable transporter object using the default SMTP transport
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			secure: true, // true for 465, false for other ports
			port: 465,
			auth: {
				user: config.smtpEmail,
				pass: config.smtpPassword,
			},
		});
		// send mail with defined transport object
		await transporter.sendMail(infoMail);
		return { message: 'mail enviado' };
	}
}

module.exports = AuthService;
