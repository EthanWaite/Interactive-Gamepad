'use strict';

const request = require('request-promise');
const Promise = require('bluebird');
const Reports = require('./reports');
const interactive = require('beam-interactive-node');
const Packets = require('beam-interactive-node/dist/robot/packets').default;
const config = require('../config.json');

module.exports = class Interactive {
	start() {
		this.reports = new Reports();
		Interactive.getRobotInfo().then((info) => {
			this.robot = Interactive.connectRobot(info);
			return new Promise((resolve, reject) => {
				this.robot.handshake((err) => {
					if (err) {
						reject(err);
						return;
					}
					resolve();
				});
			});
		}).then(() => {
			this.robot.on('report', this.handleReport.bind(this));
		});
	}

	static getRobotInfo() {
		return request.get(`https://beam.pro/api/v1/interactive/${config.channel}/robot`, {
			headers: {
				'User-Agent': 'Gamepad-Interactive 1.0 (+https://streamjar.tv)',
				Authorization: `Bearer ${config.token}`,
			},
			json: true,
		});
	}

	static connectRobot(data) {
		const res = data;
		res.remote = res.address;
		res.channel = config.channel;
		res.reportInterval = 0.5;
		return new interactive.Robot(res);
	}

	handleReport(report) {
		const info = this.reports.handleReport(report);
		const tactile = [];
		const joystick = [];
		info.forEach((item) => {
			if (item.type === 'tactile') {
				tactile.push(new Packets.ProgressUpdate.TactileUpdate({
					id: item.id,
					progress: item.progress,
					fired: item.fired,
				}));
			} else {
				joystick.push(new Packets.ProgressUpdate.JoystickUpdate({
					id: item.id,
					angle: item.angle,
					intensity: item.intensity,
				}));
			}
		});
		if (tactile.length || joystick.length) {
			this.robot.send(new Packets.ProgressUpdate({ tactile, joystick }));
		}
	}
};
