'use strict';

const ffi = require('ffi');

const driver = ffi.Library('deps/vXboxInterface', {
	PlugIn: ['bool', ['int']],
	UnPlug: ['bool', ['int']],
	SetBtnA: ['bool', ['int', 'bool']],
	SetBtnB: ['bool', ['int', 'bool']],
	SetBtnX: ['bool', ['int', 'bool']],
	SetBtnY: ['bool', ['int', 'bool']],
	SetBtnStart: ['bool', ['int', 'bool']],
	SetBtnBack: ['bool', ['int', 'bool']],
	SetBtnLT: ['bool', ['int', 'bool']],
	SetBtnRT: ['bool', ['int', 'bool']],
	SetBtnLB: ['bool', ['int', 'bool']],
	SetBtnRB: ['bool', ['int', 'bool']],
	SetTriggerL: ['bool', ['int', 'byte']],
	SetTriggerR: ['bool', ['int', 'byte']],
	SetAxisX: ['bool', ['int', 'short']],
	SetAxisY: ['bool', ['int', 'short']],
	SetAxisRx: ['bool', ['int', 'short']],
	SetAxisRy: ['bool', ['int', 'short']],
	SetDpadUp: ['bool', ['int']],
	SetDpadRight: ['bool', ['int']],
	SetDpadDown: ['bool', ['int']],
	SetDpadLeft: ['bool', ['int']],
	SetDpadOff: ['bool', ['int']],
});

module.exports = driver;
