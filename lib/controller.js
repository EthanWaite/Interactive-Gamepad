'use strict';

const driver = require('./driver');

module.exports = class Controller {
	constructor(number) {
		Object.keys(driver).forEach((method) => {
			this[method[0].toLowerCase() + method.slice(1)] = driver[method].bind(driver, number);
		});
		this.plugIn();
	}
};
