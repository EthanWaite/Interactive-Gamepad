'use strict';

const Controller = require('./controller');

const tactileMapping = {
	1: 'setBtnY',
	2: 'setBtnX',
	3: 'setBtnA',
	4: 'setBtnB',
};

module.exports = class Reports {
	constructor() {
		this.controller = new Controller(1);
		this.lastTactile = {};
		this.joystickInactive = 0;
	}

	handleReport(report) {
		const result = [];

		const total = Reports.getTotal(report.tactile);
		report.tactile.forEach((tactile) => {
			const progress = Math.min(1, (tactile.holding / total) / 0.5) || 0;
			const fired = progress >= 1;
			this.controller[tactileMapping[tactile.id]](fired);
			if (this.lastTactile[tactile.id] !== progress) {
				this.lastTactile[tactile.id] = progress;
				result.push({ type: 'tactile', id: tactile.id, progress, fired });
			}
		});

		const coord = report.joystick[0].coordMean;
		const posX = (coord.x * 32767) || 0;
		const posY = (coord.y * 32767) || 0;
		const angle = Reports.getAngle(posX, posY);
		if ((posX && posY) || this.joystickInactive >= 2) {
			this.controller.setAxisX(-posX);
			this.controller.setAxisY(-posY);
		}
		if (!isNaN(angle)) {
			result.push({ type: 'joystick', id: 0, angle, intensity: 1 });
			this.joystickInactive = 0;
		} else if (this.joystickInactive >= 20) {
			result.push({ type: 'joystick', id: 0, intensity: 0 });
		} else {
			this.joystickInactive += 1;
		}
		this.joystickUsed = !isNaN(angle);

		return result;
	}

	static getAngle(posX, posY) {
		let angle = Math.atan(Math.abs(posY) / Math.abs(posX));
		if (posX < 0) {
			angle = Math.PI - angle;
		}
		if (posY < 0) {
			angle *= -1;
		}
		return angle + (Math.PI / 2);
	}

	static getTotal(tactiles) {
		let result = 0;
		tactiles.forEach((tactile) => {
			result += tactile.holding;
		});
		return result;
	}
};
