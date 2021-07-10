sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/Fragment",
	"sap/m/MessageToast",
	"../model/formatter",
	"sap/ui/model/Sorter",
	"sap/m/Token",
], function (Controller, MessageBox, Fragment, MessageToast, formatter, Sorter, Token) {
	"use strict";

	return Controller.extend("incture.com.ConnectClient_ReturnCreate.controller.DraftRecord", {
		formatter: formatter,

		onInit: function () {
			this.users = [];
			var that = this;
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.attachRoutePatternMatched(function (oEvent) {
				if (oEvent.getParameter("name") === "DraftRecord") {

				}
			});
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("DraftRecord").attachMatched(this._onObjectMatched, this);
			var draftSearchModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(draftSearchModel, "draftSearchModel");
			var baseModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(baseModel, "baseModel");
			this.getView().getModel("baseModel").setProperty("/languageID", "E");
			// this.getRouter().getRoute("DraftRecord").attachPatternMatched(this._onObjectMatched, this);
			this._getUser();
			if (sap.ui.getCore().getConfiguration().getLanguage() === "en-US") {

				this.getView().getModel("baseModel").setProperty("/language", "TH");
			} else {
				this.getView().getModel("baseModel").setProperty("/language", sap.ui.getCore().getConfiguration().getLanguage());
			}
			var actionModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(actionModel, "actionModel");
			this.getView().getModel("actionModel").setProperty("/editVisible", false);
			this.getView().getModel("actionModel").setProperty("/cancelVisible", true);
			that.salesOrgDataAccess = "No Access";
			that.SLOCDataAccess = "No Access";
			that.distrChannelDataAccess = "No Access";
			that.divisionDataAccess = "No Access";
			that.materialGroupDataAccess = "No Access";
			that.materialGroup4DataAccess = "No Access";
			that.plantDataAccess = "No Access";
			that.orderTypeDataAccess = "No Access";
			this.getView().getModel("baseModel").setProperty("/openVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/CollapseVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/SearchVisiblity", true);
		},

		liveSearchUsers: function (oEvent) {
			if (oEvent.getParameters().newValue === undefined) {
				var value = oEvent.getParameters().query;
			} else {
				var value = oEvent.getParameters().newValue;
			}

			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("userId", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("email", sap.ui.model.FilterOperator.Contains, value)
			]);
			filters.push(oFilter);
			var oBinding = sap.ui.getCore().byId("userListTableId").getBinding("items");
			// var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(filters);
		},

		valueHelpRequestUserList: function () {

			var that = this;
			if (!that.userList) {
				that.userList = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.UserList", that);
				that.getView().addDependent(that.userList);
				var oDataModel = new sap.ui.model.json.JSONModel();

				var that = this;
				var itemsPerPage, totalResult;

				var fData = [];
				var oBusyDialog = new sap.m.BusyDialog();
				oBusyDialog.open();
				var aData = jQuery.ajax({
					type: "GET",
					contentType: "application/json",
					url: "/DKSHJavaService/dac/getUsers/1&100",
					dataType: "json",
					async: false,
					success: function (data, textStatus, jqXHR) {
						var resultData = data;
						itemsPerPage = 100;
						totalResult = resultData.totalResults;
					},
					error: function (textStatus, jqXHR) {
						sap.m.MessageToast.show(that.resourceBundle.getText("userListError"));
						oBusyDialog.close();
					}

				});

				for (var startInd = 0; startInd * itemsPerPage < totalResult; startInd++) {

					var aData = jQuery.ajax({
						type: "GET",
						contentType: "application/json",
						url: "/DKSHJavaService/dac/getUsers/" + startInd * itemsPerPage + "&100",
						/*	url: "/DKSHJavaService/dac/getUsers/101&100",*/
						dataType: "json",
						async: false,
						success: function (data, textStatus, jqXHR) {
							var resultData = data;

							if (resultData.resources) {
								var finalData = [];
								for (var i = 0; i < resultData.resources.length; i++) {

									var group = resultData.resources[i].groups;
									if (group) {
										for (var j = 0; j < group.length; j++) {
											if (group[j].value === "DKSH_RETURN_CREATOR") {
												finalData.push({
													userId: resultData.resources[i].id,
													email: resultData.resources[i].emails[0].value
												});
											}
										}
									}
								}
								for (var k = 0; k < finalData.length; k++) {
									fData.push(finalData[k]);
								}
								// fData.push(finalData);

								var oModelData = new sap.ui.model.json.JSONModel({
									results: fData
								});
								oModelData.setSizeLimit(fData.length);
								that.userList.setModel(oModelData, "UsetTableSet");
								oBusyDialog.close();
								that.userList.open();
								/*	that.getView().byId("ID_TXT_HDR").setText(msgTotal + " (" + finalData.length + ")");
									var oModelData = new sap.ui.model.json.JSONModel({
										results: finalData
									});
									oModelData.setSizeLimit(finalData.length);
									that.getView().byId("ID_TABLE_USR").setModel(oModelData, "UsetTableSet");
									oBusyDialog.close();*/
							} else {
								sap.m.MessageToast.show(that.resourceBundle.getText("userListError"));
								oBusyDialog.close();
							}

						},
						error: function (jqXHR, textStatus, errorThrown) {
							sap.m.MessageToast.show(that.resourceBundle.getText("userListError"));
							oBusyDialog.close();
						}

					});

				}
			} else {
				this.getView().getModel("baseModel").setProperty("/searchValue", "");
				sap.ui.getCore().byId("userListTableId").getBinding("items").filter([]);
				that.userList.open();
			}
		},

		onCancelUsers: function () {

			sap.ui.getCore().byId("userListTableId").removeSelections();
			this.userList.close();
		},

		onOKUsers: function () {
			// this.users = [];
			// if (this.users.includes(this.getView().getModel("oUserDetailModel").getData().name) === false) {
			// 	this.users.push(this.getView().getModel("oUserDetailModel").getData().name);
			// }

			var oMultiInput = this.byId("userListId");
			oMultiInput.destroyTokens();
			var selectedContexts = sap.ui.getCore().byId("userListTableId").getSelectedContexts("UsetTableSet");
			var tableData = this.userList.getModel("UsetTableSet").getData().results;
			for (var i = 0; i < selectedContexts.length; i++) {

				var index = parseInt(selectedContexts[i].sPath.split("/")[2]);
				if (this.users.includes(tableData[index].userId) === false) {

					this.users.push(tableData[index].userId);
				}
			}
			for (var i = 0; i < this.users.length; i++) {

				oMultiInput.addToken(new Token({
					text: this.users[i]
				}));
			}

			sap.ui.getCore().byId("userListTableId").removeSelections();
			this.userList.close();

		},

		onDeleteUsers: function (oEvent) {
			var oMultiInput = this.byId("userListId");
			oMultiInput.destroyTokens();

			if (oEvent.getParameters().type === "removed") {
				var delToken = oEvent.getParameters().removedTokens[0].mProperties.text;
				for (var i = this.users.length; i >= 0; i--) {
					if (delToken === this.users[i]) {
						this.users.splice(i, 1);
					}
				}
				for (var j = 0; j < this.users.length; j++) {
					oMultiInput.addToken(new Token({
						text: this.users[j]
					}));
				}
			} else {
				var oMultiInput = this.byId("userListId");
				oMultiInput.destroyTokens();

				this.users.push(oEvent.getParameters().addedTokens[0].getText());
				for (var j = 0; j < this.users.length; j++) {
					oMultiInput.addToken(new Token({
						text: this.users[j]
					}));
				}
			}
		},

		_onObjectMatched: function () {
			if (sap.ui.getCore().getModel("draftItemModel")) {
				sap.ui.getCore().getModel("draftItemModel").setData("");
			}
			if (sap.ui.getCore().getModel("saveDraft") && sap.ui.getCore().getModel("saveDraft").getData() !== "") {
				this.onFilterDrafts(undefined, sap.ui.getCore().getModel("saveDraft").getData().orderNO);
			} else if (sap.ui.getCore().getModel("submitRequest") && sap.ui.getCore().getModel("submitRequest").getData() !== "") {
				this.onFilterDrafts(undefined, sap.ui.getCore().getModel("submitRequest").getData().orderNO);
			} else {
				this.ongetDrafts();
			}
		},

		onSearchDraft: function (oEvent) {
			if (oEvent.getParameters().newValue === undefined) {
				var value = oEvent.getParameters().query;
			} else {
				var value = oEvent.getParameters().newValue;
			}

			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("returnReqNum", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("roType", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("roTypeText", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("soldToParty", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("createdAt", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("orderReason", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("docVersion", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("totalRoAmount", sap.ui.model.FilterOperator.Contains, value)

			]);
			filters.push(oFilter);
			var oBinding = this.getView().byId("draftTableID").getBinding("items");
			// var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(filters);
		},

		onSortPress: function () {
			if (!this.SortFrag) {
				this.SortFrag = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.sort", this);
				this.getView().addDependent(this.SortFrag);
			}
			this.SortFrag.open();
		},

		handleSortDialogConfirm: function (oEvent) {
			var oTable = sap.ui.getCore().byId("idSoldtoPartyTableDraft"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				sPath,
				bDescending,
				aSorters = [];
			sPath = mParams.sortItem.getKey();
			bDescending = mParams.sortDescending;
			aSorters.push(new Sorter(sPath, bDescending));

			// apply the selected sort and group settings
			oBinding.sort(aSorters);
		},

		onPressCreateRequest: function () {
			var that = this;
			if (that.allAccess === false) {
				MessageToast.show(this.resourceBundle.getText("NoDataAccess"));
			} else {
				if (sap.ui.getCore().getModel("saveDraft")) {
					sap.ui.getCore().getModel("saveDraft").setData("");
				}
				if (sap.ui.getCore().getModel("submitRequest")) {
					sap.ui.getCore().getModel("submitRequest").setData("");
				}
				var oMultiInput = this.byId("userListId");
				if (oMultiInput !== undefined) {
					oMultiInput.destroyTokens();
				}
				var router = sap.ui.core.UIComponent.getRouterFor(this);
				router.navTo("Selection");
			}
		},

		onFilterDrafts: function (oEvent, ReqtNum) {
			var that = this;
			if (that.allAccess === false) {
				MessageToast.show(that.resourceBundle.getText("NoDataAccess"));
				return;
			}
			var baseModel = this.getView().getModel("baseModel");
			var that = this;
			if (ReqtNum !== undefined) {
				baseModel.setProperty("/draftNo", ReqtNum);
				baseModel.refresh();
			}
			if (this.getView().getModel("baseModel").getProperty("/userListVisiblity") === true) {
				if ((baseModel.getData().draftNo === undefined || baseModel.getData().draftNo === "") && (baseModel.getData().selectedOrderType ===
						undefined || baseModel.getData().selectedOrderType === "") && (baseModel.getData().selectedSalesOrg === undefined || baseModel.getData()
						.selectedSalesOrg === "") && (baseModel.getData().selectedSoldtoParty === undefined || baseModel.getData().selectedSoldtoParty ===
						"") && (baseModel.getData().selectedDistChnl === undefined || baseModel.getData().selectedDistChnl === "") && (baseModel.getData()
						.selectedDivision === undefined || baseModel.getData().selectedDivision === "") && (baseModel.getData().shipTo === undefined ||
						baseModel.getData().shipTo === "") && (baseModel.getData().selectedReasonCode === undefined || baseModel.getData().selectedReasonCode ===
						"") && (this.users === undefined || this.users.length === 0)) {
					MessageBox.information(this.resourceBundle.getText("Selectatleastoneinputcriteria"));
					// MessageBox.information("Select at least one input criteria");
				} else {
					var users = [];
					if (this.users === undefined || this.users.length === 0) {
						users.push(that.getView().getModel("oUserDetailModel").getData().name);
					} else {
						users = this.users;
					}
					var oModel = new sap.ui.model.json.JSONModel();
					var payload = {
						"returnReqNum": baseModel.getData().draftNo,
						"orderType": baseModel.getData().selectedOrderType,
						"salesOrg": baseModel.getData().selectedSalesOrg,
						"soldToParty": baseModel.getData().selectedSoldtoParty,
						"distributionChannel": baseModel.getData().selectedDistChnl,
						"division": baseModel.getData().selectedDivision,
						"shipTo": baseModel.getData().shipTo,
						"returnReason": baseModel.getData().selectedReasonCode,
						"createdAt": "",
						"userId": users,
						"loggedInUserId": that.getView().getModel("oUserDetailModel").getData().name,
						"projectCode": "cc",
						// "returnReqNum":
						// "userIds"
					};
					var oHeader = {
						"Content-Type": "application/json;charset=utf-8"
					};
					var busyDialog = new sap.m.BusyDialog();
					busyDialog.open();
					oModel.loadData("/DKSHJavaService/returnRequest/getReturnOrder/Filter", JSON.stringify(payload), true,
						"POST", false, false, oHeader);
					oModel.attachRequestCompleted(function (success) {
						busyDialog.close();
						var list = success.getSource().getData();
						// for (var i = 0; i < list.length; i++) {
						// 	if (list[i].requestorName.includes("P0000") === true) {
						// 		list[i].requestorName = list[i].requestorName.split("(")[1].split(")")[0];
						// 	}
						// }
						var draftDataModel = new sap.ui.model.json.JSONModel({
							"results": list
						});
						that.getView().setModel(draftDataModel, "draftDataModel");
						that.getView().getModel("draftDataModel").setProperty("/totalRequest", that.resourceBundle.getText("ReturnRequest") + "(" +
							success.getSource().getData().length +
							")");
						that.getView().getModel("draftDataModel").refresh();
						// }
					});
					oModel.attachRequestFailed(function (oEvent) {
						busyDialog.close();
						MessageBox.error(oEvent.getParameters().responseText);
					});
				}
			} else if ((baseModel.getData().draftNo === undefined || baseModel.getData().draftNo === "") && (baseModel.getData().selectedOrderType ===
					undefined || baseModel.getData().selectedOrderType === "") && (baseModel.getData().selectedSalesOrg === undefined || baseModel.getData()
					.selectedSalesOrg === "") && (baseModel.getData().selectedSoldtoParty === undefined || baseModel.getData().selectedSoldtoParty ===
					"") && (baseModel.getData().selectedDistChnl === undefined || baseModel.getData().selectedDistChnl === "") && (baseModel.getData()
					.selectedDivision === undefined || baseModel.getData().selectedDivision === "") && (baseModel.getData().shipTo === undefined ||
					baseModel.getData().shipTo === "") && (baseModel.getData().selectedReasonCode === undefined || baseModel.getData().selectedReasonCode ===
					"")) {
				MessageBox.information(this.resourceBundle.getText("Selectatleastoneinputcriteria"));

			} else {
				// if (this.users !== undefined && this.users.length > 0) {
				// 	var users = this.users;
				// } else {

				var users = [];
				users.push(that.getView().getModel("oUserDetailModel").getData().name);
				// }
				var oModel = new sap.ui.model.json.JSONModel();
				var payload = {
					"returnReqNum": baseModel.getData().draftNo,
					"orderType": baseModel.getData().selectedOrderType,
					"salesOrg": baseModel.getData().selectedSalesOrg,
					"soldToParty": baseModel.getData().selectedSoldtoParty,
					"distributionChannel": baseModel.getData().selectedDistChnl,
					"division": baseModel.getData().selectedDivision,
					"shipTo": baseModel.getData().shipTo,
					"returnReason": baseModel.getData().selectedReasonCode,
					"createdAt": "",
					"userId": users,
					"loggedInUserId": that.getView().getModel("oUserDetailModel").getData().name,
					"projectCode": "cc",
					// "userIds"
				};
				var oHeader = {
					"Content-Type": "application/json;charset=utf-8"
				};
				var busyDialog = new sap.m.BusyDialog();
				busyDialog.open();
				oModel.loadData("/DKSHJavaService/returnRequest/getReturnOrder/Filter", JSON.stringify(payload), true,
					"POST", false, false, oHeader);
				oModel.attachRequestCompleted(function (success) {
					busyDialog.close();
					var draftDataModel = new sap.ui.model.json.JSONModel({
						"results": success.getSource().getData()
					});
					that.getView().setModel(draftDataModel, "draftDataModel");
					if (success.getSource().getData()) {
						that.getView().getModel("draftDataModel").setProperty("/totalRequest", "Return Request (" + success.getSource().getData().length +
							")");
					} else {
						that.getView().getModel("draftDataModel").setProperty("/totalRequest", "Return Request (" + "0" +
							")");
					}
					that.getView().getModel("draftDataModel").refresh();
					// }
				});
				oModel.attachRequestFailed(function (oEvent) {
					if (oEvent.getParameters().statusCode === 409) {
						MessageToast.show(that.resourceBundle.getText("NoDataAccess"));
					} else {
						MessageBox.error(oEvent.getParameters().responseText);
					}
				});
			}
		},

		onPressCollapse: function () {
			this.getView().getModel("baseModel").setProperty("/openVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/CollapseVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/SearchVisiblity", false);
		},

		onPressOpen: function () {
			this.getView().getModel("baseModel").setProperty("/openVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/CollapseVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/SearchVisiblity", true);
		},

		ongetDrafts: function () {
			var that = this;
			if (that.allAccess === false) {
				MessageToast.show(that.resourceBundle.getText("NoDataAccess"));
				return;
			}
			this.getView().getModel("baseModel").setProperty("/draftNo", "");
			this.getView().getModel("baseModel").setProperty("/selectedSoldtoParty", "");
			this.getView().getModel("baseModel").setProperty("/selectedSoldtoPartyDesc", "");
			this.getView().getModel("baseModel").setProperty("/selectedSalesOrg", "");
			this.getView().getModel("baseModel").setProperty("/selectedSalesOrgDesc", "");
			this.getView().getModel("baseModel").setProperty("/selectedDistChnl", "");
			this.getView().getModel("baseModel").setProperty("/selectedDistChlDesc", "");
			this.getView().getModel("baseModel").setProperty("/selectedDivision", "");
			this.getView().getModel("baseModel").setProperty("/selectedDivisionDesc", "");
			this.getView().getModel("baseModel").setProperty("/selectedOrderType", "");
			this.getView().getModel("baseModel").setProperty("/selectedOrderTypeDesc", "");
			this.getView().getModel("baseModel").setProperty("/shipTo", "");
			this.getView().getModel("baseModel").setProperty("/selectedReasonCode", "");
			this.getView().getModel("baseModel").setProperty("/selectedReasonDesc", "");
			this.getView().getModel("baseModel").setProperty("/users", "");
			this.users = [];
			var oMultiInput = this.byId("userListId");
			if (oMultiInput !== undefined) {
				oMultiInput.destroyTokens();
			}
			this.getView().getModel("baseModel").setProperty("/users", "");
			// 			url - 
			//  Method -  POST
			//  Input Payload - 
			// 
			var that = this;
			if (that.getView().getModel("oUserDetailModel").getData().name !== undefined) {
				var oModel = new sap.ui.model.json.JSONModel();

				var oHeader = {
					"Content-Type": "application/json;charset=utf-8"
				};
				var busyDialog = new sap.m.BusyDialog();
				busyDialog.open();
				oModel.loadData("/DKSHJavaService/returnRequest/getAllReturnOrder/" + that.getView().getModel("oUserDetailModel").getData().name +
					"&cc", true,
					"GET", false, false, oHeader);
				oModel.attachRequestCompleted(function (success) {
					busyDialog.close();
					var data = success.getSource().getData();
					// for (var i = 0; i < success.getSource().getData().exchangeOrder.length; i++) {
					// 	data.push(success.getSource().getData().exchangeOrder[i]);
					// }
					// for (var j = 0; j < success.getSource().getData().returnOrder.length; j++) {
					// 	data.push(success.getSource().getData().returnOrder[j]);
					// }
					// var list = success.getSource().getData();
					// for (var i = 0; i < data.length; i++) {
					// 	if (data[i].requestorName.includes("P0000") === true) {
					// 		data[i].requestorName = data[i].requestorName.split("(")[1].split(")")[0];
					// 	}
					// }
					// if (success.getSource().getData().userPersonaDto !== null) {
					// MessageBox.error(success.getSource().getData());
					var draftDataModel = new sap.ui.model.json.JSONModel({
						"results": data
					});

					that.getView().setModel(draftDataModel, "draftDataModel");
					if (data.length) {
						that.getView().getModel("draftDataModel").setProperty("/totalRequest", "Return Request (" + data.length + ")");
						draftDataModel.setSizeLimit(data.length);
					} else {
						that.getView().getModel("draftDataModel").setProperty("/totalRequest", "Return Request (" + "0" + ")");
					}
					that.getView().getModel("draftDataModel").refresh();
					// }
				});
				oModel.attachRequestFailed(function (oEvent) {
					busyDialog.close();
					if (oEvent.getParameters().statusCode === 409) {
						MessageToast.show(that.resourceBundle.getText("NoDataAccess"));
					} else {
						MessageBox.error(oEvent.getParameters().responseText);
					}
				});
			}
		},
		_getUser: function () {
			var that = this;
			var oUserDetailModel = new sap.ui.model.json.JSONModel();
			that.getView().setModel(oUserDetailModel, "oUserDetailModel");
			oUserDetailModel.loadData("/services/userapi/attributes", null, true);
			oUserDetailModel.attachRequestCompleted(function (oEvent) {
				// that.getView().getModel("baseModel").setProperty("/email", that.getView().getModel("oUserDetailModel").getData().email);
				var userId = that.getView().getModel("oUserDetailModel").getData().name;
				that._getLoggedInUserDetails(userId);
				that._getLoggedInUserDetails1(userId); //Method to get Logged in user PID
				// that.ongetDrafts();
			});
			oUserDetailModel.attachRequestFailed(function (oEvent) {
				MessageBox.error(oEvent.getSource().getData().message);
			});
		},

		_getLoggedInUserDetails1: function (userId) {
			var that = this;
			var oModel = new sap.ui.model.json.JSONModel();
			that.getView().setModel(oModel, "oModel");
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			oModel.loadData("/DKSHJavaService/userDetails/findAllRightsForUserInDomain/" + userId + "&cc", null, true);
			oModel.attachRequestCompleted(function (data) {
				busyDialog.close();
				if (!data.getParameters().errorobject) {
					var custAttribute = data.getSource().getData();
					if (custAttribute.message)
						that.allAccess = false;
					// var custAttribute = data.getSource().getData();
					if (custAttribute.ATR01 !== null) {
						that.salesOrgDataAccess = custAttribute.ATR01;

					}
					if (custAttribute.ATR02 !== null) {
						that.distrChannelDataAccess = custAttribute.ATR02;
						// that._distChannelList();
					}
					if (custAttribute.ATR03 !== null) {
						that.divisionDataAccess = custAttribute.ATR03;
					}
					if (custAttribute.ATR04 !== null) {
						that.materialGroupDataAccess = custAttribute.ATR04;
					}
					if (custAttribute.ATR05 !== null) {
						that.materialGroup4DataAccess = custAttribute.ATR05;
					}
					if (custAttribute.ATR10 !== null) {
						that.SLOCDataAccess = custAttribute.ATR10;
					}
					if (custAttribute.ATR09 !== null) {
						that.plantDataAccess = custAttribute.ATR09;
					}
					if (custAttribute.ATR07 !== null) {
						that.materialDataAccess = custAttribute.ATR07;
					}
					if (custAttribute.ATR08 !== null) {
						that.orderTypeDataAccess = custAttribute.ATR08;
					}
					if (custAttribute.ATR06 !== null) {
						that.custCodeDataAccess = custAttribute.ATR06;
					}
				}
				that.ongetDrafts();
				// else {

				// 	sap.m.MessageBox.error(data.getParameters().errorobject.responseText);
				// }
			});
			oModel.attachRequestFailed(function (oEvent) {
				busyDialog.close();
				// if (oEvent.status == 409)
				that.allAccess = false;
				// else
				// sap.m.MessageBox.error(oEvent.getParameters().responseText);
			});

		},

		_getLoggedInUserDetails: function (userId) {
			var that = this;
			var oLoggedInUserDetailModel = new sap.ui.model.json.JSONModel();
			that.getView().setModel(oLoggedInUserDetailModel, "oLoggedInUserDetailModel");
			// Service to getLogged in User detail
			oLoggedInUserDetailModel.loadData("/UserManagement/service/scim/Users/" + userId, null, true);
			oLoggedInUserDetailModel.attachRequestCompleted(function (oEvent) {
				// data access control
				sap.ui.getCore().setModel(that.getOwnerComponent().getModel("globalModel"), "globalModel");
				sap.ui.getCore().getModel("globalModel").setProperty("/userId", oEvent.getSource().getData().id);
				sap.ui.getCore().getModel("globalModel").setProperty("/userName", oEvent.getSource().getData().displayName);
				that.getView().getModel("baseModel").setProperty("/userId", oEvent.getSource().getData().id);
				that.getView().getModel("baseModel").setProperty("/userName", oEvent.getSource().getData().displayName);
				// that.getView().getModel("baseModel").setProperty("/country", oEvent.getSource().getData().addresses[0].);
				if (oEvent.getSource().getData().phoneNumbers !== undefined) {
					that.getView().getModel("baseModel").setProperty("/phone", oEvent.getSource().getData().phoneNumbers[0].value);

					sap.ui.getCore().getModel("globalModel").setProperty("/phone", oEvent.getSource().getData().phoneNumbers[0].value);
				}

				if (oEvent.getSource().getData().groups) {
					var group = oEvent.getSource().getData().groups;
					var count = 0;
					for (var i = 0; i < group.length; i++) {
						if (group[i].value === "DKSH_IT") {
							++count;
						}
					}
					if (count > 0) {
						that.getView().getModel("baseModel").setProperty("/userListVisiblity", true);
					} else {
						that.getView().getModel("baseModel").setProperty("/userListVisiblity", false);
					}
				}

			});
			oLoggedInUserDetailModel.attachRequestFailed(function (oEvent) {
				that.allAccess = false;
				// else
				// sap.m.MessageBox.error(oEvent.getParameters().responseText);
			});
		},

		onAfterRendering: function () {
			this.resourceBundle = this.getView().getModel("i18n").getResourceBundle();
		},

		onSelectDoc: function (oEvent) {
			var that = this;

			var selectedObj = oEvent.getSource().getSelectedContexts()[0].getObject();

			if (this.getView().getModel("baseModel").getProperty("/phone") && this.getView().getModel("baseModel").getProperty("/userId") ===
				selectedObj.requestedBy) {
				selectedObj.phone = this.getView().getModel("baseModel").getProperty("/phone");
			} else {
				selectedObj.phone = "";
			}
			// if (selectedObj.docVersion === "DRAFT") {
			var oModelTb = new sap.ui.model.json.JSONModel(selectedObj);
			sap.ui.getCore().setModel(oModelTb, "draftItemModel");
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("Selection", true);
		},

		onPressAllDownload: function (oEvent) {
			var that = this;

			var selectedObj = oEvent.getSource().getBindingContext("draftDataModel").getObject();

			var oModel = new sap.ui.model.json.JSONModel();
			that.getView().setModel(oModel, "oModel");
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			oModel.loadData("/DKSHJavaService/Attachment/downloadFileByReturnReqNum/" + selectedObj.returnReqNum + "&" + selectedObj.salesOrg.slice(
				0, 2), null, true);
			oModel.attachRequestCompleted(function (oEvent) {
				busyDialog.close();

			});
			oModel.attachRequestFailed(function (oEvent) {
				busyDialog.close();
				MessageBox.error(oEvent.getSource().getData().message);
			});
		},

		onPressMoreDetails: function (oEvent) {

			if (this._oPopover) {
				this._oPopover = undefined;
			}
			if (sap.ui.getCore().getModel("saveDraft")) {
				sap.ui.getCore().getModel("saveDraft").setData("");
			}
			if (sap.ui.getCore().getModel("submitRequest")) {
				sap.ui.getCore().getModel("submitRequest").setData("");
			}
			this.oButton = oEvent.getSource();
			var that = this;
			var selectedObj = oEvent.getSource().getBindingContext("draftDataModel").getObject();
			if (selectedObj.docVersion === "DRAFT") {
				var oModelTb = new sap.ui.model.json.JSONModel(selectedObj);
				sap.ui.getCore().setModel(oModelTb, "draftItemModel");
				var router = sap.ui.core.UIComponent.getRouterFor(this);
				router.navTo("Selection", true);
				// }
			} else if (selectedObj.docVersion === "ERROR") {
				this.selectedObj = oEvent.getSource().getBindingContext("draftDataModel").getObject();
				this.getView().getModel("actionModel").setProperty("/editVisible", true);
				this._moreDetails(this.selectedObj);

			} else {
				this.selectedObj = oEvent.getSource().getBindingContext("draftDataModel").getObject();
				this.getView().getModel("actionModel").setProperty("/editVisible", false);
				var orderNo = selectedObj.returnReqNum;
				this._moreDetails(this.selectedObj);
			}
		},

		_actionPopover: function (oEvent) {
			var actionModel = this.getView().getModel("actionModel");
			var oButton = this.oButton;
			var that = this;
			if (!that.ActionPopover) {
				that.ActionPopover = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.ActionPopover", this);
				that.getView().addDependent(that.ActionPopover);
				that.ActionPopover.addStyleClass("sapUiSizeCompact");
			}
			that.ActionPopover.open();
		},

		_moreDetails: function (selectedObj) {
			var selectedObj = selectedObj;
			var that = this;
			var oModel = new sap.ui.model.json.JSONModel();
			that.getView().setModel(oModel, "oModel");
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			oModel.loadData("/DKSHJavaService/returnRequest/getReturnOrder/Message/" + selectedObj.returnReqNum, null, true);
			oModel.attachRequestCompleted(function (oEvent) {
				busyDialog.close();
				var oSuccess = oEvent.getSource().getData();

				that.getView().getModel("actionModel").setProperty("/returnReqNum", oSuccess.returnReqNum);
				if (oSuccess.sapReturnOrderNum !== undefined && oSuccess.sapReturnOrderNum !== null) {
					var returnOrder = [];
					for (var i = 0; i < oSuccess.sapReturnOrderNum.length; i++) {
						var obj = {
							OrderNo: oSuccess.sapReturnOrderNum[i]
						};
						returnOrder.push(obj);
					}
					that.getView().getModel("actionModel").setProperty("/sapReturnOrderNum", returnOrder);
					that.getView().getModel("actionModel").setProperty("/sapReturnVisiblity", true);
					that.getView().getModel("actionModel").setProperty("/sapExchangeVisiblity", false);
					that.getView().getModel("actionModel").setProperty("/message", false);
				}
				if (oSuccess.sapExchangeOrderNum !== undefined && oSuccess.sapExchangeOrderNum !== null) {
					var exchangeOrder = [];
					for (var i = 0; i < oSuccess.sapExchangeOrderNum.length; i++) {
						var obj = {
							OrderNo: oSuccess.sapExchangeOrderNum[i]
						};
						exchangeOrder.push(obj);
					}
					that.getView().getModel("actionModel").setProperty("/sapExchangeOrderNum", exchangeOrder);
					that.getView().getModel("actionModel").setProperty("/sapReturnVisiblity", false);
					that.getView().getModel("actionModel").setProperty("/sapExchangeVisiblity", true);
					that.getView().getModel("actionModel").setProperty("/message", false);
				}
				if ((oSuccess.sapExchangeOrderNum !== undefined && oSuccess.sapExchangeOrderNum !== null) && (oSuccess.sapReturnOrderNum !==
						undefined && oSuccess.sapReturnOrderNum !== null)) {
					that.getView().getModel("actionModel").setProperty("/sapReturnVisiblity", true);
					that.getView().getModel("actionModel").setProperty("/sapExchangeVisiblity", true);
				}
				if (selectedObj.docVersion === "ERROR") {
					that.getView().getModel("actionModel").setProperty("/errorMessage", oSuccess.message);
					that.getView().getModel("actionModel").setProperty("/sapReturnVisiblity", false);
					that.getView().getModel("actionModel").setProperty("/sapExchangeVisiblity", false);
					that.getView().getModel("actionModel").setProperty("/message", true);
				}
				that._actionPopover();
			});
			oModel.attachRequestFailed(function (oEvent) {
				busyDialog.close();
				MessageBox.error(oEvent.getSource().getData().message);
			});
			// }
		},

		onCloseAction: function () {
			this.ActionPopover.close();
		},

		onEditErrorDraft: function () {
			var oModelTb = new sap.ui.model.json.JSONModel(this.selectedObj);
			sap.ui.getCore().setModel(oModelTb, "draftItemModel");
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("Selection", true);
		},

		valueHelpRequestSoldtoParty: function () {
			var that = this;
			if (!that.SoldtoParty) {
				that.SoldtoParty = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.DraftSoldTo", this);
				that.getView().addDependent(that.SoldtoParty);
				that.SoldtoParty.addStyleClass("sapUiSizeCompact");
			}
			// sap.ui.getCore().byId("idFrgCustID").setValueState(sap.ui.core.ValueState.None);
			// sap.ui.getCore().byId("idSearchSoldToParty").setValue("");
			that.SoldtoParty.open();
		},

		onSubmitSoldtoParty: function (oEvent) {
			var oTable = sap.ui.getCore().byId("idSoldtoPartyTableDraft");
			if (oTable.getItems().length > 0 && oTable.getSelectedContextPaths().length > 0) {
				var oBinding = oTable.getSelectedItem().getBindingContext("SoldToPartyListSet");
				var baseModel = this.getView().getModel("baseModel").getData();
				baseModel.selectedSoldtoParty = oBinding.getProperty("CustCode");
				baseModel.selectedSoldtoPartyDesc = oBinding.getProperty("Name1");
				baseModel.selectedDistChnl = oBinding.getProperty("Distchl");
				baseModel.selectedSalesOrg = oBinding.getProperty("SalesOrg");
				baseModel.selectedDistChlDesc = oBinding.getProperty("DCName");
				baseModel.selectedSalesOrg = oBinding.getProperty("SalesOrg");
				baseModel.selectedSalesOrgDesc = oBinding.getProperty("SOrgName");
				baseModel.selectedDivision = oBinding.getProperty("Division");
				baseModel.selectedDivisionDesc = oBinding.getProperty("DName");
				this.getView().getModel("baseModel").refresh();
				this.onResetSoldToParty();
				this.SoldtoParty.close();
			} else {
				MessageBox.information(this.resourceBundle.getText("Selectatleastoneitem"));
			}

		},

		onSearchSoldToParty: function (oEvent) {
			var that = this,
				// SoldToPartyList = new sap.ui.model.json.JSONModel({
				// 	"results": []
				// }),
				aPayload = this.getView().getModel("baseModel").getData(),
				afilters = [];

			if (that.allAccess === false) {
				MessageToast.show(this.resourceBundle.getText("NoDataAccess"));
				return;
			}
			if ((aPayload.SoldtoParty === "" || aPayload.SoldtoParty === undefined) && (aPayload.SoldTopartyName === "" || aPayload.SoldTopartyName ===
					undefined) && (aPayload.Division === "" || aPayload.Division === undefined) && (aPayload.SalesOrg === "" || aPayload.SalesOrg ===
					undefined) &&
				(aPayload.DistChan === "" || aPayload.DistChan === undefined)) {
				MessageBox.information(this.resourceBundle.getText("Selectatleastoneinputcriteria"));
				return;
			}
			if (aPayload.SoldtoParty !== "" && aPayload.SoldtoParty !== undefined) {
				afilters.push(new sap.ui.model.Filter("CustCode", sap.ui.model.FilterOperator.EQ, aPayload.SoldtoParty));
			}
			if (that.custCodeDataAccess !== "*" && that.custCodeDataAccess !== undefined) {
				afilters.push(new sap.ui.model.Filter("custNumEx", sap.ui.model.FilterOperator.EQ, that.custCodeDataAccess));
			}

			if (aPayload.DistChan !== "" && aPayload.DistChan !== undefined) {
				afilters.push(new sap.ui.model.Filter("Distchl", sap.ui.model.FilterOperator.EQ, aPayload.DistChan));
			} else {
				afilters.push(new sap.ui.model.Filter("Distchl", sap.ui.model.FilterOperator.EQ, that.distrChannelDataAccess));
			}
			if (aPayload.Division !== "" && aPayload.Division !== undefined) {
				afilters.push(new sap.ui.model.Filter("Division", sap.ui.model.FilterOperator.EQ, aPayload.Division));
			} else {
				afilters.push(new sap.ui.model.Filter("Division", sap.ui.model.FilterOperator.EQ, that.divisionDataAccess));
			}
			if (aPayload.SalesOrg !== "" && aPayload.SalesOrg !== undefined) {
				afilters.push(new sap.ui.model.Filter("SalesOrg", sap.ui.model.FilterOperator.EQ, aPayload.SalesOrg));
			} else {
				afilters.push(new sap.ui.model.Filter("SalesOrg", sap.ui.model.FilterOperator.EQ, that.salesOrgDataAccess));
			}
			// if (this {\
			if (this.getView().getModel("baseModel").getProperty("/languageID") === "E") {
				if (aPayload.SoldTopartyName !== "" && aPayload.SoldTopartyName !== undefined) {
					afilters.push(new sap.ui.model.Filter("Name1", sap.ui.model.FilterOperator.EQ, "*" + aPayload.SoldTopartyName + "*"));
				}
			} else {
				if (aPayload.SoldTopartyName !== "" && aPayload.SoldTopartyName !== undefined) {
					afilters.push(new sap.ui.model.Filter("Name2", sap.ui.model.FilterOperator.EQ, "*" + aPayload.SoldTopartyName + "*"));
				}
			}
			afilters.push(new sap.ui.model.Filter("languageID", sap.ui.model.FilterOperator.EQ, this.getView().getModel("baseModel").getProperty(
				"/languageID")));
			// } else {
			// 	afilters.push(new sap.ui.model.Filter("languageID", sap.ui.model.FilterOperator.EQ, "E"));
			// }
			var oDataModel = this.getView().getModel("ZDKSH_CC_DAC_SOLDTOPARTY_SRV");
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			oDataModel.read("/ZSoldToPartySH", {
				async: false,
				filters: afilters,
				success: function (oData, oResponse) {
					busyDialog.close();
					var SoldToPartyListSet = new sap.ui.model.json.JSONModel({
						"results": oData.results
					});
					that.SoldtoParty.setModel(SoldToPartyListSet, "SoldToPartyListSet");
					that.SoldtoParty.getModel("SoldToPartyListSet").setProperty("/length", "Sold to (" + oData.results.length + ")");
					// that.CustCodeFrag.getModel("SoldToPartyListSet").setData({
					// 	"results": oData.d.results
					// });

				},
				error: function (error) {
					busyDialog.close();
					// MessageBox.error(JSON.parse(error.responseText).error.message.value);
					// that.busyDialog.close();
					var errorMsg = "";
					if (error.statusCode === 504) {
						errorMsg = that.resourceBundle.getText("timeOut");
						// errorMsg = this.resourceBundle.getProperty("connectionFailToFetchTheData");
						that.errorMsg(errorMsg);
					} else {
						errorMsg = JSON.parse(error.responseText);
						errorMsg = errorMsg.error.message.value;
						that.errorMsg(errorMsg);
					}
				}
			});

		},

		// general show error message function
		errorMsg: function (errorMsg) {
			sap.m.MessageBox.show(
				errorMsg, {
					styleClass: 'sapUiSizeCompact',
					icon: sap.m.MessageBox.Icon.ERROR,
					title: "Error",
					actions: [sap.m.MessageBox.Action.OK],
					onClose: function (oAction) {}
				}
			);
		},

		onResetSoldToParty: function () {
			var baseModel = this.getView().getModel("baseModel");
			baseModel.setProperty("/SoldtoParty", "");
			baseModel.setProperty("/SoldTopartyName", "");
			baseModel.setProperty("/Division", "");
			baseModel.setProperty("/DistChan", "");
			baseModel.setProperty("/SalesOrg", "");
			if (this.SoldtoParty) {
				if (this.SoldtoParty.getModel("SoldToPartyListSet") !== undefined) {
					this.SoldtoParty.getModel("SoldToPartyListSet").setData("");
				}
			}
			baseModel.refresh();
		},

		onCancelSoldtoParty: function () {
			var baseModel = this.getView().getModel("baseModel");
			baseModel.setProperty("/SoldtoParty", "");
			baseModel.setProperty("/SoldTopartyName", "");
			baseModel.setProperty("/Division", "");
			baseModel.setProperty("/DistChan", "");
			baseModel.setProperty("/SalesOrg", "");
			if (this.SoldtoParty.getModel("SoldToPartyListSet") !== undefined) {
				this.SoldtoParty.getModel("SoldToPartyListSet").setData("");
			}
			baseModel.refresh();
			this.SoldtoParty.close();
		},

		onLiveChangeSoldToParty: function (oEvent) {
			var value = oEvent.getParameters().newValue;
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([
				new sap.ui.model.Filter("CustCode", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("Name1", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("Distchl", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("Division", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("SalesOrg", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("DName", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("DCName", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("SOrgName", sap.ui.model.FilterOperator.Contains, value)
			]);
			filters.push(oFilter);
			var oBinding = oEvent.getSource().getParent().getParent().getBinding("items");
			oBinding.filter(filters);
		},

		valueHelpReturnReason: function () {
			var that = this;
			if (!that.returnReason) {
				that.returnReason = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.ReturnReason", this);
				that.getView().addDependent(that.returnReason);
				that.returnReason.addStyleClass("sapUiSizeCompact");

				var that = this;
				var oDataModel = that.getView().getModel("ZDKSH_CC_ORDER_REASONS_SRV");
				var busyDialog = new sap.m.BusyDialog();
				busyDialog.open();
				oDataModel.read("/OrderReasonSet", {
					async: false,
					success: function (oData, oResponse) {
						busyDialog.close();
						that.reasonModel = new sap.ui.model.json.JSONModel({
							"results": oData.results
						});
						that.getView().setModel(that.reasonModel, "OrderReasonSet");
						that.returnReason.open();
					},
					error: function (error) {
						busyDialog.close();
						var errorMsg = JSON.parse(error.responseText);
						errorMsg = errorMsg.error.message.value;
						that.errorMsg(errorMsg);
					}

				});
			} else {
				that.returnReason.open();
			}
		},

		valueHelpRequestSalesOrg: function (oEvent) {
			var that = this;
			if (that.salesOrgDataAccess === "No Access") {
				MessageToast.show(this.resourceBundle.getText("NoDataAccess"));
			} else {
				// var that = this;
				if (!that.salesOrg) {
					that.salesOrg = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.SalesOrg", that);
					that.getView().addDependent(that.salesOrg);
					var oDataModel = this.getView().getModel("ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV");
					var filters = [];
					var lang = "";
					if (sap.ushell) {
						if (sap.ui.getCore().getConfiguration().getLanguage() === "th") {
							lang = "2";
						} else {
							lang = "EN";
						}
					} else {
						lang = "EN";
					}
					lang = lang.toUpperCase();
					var oFilter = new sap.ui.model.Filter({
						filters: [
							new sap.ui.model.Filter("Language", sap.ui.model.FilterOperator.EQ, lang),
							new sap.ui.model.Filter("Salesorg", sap.ui.model.FilterOperator.EQ, that.salesOrgDataAccess)
						],
						and: true
					});
					filters.push(oFilter);
					var busyDialog = new sap.m.BusyDialog();
					busyDialog.open();
					oDataModel.read("/ZSearchHelp_SalesOrgSet", {
						async: false,
						filters: filters,
						success: function (oData, oResponse) {
							busyDialog.close();
							var salesOrgModel = new sap.ui.model.json.JSONModel({
								"results": oData.results
							});
							that.salesOrg.setModel(salesOrgModel, "salesOrgModel");
							that.salesOrg.open();
						},
						error: function (error) {
							busyDialog.close();
							var errorMsg = "";
							if (error.statusCode === 504) {
								errorMsg = that.resourceBundle.getText("timeOut");
								that.errorMsg(errorMsg);
							} else {
								errorMsg = JSON.parse(error.responseText);
								errorMsg = errorMsg.error.message.value;
								that.errorMsg(errorMsg);
							}
						}
					});
				} else {
					that.salesOrg.open();
				}
			}
		},

		valueHelpdistChannel: function () {
			var that = this;
			if (that.distrChannelDataAccess === "No Access") {
				MessageToast.show(this.resourceBundle.getText("NoDataAccess"));
			} else {
				if (!that.DistChnl) {
					that.DistChnl = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.DistChnl", that);
					that.getView().addDependent(that.DistChnl);
					var oDataModel = this.getView().getModel("ZDKSH_CC_HDR_LOOKUP_SRV");
					var filters = [];
					var lang = "";
					lang = lang.toUpperCase();
					var oFilter = new sap.ui.model.Filter({
						filters: [
							new sap.ui.model.Filter("Language", sap.ui.model.FilterOperator.EQ, "EN"),
							new sap.ui.model.Filter("DistChl", sap.ui.model.FilterOperator.EQ, that.distrChannelDataAccess)
						],
						and: true
					});
					filters.push(oFilter);
					var busyDialog = new sap.m.BusyDialog();
					busyDialog.open();
					oDataModel.read("/ZDISTCHLLOOKUPSet", {
						async: false,
						filters: filters,
						success: function (oData, oResponse) {
							busyDialog.close();
							var DistChanModel = new sap.ui.model.json.JSONModel({
								"results": oData.results
							});
							that.getView().setModel(DistChanModel, "DistChanSet");

							var DivisionModel = new sap.ui.model.json.JSONModel({
								"results": oData.results
							});
							that.DistChnl.setModel(DivisionModel, "DistChanSet");
							// that.DivisionFrag.open();
							that.DistChnl.open();
						},

						error: function (error) {
							busyDialog.close();
							var errorMsg = "";
							if (error.statusCode === 504) {
								errorMsg = "Request timed-out. Please try again!";
								that.errorMsg(errorMsg);
							} else {
								errorMsg = JSON.parse(error.responseText);
								errorMsg = errorMsg.error.message.value;
								that.errorMsg(errorMsg);
							}
						}
					});
				} else {
					that.DistChnl.open();
				}
			}
		},

		valueHelpRequestDivision: function () {
			var that = this;
			if (that.divisionDataAccess === "No Access") {
				MessageToast.show(this.resourceBundle.getText("NoDataAccess"));
			} else {
				if (!that.Division) {
					that.Division = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.Division", that);
					that.getView().addDependent(that.Division);
					var oDataModel = this.getView().getModel("ZDKSH_CC_HDR_LOOKUP_SRV");
					var filters = [];
					var oFilter = new sap.ui.model.Filter({
						filters: [
							new sap.ui.model.Filter("Language", sap.ui.model.FilterOperator.EQ, "EN"),
							new sap.ui.model.Filter("Division", sap.ui.model.FilterOperator.EQ, that.divisionDataAccess)
						],
						and: true
					});
					filters.push(oFilter);
					var busyDialog = new sap.m.BusyDialog();
					busyDialog.open();
					oDataModel.read("/ZDIVISIONLOOKUPSet", {
						async: false,
						filters: filters,
						success: function (oData, oResponse) {
							busyDialog.close();
							var DivisionModel = new sap.ui.model.json.JSONModel({
								"results": oData.results
							});
							that.Division.setModel(DivisionModel, "DivisionSet");
							that.Division.open();
						},
						error: function (error) {
							busyDialog.close();
							var errorMsg = "";
							if (error.statusCode === 504) {
								errorMsg = "Request timed-out. Please try again!";
								that.errorMsg(errorMsg);
							} else {
								errorMsg = JSON.parse(error.responseText);
								errorMsg = errorMsg.error.message.value;
								that.errorMsg(errorMsg);
							}
						}
					});
				} else {
					that.Division.open();
				}
			}
		},

		valueHelpOrderType: function (oEvent) {
			var that = this;
			if (that.orderTypeDataAccess === "No Access") {
				MessageToast.show(this.resourceBundle.getText("NoDataAccess"));
			} else {
				var that = this;
				if (!that.orderType) {
					that.orderType = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.OrderType", that);
					that.getView().addDependent(that.orderType);
					var oDataModel = this.getView().getModel("ZDKSH_CC_DAC_LOOKUP_SRV");
					var filters = [];
					var oFilter = new sap.ui.model.Filter({
						filters: [
							new sap.ui.model.Filter("languageKey", sap.ui.model.FilterOperator.EQ, "EN"),
							new sap.ui.model.Filter("orderType", sap.ui.model.FilterOperator.EQ, that.orderTypeDataAccess)
						],
						and: true

					});
					filters.push(oFilter);
					var busyDialog = new sap.m.BusyDialog();
					busyDialog.open();
					oDataModel.read("/orderTypeLookupSet", {
						async: false,
						filters: filters,
						success: function (oData, oResponse) {
							busyDialog.close();
							var orderTypeSet = new sap.ui.model.json.JSONModel({
								"results": oData.results
							});
							that.orderType.setModel(orderTypeSet, "orderTypeSet");
							that.orderType.open();
						},
						error: function (error) {
							busyDialog.close();
							var errorMsg = "";
							if (error.statusCode === 504) {
								errorMsg = "Request timed-out. Please try again!";
								that.errorMsg(errorMsg);
							} else {
								errorMsg = JSON.parse(error.responseText);
								errorMsg = errorMsg.error.message.value;
								that.errorMsg(errorMsg);
							}
						}
					});
				} else {
					that.orderType.open();
				}
			}
		},

		onConfirmChangeSalesOrg: function (oEvent) {
			oEvent.getSource().getBinding("items").filter([]);
			this.getView().getModel("baseModel").setProperty("/SalesOrg", oEvent.getParameters().selectedContexts[0].getObject().Salesorg);
			this.getView().getModel("baseModel").setProperty("/selectedSalesOrg", oEvent.getParameters().selectedContexts[0].getObject().Salesorg);
			this.getView().getModel("baseModel").setProperty("/selectedSalesOrgDesc", oEvent.getParameters().selectedContexts[0].getObject().SalesorgDesc);
			this.getView().getModel("baseModel").refresh();
			// console.log();
		},

		onLiveChangeSalesOrg: function (oEvent) {
			var value = oEvent.getParameters().value;
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("SalesorgDesc", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("Salesorg", sap.ui.model.FilterOperator.Contains, value)
			]);
			filters.push(oFilter);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(filters);
		},

		handleorderTypeSet: function (oEvent) {
			oEvent.getSource().getBinding("items").filter([]);
			this.getView().getModel("baseModel").setProperty("/selectedOrderType", oEvent.getParameters().selectedContexts[0].getObject().orderType);
			this.getView().getModel("baseModel").setProperty("/selectedOrderTypeDesc", oEvent.getParameters().selectedContexts[0].getObject()
				.orderTypeDesc);
			this.getView().getModel("baseModel").refresh();
		},

		onLiveChangeorderTypeSet: function (oEvent) {
			var value = oEvent.getParameters().value;
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("orderTypeDesc", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("orderType", sap.ui.model.FilterOperator.Contains, value)
			]);
			filters.push(oFilter);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(filters);
		},

		handleReturnReason: function (oEvent) {
			oEvent.getSource().getBinding("items").filter([]);
			this.getView().getModel("baseModel").setProperty("/selectedReasonCode", oEvent.getParameters().selectedContexts[0].getObject().Reason);
			this.getView().getModel("baseModel").setProperty("/selectedReasonDesc", oEvent.getParameters().selectedContexts[0].getObject().Description);
			this.getView().getModel("baseModel").refresh();
		},

		onLiveChangeReturnReason: function (oEvent) {
			var value = oEvent.getParameters().value;
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("Description", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("Reason", sap.ui.model.FilterOperator.Contains, value)
			]);
			filters.push(oFilter);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(filters);
		},

		handleAddDivision: function (oEvent) {
			oEvent.getSource().getBinding("items").filter([]);
			this.getView().getModel("baseModel").setProperty("/Division", oEvent.getParameters().selectedContexts[0].getObject().Division);
			this.getView().getModel("baseModel").setProperty("/selectedDivision", oEvent.getParameters().selectedContexts[0].getObject().Division);
			this.getView().getModel("baseModel").setProperty("/selectedDivisionDesc", oEvent.getParameters().selectedContexts[0].getObject().Name);
			this.getView().getModel("baseModel").refresh();
			// console.log();
		},

		onLiveChangeDivision: function (oEvent) {
			var value = oEvent.getParameters().value;
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("Division", sap.ui.model.FilterOperator.Contains, value)
			]);
			filters.push(oFilter);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(filters);
		},

		handleAddDistChan: function (oEvent) {
			oEvent.getSource().getBinding("items").filter([]);
			var baseModel = this.getView().getModel("baseModel");
			baseModel.setProperty("/selectedDistChnl", oEvent.getParameters().selectedContexts[0].getObject().DistChl);
			baseModel.setProperty("/DistChan", oEvent.getParameters().selectedContexts[0].getObject().DistChl);
			baseModel.setProperty("/selectedDistChlDesc", oEvent.getParameters().selectedContexts[0].getObject().Name);
			baseModel.refresh();
		},

		onLiveChangeDistChan: function (oEvent) {
			var value = oEvent.getParameters().value;
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("DistChl", sap.ui.model.FilterOperator.Contains, value)
			]);
			filters.push(oFilter);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(filters);
		},

		onExit: function () {
			if (this.SoldtoParty) {
				this.SoldtoParty.destroy();
			}
			if (this.SoldtoParty) {

			}
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf incture.com.ConnectClient_ReturnCreate.view.DraftRecord
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf incture.com.ConnectClient_ReturnCreate.view.DraftRecord
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf incture.com.ConnectClient_ReturnCreate.view.DraftRecord
		 */
		//	onExit: function() {
		//
		//	}

	});

});