/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"dksh/connectclient/CreateReturn/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});