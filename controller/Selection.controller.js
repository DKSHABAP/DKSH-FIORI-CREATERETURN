sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "../model/formatter", "sap/m/MessageToast", "sap/ui/core/Fragment",
	"sap/ui/core/format/DateFormat", "sap/ui/model/Sorter",
], function (e, t, r, o, s, i, a) {
	"use strict";
	return e.extend("incture.com.ConnectClient_ReturnCreate.controller.Selection", {
		formatter: r,
		onInit: function () {
			/*			var e = sap.ui.core.UIComponent.getRouterFor(this);
						e.attachRoutePatternMatched(this._handleRouteMatched, this);*/
			/*			this.getRouter().getRoute("Selection").attachRoutePatternMatched(this._handleRouteMatched, this);*/
			var t = this;
			this.selectedRetObjects = [];
			this.returnItems = [];
			this.returnConditions = [];
			this.exchangeItems = [];
			this.exchangeConditions = [];
			this.selectedObjects = [];
			var r = [];
			// ga('send', 'pageview', "/ReturnCreateTest");
			var o = new sap.ui.model.json.JSONModel;
			this.getView().setModel(o, "exchangeModel");
			var s = new sap.ui.model.json.JSONModel;
			this.getView().setModel(s, "exchangePreviewModel");
			this.getView().byId("RotypeSegementedBtnID").setEnabled(true);
			var i = new sap.ui.model.json.JSONModel;
			this.getView().setModel(i, "returnPreviewModel");
			var a = new sap.ui.model.json.JSONModel;
			this.getView().setModel(a, "returnModel");
			this.getView().getModel("returnModel").setProperty("/attachmentObject", r);
			var n = new sap.ui.model.json.JSONModel;
			this.getView().setModel(n, "baseModel");
			var n = this.getView().getModel("baseModel");
			var l = new sap.ui.model.json.JSONModel;
			this.getView().setModel(l, "invoiceSearchModel");
			var d = new sap.ui.model.json.JSONModel;
			this.getView().setModel(d, "PersonalizationModel");
			n.setProperty("/step1Validation", false);
			n.setProperty("/step2Validation", false);
			n.setProperty("/enableReturnReason", true);
			this._wizard = this.byId("ID_WIZARD_RETURN");
			this._oNavContainer = this.byId("ID_RETURN_NAVCON");
			this._oWizardContentPage = this.byId("ID_RETURN_PAGE");
			n.setProperty("/cancelBtnVisiblitys", true);
			n.setProperty("/submitBtnVisiblitys", false);
			n.setProperty("/previewBtnVisiblitys", false);
			n.setProperty("/exchangeBtnVisiblitys", false);
			n.setProperty("/saveAsDraftBtnVisiblitys", false);
			n.setProperty("/addressVisiblity", false);
			n.setProperty("/salesOrgEditable", true);
			n.setProperty("/distChnlEditable", true);
			n.setProperty("/attachmentTableVisiblity", false);
			n.setProperty("/exchangeTabVisiblity", false);
			n.setProperty("/smsInputVisiblity", false);
			n.setProperty("/emailInputVisiblity", false);
			n.setProperty("/commentsLength", 2);
			n.setProperty("/tableSelMode", "MultiSelect");
			n.setProperty("/attachmentLength", 0);
			n.setProperty("/visiblityROTypeSel", true);
			n.getProperty("/EXOneTimeCustomer", "");
			n.setProperty("/enableAddAttachment", true);
			n.setProperty("/enableViewAttachment", false);
			n.setProperty("/attachmentVisiblity", true);
			n.setProperty("/retDivEditablity", true);
			n.setProperty("/retSalesOrgEditablity", true);
			n.setProperty("/retDistChnlEditablity", true);
			this.getView().getModel("invoiceSearchModel").setProperty("/billingCategory", "C");
			this.getView().getModel("invoiceSearchModel").setProperty("/billingCategoryDesc", "Commercial Invoice");
			this.getView().getModel("baseModel").setProperty("/addressFieldEnable", true);
			this.getView().getModel("baseModel").setProperty("/EXaddressVisiblity", false);
			this._getUser();
			this.selectedReturnItems = [];
			t.salesOrgDataAccess = "No Access";
			t.SLOCDataAccess = "No Access";
			t.distrChannelDataAccess = "No Access";
			t.divisionDataAccess = "No Access";
			t.materialGroupDataAccess = "No Access";
			t.materialGroup4DataAccess = "No Access";
			t.plantDataAccess = "No Access";
			this.ranOnce = false;
			if (sap.ui.getCore().getConfiguration().getLanguage() === "en-US") {
				n.setProperty("/language", "TH")
			} else {
				n.setProperty("/language", sap.ui.getCore().getConfiguration().getLanguage())
			}
			n.setProperty("/languageID", "E");
			n.setProperty("/invoiceTableLength", "");
			n.setProperty("/returnTableLength", "");
			n.setProperty("/exchangeTableLength", "");
			n.setProperty("/disableSoldToParty", true);
			this.getOwnerComponent().getService("ShellUIService").then(function (e) {
				e.setBackNavigation(function () {

					t._discardChanges();
					t._wizard.discardProgress(t._wizard.getSteps()[0]);
					var e = sap.ushell.Container.getService("CrossApplicationNavigation");
					var r = sap.ui.core.routing.History.getInstance(),
						o = r.getPreviousHash(),
						e = sap.ushell.Container.getService("CrossApplicationNavigation");
					if (o !== undefined) {
						history.go(-1)
					} else {
						e.toExternal({
							target: {
								shellHash: "#"
							}
						})
					}
				})
			});
			n.setProperty("/InvCollapseVisiblity", true);
			n.setProperty("/InvOpenVisiblity", false);
			n.setProperty("/InvSearchBar", true);
			n.setProperty("/ExcCollapseVisiblity", true);
			n.setProperty("/ExcOpenVisiblity", false);
			n.setProperty("/ExcSearchBar", true);
			n.setProperty("/PrevCollapseVisiblity", true);
			n.setProperty("/PrevopenVisiblity", false);
			n.setProperty("/PrevSearchBar", true);
			n.setProperty("/RetCollapseVisiblity", true);
			n.setProperty("/RetOpenVisiblity", false);
			n.setProperty("/ReturnSeacrhBar", true);
			n.setProperty("/EXOneTimeCustomer", "");
			n.setProperty("/oneTimeCustomer", "")
			var e = sap.ui.core.UIComponent.getRouterFor(this);
			e.attachRoutePatternMatched(this._handleRouteMatched, this);
		},
		onPressInvCollapse: function () {
			this.getView().getModel("baseModel").setProperty("/InvCollapseVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/InvOpenVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/InvSearchBar", false)
		},
		onPressInvOpen: function () {
			this.getView().getModel("baseModel").setProperty("/InvCollapseVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/InvOpenVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/InvSearchBar", true)
		},
		onPressRetCollapse: function () {
			this.getView().getModel("baseModel").setProperty("/RetCollapseVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/RetOpenVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/ReturnSeacrhBar", false)
		},
		onPressRetOpen: function () {
			this.getView().getModel("baseModel").setProperty("/RetCollapseVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/RetOpenVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/ReturnSeacrhBar", true)
		},
		onPressExCollapse: function () {
			this.getView().getModel("baseModel").setProperty("/ExcCollapseVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/ExcOpenVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/ExcSearchBar", false)
		},
		onPressExOpen: function () {
			this.getView().getModel("baseModel").setProperty("/ExcCollapseVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/ExcOpenVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/ExcSearchBar", true)
		},
		onPressPreCollapse: function () {
			this.getView().getModel("baseModel").setProperty("/PrevCollapseVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/PrevopenVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/PrevSearchBar", false)
		},
		onPressPreOpen: function () {
			this.getView().getModel("baseModel").setProperty("/PrevCollapseVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/PrevopenVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/PrevSearchBar", true)
		},
		OnPressSelectionNv: function () {
			var e = sap.ui.core.UIComponent.getRouterFor(this);
			e.navTo("DraftRecord", true)
		},
		_handleRouteMatched: function () {
			var e = this;
			var t = e.getView().getModel("baseModel");
			if (sap.ui.getCore().getModel("globalModel").getProperty("/phone")) {
				t.setProperty("/phone", sap.ui.getCore().getModel("globalModel").getProperty("/phone"))
			} else {
				t.setProperty("/phone", "")
			}
			if (sap.ui.getCore().getModel("draftItemModel") === undefined || sap.ui.getCore().getModel("draftItemModel").getData() === "") {
				t.setProperty("/tableSelMode", "MultiSelect");
				t.setProperty("/step1Validation", false);
				t.setProperty("/step2Validation", false);
				t.setProperty("/step3Validation", false);
				this._getUser();
				return
			}
			var r = new sap.m.BusyDialog;
			r.open();
			var o = sap.ui.getCore().getModel("draftItemModel").getData();
			var s = "/DKSHJavaService/returnRequest/getByReturnReqNum/" + o.returnReqNum + "&" + sap.ui.getCore().getModel("globalModel").getProperty(
				"/userId") + "&cc";
			var i = new sap.ui.model.json.JSONModel;
			var e = this;
			i.loadData(s, true, "GET", false, false);
			i.attachRequestCompleted(function (o) {
				r.close();
				e.editDraftData = o.getSource().getData();
				var s = new sap.ui.model.json.JSONModel({
					results: e.editDraftData
				});
				e.getView().setModel(s, "editDraftModel");
				e._setDraftData(e.editDraftData.docVersion);
				t.setProperty("/step1Validation", true);
				t.setProperty("/step2Validation", true);
				t.setProperty("/step3Validation", true);
				t.setProperty("/step4Validation", true)
			});
			i.attachRequestFailed(function (e) {
				sap.m.MessageToast.show("Error");
				r.close()
			})
		},
		_setDraftData: function (e) {
			this.docVersion = e;
			var t = this.getView().getModel("baseModel");
			if (this.docVersion === "SUCCESS") {
				t.setProperty("/visiblityROTypeSel", false);
				t.setProperty("/enableAddAttachment", false);
				t.setProperty("/enableViewAttachment", true);
				this.getView().byId("RotypeSegementedBtnID").setEnabled(false);
				t.setProperty("/enableReturnReason", false);
				t.setProperty("/custSelFormEditablity", false);
				t.setProperty("/InvoiceNoIP", false);
				t.setProperty("/InvMat", false);
				t.setProperty("/InvBatNo", false);
				t.setProperty("/InvSrlIP", false);
				t.setProperty("/InvSrlChbx", false);
				t.setProperty("/InvBillCat", false);
				t.setProperty("/InvDateFrom", false);
				t.setProperty("/InvDateTo", false);
				t.setProperty("/datePrev", false);
				t.setProperty("/dateNext", false);
				t.setProperty("/InvSrch", false);
				t.setProperty("/InvReset", false);
				t.setProperty("/salesOrgEditable", false);
				t.setProperty("/distChnlEditable", false);
				t.setProperty("/disableSoldToParty", false);
				t.setProperty("/billingTypeEnable", false);
				t.setProperty("/InvSetting", false);
				t.setProperty("/InvNext", false);
				t.setProperty("/selRoTypeEdit", false);
				t.setProperty("/CopyExcbtn", false);
				t.setProperty("/RetUndo", false);
				t.setProperty("/RetDel", false);
				t.setProperty("/RetRemarkEnable", false);
				t.setProperty("/RetAddFileEnable", false);
				t.setProperty("/RetEmailChbxEnable", false);
				t.setProperty("/RetEmailIPEnable", false);
				t.setProperty("/RetSmsChbx", false);
				t.setProperty("/RetPhNoIP", false);
				t.setProperty("/RetReasonOwnerEnable", false);
				t.setProperty("/RetRefNo", false);
				t.setProperty("/RetRequestor", false);
				t.setProperty("/exShipToEnable", false);
				t.setProperty("/ExRemarkEnable", false);
				t.setProperty("/enableAddMat", false);
				t.setProperty("/enableExDel", false);
				t.setProperty("/enableExUndo", false);
				t.setProperty("/enableCompltDel", false);
				t.setProperty("/saveAsDraftBtnVisiblitys", false);
				t.setProperty("/previewBtnVisiblitys", false);
				t.setProperty("/submitBtnVisiblitys", false);
				t.setProperty("/attachmentDelEnable", false);
				t.setProperty("/tableSelMode", "None");
				t.refresh()
			} else {
				t.setProperty("/visiblityROTypeSel", true);
				t.setProperty("/enableAddAttachment", true);
				t.setProperty("/enableViewAttachment", false);
				this.getView().byId("RotypeSegementedBtnID").setEnabled(true);
				t.setProperty("/tableSelMode", "MultiSelect");
				t.setProperty("/enableReturnReason", true);
				t.setProperty("/custSelFormEditablity", true);
				t.setProperty("/InvoiceNoIP", true);
				t.setProperty("/InvMat", true);
				t.setProperty("/InvBatNo", true);
				t.setProperty("/InvSrlIP", true);
				t.setProperty("/InvSrlChbx", true);
				t.setProperty("/InvBillCat", true);
				t.setProperty("/InvDateFrom", true);
				t.setProperty("/InvDateTo", true);
				t.setProperty("/datePrev", true);
				t.setProperty("/dateNext", true);
				t.setProperty("/billingTypeEnable", true);
				t.setProperty("/InvSrch", true);
				t.setProperty("/InvReset", true);
				t.setProperty("/salesOrgEditable", true);
				t.setProperty("/distChnlEditable", true);
				t.setProperty("/disableSoldToParty", true);
				t.setProperty("/InvSetting", true);
				t.setProperty("/InvNext", true);
				t.setProperty("/selRoTypeEdit", true);
				t.setProperty("/CopyExcbtn", true);
				t.setProperty("/RetSetting", true);
				t.setProperty("/RetUndo", true);
				t.setProperty("/RetDel", true);
				t.setProperty("/RetRemarkEnable", true);
				t.setProperty("/RetAddFileEnable", true);
				t.setProperty("/RetEmailChbxEnable", true);
				t.setProperty("/RetEmailIPEnable", true);
				t.setProperty("/RetSmsChbx", true);
				t.setProperty("/RetPhNoIP", true);
				t.setProperty("/RetReasonOwnerEnable", true);
				t.setProperty("/RetRefNo", true);
				t.setProperty("/RetRequestor", true);
				t.setProperty("/exShipToEnable", true);
				t.setProperty("/ExRemarkEnable", true);
				t.setProperty("/enableAddMat", true);
				t.setProperty("/enableExDel", true);
				t.setProperty("/enableExUndo", true);
				t.setProperty("/enableExSetting", true);
				t.setProperty("/enableCompltDel", true);
				t.setProperty("/saveAsDraftBtnVisiblitys", true);
				t.setProperty("/previewBtnVisiblitys", true);
				t.setProperty("/submitBtnVisiblitys", true);
				t.setProperty("/attachmentDelEnable", true)
			}
			var r = this;
			t.setProperty("/step1Validation", true);
			t.setProperty("/step2Validation", true);
			t.setProperty("/step3Validation", true);
			var o = this.getView().getModel("editDraftModel");
			var s = this.getView().getModel("editDraftModel").getData().results.listItemDto;
			var i = this.getView().getModel("invoiceSearchModel");
			var a = this.getView().getModel("returnModel");
			var n = this.getView().getModel("exchangeModel");
			t.setProperty("/billTo", o.getData().results.billToParty);
			t.setProperty("/contactDivision", o.getData().results.contactDivision);
			t.setProperty("/contactPerson", o.getData().results.contactPerson);
			t.setProperty("/contactTelephone", o.getData().results.contactTelephone);
			t.setProperty("/DistChan", o.getData().results.distributionChannel);
			i.setProperty("/distChnlDesc", o.getData().results.distributionChannelDesc);
			t.setProperty("/selectedDivisionDesc", o.getData().results.divisionDesc);
			if (o.getData().results.requestorName.includes("P0000") === true) {
				t.setProperty("/userName", o.getData().results.requestorName.split("(")[1].split(")")[0])
			} else {
				t.setProperty("/userName", o.getData().results.requestorName)
			}
			t.setProperty("/phone", "");
			i.setProperty("/salesOrgDesc", o.getData().results.salesOrgDesc);
			t.setProperty("/selectedSalesOrgDesc", o.getData().results.salesOrgDesc);
			t.setProperty("/selectedDistChlDesc", o.getData().results.distributionChannelDesc);
			t.setProperty("/selectedDistChnl", o.getData().results.distributionChannel);
			t.setProperty("/Division", o.getData().results.division);
			t.setProperty("/selectedReturnReason", o.getData().results.orderReason + o.getData().results.orderReasonText);
			t.setProperty("/returnOrderType", o.getData().results.orderType);
			t.setProperty("/payer", o.getData().results.payer);
			t.setProperty("/reasonOwner", o.getData().results.reasonOwner + " (" + o.getData().results.reasonOwnerDesc + ")");
			if (o.getData().results.updatedBy !== null && o.getData().results.updatedBy !== "") {
				t.setProperty("/requestor", o.getData().results.updatedBy)
			} else {
				t.setProperty("/requestor", "")
			}
			t.setProperty("/returnRemark", o.getData().results.requestRemark);
			t.setProperty("/selectedROTypeCode", o.getData().results.roType);
			t.setProperty("/customerPONumber", o.getData().results.customerPo);
			if (o.getData().results.roType === "TG" || o.getData().results.roType === "TF") {
				t.setProperty("/visiblityROTypeSel", true);
				t.setProperty("/visiblityROTypeText", false)
			} else {
				t.setProperty("/visiblityROTypeSel", false);
				t.setProperty("/visiblityROTypeText", true)
			}
			if (o.getData().results.oneTimeCustomer === null) {
				t.setProperty("/oneTimeCustomer", "")
			} else {
				t.setProperty("/oneTimeCustomer", o.getData().results.oneTimeCustomer)
			}
			if (o.getData().results.listAddressDo && o.getData().results.listAddressDo.length > 0) {
				t.setProperty("/partnerName", o.getData().results.listAddressDo[0].name1);
				t.setProperty("/partnerName4", o.getData().results.listAddressDo[0].name4);
				t.setProperty("/AddressStreet2", o.getData().results.listAddressDo[0].street2);
				t.setProperty("/AddressStreet3", o.getData().results.listAddressDo[0].street3);
				t.setProperty("/AddressStreet5", o.getData().results.listAddressDo[0].street5);
				t.setProperty("/District", o.getData().results.listAddressDo[0].district);
				t.setProperty("/DifferentCity", o.getData().results.listAddressDo[0].differentCity);
				t.setProperty("/postalCode", o.getData().results.listAddressDo[0].postalCode);
				t.setProperty("/refDocNum", o.getData().results.listAddressDo[0].refDocNum);
				t.setProperty("/city", o.getData().results.listAddressDo[0].city);
				t.setProperty("/telephone", o.getData().results.listAddressDo[0].telephone);
				t.setProperty("/mobileNumber", o.getData().results.listAddressDo[0].mobilePhone);
				t.setProperty("/taxId", o.getData().results.listAddressDo[0].taxId);
				t.setProperty("/bCode", o.getData().results.listAddressDo[0].b_Codes);
				t.setProperty("/bpNummr", o.getData().results.listAddressDo[0].bpNummr);
				t.setProperty("/invRetCountry", o.getData().results.listAddressDo[0].country);
				t.setProperty("/invRetRegion", o.getData().results.listAddressDo[0].region);
				t.setProperty("/invRetLanguage", o.getData().results.listAddressDo[0].language);
			}
			t.setProperty("/setRetAddress", o.getData().results.listAddressDo);
			t.setProperty("/returnSoldTo", o.getData().results.soldToParty);
			t.setProperty("/returnSoldToDesc", o.getData().results.soldToPartyDesc);
			t.setProperty("/returnShipTo", o.getData().results.shipToParty);
			t.setProperty("/returnShipToDesc", o.getData().results.shipToPartyDesc);
			t.setProperty("/returnPayer", o.getData().results.payer);
			t.setProperty("/returnPayerDesc", o.getData().results.payerDesc);
			t.setProperty("/returnBillTo", o.getData().results.billToParty);
			t.setProperty("/returnBillToDesc", o.getData().results.billToDesc);
			t.setProperty("/selectedROType", o.getData().results.roType);
			t.setProperty("/billToDesc", o.getData().results.billToDesc);
			t.setProperty("/shipToDesc", o.getData().results.shipToPartyDesc);
			t.setProperty("/shipTo", o.getData().results.shipToParty);
			t.setProperty("/payerDesc", o.getData().results.payerDesc);
			t.setProperty("/salesOrgForRO", o.getData().results.mappingId);
			if (o.getData().results.requestorEmail) {
				t.setProperty("/userEmailId", o.getData().results.requestorEmail);
				t.setProperty("/emailFlag", true);
				t.setProperty("/emailInputVisiblity", true)
			}
			if (o.getData().results.contactTelephone) {
				t.setProperty("/phoneNum", o.getData().results.contactTelephone);
				t.setProperty("/smsInputVisiblity", true);
				t.setProperty("/phoneNumFlag", true)
			}
			if (o.getData().results.roType === "TG") {
				this.getView().byId("RotypeSegementedBtnID").setSelectedKey("TG")
			} else if (o.getData().results.roType === "TF") {
				this.getView().byId("RotypeSegementedBtnID").setSelectedKey("TF")
			} else if (o.getData().results.roType === "TI") {
				this.getView().byId("RotypeSegementedBtnID").setSelectedKey("TI")
			} else {
				this.getView().byId("RotypeSegementedBtnID").setSelectedKey("TK")
			}
			t.setProperty("/selectedROType", o.getData().results.roTypeText);
			t.setProperty("/SalesOrg", o.getData().results.salesOrg);
			t.setProperty("/selectedSalesOrg", o.getData().results.salesOrg);
			t.setProperty("/shipToParty", o.getData().results.shipToParty);
			t.setProperty("/exShipTo", o.getData().results.shipToParty);
			t.setProperty("/exchangeOrderType", o.getData().results.exchangeOrderType);
			t.setProperty("/selectedSoldtoParty", o.getData().results.soldToParty);
			t.setProperty("/selectedSoldtoPartyDesc", o.getData().results.soldToPartyDesc);
			var l = o.getData().results.orderReason + " (" + o.getData().results.orderReasonText + ")";
			t.setProperty("/selectedReturnReason", l);
			t.setProperty("/returnReqNum", o.getData().results.returnReqNum);
			t.setProperty("/referenceNo", o.getData().results.referenceNum);
			i.setProperty("/distChnl", o.getData().results.distributionChannel);
			i.setProperty("/Division", o.getData().results.division);
			i.setProperty("/salesOrgNo", o.getData().results.salesOrg);
			i.setProperty("/shipTo", o.getData().results.shipToParty);
			i.setProperty("/soldToParty", o.getData().results.soldToParty);
			i.setProperty("/soldToPartyDesc", o.getData().results.soldToPartyDesc);
			t.refresh(true);
			this.getView().getModel("invoiceSearchModel").refresh(true);
			if (o.getData().results.listAttachementDo !== null) {
				var d = o.getData().results.listAttachementDo;
				var g = [];
				for (var p = 0; p < d.length; p++) {
					var c = {
						fileName: d[p].docName,
						fileType: d[p].docType,
						fileDoc: d[p].docData,
						compressedFile: d[p].docData,
						docId: d[p].docId
					};
					g.push(c)
				}
				this.getView().getModel("returnModel").setProperty("/attachmentObject", g);
				t.setProperty("/enableViewAttachment", true);
				t.setProperty("/attachmentTableVisiblity", true)
			} else {
				t.setProperty("/enableViewAttachment", false);
				t.setProperty("/attachmentTableVisiblity", false)
			}
			var u = [];
			for (var p = 0; p < s.length; p++) {
				var h = {
					MaterialCode: s[p].material,
					MaterialGroup: s[p].materialGroup,
					MaterialGroup4: s[p].materialGroup4,
					BatchNumber: s[p].batch,
					ExpiryDate: s[p].expiryDate,
					BillingQty: s[p].avlReturnQty.toString(),
					SalesUnit: s[p].returnUom,
					AvailRetQtySalesUn: s[p].avlReturnQty.toString(),
					actualRetQty: s[p].returnQty.toString(),
					UnitPrice: s[p].unitPriceCc.toString(),
					ListPrice: s[p].unitPriceCc.toString(),
					DiscountAmount: "",
					NetPrice: "",
					itemVisibility: s[p].itemVisibility.toString(),
					storageLocation: s[p].storageLocation,
					billingDateFrom: s[p].referenceInvDate,
					ItemUsage: "",
					SerialNum: "",
					shipToParty: o.getData().results.shipToParty,
					InvoiceNum: s[p].refDocNum,
					InvoiceLineItem: s[p].refDocItem,
					HigherLvlItem: s[p].higherLevel,
					ActiveIndicator: ""
				};
				this.selectedReturnItems.push(h)
			}
			this._pricingSimulation(this.selectedReturnItems, "Returns");
			if (this.getView().getModel("editDraftModel").getData().results.exchangeDto !== null) {
				var m = this.getView().getModel("editDraftModel").getData().results.exchangeDto.listExhangeItemDto;
				t.setProperty("/exchangeOrderType", o.getData().results.exchangeDto.orderType);
				t.setProperty("/exchangeReqNum", o.getData().results.exchangeDto.exchangeReqNum);
				t.setProperty("/exchangeRemark", o.getData().results.exchangeDto.requestRemark);
				t.setProperty("/customerPONumberEx", o.getData().results.exchangeDto.customerPo);
				t.setProperty("/setExAddress", o.getData().results.exchangeDto.listAddressDo);
				if (o.getData().results.exchangeDto.exoneTimeCustomer === null) {
					t.setProperty("/EXOneTimeCustomer", "")
				} else {
					t.setProperty("/EXOneTimeCustomer", o.getData().results.exchangeDto.exoneTimeCustomer)
				}
				if (o.getData().results.exchangeDto.listAddressDo && o.getData().results.exchangeDto.listAddressDo.length > 0) {
					t.setProperty("/EXaddressVisiblity", true);
					t.setProperty("/partnerName", o.getData().results.exchangeDto.listAddressDo[0].name1);
					t.setProperty("/partnerName4", o.getData().results.exchangeDto.listAddressDo[0].name4);
					t.setProperty("/AddressStreet2", o.getData().results.exchangeDto.listAddressDo[0].street2);
					t.setProperty("/AddressStreet3", o.getData().results.exchangeDto.listAddressDo[0].street3);
					t.setProperty("/AddressStreet5", o.getData().results.exchangeDto.listAddressDo[0].street5);
					t.setProperty("/District", o.getData().results.exchangeDto.listAddressDo[0].district);
					t.setProperty("/DifferentCity", o.getData().results.exchangeDto.listAddressDo[0].differentCity);
					t.setProperty("/postalCode", o.getData().results.exchangeDto.listAddressDo[0].postalCode);
					t.setProperty("/city", o.getData().results.exchangeDto.listAddressDo[0].city);
					t.setProperty("/telephone", o.getData().results.exchangeDto.listAddressDo[0].telephone);
					t.setProperty("/mobileNumber", o.getData().results.exchangeDto.listAddressDo[0].mobilePhone);
					t.setProperty("/taxId", o.getData().results.exchangeDto.listAddressDo[0].taxId);
					t.setProperty("/bCode", o.getData().results.exchangeDto.listAddressDo[0].b_Codes);
					t.setProperty("/refDocNum", o.getData().results.exchangeDto.listAddressDo[0].refDocNum);
					t.setProperty("/bpNummr", o.getData().results.exchangeDto.listAddressDo[0].bpNummr);
					t.setProperty("/invCountry", o.getData().results.exchangeDto.listAddressDo[0].country);
					t.setProperty("/invRegion", o.getData().results.exchangeDto.listAddressDo[0].region);
					t.setProperty("/invLanguage", o.getData().results.exchangeDto.listAddressDo[0].language);
				}
				t.setProperty("/exSoldTo", o.getData().results.exchangeDto.soldToParty);
				t.setProperty("/exSoldToDesc", o.getData().results.exchangeDto.soldToPartyDesc);
				t.setProperty("/exShipTo", o.getData().results.exchangeDto.shipToParty);
				t.setProperty("/exShipToDesc", o.getData().results.exchangeDto.shipToPartyDesc);
				t.setProperty("/exPayer", o.getData().results.exchangeDto.payer);
				t.setProperty("/exPayerDesc", o.getData().results.exchangeDto.payerDescription);
				t.setProperty("/exBillTo", o.getData().results.exchangeDto.billToParty);
				t.setProperty("/exBillToDesc", o.getData().results.exchangeDto.billToPartyDesc);
				var y = [];
				for (var P = 0; P < m.length; P++) {
					if (o.getData().results.roType === "TI") {}
					if (m[P].manualFoc === null) {
						m[P].manualFoc = ""
					}
					var f = {
						itemNumber: "",
						matNumber: m[P].material,
						itemShortText: m[P].shortText,
						materialGroup: m[P].materialGroup,
						materialGroup4: m[P].materialGroup4,
						quantity: m[P].returnQty.toString(),
						salesUnit: m[P].returnUom,
						unitPrice: m[P].unitPriceCc.toString(),
						unitPriceInv: m[P].unitPriceCc.toString(),
						discountAmount: "",
						netAmount: "",
						listPrice: "",
						storageLocation: m[P].storageLocation,
						higherItem: m[P].higherLevel,
						batchNumber: m[P].batch,
						expiryDate: m[P].expiryDate,
						billingDate: m[P].referenceInvDate,
						refInvoice: m[P].refDocNum,
						refItemNumber: m[P].refDocItem,
						serialNumber: m[P].serialNum,
						active: "",
						manualFoc: m[P].manualFoc,
						itemVisibility: m[P].itemVisibility.toString()
					};
					y.push(f)
				}
				this._pricingSimulation(y, "Exchange")
			}
			t.setProperty("/step1Validation", true);
			t.setProperty("/step2Validation", true);
			t.setProperty("/step3Validation", true);
			this._getUser()
		},
		onAfterRendering: function () {
			this.resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			var e = this;
			if (e.editDraftData) {
				var t = new sap.ui.model.json.JSONModel({
					results: e.editDraftData
				})
			}
		},
		_getUser: function () {
			var e = this;
			var r = new sap.ui.model.json.JSONModel;
			e.getView().setModel(r, "oUserDetailModel");
			r.loadData("/services/userapi/attributes", null, true);
			r.attachRequestCompleted(function (t) {
				e.getView().getModel("baseModel").setProperty("/email", e.getView().getModel("oUserDetailModel").getData().email);
				var r = e.getView().getModel("oUserDetailModel").getData().name;
				if (r) {
					e._getLoggedInUserDetails(r)
				}
			});
			r.attachRequestFailed(function (e) {
				t.error(e.getSource().getData().message)
			})
		},
		_getLoggedInUserDetails: function (e) {
			var t = this;
			var r = new sap.ui.model.json.JSONModel;
			t.getView().setModel(r, "oLoggedInUserDetailModel");
			r.loadData("/UserManagement/service/scim/Users/" + e, null, true);
			r.attachRequestCompleted(function (e) {
				t.getView().getModel("baseModel").setProperty("/userId", e.getSource().getData().id);
				t.getView().getModel("baseModel").setProperty("/userName", e.getSource().getData().displayName)
			});
			r.attachRequestFailed(function (e) {});
			var o = new sap.ui.model.json.JSONModel;
			t.getView().setModel(o, "oModel");
			var s = new sap.m.BusyDialog;
			s.open();
			o.loadData("/DKSHJavaService/userDetails/findAllRightsForUserInDomain/" + e + "&cc", null, true);
			o.attachRequestCompleted(function (e) {
				s.close();
				if (!e.getParameters().errorobject) {
					var r = e.getSource().getData();
					if (r.message) t.allAccess = false;
					if (r.ATR01 !== null) {
						t.salesOrgDataAccess = r.ATR01
					}
					if (r.ATR02 !== null) {
						t.distrChannelDataAccess = r.ATR02
					}
					if (r.ATR03 !== null) {
						t.divisionDataAccess = r.ATR03
					}
					if (r.ATR04 !== null) {
						t.materialGroupDataAccess = r.ATR04
					}
					if (r.ATR05 !== null) {
						t.materialGroup4DataAccess = r.ATR05
					}
					if (r.ATR06 !== null) {
						t.custCodeDataAccess = r.ATR06
					}
					if (r.ATR07 !== null) {
						t.materialDataAccess = r.ATR07
					}
				}
				t._getRoTypeList();
				t._salesOrgList();
				t._distChannelList()
			});
			o.attachRequestFailed(function (e) {
				s.close();
				t.allAccess = false
			})
		},
		onCompleteStep2: function () {
			if (!this.invoiceDetail) {
				this.invoiceDetail = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.InvoiceDetail", this);
				this.getView().addDependent(this.invoiceDetail)
			}
			var e = "Web";
			if (sap.ui.Device.system.phone === true) {
				e = "Phone"
			}
			var t = {
				userId: this.getView().getModel("baseModel").getProperty("/userId"),
				appId: "keyInvoice",
				runType: e
			};
			this._getPersonalizationDetails("keyInvoice", "Before")
		},
		selectSerialCheckbox: function (e) {
			var t = e.getSource().getSelected();
			if (t === false) {
				this.getView().getModel("invoiceSearchModel").setProperty("/selectedSerialNum", false);
				this.getView().getModel("invoiceSearchModel").setProperty("/displayBySno", undefined)
			} else {
				this.getView().getModel("invoiceSearchModel").setProperty("/selectedSerialNum", true);
				this.getView().getModel("invoiceSearchModel").setProperty("/displayBySno", "X")
			}
			this.getView().getModel("invoiceSearchModel").refresh()
		},
		onPressRemarks: function () {
			if (this.docVersion === "SUCCESS") {} else {
				var e = this;
				if (!e.Remark) {
					e.Remark = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.Remark", this);
					e.getView().addDependent(e.Remark);
					e.Remark.addStyleClass("sapUiSizeCompact")
				}
				if (this.getView().byId("ID_TAB_BAR_PROV_APP").getSelectedKey() === "Exchange" && this.ROtypeCode === "TI") {
					var t = this.getView().getModel("baseModel");
					if (t.getProperty("/comment") === "") {
						t.setProperty("/comment", "ไม่ต้องส่งของ หรือ ส่งของเพิ่มบางส่วน")
					}
				}
				e.Remark.open()
			}
		},
		onOKRemark: function () {
			var e = this.getView().getModel("baseModel");
			if ((e.getProperty("/comment") === undefined || e.getProperty("/comment") === "") && (e.getProperty("/contactTelephone") ===
					undefined || e.getProperty("/contactTelephone") === "") && (e.getProperty("/contactDivision") === undefined || e.getProperty(
					"/contactDivision") === "") && (e.getProperty("/contactPerson") === undefined || e.getProperty("/contactPerson") === "") && (e.getProperty(
					"/remark") === undefined || e.getProperty("/remark") === "")) {
				t.information(this.resourceBundle.getText("Enterthemadatoryfields"))
			} else {
				var e = this.getView().getModel("baseModel");
				var r = "";
				if (this.getView().byId("ID_TAB_BAR_PROV_APP").getSelectedKey() === "Return") {
					if (this.ROtypeCode === "TI") {
						var s = "ไม่ต้องส่งของ เคลียร์ใบส่งของชั่วคราว" + " ";
						var i = this.getView().getModel("returnModel").getProperty("/results");
						for (var a = 0; a < i.length; a++) {
							if (a === i.length - 1) {
								if (!s.includes(i[a].refInvoice)) {
									s = s + i[a].refInvoice + " " + "ส่งบิลที่แผนก "
								} else {
									s = s + " " + "ส่งบิลที่แผนก "
								}
							} else {
								if (!s.includes(i[a].refInvoice)) {
									s = s + i[a].refInvoice + ", "
								}
							}
						}
						if (e.getProperty("/contactDivision") !== undefined && e.getProperty("/contactDivision") !== "") {
							s = s + " " + e.getProperty("/contactDivision") + "ติดต่อ"
						} else {
							o.show(this.resourceBundle.getText("Contactdivisionmandatory"));
							return
						}
						if (e.getProperty("/contactPerson") !== undefined && e.getProperty("/contactPerson") !== "") {
							s = s + " " + e.getProperty("/contactPerson")
						} else {
							o.show(this.resourceBundle.getText("Contactpersonmandatory"));
							return
						}
						if (e.getProperty("/contactTelephone") !== undefined && e.getProperty("/contactTelephone") !== "") {
							s = s + " " + "Tel" + " " + e.getProperty("/contactTelephone")
						} else {
							o.show(this.resourceBundle.getText("ContactTelephonemandatory"));
							return
						}
						if (e.getProperty("/comment") !== undefined && e.getProperty("/comment") !== "") {
							s = s + " " + e.getProperty("/comment")
						}
					} else if (this.ROtypeCode === "TK") {
						var s = "ใช้แทนบิล";
						var i = this.getView().getModel("returnModel").getProperty("/results");
						for (var a = 0; a < i.length; a++) {
							if (a === i.length - 1) {
								if (!s.includes(i[a].refInvoice)) {
									s = s + i[a].refInvoice + " " + "ไม่ต้องส่งของ แก้ไขเนื่องจาก" + " " + this.getView().getModel("baseModel").getProperty(
										"/selectedReturnReason") + "ส่งบิลที่"
								} else {
									s = s + " " + "ไม่ต้องส่งของ แก้ไขเนื่องจาก" + " " + this.getView().getModel("baseModel").getProperty("/selectedReturnReason") +
										"ส่งบิลที่"
								}
							} else {
								if (!s.includes(i[a].refInvoice)) {
									s = s + i[a].refInvoice + ", "
								}
							}
						}
						if (e.getProperty("/contactDivision") !== undefined && e.getProperty("/contactDivision") !== "") {
							s = s + " " + e.getProperty("/contactDivision") + "ติดต่อ"
						} else {
							o.show(this.resourceBundle.getText("Contactdivisionmandatory"));
							return
						}
						if (e.getProperty("/contactPerson") !== undefined && e.getProperty("/contactPerson") !== "") {
							s = s + " " + e.getProperty("/contactPerson")
						} else {
							o.show(this.resourceBundle.getText("Contactpersonmandatory"));
							return
						}
						if (e.getProperty("/contactTelephone") !== undefined && e.getProperty("/contactTelephone") !== "") {
							s = s + " " + "Tel" + " " + e.getProperty("/contactTelephone")
						} else {
							o.show(this.resourceBundle.getText("ContactTelephonemandatory"));
							return
						}
						if (e.getProperty("/comment") !== undefined && e.getProperty("/comment") !== "") {
							s = s + " " + e.getProperty("/comment")
						}
					} else {
						var s = "สาเหตุการคืน." + " " + this.getView().getModel("baseModel").getProperty("/selectedReturnReason") + " " +
							"รับคืนสินค้าที่คุณ ";
						if (e.getProperty("/contactPerson") !== undefined && e.getProperty("/contactPerson") !== "") {
							s = s + " " + e.getProperty("/contactPerson") + "แผนก"
						} else {
							o.show(this.resourceBundle.getText("Contactpersonmandatory"));
							return
						}
						if (e.getProperty("/contactDivision") !== undefined && e.getProperty("/contactDivision") !== "") {
							s = s + " " + e.getProperty("/contactDivision")
						} else {
							o.show(this.resourceBundle.getText("Contactdivisionmandatory"));
							return
						}
						if (e.getProperty("/contactTelephone") !== undefined && e.getProperty("/contactTelephone") !== "") {
							s = s + " " + "Tel" + " " + e.getProperty("/contactTelephone")
						} else {
							o.show(this.resourceBundle.getText("ContactTelephonemandatory"));
							return
						}
						if (e.getProperty("/comment") !== undefined && e.getProperty("/comment") !== "") {
							s = s + " " + e.getProperty("/comment")
						}
					}
				} else {
					if (this.ROtypeCode === "TI") {
						var s = "เคลียร์ใบส่งของชั่วคราว" + " ";
						var n = this.getView().getModel("returnModel").getProperty("/results");
						for (var a = 0; a < n.length; a++) {
							if (a === n.length - 1) {
								if (!s.includes(n[a].refInvoice)) {
									s = s + n[a].refInvoice + " " + "ส่งบิลที่แผนก"
								} else {
									s = s + " " + "ส่งบิลที่แผน"
								}
							} else {
								if (!s.includes(n[a].refInvoice)) {
									s = s + n[a].refInvoice + ", "
								}
							}
						}
						if (e.getProperty("/contactDivision") !== undefined && e.getProperty("/contactDivision") !== "") {
							s = s + " " + e.getProperty("/contactDivision") + "ติดต่อ"
						} else {
							o.show(this.resourceBundle.getText("Contactdivisionmandatory"));
							return
						}
						if (e.getProperty("/contactPerson") !== undefined && e.getProperty("/contactPerson") !== "") {
							s = s + " " + e.getProperty("/contactPerson") + "แผนก"
						} else {
							o.show(this.resourceBundle.getText("Contactpersonmandatory"));
							return
						}
						if (e.getProperty("/contactTelephone") !== undefined && e.getProperty("/contactTelephone") !== "") {
							s = s + " " + "Tel" + " " + e.getProperty("/contactTelephone")
						} else {
							o.show(this.resourceBundle.getText("ContactTelephonemandatory"));
							return
						}
						if (e.getProperty("/comment") !== undefined && e.getProperty("/comment") !== "") {
							s = s + " " + e.getProperty("/comment")
						}
					} else if (this.ROtypeCode === "TK") {
						var s = "ใช้แทนบิล" + "  ";
						var n = this.getView().getModel("returnModel").getProperty("/results");
						for (var a = 0; a < n.length; a++) {
							if (a === n.length - 1) {
								if (!s.includes(n[a].refInvoice)) {
									s = s + n[a].refInvoice + " " + "ไม่ต้องส่งของ แก้ไขเนื่องจาก" + " " + this.getView().getModel("baseModel").getProperty(
										"/selectedReturnReason") + " " + "ส่งบิลที่นก"
								} else {
									s = s + " " + "ไม่ต้องส่งของ แก้ไขเนื่องจาก" + " " + this.getView().getModel("baseModel").getProperty("/selectedReturnReason") +
										" " + "ส่งบิลที่นก"
								}
							} else {
								if (!s.includes(n[a].refInvoice)) {
									s = s + n[a].refInvoice + ", "
								}
							}
						}
						if (e.getProperty("/contactDivision") !== undefined && e.getProperty("/contactDivision") !== "") {
							s = s + " " + e.getProperty("/contactDivision") + "ติดต่อ"
						} else {
							o.show(this.resourceBundle.getText("Contactdivisionmandatory"));
							return
						}
						if (e.getProperty("/contactPerson") !== undefined && e.getProperty("/contactPerson") !== "") {
							s = s + " " + e.getProperty("/contactPerson")
						} else {
							o.show(this.resourceBundle.getText("Contactpersonmandatory"));
							return
						}
						if (e.getProperty("/contactTelephone") !== undefined && e.getProperty("/contactTelephone") !== "") {
							s = s + " " + "Tel" + " " + e.getProperty("/contactTelephone")
						} else {
							o.show(this.resourceBundle.getText("ContactTelephonemandatory"));
							return
						}
						if (e.getProperty("/comment") !== undefined && e.getProperty("/comment") !== "") {
							s = s + " " + e.getProperty("/comment")
						}
					} else {
						// Start - USer Story STRY0012775 - 30/06/2021
						if (this.ROtypeCode === "TG" || this.ROtypeCode === "TF") {
							var s = "มีสินค้าเปลี่ยน รับคืนสินค้าเนื่องจาก" + this.getView().getModel("baseModel").getProperty("/selectedReturnReason") +
								" " +
								"ส่งสินค้าที่คุณ"
						} else {
							var s = "มีสินค้าเปลี่ยน รับคืนสินค้าเนื่องจาก" + this.getView().getModel("baseModel").getProperty("/selectedReturnReason") +
								" " +
								"รับคืนที่คุณ"
						};
						// End - USer Story STRY0012775 - 30/06/2021
						if (e.getProperty("/contactPerson") !== undefined && e.getProperty("/contactPerson") !== "") {
							s = s + " " + e.getProperty("/contactPerson") + "แผนก"
						} else {
							o.show(this.resourceBundle.getText("Contactpersonmandatory"));
							return
						}
						if (e.getProperty("/contactDivision") !== undefined && e.getProperty("/contactDivision") !== "") {
							s = s + " " + e.getProperty("/contactDivision")
						} else {
							o.show(this.resourceBundle.getText("Contactdivisionmandatory"));
							return
						}
						if (e.getProperty("/contactTelephone") !== undefined && e.getProperty("/contactTelephone") !== "") {
							s = s + " " + "Tel" + " " + e.getProperty("/contactTelephone")
						} else {
							o.show(this.resourceBundle.getText("ContactTelephonemandatory"));
							return
						}
						if (e.getProperty("/comment") !== undefined && e.getProperty("/comment") !== "") {
							s = s + " " + e.getProperty("/comment")
						}
					}
				}
				if (s.length > 250) {
					o.show(this.resourceBundle.getText("Remarksexceedingmaxlength"))
				}
				if (this.getView().byId("ID_TAB_BAR_PROV_APP").getSelectedKey() === "Return") {
					this.getView().getModel("baseModel").setProperty("/returnRemark", s);
					this.getView().getModel("baseModel").setProperty("/remark", s);
					this.getView().getModel("baseModel").refresh()
				} else {
					this.getView().getModel("baseModel").setProperty("/exchangeRemark", s);
					this.getView().getModel("baseModel").setProperty("/remark", s);
					this.getView().getModel("baseModel").refresh()
				}
				this.Remark.close()
			}
		},
		onSelectSms: function (e) {
			var t = e.getSource().getSelected();
			if (t === false) {
				this.getView().getModel("baseModel").setProperty("/smsInputVisiblity", false)
			} else {
				this.getView().getModel("baseModel").setProperty("/smsInputVisiblity", true)
			}
			this.getView().getModel("baseModel").refresh()
		},
		liveSearchUsers: function (e) {
			if (e.getParameters().newValue === undefined) {
				var t = e.getParameters().query
			} else {
				var t = e.getParameters().newValue
			}
			var r = new Array;
			var o = new sap.ui.model.Filter([new sap.ui.model.Filter("userId", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter(
				"email", sap.ui.model.FilterOperator.Contains, t)]);
			r.push(o);
			var s = this.getView().byId("userListTableId").getBinding("items");
			s.filter(r)
		},
		onSelectDelivery: function (e) {
			var t = e.getSource().getSelected();
			if (t === false) {
				this.getView().getModel("baseModel").setProperty("/completedDeliveryFLAG", "")
			} else {
				this.getView().getModel("baseModel").setProperty("/completedDeliveryFLAG", "X")
			}
			this.getView().getModel("baseModel").refresh()
		},
		onSelectEmail: function (e) {
			var t = e.getSource().getSelected();
			if (t === false) {
				this.getView().getModel("baseModel").setProperty("/emailInputVisiblity", false)
			} else {
				this.getView().getModel("baseModel").setProperty("/emailInputVisiblity", true)
			}
			this.getView().getModel("baseModel").refresh()
		},
		onPressViewRemark: function () {
			var e = this.getView().getModel("baseModel");
			var t = "";
			if (this.getView().byId("ID_TAB_BAR_PROV_APP").getSelectedKey() === "Return") {
				if (this.ROtypeCode === "TI") {
					var r = "ไม่ต้องส่งของ เคลียร์ใบส่งของชั่วคราว" + " ";
					var s = this.getView().getModel("returnModel").getProperty("/results");
					for (var i = 0; i < s.length; i++) {
						if (i === s.length - 1) {
							if (!r.includes(s[i].refInvoice)) {
								r = r + s[i].refInvoice + " " + "ส่งบิลที่แผนก "
							} else {
								r = r + " " + "ส่งบิลที่แผนก "
							}
						} else {
							if (!r.includes(s[i].refInvoice)) {
								r = r + s[i].refInvoice + ", "
							}
						}
					}
					if (e.getProperty("/contactDivision") !== undefined && e.getProperty("/contactDivision") !== "") {
						r = r + " " + e.getProperty("/contactDivision") + "ติดต่อ"
					} else {
						o.show(this.resourceBundle.getText("Contactdivisionmandatory"));
						return
					}
					if (e.getProperty("/contactPerson") !== undefined && e.getProperty("/contactPerson") !== "") {
						r = r + " " + e.getProperty("/contactPerson")
					} else {
						o.show(this.resourceBundle.getText("Contactpersonmandatory"));
						return
					}
					if (e.getProperty("/contactTelephone") !== undefined && e.getProperty("/contactTelephone") !== "") {
						r = r + " " + "Tel" + " " + e.getProperty("/contactTelephone")
					} else {
						o.show(this.resourceBundle.getText("ContactTelephonemandatory"));
						return
					}
					if (e.getProperty("/comment") !== undefined && e.getProperty("/comment") !== "") {
						r = r + " " + e.getProperty("/comment")
					}
				} else if (this.ROtypeCode === "TK") {
					var r = "ใช้แทนบิล";
					var s = this.getView().getModel("returnModel").getProperty("/results");
					for (var i = 0; i < s.length; i++) {
						if (i === s.length - 1) {
							if (!r.includes(s[i].refInvoice)) {
								r = r + s[i].refInvoice + " " + "ไม่ต้องส่งของ แก้ไขเนื่องจาก" + " " + this.getView().getModel("baseModel").getProperty(
									"/selectedReturnReason") + "ส่งบิลที่"
							} else {
								r = r + " " + "ไม่ต้องส่งของ แก้ไขเนื่องจาก" + " " + this.getView().getModel("baseModel").getProperty("/selectedReturnReason") +
									"ส่งบิลที่"
							}
						} else {
							if (!r.includes(s[i].refInvoice)) {
								r = r + s[i].refInvoice + ", "
							}
						}
					}
					if (e.getProperty("/contactDivision") !== undefined && e.getProperty("/contactDivision") !== "") {
						r = r + " " + e.getProperty("/contactDivision") + "ติดต่อ"
					} else {
						o.show(this.resourceBundle.getText("Contactdivisionmandatory"));
						return
					}
					if (e.getProperty("/contactPerson") !== undefined && e.getProperty("/contactPerson") !== "") {
						r = r + " " + e.getProperty("/contactPerson")
					} else {
						o.show(this.resourceBundle.getText("Contactpersonmandatory"));
						return
					}
					if (e.getProperty("/contactTelephone") !== undefined && e.getProperty("/contactTelephone") !== "") {
						r = r + " " + "Tel" + " " + e.getProperty("/contactTelephone")
					} else {
						o.show(this.resourceBundle.getText("ContactTelephonemandatory"));
						return
					}
					if (e.getProperty("/comment") !== undefined && e.getProperty("/comment") !== "") {
						r = r + " " + e.getProperty("/comment")
					}
				} else {
					var r = "สาเหตุการคืน." + " " + this.getView().getModel("baseModel").getProperty("/selectedReturnReason") + " " +
						"รับคืนสินค้าที่คุณ ";
					if (e.getProperty("/contactPerson") !== undefined && e.getProperty("/contactPerson") !== "") {
						r = r + " " + e.getProperty("/contactPerson") + "แผนก"
					} else {
						o.show(this.resourceBundle.getText("Contactpersonmandatory"));
						return
					}
					if (e.getProperty("/contactDivision") !== undefined && e.getProperty("/contactDivision") !== "") {
						r = r + " " + e.getProperty("/contactDivision")
					} else {
						o.show(this.resourceBundle.getText("Contactdivisionmandatory"));
						return
					}
					if (e.getProperty("/contactTelephone") !== undefined && e.getProperty("/contactTelephone") !== "") {
						r = r + " " + "Tel" + " " + e.getProperty("/contactTelephone")
					} else {
						o.show(this.resourceBundle.getText("ContactTelephonemandatory"));
						return
					}
					if (e.getProperty("/comment") !== undefined && e.getProperty("/comment") !== "") {
						r = r + " " + e.getProperty("/comment")
					}
				}
			} else {
				if (this.ROtypeCode === "TI") {
					var r = "เคลียร์ใบส่งของชั่วคราว" + " ";
					var a = this.getView().getModel("returnModel").getProperty("/results");
					for (var i = 0; i < a.length; i++) {
						if (i === a.length - 1) {
							if (!r.includes(a[i].refInvoice)) {
								r = r + a[i].refInvoice + " " + "ส่งบิลที่แผนก"
							} else {
								r = r + " " + "ส่งบิลที่แผนก"
							}
						} else {
							if (!r.includes(a[i].refInvoice)) {
								r = r + a[i].refInvoice + ", "
							}
						}
					}
					if (e.getProperty("/contactDivision") !== undefined && e.getProperty("/contactDivision") !== "") {
						r = r + " " + e.getProperty("/contactDivision") + "ติดต่อ"
					} else {
						o.show(this.resourceBundle.getText("Contactdivisionmandatory"));
						return
					}
					if (e.getProperty("/contactPerson") !== undefined && e.getProperty("/contactPerson") !== "") {
						r = r + " " + e.getProperty("/contactPerson") + "แผนก"
					} else {
						o.show(this.resourceBundle.getText("Contactpersonmandatory"));
						return
					}
					if (e.getProperty("/contactTelephone") !== undefined && e.getProperty("/contactTelephone") !== "") {
						r = r + " " + "Tel" + " " + e.getProperty("/contactTelephone")
					} else {
						o.show(this.resourceBundle.getText("ContactTelephonemandatory"));
						return
					}
					if (e.getProperty("/comment") !== undefined && e.getProperty("/comment") !== "") {
						r = r + " " + e.getProperty("/comment")
					}
				} else if (this.ROtypeCode === "TK") {
					var r = "ใช้แทนบิล" + "  ";
					var a = this.getView().getModel("returnModel").getProperty("/results");
					for (var i = 0; i < a.length; i++) {
						if (i === a.length - 1) {
							if (!r.includes(a[i].refInvoice)) {
								r = r + a[i].refInvoice + " " + "ไม่ต้องส่งของ แก้ไขเนื่องจาก" + " " + this.getView().getModel("baseModel").getProperty(
									"/selectedReturnReason") + " " + "ส่งบิลที่นก"
							} else {
								r = r + " " + "ไม่ต้องส่งของ แก้ไขเนื่องจาก" + " " + this.getView().getModel("baseModel").getProperty("/selectedReturnReason") +
									" " + "ส่งบิลที่นก"
							}
						} else {
							if (!r.includes(a[i].refInvoice)) {
								r = r + a[i].refInvoice + ", "
							}
						}
					}
					if (e.getProperty("/contactDivision") !== undefined && e.getProperty("/contactDivision") !== "") {
						r = r + " " + e.getProperty("/contactDivision") + "ติดต่อ"
					} else {
						o.show(this.resourceBundle.getText("Contactdivisionmandatory"));
						return
					}
					if (e.getProperty("/contactPerson") !== undefined && e.getProperty("/contactPerson") !== "") {
						r = r + " " + e.getProperty("/contactPerson")
					} else {
						o.show(this.resourceBundle.getText("Contactpersonmandatory"));
						return
					}
					if (e.getProperty("/contactTelephone") !== undefined && e.getProperty("/contactTelephone") !== "") {
						r = r + " " + "Tel" + " " + e.getProperty("/contactTelephone")
					} else {
						o.show(this.resourceBundle.getText("ContactTelephonemandatory"));
						return
					}
					if (e.getProperty("/comment") !== undefined && e.getProperty("/comment") !== "") {
						r = r + " " + e.getProperty("/comment")
					}
				} else {
					// Start - USer Story STRY0012775 - 30/06/2021
					if (this.ROtypeCode === "TG" || this.ROtypeCode === "TF") {
						var r = "มีสินค้าเปลี่ยน รับคืนสินค้าเนื่องจาก" + this.getView().getModel("baseModel").getProperty("/selectedReturnReason") +
							" " +
							"ส่งสินค้าที่คุณ"
					} else {
						var r = "มีสินค้าเปลี่ยน รับคืนสินค้าเนื่องจาก" + this.getView().getModel("baseModel").getProperty("/selectedReturnReason") +
							" " +
							"รับคืนที่คุณ"
					};
					// End - USer Story STRY0012775 - 30/06/2021
					if (e.getProperty("/contactPerson") !== undefined && e.getProperty("/contactPerson") !== "") {
						r = r + " " + e.getProperty("/contactPerson") + "แผนก"
					} else {
						o.show(this.resourceBundle.getText("Contactpersonmandatory"));
						return
					}
					if (e.getProperty("/contactDivision") !== undefined && e.getProperty("/contactDivision") !== "") {
						r = r + " " + e.getProperty("/contactDivision")
					} else {
						o.show(this.resourceBundle.getText("Contactdivisionmandatory"));
						return
					}
					if (e.getProperty("/contactTelephone") !== undefined && e.getProperty("/contactTelephone") !== "") {
						r = r + " " + "Tel" + " " + e.getProperty("/contactTelephone")
					} else {
						o.show(this.resourceBundle.getText("ContactTelephonemandatory"));
						return
					}
					if (e.getProperty("/comment") !== undefined && e.getProperty("/comment") !== "") {
						r = r + " " + e.getProperty("/comment")
					}
				}
			}
			if (r.length > 250) {
				o.show(this.resourceBundle.getText("Remarksexceedingmaxlength"))
			}
			this.getView().getModel("baseModel").setProperty("/remark", r);
			this.getView().getModel("baseModel").refresh()
		},
		onPressResetRemark: function () {
			var e = this.getView().getModel("baseModel");
			if (this.getView().byId("ID_TAB_BAR_PROV_APP").getSelectedKey() === "Exchange" && this.ROtypeCode === "TI") {
				e.setProperty("/comment", "ไม่ต้องส่งของ หรือ ส่งของเพิ่มบางส")
			} else {
				e.setProperty("/comment", "")
			}
			e.setProperty("/contactTelephone", "");
			e.setProperty("/contactDivision", "");
			e.setProperty("/contactPerson", "");
			e.setProperty("/remark", "");
			e.refresh()
		},
		onCancelRemark: function () {
			var e = this.getView().getModel("baseModel");
			if (this.getView().byId("ID_TAB_BAR_PROV_APP").getSelectedKey() === "Return") {
				if (!e.getProperty("/returnRemark")) {
					e.setProperty("/comment", "");
					e.setProperty("/contactTelephone", "");
					e.setProperty("/contactDivision", "");
					e.setProperty("/contactPerson", "");
					e.setProperty("/remark", "");
					e.refresh();
					this.Remark.close()
				} else {
					this.Remark.close()
				}
			} else {
				if (!e.getProperty("/exchangeRemark")) {
					e.setProperty("/comment", "");
					e.setProperty("/contactTelephone", "");
					e.setProperty("/contactDivision", "");
					e.setProperty("/contactPerson", "");
					e.setProperty("/remark", "");
					e.refresh();
					this.Remark.close()
				} else {
					this.Remark.close()
				}
			}
		},
		personalizationInvDetails: function (e) {
			if (!this.FilterPersonalization) {
				this.FilterPersonalization = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.Personalization", this);
				this.getView().addDependent(this.FilterPersonalization)
			}
			if (e.getSource().getTooltip() === this.resourceBundle.getText("InvoicePersonalization")) {
				this.currentStep = "keyInvoice"
			} else if (e.getSource().getTooltip() === this.resourceBundle.getText("ReturnPersonalization")) {
				this.currentStep = "keyReturn"
			} else if (e.getSource().getTooltip() === this.resourceBundle.getText("ExchangePersonalization")) {
				this.currentStep = "keyExchange"
			}
			this._getPersonalizationDetails(this.currentStep);
			this.FilterPersonalization.open()
		},
		_getPersonalizationDetails: function (e, r) {
			var o = this;
			var s = o.getView().getModel("PersonalizationModel");
			var i = new sap.ui.model.json.JSONModel;
			o.getView().setModel(i, "oModel");
			var a = "Web";
			var n = {
				"Content-Type": "application/json;charset=utf-8"
			};
			var l = {
				userId: this.getView().getModel("baseModel").getProperty("/userId"),
				appId: e,
				runType: a,
				emailId: this.getView().getModel("baseModel").getData().email
			};
			i.loadData("/DKSHJavaService/variant/getVariant", JSON.stringify(l), true, "POST", false, false, n);
			i.attachRequestCompleted(function (t) {
				if (t.getSource().getData().userPersonaDto !== null) {
					if (r) {
						if (e === "keyInvoice") {
							o.getView().getModel("PersonalizationModel").setProperty("/personalizationInvoiceData", t.getSource().getData())
						} else if (e === "keyExchange") {
							o.getView().getModel("PersonalizationModel").setProperty("/personalizationExchangeData", t.getSource().getData())
						} else if (e === "keyReturn") {
							o.getView().getModel("PersonalizationModel").setProperty("/personalizationReturnData", t.getSource().getData())
						}
					} else {
						var s = new sap.ui.model.json.JSONModel({
							results: t.getSource().getData()
						});
						if (e === "keyInvoice") {
							o.getView().getModel("PersonalizationModel").setProperty("/personalizationInvoiceData", t.getSource().getData())
						} else if (e === "keyExchange") {
							o.getView().getModel("PersonalizationModel").setProperty("/personalizationExchangeData", t.getSource().getData())
						} else if (e === "keyReturn") {
							o.getView().getModel("PersonalizationModel").setProperty("/personalizationReturnData", t.getSource().getData())
						}
						o.FilterPersonalization.setModel(s, "FilterPersonalization");
						o.FilterPersonalization.getModel("FilterPersonalization").setProperty("/enableCheckBox", false);
						o.FilterPersonalization.getModel("FilterPersonalization").setProperty("/selectVarVisible", true);
						o.FilterPersonalization.getModel("FilterPersonalization").setProperty("/nameVarVisible", false);
						o.getView().getModel("PersonalizationModel").refresh();
						o.FilterPersonalization.getModel("FilterPersonalization").setProperty("/okPersBtnVisible", true);
						o.FilterPersonalization.getModel("FilterPersonalization").setProperty("/savePersBtnVisible", false);
						o.FilterPersonalization.getModel("FilterPersonalization").setProperty("/cancelPersBtnVisible", true);
						o.FilterPersonalization.getModel("FilterPersonalization").setProperty("/deletePersBtnVisible", false);
						o.FilterPersonalization.getModel("FilterPersonalization").setProperty("/createPersBtnVisible", true);
						o.FilterPersonalization.getModel("FilterPersonalization").setProperty("/editPersBtnVisible", true);
						o.FilterPersonalization.getModel("FilterPersonalization").setProperty("/varinatNameValueState", "None");
						o.FilterPersonalization.getModel("FilterPersonalization").refresh();
						o.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/action", "")
					}
				}
			});
			i.attachRequestFailed(function (e) {
				t.error(e.getSource().getData().message)
			})
		},
		onChangeCheckbox: function (e) {
			var t = this.FilterPersonalization.getModel("FilterPersonalization").getData().results.userPersonaDto;
			var r = parseInt(e.getSource().getBindingContext("FilterPersonalization").getPath().split("/")[3]);
			if (e.getSource().getSelected() === true) {
				for (var o = 0; o < t.length; o++) {
					if (o === r) {
						t[o].status = true
					}
					if (this.FilterPersonalization.getModel("FilterPersonalization").getProperty("/results/action") === "Create") {
						t[o].id = ""
					}
					this.selectedObjects = t
				}
			} else {
				for (var s = 0; s < t.length; s++) {
					if (s === r) {
						t[s].status = false
					}
				}
				this.selectedObjects = t
			}
		},
		onChangeRetPO: function (e) {
			var t = e.getSource().getValue();
			if (t.length > 35) {
				messageToast.show(this.resourceBundle.getText("maxLengthPO"));
				return
			}
		},
		onSelectvarian: function (e) {
			var r = this;
			var s = this.getView().getModel("baseModel").getData().userId;
			var i = new sap.ui.model.json.JSONModel;
			r.getView().setModel(i, "oModel");
			if (e) {
				var a = e.getSource().getSelectedKey()
			} else {
				var a = this.FilterPersonalization.getModel("FilterPersonalization").getData().results.currentVariant
			}
			var n = {
				"Content-Type": "application/json;charset=utf-8"
			};
			var l = "Web";
			if (sap.ui.Device.system.phone === true) {
				l = "Phone"
			}
			var d = new sap.m.BusyDialog;
			d.open();
			i.loadData("/DKSHJavaService/variant/getvariantLists/" + s + "/" + this.currentStep + "/" + a + "/" + l, true, "POST", false, false,
				n);
			i.attachRequestCompleted(function (e) {
				d.close();
				var e = e.getSource().getData().userPersonaDto;
				if (r.FilterPersonalization.getModel("FilterPersonalization").getProperty("/results/action") === "Edit") {
					if (r.currentStep === "keyInvoice") {
						r.getView().getModel("PersonalizationModel").setProperty("/personalizationInvoiceData/userPersonaDto", e)
					} else if (r.currentStep === "keyExchange") {
						r.getView().getModel("PersonalizationModel").setProperty("/personalizationExchangeData/userPersonaDto", e)
					} else if (r.currentStep === "keyReturn") {
						r.getView().getModel("PersonalizationModel").setProperty("/personalizationReturnData/userPersonaDto", e)
					}
					r.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/userPersonaDto", e);
					r.FilterPersonalization.getModel("FilterPersonalization").refresh();
					r.getView().getModel("PersonalizationModel").refresh();
					if (r.FilterPersonalization.getModel("FilterPersonalization").getProperty("/results/currentVariant") === "Default") {
						r.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/action", "");
						r.FilterPersonalization.getModel("FilterPersonalization").setProperty("/enableCheckBox", false);
						r.FilterPersonalization.getModel("FilterPersonalization").setProperty("/savePersBtnVisible", false);
						r.FilterPersonalization.getModel("FilterPersonalization").setProperty("/okPersBtnVisible", true);
						r.FilterPersonalization.getModel("FilterPersonalization").setProperty("/deletePersBtnVisible", false);
						r.FilterPersonalization.getModel("FilterPersonalization").setProperty("/selectVarVisible", true);
						r.FilterPersonalization.getModel("FilterPersonalization").setProperty("/nameVarVisible", false);
						o.show(this.resourceBundle.getText("Cannoteditdefaultvariant"));
						r.FilterPersonalization.getModel("FilterPersonalization").refresh()
					}
				} else {
					if (r.currentStep === "keyInvoice") {
						r.getView().getModel("PersonalizationModel").setProperty("/personalizationInvoiceData/userPersonaDto", e)
					} else if (r.currentStep === "keyExchange") {
						r.getView().getModel("PersonalizationModel").setProperty("/personalizationExchangeData/userPersonaDto", e)
					} else if (r.currentStep === "keyReturn") {
						r.getView().getModel("PersonalizationModel").setProperty("/personalizationReturnData/userPersonaDto", e)
					}
					r.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/userPersonaDto", e);
					r.FilterPersonalization.getModel("FilterPersonalization").refresh();
					r.getView().getModel("PersonalizationModel").refresh()
				}
			});
			i.attachRequestFailed(function (e) {
				t.error(e.getSource().getData().message)
			})
		},
		onVariantSave: function (e) {
			if (this.selectedObjects.length === 0) {
				o.show(this.resourceBundle.getText("Saveonlyafteredit"));
				return
			}
			var r = this;
			var s = new sap.ui.model.json.JSONModel;
			var i = e.getSource();
			var a = this.FilterPersonalization.getModel("FilterPersonalization");
			if (a.getProperty("/results/action") === "Create") {
				if (a.getData().newVariantName !== undefined && a.getData().newVariantName !== "") {
					for (var n = 0; n < a.getData().results.variantName.length; n++) {
						if (a.getData().results.variantName[n].name === a.getData().newVariantName) {
							this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/varinatNameValueState", "Error");
							o.show(this.resourceBundle.getText("Newvariantnamecannotbesame"));
							return
						}
					}
					this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/varinatNameValueState", "None");
					var l = a.getData().newVariantName;
					for (var d = 0; d < this.selectedObjects.length; d++) {
						this.selectedObjects[d].variantId = l
					}
				} else {
					this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/varinatNameValueState", "Error");
					sap.m.MessageBox.error(this.resourceBundle.getText("EnterVariantName"));
					return
				}
			}
			var g = this.getView().getModel("baseModel").getData().userId;
			var p;
			var c = {
				varaiantObject: this.selectedObjects,
				userId: g,
				applicationId: this.currentStep,
				varaintId: this.selectedObjects[0].variantId
			};
			var u = {
				"Content-Type": "application/json;charset=utf-8"
			};
			var h = "";
			var m = new sap.m.BusyDialog;
			m.open();
			s.loadData("/DKSHJavaService/variant/UpdateVariant", JSON.stringify(c), true, "PUT", false, false, u);
			s.attachRequestCompleted(function (e) {
				m.close();
				r.selectedObjects = [];
				r.FilterPersonalization.close();
				sap.m.MessageBox.success(this.resourceBundle.getText("CreatedSuccessfully"), {
					actions: [sap.m.MessageBox.Action.OK],
					onClose: function (e) {
						if (e === t.Action.OK) {
							r._getPersonalizationDetails(r.currentStep, "Before")
						}
					}
				})
			});
			s.attachRequestFailed(function (e) {
				t.error(e.getSource().getData().message)
			})
		},
		onVariantDelete: function () {
			var e = this;
			var r = this.getView().getModel("baseModel").getData().userId;
			var o = this.FilterPersonalization.getModel("FilterPersonalization").getProperty("/results/userPersonaDto");
			var s;
			var i = {
				varaiantObject: o,
				userId: r,
				applicationId: this.currentStep,
				varaintId: this.FilterPersonalization.getModel("FilterPersonalization").getProperty("/results/userPersonaDto")[0].variantId
			};
			var a = {
				"Content-Type": "application/json;charset=utf-8"
			};
			var n = new sap.ui.model.json.JSONModel;
			var l = new sap.m.BusyDialog;
			l.open();
			n.loadData("/DKSHJavaService/variant/deleteVariant", JSON.stringify(i), true, "DELETE", false, false, a);
			n.attachRequestCompleted(function (r) {
				l.close();
				e.FilterPersonalization.close();
				sap.m.MessageBox.success(r.getSource().getData().name, {
					actions: [sap.m.MessageBox.Action.OK],
					onClose: function (r) {
						if (r === t.Action.OK) {
							e._getPersonalizationDetails(e.currentStep, "Before")
						}
					}
				})
			});
			n.attachRequestFailed(function (e) {
				t.error(e.getSource().getData().name)
			})
		},
		onVariantCreate: function () {
			var e = this.FilterPersonalization.getModel("FilterPersonalization");
			e.setProperty("/results/action", "Create");
			e.setProperty("/selectVarVisible", false);
			e.setProperty("/nameVarVisible", true);
			e.setProperty("/enableCheckBox", true);
			e.setProperty("/okPersBtnVisible", false);
			e.setProperty("/savePersBtnVisible", true);
			e.setProperty("/newVariantName", "");
			var t = e.getData().results.userPersonaDto;
			for (var r = 0; r < t.length; r++) {
				t[r].status = false
			}
			e.setProperty("/results/userPersonaDto", t);
			this.FilterPersonalization.getModel("FilterPersonalization").refresh()
		},
		onVariantEdit: function () {
			var e = this.FilterPersonalization.getModel("FilterPersonalization");
			if (e.getData().results.currentVariant === "Default") {
				o.show(this.resourceBundle.getText("Cannoteditdefaultvariant"));
				return
			}
			e.setProperty("/results/action", "Edit");
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/okPersBtnVisible", false);
			e.setProperty("/enableCheckBox", true);
			e.setProperty("/savePersBtnVisible", true);
			e.setProperty("/deletePersBtnVisible", true);
			e.setProperty("/selectVarVisible", true);
			e.setProperty("/nameVarVisible", false);
			e.refresh();
			this.onSelectvarian();
			o.show(this.resourceBundle.getText("Selectavarianttoedit"))
		},
		onPersonlizationClose: function () {
			var e = this;
			var t = this.getView().getModel("PersonalizationModel");
			this.selectedObjects = [];
			this.FilterPersonalization.close()
		},
		onVariantOK: function () {
			var e = this;
			var t = this.getView().getModel("PersonalizationModel");
			var r = new sap.ui.model.json.JSONModel({
				results: this.getView().getModel("PersonalizationModel").getData()
			});
			this.FilterPersonalization.setModel(r, "FilterPersonalization");
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/selectVarVisible", true);
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/nameVarVisible", false);
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/enableCheckBox", false);
			this.FilterPersonalization.getModel("FilterPersonalization").refresh();
			this.FilterPersonalization.getModel("FilterPersonalization").refresh();
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/okPersBtnVisible", true);
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/savePersBtnVisible", false);
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/cancelPersBtnVisible", true);
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/deletePersBtnVisible", false);
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/createPersBtnVisible", true);
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/editPersBtnVisible", true);
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/varinatNameValueState", "None");
			this.selectedObjects = [];
			this.getView().getModel("PersonalizationModel").refresh();
			this.FilterPersonalization.close()
		},
		onSelectItemsFromInvoice: function (e) {
			var t = [];
			var r = e.getParameter("listItem").getBindingContext("invoiceSearchModel");
			if (e.getParameters().selected === true) {
				if (e.getParameters().selectAll === true) {
					t = e.getSource().getSelectedContexts()
				}
				if (e.getParameters().selectAll === false) {
					t.push(r)
				}
				for (var s = 0; s < t.length; s++) {
					var i = 0;
					if (this.selectedReturnItems.length === 0 && parseInt(t[s].getObject().AvailRetQtySalesUn) > 0 && t[s].getObject().ColorCode !==
						"R") {
						if (t[s].getObject().ActiveIndicator !== "X") {
							this.selectedReturnItems.push(t[s].getObject());
							this.selectedInvoice.push(t[s].getObject());
							this.getView().getModel("baseModel").setProperty("/returnShipTo", t[s].getObject().shipToAddress.partnerNum);
							this.getView().getModel("baseModel").setProperty("/shipToDesc", t[s].getObject().shipToAddress.partnerName);
							this.getView().getModel("baseModel").setProperty("/returnSoldTo", t[s].getObject().soldToAddress.partnerNum);
							this.getView().getModel("baseModel").setProperty("/returnSoldToDesc", t[s].getObject().soldToAddress.partnerName);
							this.getView().getModel("baseModel").setProperty("/returnBillTo", t[s].getObject().billToAdress.partnerNum);
							this.getView().getModel("baseModel").setProperty("/returnBillToDesc", t[s].getObject().billToAdress.partnerName);
							this.getView().getModel("baseModel").setProperty("/returnPayer", t[s].getObject().payerAddress.partnerNum);
							this.getView().getModel("baseModel").setProperty("/returnPayerDesc", t[s].getObject().payerAddress.partnerName)
						} else {
							++i;
							this.getView().byId("InvoiceTableId").getItems()[parseInt(t[s].sPath.split("/")[2])].setSelected(false);
							o.show(this.resourceBundle.getText("Returnnotallowed"))
						}
					} else if (this.selectedReturnItems.length > 0) {
						for (var a = 0; a < this.selectedReturnItems.length; a++) {
							if (parseInt(t[s].getObject().AvailRetQtySalesUn) > 0 && this.selectedReturnItems[a].shipToParty === t[s].getObject().shipToParty &&
								this.selectedReturnItems[a].billToAdress.partnerNum === t[s].getObject().billToAdress.partnerNum && this.selectedReturnItems[a]
								.payerAddress.partnerNum === t[s].getObject().payerAddress.partnerNum && t[s].getObject().ColorCode !== "R") {
								if (t[s].getObject().ActiveIndicator !== "X") {
									if (t[s].getObject().InvoiceLineItem === this.selectedReturnItems[a].InvoiceLineItem && t[s].getObject().InvoiceNum === this.selectedReturnItems[
											a].InvoiceNum) {
										++i;
										this.getView().byId("InvoiceTableId").getItems()[parseInt(t[s].sPath.split("/")[2])].setSelected(false);
										o.show(this.resourceBundle.getText("ItemisalreadyaddedtoReturns"))
									} else {}
								} else {
									o.show(this.resourceBundle.getText("Returnnotallowed"));
									++i;
									this.getView().byId("InvoiceTableId").getItems()[parseInt(t[s].sPath.split("/")[2])].setSelected(false)
								}
							} else {
								o.show(this.resourceBundle.getText("Itemcannotbeadded"));
								++i;
								this.getView().byId("InvoiceTableId").getItems()[parseInt(t[s].sPath.split("/")[2])].setSelected(false)
							}
						}
						if (i === 0) {
							this.selectedReturnItems.push(t[s].getObject());
							this.selectedInvoice.push(t[s].getObject())
						}
					} else {
						this.getView().byId("InvoiceTableId").getItems()[parseInt(t[s].sPath.split("/")[2])].setSelected(false);
						o.show(this.resourceBundle.getText("Itemcannotbeadded"))
					}
				}
			} else {
				if (e.getParameters().selectAll === false) {
					if (this.getView().byId("InvoiceTableId").getSelectedItems().length === 0) {
						for (var n = this.selectedInvoice.length - 1; n >= 0; n--) {
							for (var l = this.selectedReturnItems.length - 1; l >= 0; l--) {
								if (this.selectedReturnItems.length > 0) {
									if (this.selectedInvoice[n].InvoiceLineItem === this.selectedReturnItems[l].InvoiceLineItem && this.selectedInvoice[n].InvoiceNum ===
										this.selectedReturnItems[l].InvoiceNum) {
										this.selectedReturnItems.splice(l, 1)
									}
								} else {
									break
								}
							}
						}
						this.selectedInvoice = []
					} else {
						for (var l = this.selectedReturnItems.length - 1; l >= 0; l--) {
							if (r.getObject().InvoiceLineItem === this.selectedReturnItems[l].InvoiceLineItem && r.getObject().InvoiceNum === this.selectedReturnItems[
									l].InvoiceNum) {
								this.selectedReturnItems.splice(l, 1);
								this.selectedInvoice.splice(l, 1)
							}
						}
					}
				}
			}
			if (this.selectedReturnItems.length > 10) {
				this.getView().getModel("baseModel").setProperty("/returnTableLength", "60vh")
			} else {
				this.getView().getModel("baseModel").setProperty("/returnTableLength", "")
			}
		},
		onPressReturn: function () {
			var e = this;
			var r = this.getView().getModel("returnModel").getProperty("/results");
			var s = [];
			var i;
			var a = 0;
			if (this.getView().getModel("invoiceSearchModel").getProperty("/results") === "") {
				t.information("Search invoice to procced")
			} else if (this.getView().getModel("invoiceSearchModel").getProperty("/results") !== "") {
				if (this.selectedReturnItems.length > 0) {
					if (this.InvQtyCount > 0) {
						t.information(this.resourceBundle.getText("EnteredReturnedQtycannotbegreaterthanAvailableReturnQty"));
						return
					}
					e.getView().getModel("baseModel").setProperty("/disableSoldToParty", false);
					for (var n = 0; n < this.selectedReturnItems.length; n++) {
						a = a + parseFloat(this.selectedReturnItems[n].netAmount);
						i = {
							refNum: "1234",
							itmNum: "001",
							matGrp: this.selectedReturnItems[n].MaterialGroup,
							matGrp4: this.selectedReturnItems[n].MaterialGroup4,
							itemRoType: "",
							roTypeDesc: "",
							material: this.selectedReturnItems[n].MaterialCode
						};
						s.push(i)
					}
					if (this._oPopover) {
						this._oPopover = undefined
					}
					var l = [];
					var d = [];
					var g = 0;
					for (var n = 0; n < this.selectedInvoice.length; n++) {
						if (this.selectedInvoice[n].HigherLvlItem !== "000000") {
							for (var p = 0; p < this.selectedInvoice.length; p++) {
								if (this.selectedInvoice[p].InvoiceNum === this.selectedInvoice[n].InvoiceNum && this.selectedInvoice[p].ItemGroup === this.selectedInvoice[
										n].HigherLvlItem) {
									if (this.selectedInvoice[p].HigherLvlItem === "000000") {
										g++
									} else {}
								}
							}
						} else {
							g++
						}
					}
					if (g === 0) {
						o.show(this.resourceBundle.getText("Selectparentitem"))
					} else {
						if (this.getView().getModel("baseModel").getProperty("/selectedROTypeCode") === "TI" || this.getView().getModel("baseModel").getProperty(
								"/selectedROTypeCode") === "TK") {
							this._getSLoc()
						} else {
							this._ROType(s)
						}
					}
				} else {
					t.information(this.resourceBundle.getText("Selectatleastoneitem"))
				}
			}
		},
		_ROType: function (e) {
			var t = this;
			var r = {
				d: {
					refNum: "1234",
					roType: t.ROtypeCode,
					roTypeDesc: "",
					roTyMatchingToRoTyItem: {
						results: e
					}
				}
			};
			var o = this.getView().getModel("ZDKSH_CC_RETURNS_MANAGEMENT_SRV");
			var s =
				"/DKSHODataService/sap/opu/odata/sap/ZDKSH_CC_RETURNS_MANAGEMENT_SRV/roTypeMatchingSet(refNum='5700000669')?$expand=roTyMatchingToRoTyItem&$format=json";
			var i = "/DKSHODataService/sap/opu/odata/sap/ZDKSH_CC_RETURNS_MANAGEMENT_SRV/roTypeMatchingSet";
			var a = new sap.m.BusyDialog;
			a.open();
			var n;
			$.ajax({
				url: s,
				type: "GET",
				beforeSend: function (e) {
					e.setRequestHeader("X-CSRF-Token", "Fetch")
				},
				complete: function (e) {
					n = e.getResponseHeader("X-CSRF-Token");
					$.ajax({
						url: i,
						method: "POST",
						async: true,
						data: JSON.stringify(r),
						beforeSend: function (e) {
							e.setRequestHeader("X-CSRF-Token", n)
						},
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json"
						},
						success: function (e, r, o) {
							a.close();
							if (e.d.roType === "TG" || e.d.roType === "TF") {
								t.ROtypeCode = e.d.roType;
								t.getView().getModel("baseModel").setProperty("/newSelectedROType", e.d.roTypeDesc);
								t.getView().getModel("baseModel").setProperty("/newSelectedROTypeCode", e.d.roType);
								t.getView().getModel("baseModel").refresh()
							} else {}
							t._getSLoc()
						},
						error: function (e, r, o) {
							a.close();
							var s = "";
							if (e.status === 504) {
								s = t.resourceBundle.getText("timeOut");
								t.errorMsg(s)
							} else {
								var i = e.responseJSON.error.innererror.errordetails;
								for (var n = 0; n < i.length; n++) {
									if (n < i.length - 1) {
										s = s + i[n].message
									}
								}
								t.errorMsg(s)
							}
						}
					})
				}
			})
		},
		_getOrderType: function (e, t, r) {
			var o = this;
			var s = [];
			if (e === undefined && t === undefined && r === undefined) {
				var i = this.getView().getModel("invoiceSearchModel").getProperty("/billingType");
				var a = this.getView().getModel("invoiceSearchModel").getProperty("/salesOrgNo").slice(0, 2);
				var n = new sap.ui.model.Filter({
					filters: [new sap.ui.model.Filter("billingType", sap.ui.model.FilterOperator.EQ, i), new sap.ui.model.Filter("countryCode", sap
						.ui.model.FilterOperator.EQ, a), new sap.ui.model.Filter("roType", sap.ui.model.FilterOperator.EQ, this.ROtypeCode)],
					and: true
				})
			} else {
				var n = new sap.ui.model.Filter({
					filters: [new sap.ui.model.Filter("billingType", sap.ui.model.FilterOperator.EQ, i), new sap.ui.model.Filter("countryCode", sap
						.ui.model.FilterOperator.EQ, a), new sap.ui.model.Filter("roType", sap.ui.model.FilterOperator.EQ, r)],
					and: true
				})
			}
			s.push(n);
			var l = o.getView().getModel("ZDKSH_CC_RETURNS_MANAGEMENT_SRV");
			var d = new sap.m.BusyDialog;
			d.open();
			l.read("/billingTypeMappingSet", {
				filters: s,
				async: false,
				success: function (e, t) {
					d.close();
					o.getView().getModel("baseModel").setProperty("/returnOrderType", e.results[0].returnOrderType);
					o.getView().getModel("baseModel").setProperty("/exchangeOrderType", e.results[0].exchangeOrderType);
					o._pricingSimulation(o.selectedReturnItems, "Returns")
				},
				error: function (e) {
					d.close();
					var t = JSON.parse(e.responseText);
					t = t.error.message.value;
					o.errorMsg(t)
				}
			})
		},
		_pricingSimulation: function (e, o) {
			var s = this;
			var i = s.getView().getModel("baseModel");
			var a = s.getView().getModel("returnModel");
			var n = s.getView().getModel("exchangeModel");
			var l = s.getView().getModel("invoiceSearchModel");
			var d = "/DKSHODataService/sap/opu/odata/sap/ZDKSH_CC_RETURNS_ORDERCREATION_SRV/priceSimulationHeaderSet";
			var g;
			var p = [];
			if (o === "Returns" || o === "ReturnsTab") {
				g = this.getView().getModel("baseModel").getData().returnOrderType;
				var c = "R"
			} else {
				g = this.getView().getModel("baseModel").getData().exchangeOrderType;
				var c = "E"
			}
			for (var u = 0; u < e.length; u++) {
				if (o === "ReturnsTab" || o === "Exchange" || o === "ExchangeTab" || o === "ExchangeDelete") {
					if (e[u].avlRetQty === "") {
						e[u].avlRetQty = e[u].quantity
					}
					if (e[u].unitPriceInv === "") {
						e[u].unitPriceInv = e[u].unitPrice
					}
					if (e[u].listPrice !== undefined && e[u].listPrice === "") {
						e[u].listPrice = "0.00"
					}
					if (e[u].expiryDate === null) {
						e[u].expiryDate = ""
					}
					if (e[u].storageLocation === null) {
						e[u].storageLocation = ""
					}
					if (e[u].itemVisibility === undefined || e[u].itemVisibility === null) {
						e[u].itemVisibility = "false"
					}
					if (e[u].expiryDate.includes("(")) {
						var h = r.dateTimeFormatPS(e[u].expiryDate);
						var m = r.dateTimeFormatPS(e[u].billingDate)
					} else {
						var h = r.dateTimeFormat(e[u].expiryDate);
						var m = r.dateTimeFormat(e[u].billingDate)
					}
					if (e[u].manualFoc === null) {
						e[u].manualFoc = ""
					}
					if (e[u].expiryDate === "" || e[u].billingDate === "") {
						var y = {
							refInvoice: e[u].refInvoice,
							refItemNumber: e[u].refItemNumber,
							matNumber: e[u].matNumber,
							quantity: e[u].quantity,
							salesUnit: e[u].salesUnit,
							unitPrice: e[u].unitPrice,
							materialGroup: e[u].materialGroup,
							materialGroup4: e[u].materialGroup4,
							avlRetQty: e[u].avlRetQty,
							billingQty: e[u].avlRetQty,
							baseUnit: e[u].salesUnit,
							batchNumber: e[u].batchNumber,
							storageLocation: e[u].storageLocation,
							serialNumber: e[u].serialNumber,
							unitPriceInv: e[u].unitPriceInv,
							listPrice: e[u].listPrice,
							active: e[u].active,
							manualFoc: e[u].manualFoc,
							itemVisibility: e[u].itemVisibility
						}
					} else {
						var y = {
							refInvoice: e[u].refInvoice,
							refItemNumber: e[u].refItemNumber,
							matNumber: e[u].matNumber,
							quantity: e[u].quantity,
							salesUnit: e[u].salesUnit,
							unitPrice: e[u].unitPrice,
							materialGroup: e[u].materialGroup,
							materialGroup4: e[u].materialGroup4,
							avlRetQty: e[u].avlRetQty,
							billingQty: e[u].avlRetQty,
							baseUnit: e[u].salesUnit,
							batchNumber: e[u].batchNumber,
							expiryDate: h,
							storageLocation: e[u].storageLocation,
							serialNumber: e[u].serialNumber,
							billingDate: m,
							unitPriceInv: e[u].unitPriceInv,
							listPrice: e[u].listPrice,
							active: e[u].active,
							manualFoc: e[u].manualFoc,
							itemVisibility: e[u].itemVisibility
						}
					}
				} else {
					var P = r.dateTimeFormat(e[u].ExpiryDate);
					var f = r.dateTimeFormat(e[u].billingDateFrom);
					var y = {
						refInvoice: e[u].InvoiceNum,
						refItemNumber: e[u].InvoiceLineItem,
						matNumber: e[u].MaterialCode,
						quantity: e[u].actualRetQty,
						salesUnit: e[u].actualRetUOM,
						unitPrice: e[u].UnitPrice,
						materialGroup: e[u].MaterialGroup,
						materialGroup4: e[u].MaterialGroup4,
						avlRetQty: e[u].AvailRetQtySalesUn,
						billingQty: e[u].BillingQty,
						baseUnit: e[u].BaseUnit,
						batchNumber: e[u].BatchNumber,
						expiryDate: P,
						serialNumber: e[u].SerialNum,
						billingDate: f,
						unitPriceInv: e[u].UnitPrice,
						listPrice: e[u].ListPrice,
						storageLocation: e[u].storageLocation,
						active: e[u].ActiveIndicator,
						itemVisibility: e[u].itemVisibility
					}
				}
				p.push(y)
			}
			if (o === "ReturnsTab" || o === "Returns") {
				var v = {
					d: {
						orderType: g,
						distChannel: l.getData().distChnl,
						salesOrg: l.getData().salesOrgNo,
						division: l.getData().Division,
						soldToParty: i.getData().returnSoldTo,
						shipToParty: i.getData().returnShipTo,
						billToParty: i.getData().returnBillTo,
						payer: i.getData().returnPayer,
						roType: this.ROtypeCode,
						flag: c,
						navToPriceItem: {
							results: p
						},
						navToPriceConditions: {
							results: []
						}
					}
				}
			} else {
				var v = {
					d: {
						orderType: g,
						distChannel: l.getData().distChnl,
						salesOrg: l.getData().salesOrgNo,
						division: l.getData().Division,
						soldToParty: i.getData().exSoldTo,
						shipToParty: i.getData().exShipTo,
						billToParty: i.getData().exBillTo,
						payer: i.getData().exPayer,
						roType: this.ROtypeCode,
						flag: c,
						navToPriceItem: {
							results: p
						},
						navToPriceConditions: {
							results: []
						}
					}
				}
			}
			var D = new sap.m.BusyDialog;
			D.open();
			var M = "/DKSHODataService/sap/opu/odata/sap/ZDKSH_CC_RETURNS_ORDERCREATION_SRV/priceSimulationHeaderSet";
			var b;
			$.ajax({
				url: M,
				type: "GET",
				beforeSend: function (e) {
					e.setRequestHeader("X-CSRF-Token", "Fetch")
				},
				complete: function (e) {
					b = e.getResponseHeader("X-CSRF-Token");
					$.ajax({
						url: d,
						method: "POST",
						async: true,
						data: JSON.stringify(v),
						beforeSend: function (e) {
							e.setRequestHeader("X-CSRF-Token", b)
						},
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json"
						},
						success: function (e, l, d) {
							D.close();
							if (o === "Returns" || o === "ReturnsDraft") {
								s._wizard.setCurrentStep(s.byId("ID_WIZARD_RTEX"));
								var g = i.getProperty("/selectedROTypeCode");
								var p = i.getProperty("/newSelectedROTypeCode");
								var c = i.getProperty("/newSelectedROType");
								if (i.getProperty("/requestor") === undefined || i.getProperty("/requestor") === "") {
									i.setProperty("/requestor", r.concatenateStrings(i.getProperty("/userName"), i.getProperty("/phone")))
								}
								if (p) {
									if (p === "TG" || p === "TF") {
										if (g !== p) {
											i.setProperty("/selectedROTypeCode", p);
											i.setProperty("/selectedROType", c);
											s.getView().byId("RotypeSegementedBtnID").setSelectedKey(p);
											t.information(s.resourceBundle.getText("Specialmapping"))
										}
									}
								}
								if (s.docVersion === "SUCCESS") {
									i.setProperty("/previewBtnVisiblitys", true);
									i.setProperty("/submitBtnVisiblitys", false)
								} else {
									i.setProperty("/previewBtnVisiblitys", true);
									i.setProperty("/submitBtnVisiblitys", true)
								}
								var u = 0;
								if (e.d.navToPriceConditions) {
									for (var h = 0; h < e.d.navToPriceConditions.results.length; h++) {
										s.returnConditions.push(e.d.navToPriceConditions.results[h])
									}
									a.setProperty("/returnConditions", s.returnConditions)
								}
								for (var m = 0; m < e.d.navToPriceItem.results.length; m++) {
									if (e.d.navToPriceItem.results[m].deleted === undefined) {
										e.d.navToPriceItem.results[m].deleted = "false"
									}
									if (s.docVersion === "SUCCESS") {
										e.d.navToPriceItem.results[m].editQtyRet = false;
										e.d.navToPriceItem.results[m].editUOMRet = false;
										e.d.navToPriceItem.results[m].editSLocRet = false;
										e.d.navToPriceItem.results[m].editUPRet = false;
										e.d.navToPriceItem.results[m].editBatchRet = false;
										e.d.navToPriceItem.results[m].editSerialNoRet = false
									} else {
										if (i.getData().selectedROTypeCode === "TI") {
											e.d.navToPriceItem.results[m].editQtyRet = true;
											e.d.navToPriceItem.results[m].editUOMRet = true;
											e.d.navToPriceItem.results[m].editSLocRet = false;
											e.d.navToPriceItem.results[m].editUPRet = false;
											e.d.navToPriceItem.results[m].editBatchRet = false;
											e.d.navToPriceItem.results[m].editSerialNoRet = false
										} else if (i.getData().selectedROTypeCode === "TK") {
											e.d.navToPriceItem.results[m].editSLocRet = false;
											e.d.navToPriceItem.results[m].editUPRet = false;
											e.d.navToPriceItem.results[m].editBatchRet = false;
											e.d.navToPriceItem.results[m].editSerialNoRet = false;
											e.d.navToPriceItem.results[m].editQtyRet = false;
											e.d.navToPriceItem.results[m].editUOMRet = false
										} else {
											e.d.navToPriceItem.results[m].editSLocRet = true;
											e.d.navToPriceItem.results[m].editUPRet = true;
											e.d.navToPriceItem.results[m].editBatchRet = true;
											e.d.navToPriceItem.results[m].editSerialNoRet = true;
											e.d.navToPriceItem.results[m].editQtyRet = true;
											e.d.navToPriceItem.results[m].editUOMRet = true
										}
									}
								}
								s.returnItems = e.d.navToPriceItem.results;
								for (var h = s.returnItems.length - 1; h >= 0; h--) {
									if (s.returnItems[h].deleted === "true") {
										s.returnItems.splice(h, 1)
									} else {
										u = u + parseFloat(s.returnItems[h].netAmount)
									}
								}
								a.setProperty("/results", s.returnItems);
								i.setProperty("/originalReturnData", JSON.parse(JSON.stringify(s.returnItems)));
								a.setProperty("/returnLength", "Returns (" + s.returnItems.length + ")");
								a.setProperty("/returnAmountTotal", u.toFixed(2) + "(THB)");
								a.refresh();
								s.onResetSearchInvoice()
							} else if (o === "ReturnsTab") {
								var u = 0;
								var y = 0;
								var P = e.d.navToPriceItem.results;
								var f = a.getProperty("/results");
								for (var h = 0; h < P.length; h++) {
									for (var m = 0; m < f.length; m++) {
										if (P[h].refInvoice === f[m].refInvoice && P[h].refItemNumber === f[m].refItemNumber) {
											if (f[m].deleted === "false") {
												P[h].deleted = "false"
											} else {
												P[h].deleted = "true"
											}
											f[m] = P[h];
											if (i.getData().selectedROTypeCode === "TI") {
												f[m].editQtyRet = true;
												f[m].editUOMRet = true;
												f[m].editSLocRet = false;
												f[m].editUPRet = false;
												f[m].editBatchRet = false;
												f[m].editSerialNoRet = false
											} else if (i.getData().selectedROTypeCode === "TK") {
												f[m].editSLocRet = false;
												f[m].editUPRet = false;
												f[m].editBatchRet = false;
												f[m].editSerialNoRet = false;
												f[m].editQtyRet = false;
												f[m].editUOMRet = false
											} else {
												f[m].editSLocRet = true;
												f[m].editUPRet = true;
												f[m].editBatchRet = true;
												f[m].editSerialNoRet = true;
												f[m].editQtyRet = true;
												f[m].editUOMRet = true
											}
										}
									}
								}
								for (var m = 0; m < f.length; m++) {
									if (f[m].deleted === "false") {
										u = u + parseFloat(f[m].netAmount);
										++y
									}
								}
								a.setProperty("/results", f);
								i.setProperty("/originalReturnData", JSON.parse(JSON.stringify(f)));
								a.setProperty("/returnLength", "Returns (" + y + ")");
								a.setProperty("/returnAmountTotal", u.toFixed(2) + "(THB)");
								a.refresh();
								if (e.d.navToPriceConditions) {
									for (var h = 0; h < e.d.navToPriceConditions.results.length; h++) {
										s.returnConditions.push(e.d.navToPriceConditions.results[h])
									}
									a.setProperty("/returnConditions", s.returnConditions)
								}
							} else if (o === "Exchange") {
								s.getView().byId("ID_TAB_BAR_PROV_APP").setSelectedKey("Exchange");
								i.setProperty("/exchangeTabVisiblity", true);
								var v = 0;
								if (e.d.navToPriceConditions) {
									s.exchangeConditions = e.d.navToPriceConditions.results;
									n.setProperty("/exchangeConditions", s.exchangeConditions)
								}
								s.exchangeItems = e.d.navToPriceItem.results;
								for (var m = 0; m < s.exchangeItems.length; m++) {
									v = v + parseFloat(s.exchangeItems[m].netAmount);
									if (s.exchangeItems[m].higherItem !== "000000") {
										s.exchangeItems[m].editable = false
									} else {
										s.exchangeItems[m].editable = true
									}
									s.exchangeItems[m].deleted = "false";
									s.exchangeItems[m].FOCEnabled = false;
									if (s.exchangeItems[m].refInvoice === "") {
										if (s.exchangeItems[m].higherItem !== "000000") {
											s.exchangeItems[m].FOCEnabled = false
										} else {
											s.exchangeItems[m].FOCEnabled = true
										}
									} else {
										s.exchangeItems[m].FOCEnabled = false
									}
									if (s.exchangeItems[m].manualFoc === "X") {
										if (s.docVersion === "SUCCESS") {
											s.exchangeItems[m].manualFOCCheck = true;
											s.exchangeItems[m].FOCEnabled = false
										} else {
											s.exchangeItems[m].manualFOCCheck = true;
											s.exchangeItems[m].FOCEnabled = true
										}
									} else {
										s.exchangeItems[m].manualFOCCheck = false
									}
									if (s.docVersion === "SUCCESS") {
										s.exchangeItems[m].editSLocEx = false;
										s.exchangeItems[m].editSerialNoEx = false;
										s.exchangeItems[m].editable = false;
										s.exchangeItems[m].editExqty = false;
										s.exchangeItems[m].editBatchEx = false
									} else {
										if (i.getData().selectedROTypeCode === "TI") {
											if (i.getProperty("/roTypeSLoc")) {
												s.exchangeItems[m].storageLocation = i.getProperty("/roTypeSLoc")
											}
											if (s.exchangeItems[m].refInvoice !== "") {
												s.exchangeItems[m].editSLocEx = false;
												s.exchangeItems[m].editSerialNoEx = true;
												s.exchangeItems[m].editBatchEx = true;
												s.exchangeItems[m].editBatchEx = true;
												s.exchangeItems[m].editable = false;
												s.exchangeItems[m].editExqty = false
											} else {
												s.exchangeItems[m].editSLocEx = true;
												s.exchangeItems[m].editSerialNoEx = true;
												s.exchangeItems[m].editBatchEx = true;
												s.exchangeItems[m].editable = false;
												s.exchangeItems[m].editExqty = false
											}
										} else if (i.getData().selectedROTypeCode === "TK") {
											if (i.getProperty("/roTypeSLoc")) {
												s.exchangeItems[m].storageLocation = i.getProperty("/roTypeSLoc")
											}
											if (s.exchangeItems[m].refInvoice !== "") {
												s.exchangeItems[m].editSLocEx = false;
												s.exchangeItems[m].editSerialNoEx = false;
												s.exchangeItems[m].editBatchEx = true
											} else {
												s.exchangeItems[m].editSLocEx = true;
												s.exchangeItems[m].editBatchEx = true
											}
										} else {
											s.exchangeItems[m].editSLocEx = true;
											s.exchangeItems[m].editSerialNoEx = true;
											s.exchangeItems[m].editBatchEx = true
										}
									}
								}
								n.setProperty("/results", s.exchangeItems);
								i.setProperty("/originalExchangeData", JSON.parse(JSON.stringify(s.exchangeItems)));
								n.setProperty("/exchangeLength", "Exchange (" + s.exchangeItems.length + ")");
								n.setProperty("/exchangeAmountTotal", v.toFixed(2) + "(THB)");
								n.refresh()
							} else if (o === "ExchangeTab") {
								var v = 0;
								if (e.d.navToPriceConditions) {
									s.exchangeConditions = e.d.navToPriceConditions.results;
									n.setProperty("/exchangeConditions", s.exchangeConditions)
								}
								var M = e.d.navToPriceItem.results;
								var b = n.getProperty("/results");
								for (var h = 0; h < M.length; h++) {
									v = v + parseFloat(M[h].netAmount);
									if (M[h].higherItem !== "000000") {
										M[h].editable = false
									} else {
										M[h].editable = true
									}
									if (M[h].refInvoice === "") {
										if (M[h].higherItem !== "000000") {
											M[h].FOCEnabled = false
										} else {
											M[h].FOCEnabled = true
										}
									} else {
										M[h].FOCEnabled = false
									}
									if (M[h].manualFoc === "X") {
										if (s.docVersion === "SUCCESS") {
											M[h].manualFOCCheck = true;
											M[h].FOCEnabled = false
										} else {
											M[h].manualFOCCheck = true;
											M[h].FOCEnabled = true
										}
									} else {
										M[h].manualFOCCheck = false
									}
									M[h].deleted = "false";
									if (i.getData().selectedROTypeCode === "TI") {
										if (M[h].refInvoice !== "") {
											M[h].editSLocEx = false;
											M[h].editSerialNoEx = true;
											M[h].editable = false;
											M[h].editExqty = false
										} else {
											M[h].editSLocEx = true;
											M[h].editSerialNoEx = true;
											M[h].editable = false;
											M[h].editExqty = false
										}
									} else if (i.getData().selectedROTypeCode === "TK") {
										if (M[h].refInvoice !== "") {
											M[h].editSLocEx = false;
											M[h].editSerialNoEx = false
										} else {
											M[h].editSLocEx = true;
											M[h].editSerialNoEx = false
										}
									} else {
										M[h].editSLocRet = true;
										M[h].editSerialNoRet = true
									}
								}
								n.setProperty("/results", M);
								i.setProperty("/originalExchangeData", JSON.parse(JSON.stringify(M)));
								n.setProperty("/exchangeLength", "Exchange (" + M.length + ")");
								n.setProperty("/exchangeAmountTotal", v.toFixed(2) + "(THB)");
								n.refresh()
							} else if (o === "ExchangeDelete") {
								var v = 0;
								s.exchangeConditions = e.d.navToPriceConditions.results;
								n.setProperty("/exchangeConditions", s.exchangeConditions);
								var M = e.d.navToPriceItem.results;
								var b = n.getProperty("/results");
								for (var m = 0; m < b.length; m++) {
									for (var h = 0; h < M.length; h++) {
										v = v + parseFloat(M[h].netAmount);
										M[h].deleted = "false";
										if (M[h].higherItem !== "000000") {
											M[h].editable = false
										} else {
											M[h].editable = true
										}
										if (M[h].refInvoice === b[m].refInvoice && M[h].refItemNumber === b[m].refItemNumber) {
											M[h].deleted = "false";
											b[m] = M[h]
										} else if (M[h].refInvoice === b[m].refInvoice && M[h].refItemNumber === "000000") {
											M[h].deleted = "false";
											b[m] = M[h]
										}
									}
								}
								n.setProperty("/results", b);
								i.setProperty("/originalExchangeData", JSON.parse(JSON.stringify(M)));
								n.setProperty("/exchangeLength", "Exchange (" + M.length + ")");
								n.setProperty("/exchangeAmountTotal", v.toFixed(2) + "(THB)");
								n.refresh()
							}
						},
						error: function (e, r, o) {
							D.close();
							var i = "";
							if (e.status === 504) {
								i = s.resourceBundle.getText("timeOut");
								i = "Request timed-out. Please try again using different search filters or add more search filters.";
								t.error(i)
							} else {
								var a = "";
								var n = "";
								var l = e.responseJSON.error.innererror.errordetails;
								for (var d = 0; d < l.length; d++) {
									if (l[d].severity === "warning") {
										a = a + " " + l[d].message
									} else {
										n = n + " " + l[d].message
									}
								}
								sap.m.MessageBox.error(a, {
									title: "Error",
									id: "messageBoxId2",
									details: n,
									contentWidth: "100px"
								})
							}
						}
					})
				}
			})
		},
		selectUom: function (e) {
			var t = this;
			var r = [];
			if (this.getView().byId("ID_TAB_BAR_PROV_APP").getSelectedKey() === "Return" && !this.UOMIndex.getObject().MaterialCode) {
				this.getView().getModel("returnModel").getData().results[parseInt(this.UOMIndex.getPath().split("/")[2])].salesUnit = e.getParameters()
					.selectedContexts[0].getObject().alternateUom;
				var o = this.UOMIndex.getObject();
				var s = this.getView().getModel("returnModel").getProperty("/results");
				for (var i = 0; i < s.length; i++) {
					if (s[i].refInvoice === o.refInvoice) {
						r.push(s[i])
					}
				}
				var a = this.getView().getModel("returnModel").getProperty("/returnConditions");
				for (var i = a.length - 1; i >= 0; i--) {
					if (a[i].refInvoice === o.refInvoice) {
						a.splice(i, 1)
					}
				}
				this.getView().getModel("returnModel").setProperty("/returnConditions", a);
				this._pricingSimulation(r, "ReturnsTab");
				this.getView().getModel("returnModel").refresh()
			} else if (this.getView().byId("ID_TAB_BAR_PROV_APP").getSelectedKey() === "Exchange") {
				this.getView().getModel("exchangeModel").getData().results[parseInt(this.UOMIndex.getPath().split("/")[2])].salesUnit = e.getParameters()
					.selectedContexts[0].getObject().alternateUom;
				this.currentObject = this.UOMIndex.getObject();
				var n = parseInt(this.UOMIndex.getPath().split("/")[2]);
				var l = this.getView().getModel("exchangeModel").getProperty("/results");
				for (var i = 0; i < l.length; i++) {
					if (l[i].refInvoice === "" && l[i].higherItem !== "000000" && l[i].manualFoc !== "X" && l[i].higherItem !== "") {} else {
						r.push(l[i])
					}
				}
				this._pricingSimulation(r, "ExchangeTab");
				this.getView().getModel("exchangeModel").refresh()
			} else {
				this.getView().getModel("invoiceSearchModel").getData().results[parseInt(this.UOMIndex.getPath().split("/")[2])].actualRetUOM = e.getParameters()
					.selectedContexts[0].getObject().alternateUom;
				var o = this.UOMIndex.getObject();
				this.getView().getModel("invoiceSearchModel").refresh()
			}
		},
		onChangeRetQTY: function (e) {
			this.RetQtyCount = 0;
			var r = [];
			var o = this.getView().getModel("baseModel").getProperty("/originalReturnData");
			var s = e.getSource().getBindingContext("returnModel").getObject();
			var i = this.getView().getModel("returnModel").getProperty("/results");
			if (s.quantity === "") {
				t.information(this.resourceBundle.getText("Quantitycannotbeempty"));
				return
			}
			for (var a = 0; a < o.length; a++) {
				if (o[a].refInvoice === s.refInvoice && o[a].refItemNumber === s.refItemNumber) {
					if (parseFloat(s.quantity) > parseFloat(o[a].avlRetQty)) {
						++this.RetQtyCount;
						t.information(this.resourceBundle.getText("EnteredReturnedQtycannotbegreaterthanAvailableReturnQty"))
					} else {
						if (this.RetQtyCount > 0) {
							--this.RetQtyCount
						}
						for (var n = 0; n < i.length; n++) {
							if (i[n].refInvoice === s.refInvoice && i[n].deleted === "false") {
								r.push(i[n])
							}
						}
						var l = this.getView().getModel("returnModel").getProperty("/returnConditions");
						for (var n = l.length - 1; n >= 0; n--) {
							if (l[n].refInvoice === s.refInvoice) {
								l.splice(n, 1)
							}
						}
						this.getView().getModel("returnModel").setProperty("/returnConditions", l);
						this._pricingSimulation(r, "ReturnsTab")
					}
				}
			}
		},
		onChangeExcQty: function (e) {
			var r = [];
			var o = this.getView().getModel("baseModel").getProperty("/originalExchangeData");
			var s = e.getSource().getBindingContext("exchangeModel").getObject();
			var i = this.getView().getModel("exchangeModel").getProperty("/results");
			if (s.quantity === "") {
				t.information(this.resourceBundle.getText("Quantitycannotbeempty"))
			} else {
				for (var a = 0; a < i.length; a++) {
					if (i[a].deleted === "false") {
						if (i[a].refInvoice === "" && i[a].higherItem !== "000000" && i[a].manualFoc !== "X" && i[a].higherItem !== "") {} else {
							r.push(i[a])
						}
					}
				}
				this._pricingSimulation(r, "ExchangeTab")
			}
		},
		onAddFOC: function (e) {
			var r = [];
			var o = this.getView().getModel("baseModel").getProperty("/originalExchangeData");
			var s = parseInt(e.getSource().getBindingContext("exchangeModel").sPath.split("/")[2]);
			var i = e.getSource().getBindingContext("exchangeModel").getObject();
			var a = this.getView().getModel("exchangeModel").getProperty("/results");
			if (a.length === 1) {
				if (e.getSource().getSelected() === true) {
					e.getSource().setSelected(false);
					t.information(this.resourceBundle.getText("CannotaddmanualFOC"))
				}
			} else {
				var n = e.getSource().getSelected();
				if (n === false) {
					i.manualFoc = ""
				} else {
					i.manualFoc = "X"
				}
				for (var l = 0; l < a.length; l++) {
					if (a[l].deleted === "false") {
						if (a[l].refInvoice === "" && a[l].higherItem !== "000000" && a[l].higherItem !== "" && a[l].manualFoc !== "X" && s !== l) {} else {
							r.push(a[l])
						}
					}
				}
				this._pricingSimulation(r, "ExchangeTab")
			}
		},
		onChangeUnitPrice: function (e) {
			this.RetUPCount = 0;
			var t = [];
			var r = this.getView().getModel("baseModel").getProperty("/originalReturnData");
			var s = e.getSource().getBindingContext("returnModel").getObject();
			var i = this.getView().getModel("returnModel").getProperty("/results");
			if (parseFloat(s.unitPrice) < parseFloat(s.unitPriceInv)) {
				o.show(this.resourceBundle.getText("UnitPriceValidation"))
			}
			for (var a = 0; a < i.length; a++) {
				if (i[a].refInvoice === s.refInvoice && i[a].deleted === "false") {
					t.push(i[a])
				}
			}
			var n = this.getView().getModel("returnModel").getProperty("/returnConditions");
			for (var a = n.length - 1; a >= 0; a--) {
				if (n[a].refInvoice === s.refInvoice) {
					n.splice(a, 1)
				}
			}
			this.getView().getModel("returnModel").setProperty("/returnConditions", n);
			this._pricingSimulation(t, "ReturnsTab")
		},
		onChangeExcUP: function (e) {
			this.ExcUPCount = 0;
			var t = [];
			var r = this.getView().getModel("baseModel").getProperty("/originalExchangeData");
			var s = e.getSource().getBindingContext("exchangeModel").getObject();
			var i = this.getView().getModel("exchangeModel").getProperty("/results");
			if (parseFloat(s.unitPrice) < parseFloat(s.unitPriceInv)) {
				o.show(this.resourceBundle.getText("UnitPriceValidation"))
			}
			for (var a = 0; a < i.length; a++) {
				if (i[a].deleted === "false") {
					if (i[a].refInvoice === "" && i[a].higherItem !== "000000" && i[a].manualFoc !== "X" && i[a].higherItem !== "") {} else {
						t.push(i[a])
					}
				}
			}
			this._pricingSimulation(t, "ExchangeTab")
		},
		onTabSelection: function (e) {
			if (this._oPopover) {
				this._oPopover = undefined
			}
			var t = this.getView().getModel("baseModel");
			t.setProperty("/comment", "");
			t.setProperty("/contactTelephone", "");
			t.setProperty("/contactDivision", "");
			t.setProperty("/contactPerson", "");
			t.setProperty("/remark", "");
			t.refresh()
		},
		onCopyItemsToExchange: function () {
			var e = this;
			if (this._oPopover) {
				this._oPopover = undefined
			}
			if (this.RetQtyCount > 0) {
				t.information("Entered Qty cannot be greater than Available Return Qty In Returns");
				return
			}
			var r = this.getView().getModel("baseModel").getProperty("/smsInputVisiblity");
			var s = this.getView().getModel("baseModel").getProperty("/emailInputVisiblity");
			if (r === true && (this.getView().getModel("baseModel").getProperty("/phoneNum") === "" || this.getView().getModel("baseModel").getProperty(
					"/phoneNum") === undefined)) {
				o.show(this.resourceBundle.getText("EnterPhoneNumber"));
				return
			}
			if (s === true && (this.getView().getModel("baseModel").getProperty("/userEmailId") === "" || this.getView().getModel("baseModel").getProperty(
					"/userEmailId") === undefined)) {
				o.show(this.resourceBundle.getText("EnterEmailId"));
				return
			}
			if (this.getView().getModel("baseModel").getProperty("/reasonOwner") === "" || this.getView().getModel("baseModel").getProperty(
					"/reasonOwner") === undefined) {
				o.show(this.resourceBundle.getText("ReasonOwnerisMandatory"));
				return
			}
			if (this.getView().getModel("baseModel").getProperty("/referenceNo") === "" || this.getView().getModel("baseModel").getProperty(
					"/referenceNo") === undefined) {
				o.show(this.resourceBundle.getText("referenceNoisMandatory"));
				return
			}
			var i = [];
			var a = this.getView().getModel("returnModel").getData().results;
			var n = 0;
			for (var l = 0; l < a.length; l++) {
				if (a[l].deleted === "false") {
					if (a[l].active !== "E") {
						n = n + parseFloat(a[l].netAmount);
						i.push(JSON.parse(JSON.stringify(a[l])));
						if (this.getView().getModel("baseModel").getData().selectedROTypeCode === "TI" || this.getView().getModel("baseModel").getData()
							.selectedROTypeCode === "TK") {} else {}
					} else {
						o.show(this.resourceBundle.getText("exchangenotallowed"))
					}
				}
			}
			if (i.length > 0) {
				for (var l = 0; l < i.length; l++) {
					i[l].storageLocation = "";
					i[l].batchNumber = "";
					i[l].serialNumber = "";
					i[l].manualFoc = ""
				}
				this.selectedItemsforDelete = [];
				this.deletedItem = [];
				var d = this.getView().getModel("baseModel");
				d.setProperty("/comment", "");
				d.setProperty("/contactTelephone", "");
				d.setProperty("/contactDivision", "");
				d.setProperty("/contactPerson", "");
				d.setProperty("/remark", "");
				d.setProperty("/exSoldTo", d.getProperty("/returnSoldTo"));
				d.setProperty("/exSoldToDesc", d.getProperty("/returnSoldToDesc"));
				d.setProperty("/exShipTo", d.getProperty("/returnShipTo"));
				d.setProperty("/exShipToDesc", d.getProperty("/shipToDesc"));
				d.setProperty("/exBillTo", d.getProperty("/returnBillTo"));
				d.setProperty("/exBillToDesc", d.getProperty("/returnBillToDesc"));
				d.setProperty("/exPayer", d.getProperty("/returnPayer"));
				d.setProperty("/exPayerDesc", d.getProperty("/returnPayerDesc"));
				d.refresh();
				this._pricingSimulation(i, "Exchange");
				if (this.getView().getModel("baseModel").getProperty("/exchangeTabVisiblity") === false) {
					this._getPersonalizationDetails("keyExchange", "Before");
					this.getView().getModel("baseModel").setProperty("/exchangeTabVisiblity", true)
				}
				this.getView().getModel("baseModel").setProperty("/exchangeTabVisiblity", true);
				this.getView().getModel("baseModel").refresh();
				if (i.length > 10) {
					this.getView().getModel("baseModel").setProperty("/exchangeTableLength", "60vh")
				} else {
					this.getView().getModel("baseModel").setProperty("/exchangeTableLength", "")
				}
			} else {
				if (this.getView().getModel("baseModel").getProperty("/exchangeTabVisiblity") === false) {
					this._getPersonalizationDetails("keyExchange", "Before");
				}
				var d = this.getView().getModel("baseModel");
				this.getView().getModel("baseModel").setProperty("/exchangeTabVisiblity", true);
				d.setProperty("/exSoldTo", d.getProperty("/returnSoldTo"));
				d.setProperty("/exSoldToDesc", d.getProperty("/returnSoldToDesc"));
				d.setProperty("/exShipTo", d.getProperty("/returnShipTo"));
				d.setProperty("/exShipToDesc", d.getProperty("/shipToDesc"));
				d.setProperty("/exBillTo", d.getProperty("/returnBillTo"));
				d.setProperty("/exBillToDesc", d.getProperty("/returnBillToDesc"));
				d.setProperty("/exPayer", d.getProperty("/returnPayer"));
				d.setProperty("/exPayerDesc", d.getProperty("/returnPayerDesc"));
				d.refresh();
				this.getView().byId("ID_TAB_BAR_PROV_APP").setSelectedKey("Exchange");
				this.getView().getModel("baseModel").refresh()
			}
			if (this._oPopover) {
				this._oPopover = undefined
			}
			this._shipToDropdown();

		},
		valueHelpRequestShipTo: function (e) {
			var t = this;
			var r = this.getView().getModel("invoiceSearchModel");
			var o = this.getView().getModel("baseModel");
			t.ShipTO = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.ShipTO", t);
			t.getView().addDependent(t.ShipTO);
			var s = this.getView().getModel("ZDKSH_CC_DAC_SOLDTOPARTY_SRV");
			var i = [];
			var a = new sap.ui.model.Filter({
				filters: [new sap.ui.model.Filter("CustCode", sap.ui.model.FilterOperator.EQ, o.getProperty("/exSoldTo")), new sap.ui.model.Filter(
					"SalesOrg", sap.ui.model.FilterOperator.EQ, r.getProperty("/salesOrgNo")), new sap.ui.model.Filter("DistChnl", sap.ui.model.FilterOperator
					.EQ, r.getProperty("/distChnl")), new sap.ui.model.Filter("Division", sap.ui.model.FilterOperator.EQ, r.getProperty(
					"/Division"))],
				and: true
			});
			i.push(a);
			var n = new sap.m.BusyDialog;
			n.open();
			s.read("/ShipToPartySet", {
				async: false,
				filters: i,
				success: function (e, r) {
					n.close();
					var o = new sap.ui.model.json.JSONModel({
						results: e.results
					});
					t.ShipTO.setModel(o, "shipToModel");
					t.ShipTO.open()
				},
				error: function (e) {
					n.close();
					var r = "";
					if (e.statusCode === 504) {
						r = t.resourceBundle.getText("timeOut");
						t.errorMsg(r)
					} else {
						r = JSON.parse(e.responseText);
						r = r.error.message.value;
						t.errorMsg(r)
					}
				}
			})
		},
		valueHelpRequestBillTo: function (e) {
			var t = this;
			var r = this.getView().getModel("invoiceSearchModel");
			var o = this.getView().getModel("baseModel");
			t.BillTo = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.BillTo", t);
			t.getView().addDependent(t.BillTo);
			var s = this.getView().getModel("ZDKSH_CC_DAC_SOLDTOPARTY_SRV");
			var i = [];
			var a = new sap.ui.model.Filter({
				filters: [new sap.ui.model.Filter("CustCode", sap.ui.model.FilterOperator.EQ, o.getProperty("/exSoldTo")), new sap.ui.model.Filter(
					"SalesOrg", sap.ui.model.FilterOperator.EQ, r.getProperty("/salesOrgNo")), new sap.ui.model.Filter("DistChnl", sap.ui.model.FilterOperator
					.EQ, r.getProperty("/distChnl")), new sap.ui.model.Filter("Division", sap.ui.model.FilterOperator.EQ, r.getProperty(
					"/Division"))],
				and: true
			});
			i.push(a);
			var n = new sap.m.BusyDialog;
			n.open();
			s.read("/BillToPartySet", {
				async: false,
				filters: i,
				success: function (e, r) {
					n.close();
					var o = new sap.ui.model.json.JSONModel({
						results: e.results
					});
					t.BillTo.setModel(o, "billToModel");
					t.BillTo.open()
				},
				error: function (e) {
					n.close();
					var r = "";
					if (e.statusCode === 504) {
						r = t.resourceBundle.getText("timeOut");
						t.errorMsg(r)
					} else {
						r = JSON.parse(e.responseText);
						r = r.error.message.value;
						t.errorMsg(r)
					}
				}
			})
		},
		valueHelpRequestPayer: function (e) {
			var t = this;
			var r = this.getView().getModel("invoiceSearchModel");
			var o = this.getView().getModel("baseModel");
			t.Payer = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.Payer", t);
			t.getView().addDependent(t.Payer);
			var s = this.getView().getModel("ZDKSH_CC_DAC_SOLDTOPARTY_SRV");
			var i = [];
			var a = new sap.ui.model.Filter({
				filters: [new sap.ui.model.Filter("CustCode", sap.ui.model.FilterOperator.EQ, o.getProperty("/exSoldTo")), new sap.ui.model.Filter(
					"SalesOrg", sap.ui.model.FilterOperator.EQ, r.getProperty("/salesOrgNo")), new sap.ui.model.Filter("DistChnl", sap.ui.model.FilterOperator
					.EQ, r.getProperty("/distChnl")), new sap.ui.model.Filter("Division", sap.ui.model.FilterOperator.EQ, r.getProperty(
					"/Division"))],
				and: true
			});
			i.push(a);
			var n = new sap.m.BusyDialog;
			n.open();
			s.read("/PayerSet", {
				async: false,
				filters: i,
				success: function (e, r) {
					n.close();
					var o = new sap.ui.model.json.JSONModel({
						results: e.results
					});
					t.Payer.setModel(o, "payerModel");
					t.Payer.open()
				},
				error: function (e) {
					n.close();
					var r = "";
					if (e.statusCode === 504) {
						r = t.resourceBundle.getText("timeOut");
						t.errorMsg(r)
					} else {
						r = JSON.parse(e.responseText);
						r = r.error.message.value;
						t.errorMsg(r)
					}
				}
			})
		},
		_loadCity: function (e) {
			var t = this;
			var r = this.getView().getModel("invoiceSearchModel");
			var o = this.getView().getModel("ZDKSH_CC_RETURNS_MANAGEMENT_SRV");
			var s = [];
			var invoiceData = this.selectedReturnItems;
			if (invoiceData[0].soldToAddress) {
				var invLanguage = invoiceData[0].soldToAddress.language;
			} else {
				var invLanguage = this.getView().getModel("baseModel").getProperty("/invRetLanguage");
			}
			var language = "";
			if (invLanguage === "TH" || invLanguage === "2") {
				language = "2";
			} else {
				language = "E";
			}
			var i = new sap.ui.model.Filter({
				filters: [new sap.ui.model.Filter("salesOrg", sap.ui.model.FilterOperator.EQ, r.getProperty("/salesOrgNo")),
					new sap.ui.model.Filter("languageKey", sap.ui.model.FilterOperator.EQ, language)
				],
				and: true
			});
			s.push(i);
			var a = new sap.m.BusyDialog;
			a.open();
			o.read("/cityLookupSet", {
				async: false,
				filters: s,
				success: function (e, r) {
					a.close();
					var o = new sap.ui.model.json.JSONModel({
						results: e.results
					});
					t.getView().setModel(o, "cityModel")
				},
				error: function (e) {
					a.close();
					var r = "";
					if (e.statusCode === 504) {
						r = t.resourceBundle.getText("timeOut");
						t.errorMsg(r)
					} else {
						r = JSON.parse(e.responseText);
						r = r.error.message.value;
						t.errorMsg(r)
					}
				}
			})
		},

		onCityChange: function (e) {
			var selectedObject = e.getSource().getSelectedItem().getBindingContext("cityModel").getObject();
			this.getView().getModel("baseModel").setProperty("/invCountry", selectedObject.country);
			this.getView().getModel("baseModel").setProperty("/invLanguage", selectedObject.languageKey);
			this.getView().getModel("baseModel").setProperty("/invRegion", selectedObject.region);
		},

		_shipToDropdown: function (e) {
			var t = this,
				r = this.getView().getModel("baseModel").getData(),
				o = [];
			o.push(new sap.ui.model.Filter("CustCode", sap.ui.model.FilterOperator.EQ, this.getView().getModel("invoiceSearchModel").getData().soldToParty));
			o.push(new sap.ui.model.Filter("Distchl", sap.ui.model.FilterOperator.EQ, t.distrChannelDataAccess));
			o.push(new sap.ui.model.Filter("Division", sap.ui.model.FilterOperator.EQ, t.divisionDataAccess));
			o.push(new sap.ui.model.Filter("SalesOrg", sap.ui.model.FilterOperator.EQ, t.salesOrgDataAccess));
			o.push(new sap.ui.model.Filter("languageID", sap.ui.model.FilterOperator.EQ, this.getView().getModel("baseModel").getProperty(
				"/languageID")));
			var s = this.getView().getModel("ZDKSH_CC_DAC_SOLDTOPARTY_SRV");
			var i = new sap.m.BusyDialog;
			i.open();
			s.read("/ZSoldToPartySH", {
				async: false,
				filters: o,
				success: function (e, r) {
					i.close();
					var o = new sap.ui.model.json.JSONModel({
						results: e.results
					});
					t.getView().setModel(o, "shipToListSet")
				},
				error: function (e) {
					i.close();
					var r = "";
					if (e.statusCode === 504) {
						r = t.resourceBundle.getText("timeOut");
						t.errorMsg(r)
					} else {
						r = JSON.parse(e.responseText);
						r = r.error.message.value;
						t.errorMsg(r)
					}
				}
			})
		},
		onSelectReturnReason: function (e) {
			if (this.getView().getModel("baseModel").getProperty("/selectedROType") === undefined || this.getView().getModel("baseModel").getProperty(
					"/selectedROType") === "") {
				o.show(this.resourceBundle.getText("SelectROTypefirst"));
				this.getView().getModel("baseModel").setProperty("/selectedReturnReason", "")
			} else {
				this.retReasonCode = e.getSource().getSelectedKey();
				this.getView().getModel("baseModel").setProperty("/step1Validation", true);
				this.getView().byId("RotypeSegementedBtnID").setEnabled(false);
				this.getView().getModel("baseModel").setProperty("/enableReturnReason", true);
				this._getReasonOwner();
				var t = this.getView().getModel("invoiceSearchModel");
				var r = this.getView().getModel("baseModel");
				t.setProperty("/salesOrgNo", r.getData().selectedSalesOrg);
				t.setProperty("/salesOrgDesc", r.getData().selectedSalesOrgDesc);
				t.setProperty("/distChnl", r.getData().selectedDistChl);
				t.setProperty("/distChnlDesc", r.getData().selectedDistChlDesc);
				t.setProperty("/soldToParty", r.getData().selectedSoldtoParty);
				t.setProperty("/soldToPartyDesc", r.getData().selectedSoldtoPartyDesc);
				this._wizard.setCurrentStep(this.byId("ID_WIZARD_SEL_CUST"))
			}
		},
		valueHelpRequestSalesOrg: function () {
			var e = this;
			if (e.salesOrgDataAccess === "No Access") {
				o.show(this.resourceBundle.getText("NoDataAccess"))
			} else {
				this.salesOrg.open()
			}
		},
		handleWizardCancel: function () {
			var e = this;
			sap.m.MessageBox.confirm(this.resourceBundle.getText("progress"), {
				onClose: function (r) {
					if (r === t.Action.OK) {
						e._discardChanges();
						e._wizard.discardProgress(e._wizard.getSteps()[0]);
						var o = sap.ui.core.UIComponent.getRouterFor(e);
						o.navTo("DraftRecord")
					}
				}
			})
		},
		_discardChanges: function () {
			var e = this;
			this.discard = true;
			this.selectedRetObjects = [];
			this.returnItems = [];
			this.returnConditions = [];
			this.exchangeItems = [];
			this.exchangeConditions = [];
			this.selectedObjects = [];
			var t = [];
			this.changeSoldToParty = undefined;
			this.getView().byId("RotypeSegementedBtnID").setEnabled(true);
			var r = new sap.ui.model.json.JSONModel;
			this.getView().setModel(r, "exchangeModel");
			var o = new sap.ui.model.json.JSONModel;
			this.getView().setModel(o, "returnModel");
			this.getView().getModel("returnModel").setProperty("/attachmentObject", t);
			var s = new sap.ui.model.json.JSONModel;
			this.getView().setModel(s, "baseModel");
			var s = this.getView().getModel("baseModel");
			var i = new sap.ui.model.json.JSONModel;
			this.getView().setModel(i, "invoiceSearchModel");
			var a = new sap.ui.model.json.JSONModel;
			this.getView().setModel(a, "PersonalizationModel");
			s.setProperty("/enableReturnReason", true);
			this.docVersion = undefined;
			e.docVersion = undefined;
			s.setProperty("/step1Validation", false);
			s.setProperty("/step2Validation", false);
			s.setProperty("/step3Validation", false);
			s.setProperty("/step4Validation", false);
			s.setProperty("/step5Validation", false);
			s.setProperty("/phone", "");
			this.getView().byId("RotypeSegementedBtnID").setSelectedKey("");
			this.getView().byId("RotypeSegementedBtnID").setSelectedButton("None");
			this._wizard = this.byId("ID_WIZARD_RETURN");
			this._oNavContainer = this.byId("ID_RETURN_NAVCON");
			this._oWizardContentPage = this.byId("ID_RETURN_PAGE");
			s.setProperty("/cancelBtnVisiblitys", true);
			s.setProperty("/submitBtnVisiblitys", false);
			this.getView().getModel("baseModel").setProperty("/EXaddressVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/addressFieldEnable", true);
			s.setProperty("/EXOneTimeCustomer", "");
			s.setProperty("/oneTimeCustomer", "");
			s.setProperty("/previewBtnVisiblitys", false);
			s.setProperty("/exchangeBtnVisiblitys", false);
			s.setProperty("/saveAsDraftBtnVisiblitys", true);
			s.setProperty("/addressVisiblity", false);
			s.setProperty("/billingTypeEnable", true);
			s.setProperty("/salesOrgEditable", true);
			s.setProperty("/distChnlEditable", true);
			s.setProperty("/exchangeTabVisiblity", false);
			s.setProperty("/smsInputVisiblity", false);
			s.setProperty("/emailInputVisiblity", false);
			s.setProperty("/commentsLength", 2);
			s.setProperty("/attachmentLength", 0);
			s.setProperty("/referenceNo", "");
			s.setProperty("/reasonOwner", "");
			s.setProperty("/customerPONumber", "");
			s.setProperty("/customerPONumberEx", "");
			s.setProperty("/selectedSalesOrg", "");
			s.setProperty("/selectedSalesOrgDesc", "");
			s.setProperty("/selectedDistChnl", "");
			s.setProperty("/selectedDistChlDesc", "");
			s.setProperty("/selectedSoldtoParty", "");
			s.setProperty("/selectedSoldtoPartyDesc", "");
			s.setProperty("/completedDelivery", false);
			s.setProperty("/selectedReturnReason", "");
			s.setProperty("/phoneNumFlag", false);
			s.setProperty("/emailFlag", false);
			s.setProperty("/phoneNum", "");
			s.setProperty("/userEmailId", "");
			s.setProperty("/retDivEditablity", true);
			s.setProperty("/retSalesOrgEditablity", true);
			s.setProperty("/retDistChnlEditablity", true);
			s.setProperty("/saveAsDraftBtnVisiblitys", false);
			this.getView().getModel("invoiceSearchModel").setProperty("/billingCategory", "C");
			this.getView().getModel("invoiceSearchModel").setProperty("/billingCategoryDesc", "Commercial Invoice");
			this.selectedReturnItems = [];
			e.salesOrgDataAccess = "No Access";
			e.SLOCDataAccess = "No Access";
			e.distrChannelDataAccess = "No Access";
			e.divisionDataAccess = "No Access";
			e.materialGroupDataAccess = "No Access";
			e.materialGroup4DataAccess = "No Access";
			e.plantDataAccess = "No Access";
			if (sap.ui.getCore().getConfiguration().getLanguage() === "en-US") {
				s.setProperty("/language", "TH")
			} else {
				s.setProperty("/language", sap.ui.getCore().getConfiguration().getLanguage())
			}
			s.setProperty("/languageID", "E");
			s.setProperty("/invoiceTableLength", "");
			s.setProperty("/returnTableLength", "");
			s.setProperty("/exchangeTableLength", "");
			s.setProperty("/disableSoldToParty", true);
			this.onResetSoldToParty();
			this.onResetSearchInvoice();
			if (this.getView().getModel("OrderReasonSet")) {
				this.getView().getModel("OrderReasonSet").setData("")
			}
			if (sap.ui.getCore().getModel("draftItemModel")) {
				sap.ui.getCore().setModel("draftItemModel", undefined)
			}
			s.setProperty("/InvCollapseVisiblity", true);
			s.setProperty("/InvOpenVisiblity", false);
			s.setProperty("/InvSearchBar", true);
			s.setProperty("/ExcCollapseVisiblity", true);
			s.setProperty("/ExcOpenVisiblity", false);
			s.setProperty("/ExcSearchBar", true);
			s.setProperty("/PrevCollapseVisiblity", true);
			s.setProperty("/PrevopenVisiblity", false);
			s.setProperty("/PrevSearchBar", true);
			s.setProperty("/RetCollapseVisiblity", true);
			s.setProperty("/RetOpenVisiblity", false);
			s.setProperty("/ReturnSeacrhBar", true)
		},
		valueHelpRequestDistChan: function () {
			var e = this;
			if (e.distrChannelDataAccess === "No Access") {
				o.show(this.resourceBundle.getText("NoDataAccess"))
			} else {
				this.DistChnl.open()
			}
		},
		onSelectSalesOrg: function (e) {
			var t = this.getView().getModel("baseModel");
			t.setProperty("/SalesOrg", e.getSource().getSelectedItem().getText().split(" ")[0]);
			t.setProperty("/selectedSalesOrg", e.getSource().getSelectedItem().getText().split(" ")[0]);
			t.setProperty("/Salesorg", e.getSource().getSelectedItem().getText().split(" ")[0]);
			t.setProperty("/selectedSalesOrgDesc", e.getSource().getSelectedItem().getText().split("(")[1].split(")")[0]);
			t.setProperty("/SalesOrgDesc", e.getSource().getSelectedItem().getText().split("(")[1].split(")")[0]);
			if (t.getData().selectedSoldtoParty !== undefined && t.getData().selectedSoldtoParty !== "") {
				t.setProperty("/step2Validation", true);
				this._wizard.setCurrentStep(this.byId("ID_WIZARD_INV_SRCH"))
			}
			t.refresh()
		},
		onchangeDistChnl: function (e) {
			var t = this.getView().getModel("baseModel");
			t.setProperty("/selectedDistChnl", e.getSource().getSelectedItem().getText().split(" ")[0]);
			t.setProperty("/DistChan", e.getSource().getSelectedItem().getText().split(" ")[0]);
			t.setProperty("/selectedDistChlDesc", e.getSource().getSelectedItem().getText().split("(")[1].split(")")[0]);
			t.refresh()
		},
		onSelectReasonOwner: function (e) {
			var t = this.getView().getModel("baseModel");
			t.setProperty("/reasonOwner", e.getSource().getSelectedItem().getText().split(" ")[0] + " " + e.getSource().getSelectedItem().getText()
				.split(" ")[1]);
			t.refresh()
		},
		onChangeShipTo: function (e) {
			var t = this.getView().getModel("baseModel");
			t.setProperty("/exShipTo", e.getSource().getSelectedItem().getText().split(" ")[0]);
			t.setProperty("/exShipToDesc", e.getSource().getSelectedItem().getText().split("(")[1].split(")")[0])
		},
		onLiveChangeDistChan: function (e) {
			var t = e.getParameters().value;
			var r = new Array;
			var o = new sap.ui.model.Filter([new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter(
				"DistChl", sap.ui.model.FilterOperator.Contains, t)]);
			r.push(o);
			var s = e.getSource().getBinding("items");
			s.filter(r)
		},
		onLiveChangeName4: function (e) {
			var t = e.getParameters().value;
			this.getView().getModel("baseModel").setProperty("/maxLengthName4", 40 - t.length + " Char remainaing");
			this.getView().getModel("baseModel").refresh()
		},
		onLiveChangeStreet2: function (e) {
			var t = e.getParameters().value;
			this.getView().getModel("baseModel").setProperty("/maxLengthAddressStreet2", 40 - t.length + " Char remainaing");
			this.getView().getModel("baseModel").refresh()
		},
		onLiveChangeStreet3: function (e) {
			var t = e.getParameters().value;
			this.getView().getModel("baseModel").setProperty("/maxLengthAddressStreet3", 40 - t.length + " Char remainaing");
			this.getView().getModel("baseModel").refresh()
		},
		onLiveChangeStreet5: function (e) {
			var t = e.getParameters().value;
			this.getView().getModel("baseModel").setProperty("/maxLengthAddressStreet5", 40 - t.length + " Char remainaing");
			this.getView().getModel("baseModel").refresh()
		},
		onLiveChangeDistrict: function (e) {
			var t = e.getParameters().value;
			this.getView().getModel("baseModel").setProperty("/maxLengthDistrict", 40 - t.length + " Char remainaing");
			this.getView().getModel("baseModel").refresh()
		},
		onLiveChangeDifferentCity: function (e) {
			var t = e.getParameters().value;
			this.getView().getModel("baseModel").setProperty("/maxLengthDifferentCity", 40 - t.length + " Char remainaing");
			this.getView().getModel("baseModel").refresh()
		},
		onLiveChangePostalCode: function (e) {
			var t = e.getParameters().value;
			if (t.length > 5) {
				this.getView().getModel("baseModel").setProperty("/postalCode", t.substring(0, 5));
				var a = t.substring(0, 5);
				e.getSource().setValue("");
				e.getSource().setValue(a);
				this.getView().getModel("baseModel").refresh()
			} else {
				this.getView().getModel("baseModel").setProperty("/maxLengthPostalCode", 5 - t.length + " Char remainaing")
			}
			this.getView().getModel("baseModel").refresh()
		},
		onLiveChangeTelephone: function (e) {
			var t = e.getParameters().value;
			this.getView().getModel("baseModel").setProperty("/maxLengthtelephone", 30 - t.length + " Char remainaing");
			this.getView().getModel("baseModel").refresh()
		},
		onLiveChangeMobilePhone: function (e) {
			var t = e.getParameters().value;
			this.getView().getModel("baseModel").setProperty("/maxLengthmobileNumber", 30 - t.length + " Char remainaing");
			this.getView().getModel("baseModel").refresh()
		},
		onLiveChangeTaxID: function (e) {
			var t = e.getParameters().value;
			this.getView().getModel("baseModel").setProperty("/maxLengthtaxId", 13 - t.length + " Char remainaing");
			this.getView().getModel("baseModel").refresh()
		},
		onLiveChangeBCODE: function (e) {
			var t = e.getParameters().value;
			if (t.length > 5) {
				this.getView().getModel("baseModel").setProperty("/bCode", t.substring(0, 5));
				var a = t.substring(0, 5);
				e.getSource().setValue("");
				e.getSource().setValue(a);
				this.getView().getModel("baseModel").refresh();
			} else {
				this.getView().getModel("baseModel").setProperty("/maxLengthbCode", 5 - t.length + " Char remainaing");
			}
			// if (this.getView().getModel("baseModel").getProperty("/bpNummr") === "N" || this.getView().getModel("baseModel").getProperty(
			// 		"/bpNummr") === "H") {
			// 	this.getView().getModel("baseModel").setProperty("/bCode", "00000");
			// 	e.getSource().setValue("00000")
			// }
			this.getView().getModel("baseModel").refresh()
		},
		onLiveChangeBPNUMMR: function (e) {
			var t = e.getParameters().value;
			this.getView().getModel("baseModel").setProperty("/maxLengthbpNummr", 1 - t.length + " Char remainaing");
			var r = this.getView().getModel("baseModel").getProperty("/bpNummr");
			this.getView().getModel("baseModel").refresh();
			// if (t === "N" || t === "H") {
			// 	this.getView().getModel("baseModel").setProperty("/bCode", "00000")
			// } else if (t === "") {
			// 	// this.getView().getModel("baseModel").setProperty("/bCode", "")
			// } 
			if (t !== "" && t !== "N" && t !== "H") {
				this.getView().getModel("baseModel").setProperty("/bpNummr", "");
				e.getSource().setValue("");
				o.show("Invalid Input")
			}
		},
		onSearchSoldToParty: function (e) {
			var r = this,
				s = this.getView().getModel("baseModel").getData(),
				i = [];
			if (r.allAccess === false) {
				o.show(this.resourceBundle.getText("NoDataAccess"));
				return
			}
			if ((s.SoldtoParty === "" || s.SoldtoParty === undefined) && (s.SoldTopartyName === "" || s.SoldTopartyName === undefined) && (s.Division ===
					"" || s.Division === undefined) && (s.SalesOrg === "" || s.SalesOrg === undefined) && (s.DistChan === "" || s.DistChan ===
					undefined)) {
				t.information(this.resourceBundle.getText("Selectatleastoneinputcriteria"));
				return
			}
			if (s.SoldtoParty !== "" && s.SoldtoParty !== undefined) {
				i.push(new sap.ui.model.Filter("CustCode", sap.ui.model.FilterOperator.EQ, s.SoldtoParty))
			}
			if (r.custCodeDataAccess !== "*" && r.custCodeDataAccess !== undefined) {
				i.push(new sap.ui.model.Filter("custNumEx", sap.ui.model.FilterOperator.EQ, r.custCodeDataAccess))
			}
			if (s.DistChan !== "" && s.DistChan !== undefined) {
				i.push(new sap.ui.model.Filter("Distchl", sap.ui.model.FilterOperator.EQ, s.DistChan))
			} else {
				i.push(new sap.ui.model.Filter("Distchl", sap.ui.model.FilterOperator.EQ, r.distrChannelDataAccess))
			}
			if (s.Division !== "" && s.Division !== undefined) {
				i.push(new sap.ui.model.Filter("Division", sap.ui.model.FilterOperator.EQ, s.Division))
			} else {
				i.push(new sap.ui.model.Filter("Division", sap.ui.model.FilterOperator.EQ, r.divisionDataAccess))
			}
			if (s.SalesOrg !== "" && s.SalesOrg !== undefined) {
				i.push(new sap.ui.model.Filter("SalesOrg", sap.ui.model.FilterOperator.EQ, s.SalesOrg))
			} else {
				i.push(new sap.ui.model.Filter("SalesOrg", sap.ui.model.FilterOperator.EQ, r.salesOrgDataAccess))
			}
			if (this.getView().getModel("baseModel").getProperty("/languageID") === "E") {
				if (s.SoldTopartyName !== "" && s.SoldTopartyName !== undefined) {
					i.push(new sap.ui.model.Filter("Name1", sap.ui.model.FilterOperator.EQ, "*" + s.SoldTopartyName.toUpperCase() + "*"))
				}
			} else {
				if (s.SoldTopartyName !== "" && s.SoldTopartyName !== undefined) {
					i.push(new sap.ui.model.Filter("Name2", sap.ui.model.FilterOperator.EQ, "*" + s.SoldTopartyName.toUpperCase() + "*"))
				}
			}
			i.push(new sap.ui.model.Filter("languageID", sap.ui.model.FilterOperator.EQ, this.getView().getModel("baseModel").getProperty(
				"/languageID")));
			var a = this.getView().getModel("ZDKSH_CC_DAC_SOLDTOPARTY_SRV");
			var n = new sap.m.BusyDialog;
			n.open();
			if (this._wizard.getCurrentStep() === "__xmlview1--ID_WIZARD_RTEX" || this._wizard.getCurrentStep() ===
				"__xmlview0--ID_WIZARD_RTEX") {
				var l = "/ZSoldToPartySet"
			} else {
				var l = "/ZSoldToPartySH"
			}
			a.read(l, {
				async: false,
				filters: i,
				success: function (e, t) {
					n.close();
					var o = new sap.ui.model.json.JSONModel({
						results: e.results
					});
					r.SoldtoParty.setModel(o, "SoldToPartyListSet");
					r.SoldtoParty.getModel("SoldToPartyListSet").setProperty("/length", "Sold to (" + e.results.length + ")")
				},
				error: function (e) {
					n.close();
					var t = "";
					if (e.statusCode === 504) {
						t = r.resourceBundle.getText("timeOut");
						r.errorMsg(t)
					} else {
						t = JSON.parse(e.responseText);
						t = t.error.message.value;
						r.errorMsg(t)
					}
				}
			})
		},
		onSortPress: function () {
			if (!this.SortFrag) {
				this.SortFrag = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.sort", this);
				this.getView().addDependent(this.SortFrag)
			}
			this.SortFrag.open()
		},
		handleSortDialogConfirm: function (e) {
			var t = sap.ui.getCore().byId("idSoldtoPartyTable"),
				r = e.getParameters(),
				o = t.getBinding("items"),
				s, i, n = [];
			s = r.sortItem.getKey();
			i = r.sortDescending;
			n.push(new a(s, i));
			o.sort(n)
		},
		onSubmitSoldtoParty: function (e) {
			var r = sap.ui.getCore().byId("idSoldtoPartyTable");
			if (r.getItems().length > 0 && r.getSelectedContextPaths().length > 0) {
				var s = r.getSelectedItem().getBindingContext("SoldToPartyListSet");
				var i = this.getView().getModel("baseModel").getData();
				if (this._wizard.getCurrentStep().includes("ID_WIZARD_RTEX") === true) {
					if (this.getView().getModel("exchangeModel") && this.getView().getModel("exchangeModel").getProperty("/results").length > 0) {
						this.changeSoldToParty = true;
						i.exSoldTo = s.getProperty("CustCode");
						i.exSoldToDesc = s.getProperty("Name1");
						i.exShipTo = s.getProperty("shipToParty");
						i.exShipToDesc = s.getProperty("shipToPartyName");
						i.exPayer = s.getProperty("payer");
						i.exPayerDesc = s.getProperty("payerName");
						i.partnerName = s.getProperty("payerName");
						i.exBillTo = s.getProperty("billToParty");
						i.exBillToDesc = s.getProperty("billToPartyName");
						this.getView().getModel("baseModel").setProperty("/EXOneTimeCustomer", s.getProperty("oneTimeCustomer"));
						this.getView().getModel("baseModel").refresh();
						this.onResetSoldToParty();
						this.SoldtoParty.close();
						this._pricingSimulation(this.getView().getModel("exchangeModel").getProperty("/results"), "Exchange")
					} else {
						o.show("Add items for exchange")
					}
				} else {
					i.selectedSoldtoParty = s.getProperty("CustCode");
					i.selectedSoldtoPartyDesc = s.getProperty("Name1");
					i.selectedDistChnl = s.getProperty("Distchl");
					i.DistChan = s.getProperty("Distchl");
					i.selectedDistChan = s.getProperty("Distchl");
					i.SalesOrg = s.getProperty("SalesOrg");
					i.selectedSalesOrg = s.getProperty("SalesOrg");
					i.selectedDistChlDesc = s.getProperty("DCName");
					i.selectedSalesOrg = s.getProperty("SalesOrg");
					i.selectedSalesOrgDesc = s.getProperty("SOrgName");
					i.Division = s.getProperty("Division");
					i.selectedDivisionDesc = s.getProperty("DName");
					i.shipTo = s.getProperty("shipToParty");
					i.shipToDesc = s.getProperty("shipToPartyName");
					i.exShipTo = s.getProperty("shipToParty");
					i.exShipToDesc = s.getProperty("shipToPartyName");
					i.billTo = s.getProperty("billToParty");
					i.billToDesc = s.getProperty("billToPartyName");
					i.payer = s.getProperty("payer");
					i.payerDesc = s.getProperty("payerName");
					var a = this.getView().getModel("invoiceSearchModel");
					a.setProperty("/salesOrgNo", i.selectedSalesOrg);
					a.setProperty("/salesOrgDesc", i.selectedSalesOrgDesc);
					a.setProperty("/distChnl", i.DistChan);
					a.setProperty("/distChnlDesc", i.selectedDistChlDesc);
					a.setProperty("/soldToParty", i.selectedSoldtoParty);
					a.setProperty("/Division", i.Division);
					a.setProperty("/soldToPartyDesc", i.selectedSoldtoPartyDesc);
					a.setProperty("/shipTo", s.getProperty("shipToParty"));
					a.setProperty("/billTo", s.getProperty("billToParty"));
					a.setProperty("/payer", s.getProperty("payer"));
					this.getView().getModel("baseModel").setProperty("/oneTimeCustomer", s.getProperty("oneTimeCustomer"));
					this.getView().getModel("baseModel").refresh();
					this.onResetSoldToParty();
					this.SoldtoParty.close();
					this.getView().getModel("baseModel").setProperty("/salesOrgEditable", false);
					this.getView().getModel("baseModel").setProperty("/distChnlEditable", false);
					this.getView().getModel("baseModel").setProperty("/step2Validation", true);
					this._wizard.setCurrentStep(this.byId("ID_WIZARD_INV_SRCH"));
					this._getSalesOrgForOrderID()
				}
			} else {
				t.information(this.resourceBundle.getText("Selectatleastoneitem"))
			}
		},
		_getSalesOrgForOrderID: function () {
			var e = this;
			var t = this.getView().getModel("baseModel").getProperty("/selectedSalesOrg");
			if (this.getView().getModel("ZDKSH_CC_DAC_SOLDTOPARTY_SRV")) {
				var r = this.getView().getModel("ZDKSH_CC_DAC_SOLDTOPARTY_SRV");
				var o = [];
				var s = "";
				if (sap.ushell) {
					if (sap.ui.getCore().getConfiguration().getLanguage() === "th") {
						s = "2"
					} else {
						s = "EN"
					}
				} else {
					s = "EN"
				}
				s = s.toUpperCase();
				var i = new sap.ui.model.Filter({
					filters: [new sap.ui.model.Filter("salesOrg", sap.ui.model.FilterOperator.EQ, t)]
				});
				o.push(i);
				var a = new sap.m.BusyDialog;
				a.open();
				r.read("/TransactionNumSet", {
					filters: o,
					async: false,
					success: function (t, r) {
						a.close();
						e.getView().getModel("baseModel").setProperty("/salesOrgForRO", t.results[0].mappingID)
					},
					error: function (t) {
						a.close();
						var r = "";
						if (t.statusCode === 504) {
							r = e.resourceBundle.getText("timeOut");
							e.errorMsg(r)
						} else {
							r = JSON.parse(t.responseText);
							r = r.error.message.value;
							e.errorMsg(r)
						}
					}
				})
			}
		},
		onResetSoldToParty: function () {
			var e = this.getView().getModel("baseModel");
			if (this._wizard.getCurrentStep() === "__xmlview1--ID_WIZARD_RTEX" || this._wizard.getCurrentStep() ===
				"__xmlview0--ID_WIZARD_RTEX") {
				e.setProperty("/SoldtoParty", "");
				e.setProperty("/SoldTopartyName", "")
			} else {
				e.setProperty("/SoldtoParty", "");
				e.setProperty("/SoldTopartyName", "");
				e.setProperty("/Division", "");
				e.setProperty("/DistChan", "");
				e.setProperty("/DivisionDesc", "");
				e.setProperty("/SalesOrgDesc", "");
				e.setProperty("/DistChanDesc", "");
				e.setProperty("/SalesOrg", "")
			}
			if (this.SoldtoParty) {
				if (this.SoldtoParty.getModel("SoldToPartyListSet") !== undefined) {
					this.SoldtoParty.getModel("SoldToPartyListSet").setData("")
				}
			}
			e.refresh()
		},
		onCancelSoldtoParty: function () {
			var e = this.getView().getModel("baseModel");
			e.setProperty("/SoldtoParty", "");
			e.setProperty("/SoldTopartyName", "");
			e.setProperty("/Division", "");
			e.setProperty("/DivisionDesc", "");
			e.setProperty("/SalesOrgDesc", "");
			e.setProperty("/DistChanDesc", "");
			e.setProperty("/DistChan", "");
			e.setProperty("/SalesOrg", "");
			if (this.SoldtoParty.getModel("SoldToPartyListSet") !== undefined) {
				this.SoldtoParty.getModel("SoldToPartyListSet").setData("")
			}
			e.refresh();
			this.SoldtoParty.close()
		},
		onLiveChangeSoldToParty: function (e) {
			var t = e.getParameters().newValue;
			var r = new Array;
			var o = new sap.ui.model.Filter([new sap.ui.model.Filter("CustCode", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter(
					"Name1", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("Distchl", sap.ui.model.FilterOperator.Contains, t),
				new sap.ui.model.Filter("Division", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("SalesOrg", sap.ui.model.FilterOperator
					.Contains, t), new sap.ui.model.Filter("DName", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("DCName", sap
					.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("SOrgName", sap.ui.model.FilterOperator.Contains, t)
			]);
			r.push(o);
			var s = e.getSource().getParent().getParent().getBinding("items");
			s.filter(r)
		},
		onBillDateSelectionFrom: function (e) {
			var n = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "MM-dd-yyyy",
				calendarType: "Gregorian"
			});
			var date = e.getParameters().value.split("-")[0];
			var oDeviceModel = this.getOwnerComponent().getModel("device");
			// [+] Start STRY0012615: Billing Date shown NaN in Invoice Details Search
			if (!date) {
				return;
			}
			// [+] End STRY0012615: Billing Date shown NaN in Invoice Details Search
			var month = e.getParameters().value.split("-")[1];
			var year = e.getParameters().value.split("-")[2];
			var string = year + "-" + month + "-" + date;

			// [+] Start STRY0012615: Billing Date shown NaN in Invoice Details Search
			if (oDeviceModel.getData().system.phone) {
				this.invoiceDetail.getModel("invoiceSearchModel").setProperty("/billingDateFrom", string);
			} else {
				var i = n.format(new Date(string));
				var t = r.dateTimeFormat1(i);
				this.invoiceDetail.getModel("invoiceSearchModel").setProperty("/billingDateFrom", t);
			}
			// [+] End STRY0012615: Billing Date shown NaN in Invoice Details Search
		},
		onBillDateSelectionTo: function (e, dBillDateFrom) {
			if (this.invoiceDetail) {
				var t = this.invoiceDetail.getModel("invoiceSearchModel").getProperty("/billingDateFrom");
				var oIdDatePicker = this.byId("idBillDateTo");
				var oDeviceModel = this.getOwnerComponent().getModel("device");
				if (!t) {
					return
				} else {
					var n = sap.ui.core.format.DateFormat.getDateInstance({
						pattern: "MM-dd-yyyy",
						calendarType: "Gregorian"
					});
					var date = e.getParameters().value.split("-")[0];
					// [+] Start STRY0012615: Billing Date shown NaN in Invoice Details Search
					if (!date) {
						return;
					}
					// [+] End STRY0012615: Billing Date shown NaN in Invoice Details Search
					var month = e.getParameters().value.split("-")[1];
					var year = e.getParameters().value.split("-")[2];
					var string = year + "-" + month + "-" + date;
					// [+] Start STRY0012615: Billing Date shown NaN in Invoice Details Search
					if (Date.parse(t) > Date.parse(string)) {
						oIdDatePicker.setValueState("Error");
						oIdDatePicker.setValueStateText("Bill Doc Date From > Bill Doc Date To")
						return;
					} else {
						oIdDatePicker.setValueState("None");
					}
					// this.invoiceDetail.getModel("invoiceSearchModel").setProperty("/billingDateTo", e.getParameters().value)
					if (oDeviceModel.getData().system.phone) {
						this.invoiceDetail.getModel("invoiceSearchModel").setProperty("/billingDateTo", string);
					} else {
						var i = n.format(new Date(string));
						var o = r.dateTimeFormat1(i);
						this.invoiceDetail.getModel("invoiceSearchModel").setProperty("/billingDateTo", o);
					}
					// [+] End STRY0012615: Billing Date shown NaN in Invoice Details Search
				}
			}
		},
		onConfirmChangeBillingType: function (e) {
			var t = e.getParameters().selectedContexts[0].getObject().domvalueL;
			this.invoiceDetail.getModel("invoiceSearchModel").setProperty("/billingCategory", t);
			this.invoiceDetail.getModel("invoiceSearchModel").setProperty("/billingCategoryDesc", e.getParameters().selectedContexts[0].getObject()
				.ddtext);
			this.invoiceDetail.getModel("invoiceSearchModel").refresh()
		},
		onSearchInvoice: function () {
			var oDeviceModel = this.getOwnerComponent().getModel("device");
			if (this.getView().getModel("returnModel").getData().results && this.getView().getModel("returnModel").getData().results.length >
				0) {
				var e = this.getView().getModel("returnModel").getData().results;
				for (var o = this.selectedReturnItems.length - 1; o >= 0; o--) {
					var s = 0;
					for (var i = e.length - 1; i >= 0; i--) {
						if (this.selectedReturnItems[o].InvoiceNum === e[i].refInvoice && this.selectedReturnItems[o].InvoiceLineItem === e[i].refItemNumber) {
							s++
						} else {}
					}
					if (s === 0) {
						this.selectedReturnItems.splice(o, 1)
					}
				}
			} else {
				this.selectedReturnItems = []
			}
			this.selectedInvoice = [];
			var a = this;
			var n = this.invoiceDetail.getModel("invoiceSearchModel");
			var l = "$filter=";
			var d = this.getView().getModel("ZDKSH_CC_RETURNS_MANAGEMENT_SRV"),
				g = this.invoiceDetail.getModel("invoiceSearchModel").getData(),
				p = [];
			if ((g.invoiceNo === "" || g.invoiceNo === undefined) && (g.materialNo === "" || g.materialNo === undefined) && (g.batchNo === "" ||
					g.batchNo === undefined) && (g.SerialNum === "" || g.SerialNum === undefined)) {
				t.information(this.resourceBundle.getText("Enteratleastoninputcriteria"));
				return
			} else {
				if (g.invoiceNo !== "" && g.invoiceNo !== undefined) {
					if (l.length === 8) {
						l = l + "invoiceNum eq " + "'" + g.invoiceNo + "'"
					} else {
						l = l + " and " + "invoiceNum eq " + "'" + g.invoiceNo + "'"
					}
				}
				if (g.materialNo !== "" && g.materialNo !== undefined) {
					if (l.length === 8) {
						l = l + "materialCode eq " + "'" + g.materialNo + "'"
					} else {
						l = l + " and " + "materialCode eq " + "'" + g.materialNo + "'"
					}
				}
				if (g.batchNo !== "" && g.batchNo !== undefined) {
					if (l.length === 8) {
						l = l + "batchNumber eq " + "'" + g.batchNo + "'"
					} else {
						l = l + " and " + "batchNumber eq " + "'" + g.batchNo + "'"
					}
				}
				if (g.salesOrgNo !== "" && g.salesOrgNo !== undefined) {
					if (l.length === 8) {
						l = l + "salesOrg eq " + "'" + g.salesOrgNo + "'"
					} else {
						l = l + " and " + "salesOrg eq " + "'" + g.salesOrgNo + "'"
					}
				}
				if (g.distChnl !== "" && g.distChnl !== undefined) {
					if (l.length === 8) {
						l = l + "distChannel eq " + "'" + g.distChnl + "'"
					} else {
						l = l + " and " + "distChannel eq " + "'" + g.distChnl + "'"
					}
				}
				if (g.soldToParty !== "" && g.soldToParty !== undefined) {
					if (l.length === 8) {
						l = l + "soldToParty eq " + "'" + g.soldToParty + "'"
					} else {
						l = l + " and " + "soldToParty eq " + "'" + g.soldToParty + "'"
					}
				}
				var c = this.getView().getModel("baseModel").getData();
				if (g.Division !== "" && g.Division !== undefined) {
					if (l.length === 8) {
						l = l + "division eq " + "'" + g.Division + "'"
					} else {
						l = l + " and " + "division eq " + "'" + g.Division + "'"
					}
				}
				// [+] Start STRY0012615: Billing Date shown NaN in Invoice Details Search
				if (g.billingDateFrom) {
					/*					g.billingDateFrom = r.dateTimeFormat(g.billingDateFrom);
										if (l.length === 8) {
											l = l + "billingDateFrom eq datetime" + "'" + g.billingDateFrom + "'"
										} else {
											l = l + " and " + "billingDateFrom eq datetime" + "'" + g.billingDateFrom + "'"
										}
															if (l.length === 8) {
						l = l + "billingDateFrom eq datetime" + "'" + g.billingDateFrom + "'"
					} else {
						l = l + " and " + "billingDateFrom eq datetime" + "'" + g.billingDateFrom + "'"
					}*/
					if (oDeviceModel.getData().system.phone) {
						var dBillFrom = [g.billingDateFrom.split("-")[0], g.billingDateFrom.split("-")[1], g.billingDateFrom.split("-")[2]].join(
							"-");
						dBillFrom = sap.ui.core.format.DateFormat.getDateInstance({
							pattern: "yyyy-MM-ddTHH:mm:ss"
						}).format(new Date(dBillFrom));
					} else {
						dBillFrom = r.dateTimeFormat(g.billingDateFrom);
					}
					// [+] End STRY0012615: Billing Date shown NaN in Invoice Details Search
					if (l.length === 8) {
						l = l + "billingDateFrom eq datetime" + "'" + dBillFrom + "'"
					} else {
						l = l + " and " + "billingDateFrom eq datetime" + "'" + dBillFrom + "'"
					}
				} else {
					if (g.invoiceNo !== "" && g.invoiceNo !== undefined) {
						var u = ""
					} else {
						// [+] Start STRY0012615: Billing Date shown NaN in Invoice Details Search
						/*						var u = r.dateTimeFormat(new Date("2016/01/01"));*/
						// 5 years back up to current date
						var dPrevDate = this.formatter.manipulateDate.call(this, new Date(), 1825, "sub");
						if (oDeviceModel.getData().system.phone) {
							u = sap.ui.core.format.DateFormat.getDateInstance({
								pattern: "yyyy-MM-ddTHH:mm:ss"
							}).format(new Date(dPrevDate));
						} else {
							u = r.dateTimeFormat(dPrevDate)
						};
						// [+] End STRY0012615: Billing Date shown NaN in Invoice Details Search
						if (l.length === 8) {
							l = l + "billingDateFrom eq datetime" + "'" + u + "'"
						} else {
							l = l + " and " + "billingDateFrom eq datetime" + "'" + u + "'"
						}
					}
				}
				// [+] Start STRY0012615: Billing Date shown NaN in Invoice Details Search
				if (g.billingDateTo) {
					/*					g.billingDateTo = r.dateTimeFormat(g.billingDateTo);
										if (l.length === 8) {
											l = l + "billingDateTo eq datetime" + "'" + g.billingDateTo + "'"
										} else {
											l = l + " and " + "billingDateTo eq datetime" + "'" + g.billingDateTo + "'"
										}*/
					if (oDeviceModel.getData().system.phone) {
						var dBillTo = [g.billingDateTo.split("-")[0], g.billingDateTo.split("-")[1], g.billingDateTo.split("-")[2]].join(
							"-");
						dBillTo = sap.ui.core.format.DateFormat.getDateInstance({
							pattern: "yyyy-MM-ddTHH:mm:ss"
						}).format(new Date(dBillTo));
					} else {
						dBillTo = r.dateTimeFormat(g.billingDateTo);
					}
					if (l.length === 8) {
						l = l + "billingDateTo eq datetime" + "'" + dBillTo + "'"
					} else {
						l = l + " and " + "billingDateTo eq datetime" + "'" + dBillTo + "'"
					}
					// [+] End STRY0012615: Billing Date shown NaN in Invoice Details Search
				} else {
					if (g.invoiceNo !== "" && g.invoiceNo !== undefined) {
						var h = ""
					} else {
						// [+] Start STRY0012615: Billing Date shown NaN in Invoice Details Search
						/*						var h = r.dateTimeFormat(new Date("2017/12/31"));*/
						if (oDeviceModel.getData().system.phone) {
							h = sap.ui.core.format.DateFormat.getDateInstance({
								pattern: "yyyy-MM-ddTHH:mm:ss"
							}).format(new Date());
						} else {
							h = r.dateTimeFormat(new Date());
						}
						// [+] End STRY0012615: Billing Date shown NaN in Invoice Details Search
						if (l.length === 8) {
							l = l + "billingDateTo eq datetime" + "'" + h + "'"
						} else {
							l = l + " and " + "billingDateTo eq datetime" + "'" + h + "'"
						}
					}
				}
				if (a.materialGroupDataAccess !== "No Access") {
					if (l.length === 8) {
						l = l + "materialGroup eq " + "'" + a.materialGroupDataAccess + "'"
					} else {
						l = l + " and " + "materialGroup eq " + "'" + a.materialGroupDataAccess + "'"
					}
				}
				if (a.materialGroup4DataAccess !== "" && a.materialGroup4DataAccess !== undefined) {
					if (l.length === 8) {
						l = l + "materialGroup4 eq " + "'" + a.materialGroup4DataAccess + "'"
					} else {
						l = l + " and " + "materialGroup4 eq " + "'" + a.materialGroup4DataAccess + "'"
					}
				}
				if (g.displayBySno !== "" && g.displayBySno !== undefined) {
					if (l.length === 8) {
						l = l + "displayBySno eq " + "'" + g.displayBySno + "'"
					} else {
						l = l + " and " + "displayBySno eq " + "'" + g.displayBySno + "'"
					}
				}
				if (g.SerialNum !== "" && g.SerialNum !== undefined) {
					if (l.length === 8) {
						l = l + "serialNum eq " + "'" + g.SerialNum + "'"
					} else {
						l = l + " and " + "serialNum eq " + "'" + g.SerialNum + "'"
					}
				}
				if (g.billingCategory !== "" && g.billingCategory !== undefined) {
					if (l.length === 8) {
						l = l + "invCategory eq " + "'" + g.billingCategory + "'"
					} else {
						l = l + " and " + "invCategory eq " + "'" + g.billingCategory + "'"
					}
				}
				if (a.materialDataAccess !== "*" && a.materialDataAccess !== undefined) {
					if (l.length === 8) {
						l = l + "materialCodeDac eq " + "'" + a.materialDataAccess + "'"
					} else {
						l = l + " and " + "materialCodeDac eq " + "'" + a.materialDataAccess + "'"
					}
				}
				if (a.custCodeDataAccess !== "*" && a.custCodeDataAccess !== undefined) {
					if (l.length === 8) {
						l = l + "customerCodeDac eq " + "'" + a.custCodeDataAccess + "'"
					} else {
						l = l + " and " + "customerCodeDac eq " + "'" + a.custCodeDataAccess + "'"
					}
				}
				l = l + " and " + "roType eq " + "'" + this.ROtypeCode + "'";
				var m = new sap.m.BusyDialog;
				m.open();
				d.read("/billingDocumentSet", {
					async: false,
					urlParameters: l + "&$expand=billingDocItemSerialNav,billingDocToBusiPartners&$format=json",
					success: function (e, t) {
						m.close();
						a.getView().byId("InvoiceTableId").removeSelections();
						// [+] Start STRY0012615: Billing Date shown NaN in Invoice Details Search
						/*						if ((g.invoiceNo === "" || g.invoiceNo === undefined) && (g.billingDateFrom === "" || g.billingDateFrom === undefined)) {
													g.billingDateTo = "2017-12-31";
													g.billingDateFrom = "2016-01-01"
												}
												if (g.billingDateFrom !== "" && g.billingDateFrom !== undefined) {
													g.billingDateFrom = r.dateTimeFormat1(g.billingDateFrom)
												}
												if (g.billingDateTo !== "" && g.billingDateTo !== undefined) {
													g.billingDateTo = r.dateTimeFormat1(g.billingDateTo)
												}*/
						var oDeviceModel = this.getOwnerComponent().getModel("device");
						if (!g.invoiceNo && !g.billingDateFrom) {
							var dPrevDate = this.formatter.manipulateDate.call(this, new Date(), 1825, "sub");
							if (oDeviceModel.getData().system.phone) {
								g.billingDateFrom = sap.ui.core.format.DateFormat.getDateInstance({
									/*									pattern: "dd-MM-yyyy"*/
									pattern: "yyyy-MM-dd"
								}).format(new Date(dPrevDate));
								g.billingDateTo = sap.ui.core.format.DateFormat.getDateInstance({
									pattern: "yyyy-MM-dd"
								}).format(new Date());
							} else {
								g.billingDateFrom = r.dateTimeFormat1(dPrevDate);
								g.billingDateTo = r.dateTimeFormat1(new Date());
							};
						}
						// [+] End STRY0012615: Billing Date shown NaN in Invoice Details Search
						a.getView().getModel("baseModel").setProperty("/billingTypeEnable", false);
						var o = [];
						for (var s = 0; s < e.results.length; s++) {
							var i = e.results[s].billingDocItemSerialNav.results;
							for (var l = 0; l < i.length; l++) {
								var d = {
									shipToParty: parseInt(e.results[s].billingDocToBusiPartners.results[2].partnerNum).toString(),
									shipToPartyDesc: a.getView().getModel("baseModel").getProperty("/shipToDesc"),
									billingDateFrom: e.results[s].billingDateFrom,
									billingDateTo: e.results[s].billingDateTo,
									billingType: e.results[s].billingType,
									shipToAddress: e.results[s].billingDocToBusiPartners.results[3],
									soldToAddress: e.results[s].billingDocToBusiPartners.results[0],
									payerAddress: e.results[s].billingDocToBusiPartners.results[2],
									billToAdress: e.results[s].billingDocToBusiPartners.results[1],
									Active: i[l].Active,
									AvailRetQtyBaseUn: i[l].AvailRetQtyBaseUn,
									AvailRetQtySalesUn: i[l].AvailRetQtySalesUn,
									BaseUnit: i[l].BaseUnit,
									BatchNumber: i[l].BatchNumber,
									BillingQty: i[l].BillingQty,
									ColorCode: i[l].ColorCode,
									DiscountAmount: i[l].DiscountAmount,
									ExpiryDate: i[l].ExpiryDate,
									InvoiceLineItem: i[l].InvoiceLineItem,
									InvoiceNum: i[l].InvoiceNum,
									ItemUsage: i[l].ItemUsage,
									MaterialCode: i[l].MaterialCode,
									MaterialDesc: i[l].MaterialDesc,
									MaterialGroup: i[l].MaterialGroup,
									MaterialGroup4: i[l].MaterialGroup4,
									NetPrice: i[l].NetPrice,
									SalesUnit: i[l].SalesUnit,
									SerialNum: i[l].SerialNum,
									UnitPrice: i[l].UnitPrice,
									deleted: "false",
									actualRetQty: i[l].AvailRetQtySalesUn,
									actualRetUOM: i[l].SalesUnit,
									editablity: true,
									ListPrice: i[l].ListPrice,
									HigherLvlItem: i[l].HigherLvlItem,
									ItemGroup: i[l].ItemGroup,
									docCurrency: i[l].docCurrency,
									ActiveIndicator: i[l].ActiveIndicator
								};
								o.push(d)
							}
						}
						n.setSizeLimit(o.length);
						n.setProperty("/billingType", e.results[0].billingType);
						n.setProperty("/results", o);
						a.getView().getModel("baseModel").setProperty("/originalInvoiceData", JSON.parse(JSON.stringify(o)));
						if (o.length > 10) {
							a.getView().getModel("baseModel").setProperty("/invoiceTableLength", "60vh")
						} else {
							a.getView().getModel("baseModel").setProperty("/invoiceTableLength", "")
						}
						n.setProperty("/invoiceItemsLength", "Invoice (" + o.length + ")");
						n.refresh();
						a.getView().byId("InvoiceTableId").removeSelections()
					}.bind(this),
					error: function (e) {
						m.close();
						a.getView().byId("InvoiceTableId").removeSelections();
						// [+] Start STRY0012615: Billing Date shown NaN in Invoice Details Search
						/*						if ((g.invoiceNo === "" || g.invoiceNo === undefined) && (g.billingDateFrom === "" || g.billingDateFrom === undefined)) {
													g.billingDateTo = "2017-12-31";
													g.billingDateFrom = "2016-01-01"
												}
												if (g.billingDateFrom !== "" && g.billingDateFrom !== undefined) {
													g.billingDateFrom = r.dateTimeFormat1(g.billingDateFrom)
												}
												if (g.billingDateTo !== "" && g.billingDateTo !== undefined) {
													g.billingDateTo = r.dateTimeFormat1(g.billingDateTo)
												}*/
						var oDeviceModel = this.getOwnerComponent().getModel("device");
						if (!g.invoiceNo && !g.billingDateFrom) {
							var dPrevDate = this.formatter.manipulateDate.call(this, new Date(), 1825, "sub");
							if (oDeviceModel.getData().system.phone) {
								g.billingDateFrom = sap.ui.core.format.DateFormat.getDateInstance({
									pattern: "yyyy-MM-dd"
								}).format(new Date(dPrevDate));
								g.billingDateTo = sap.ui.core.format.DateFormat.getDateInstance({
									pattern: "yyyy-MM-dd"
								}).format(new Date());
							} else {
								g.billingDateFrom = r.dateTimeFormat1(dPrevDate);
								g.billingDateTo = r.dateTimeFormat1(new Date());
							};
						}
						// [+] End STRY0012615: Billing Date shown NaN in Invoice Details Search
						if (n.getProperty("/results")) {
							n.setProperty("/results", "");
							n.setProperty("/invoiceItemsLength", "")
						}
						a.getView().getModel("baseModel").setProperty("/billingTypeEnable", false);
						a.getView().getModel("baseModel").setProperty("/invoiceTableLength", "");
						a.getView().getModel("baseModel").refresh();
						n.refresh();
						var t = "";
						if (e.statusCode === 504) {
							t = a.resourceBundle.getText("timeOut");
							a.errorMsg(t)
						} else {
							t = JSON.parse(e.responseText);
							t = t.error.message.value;
							a.errorMsg(t)
						}
					}.bind(this)
				})
			}
		},
		onResetSearchInvoice: function () {
			var e = this.getView().getModel("invoiceSearchModel");
			e.setProperty("/results", "");
			e.setProperty("/invoiceNo", "");
			e.setProperty("/selectedSerialNum", false);
			e.setProperty("/billingDateFrom", "");
			e.setProperty("/billingDateTo", "");
			e.setProperty("/SerialNum", "");
			if (this.docVersion === "SUCCESS") {
				this.getView().getModel("baseModel").setProperty("/billingTypeEnable", false)
			} else {
				this.getView().getModel("baseModel").setProperty("/billingTypeEnable", true)
			}
			if (this.ROtypeCode === "TI") {
				e.setProperty("/billingCategory", "B");
				e.setProperty("/billingCategoryDesc", "Consignment Fill Up")
			} else {
				e.setProperty("/billingCategory", "C");
				e.setProperty("/billingCategoryDesc", "Commercial Invoice")
			}
			e.setProperty("/batchNo", "");
			e.setProperty("/materialNo", "");
			e.setProperty("/results", "");
			e.setProperty("/invoiceItemsLength", "");
			e.refresh();
			if (this.getView().getModel("returnModel").getData().results && this.getView().getModel("returnModel").getData().results.length >
				0) {
				var t = this.getView().getModel("returnModel").getData().results;
				for (var r = this.selectedReturnItems.length - 1; r >= 0; r--) {
					var o = 0;
					for (var s = t.length - 1; s >= 0; s--) {
						if (this.selectedReturnItems[r].InvoiceNum === t[s].refInvoice && this.selectedReturnItems[r].InvoiceLineItem === t[s].refItemNumber) {
							o++
						} else {}
					}
					if (o === 0) {
						this.selectedReturnItems.splice(r, 1)
					}
				}
			} else {
				this.selectedReturnItems = []
			}
		},
		onPressPreviousRange: function () {
			var e = this.getView().getModel("invoiceSearchModel").getData().billingDateFrom;
			var t = this.getView().getModel("invoiceSearchModel").getData().billingDateTo;
			var r = new Date;
			var o = new Date(e);
			o.setYear(o.getFullYear() - 2);
			var s = new Date(t);
			s.setYear(s.getFullYear() - 2);
			if (o.getFullYear() === s.getFullYear()) {
				s.setYear(o.getFullYear() + 2)
			}
			var i = new Date(o);
			var a = new Date(s);
			var n = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "MM-dd-yyyy",
				calendarType: "Gregorian"
			});
			i = n.format(i);
			a = n.format(a);
			var l = i + " - " + a;
			this.getView().getModel("invoiceSearchModel").setProperty("/billingDateFrom", i);
			this.getView().getModel("invoiceSearchModel").setProperty("/billingDateTo", a)
		},
		onPressNextRange: function () {
			var e = this.getView().getModel("invoiceSearchModel").getData().billingDateFrom;
			var t = this.getView().getModel("invoiceSearchModel").getData().billingDateTo;
			var r = new Date;
			var o = new Date(e);
			o.setYear(o.getFullYear() + 2);
			var s = new Date(t);
			s.setYear(s.getFullYear() + 2);
			if (o.getFullYear() === s.getFullYear()) {
				s.setYear(o.getFullYear() + 2)
			}
			var i = new Date(o);
			var a = new Date(s);
			var n = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "MM-dd-yyyy",
				calendarType: "Gregorian"
			});
			i = n.format(i);
			a = n.format(a);
			var l = i + " - " + a;
			this.getView().getModel("invoiceSearchModel").setProperty("/billingDateFrom", i);
			this.getView().getModel("invoiceSearchModel").setProperty("/billingDateTo", a)
		},
		onCompleteStep3: function () {
			if (this.docVersion === "SUCCESS") {
				this.getView().getModel("baseModel").setProperty("/saveAsDraftBtnVisiblitys", false);
				this.getView().getModel("baseModel").setProperty("/exchangeBtnVisiblitys", false);
				this.getView().getModel("baseModel").setProperty("/submitBtnVisiblitys", false)
			} else {
				this.getView().getModel("baseModel").setProperty("/saveAsDraftBtnVisiblitys", true);
				this.getView().getModel("baseModel").setProperty("/exchangeBtnVisiblitys", true);
				this.getView().getModel("baseModel").refresh();
				this._getPersonalizationDetails("keyReturn", "Before")
			}
		},
		onPressAddress: function (e) {
			var t = e.getSource().getBindingContext("invoiceSearchModel").getObject();
			var r = new sap.ui.model.json.JSONModel({
				shipToAddress: t.shipToAddress,
				soldToAddress: t.soldToAddress,
				payerAddress: t.payerAddress,
				billToAdress: t.billToAdress
			});
			this.getView().setModel(r, "addressModel");
			this.getView().getModel("baseModel").setProperty("/invoiceTableVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/addressVisiblity", true);
			this.getView().getModel("baseModel").refresh()
		},
		onPressNavBackToItems: function () {
			this.getView().getModel("baseModel").setProperty("/invoiceTableVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/addressVisiblity", false);
			this.getView().getModel("baseModel").refresh()
		},
		valueHelpRequestSoldtoParty: function () {
			var e = this.getView().getModel("baseModel");
			if (e.getProperty("/selectedSalesOrg") !== undefined) {
				e.setProperty("/SalesOrg", e.getProperty("/selectedSalesOrg"));
				e.setProperty("/SalesOrgDesc", e.getProperty("/selectedSalesOrgDesc"))
			}
			if (e.getProperty("/selectedDistChnl") !== undefined) {
				e.setProperty("/DistChan", e.getProperty("/selectedDistChnl"));
				e.setProperty("/DistChanDesc", e.getProperty("/selectedDistChlDesc"))
			}
			if (this._wizard.getCurrentStep().includes("ID_WIZARD_RTEX") === true) {
				e.setProperty("/Division", this.getView().getModel("invoiceSearchModel").getProperty("/Division"));
				e.setProperty("/DivisionDesc", e.getProperty("/selectedDivisionDesc"));
				e.setProperty("/retDivEditablity", false);
				e.setProperty("/retSalesOrgEditablity", false);
				e.setProperty("/retDistChnlEditablity", false)
			} else {
				e.setProperty("/Division", "");
				e.setProperty("/DivisionDesc", "");
				e.setProperty("/retDivEditablity", true);
				e.setProperty("/retSalesOrgEditablity", true);
				e.setProperty("/retDistChnlEditablity", true)
			}
			var t = this;
			if (!t.SoldtoParty) {
				t.SoldtoParty = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.SoldtoParty", this);
				t.getView().addDependent(t.SoldtoParty);
				t.SoldtoParty.addStyleClass("sapUiSizeCompact")
			}
			t.SoldtoParty.open()
		},
		onDownloadAttachment: function (e) {
			var t = e.getSource().getSelectedContexts()[0].getObject();
			var r = this;
			if (this.docVersion === "SUCCESS" || this.docVersion === "DRAFT") {
				if (window.location.href.includes("https://flpnwc-xlgtvarz5i.dispatcher.ap1.hana.ondemand.com")) {
					var o =
						"https://flpnwc-xlgtvarz5i.dispatcher.ap1.hana.ondemand.com/sap/fiori/returnprocess/DKSHJavaService/Attachment/downloadFile/" +
						t.docId
				} else {
					var o =
						"https://flpnwc-cdd660bcb.dispatcher.ap1.hana.ondemand.com/sap/fiori/returnprocess/DKSHJavaService/Attachment/downloadFile/" +
						t
						.docId
				}
				window.open(o, "_self")
			} else {}
		},
		onPressAttachment: function (e) {
			this.attachemntMode = "Add";
			if (e.getSource().getTooltip() === "Cannot add Files") {
				this.attachmentName = "Preview"
			} else {
				this.attachmentName = "Return"
			}
			var t = this;
			if (!t.attachment) {
				t.attachment = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.attachment", this);
				t.getView().addDependent(t.attachment);
				t.attachment.addStyleClass("sapUiSizeCompact")
			}
			this.getView().getModel("baseModel").setProperty("/attachmentVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/attachmentDelEnable", true);
			t.attachment.open()
		},
		onViewAttachment: function (e) {
			this.attachemntMode = "View";
			if (e.getSource().getTooltip() === "Cannot add Files") {
				this.attachmentName = "Preview"
			} else {
				this.attachmentName = "Return"
			}
			var t = this;
			if (!t.attachment) {
				t.attachment = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.attachment", this);
				t.getView().addDependent(t.attachment);
				t.attachment.addStyleClass("sapUiSizeCompact")
			}
			this.getView().getModel("baseModel").setProperty("/attachmentVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/attachmentDelEnable", false);
			t.attachment.open()
		},
		okAttachment: function () {
			if (this.docVersion === "SUCCESS") {
				this.attachment.close()
			} else {
				if (this.getView().getModel("returnModel").getData().attachmentObject === undefined || this.getView().getModel("returnModel").getData()
					.attachmentObject.length === 0) {
					t.information(this.resourceBundle.getText("Addatleastonfile"))
				} else {
					this.getView().getModel("baseModel").setProperty("/attachmentValue", "");
					this.attachment.close()
				}
			}
		},
		cancelAttachment: function () {
			if (this.docVersion === "SUCCESS") {
				this.attachment.close();
				return
			} else if (this.docVersion === "DRAFT") {
				if (this.attachemntMode === "View") {
					this.attachment.close()
				} else {
					if (this.getView().getModel("returnModel").getData().attachmentObject.length === 0) {
						this.getView().getModel("returnModel").setProperty("/enableViewAttachment", false)
					}
					this.attachment.close()
				}
			} else {
				if (this.attachemntMode = "View") {
					this.attachment.close()
				} else {
					this.getView().getModel("returnModel").refresh(true);
					this.getView().getModel("baseModel").setProperty("/attachmentValue", "");
					this.attachment.close()
				}
			}
		},
		valueHelpBillingType: function () {
			var e = this;
			if (!e.BillingType) {
				e.BillingType = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.BillingType", e);
				e.getView().addDependent(e.BillingType);
				var t = this.getView().getModel("ZDKSH_CC_RETURNS_MANAGEMENT_SRV");
				var r = new sap.m.BusyDialog;
				r.open();
				t.read("/billingTypeLookUpSet", {
					async: false,
					success: function (t, o) {
						r.close();
						var s = new sap.ui.model.json.JSONModel({
							results: t.results
						});
						if (t.results.length === 1) {}
						e.BillingType.setModel(s, "billingTypeModel");
						e.BillingType.open()
					},
					error: function (t) {
						r.close();
						var o = "";
						if (t.statusCode === 504) {
							o = e.resourceBundle.getText("timeOut");
							e.errorMsg(o)
						} else {
							o = JSON.parse(t.responseText);
							o = o.error.message.value;
							e.errorMsg(o)
						}
					}
				})
			} else {
				e.BillingType.open()
			}
		},
		valueHelpUOM: function (e) {
			if (e.getSource().getBindingContext("exchangeModel") !== undefined) {
				this.UOMIndex = e.getSource().getBindingContext("exchangeModel")
			} else if (e.getSource().getBindingContext("invoiceSearchModel") !== undefined) {
				this.UOMIndex = e.getSource().getBindingContext("invoiceSearchModel")
			} else {
				this.UOMIndex = e.getSource().getBindingContext("returnModel")
			}
			var r = this;
			if (e.getSource().getBindingContext("exchangeModel") !== undefined) {
				var o = e.getSource().getBindingContext("exchangeModel")
			} else if (e.getSource().getBindingContext("invoiceSearchModel") !== undefined) {
				var o = e.getSource().getBindingContext("invoiceSearchModel")
			} else {
				var o = e.getSource().getBindingContext("returnModel")
			}
			var s = parseInt(o.getPath().split("/")[2]);
			this.currentRowObject = o.getObject();
			var i = this.getView().getModel("invoiceSearchModel");
			var a = [];
			if (e.getSource().getBindingContext("invoiceSearchModel") !== undefined) {
				var n = new sap.ui.model.Filter({
					filters: [new sap.ui.model.Filter("materialNum", sap.ui.model.FilterOperator.EQ, this.currentRowObject.MaterialCode), new sap
						.ui
						.model.Filter("salesOrg", sap.ui.model.FilterOperator.EQ, i.getData().salesOrgNo), new sap.ui.model.Filter("distChannel",
							sap
							.ui.model.FilterOperator.EQ, i.getData().distChnl), new sap.ui.model.Filter("division", sap.ui.model.FilterOperator.EQ, i.getData()
							.division), new sap.ui.model.Filter("shipToParty", sap.ui.model.FilterOperator.EQ, i.getData().shipToParty), new sap.ui.model
						.Filter("soldToParty", sap.ui.model.FilterOperator.EQ, i.getData().soldToParty), new sap.ui.model.Filter("orderType", sap.ui
							.model
							.FilterOperator.EQ, this.getView().getModel("baseModel").getData().exchangeOrderType), new sap.ui.model.Filter(
							"materialGroup", sap.ui.model.FilterOperator.EQ, this.currentRowObject.MaterialGroup), new sap.ui.model.Filter(
							"materialGroup4", sap.ui.model.FilterOperator.EQ, this.currentRowObject.MaterialGroup4), new sap.ui.model.Filter(
							"quantity",
							sap.ui.model.FilterOperator.EQ, this.currentRowObject.actualRetQty)
					],
					and: true
				})
			} else {
				if (this.currentRowObject.matNumber === "") {
					t.information(this.resourceBundle.getText("Materialcannotbeempty"));
					return
				} else {
					var n = new sap.ui.model.Filter({
						filters: [new sap.ui.model.Filter("materialNum", sap.ui.model.FilterOperator.EQ, this.currentRowObject.matNumber), new sap.ui
							.model
							.Filter("salesOrg", sap.ui.model.FilterOperator.EQ, i.getData().salesOrgNo), new sap.ui.model.Filter("distChannel", sap.ui
								.model
								.FilterOperator.EQ, i.getData().distChnl), new sap.ui.model.Filter("division", sap.ui.model.FilterOperator.EQ, i.getData()
								.division),
							new sap.ui.model.Filter("shipToParty", sap.ui.model.FilterOperator.EQ, i.getData().shipToParty), new sap.ui.model.Filter(
								"soldToParty", sap.ui.model.FilterOperator.EQ, i.getData().soldToParty), new sap.ui.model.Filter("orderType", sap.ui.model
								.FilterOperator
								.EQ, this.getView().getModel("baseModel").getData().exchangeOrderType), new sap.ui.model.Filter("materialGroup", sap.ui.model
								.FilterOperator.EQ, this.currentRowObject.materialGroup), new sap.ui.model.Filter("materialGroup4", sap.ui.model.FilterOperator
								.EQ, this.currentRowObject.materialGroup4), new sap.ui.model.Filter("quantity", sap.ui.model.FilterOperator.EQ, this.currentRowObject
								.quantity)
						],
						and: true
					})
				}
			}
			a.push(n);
			var l = this.getView().getModel("ZDKSH_CC_RETURNS_MANAGEMENT_SRV");
			r.UOM = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.UOM", r);
			r.getView().addDependent(r.BillingType);
			var l = this.getView().getModel("ZDKSH_CC_RETURNS_MANAGEMENT_SRV");
			var d = new sap.m.BusyDialog;
			d.open();
			l.read("/materialDataSet", {
				async: false,
				filters: a,
				urlParameters: "&$expand=materialDataToMaterialAltUom,materialDataToMatPricingScale,materialDataToMatBonusGoods&$format=json",
				success: function (e, t) {
					d.close();
					var o = new sap.ui.model.json.JSONModel({
						results: e.results[0].materialDataToMaterialAltUom.results
					});
					r.UOM.setModel(o, "UOMModel");
					r.UOM.getModel("UOMModel").refresh();
					r.UOM.open()
				},
				error: function (e) {
					d.close();
					var t = "";
					if (e.statusCode === 504) {
						t = r.resourceBundle.getText("timeOut");
						t = "Request timed-out. Please try again!";
						r.errorMsg(t)
					} else {
						t = JSON.parse(e.responseText);
						t = t.error.message.value;
						r.errorMsg(t)
					}
				}
			})
		},
		_salesOrgList: function (e) {
			var t = this;
			if (this.getView().getModel("ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV")) {
				var r = this.getView().getModel("ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV");
				var o = [];
				var s = "";
				if (sap.ushell) {
					if (sap.ui.getCore().getConfiguration().getLanguage() === "th") {
						s = "2"
					} else {
						s = "EN"
					}
				} else {
					s = "EN"
				}
				s = s.toUpperCase();
				var i = new sap.ui.model.Filter({
					filters: [new sap.ui.model.Filter("Language", sap.ui.model.FilterOperator.EQ, "EN"), new sap.ui.model.Filter("Salesorg", sap.ui
						.model.FilterOperator.EQ, t.salesOrgDataAccess)],
					and: true
				});
				o.push(i);
				var a = new sap.m.BusyDialog;
				a.open();
				r.read("/ZSearchHelp_SalesOrgSet", {
					filters: o,
					async: false,
					success: function (e, r) {
						a.close();
						var o = new sap.ui.model.json.JSONModel({
							results: e.results
						});
						o.setSizeLimit(o.getData().results.length);
						t.getView().setModel(o, "salesOrgModel");
						if (e.results.length === 1) {
							t.getView().getModel("baseModel").setProperty("/selectedSalesOrg", e.results[0].Salesorg);
							t.getView().getModel("baseModel").setProperty("/selectedSalesOrgDesc", e.results[0].SalesorgDesc)
						}
						if (!t.salesOrg) {
							t.salesOrg = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.SalesOrg", t);
							t.getView().addDependent(t.salesOrg);
							var o = new sap.ui.model.json.JSONModel({
								results: e.results
							});
							t.salesOrg.setModel(o, "salesOrgModel")
						}
					},
					error: function (e) {
						a.close();
						var r = "";
						if (e.statusCode === 504) {
							r = t.resourceBundle.getText("timeOut");
							t.errorMsg(r)
						} else {
							r = JSON.parse(e.responseText);
							r = r.error.message.value;
							t.errorMsg(r)
						}
					}
				})
			}
		},
		errorMsg: function (e) {
			sap.m.MessageBox.show(e, {
				styleClass: "sapUiSizeCompact",
				icon: sap.m.MessageBox.Icon.ERROR,
				title: "Error",
				actions: [sap.m.MessageBox.Action.OK],
				onClose: function (e) {}
			})
		},
		_distChannelList: function () {
			var e = this;
			if (e.distrChannelDataAccess === "No Access") {
				o.show(this.resourceBundle.getText("NoDataAccess"))
			} else {
				if (this.getView().getModel("ZDKSH_CC_HDR_LOOKUP_SRV")) {
					var t = this.getView().getModel("ZDKSH_CC_HDR_LOOKUP_SRV");
					var r = [];
					var s = "";
					s = s.toUpperCase();
					var i = new sap.ui.model.Filter({
						filters: [new sap.ui.model.Filter("Language", sap.ui.model.FilterOperator.EQ, "EN"), new sap.ui.model.Filter("DistChl", sap.ui
							.model.FilterOperator.EQ, e.distrChannelDataAccess)],
						and: true
					});
					r.push(i);
					var a = new sap.m.BusyDialog;
					a.open();
					t.read("/ZDISTCHLLOOKUPSet", {
						async: false,
						filters: r,
						success: function (t, r) {
							a.close();
							var o = new sap.ui.model.json.JSONModel({
								results: t.results
							});
							e.getView().setModel(o, "DistChanSet");
							if (t.results.length === 1) {
								e.getView().getModel("baseModel").setProperty("/selectedDistChnl", t.results[0].DistChl);
								e.getView().getModel("baseModel").setProperty("/selectedDistChlDesc", t.results[0].Name)
							}
							if (!e.DistChnl) {
								e.DistChnl = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.DistChnl", e);
								e.getView().addDependent(e.DistChnl);
								var s = new sap.ui.model.json.JSONModel({
									results: t.results
								});
								e.DistChnl.setModel(s, "DistChanSet")
							}
						},
						error: function (t) {
							a.close();
							var r = "";
							if (t.statusCode === 504) {
								r = e.resourceBundle.getText("timeOut");
								e.errorMsg(r)
							} else {
								r = JSON.parse(t.responseText);
								r = r.error.message.value;
								e.errorMsg(r)
							}
						}
					})
				}
			}
		},
		valueHelpRequestDivision: function () {
			var e = this;
			if (e.divisionDataAccess === "No Access") {
				o.show(this.resourceBundle.getText("NoDataAccess"))
			} else {
				if (!e.Division) {
					e.Division = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.Division", e);
					e.getView().addDependent(e.Division);
					var t = this.getView().getModel("ZDKSH_CC_HDR_LOOKUP_SRV");
					var r = [];
					var s = new sap.ui.model.Filter({
						filters: [new sap.ui.model.Filter("Language", sap.ui.model.FilterOperator.EQ, "EN"), new sap.ui.model.Filter("Division", sap
							.ui
							.model.FilterOperator.EQ, e.divisionDataAccess)],
						and: true
					});
					r.push(s);
					var i = new sap.m.BusyDialog;
					i.open();
					t.read("/ZDIVISIONLOOKUPSet", {
						async: false,
						filters: r,
						success: function (t, r) {
							i.close();
							var o = new sap.ui.model.json.JSONModel({
								results: t.results
							});
							e.Division.setModel(o, "DivisionSet");
							e.Division.open()
						},
						error: function (t) {
							i.close();
							var r = "";
							if (t.statusCode === 504) {
								r = e.resourceBundle.getText("timeOut");
								e.errorMsg(r)
							} else {
								r = JSON.parse(t.responseText);
								r = r.error.message.value;
								e.errorMsg(r)
							}
						}
					})
				} else {
					e.Division.open()
				}
			}
		},
		onConfirmChangeSalesOrg: function (e) {
			e.getSource().getBinding("items").filter([]);
			this.getView().getModel("baseModel").setProperty("/salesOrgContainer", "soldToPartyFrag");
			this.getView().getModel("baseModel").setProperty("/SalesOrg", e.getParameters().selectedContexts[0].getObject().Salesorg);
			this.getView().getModel("baseModel").setProperty("/SalesOrgDesc", e.getParameters().selectedContexts[0].getObject().SalesorgDesc);
			this.getView().getModel("baseModel").setProperty("/selectedSalesOrg", e.getParameters().selectedContexts[0].getObject().Salesorg);
			this.getView().getModel("baseModel").refresh()
		},
		onLiveChangeSalesOrg: function (e) {
			var t = e.getParameters().value;
			var r = new Array;
			var o = new sap.ui.model.Filter([new sap.ui.model.Filter("SalesorgDesc", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model
				.Filter("Salesorg", sap.ui.model.FilterOperator.Contains, t)
			]);
			r.push(o);
			var s = e.getSource().getBinding("items");
			s.filter(r)
		},
		onLiveChangeShipTo: function (e) {
			var t = e.getParameters().value;
			var r = new Array;
			var o = new sap.ui.model.Filter([new sap.ui.model.Filter("ShipToPartyCode", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model
				.Filter("ShipToPartyName", sap.ui.model.FilterOperator.Contains, t)
			]);
			r.push(o);
			var s = e.getSource().getBinding("items");
			s.filter(r)
		},
		onLiveChangeBillTo: function (e) {
			var t = e.getParameters().value;
			var r = new Array;
			var o = new sap.ui.model.Filter([new sap.ui.model.Filter("BillToPartyCode", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model
				.Filter("BillToPartyName", sap.ui.model.FilterOperator.Contains, t)
			]);
			r.push(o);
			var s = e.getSource().getBinding("items");
			s.filter(r)
		},
		onLiveChangePayer: function (e) {
			var t = e.getParameters().value;
			var r = new Array;
			var o = new sap.ui.model.Filter([new sap.ui.model.Filter("PayerCode", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter(
				"PayerName", sap.ui.model.FilterOperator.Contains, t)]);
			r.push(o);
			var s = e.getSource().getBinding("items");
			s.filter(r)
		},
		onConfirmChangePayer: function (e) {
			e.getSource().getBinding("items").filter([]);
			if (this.getView().getModel("exchangeModel") && this.getView().getModel("exchangeModel").getProperty("/results").length > 0) {
				this.getView().getModel("baseModel").setProperty("/exPayer", e.getParameters().selectedContexts[0].getObject().PayerCode);
				this.getView().getModel("baseModel").setProperty("/exPayerDesc", e.getParameters().selectedContexts[0].getObject().PayerName);
				this.getView().getModel("baseModel").refresh();
				this._pricingSimulation(this.getView().getModel("exchangeModel").getProperty("/results"), "Exchange")
			} else {
				o.show("Add items for exchange")
			}
		},
		onConfirmChangeBillTo: function (e) {
			e.getSource().getBinding("items").filter([]);
			if (this.getView().getModel("exchangeModel") && this.getView().getModel("exchangeModel").getProperty("/results").length > 0) {
				this.getView().getModel("baseModel").setProperty("/exBillTo", e.getParameters().selectedContexts[0].getObject().BillToPartyCode);
				this.getView().getModel("baseModel").setProperty("/exBillToDesc", e.getParameters().selectedContexts[0].getObject().BillToPartyName);
				this.getView().getModel("baseModel").refresh();
				this._pricingSimulation(this.getView().getModel("exchangeModel").getProperty("/results"), "Exchange")
			} else {
				o.show("Add items for exchange")
			}
		},
		onConfirmChangeShipTo: function (e) {
			e.getSource().getBinding("items").filter([]);
			if (this.getView().getModel("exchangeModel") && this.getView().getModel("exchangeModel").getProperty("/results").length > 0) {
				this.getView().getModel("baseModel").setProperty("/exShipTo", e.getParameters().selectedContexts[0].getObject().ShipToPartyCode);
				this.getView().getModel("baseModel").setProperty("/exShipToDesc", e.getParameters().selectedContexts[0].getObject().ShipToPartyName);
				this.getView().getModel("baseModel").refresh();
				this._pricingSimulation(this.getView().getModel("exchangeModel").getProperty("/results"), "Exchange")
			} else {
				o.show("Add items for exchange")
			}
		},
		handleAddDivision: function (e) {
			e.getSource().getBinding("items").filter([]);
			this.getView().getModel("baseModel").setProperty("/Division", e.getParameters().selectedContexts[0].getObject().Division);
			this.getView().getModel("baseModel").setProperty("/DivisionDesc", e.getParameters().selectedContexts[0].getObject().Name);
			this.getView().getModel("baseModel").refresh()
		},
		onLiveChangeDivision: function (e) {
			var t = e.getParameters().value;
			var r = new Array;
			var o = new sap.ui.model.Filter([new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter(
				"Division", sap.ui.model.FilterOperator.Contains, t)]);
			r.push(o);
			var s = e.getSource().getBinding("items");
			s.filter(r)
		},
		onClickROType: function (e) {
			var t = this;
			var r = this.getView().getModel("baseModel");
			var o = e.getSource().getBindingContext("ROTypeListModel").getObject();
			this.ROtypeCode = o.roType;
			r.setProperty("/selectedROType", o.roTypeDesc);
			r.setProperty("/selectedROTypeCode", this.ROtypeCode);
			if (this.ROtypeCode === "TI") {
				this.getView().getModel("invoiceSearchModel").setProperty("/billingCategory", "B");
				this.getView().getModel("invoiceSearchModel").setProperty("/billingCategoryDesc", "Consignment Fill Up");
				r.setProperty("/visiblityROTypeSel", false);
				r.setProperty("/visiblityROTypeText", true)
			} else {
				this.getView().getModel("invoiceSearchModel").setProperty("/billingCategory", "C");
				this.getView().getModel("invoiceSearchModel").setProperty("/billingCategoryDesc", "Commercial Invoice");
				r.setProperty("/visiblityROTypeSel", true);
				r.setProperty("/visiblityROTypeText", false)
			}
			r.refresh();
			var s = [];
			var i = new sap.ui.model.Filter("roType", sap.ui.model.FilterOperator.EQ, this.ROtypeCode);
			s.push(i);
			var a = t.getView().getModel("ZDKSH_CC_RETURNS_MANAGEMENT_SRV");
			var n = new sap.m.BusyDialog;
			n.open();
			a.read("/roTypeReturnReasonSet", {
				filters: s,
				async: false,
				success: function (e, r) {
					n.close();
					t.reasonModel = new sap.ui.model.json.JSONModel({
						results: e.results
					});
					t.getView().setModel(t.reasonModel, "OrderReasonSet");
					t._getSLoc()
				},
				error: function (e) {
					n.close();
					var r = JSON.parse(e.responseText);
					r = r.error.message.value;
					t.errorMsg(r)
				}
			})
		},
		_getSLoc: function () {
			var e = this;
			var r = [];
			var o = new sap.ui.model.Filter("roType", sap.ui.model.FilterOperator.EQ, this.ROtypeCode);
			r.push(o);
			var s = e.getView().getModel("ZDKSH_CC_RETURNS_MANAGEMENT_SRV");
			var i = new sap.m.BusyDialog;
			i.open();
			s.read("/roTypeSlocSet", {
				filters: r,
				async: false,
				success: function (r, o) {
					i.close();
					if (r.results.length > 0) {
						if (e.selectedReturnItems) {
							for (var s = 0; s < e.selectedReturnItems.length; s++) {
								e.selectedReturnItems[s].storageLocation = r.results[0].Sloc
							}
						}
						e.getView().getModel("baseModel").setProperty("/roTypeSLoc", r.results[0].Sloc)
					} else {
						t.error(e.resourceBundle.getText("NoSLocAvailablefor") + this.ROtypeCode)
					}
					e._getOrderType()
				},
				error: function (t) {
					i.close();
					var r = JSON.parse(t.responseText);
					r = r.error.message.value;
					e.errorMsg(r)
				}
			})
		},
		_getRoTypeList: function () {
			var e = this;
			var t = this.getView().getModel("ZDKSH_CC_RETURNS_MANAGEMENT_SRV");
			var r = new sap.m.BusyDialog;
			r.open();
			t.read("/returnTypeSet", {
				async: true,
				success: function (t) {
					r.close();
					var o = t.results;
					var s = [];
					for (var i = 0; i < o.length; i++) {
						if (o[i].roType === "TG") {
							var a = {
								roType: o[i].roType,
								icon: "sap-icon://inspect"
							};
							s.splice(0, 0, a)
						}
						if (o[i].roType === "TF") {
							var a = {
								roType: o[i].roType,
								icon: "sap-icon://inspect-down"
							};
							s.splice(1, 0, a)
						}
						if (o[i].roType === "TI") {
							var a = {
								roType: o[i].roType,
								icon: "sap-icon://paid-leave"
							};
							s.splice(2, 0, a)
						}
						if (o[i].roType === "TK") {
							var a = {
								roType: o[i].roType,
								icon: "sap-icon://activity-2"
							};
							s.splice(3, 0, a)
						}
					}
					for (var i = 0; i < s.length; i++) {
						for (var n = 0; n < o.length; n++) {
							if (o[n].roType === s[i].roType) {
								s[i].roTypeDesc = o[n].roTypeDesc
							}
						}
					}
					var l = new sap.ui.model.json.JSONModel({
						results: s
					});
					e.getView().setModel(l, "ROTypeListModel")
				},
				error: function (t) {
					r.close();
					var o = JSON.parse(t.responseText);
					o = o.error.message.value;
					e.errorMsg(o)
				}
			})
		},
		_getReasonOwner: function () {
			var e = this;
			var t = [];
			var r = new sap.ui.model.Filter({
				filters: [new sap.ui.model.Filter("roType", sap.ui.model.FilterOperator.EQ, this.ROtypeCode), new sap.ui.model.Filter(
					"returnReasonCode", sap.ui.model.FilterOperator.EQ, this.retReasonCode)],
				and: true
			});
			t.push(r);
			var o = e.getView().getModel("ZDKSH_CC_RETURNS_MANAGEMENT_SRV");
			var s = new sap.m.BusyDialog;
			s.open();
			o.read("/reasonOwnerSet", {
				filters: t,
				async: false,
				success: function (t, r) {
					s.close();
					var o = new sap.ui.model.json.JSONModel({
						results: t.results
					});
					e.getView().setModel(o, "reasonOwnerModel")
				},
				error: function (t) {
					s.close();
					var r = JSON.parse(t.responseText);
					r = r.error.message.value;
					e.errorMsg(r)
				}
			})
		},
		onPressShowAddress: function (e) {
			var t = e.getSource();
			if (!this._oPopover) {
				s.load({
					name: "incture.com.Inventory.Fragments.popoverTable",
					controller: this
				}).then(function (e) {
					this._oPopover = e;
					this.getView().addDependent(this._oPopover);
					this._oPopover.bindElement("");
					if (sap.ui.Device.system.phone === true) {
						this._oPopover.setPlacement("Bottom");
						this._oPopover.openBy(t)
					} else {
						this._oPopover.openBy(t)
					}
				}.bind(this))
			} else {
				if (sap.ui.Device.system.phone === true) {
					this._oPopover.setPlacement("Bottom");
					this._oPopover.openBy(t)
				} else {
					this._oPopover.openBy(t)
				}
			}
		},
		handleAddDistChan: function (e) {
			e.getSource().getBinding("items").filter([]);
			this.getView().getModel("baseModel").setProperty("/DistChan", e.getParameters().selectedContexts[0].getObject().DistChl);
			this.getView().getModel("baseModel").setProperty("/selectedDistChnl", e.getParameters().selectedContexts[0].getObject().DistChl);
			this.getView().getModel("baseModel").setProperty("/DistChanDesc", e.getParameters().selectedContexts[0].getObject().Name);
			this.getView().getModel("baseModel").refresh()
		},
		onEditMaterial: function (e) {
			var t = this;
			var r = this.getView().getModel("invoiceSearchModel");
			var s = this.getView().getModel("baseModel");
			var i = [];
			var a = new sap.ui.model.Filter({
				filters: [new sap.ui.model.Filter("materialNum", sap.ui.model.FilterOperator.EQ, t.getView().getModel("baseModel").getProperty(
						"/newMaterial")), new sap.ui.model.Filter("salesOrg", sap.ui.model.FilterOperator.EQ, r.getData().salesOrgNo), new sap.ui.model
					.Filter("distChannel", sap.ui.model.FilterOperator.EQ, r.getData().distChnl), new sap.ui.model.Filter("division", sap.ui.model
						.FilterOperator.EQ, r.getData().Division), new sap.ui.model.Filter("shipToParty", sap.ui.model.FilterOperator.EQ, r.getData()
						.shipTo), new sap.ui.model.Filter("soldToParty", sap.ui.model.FilterOperator.EQ, r.getData().soldToParty), new sap.ui.model
					.Filter(
						"orderType", sap.ui.model.FilterOperator.EQ, this.getView().getModel("baseModel").getData().exchangeOrderType), new sap.ui.model
					.Filter("materialGroup", sap.ui.model.FilterOperator.EQ, t.materialGroupDataAccess), new sap.ui.model.Filter(
						"materialGroup4",
						sap.ui.model.FilterOperator.EQ, t.materialGroup4DataAccess), new sap.ui.model.Filter("customerCodeDac", sap.ui.model.FilterOperator
						.EQ, t.custCodeDataAccess), new sap.ui.model.Filter("materialCodeDac", sap.ui.model.FilterOperator.EQ, t.materialDataAccess)
				],
				and: true
			});
			i.push(a);
			var n = this.getView().getModel("ZDKSH_cc_returns_management_SRV");
			var l = new sap.m.BusyDialog;
			l.open();
			n.read("/materialDataSet", {
				async: false,
				filters: i,
				urlParameters: "&$expand=materialDataToMaterialAltUom,materialDataToMatPricingScale,materialDataToMatBonusGoods&$format=json",
				success: function (e, r) {
					l.close();
					var e = e.results[0];
					if (e.active === "E") {
						o.show(t.resourceBundle.getText("exchangenotallowed"))
					} else {
						if (t.getView().getModel("exchangeModel").getData().results) {
							var s = t.getView().byId("ExchangeTableId").getModel("exchangeModel").getData().results
						} else {
							var i = new sap.ui.model.json.JSONModel;
							t.getView().setModel(i, "exchangeModel");
							t.getView().getModel("exchangeModel").setProperty("/results", []);
							var s = t.getView().byId("ExchangeTableId").getModel("exchangeModel").getData().results
						}
						var a = {
							Active: "",
							itemNumber: "",
							matNumber: e.materialNum,
							itemShortText: e.materialDesc,
							materialGroup: e.materialGroup,
							materialGroup4: e.materialGroup4,
							avlRetQty: "",
							quantity: e.quantity,
							salesUnit: e.uom,
							unitPrice: e.unitPrice,
							unitPriceInv: "",
							discountAmount: "",
							netAmount: "",
							SLoc: "",
							higherItem: "",
							batchNumber: "",
							expiryDate: "",
							refInvoice: "",
							refItemNumber: "",
							billingDate: "",
							serialNumber: "",
							listPrice: e.listPrice,
							deleted: "false",
							manualFOC: ""
						};
						s.push(a);
						t.getView().getModel("exchangeModel").setProperty("/results", s);
						t.getView().getModel("exchangeModel").refresh();
						t.getView().getModel("baseModel").setProperty("/newMaterial", "");
						t.getView().getModel("baseModel").refresh();
						t.AddMaterial.close()
					}
				},
				error: function (e) {
					l.close();
					var r = JSON.parse(e.responseText);
					r = r.error.message.value;
					t.errorMsg(r);
					t.AddMaterial.close()
				}
			})
		},
		onPressInvoiceDetail: function (e) {
			if (sap.ui.Device.system.phone === true) {
				var t = e.getSource().getBindingContext("invoiceSearchModel").getObject();
				var r = e.getSource();
				if (!this._oPopover) {
					s.load({
						name: "incture.com.ConnectClient_ReturnCreate.Fragments.InvoicePopover",
						controller: this
					}).then(function (e) {
						this._oPopover = e;
						this.getView().addDependent(this._oPopover);
						var o = new sap.ui.model.json.JSONModel({
							results: t
						});
						this._oPopover.setModel(o, "invoiceSearchPopoverModel");
						this._oPopover.getModel("invoiceSearchPopoverModel").refresh();
						this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
						this._oPopover.getModel("PersonalizationModel").refresh();
						if (sap.ui.Device.system.phone === true) {
							this._oPopover.setPlacement("Bottom");
							this._oPopover.openBy(r)
						} else {
							this._oPopover.openBy(r)
						}
					}.bind(this))
				} else {
					var o = new sap.ui.model.json.JSONModel({
						results: t
					});
					this._oPopover.setModel(o, "invoiceSearchPopoverModel");
					this._oPopover.getModel("invoiceSearchPopoverModel").refresh();
					this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
					this._oPopover.getModel("PersonalizationModel").refresh();
					if (sap.ui.Device.system.phone === true) {
						this._oPopover.setPlacement("Bottom");
						this._oPopover.openBy(r)
					} else {
						this._oPopover.openBy(r)
					}
				}
			}
		},
		onPressReturnDetail: function (e) {
			if (sap.ui.Device.system.phone === true) {
				var t = e.getSource().getBindingContext("returnModel").getObject();
				var r = e.getSource();
				if (!this._oPopover) {
					s.load({
						name: "incture.com.ConnectClient_ReturnCreate.Fragments.ReturnPopover",
						controller: this
					}).then(function (e) {
						this._oPopover = e;
						this.getView().addDependent(this._oPopover);
						var o = new sap.ui.model.json.JSONModel({
							results: t
						});
						this._oPopover.setModel(o, "returnPopoverModel");
						this._oPopover.getModel("returnPopoverModel").refresh();
						this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
						this._oPopover.getModel("PersonalizationModel").refresh();
						if (sap.ui.Device.system.phone === true) {
							this._oPopover.setPlacement("Bottom");
							this._oPopover.openBy(r)
						} else {
							this._oPopover.openBy(r)
						}
					}.bind(this))
				} else {
					var o = new sap.ui.model.json.JSONModel({
						results: t
					});
					this._oPopover.setModel(o, "returnPopoverModel");
					this._oPopover.getModel("returnPopoverModel").refresh();
					this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
					this._oPopover.getModel("PersonalizationModel").refresh();
					if (sap.ui.Device.system.phone === true) {
						this._oPopover.setPlacement("Bottom");
						this._oPopover.openBy(r)
					} else {
						this._oPopover.openBy(r)
					}
				}
			}
		},
		onPressReturnDetailPopover: function (e) {
			if (sap.ui.Device.system.phone === true) {
				var t = e.getSource().getBindingContext("returnPreviewModel").getObject();
				var r = e.getSource();
				if (!this._oPopover) {
					s.load({
						name: "incture.com.ConnectClient_ReturnCreate.Fragments.ReturnPreviewPopover",
						controller: this
					}).then(function (e) {
						this._oPopover = e;
						this.getView().addDependent(this._oPopover);
						var o = new sap.ui.model.json.JSONModel({
							results: t
						});
						this._oPopover.setModel(o, "returnPreviewPopoverModel");
						this._oPopover.getModel("returnPreviewPopoverModel").refresh();
						this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
						this._oPopover.getModel("PersonalizationModel").refresh();
						if (sap.ui.Device.system.phone === true) {
							this._oPopover.setPlacement("Bottom");
							this._oPopover.openBy(r)
						} else {
							this._oPopover.openBy(r)
						}
					}.bind(this))
				} else {
					var o = new sap.ui.model.json.JSONModel({
						results: t
					});
					this._oPopover.setModel(o, "returnPreviewPopoverModel");
					this._oPopover.getModel("returnPreviewPopoverModel").refresh();
					this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
					this._oPopover.getModel("PersonalizationModel").refresh();
					if (sap.ui.Device.system.phone === true) {
						this._oPopover.setPlacement("Bottom");
						this._oPopover.openBy(r)
					} else {
						this._oPopover.openBy(r)
					}
				}
			}
		},
		onPressExchangeDetailPopover: function (e) {
			if (sap.ui.Device.system.phone === true) {
				var t = e.getSource().getBindingContext("exchangePreviewModel").getObject();
				var r = e.getSource();
				if (!this._oPopover) {
					s.load({
						name: "incture.com.ConnectClient_ReturnCreate.Fragments.ExchangePreviewPopover",
						controller: this
					}).then(function (e) {
						this._oPopover = e;
						this.getView().addDependent(this._oPopover);
						var o = new sap.ui.model.json.JSONModel({
							results: t
						});
						this._oPopover.setModel(o, "exchangePreviewPopoverModel");
						this._oPopover.getModel("exchangePreviewPopoverModel").refresh();
						this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
						this._oPopover.getModel("PersonalizationModel").refresh();
						if (sap.ui.Device.system.phone === true) {
							this._oPopover.setPlacement("Bottom");
							this._oPopover.openBy(r)
						} else {
							this._oPopover.openBy(r)
						}
					}.bind(this))
				} else {
					var o = new sap.ui.model.json.JSONModel({
						results: t
					});
					this._oPopover.setModel(o, "exchangePreviewPopoverModel");
					this._oPopover.getModel("exchangePreviewPopoverModel").refresh();
					this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
					this._oPopover.getModel("PersonalizationModel").refresh();
					if (sap.ui.Device.system.phone === true) {
						this._oPopover.setPlacement("Bottom");
						this._oPopover.openBy(r)
					} else {
						this._oPopover.openBy(r)
					}
				}
			}
		},
		onPressExchangeDetail: function (e) {
			if (sap.ui.Device.system.phone === true) {
				var t = e.getSource().getBindingContext("exchangeModel").getObject();
				var r = e.getSource();
				if (!this._oPopover) {
					s.load({
						name: "incture.com.ConnectClient_ReturnCreate.Fragments.ExchangePopover",
						controller: this
					}).then(function (e) {
						this._oPopover = e;
						this.getView().addDependent(this._oPopover);
						var o = new sap.ui.model.json.JSONModel({
							results: t
						});
						this._oPopover.setModel(o, "exchangePopoverModel");
						this._oPopover.getModel("exchangePopoverModel").refresh();
						this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
						this._oPopover.getModel("PersonalizationModel").refresh();
						if (sap.ui.Device.system.phone === true) {
							this._oPopover.setPlacement("Bottom");
							this._oPopover.openBy(r)
						} else {
							this._oPopover.openBy(r)
						}
					}.bind(this))
				} else {
					var o = new sap.ui.model.json.JSONModel({
						results: t
					});
					this._oPopover.setModel(o, "exchangePopoverModel");
					this._oPopover.getModel("exchangePopoverModel").refresh();
					this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
					this._oPopover.getModel("PersonalizationModel").refresh();
					if (sap.ui.Device.system.phone === true) {
						this._oPopover.setPlacement("Bottom");
						this._oPopover.openBy(r)
					} else {
						this._oPopover.openBy(r)
					}
				}
			}
		},
		onFileUploadChange: function (e) {
			var t = this;
			var r = e.getSource();
			if (this.docVersion === "SUCCESS" || this.attachmentName === "Preview") {
				o.show(this.resourceBundle.getText("CannotUpload"));
				return
			}
			this.file = e.getParameter("files")[0];
			if (this.file) {
				var s = new FileReader;
				let e = [];
				s.onload = function (t) {
					var r;
					if (!t) {
						r = s.content
					} else {
						r = t.target.result
					}
					if (t.target.readyState == FileReader.DONE) {
						let r = t.target.result,
							o = new Uint8Array(r);
						for (var i of o) {
							e.push(i)
						}
					}
					var a = 0;
					var n = {};
					n["fileName"] = this.file.name;
					n["fileSize"] = this.file.size;
					n["fileType"] = this.file.type;
					n["fileDoc"] = e;
					n["compressedFile"] = n["fileDoc"];
					n["returnReqNum"] = "";
					n["docId"] = "";
					for (var l = 0; l < this.getView().getModel("returnModel").getData().attachmentObject.length; l++) {
						if (this.file.name === this.getView().getModel("returnModel").getData().attachmentObject[l].fileName) {
							o.show(this.resourceBundle.getText("sameFileValidation"));
							return
						}
						a = a + this.getView().getModel("returnModel").getData().attachmentObject[l].fileSize
					}
					if (a + this.file.size > 1048576) {
						o.show(this.resourceBundle.getText("fileSizeValidation"));
						return
					}
					this.getView().getModel("returnModel").getData().attachmentObject.push(n);
					this.getView().getModel("baseModel").setProperty("/attachmentLength", this.getView().getModel("returnModel").getData().attachmentObject
						.length);
					this.getView().getModel("returnModel").refresh();
					this.getView().getModel("baseModel").setProperty("/enableViewAttachment", true);
					this.getView().getModel("baseModel").setProperty("/attachmentTableVisiblity", true);
					this.getView().getModel("baseModel").refresh()
				}.bind(this)
			}
			s.readAsArrayBuffer(this.file);
			r.clear()
		},
		onRemoveAttachmennt: function (e) {
			var t = this;
			var r = e.getSource().getBindingContext("returnModel").getObject().fileName;
			var o = this.getView().getModel("returnModel").getData().attachmentObject;
			for (var s = 0; s < o.length; s++) {
				if (o[s].fileName === r) {
					var i = o[s].docId
				}
			}
			if (i !== "" && i !== undefined) {
				var a = new sap.ui.model.json.JSONModel;
				t.getView().setModel(a, "oModel");
				var n = new sap.m.BusyDialog;
				n.open();
				var l = {
					"Content-Type": "application/json;charset=utf-8"
				};
				a.loadData("/DKSHJavaService/Attachment/deleteAttachment/" + i, null, true, "DELETE", false, false, l);
				a.attachRequestCompleted(function (e) {
					n.close();
					for (var t = 0; t < o.length; t++) {
						if (o[t].fileName === r) {
							returnModel.getData().attachmentObject.splice(t, 1);
							returnModel.refresh()
						}
						if (r === this.file.name) {
							this.getView().getModel("dashBoardModel").getData().attachmentValue = ""
						}
					}
				});
				a.attachRequestFailed(function (e) {
					n.close()
				})
			} else {
				for (var s = 0; s < o.length; s++) {
					if (o[s].fileName === r) {
						this.getView().getModel("returnModel").getData().attachmentObject.splice(s, 1);
						this.getView().getModel("returnModel").refresh()
					}
				}
			}
			if (this.getView().getModel("returnModel").getData().attachmentObject.length === 0) {
				this.getView().getModel("baseModel").setProperty("/enableViewAttachment", false);
				this.getView().getModel("baseModel").setProperty("/attachmentTableVisiblity", false)
			}
		},
		addRow: function (e) {
			if (!this.AddMaterial) {
				this.AddMaterial = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.AddMaterial", this);
				this.getView().addDependent(this.AddMaterial);
				this.AddMaterial.addStyleClass("sapUiSizeCompact")
			}
			this.AddMaterial.open()
		},
		closeAddMaterialFrag: function () {
			this.getView().getModel("baseModel").setProperty("/newMaterial", "");
			this.AddMaterial.close()
		},
		addMaterial: function (e) {
			this.onEditMaterial()
		},
		returnDeleteRow: function (e) {
			var t = 0;
			var r = 0;
			this.selectedRetItemsforDelete = JSON.parse(JSON.stringify(this.getView().byId("ReturnTableId").getSelectedContextPaths()));
			if (this.selectedRetItemsforDelete.length > 0) {
				var s = this.getView().getModel("returnModel").getData().results;
				var i = this.getView().getModel("returnModel").getData().returnConditions;
				this.getView().byId("ReturnTableId").getSelectedItems()[0].getBindingContext("returnModel").getObject();
				for (var a = this.selectedRetItemsforDelete.length - 1; a >= 0; a--) {
					var n = parseInt(this.selectedRetItemsforDelete[a].split("/")[2]);
					s[n].deleted = "true";
					this.getView().byId("ReturnTableId").getItems()[n].setSelected(false);
					o.show(this.resourceBundle.getText("ItemDeleted"));
					for (var l = this.selectedReturnItems.length - 1; l >= 0; l--) {
						if (this.selectedReturnItems[l].InvoiceLineItem === s[n].refItemNumber && this.selectedReturnItems[l].InvoiceNum === s[n].refInvoice) {
							this.selectedReturnItems.splice(l, 1)
						}
						for (var d = 0; d < i.length; d++) {
							if (s[n].refInvoice === i[d].refInvoice && s[n].itemNumber === i[d].itemNumber) {
								i[d].deleted = "true"
							}
						}
					}
					this.getView().getModel("returnModel").setProperty("/returnConditions", i)
				}
				for (var d = 0; d < s.length; d++) {
					if (s[d].deleted === "false") {
						t = t + parseFloat(s[d].netAmount);
						++r
					}
				}
				if (r === 0) {
					if (this.getView().getModel("exchangeModel").getData().results !== undefined && this.getView().getModel("exchangeModel").getData()
						.results.length > 0) {
						this.getView().getModel("exchangeModel").getData().results = "";
						this.getView().getModel("baseModel").setProperty("/exchangeLength", "Exchange " + "(0)");
						this.getView().getModel("baseModel").setProperty("/exchangeAmountTotal", "0.00 (THB)");
						this.getView().getModel("exchangeModel").refresh()
					}
					this.getView().getModel("baseModel").setProperty("/disableSoldToParty", true);
					this.getView().getModel("baseModel").refresh()
				}
				this.getView().getModel("returnModel").setProperty("/results", s);
				var g = new sap.ui.model.Filter("deleted", sap.ui.model.FilterOperator.Contains, "false");
				var p = [];
				p = this.getView().byId("ReturnTableId").getBinding("items");
				p.filter([g]);
				this.getView().getModel("returnModel").setProperty("/returnAmountTotal", t.toFixed(2) + "(THB)");
				this.getView().getModel("returnModel").setProperty("/returnLength", "Return (" + r + ")");
				this.getView().getModel("returnModel").refresh(true)
			} else {
				o.show(this.resourceBundle.getText("selectItemValidation"))
			}
		},
		deleteRow: function (e) {
			var t = 0;
			var r = 0;
			this.deletedItem = [];
			this.selectedItemsforDelete = JSON.parse(JSON.stringify(this.getView().byId("ExchangeTableId").getSelectedContextPaths()));
			if (this.selectedItemsforDelete.length > 0) {
				var s = this.getView().getModel("exchangeModel").getData().results;
				for (var i = 0; i < this.selectedItemsforDelete.length; i++) {
					var a = parseInt(this.selectedItemsforDelete[i].split("/")[2]);
					s[a].deleted = "true";
					this.deletedItem.push(s[a]);
					this.getView().byId("ExchangeTableId").getItems()[a].setSelected(false);
					o.show(this.resourceBundle.getText("ItemDeleted"))
				}
				var n = [];
				for (var l = 0; l < s.length; l++) {
					if (s[l].deleted === "false") {
						t = t + parseFloat(s[l].netAmount);
						++r;
						if (s[l].refInvoice === "" && s[l].higherItem !== "000000" && s[l].higherItem !== "" && s[l].manualFoc !== "X") {} else {
							n.push(s[l])
						}
					} else {
						for (var i = 0; i < s.length; i++) {
							if (s[l].itemNumber === s[i].higherItem) {
								s[i].deleted = "true"
							}
						}
					}
				}
				if (n.length > 0) {
					this._pricingSimulation(n, "ExchangeTab")
				}
				this.getView().getModel("exchangeModel").setProperty("/results", s);
				var d = new sap.ui.model.Filter("deleted", sap.ui.model.FilterOperator.Contains, "false");
				var g = [];
				g = this.getView().byId("ExchangeTableId").getBinding("items");
				g.filter([d]);
				this.getView().getModel("exchangeModel").setProperty("/exchangeAmountTotal", t.toFixed(2) + "(THB)");
				this.getView().getModel("exchangeModel").setProperty("/exchangeLength", "Exchange (" + r + ")");
				this.getView().getModel("exchangeModel").refresh(true);
				if (this.selectedItemsforDelete.length === s.length) {
					this.getView().byId("ID_TAB_BAR_PROV_APP").setSelectedKey("Return")
				}
			} else {
				o.show(this.resourceBundle.getText("selectItemValidation"))
			}
		},
		returnUndoDelete: function (e) {
			var t = 0;
			var r = 0;
			if (this.selectedRetItemsforDelete !== undefined && this.selectedRetItemsforDelete.length > 0) {
				var s = this.getView().getModel("returnModel").getData().results;
				for (var i = 0; i < this.selectedRetItemsforDelete.length; i++) {
					var a = parseInt(this.selectedRetItemsforDelete[i].split("/")[2]);
					s[a].deleted = "false";
					var n = {
						InvoiceLineItem: s[a].refItemNumber,
						InvoiceNum: s[a].refInvoice
					};
					this.selectedReturnItems.push(n);
					var l = this.getView().getModel("returnModel").getProperty("/returnConditions");
					for (var d = 0; d < l.length; d++) {
						if (s[a].refInvoice === l[d].refInvoice && s[a].itemNumber === l[d].itemNumber) {
							l[d].deleted = "false"
						}
					}
					this.getView().getModel("returnModel").setProperty("/returnConditions", l)
				}
				for (var d = 0; d < s.length; d++) {
					if (s[d].deleted === "false") {
						t = t + parseFloat(s[d].netAmount);
						++r
					}
				}
				var g = new sap.ui.model.Filter("deleted", sap.ui.model.FilterOperator.Contains, "false");
				var p = [];
				p = this.getView().byId("ReturnTableId").getBinding("items");
				p.filter([g]);
				this.getView().getModel("returnModel").setProperty("/returnAmountTotal", t.toFixed(2) + "(THB)");
				this.getView().getModel("returnModel").setProperty("/returnLength", "Return (" + r + ")");
				this.getView().getModel("returnModel").refresh(true);
				this.selectedRetItemsforDelete = undefined
			} else {
				o.show(this.resourceBundle.getText("undoValidation"))
			}
		},
		undoDelete: function (e) {
			var t = 0;
			var r = 0;
			if (this.deletedItem !== undefined && this.deletedItem.length > 0) {
				var s = this.getView().getModel("exchangeModel").getData().results;
				for (var i = 0; i < this.selectedItemsforDelete.length; i++) {
					var a = parseInt(this.selectedItemsforDelete[i].split("/")[2]);
					s.splice(a, 0, this.deletedItem[i]);
					s[a].deleted = "false";
					for (var n = 0; n < s.length; n++) {
						if (s[a].itemNumber === s[n].higherItem) {
							s[n].deleted = "false"
						}
					}
				}
				var l = [];
				for (var d = 0; d < s.length; d++) {
					if (s[d].deleted === "false") {
						if (s[d].higherItem !== "000000" && s[d].higherItem !== "" && s[d].manualFoc !== "X") {} else {
							l.push(s[d])
						}
						t = t + parseFloat(s[d].netAmount);
						++r
					}
				}
				var g = new sap.ui.model.Filter("deleted", sap.ui.model.FilterOperator.Contains, "false");
				var p = [];
				p = this.getView().byId("ExchangeTableId").getBinding("items");
				p.filter([g]);
				this.getView().getModel("exchangeModel").setProperty("/exchangeAmountTotal", t.toFixed(2) + "(THB)");
				this.getView().getModel("exchangeModel").setProperty("/exchangeLength", "Exchange (" + r + ")");
				this.getView().getModel("exchangeModel").refresh(true);
				this._pricingSimulation(l, "ExchangeTab");
				this.deletedItem = []
			} else {
				o.show(this.resourceBundle.getText("undoValidation"))
			}
		},
		onpressPreview: function () {
			if (this._oPopover) {
				this._oPopover = undefined
			}
			var e = [];
			var r = [];
			var o = 0;
			var s = 0;
			var i = this.getView().getModel("returnModel").getProperty("/results");
			var a = this.getView().getModel("exchangeModel").getProperty("/results");
			if (a !== undefined && a.length > 0) {
				for (var n = 0; n < a.length; n++) {
					if (a[n].deleted === "false") {
						r.push(JSON.parse(JSON.stringify(a[n])));
						if (a[n].netAmount === "" || a[n].netAmount === undefined) {
							a[n].netAmount = 0
						}
						o = o + parseFloat(a[n].netAmount)
					}
				}
				this.getView().getModel("exchangePreviewModel").setProperty("/exchangeAmount", o + "(THB)");
				this.getView().getModel("exchangePreviewModel").setProperty("/results", r);
				this.getView().getModel("exchangePreviewModel").setProperty("/exchangePreviewLength", "Exchange (" + r.length + ")")
			}
			if (i !== undefined && i.length > 0) {
				this._wizard.setCurrentStep(this.byId("ID_WIZARD_PREVIEW"));
				for (var l = 0; l < i.length; l++) {
					if (i[l].deleted === "false") {
						e.push(JSON.parse(JSON.stringify(i[l])));
						if (i[l].netAmount === "" || i[l].netAmount === undefined) {
							i[l].netAmount = 0
						}
						s = s + parseFloat(i[l].netAmount)
					}
				}
				this.getView().getModel("returnPreviewModel").setProperty("/returnAmount", s + "(THB)");
				this.getView().getModel("returnPreviewModel").setProperty("/results", e);
				this.getView().getModel("returnPreviewModel").setProperty("/returnPreviewLength", "Return (" + e.length + ")")
			} else {
				t.information(this.resourceBundle.getText("Selectatleastoneitem"))
			}
		},
		onPressSave: function (e) {
			var r = this.getView().getModel("baseModel").getData();
			var s = this.getView().getModel("invoiceSearchModel").getData();
			var i = this.getView().getModel("returnModel");
			var a = this.getView().getModel("exchangeModel");
			var r = this.getView().getModel("baseModel");
			r.setProperty("/savePressed", true);
			if (this.RetQtyCount > 0) {
				t.information(this.resourceBundle.getText("EnteredReturnedQtycannotbegreaterthanAvailableReturnQty"));
				return
			}
			if (this.getView().getModel("baseModel").getProperty("/reasonOwner") === "" || this.getView().getModel("baseModel").getProperty(
					"/reasonOwner") === undefined) {
				o.show(this.resourceBundle.getText("ReasonOwnerisMandatory"));
				return
			}
			if (this.getView().getModel("baseModel").getProperty("/referenceNo") === "" || this.getView().getModel("baseModel").getProperty(
					"/referenceNo") === undefined) {
				o.show(this.resourceBundle.getText("referenceNoisMandatory"));
				return
			}
			if (r.getProperty("/oneTimeCustomer") === "X" && r.getProperty("/returnSoldTo") !== r.getProperty("/exSoldTo") && r.getProperty(
					"/EXOneTimeCustomer") === "X") {
				if (!this.address) {
					this.address = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.Address", this);
					this.getView().addDependent(this.address)
				}
				this._loadCity();

				if (this.getView().getModel("editDraftModel")) {
					if (this.changeSoldToParty === true) {
						if (this.selectedReturnItems[0].soldToAddress) {
							if (this.selectedReturnItems[0].soldToAddress.language === "TH" || this.selectedReturnItems[0].soldToAddress.language === "2") {
								this.selectedReturnItems[0].soldToAddress.language = "2"
							} else {
								this.selectedReturnItems[0].soldToAddress.language = "E"
							}
							if (this.selectedReturnItems[0].shipToAddress.language === "TH" || this.selectedReturnItems[0].shipToAddress.language === "2") {
								this.selectedReturnItems[0].shipToAddress.language = "2"
							} else {
								this.selectedReturnItems[0].shipToAddress.language = "E"
							}
							if (this.selectedReturnItems[0].billToAdress.language === "TH" || this.selectedReturnItems[0].billToAdress.language === "2") {
								this.selectedReturnItems[0].billToAdress.language = "2"
							} else {
								this.selectedReturnItems[0].billToAdress.language = "E"
							}
							if (this.selectedReturnItems[0].payerAddress.language === "TH" || this.selectedReturnItems[0].payerAddress.language === "2") {
								this.selectedReturnItems[0].payerAddress.language = "2"
							} else {
								this.selectedReturnItems[0].payerAddress.language = "E"
							}
						}
						r.setProperty("/partnerName", "");
						r.setProperty("/AddressStreet2", "");
						r.setProperty("/AddressStreet3", "");
						r.setProperty("/AddressStreet5", "");
						r.setProperty("/District", "");
						r.setProperty("/DifferentCity", "");
						r.setProperty("/postalCode", "");
						r.setProperty("/city", "");
						r.setProperty("/telephone", "");
						r.setProperty("/mobileNumber", "");
						r.setProperty("/invRetCountry", this.selectedReturnItems[0].soldToAddress.countryCode);
						r.setProperty("/invRetRegion", this.selectedReturnItems[0].soldToAddress.region);
						r.setProperty("/invRetLanguage", this.selectedReturnItems[0].soldToAddress.language);
						r.setProperty("/taxId", "");
						r.setProperty("/bCode", "00000");
						r.setProperty("/bpNummr", "N");
						r.setProperty("/partnerName4", "");
						r.setProperty("/maxLengthName4", "40 char remaining");
						r.setProperty("/maxLengthAddressStreet2", "40 char remaining");
						r.setProperty("/maxLengthAddressStreet3", "40 char remaining");
						r.setProperty("/maxLengthAddressStreet5", "40 char remaining");
						r.setProperty("/maxLengthDistrict", "40 char remaining");
						r.setProperty("/maxLengthDifferentCity", "40 char remaining");
						r.setProperty("/maxLengthPostalCode", "5 char remaining");
						r.setProperty("/maxLengthtelephone", "30 char remaining");
						r.setProperty("/maxLengthmobileNumber", "30 char remaining");
						r.setProperty("/maxLengthtaxId", "13 char remaining");
						r.setProperty("/maxLengthbCode", "0 char remaining");
						r.setProperty("/maxLengthbpNummr", "0 char remaining");
						this.address.open();
						return
					} else {
						// r.setProperty("/invCountry", this.selectedReturnItems[0].soldToAddress.countryCode);
						// r.setProperty("/invRegion", this.selectedReturnItems[0].soldToAddress.region);
						// r.setProperty("/invLanguage", this.selectedReturnItems[0].soldToAddress.language);
						r.setProperty("/maxLengthName4", 40 - r.getProperty("/partnerName4").length + " char remaining");
						r.setProperty("/maxLengthAddressStreet2", 40 - r.getProperty("/AddressStreet2").length + " char remaining");
						r.setProperty("/maxLengthAddressStreet3", 40 - r.getProperty("/AddressStreet3").length + " char remaining");
						r.setProperty("/maxLengthAddressStreet5", 40 - r.getProperty("/AddressStreet5").length + " char remaining");
						r.setProperty("/maxLengthDistrict", 40 - r.getProperty("/District").length + " char remaining");
						r.setProperty("/maxLengthDifferentCity", 40 - r.getProperty("/DifferentCity").length + " char remaining");
						r.setProperty("/maxLengthPostalCode", 5 - r.getProperty("/postalCode").length + " char remaining");
						r.setProperty("/maxLengthtelephone", 30 - r.getProperty("/telephone").length + " char remaining");
						r.setProperty("/maxLengthmobileNumber", 30 - r.getProperty("/mobileNumber").length + " char remaining");
						r.setProperty("/maxLengthtaxId", 13 - r.getProperty("/taxId").length + " char remaining");
						r.setProperty("/maxLengthbCode", 5 - r.getProperty("/bCode").length + " char remaining");
						r.setProperty("/maxLengthbpNummr", 1 - r.getProperty("/bpNummr").length + " char remaining");
						this.address.open();
						return
					}
				} else {
					// r.setProperty("/invRetCountry", this.selectedReturnItems[0].soldToAddress.countryCode);
					// r.setProperty("/invRetRegion", this.selectedReturnItems[0].soldToAddress.region);
					// r.setProperty("/invRetLanguage", this.selectedReturnItems[0].soldToAddress.language);
					r.setProperty("/partnerName", "");
					r.setProperty("/AddressStreet2", "");
					r.setProperty("/AddressStreet3", "");
					r.setProperty("/AddressStreet5", "");
					r.setProperty("/District", "");
					r.setProperty("/DifferentCity", "");
					r.setProperty("/postalCode", "");
					r.setProperty("/city", "");
					r.setProperty("/telephone", "");
					r.setProperty("/mobileNumber", "");
					r.setProperty("/taxId", "");
					r.setProperty("/bCode", "00000");
					r.setProperty("/bpNummr", "N");
					r.setProperty("/partnerName4", "");
					r.setProperty("/maxLengthName4", "40 char remaining");
					r.setProperty("/maxLengthAddressStreet2", "40 char remaining");
					r.setProperty("/maxLengthAddressStreet3", "40 char remaining");
					r.setProperty("/maxLengthAddressStreet5", "40 char remaining");
					r.setProperty("/maxLengthDistrict", "40 char remaining");
					r.setProperty("/maxLengthDifferentCity", "40 char remaining");
					r.setProperty("/maxLengthPostalCode", "5 char remaining");
					r.setProperty("/maxLengthtelephone", "30 char remaining");
					r.setProperty("/maxLengthmobileNumber", "30 char remaining");
					r.setProperty("/maxLengthtaxId", "13 char remaining");
					r.setProperty("/maxLengthbCode", "0 char remaining");
					r.setProperty("/maxLengthbpNummr", "0 char remaining");
					this.address.open();
					return
				}
			} else if (r.getProperty("/oneTimeCustomer") === "X" && a.getData().results !== undefined && a.getData().results.length > 0 && r.getProperty(
					"/returnSoldTo") === r.getProperty("/exSoldTo")) {
				if (!this.address) {
					this.address = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.Address", this);
					this.getView().addDependent(this.address)
				}
				this._loadCity();
				if (this.docVersion === undefined) {
					if (this.selectedReturnItems[0].soldToAddress.language === "TH" || this.selectedReturnItems[0].soldToAddress.language === "2") {
						this.selectedReturnItems[0].soldToAddress.language = "2"
					} else {
						this.selectedReturnItems[0].soldToAddress.language = "E"
					}
					if (this.selectedReturnItems[0].shipToAddress.language === "TH" || this.selectedReturnItems[0].shipToAddress.language === "2") {
						this.selectedReturnItems[0].shipToAddress.language = "2"
					} else {
						this.selectedReturnItems[0].shipToAddress.language = "E"
					}
					if (this.selectedReturnItems[0].billToAdress.language === "TH" || this.selectedReturnItems[0].billToAdress.language === "2") {
						this.selectedReturnItems[0].billToAdress.language = "2"
					} else {
						this.selectedReturnItems[0].billToAdress.language = "E"
					}
					if (this.selectedReturnItems[0].payerAddress.language === "TH" || this.selectedReturnItems[0].payerAddress.language === "2") {
						this.selectedReturnItems[0].payerAddress.language = "2"
					} else {
						this.selectedReturnItems[0].payerAddress.language = "E"
					}
					var n = this.selectedReturnItems[0];
					r.setProperty("/invCountry", this.selectedReturnItems[0].soldToAddress.countryCode);
					r.setProperty("/invRegion", this.selectedReturnItems[0].soldToAddress.region);
					r.setProperty("/invLanguage", this.selectedReturnItems[0].soldToAddress.language);
					r.setProperty("/partnerName", n.soldToAddress.partnerName);
					r.setProperty("/partnerName4", n.soldToAddress.partnerName4);
					r.setProperty("/AddressStreet2", n.soldToAddress.AddressStreet2);
					r.setProperty("/AddressStreet3", n.soldToAddress.AddressStreet3);
					r.setProperty("/AddressStreet5", n.soldToAddress.AddressStreet5);
					r.setProperty("/District", n.soldToAddress.District);
					r.setProperty("/DifferentCity", n.soldToAddress.DifferentCity);
					r.setProperty("/postalCode", n.soldToAddress.postalCode);
					r.setProperty("/city", n.soldToAddress.City);
					r.setProperty("/telephone", n.soldToAddress.telephone);
					r.setProperty("/mobileNumber", n.soldToAddress.mobileNumber);
					r.setProperty("/taxId", n.soldToAddress.taxId);
					r.setProperty("/bCode", n.soldToAddress.bCode);
					if (n.soldToAddress.bpNummr === "N" || n.soldToAddress.bpNummr === "H") {
						r.setProperty("/bCode", "00000")
					}
					r.setProperty("/bpNummr", n.soldToAddress.bpNummr);
					r.setProperty("/maxLengthName4", 40 - n.soldToAddress.partnerName4.length + " char remaining");
					r.setProperty("/maxLengthAddressStreet2", 40 - n.soldToAddress.AddressStreet2.length + " char remaining");
					r.setProperty("/maxLengthAddressStreet3", 40 - n.soldToAddress.AddressStreet3.length + " char remaining");
					r.setProperty("/maxLengthAddressStreet5", 40 - n.soldToAddress.AddressStreet5.length + " char remaining");
					r.setProperty("/maxLengthDistrict", 40 - n.soldToAddress.District.length + " char remaining");
					r.setProperty("/maxLengthDifferentCity", 40 - n.soldToAddress.DifferentCity.length + " char remaining");
					r.setProperty("/maxLengthPostalCode", 5 - n.soldToAddress.postalCode.length + " char remaining");
					r.setProperty("/maxLengthtelephone", 30 - n.soldToAddress.telephone.length + " char remaining");
					r.setProperty("/maxLengthmobileNumber", 30 - n.soldToAddress.mobileNumber.length + " char remaining");
					r.setProperty("/maxLengthtaxId", 13 - n.soldToAddress.taxId.length + " char remaining");
					r.setProperty("/maxLengthbCode", 5 - r.getProperty("/bCode").length + " char remaining");
					r.setProperty("/maxLengthbpNummr", 1 - n.soldToAddress.bpNummr.length + " char remaining");
					this.address.setModel(r, "/baseModel");
					this.address.open()
				} else {
					// r.setProperty("/invCountry", this.selectedReturnItems[0].soldToAddress.countryCode);
					// r.setProperty("/invRegion", this.selectedReturnItems[0].soldToAddress.region);
					// r.setProperty("/invLanguage", this.selectedReturnItems[0].soldToAddress.language);
					r.setProperty("/maxLengthName4", 40 - r.getProperty("/partnerName4").length + " char remaining");
					r.setProperty("/maxLengthAddressStreet2", 40 - r.getProperty("/AddressStreet2").length + " char remaining");
					r.setProperty("/maxLengthAddressStreet3", 40 - r.getProperty("/AddressStreet3").length + " char remaining");
					r.setProperty("/maxLengthAddressStreet5", 40 - r.getProperty("/AddressStreet5").length + " char remaining");
					r.setProperty("/maxLengthDistrict", 40 - r.getProperty("/District").length + " char remaining");
					r.setProperty("/maxLengthDifferentCity", 40 - r.getProperty("/DifferentCity").length + " char remaining");
					r.setProperty("/maxLengthPostalCode", 5 - r.getProperty("/postalCode").length + " char remaining");
					r.setProperty("/maxLengthtelephone", 30 - r.getProperty("/telephone").length + " char remaining");
					r.setProperty("/maxLengthmobileNumber", 30 - r.getProperty("/mobileNumber").length + " char remaining");
					r.setProperty("/maxLengthtaxId", 13 - r.getProperty("/taxId").length + " char remaining");
					r.setProperty("/maxLengthbCode", 5 - r.getProperty("/bCode").length + " char remaining");
					r.setProperty("/maxLengthbpNummr", 1 - r.getProperty("/bpNummr").length + " char remaining");
					this.address.open()
				}
				return
			} else if (r.getProperty("/EXOneTimeCustomer") === "X" && r.getProperty("/oneTimeCustomer") === "") {
				if (!this.address) {
					this.address = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.Address", this);
					this.getView().addDependent(this.address)
				}
				this._loadCity();
				if (this.selectedReturnItems[0].soldToAddress.language === "TH" || this.selectedReturnItems[0].soldToAddress.language === "2") {
					this.selectedReturnItems[0].soldToAddress.language = "2"
				} else {
					this.selectedReturnItems[0].soldToAddress.language = "E"
				}
				r.setProperty("/invCountry", this.selectedReturnItems[0].soldToAddress.countryCode);
				r.setProperty("/invRegion", this.selectedReturnItems[0].soldToAddress.region);
				r.setProperty("/invLanguage", this.selectedReturnItems[0].soldToAddress.language);
				r.setProperty("/partnerName", "");
				r.setProperty("/AddressStreet2", "");
				r.setProperty("/AddressStreet3", "");
				r.setProperty("/AddressStreet5", "");
				r.setProperty("/District", "");
				r.setProperty("/DifferentCity", "");
				r.setProperty("/postalCode", "");
				r.setProperty("/city", "");
				r.setProperty("/telephone", "");
				r.setProperty("/mobileNumber", "");
				r.setProperty("/taxId", "");
				r.setProperty("/bCode", "00000");
				r.setProperty("/bpNummr", "N");
				r.setProperty("/partnerName4", "");
				r.setProperty("/maxLengthName4", "40 char remaining");
				r.setProperty("/maxLengthAddressStreet2", "40 char remaining");
				r.setProperty("/maxLengthAddressStreet3", "40 char remaining");
				r.setProperty("/maxLengthAddressStreet5", "40 char remaining");
				r.setProperty("/maxLengthDistrict", "40 char remaining");
				r.setProperty("/maxLengthDifferentCity", "40 char remaining");
				r.setProperty("/maxLengthPostalCode", "5 char remaining");
				r.setProperty("/maxLengthtelephone", "30 char remaining");
				r.setProperty("/maxLengthmobileNumber", "30 char remaining");
				r.setProperty("/maxLengthtaxId", "13 char remaining");
				r.setProperty("/maxLengthbCode", "5 char remaining");
				r.setProperty("/maxLengthbpNummr", "1 char remaining");
				this.address.open();
				return
			} else if (r.getProperty("/EXOneTimeCustomer") === "" && r.getProperty("/returnSoldTo") !== r.getProperty("/exSoldTo")) {
				this._continueSave();
				return
			}
			this._continueSave()
		},
		onOKAddrerss: function (e) {
			var r = this.getView().getModel("baseModel");
			if (this.docVersion === undefined || this.docVersion === "DRAFT" || this.docVersion === "ERROR") {
				if (r.getProperty("/partnerName4") === undefined || r.getProperty("/partnerName4") === "" || (r.getProperty("/AddressStreet2") ===
						undefined || r.getProperty("/AddressStreet2") === "") || (r.getProperty("/taxId") === undefined || r.getProperty("/taxId") ===
						"") || (r.getProperty("/AddressStreet5") === undefined || r.getProperty("/AddressStreet5") === "") || (r.getProperty(
							"/District") ===
						undefined || r.getProperty("/District") === "") || (r.getProperty("/DifferentCity") === undefined || r.getProperty(
						"/DifferentCity") === "") || (r.getProperty("/postalCode") === undefined || r.getProperty("/postalCode") === "") || (r.getProperty(
						"/city") === undefined || r.getProperty("/city") === "")) {
					t.information("Enter all the mandatory fields");
				} else {
					if ((r.getProperty("/bpNummr") === "" && r.getProperty("/bCode") === "")) {
						t.information("Enter BP Number/ BCode");
						return;
					} else {
						if (r.getProperty("/bpNummr") === "N" || r.getProperty("/bpNummr") === "H") {
							if (r.getProperty("/bCode") !== "00000" && r.getProperty("/bCode") !== "") {
								t.information("Enter valid BCode");
								return;
							}
						} else if (r.getProperty("/bpNummr") === "") {

						} else {
							t.information("Enter valid BP Number");
						}
					}
					if (r.getProperty("/savePressed") === true) {
						this._continueSave()
					} else {
						this._continueSubmit()
					}
				}
			} else {
				this.address.close()
			}
		},
		onCancelAddress: function (e) {
			var t = this.getView().getModel("baseModel");
			if (this.docVersion === undefined) {
				t.setProperty("/partnerNum", "");
				t.setProperty("/partnerName4", "");
				t.setProperty("/AddressStreet2", "");
				t.setProperty("/AddressStreet3", "");
				t.setProperty("/AddressStreet5", "");
				t.setProperty("/District", "");
				t.setProperty("/DifferentCity", "");
				t.setProperty("/postalCode", "");
				t.setProperty("/city", "");
				t.setProperty("/telephone", "");
				t.setProperty("/mobileNumber", "");
				t.setProperty("/taxId", "");
				t.setProperty("/bCode", "00000");
				t.setProperty("/bpNummr", "N");
				t.setProperty("/maxLengthName4", "40 char remaining");
				t.setProperty("/maxLengthAddressStreet2", "40 char remaining");
				t.setProperty("/maxLengthAddressStreet3", "40 char remaining");
				t.setProperty("/maxLengthAddressStreet5", "40 char remaining");
				t.setProperty("/maxLengthDistrict", "40 char remaining");
				t.setProperty("/maxLengthDifferentCity", "40 char remaining");
				t.setProperty("/maxLengthPostalCode", "5 char remaining");
				t.setProperty("/maxLengthtelephone", "30 char remaining");
				t.setProperty("/maxLengthmobileNumber", "30 char remaining");
				t.setProperty("/maxLengthtaxId", "13 char remaining");
				t.setProperty("/maxLengthbCode", "5 char remainiing");
				t.setProperty("/maxLengthbpNummr", "1 char remaining")
			}
			this.address.close()
		},
		_continueSave: function (e) {
			var o = this;
			var s = this.getView().getModel("baseModel").getData();
			var i = this.getView().getModel("invoiceSearchModel").getData();
			var a = this.getView().getModel("returnModel");
			var n = this.getView().getModel("exchangeModel");
			var s = this.getView().getModel("baseModel");
			var l = [];
			var d = [];
			if (s.getData().returnReqNum) {
				var g = s.getData().returnReqNum
			} else {
				var g = ""
			}
			if (s.getData().exchangeReqNum) {
				var p = s.getData().exchangeReqNum
			} else {
				var p = ""
			}
			if (a.getData().results !== undefined || a.getData().results.length > 0) {
				var c = a.getData().results;
				for (var u = 0; u < c.length; u++) {
					if (c[u].deleted === undefined || c[u].deleted === "false") {
						var h = {
							refDocNum: c[u].refInvoice,
							refDocItem: c[u].refItemNumber,
							returnReqItemid: c[u].itemNumber,
							materialGroup: c[u].materialGroup,
							materialGroup4: c[u].materialGroup4,
							material: c[u].matNumber,
							shortText: c[u].itemShortText,
							avlReturnQty: c[u].avlRetQty,
							avlUom: c[u].salesUnit,
							returnQty: c[u].quantity,
							returnUom: c[u].salesUnit,
							unitPriceCc: c[u].unitPrice,
							unitPriceInv: c[u].unitPriceInv,
							invoiceTotalAmount: a.getData().returnAmountTotal.split("(")[0],
							storageLocation: c[u].storageLocation,
							higherLevel: c[u].higherItem,
							batch: c[u].batchNumber,
							referenceInvDate: r.dateTimeFormatPS(c[u].billingDate).split("T")[0],
							expiryDate: r.dateTimeFormatPS(c[u].expiryDate).split("T")[0],
							pricingDate: r.dateTimeFormatPS(c[u].pricingDate),
							serviceRenderedDate: r.dateTimeFormatPS(c[u].serviceRenderedDate),
							serialNum: c[u].serialNumber,
							returnReqNum: g,
							billingType: i.billingType,
							sapReturnOrderNum: "",
							sapReturnOrderItemNum: "",
							overallItemWorkflowStatus: "",
							plant: c[u].plant,
							paymentTerms: c[u].paymentTerms,
							conditionGroup4: c[u].conditionGroup4
						};
						l.push(h)
					}
				}
				if (l.length === 0) {
					t.information(this.resourceBundle.getText("ReturnItemscannotbeempty"));
					return
				}
			}
			if (s.getData().userEmailId) {
				var m = s.getData().userEmailId;
				var y = true
			} else {
				var m = "";
				var y = false
			}
			if (this.docVersion === "DRAFT") {
				var P = "DRAFT"
			} else if (this.docVersion === "ERROR") {
				var P = "ERROR"
			} else {
				var P = "DRAFT"
			}
			if (s.getData().requestor === s.getData().userName + " (" + s.getData().phone + ")") {
				var f = ""
			} else {
				var f = s.getData().requestor
			}
			var v = {
				returns: {
					createdAt: new Date,
					customerPo: s.getData().customerPONumber,
					mappingId: s.getData().salesOrgForRO,
					updatedBy: f,
					requestorName: s.getData().userId + "(" + s.getData().userName + ")",
					requestedBy: s.getData().userId,
					roType: s.getData().selectedROTypeCode,
					roTypeText: s.getData().selectedROType,
					salesOrg: s.getData().selectedSalesOrg,
					salesOrgDesc: i.salesOrgDesc,
					distributionChannel: s.getData().selectedDistChnl,
					distributionChannelDesc: i.distChnlDesc,
					division: i.Division,
					divisionDesc: s.getData().selectedDivisionDesc,
					soldToParty: s.getData().returnSoldTo,
					soldToPartyDesc: s.getData().returnSoldToDesc,
					shipToParty: s.getData().returnShipTo,
					shipToPartyDesc: s.getData().shipToDesc,
					billToParty: s.getData().returnBillTo,
					billToDesc: s.getData().returnBillToDesc,
					payer: s.getData().returnPayer,
					payerDesc: s.getData().returnPayerDesc,
					requestorEmail: s.getData().email,
					contactPerson: s.getData().userEmailId,
					contactDivsion: s.getData().contactDivision,
					contactTelephone: s.getData().phoneNum,
					referenceNum: s.getData().referenceNo,
					requestRemark: s.getData().returnRemark,
					oneTimeCustomer: s.getData().oneTimeCustomer,
					orderReason: s.getData().selectedReturnReason.split(" ")[0],
					orderReasonText: s.getData().selectedReturnReason.split("(")[1].split(")")[0],
					reasonOwner: s.getData().reasonOwner.split(" ")[0],
					reasonOwnerDesc: s.getData().reasonOwner.split(" ")[1].split("(")[1].split(")")[0],
					orderType: s.getData().returnOrderType,
					orderTypeText: s.getData().returnOrderType,
					returnTotalAmt: a.getData().returnAmountTotal.split("(")[0],
					totalRoAmount: this.getView().getModel("returnModel").getData().returnAmountTotal.split("(")[0],
					returnReqNum: g,
					workflowInstance: "",
					overallWorkflowStatus: "",
					processingStatus: "",
					logisticalStatus: "",
					docVersion: P,
					flagRoSo: "R",
					emailTrigger: y,
					exchangeOrderType: s.getData().exchangeOrderType,
					items: l
				}
			};
			if (s.getProperty("/oneTimeCustomer") === "X") {
				if (this.docVersion === undefined) {
					var D = this.selectedReturnItems;
					var M = D[0].soldToAddress;
					var b = D[0].shipToAddress;
					var T = D[0].billToAdress;
					var S = D[0].payerAddress;
					var C = [{
						id: "",
						returnReqNum: "",
						zipCode: M.postalCode,
						refDocNum: D[0].InvoiceNum,
						email: "",
						salesDocument: "",
						partnerRole: "AG",
						name1: M.partnerName,
						name2: "",
						name3: "",
						name4: M.partnerName4,
						street2: M.AddressStreet2,
						street3: M.AddressStreet3,
						street5: M.AddressStreet5,
						district: M.District,
						differentCity: M.DifferentCity,
						postalCode: M.postalCode,
						city: M.City,
						region: M.region,
						country: M.countryCode,
						language: M.language,
						telephone: M.telephone,
						mobilePhone: M.mobileNumber,
						taxId: M.taxId,
						b_Codes: M.bCode,
						bpNummr: M.bpNummr
					}, {
						id: "",
						returnReqNum: "",
						zipCode: b.postalCode,
						refDocNum: D[0].InvoiceNum,
						email: "",
						salesDocument: "",
						partnerRole: "WE",
						name1: b.partnerName,
						name2: "",
						name3: "",
						name4: b.partnerName4,
						street2: b.AddressStreet2,
						street3: b.AddressStreet3,
						street5: b.AddressStreet5,
						district: b.District,
						differentCity: b.DifferentCity,
						postalCode: b.postalCode,
						city: b.City,
						region: b.region,
						country: b.countryCode,
						language: b.language,
						telephone: b.telephone,
						mobilePhone: b.mobileNumber,
						taxId: b.taxId,
						b_Codes: b.bCode,
						bpNummr: b.bpNummr
					}, {
						id: "",
						returnReqNum: "",
						zipCode: T.postalCode,
						refDocNum: D[0].InvoiceNum,
						email: "",
						salesDocument: "",
						partnerRole: "RE",
						name1: T.partnerName,
						name2: "",
						name3: "",
						name4: T.partnerName4,
						street2: T.AddressStreet2,
						street3: T.AddressStreet3,
						street5: T.AddressStreet5,
						district: T.District,
						differentCity: T.DifferentCity,
						postalCode: T.postalCode,
						city: T.City,
						region: T.region,
						country: T.countryCode,
						language: T.language,
						telephone: T.telephone,
						mobilePhone: T.mobileNumber,
						taxId: T.taxId,
						b_Codes: T.bCode,
						bpNummr: T.bpNummr
					}, {
						id: "",
						returnReqNum: "",
						zipCode: S.postalCode,
						refDocNum: D[0].InvoiceNum,
						email: "",
						salesDocument: "",
						partnerRole: "RG",
						name1: S.partnerName,
						name2: "",
						name3: "",
						name4: S.partnerName4,
						street2: S.AddressStreet2,
						street3: S.AddressStreet3,
						street5: S.AddressStreet5,
						district: S.District,
						differentCity: S.DifferentCity,
						postalCode: S.postalCode,
						city: S.City,
						region: S.region,
						country: S.countryCode,
						language: S.language,
						telephone: S.telephone,
						mobilePhone: S.mobileNumber,
						taxId: S.taxId,
						b_Codes: S.bCode,
						bpNummr: S.bpNummr
					}];
					v.returns.address = C
				} else {
					v.returns.address = s.getProperty("/setRetAddress")
				}
			}
			if (n.getData().results !== undefined && n.getData().results.length > 0) {
				var w = n.getData().results;
				if (w !== undefined || w.length === 0) {
					for (var x = 0; x < w.length; x++) {
						if (w[x].deleted === "false") {
							var I = {
								refDocNum: w[x].refInvoice,
								refDocItem: w[x].refItemNumber,
								exchangeReqItemid: w[x].itemNumber,
								materialGroup: w[x].materialGroup,
								materialGroup4: w[x].materialGroup4,
								material: w[x].matNumber,
								sapMaterialNum: w[x].matNumber,
								shortText: w[x].itemShortText,
								avlReturnQty: w[x].quantity,
								avlUom: w[x].salesUnit,
								returnQty: w[x].quantity,
								returnUom: w[x].salesUnit,
								unitPriceCc: w[x].unitPrice,
								unitPriceInv: w[x].unitPriceInv,
								manualFoc: w[x].manualFoc,
								invoiceTotalAmount: n.getData().exchangeAmountTotal.split("(")[0],
								totalNetAmount: this.getView().getModel("exchangeModel").getData().exchangeAmountTotal.split("(")[0],
								storageLocation: w[x].storageLocation,
								sloc: w[x].storageLocation,
								higherLevel: w[x].higherItem,
								batch: w[x].batchNumber,
								referenceInvDate: r.dateTimeFormatPS(w[x].billingDate).split("T")[0],
								expiryDate: r.dateTimeFormatPS(w[x].expiryDate).split("T")[0],
								serialNum: w[x].serialNumber,
								returnReqNum: g,
								exchangeReqNum: p,
								billingType: i.billingType,
								sapReturnOrderNum: "",
								sapReturnOrderItemNum: "",
								overallItemWorkflowStatus: "",
								plant: w[x].plant,
								paymentTerms: w[x].paymentTerms,
								conditionGroup4: w[x].conditionGroup4
							};
							d.push(I)
						}
					}
					if (d.length > 0) {
						var N = {
							customerPo: s.getData().customerPONumberEx,
							roType: s.getData().selectedROTypeCode,
							payer: s.getData().payer,
							referenceNum: s.getData().referenceNo,
							reasonOwner: s.getData().reasonOwner.split(" ")[0],
							requestRemark: s.getData().exchangeRemark,
							billToParty: s.getData().billTo,
							orderCategory: s.getData().exchangeOrderType,
							orderType: s.getData().exchangeOrderType,
							orderTypeText: s.getData().exchangeOrderType,
							salesOrg: s.getData().selectedSalesOrg,
							distributionChannel: s.getData().selectedDistChnl,
							division: i.Division,
							soldToParty: s.getData().exSoldTo,
							soldToPartyDesc: s.getData().exSoldToDesc,
							shipToParty: s.getData().exShipTo,
							shipToPartyDesc: s.getData().exShipToDesc,
							billToParty: s.getData().exBillTo,
							billToDesc: s.getData().exBillToDesc,
							billToPartyDesc: s.getData().exBillToDesc,
							payer: s.getData().exPayer,
							payerDesc: s.getData().exPayerDesc,
							payerDescription: s.getData().exPayerDesc,
							remarks: s.getData().exchangeRemark,
							totalNetAmount: n.getData().exchangeAmountTotal.split("(")[0],
							delComplete: s.getData().completedDeliveryFLAG,
							docCurrency: "",
							exoneTimeCustomer: s.getData().EXOneTimeCustomer,
							deliveryBlock: "",
							billingBlock: "",
							overallStatus: "",
							rejectionStatus: "",
							deliveryStatus: "",
							creditStatus: "",
							overallWorkflowStatus: "",
							flagRoSo: "E",
							items: d,
							returnReqNum: g,
							exchangeReqNum: p
						};
						v.exchange = N
						if (s.getProperty("/EXOneTimeCustomer") === "X" || s.getProperty("/oneTimeCustomer") === "X") {
							if (this.docVersion === undefined) {
								var D = this.selectedReturnItems;
								var C = [{
									id: "",
									returnReqNum: "",
									zipCode: "",
									refInvoiceNum: D[0].InvoiceNum,
									email: "",
									salesDocument: "",
									partnerRole: "AG",
									name1: s.getProperty("/partnerName"),
									name2: "",
									name3: "",
									name4: s.getProperty("/partnerName4"),
									street2: s.getProperty("/AddressStreet2"),
									street3: s.getProperty("/AddressStreet3"),
									street5: s.getProperty("/AddressStreet5"),
									district: s.getProperty("/District"),
									differentCity: s.getProperty("/DifferentCity"),
									postalCode: s.getProperty("/postalCode"),
									city: s.getProperty("/city"),
									region: s.getProperty("/invRegion"),
									country: s.getProperty("/invCountry"),
									language: s.getProperty("/invLanguage"),
									telephone: s.getProperty("/telephone"),
									mobilePhone: s.getProperty("/mobileNumber"),
									taxId: s.getProperty("/taxId"),
									b_Codes: s.getProperty("/bCode"),
									bpNummr: s.getProperty("/bpNummr")
								}, {
									id: "",
									returnReqNum: "",
									zipCode: "",
									refInvoiceNum: D[0].InvoiceNum,
									email: "",
									salesDocument: "",
									partnerRole: "WE",
									name1: s.getProperty("/partnerName"),
									name2: "",
									name3: "",
									name4: s.getProperty("/partnerName4"),
									street2: s.getProperty("/AddressStreet2"),
									street3: s.getProperty("/AddressStreet3"),
									street5: s.getProperty("/AddressStreet5"),
									district: s.getProperty("/District"),
									differentCity: s.getProperty("/DifferentCity"),
									postalCode: s.getProperty("/postalCode"),
									city: s.getProperty("/city"),
									region: s.getProperty("/invRegion"),
									country: s.getProperty("/invCountry"),
									language: s.getProperty("/invLanguage"),
									telephone: s.getProperty("/telephone"),
									mobilePhone: s.getProperty("/mobileNumber"),
									taxId: s.getProperty("/taxId"),
									b_Codes: s.getProperty("/bCode"),
									bpNummr: s.getProperty("/bpNummr")
								}, {
									id: "",
									returnReqNum: "",
									zipCode: "",
									refInvoiceNum: D[0].InvoiceNum,
									email: "",
									salesDocument: "",
									partnerRole: "RE",
									name1: s.getProperty("/partnerName"),
									name2: "",
									name3: "",
									name4: s.getProperty("/partnerName4"),
									street2: s.getProperty("/AddressStreet2"),
									street3: s.getProperty("/AddressStreet3"),
									street5: s.getProperty("/AddressStreet5"),
									district: s.getProperty("/District"),
									differentCity: s.getProperty("/DifferentCity"),
									postalCode: s.getProperty("/postalCode"),
									city: s.getProperty("/city"),
									region: s.getProperty("/invRegion"),
									country: s.getProperty("/invCountry"),
									language: s.getProperty("/invLanguage"),
									telephone: s.getProperty("/telephone"),
									mobilePhone: s.getProperty("/mobileNumber"),
									taxId: s.getProperty("/taxId"),
									b_Codes: s.getProperty("/bCode"),
									bpNummr: s.getProperty("/bpNummr")
								}, {
									id: "",
									returnReqNum: "",
									zipCode: "",
									refInvoiceNum: D[0].InvoiceNum,
									email: "",
									salesDocument: "",
									partnerRole: "RG",
									name1: s.getProperty("/partnerName"),
									name2: "",
									name3: "",
									name4: s.getProperty("/partnerName4"),
									street2: s.getProperty("/AddressStreet2"),
									street3: s.getProperty("/AddressStreet3"),
									street5: s.getProperty("/AddressStreet5"),
									district: s.getProperty("/District"),
									differentCity: s.getProperty("/DifferentCity"),
									postalCode: s.getProperty("/postalCode"),
									city: s.getProperty("/city"),
									region: s.getProperty("/invRegion"),
									country: s.getProperty("/invCountry"),
									language: s.getProperty("/invLanguage"),
									telephone: s.getProperty("/telephone"),
									mobilePhone: s.getProperty("/mobileNumber"),
									taxId: s.getProperty("/taxId"),
									b_Codes: s.getProperty("/bCode"),
									bpNummr: s.getProperty("/bpNummr")
								}];
								v.exchange.address = C
							} else {
								var C = [{
									id: "",
									returnReqNum: "",
									zipCode: "",
									refInvoiceNum: s.getProperty("/refDocNum"),
									email: "",
									salesDocument: "",
									partnerRole: "AG",
									name1: s.getProperty("/partnerName"),
									name2: "",
									name3: "",
									name4: s.getProperty("/partnerName4"),
									street2: s.getProperty("/AddressStreet2"),
									street3: s.getProperty("/AddressStreet3"),
									street5: s.getProperty("/AddressStreet5"),
									district: s.getProperty("/District"),
									differentCity: s.getProperty("/DifferentCity"),
									postalCode: s.getProperty("/postalCode"),
									city: s.getProperty("/city"),
									region: s.getProperty("/invRegion"),
									country: s.getProperty("/invCountry"),
									language: s.getProperty("/invLanguage"),
									telephone: s.getProperty("/telephone"),
									mobilePhone: s.getProperty("/mobileNumber"),
									taxId: s.getProperty("/taxId"),
									b_Codes: s.getProperty("/bCode"),
									bpNummr: s.getProperty("/bpNummr")
								}, {
									id: "",
									returnReqNum: "",
									zipCode: "",
									refInvoiceNum: s.getProperty("/refDocNum"),
									email: "",
									salesDocument: "",
									partnerRole: "WE",
									name1: s.getProperty("/partnerName"),
									name2: "",
									name3: "",
									name4: s.getProperty("/partnerName4"),
									street2: s.getProperty("/AddressStreet2"),
									street3: s.getProperty("/AddressStreet3"),
									street5: s.getProperty("/AddressStreet5"),
									district: s.getProperty("/District"),
									differentCity: s.getProperty("/DifferentCity"),
									postalCode: s.getProperty("/postalCode"),
									city: s.getProperty("/city"),
									region: s.getProperty("/invRegion"),
									country: s.getProperty("/invCountry"),
									language: s.getProperty("/invLanguage"),
									telephone: s.getProperty("/telephone"),
									mobilePhone: s.getProperty("/mobileNumber"),
									taxId: s.getProperty("/taxId"),
									b_Codes: s.getProperty("/bCode"),
									bpNummr: s.getProperty("/bpNummr")
								}, {
									id: "",
									returnReqNum: "",
									zipCode: "",
									refInvoiceNum: s.getProperty("/refDocNum"),
									email: "",
									salesDocument: "",
									partnerRole: "RE",
									name1: s.getProperty("/partnerName"),
									name2: "",
									name3: "",
									name4: s.getProperty("/partnerName4"),
									street2: s.getProperty("/AddressStreet2"),
									street3: s.getProperty("/AddressStreet3"),
									street5: s.getProperty("/AddressStreet5"),
									district: s.getProperty("/District"),
									differentCity: s.getProperty("/DifferentCity"),
									postalCode: s.getProperty("/postalCode"),
									city: s.getProperty("/city"),
									region: s.getProperty("/invRegion"),
									country: s.getProperty("/invCountry"),
									language: s.getProperty("/invLanguage"),
									telephone: s.getProperty("/telephone"),
									mobilePhone: s.getProperty("/mobileNumber"),
									taxId: s.getProperty("/taxId"),
									b_Codes: s.getProperty("/bCode"),
									bpNummr: s.getProperty("/bpNummr")
								}, {
									id: "",
									returnReqNum: "",
									zipCode: "",
									refInvoiceNum: s.getProperty("/refDocNum"),
									email: "",
									salesDocument: "",
									partnerRole: "RG",
									name1: s.getProperty("/partnerName"),
									name2: "",
									name3: "",
									name4: s.getProperty("/partnerName4"),
									street2: s.getProperty("/AddressStreet2"),
									street3: s.getProperty("/AddressStreet3"),
									street5: s.getProperty("/AddressStreet5"),
									district: s.getProperty("/District"),
									differentCity: s.getProperty("/DifferentCity"),
									postalCode: s.getProperty("/postalCode"),
									city: s.getProperty("/city"),
									region: s.getProperty("/invRegion"),
									country: s.getProperty("/invCountry"),
									language: s.getProperty("/invLanguage"),
									telephone: s.getProperty("/telephone"),
									mobilePhone: s.getProperty("/mobileNumber"),
									taxId: s.getProperty("/taxId"),
									b_Codes: s.getProperty("/bCode"),
									bpNummr: s.getProperty("/bpNummr")
								}];
								v.exchange.address = C
							}
						}
					} else {
						if (this.getView().getModel("baseModel").getProperty("/exchangeTabVisiblity") === true) {
							sap.m.MessageBox.information(this.resourceBundle.getText("discardExchangeItems"), {
								actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
								onClose: function (e) {
									if (e === t.Action.OK) {
										o.getView().getModel("baseModel").setProperty("/exchangeTabVisiblity", false);
										o._continueSave();
									} else {
										return;
									}
								}
							});
							return;
						}
					}
				}

			} else {
				if (this.getView().getModel("baseModel").getProperty("/exchangeTabVisiblity") === true) {
					sap.m.MessageBox.information(this.resourceBundle.getText("discardExchangeItems"), {
						actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
						onClose: function (e) {
							if (e === t.Action.OK) {
								o.getView().getModel("baseModel").setProperty("/exchangeTabVisiblity", false);
								o._continueSave();
							} else {
								return;
							}
						}
					});
					return;
				}
			}
			if (this.getView().getModel("returnModel").getData().attachmentObject.length > 0) {
				var V = [];
				var R = this.getView().getModel("returnModel").getData().attachmentObject;
				for (var O = 0; O < R.length; O++) {
					var A = {
						docName: R[O].fileName,
						docType: R[O].fileType,
						docData: R[O].fileDoc,
						docId: R[O].docId,
						returnReqNum: g
					};
					V.push(A)
				}
				v.returns.attachment = V
			}
			var F = {
				"Content-Type": "application/json;charset=utf-8"
			};
			var B = new sap.m.BusyDialog;
			B.open();
			var _ = new sap.ui.model.json.JSONModel;
			_.loadData("/DKSHJavaService/returnRequest/createReturnRequest/saveAsDraft", JSON.stringify(v), true, "POST", false, false, F);
			_.attachRequestCompleted(function (e) {
				B.close();
				if (o.address) {
					o.address.close()
				}
				if (sap.ui.getCore().getModel("submitRequest")) {
					sap.ui.getCore().getModel("submitRequest").setData("")
				}
				var t = e.getSource().getData().name.split(" ")[1];
				o.oDefaultDialog = new sap.m.Dialog({
					type: sap.m.DialogType.Message,
					title: "Success",
					styleClass: "sapUiSizeCompact",
					content: [new sap.m.Text({
						text: " " + e.getSource().getData().name + "."
					}), new sap.m.Text({
						text: " " + o.resourceBundle.getText("Fordetailsclick")
					}), new sap.m.Link({
						text: t,
						target: "_top",
						press: function (e) {
							o._wizard.discardProgress(o._wizard.getSteps()[0]);
							o._discardChanges();
							var r = {
								orderNO: t
							};
							var s = new sap.ui.model.json.JSONModel(r);
							sap.ui.getCore().setModel(s, "saveDraft");
							var i = sap.ui.core.UIComponent.getRouterFor(o);
							i.navTo("DraftRecord")
						}
					})],
					beginButton: new sap.m.Button({
						text: o.resourceBundle.getText("OK"),
						press: function () {
							o._wizard.discardProgress(o._wizard.getSteps()[0]);
							o._discardChanges();
							var e = sap.ui.core.UIComponent.getRouterFor(o);
							e.navTo("DraftRecord")
						}.bind(o)
					}),
					endButton: new sap.m.Button({
						text: "Close",
						press: function () {
							o._wizard.discardProgress(o._wizard.getSteps()[0]);
							o._discardChanges();
							var e = sap.ui.core.UIComponent.getRouterFor(o);
							e.navTo("DraftRecord")
						}.bind(o)
					})
				});
				o.getView().addDependent(o.oDefaultDialog);
				o.oDefaultDialog.open()
			});
			_.attachRequestFailed(function (e) {
				B.close();
				t.error(e.getParameters().responseText)
			})
		},
		onPressSubmit: function (e) {
			if (this.RetQtyCount > 0) {
				t.information(this.resourceBundle.getText("EnteredReturnedQtycannotbegreaterthanAvailableReturnQty"));
				return
			}
			if (this.getView().getModel("baseModel").getProperty("/reasonOwner") === "" || this.getView().getModel("baseModel").getProperty(
					"/reasonOwner") === undefined) {
				o.show(this.resourceBundle.getText("ReasonOwnerisMandatory"));
				return
			}
			if (this.getView().getModel("baseModel").getProperty("/referenceNo") === "" || this.getView().getModel("baseModel").getProperty(
					"/referenceNo") === undefined) {
				o.show(this.resourceBundle.getText("referenceNoisMandatory"));
				return
			}
			// Start - USer Story STRY0012775 - 30/06/2021
			if (this.ROtypeCode === "TF" || this.ROtypeCode === "TG") {

				var refNo = this.getView().getModel("baseModel").getProperty("/referenceNo"),
					remarks = this.getView().getModel("baseModel").getProperty("/remark"),
					returnRemarks = this.getView().getModel("baseModel").getProperty("/returnRemark");

				// Add prefix for return order if return type is saleable (TF) or non-saleable (TK) and exchange order is available\
				if (this.exchangeItems.length > 0) {
					var exRemarks = this.getView().getModel("baseModel").getProperty("/exchangeRemark");

					exRemarks = [exRemarks, refNo].join(" ");
					// Only add prefix if return remark is input by user
					if (returnRemarks) {
						remarks = ["มียาเปลี่ยน", remarks].join(" ");
						returnRemarks = ["มียาเปลี่ยน", returnRemarks].join(" ");
					}
					this.getView().getModel("baseModel").setProperty("/exchangeRemark", exRemarks);
				}
				// Reference no
				if (this.getView().getModel("baseModel").getProperty("/referenceNo")) {
					remarks = [remarks, refNo].join(" ");
					returnRemarks = [returnRemarks, refNo].join(" ");
				}
				this.getView().getModel("baseModel").setProperty("/remark", remarks);
				this.getView().getModel("baseModel").setProperty("/returnRemark", returnRemarks);
			}
			// End - User Story STRY0012775
			var r = this;
			var s = this.getView().getModel("invoiceSearchModel");
			var i = this.getView().getModel("returnModel");
			var a = this.getView().getModel("exchangeModel");
			var n = this.getView().getModel("baseModel");
			this.getView().getModel("baseModel").setProperty("/savePressed", false);
			this.getView().getModel("baseModel").setProperty("/submitPressed", true);
			if (a.getData().results !== undefined && a.getData().results.length > 0) {
				if (parseFloat(i.getData().returnAmountTotal) !== parseFloat(a.getData().exchangeAmountTotal)) {
					sap.m.MessageBox.information(this.resourceBundle.getText("retrunAmountValidation"), {
						actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
						onClose: function (e) {
							if (e === t.Action.OK) {
								r._checkAddress()
							}
						}
					})
				} else {
					r._checkAddress()
				}
			} else if (i.getData().results === undefined || i.getData().results.length === 0) {
				t.information(this.resourceBundle.getText("ReturnItemscannotbeempty"))
			} else {
				r._checkAddress()
			}
		},
		_checkAddress: function () {
			var e = this;
			var t = this.getView().getModel("invoiceSearchModel");
			var r = this.getView().getModel("returnModel");
			var o = this.getView().getModel("exchangeModel");
			var s = this.getView().getModel("baseModel");
			if (s.getProperty("/oneTimeCustomer") === "X" && s.getProperty("/returnSoldTo") !== s.getProperty("/exSoldTo") && s.getProperty(
					"/EXOneTimeCustomer") === "X") {
				if (!this.address) {
					this.address = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.Address", this);
					this.getView().addDependent(this.address)
				}
				this._loadCity();
				if (this.getView().getModel("editDraftModel")) {
					if (this.changeSoldToParty === true) {
						// s.setProperty("/invCountry", this.selectedReturnItems[0].soldToAddress.countryCode);
						// s.setProperty("/invRegion", this.selectedReturnItems[0].soldToAddress.region);
						// s.setProperty("/invLanguage", this.selectedReturnItems[0].soldToAddress.language);
						s.setProperty("/partnerName", "");
						s.setProperty("/AddressStreet2", "");
						s.setProperty("/AddressStreet3", "");
						s.setProperty("/AddressStreet5", "");
						s.setProperty("/District", "");
						s.setProperty("/DifferentCity", "");
						s.setProperty("/postalCode", "");
						s.setProperty("/city", "");
						s.setProperty("/telephone", "");
						s.setProperty("/mobileNumber", "");
						s.setProperty("/taxId", "");
						s.setProperty("/bCode", "00000");
						s.setProperty("/bpNummr", "N");
						s.setProperty("/partnerName4", "");
						s.setProperty("/maxLengthName4", "40 char remaining");
						s.setProperty("/maxLengthAddressStreet2", "40 char remaining");
						s.setProperty("/maxLengthAddressStreet3", "40 char remaining");
						s.setProperty("/maxLengthAddressStreet5", "40 char remaining");
						s.setProperty("/maxLengthDistrict", "40 char remaining");
						s.setProperty("/maxLengthDifferentCity", "40 char remaining");
						s.setProperty("/maxLengthPostalCode", "5 char remaining");
						s.setProperty("/maxLengthtelephone", "30 char remaining");
						s.setProperty("/maxLengthmobileNumber", "30 char remaining");
						s.setProperty("/maxLengthtaxId", "13 char remaining");
						s.setProperty("/maxLengthbCode", "0 char remaining");
						s.setProperty("/maxLengthbpNummr", "0 char remaining");
						this.address.open();
						return
					} else {
						// s.setProperty("/invCountry", this.selectedReturnItems[0].soldToAddress.countryCode);
						// s.setProperty("/invRegion", this.selectedReturnItems[0].soldToAddress.region);
						// s.setProperty("/invLanguage", this.selectedReturnItems[0].soldToAddress.language);
						s.setProperty("/maxLengthName4", 40 - s.getProperty("/partnerName4").length + " char remaining");
						s.setProperty("/maxLengthAddressStreet2", 40 - s.getProperty("/AddressStreet2").length + " char remaining");
						s.setProperty("/maxLengthAddressStreet3", 40 - s.getProperty("/AddressStreet3").length + " char remaining");
						s.setProperty("/maxLengthAddressStreet5", 40 - s.getProperty("/AddressStreet5").length + " char remaining");
						s.setProperty("/maxLengthDistrict", 40 - s.getProperty("/District").length + " char remaining");
						s.setProperty("/maxLengthDifferentCity", 40 - s.getProperty("/DifferentCity").length + " char remaining");
						s.setProperty("/maxLengthPostalCode", 5 - s.getProperty("/postalCode").length + " char remaining");
						s.setProperty("/maxLengthtelephone", 30 - s.getProperty("/telephone").length + " char remaining");
						s.setProperty("/maxLengthmobileNumber", 30 - s.getProperty("/mobileNumber").length + " char remaining");
						s.setProperty("/maxLengthtaxId", 13 - s.getProperty("/taxId").length + " char remaining");
						s.setProperty("/maxLengthbCode", 5 - s.getProperty("/bCode").length + " char remaining");
						s.setProperty("/maxLengthbpNummr", 1 - s.getProperty("/bpNummr").length + " char remaining");
						this.address.open();
						return
					}
				} else {
					if (this.selectedReturnItems[0].soldToAddress.language === "TH" || this.selectedReturnItems[0].soldToAddress.language === "2") {
						this.selectedReturnItems[0].soldToAddress.language = "2"
					} else {
						this.selectedReturnItems[0].soldToAddress.language = "E"
					}
					if (this.selectedReturnItems[0].shipToAddress.language === "TH" || this.selectedReturnItems[0].shipToAddress.language === "2") {
						this.selectedReturnItems[0].shipToAddress.language = "2"
					} else {
						this.selectedReturnItems[0].shipToAddress.language = "E"
					}
					if (this.selectedReturnItems[0].billToAdress.language === "TH" || this.selectedReturnItems[0].billToAdress.language === "2") {
						this.selectedReturnItems[0].billToAdress.language = "2"
					} else {
						this.selectedReturnItems[0].billToAdress.language = "E"
					}
					if (this.selectedReturnItems[0].payerAddress.language === "TH" || this.selectedReturnItems[0].payerAddress.language === "2") {
						this.selectedReturnItems[0].payerAddress.language = "2"
					} else {
						this.selectedReturnItems[0].payerAddress.language = "E"
					}
					r.setProperty("/invRetCountry", this.selectedReturnItems[0].soldToAddress.countryCode);
					r.setProperty("/invRetRegion", this.selectedReturnItems[0].soldToAddress.region);
					r.setProperty("/invRetLanguage", this.selectedReturnItems[0].soldToAddress.language);
					s.setProperty("/partnerName", "");
					s.setProperty("/AddressStreet2", "");
					s.setProperty("/AddressStreet3", "");
					s.setProperty("/AddressStreet5", "");
					s.setProperty("/District", "");
					s.setProperty("/DifferentCity", "");
					s.setProperty("/postalCode", "");
					s.setProperty("/city", "");
					s.setProperty("/telephone", "");
					s.setProperty("/mobileNumber", "");
					s.setProperty("/taxId", "");
					s.setProperty("/bCode", "00000");
					s.setProperty("/bpNummr", "N");
					s.setProperty("/partnerName4", "");
					s.setProperty("/maxLengthName4", "40 char remaining");
					s.setProperty("/maxLengthAddressStreet2", "40 char remaining");
					s.setProperty("/maxLengthAddressStreet3", "40 char remaining");
					s.setProperty("/maxLengthAddressStreet5", "40 char remaining");
					s.setProperty("/maxLengthDistrict", "40 char remaining");
					s.setProperty("/maxLengthDifferentCity", "40 char remaining");
					s.setProperty("/maxLengthPostalCode", "5 char remaining");
					s.setProperty("/maxLengthtelephone", "30 char remaining");
					s.setProperty("/maxLengthmobileNumber", "30 char remaining");
					s.setProperty("/maxLengthtaxId", "13 char remaining");
					s.setProperty("/maxLengthbCode", "0 char remaining");
					s.setProperty("/maxLengthbpNummr", "0 char remaining");
					this.address.open();
					return
				}
			} else if (s.getProperty("/oneTimeCustomer") === "X" && o.getData().results !== undefined && o.getData().results.length > 0 && s.getProperty(
					"/returnSoldTo") === s.getProperty("/exSoldTo")) {
				if (!this.address) {
					this.address = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.Address", this);
					this.getView().addDependent(this.address)
				}
				this._loadCity();
				if (this.docVersion === undefined) {
					if (this.selectedReturnItems[0].soldToAddress.language === "TH" || this.selectedReturnItems[0].soldToAddress.language === "2") {
						this.selectedReturnItems[0].soldToAddress.language = "2"
					} else {
						this.selectedReturnItems[0].soldToAddress.language = "E"
					}
					if (this.selectedReturnItems[0].shipToAddress.language === "TH" || this.selectedReturnItems[0].shipToAddress.language === "2") {
						this.selectedReturnItems[0].shipToAddress.language = "2"
					} else {
						this.selectedReturnItems[0].shipToAddress.language = "E"
					}
					if (this.selectedReturnItems[0].billToAdress.language === "TH" || this.selectedReturnItems[0].billToAdress.language === "2") {
						this.selectedReturnItems[0].billToAdress.language = "2"
					} else {
						this.selectedReturnItems[0].billToAdress.language = "E"
					}
					if (this.selectedReturnItems[0].payerAddress.language === "TH" || this.selectedReturnItems[0].payerAddress.language === "2") {
						this.selectedReturnItems[0].payerAddress.language = "2"
					} else {
						this.selectedReturnItems[0].payerAddress.language = "E"
					}
					var i = this.selectedReturnItems[0];
					s.setProperty("/invCountry", this.selectedReturnItems[0].soldToAddress.countryCode);
					s.setProperty("/invRegion", this.selectedReturnItems[0].soldToAddress.region);
					s.setProperty("/invLanguage", this.selectedReturnItems[0].soldToAddress.language);
					s.setProperty("/partnerName", i.soldToAddress.partnerName);
					s.setProperty("/partnerName4", i.soldToAddress.partnerName4);
					s.setProperty("/AddressStreet2", i.soldToAddress.AddressStreet2);
					s.setProperty("/AddressStreet3", i.soldToAddress.AddressStreet3);
					s.setProperty("/AddressStreet5", i.soldToAddress.AddressStreet5);
					s.setProperty("/District", i.soldToAddress.District);
					s.setProperty("/DifferentCity", i.soldToAddress.DifferentCity);
					s.setProperty("/postalCode", i.soldToAddress.postalCode);
					s.setProperty("/city", i.soldToAddress.City);
					s.setProperty("/telephone", i.soldToAddress.telephone);
					s.setProperty("/mobileNumber", i.soldToAddress.mobileNumber);
					s.setProperty("/taxId", i.soldToAddress.taxId);
					s.setProperty("/bCode", i.soldToAddress.bCode);
					if (i.soldToAddress.bpNummr === "N" || i.soldToAddress.bpNummr === "H") {
						s.setProperty("/bCode", "00000")
					}
					s.setProperty("/bpNummr", i.soldToAddress.bpNummr);
					s.setProperty("/maxLengthName4", 40 - i.soldToAddress.partnerName4.length + " char remaining");
					s.setProperty("/maxLengthAddressStreet2", 40 - i.soldToAddress.AddressStreet2.length + " char remaining");
					s.setProperty("/maxLengthAddressStreet3", 40 - i.soldToAddress.AddressStreet3.length + " char remaining");
					s.setProperty("/maxLengthAddressStreet5", 40 - i.soldToAddress.AddressStreet5.length + " char remaining");
					s.setProperty("/maxLengthDistrict", 40 - i.soldToAddress.District.length + " char remaining");
					s.setProperty("/maxLengthDifferentCity", 40 - i.soldToAddress.DifferentCity.length + " char remaining");
					s.setProperty("/maxLengthPostalCode", 5 - i.soldToAddress.postalCode.length + " char remaining");
					s.setProperty("/maxLengthtelephone", 30 - i.soldToAddress.telephone.length + " char remaining");
					s.setProperty("/maxLengthmobileNumber", 30 - i.soldToAddress.mobileNumber.length + " char remaining");
					s.setProperty("/maxLengthtaxId", 13 - i.soldToAddress.taxId.length + " char remaining");
					s.setProperty("/maxLengthbCode", 5 - s.getProperty("/bCode").length + " char remaining");
					s.setProperty("/maxLengthbpNummr", 1 - i.soldToAddress.bpNummr.length + " char remaining");
					this.address.setModel(s, "/baseModel");
					this.address.open()
				} else {
					s.setProperty("/maxLengthName4", 40 - s.getProperty("/partnerName4").length + " char remaining");
					s.setProperty("/maxLengthAddressStreet2", 40 - s.getProperty("/AddressStreet2").length + " char remaining");
					s.setProperty("/maxLengthAddressStreet3", 40 - s.getProperty("/AddressStreet3").length + " char remaining");
					s.setProperty("/maxLengthAddressStreet5", 40 - s.getProperty("/AddressStreet5").length + " char remaining");
					s.setProperty("/maxLengthDistrict", 40 - s.getProperty("/District").length + " char remaining");
					s.setProperty("/maxLengthDifferentCity", 40 - s.getProperty("/DifferentCity").length + " char remaining");
					s.setProperty("/maxLengthPostalCode", 5 - s.getProperty("/postalCode").length + " char remaining");
					s.setProperty("/maxLengthtelephone", 30 - s.getProperty("/telephone").length + " char remaining");
					s.setProperty("/maxLengthmobileNumber", 30 - s.getProperty("/mobileNumber").length + " char remaining");
					s.setProperty("/maxLengthtaxId", 13 - s.getProperty("/taxId").length + " char remaining");
					s.setProperty("/maxLengthbCode", 5 - s.getProperty("/bCode").length + " char remaining");
					s.setProperty("/maxLengthbpNummr", 1 - s.getProperty("/bpNummr").length + " char remaining");
					this.address.setModel(s, "/baseModel");
					this.address.open()
				}
				return
			} else if (s.getProperty("/EXOneTimeCustomer") === "X" && s.getProperty("/oneTimeCustomer") === "") {
				if (!this.address) {
					this.address = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.Address", this);
					this.getView().addDependent(this.address)
				}
				this._loadCity();
				s.setProperty("/invCountry", this.selectedReturnItems[0].soldToAddress.countryCode);
				s.setProperty("/invRegion", this.selectedReturnItems[0].soldToAddress.region);
				s.setProperty("/invLanguage", this.selectedReturnItems[0].soldToAddress.language);
				s.setProperty("/partnerName", "");
				s.setProperty("/AddressStreet2", "");
				s.setProperty("/AddressStreet3", "");
				s.setProperty("/AddressStreet5", "");
				s.setProperty("/District", "");
				s.setProperty("/DifferentCity", "");
				s.setProperty("/postalCode", "");
				s.setProperty("/city", "");
				s.setProperty("/telephone", "");
				s.setProperty("/mobileNumber", "");
				s.setProperty("/taxId", "");
				s.setProperty("/bCode", "00000");
				s.setProperty("/bpNummr", "N");
				s.setProperty("/partnerName4", "");
				s.setProperty("/maxLengthName4", "40 char remaining");
				s.setProperty("/maxLengthAddressStreet2", "40 char remaining");
				s.setProperty("/maxLengthAddressStreet3", "40 char remaining");
				s.setProperty("/maxLengthAddressStreet5", "40 char remaining");
				s.setProperty("/maxLengthDistrict", "40 char remaining");
				s.setProperty("/maxLengthDifferentCity", "40 char remaining");
				s.setProperty("/maxLengthPostalCode", "5 char remaining");
				s.setProperty("/maxLengthtelephone", "30 char remaining");
				s.setProperty("/maxLengthmobileNumber", "30 char remaining");
				s.setProperty("/maxLengthtaxId", "13 char remaining");
				s.setProperty("/maxLengthbCode", "0 char remaining");
				s.setProperty("/maxLengthbpNummr", "0 char remaining");
				this.address.open();
				return
			} else if (s.getProperty("/EXOneTimeCustomer") === "" && s.getProperty("/returnSoldTo") !== s.getProperty("/exSoldTo")) {
				this._continueSubmit();
				return
			}
			this._continueSubmit()
		},
		onViewExAddress: function () {
			if (!this.address) {
				this.address = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.Address", this);
				this.getView().addDependent(this.address)
			}
			this.getView().getModel("baseModel").setProperty("/addressFieldEnable", false);
			this.getView().getModel("baseModel").refresh();
			this.address.open()
		},
		_continueSubmit: function () {
			var e = this;
			var o = this.getView().getModel("invoiceSearchModel");
			var s = this.getView().getModel("returnModel");
			var i = this.getView().getModel("exchangeModel");
			var a = this.getView().getModel("baseModel");
			if (this.docVersion === "DRAFT") {
				var n = "DRAFT"
			} else if (this.docVersion === "ERROR") {
				var n = "ERROR"
			} else {
				var n = "NEW"
			}
			var l = {
				docName: "retunr03",
				docType: "pdf",
				docData: [0, 1]
			};
			if (a.getData().returnReqNum) {
				var d = a.getData().returnReqNum
			} else {
				var d = ""
			}
			if (a.getData().exchangeReqNum) {
				var g = a.getData().exchangeReqNum
			} else {
				var g = ""
			}
			var p = s.getData().results;
			var c = [];
			for (var u = 0; u < p.length; u++) {
				if (p[u].deleted === "false") {
					var h = {
						refDocNum: p[u].refInvoice,
						refDocItem: p[u].refItemNumber,
						returnReqItemid: p[u].itemNumber,
						materialGroup: p[u].materialGroup,
						materialGroup4: p[u].materialGroup4,
						material: p[u].matNumber,
						shortText: p[u].itemShortText,
						avlReturnQty: p[u].avlRetQty,
						avlUom: p[u].salesUnit,
						returnQty: p[u].quantity,
						returnUom: p[u].salesUnit,
						unitPriceCc: p[u].unitPrice,
						unitPriceInv: p[u].unitPriceInv,
						invoiceTotalAmount: s.getData().returnAmountTotal.split("(")[0],
						storageLocation: p[u].storageLocation,
						higherLevel: p[u].higherItem,
						batch: p[u].batchNumber,
						referenceInvDate: r.dateTimeFormatPS(p[u].billingDate).split("T")[0],
						expiryDate: r.dateTimeFormatPS(p[u].expiryDate).split("T")[0],
						pricingDate: r.dateTimeFormatPS(p[u].pricingDate),
						serviceRenderedDate: r.dateTimeFormatPS(p[u].serviceRenderedDate),
						serialNum: p[u].serialNumber,
						billingType: o.getData().billingType,
						sapReturnOrderNum: "",
						sapReturnOrderItemNum: "",
						overallItemWorkflowStatus: "",
						plant: p[u].plant,
						returnReqNum: d,
						exchangeOrderType: a.getData().exchangeOrderType,
						paymentTerms: p[u].paymentTerms,
						conditionGroup4: p[u].conditionGroup4
					};
					c.push(h)
				}
			}
			if (c.length === 0) {
				t.information(this.resourceBundle.getText("ReturnItemscannotbeempty"));
				return
			}
			if (a.getData().userEmailId) {
				var m = a.getData().userEmailId;
				var y = true
			} else {
				var m = "";
				var y = false
			}
			if (a.getData().phoneNum) {
				var P = a.getData().phoneNum;
				var f = true;
				var v = [];
				v.push(P)
			} else {
				var P = "";
				var f = false;
				var v = []
			}
			if (S && S.length > 0) {
				var D = S
			} else {
				var D = ""
			}
			if (a.getData().requestor === a.getData().userName + " (" + a.getData().phone + ")") {
				var M = ""
			} else {
				var M = a.getData().requestor
			}
			var b = {
				returns: {
					customerPo: a.getData().customerPONumber,
					contactelephone: P,
					smsNumberList: v,
					smsTrigger: f,
					smsFrom: "DKSH-TH",
					createdAt: new Date,
					mappingId: a.getData().salesOrgForRO,
					updatedBy: M,
					requestorName: a.getData().userId + "(" + a.getData().userName + ")",
					requestedBy: a.getData().userId,
					roType: a.getData().selectedROTypeCode,
					roTypeText: a.getData().selectedROType,
					salesOrg: a.getData().selectedSalesOrg,
					salesOrgDesc: o.getData().salesOrgDesc,
					distributionChannel: a.getData().selectedDistChnl,
					distributionChannelDesc: o.getData().distChnlDesc,
					division: o.getData().Division,
					divisionDesc: a.getData().selectedDivisionDesc,
					soldToParty: a.getData().returnSoldTo,
					soldToPartyDesc: a.getData().returnSoldToDesc,
					shipToParty: a.getData().returnShipTo,
					shipToPartyDesc: a.getData().shipToDesc,
					billToParty: a.getData().returnBillTo,
					billToDesc: a.getData().returnBillToDesc,
					payer: a.getData().returnPayer,
					payerDesc: a.getData().returnPayerDesc,
					requestorEmail: m,
					contactPerson: a.getData().contactPerson,
					contactDivsion: a.getData().contactDivision,
					contactTelephone: a.getData().phoneNum,
					referenceNum: a.getData().referenceNo,
					requestRemark: a.getData().returnRemark,
					orderReason: a.getData().selectedReturnReason.split(" ")[0],
					orderReasonText: a.getData().selectedReturnReason.split("(")[1].split(")")[0],
					reasonOwner: a.getData().reasonOwner.split(" ")[0],
					reasonOwnerDesc: a.getData().reasonOwner.split(" ")[1],
					orderType: a.getData().returnOrderType,
					orderTypeText: a.getData().returnOrderType,
					returnTotalAmt: s.getData().returnAmountTotal.split("(")[0],
					totalRoAmount: this.getView().getModel("returnModel").getData().returnAmountTotal.split("(")[0],
					returnReqNum: d,
					workflowInstance: "",
					overallWorkflowStatus: "",
					processingStatus: "",
					logisticalStatus: "",
					oneTimeCustomer: a.getData().oneTimeCustomer,
					docVersion: n,
					flagRoSo: "R",
					emailTrigger: y,
					exchangeOrderType: a.getData().exchangeOrderType,
					items: c
				}
			};
			if (s.getData().returnConditions) {
				var T = s.getData().returnConditions;
				var S = [];
				for (var C = 0; C < T.length; C++) {
					if (T[C].deleted === undefined || T[C].deleted === "false") {
						var w = {
							refDoc: T[C].refInvoice,
							salesDocument: "",
							itemNumber: T[C].itemNumber,
							stepNumber: T[C].stepNumber,
							condCounter: T[C].condCounter,
							condType: T[C].condType,
							condRate: T[C].condRate,
							currency: T[C].currency,
							condUnit: T[C].condUnit,
							condPricingUnit: T[C].condPricingUnit,
							calculationType: T[C].calculationType,
							condFlag: T[C].condFlag,
							condUpdateFlag: T[C].condUpdateFlag
						};
						S.push(w)
					}
				}
				b.returns.orderCondition = S
			}
			if (a.getProperty("/oneTimeCustomer") === "X") {
				if (this.docVersion === undefined) {
					var x = this.selectedReturnItems;
					var I = x[0].soldToAddress;
					var N = x[0].shipToAddress;
					var V = x[0].billToAdress;
					var R = x[0].payerAddress;
					var O = [{
						id: "",
						returnReqNum: "",
						zipCode: I.postalCode,
						refDocNum: x[0].InvoiceNum,
						email: "",
						salesDocument: "",
						partnerRole: "AG",
						name1: I.partnerName,
						name2: "",
						name3: "",
						name4: I.partnerName4,
						street2: I.AddressStreet2,
						street3: I.AddressStreet3,
						street5: I.AddressStreet5,
						district: I.District,
						differentCity: I.DifferentCity,
						postalCode: I.postalCode,
						city: I.City,
						region: I.region,
						country: I.countryCode,
						language: I.language,
						telephone: I.telephone,
						mobilePhone: I.mobileNumber,
						taxId: I.taxId,
						b_Codes: I.bCode,
						bpNummr: I.bpNummr
					}, {
						id: "",
						returnReqNum: "",
						zipCode: N.postalCode,
						refDocNum: x[0].InvoiceNum,
						email: "",
						salesDocument: "",
						partnerRole: "WE",
						name1: N.partnerName,
						name2: "",
						name3: "",
						name4: N.partnerName4,
						street2: N.AddressStreet2,
						street3: N.AddressStreet3,
						street5: N.AddressStreet5,
						district: N.District,
						differentCity: N.DifferentCity,
						postalCode: N.postalCode,
						city: N.City,
						region: N.region,
						country: N.countryCode,
						language: N.language,
						telephone: N.telephone,
						mobilePhone: N.mobileNumber,
						taxId: N.taxId,
						b_Codess: N.bCode,
						bpNummr: N.bpNummr
					}, {
						id: "",
						returnReqNum: "",
						zipCode: V.postalCode,
						refDocNum: x[0].InvoiceNum,
						email: "",
						salesDocument: "",
						partnerRole: "RE",
						name1: V.partnerName,
						name2: "",
						name3: "",
						name4: V.partnerName4,
						street2: V.AddressStreet2,
						street3: V.AddressStreet3,
						street5: V.AddressStreet5,
						district: V.District,
						differentCity: V.DifferentCity,
						postalCode: V.postalCode,
						city: V.City,
						region: V.region,
						country: V.countryCode,
						language: V.language,
						telephone: V.telephone,
						mobilePhone: V.mobileNumber,
						taxId: V.taxId,
						b_Codess: V.bCode,
						bpNummr: V.bpNummr
					}, {
						id: "",
						returnReqNum: "",
						zipCode: R.postalCode,
						refDocNum: x[0].InvoiceNum,
						email: "",
						salesDocument: "",
						partnerRole: "RG",
						name1: R.partnerName,
						name2: "",
						name3: "",
						name4: R.partnerName4,
						street2: R.AddressStreet2,
						street3: R.AddressStreet3,
						street5: R.AddressStreet5,
						district: R.District,
						differentCity: R.DifferentCity,
						postalCode: R.postalCode,
						city: R.City,
						region: R.region,
						country: R.countryCode,
						language: R.language,
						telephone: R.telephone,
						mobilePhone: R.mobileNumber,
						taxId: R.taxId,
						b_Codes: R.bCode,
						bpNummr: R.bpNummr
					}];
					b.returns.address = O
				} else {
					b.returns.address = a.getProperty("/setRetAddress")
				}
			}
			if (i.getData().results !== undefined && i.getData().results.length > 0) {
				var A = i.getData().results;
				var F = [];
				for (var B = 0; B < A.length; B++) {
					if (A[B].deleted === "false") {
						var _ = {
							refDocNum: A[B].refInvoice,
							refDocItem: A[B].refItemNumber,
							exchangeReqItemid: A[B].itemNumber,
							materialGroup: A[B].materialGroup,
							materialGroup4: A[B].materialGroup4,
							material: A[B].matNumber,
							shortText: A[B].itemShortText,
							manualFoc: A[B].manualFoc,
							returnQty: A[B].quantity,
							returnUom: A[B].salesUnit,
							unitPriceCc: A[B].unitPrice,
							unitPriceInv: A[B].unitPriceInv,
							invoiceTotalAmount: i.getData().exchangeAmountTotal.split("(")[0],
							totalNetAmount: this.getView().getModel("exchangeModel").getData().exchangeAmountTotal.split("(")[0],
							storageLocation: A[B].storageLocation,
							higherLevel: A[B].higherItem,
							batch: A[B].batchNumber,
							referenceInvDate: r.dateTimeFormatPS(A[B].billingDate).split("T")[0],
							expiryDate: r.dateTimeFormatPS(A[B].expiryDate).split("T")[0],
							serialNum: A[B].serialNumber,
							returnReqNum: "",
							billingType: o.getData().billingType,
							sapReturnOrderNum: "",
							sapReturnOrderItemNum: "",
							overallItemWorkflowStatus: "",
							plant: A[B].plant,
							exchangeReqNum: g,
							paymentTerms: A[B].paymentTerms,
							conditionGroup4: A[B].conditionGroup4,
							pricingDate: r.dateTimeFormatPS(A[B].pricingDate),
							serviceRenderedDate: r.dateTimeFormatPS(A[B].serviceRenderedDate)
						};
						F.push(_)
					}
				}
				if (F.length > 0) {
					if (U && U.length > 0) {
						var E = U
					} else {
						var E = ""
					}
					var L = {
						customerPo: a.getData().customerPONumberEx,
						roType: a.getData().selectedROTypeCode,
						payer: a.getData().exPayer,
						referenceNum: a.getData().referenceNo,
						reasonOwner: a.getData().reasonOwner.split(" ")[0],
						requestRemark: a.getData().exchangeRemark,
						billToParty: a.getData().exBillTo,
						billToDesc: a.getData().exBillToDesc,
						billToPartyDesc: a.getData().exBillToDesc,
						payerDescription: a.getData().exPayerDesc,
						payerDesc: a.getData().exPayerDesc,
						orderCategory: a.getData().exchangeOrderType,
						orderType: a.getData().exchangeOrderType,
						orderTypeText: a.getData().exchangeOrderType,
						salesOrg: a.getData().selectedSalesOrg,
						distributionChannel: a.getData().selectedDistChnl,
						division: o.getData().Division,
						soldToParty: a.getData().exSoldTo,
						soldToPartyDesc: a.getData().exSoldToDesc,
						shipToParty: a.getData().exShipTo,
						shipToPartyDesc: a.getData().exShipToDesc,
						remarks: a.getData().exchangeRemark,
						totalNetAmount: i.getData().exchangeAmountTotal.split("(")[0],
						delComplete: a.getData().completedDeliveryFLAG,
						docCurrency: "",
						deliveryBlock: "",
						billingBlock: "",
						overallStatus: "",
						rejectionStatus: "",
						deliveryStatus: "",
						creditStatus: "",
						overallWorkflowStatus: "",
						items: F,
						flagRoSo: "E",
						requestorName: a.getData().userId + "(" + a.getData().userName + ")",
						exoneTimeCustomer: a.getData().EXOneTimeCustomer,
						exchangeReqNum: g
					};
					b.exchange = L
					if (i.getData().exchangeConditions) {
						var z = i.getData().exchangeConditions;
						var U = [];
						for (var q = 0; q < z.length; q++) {
							var j = {
								refDoc: z[q].refInvoice,
								salesDocument: "",
								itemNumber: z[q].itemNumber,
								stepNumber: z[q].stepNumber,
								condCounter: z[q].condCounter,
								condType: z[q].condType,
								condRate: z[q].condRate,
								currency: z[q].currency,
								condUnit: z[q].condUnit,
								condPricingUnit: z[q].condPricingUnit,
								calculationType: z[q].calculationType,
								condFlag: z[q].condFlag,
								condUpdateFlag: z[q].condUpdateFlag
							};
							U.push(j)
						}
						b.exchange.orderCondition = U
						if (a.getProperty("/EXOneTimeCustomer") === "X" || a.getProperty("/oneTimeCustomer") === "X") {
							if (this.docVersion === undefined) {
								var x = this.selectedReturnItems;
								var O = [{
									id: "",
									returnReqNum: "",
									zipCode: "",
									refDocNum: x[0].InvoiceNum,
									email: "",
									salesDocument: "",
									partnerRole: "AG",
									name1: a.getProperty("/partnerName"),
									name2: "",
									name3: "",
									name4: a.getProperty("/partnerName4"),
									street2: a.getProperty("/AddressStreet2"),
									street3: a.getProperty("/AddressStreet3"),
									street5: a.getProperty("/AddressStreet5"),
									district: a.getProperty("/District"),
									differentCity: a.getProperty("/DifferentCity"),
									postalCode: a.getProperty("/postalCode"),
									city: a.getProperty("/city"),
									region: a.getProperty("/invRegion"),
									country: a.getProperty("/invCountry"),
									language: a.getProperty("/invLanguage"),
									telephone: a.getProperty("/telephone"),
									mobilePhone: a.getProperty("/mobileNumber"),
									taxId: a.getProperty("/taxId"),
									b_Codes: a.getProperty("/bCode"),
									bpNummr: a.getProperty("/bpNummr")
								}, {
									id: "",
									returnReqNum: "",
									zipCode: "",
									refDocNum: x[0].InvoiceNum,
									email: "",
									salesDocument: "",
									partnerRole: "WE",
									name1: a.getProperty("/partnerName"),
									name2: "",
									name3: "",
									name4: a.getProperty("/partnerName4"),
									street2: a.getProperty("/AddressStreet2"),
									street3: a.getProperty("/AddressStreet3"),
									street5: a.getProperty("/AddressStreet5"),
									district: a.getProperty("/District"),
									differentCity: a.getProperty("/DifferentCity"),
									postalCode: a.getProperty("/postalCode"),
									city: a.getProperty("/city"),
									region: a.getProperty("/invRegion"),
									country: a.getProperty("/invCountry"),
									language: a.getProperty("/invLanguage"),
									telephone: a.getProperty("/telephone"),
									mobilePhone: a.getProperty("/mobileNumber"),
									taxId: a.getProperty("/taxId"),
									b_Codes: a.getProperty("/bCode"),
									bpNummr: a.getProperty("/bpNummr")
								}, {
									id: "",
									returnReqNum: "",
									zipCode: "",
									refDocNum: x[0].InvoiceNum,
									email: "",
									salesDocument: "",
									partnerRole: "RE",
									name1: a.getProperty("/partnerName"),
									name2: "",
									name3: "",
									name4: a.getProperty("/partnerName4"),
									street2: a.getProperty("/AddressStreet2"),
									street3: a.getProperty("/AddressStreet3"),
									street5: a.getProperty("/AddressStreet5"),
									district: a.getProperty("/District"),
									differentCity: a.getProperty("/DifferentCity"),
									postalCode: a.getProperty("/postalCode"),
									city: a.getProperty("/city"),
									region: a.getProperty("/invRegion"),
									country: a.getProperty("/invCountry"),
									language: a.getProperty("/invLanguage"),
									telephone: a.getProperty("/telephone"),
									mobilePhone: a.getProperty("/mobileNumber"),
									taxId: a.getProperty("/taxId"),
									b_Codes: a.getProperty("/bCode"),
									bpNummr: a.getProperty("/bpNummr")
								}, {
									id: "",
									returnReqNum: "",
									zipCode: "",
									refDocNum: x[0].InvoiceNum,
									email: "",
									salesDocument: "",
									partnerRole: "RG",
									name1: a.getProperty("/partnerName"),
									name2: "",
									name3: "",
									name4: a.getProperty("/partnerName4"),
									street2: a.getProperty("/AddressStreet2"),
									street3: a.getProperty("/AddressStreet3"),
									street5: a.getProperty("/AddressStreet5"),
									district: a.getProperty("/District"),
									differentCity: a.getProperty("/DifferentCity"),
									postalCode: a.getProperty("/postalCode"),
									city: a.getProperty("/city"),
									region: a.getProperty("/invRegion"),
									country: a.getProperty("/invCountry"),
									language: a.getProperty("/invLanguage"),
									telephone: a.getProperty("/telephone"),
									mobilePhone: a.getProperty("/mobileNumber"),
									taxId: a.getProperty("/taxId"),
									b_Codes: a.getProperty("/bCode"),
									bpNummr: a.getProperty("/bpNummr")
								}];
								b.exchange.address = O
							} else {
								var O = [{
									id: "",
									returnReqNum: "",
									zipCode: "",
									refDocNum: a.getProperty("/refDocNum"),
									email: "",
									salesDocument: "",
									partnerRole: "AG",
									name1: a.getProperty("/partnerName"),
									name2: "",
									name3: "",
									name4: a.getProperty("/partnerName4"),
									street2: a.getProperty("/AddressStreet2"),
									street3: a.getProperty("/AddressStreet3"),
									street5: a.getProperty("/AddressStreet5"),
									district: a.getProperty("/District"),
									differentCity: a.getProperty("/DifferentCity"),
									postalCode: a.getProperty("/postalCode"),
									city: a.getProperty("/city"),
									region: a.getProperty("/invRegion"),
									country: a.getProperty("/invCountry"),
									language: a.getProperty("/invLanguage"),
									telephone: a.getProperty("/telephone"),
									mobilePhone: a.getProperty("/mobileNumber"),
									taxId: a.getProperty("/taxId"),
									b_Codes: a.getProperty("/bCode"),
									bpNummr: a.getProperty("/bpNummr")
								}, {
									id: "",
									returnReqNum: "",
									zipCode: "",
									refDocNum: a.getProperty("/refDocNum"),
									email: "",
									salesDocument: "",
									partnerRole: "WE",
									name1: a.getProperty("/partnerName"),
									name2: "",
									name3: "",
									name4: a.getProperty("/partnerName4"),
									street2: a.getProperty("/AddressStreet2"),
									street3: a.getProperty("/AddressStreet3"),
									street5: a.getProperty("/AddressStreet5"),
									district: a.getProperty("/District"),
									differentCity: a.getProperty("/DifferentCity"),
									postalCode: a.getProperty("/postalCode"),
									city: a.getProperty("/city"),
									region: a.getProperty("/invRegion"),
									country: a.getProperty("/invCountry"),
									language: a.getProperty("/invLanguage"),
									telephone: a.getProperty("/telephone"),
									mobilePhone: a.getProperty("/mobileNumber"),
									taxId: a.getProperty("/taxId"),
									b_Codes: a.getProperty("/bCode"),
									bpNummr: a.getProperty("/bpNummr")
								}, {
									id: "",
									returnReqNum: "",
									zipCode: "",
									refDocNum: a.getProperty("/refDocNum"),
									email: "",
									salesDocument: "",
									partnerRole: "RE",
									name1: a.getProperty("/partnerName"),
									name2: "",
									name3: "",
									name4: a.getProperty("/partnerName4"),
									street2: a.getProperty("/AddressStreet2"),
									street3: a.getProperty("/AddressStreet3"),
									street5: a.getProperty("/AddressStreet5"),
									district: a.getProperty("/District"),
									differentCity: a.getProperty("/DifferentCity"),
									postalCode: a.getProperty("/postalCode"),
									city: a.getProperty("/city"),
									region: a.getProperty("/invRegion"),
									country: a.getProperty("/invCountry"),
									language: a.getProperty("/invLanguage"),
									telephone: a.getProperty("/telephone"),
									mobilePhone: a.getProperty("/mobileNumber"),
									taxId: a.getProperty("/taxId"),
									b_Codes: a.getProperty("/bCode"),
									bpNummr: a.getProperty("/bpNummr")
								}, {
									id: "",
									returnReqNum: "",
									zipCode: "",
									refDocNum: a.getProperty("/refDocNum"),
									email: "",
									salesDocument: "",
									partnerRole: "RG",
									name1: a.getProperty("/partnerName"),
									name2: "",
									name3: "",
									name4: a.getProperty("/partnerName4"),
									street2: a.getProperty("/AddressStreet2"),
									street3: a.getProperty("/AddressStreet3"),
									street5: a.getProperty("/AddressStreet5"),
									district: a.getProperty("/District"),
									differentCity: a.getProperty("/DifferentCity"),
									postalCode: a.getProperty("/postalCode"),
									city: a.getProperty("/city"),
									region: a.getProperty("/invRegion"),
									country: a.getProperty("/invCountry"),
									language: a.getProperty("/invLanguage"),
									telephone: a.getProperty("/telephone"),
									mobilePhone: a.getProperty("/mobileNumber"),
									taxId: a.getProperty("/taxId"),
									b_Codes: a.getProperty("/bCode"),
									bpNummr: a.getProperty("/bpNummr")
								}];
								b.exchange.address = O
							}
						}
					}
				} else {
					if (this.getView().getModel("baseModel").getProperty("/exchangeTabVisiblity") === true) {
						sap.m.MessageBox.information(this.resourceBundle.getText("discardExchangeItems"), {
							actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
							onClose: function (oEvent) {
								if (oEvent === t.Action.OK) {
									e.getView().getModel("baseModel").setProperty("/exchangeTabVisiblity", false);
									e._continueSubmit();
								} else {
									return;
								}
							}
						});
						return;
					}
				}

			} else {
				if (this.getView().getModel("baseModel").getProperty("/exchangeTabVisiblity") === true) {
					sap.m.MessageBox.information(this.resourceBundle.getText("discardExchangeItems"), {
						actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
						onClose: function (oEvent) {
							if (oEvent === t.Action.OK) {
								e.getView().getModel("baseModel").setProperty("/exchangeTabVisiblity", false);
								e._continueSubmit();
							} else {
								return;
							}
						}
					});
					return;
				}
			}
			if (this.getView().getModel("returnModel").getData().attachmentObject.length > 0) {
				var l = [];
				var Q = this.getView().getModel("returnModel").getData().attachmentObject;
				for (var C = 0; C < Q.length; C++) {
					var G = {
						docName: Q[C].fileName,
						docType: Q[C].fileType,
						docData: Q[C].fileDoc
					};
					l.push(G)
				}
				b.returns.attachment = l
			}
			var k = {
				"Content-Type": "application/json;charset=utf-8"
			};
			var J = new sap.m.BusyDialog;
			J.open();
			var H = new sap.ui.model.json.JSONModel;
			H.loadData("/DKSHJavaService/returnRequestAsync/createReturnRequest", JSON.stringify(b), true, "POST", false, false, k);
			H.attachRequestCompleted(function (t) {
				J.close();
				if (e.address) {
					e.address.close();
				}
				if (sap.ui.getCore().getModel("saveDraft")) {
					sap.ui.getCore().getModel("saveDraft").setData("")
				}
				if (t.getSource().getData().status) {
					var r = t.getSource().getData().status.split(" ")[1];
					e.oDefaultDialog = new sap.m.Dialog({
						type: sap.m.DialogType.Message,
						title: "Success",
						content: [new sap.m.Text({
							text: " " + t.getSource().getData().status + "."
						}), new sap.m.Text({
							text: " " + e.resourceBundle.getText("Fordetailsclick")
						}), new sap.m.Link({
							text: r,
							target: "_top",
							press: function (t) {
								e._wizard.discardProgress(e._wizard.getSteps()[0]);
								e._discardChanges();
								var o = {
									orderNO: r
								};
								var s = new sap.ui.model.json.JSONModel(o);
								sap.ui.getCore().setModel(s, "submitRequest");
								var i = sap.ui.core.UIComponent.getRouterFor(e);
								i.navTo("DraftRecord")
							}
						})],
						beginButton: new sap.m.Button({
							text: e.resourceBundle.getText("OK"),
							press: function () {
								e._wizard.discardProgress(e._wizard.getSteps()[0]);
								e._discardChanges();
								var t = sap.ui.core.UIComponent.getRouterFor(e);
								t.navTo("DraftRecord")
							}.bind(e)
						}),
						endButton: new sap.m.Button({
							text: e.resourceBundle.getText("Close"),
							press: function () {
								e._wizard.discardProgress(e._wizard.getSteps()[0]);
								e._discardChanges();
								var t = sap.ui.core.UIComponent.getRouterFor(e);
								t.navTo("DraftRecord")
							}.bind(e)
						})
					});
					e.getView().addDependent(e.oDefaultDialog);
					e.oDefaultDialog.open()
				}

			});
			H.attachRequestFailed(function (e) {
				J.close();
				t.error(e.getParameters().responseText)
			})
		},
		onExit: function () {
			if (this.SoldtoParty) {
				this.SoldtoParty.destroy()
			}
			if (sap.ui.getCore().byId("homeBtn")) {
				sap.ui.getCore().byId("homeBtn").detachPress();
				sap.ui.getCore().byId("homeBtn").attachPress(function (e) {
					var t = sap.ushell.Container.getService("CrossApplicationNavigation");
					t.toExternal({
						target: {
							shellHash: "#"
						}
					})
				})
			}
			this._discardChanges();
		}
	})
});