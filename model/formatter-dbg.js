jQuery.sap.require("sap.ui.core.format.DateFormat");
sap.ui.define([], function () {
	"use strict";
	return {
		concatenateStrings: function (oVal1, oVal2) {
			if (oVal1 && oVal2) {
				return oVal1 + " (" + oVal2 + ") ";
			} else if (oVal1 && !oVal2) {
				return oVal1;
			} else if (!oVal1 && oVal2) {
				return oVal2;
			} else {
				return "";
			}
		},

		batchconcatenateStrings: function (oVal1, oVal2) {
			if (oVal1 && oVal2) {
				var oDateFormat = sap.ui.core.format.DateFormat
					.getDateInstance({
						pattern: "dd.MM.yyyy"
					});

				var a = new Date(oVal2);
				return oVal1 + " " + "(" + oDateFormat.format(a) + ")";
			} else if (oVal1 && !oVal2) {
				return oVal1;
			} else if (!oVal1 && oVal2) {
				var oDateFormat = sap.ui.core.format.DateFormat
					.getDateInstance({
						pattern: "dd.MM.yyyy"
					});
				var a = new Date(oVal2);
				return oDateFormat.format(a);
			} else {
				return "";
			}
		},

		batchconcatenateStringsPS: function (oVal1, oVal2) {
			if (oVal1 && oVal2) {
				var oDateFormat = sap.ui.core.format.DateFormat
					.getDateInstance({
						pattern: "dd.MM.yyyy"
					});
				var epoch = parseInt(oVal2.split("(")[1].split(")")[0]);
				var a = new Date(epoch);
				return oVal1 + " " + "(" + oDateFormat.format(a) + ")";
			} else if (oVal1 && !oVal2) {
				return oVal1;
			} else if (!oVal1 && oVal2) {
				var oDateFormat = sap.ui.core.format.DateFormat
					.getDateInstance({
						pattern: "dd.MM.yyyy"
					});
				var a = new Date(oVal2);
				return oDateFormat.format(a);
			} else {
				return "";
			}
		},
		datePS: function (oVal1) {
			if (oVal1) {
				var oDateFormat = sap.ui.core.format.DateFormat
					.getDateInstance({
						pattern: "dd.MM.yyyy"
					});
				var epoch = parseInt(oVal1.split("(")[1].split(")")[0]);
				var a = new Date(epoch);
				return oDateFormat.format(a);
			} else {
				return "";
			}
		},

		f4ValueBind: function (oVal1, oVal2) {
			if (oVal1 && oVal2) {
				return oVal1 + " (" + oVal2 + ") ";
			} else if (oVal1 && !oVal2) {
				return oVal1;
			} else if (!oVal1 && oVal2) {
				return oVal2;
			} else {
				return "";
			}
		},

		dateTimeFormatPS: function (oDate) {
			if (oDate) {
				var epoch = parseInt(oDate.split("(")[1].split(")")[0]);
				oDate = new Date(epoch);
				var oDateFormat = sap.ui.core.format.DateFormat
					.getTimeInstance({
						pattern: "dd.MM.yyyyTHH:mm:ss"
					});
				// oDate = new Date(oDate);
				if (oDate.getDate().toString().length === 1) {
					var date = "0" + oDate.getDate();
				} else {
					var date = oDate.getDate();
				}
				if (oDate.getMonth().toString().length === 1 && oDate.getMonth() < 9) {
					var month = "0" + (oDate.getMonth() + 1);
				} else {
					var month = oDate.getMonth() + 1;
				}
				if (oDate.getHours().toString().length === 1) {
					var hrs = "0" + oDate.getHours();
				} else {
					var hrs = oDate.getHours();
				}
				if (oDate.getMinutes().toString().length === 1) {
					var min = "0" + oDate.getMinutes();
				} else {
					var min = oDate.getMinutes();
				}
				if (oDate.getSeconds().toString().length === 1) {
					var seconds = "0" + oDate.getSeconds();
				} else {
					var seconds = oDate.getSeconds();
				}
				var date = oDate.getFullYear() + "-" + month + "-" + date + "T" + hrs + ":" + min + ":" + seconds;
				// oDate = new Date(date);
				// oDate.setHours(oDate.getHours() + 8);
				return date;
			} else {
				return "";
			}
		},

		date: function (d) {
			if (d !== null && d !== "") {
				// var a = parseInt(d.toString().split("(")[1].split(")")[0]);
				var oDateFormat = sap.ui.core.format.DateFormat
					.getDateInstance({
						pattern: "dd.MM.yyyy"
					});
				var a = new Date(d);
				return oDateFormat.format(a);
			} else {
				return "";
			}
		},

		setColor: function (colorCode) {
			if (colorCode === "B" || colorCode === "b") {
				return "Success";
			}
			if (colorCode === "Y" || colorCode === "y") {
				return "Warning";
			}
			if (colorCode === "R" || colorCode === "r") {
				return "Error";
			}
			if (colorCode === "") {
				return "None";
			}
		},

		dateTimeFormatReport: function (oDate) {
			oDate = new Date(oDate);
			if (oDate) {
				var oDateFormat = sap.ui.core.format.DateFormat
					.getTimeInstance({
						pattern: "dd.MM.yyyy HH:mm:ss"
					});
				// oDate = new Date(oDate);
				if (oDate.getDate().toString().length === 1) {
					var date = "0" + oDate.getDate();
				} else {
					var date = oDate.getDate();
				}
				if (oDate.getMonth().toString().length === 1 && oDate.getMonth() < 9) {
					var month = "0" + (oDate.getMonth() + 1);
				} else {
					var month = oDate.getMonth() + 1;
				}
				if (oDate.getHours().toString().length === 1) {
					var hrs = "0" + oDate.getHours();
				} else {
					var hrs = oDate.getHours();
				}
				if (oDate.getMinutes().toString().length === 1) {
					var min = "0" + oDate.getMinutes();
				} else {
					var min = oDate.getMinutes();
				}
				if (oDate.getSeconds().toString().length === 1) {
					var seconds = "0" + oDate.getSeconds();
				} else {
					var seconds = oDate.getSeconds();
				}
				var date = oDate.getFullYear() + "-" + month + "-" + date;

				// oDate.setHours(oDate.getHours() + 8);".00+08:00"
				return oDateFormat.format(oDate);
				// return date;
			} else {
				return "";
			}
		},

		enableDownload: function (docUrl) {
			if (docUrl) {
				return true;
			} else {
				return false;
			}
		},

		dateTimeFormat1: function (oDate) {
			oDate = new Date(oDate);
			if (oDate) {
				var oDateFormat = sap.ui.core.format.DateFormat
					.getDateInstance({
						pattern: "dd.MM.yyyy",
						calendarType: "Gregorian"
					});
				// oDate = new Date(oDate);
				if (oDate.getDate().toString().length === 1) {
					var date = "0" + oDate.getDate();
				} else {
					var date = oDate.getDate();
				}
				if (oDate.getMonth().toString().length === 1 && oDate.getMonth() < 9) {
					var month = "0" + (oDate.getMonth() + 1);
				} else {
					var month = oDate.getMonth() + 1;
				}
				if (oDate.getHours().toString().length === 1) {
					var hrs = "0" + oDate.getHours();
				} else {
					var hrs = oDate.getHours();
				}
				if (oDate.getMinutes().toString().length === 1) {
					var min = "0" + oDate.getMinutes();
				} else {
					var min = oDate.getMinutes();
				}
				if (oDate.getSeconds().toString().length === 1) {
					var seconds = "0" + oDate.getSeconds();
				} else {
					var seconds = oDate.getSeconds();
				}
				var date = oDate.getFullYear() + "-" + month + "-" + date;

				// oDate.setHours(oDate.getHours() + 8);".00+08:00"
				// return oDateFormat.format(date);
				return date;
			} else {
				return "";
			}
		},
		dateTimeFormat: function (oDate) {

			if (oDate) {
				oDate = new Date(oDate);
				var oDateFormat = sap.ui.core.format.DateFormat
					.getDateInstance({
						pattern: "dd.MM.yyyyTHH:mm:ss",
						calendarType: "Gregorian"
					});
				// oDate = new Date(oDate);
				if (oDate.getDate().toString().length === 1) {
					var date = "0" + oDate.getDate();
				} else {
					var date = oDate.getDate();
				}
				if (oDate.getMonth().toString().length === 1 && oDate.getMonth() < 9) {
					var month = "0" + (oDate.getMonth() + 1);
				} else {
					var month = oDate.getMonth() + 1;
				}
				if (oDate.getHours().toString().length === 1) {
					var hrs = "0" + oDate.getHours();
				} else {
					var hrs = oDate.getHours();
				}
				if (oDate.getMinutes().toString().length === 1) {
					var min = "0" + oDate.getMinutes();
				} else {
					var min = oDate.getMinutes();
				}
				if (oDate.getSeconds().toString().length === 1) {
					var seconds = "0" + oDate.getSeconds();
				} else {
					var seconds = oDate.getSeconds();
				}
				var date = oDate.getFullYear() + "-" + month + "-" + date + "T" + hrs + ":" + min + ":" + seconds;
				// oDate = new Date(date);
				// oDate.setHours(oDate.getHours() + 8);
				return date;
			} else {
				return "";
			}
		},

		setBlurVisibility: function (visiblity) {
			// if (visiblity === "") {
			// 	return "";
			// } 
			if (visiblity === "true") {
				return "BLUR";
			} else {
				return "";
			}

		},

	};
});