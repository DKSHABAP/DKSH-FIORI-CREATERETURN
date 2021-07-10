	(function (w, d, s, l, i) {
		w[l] = w[l] || [];
		w[l].push({
			'gtm.start': new Date().getTime(),
			event: 'gtm.js'
		});
		var f = d.getElementsByTagName(s)[0],
			j = d.createElement(s),
			dl = l != 'dataLayer' ? '&l=' + l : '';
		j.async = true;
		j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
		f.parentNode.insertBefore(j, f);
	})(window, document, 'script', 'dataLayer', 'GTM-WG969CM', 'ga');
	// ga('create', 'GTM-WG969CM', 'auto');
	// ga('send', 'pageview');

	// 	(function (i, s, o, g, r, a, m) {
	// 	i['GoogleAnalyticsObject'] = r;
	// 	i[r] = i[r] || function () {
	// 		(i[r].q = i[r].q || []).push(arguments)
	// 	}, i[r].l = 1 * new Date();
	// 	a = s.createElement(o), m = s.getElementsByTagName(o)[0];
	// 	a.async = 1;
	// 	a.src = g;
	// 	m.parentNode.insertBefore(a, m)
	// })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
	sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/Device", "incture/com/ConnectClient_ReturnCreate/model/models"], function (e, t, n) {
		"use strict";
		return e.extend("incture.com.ConnectClient_ReturnCreate.Component", {
			metadata: {
				manifest: "json",
				config: {
					fullWidth: true
				}
			},
			// init: function () {
			// 	e.prototype.init.apply(this, arguments);
			// 	this.getRouter().initialize();
			// 	this.setModel(n.createDeviceModel(), "device")
			// }
			init: function () {
				// call the base component's init function
				e.prototype.init.apply(this, arguments);

				// enable routing
				this.getRouter().initialize();

				// set the device model
				this.setModel(n.createDeviceModel(), "device");
				var sAppID = "GTM-WG969CM";

				//Make sure a tracking ID is maintained
				if (ga) {
					ga('create', sAppID, 'auto');
					ga('send', 'pageview', {
						'page': location.pathname + this.cleanHash(location.hash),
						'title': "Create Return"
					});
					ga('send', 'pageview', location.hash);
					$(window).hashchange(function () {
						ga('send', 'pageview', {
							'page': location.pathname + this.cleanHash(location.hash),
							'title': "Create Return"
						});
						ga('send', 'pageview', location.hash);
					}.bind(this));
				}
			},
			cleanHash: function (sHash) {
				//Remove Guids and numbers from the hash to provide clean data
				// TODO:Remove everything between single quotes
				return sHash.replace(
					/((\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1})|(\d)/g,
					"");
			}
		});
	});