sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"../model/formatter",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/ui/core/format/DateFormat",
	"sap/ui/model/Sorter"
], function (Controller, MessageBox, formatter, MessageToast, Fragment, DateFormat, Sorter) {
	"use strict";

	return Controller.extend("incture.com.ConnectClient_ReturnCreate.controller.Selection", {
		formatter: formatter,
		onInit: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.attachRoutePatternMatched(this._handleRouteMatched, this);
			/*			this.getRouter("Selection").attachRoutePatternMatched(this._handleRouteMatched, this);*/
			var that = this;
			this.selectedRetObjects = [];
			this.returnItems = [];
			this.returnConditions = [];
			this.exchangeItems = [];
			this.exchangeConditions = [];
			this.selectedObjects = [];
			var attachmentObject = [];
			var exchangeModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(exchangeModel, "exchangeModel");
			var exchangePreviewModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(exchangePreviewModel, "exchangePreviewModel");
			this.getView().byId("RotypeSegementedBtnID").setEnabled(true);
			var returnPreviewModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(returnPreviewModel, "returnPreviewModel");
			var returnModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(returnModel, "returnModel");
			this.getView().getModel("returnModel").setProperty("/attachmentObject", attachmentObject);
			var baseModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(baseModel, "baseModel");
			var baseModel = this.getView().getModel("baseModel");
			var invoiceSearchModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(invoiceSearchModel, "invoiceSearchModel");
			var PersonalizationModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(PersonalizationModel, "PersonalizationModel");
			baseModel.setProperty("/step1Validation", false);
			baseModel.setProperty("/step2Validation", false);
			baseModel.setProperty("/enableReturnReason", true);
			this._wizard = this.byId("ID_WIZARD_RETURN");
			this._oNavContainer = this.byId("ID_RETURN_NAVCON");
			this._oWizardContentPage = this.byId("ID_RETURN_PAGE");
			baseModel.setProperty("/cancelBtnVisiblitys", true);
			baseModel.setProperty("/submitBtnVisiblitys", false);
			baseModel.setProperty("/previewBtnVisiblitys", false);
			baseModel.setProperty("/exchangeBtnVisiblitys", false);
			baseModel.setProperty("/saveAsDraftBtnVisiblitys", false);
			baseModel.setProperty("/addressVisiblity", false);
			baseModel.setProperty("/salesOrgEditable", true);
			baseModel.setProperty("/distChnlEditable", true);
			baseModel.setProperty("/attachmentTableVisiblity", false);
			baseModel.setProperty("/exchangeTabVisiblity", false);
			baseModel.setProperty("/smsInputVisiblity", false);
			baseModel.setProperty("/emailInputVisiblity", false);
			baseModel.setProperty("/commentsLength", 2);
			baseModel.setProperty("/tableSelMode", "MultiSelect");
			baseModel.setProperty("/attachmentLength", 0);
			baseModel.setProperty("/visiblityROTypeSel", true);
			baseModel.getProperty("/EXOneTimeCustomer", "");
			baseModel.setProperty("/enableAddAttachment", true);
			baseModel.setProperty("/enableViewAttachment", false);
			baseModel.setProperty("/attachmentVisiblity", true);
			baseModel.setProperty("/retDivEditablity", true);
			baseModel.setProperty("/retSalesOrgEditablity", true);
			baseModel.setProperty("/retDistChnlEditablity", true);
			this.getView().getModel("invoiceSearchModel").setProperty("/billingCategory", "C");
			this.getView().getModel("invoiceSearchModel").setProperty("/billingCategoryDesc", "Commercial Invoice");
			this.getView().getModel("baseModel").setProperty("/addressFieldEnable", true);
			this.getView().getModel("baseModel").setProperty("/EXaddressVisiblity", false);
			// if(this.discard)
			this._getUser();
			this.selectedReturnItems = [];
			that.salesOrgDataAccess = "No Access";
			that.SLOCDataAccess = "No Access";
			that.distrChannelDataAccess = "No Access";
			that.divisionDataAccess = "No Access";
			that.materialGroupDataAccess = "No Access";
			that.materialGroup4DataAccess = "No Access";
			that.plantDataAccess = "No Access";
			this.ranOnce = false;
			// this.startDateRange = 4;
			// this.endDateRange = 3;
			if (sap.ui.getCore().getConfiguration().getLanguage() === "en-US") {

				baseModel.setProperty("/language", "TH");
			} else {
				baseModel.setProperty("/language", sap.ui.getCore().getConfiguration().getLanguage());
			}
			baseModel.setProperty("/languageID", "E");
			baseModel.setProperty("/invoiceTableLength", "");
			baseModel.setProperty("/returnTableLength", "");
			baseModel.setProperty("/exchangeTableLength", "");
			baseModel.setProperty("/disableSoldToParty", true);
			this.getOwnerComponent().getService("ShellUIService").then(function (oShellService) {
				oShellService.setBackNavigation(function () {
					that._discardChanges();
					var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
					var oHistory = sap.ui.core.routing.History.getInstance(),
						sPreviousHash = oHistory.getPreviousHash(),
						oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
					if (sPreviousHash !== undefined) { // The history contains a previous entry 
						history.go(-1);
					} else { // Navigate back to FLP home 
						oCrossAppNavigator.toExternal({
							target: {
								shellHash: "#"
							}
						});
					}
				});
			});
			baseModel.setProperty("/InvCollapseVisiblity", true);
			baseModel.setProperty("/InvOpenVisiblity", false);
			baseModel.setProperty("/InvSearchBar", true);
			baseModel.setProperty("/ExcCollapseVisiblity", true);
			baseModel.setProperty("/ExcOpenVisiblity", false);
			baseModel.setProperty("/ExcSearchBar", true);
			baseModel.setProperty("/PrevCollapseVisiblity", true);
			baseModel.setProperty("/PrevopenVisiblity", false);
			baseModel.setProperty("/PrevSearchBar", true);
			baseModel.setProperty("/RetCollapseVisiblity", true);
			baseModel.setProperty("/RetOpenVisiblity", false);
			baseModel.setProperty("/ReturnSeacrhBar", true);
			baseModel.setProperty("/EXOneTimeCustomer", "");
			baseModel.setProperty("/oneTimeCustomer", "");
		},

		onPressInvCollapse: function () {
			this.getView().getModel("baseModel").setProperty("/InvCollapseVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/InvOpenVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/InvSearchBar", false);
		},

		onPressInvOpen: function () {
			this.getView().getModel("baseModel").setProperty("/InvCollapseVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/InvOpenVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/InvSearchBar", true);
		},

		onPressRetCollapse: function () {
			this.getView().getModel("baseModel").setProperty("/RetCollapseVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/RetOpenVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/ReturnSeacrhBar", false);
		},

		onPressRetOpen: function () {
			this.getView().getModel("baseModel").setProperty("/RetCollapseVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/RetOpenVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/ReturnSeacrhBar", true);
		},

		onPressExCollapse: function () {
			this.getView().getModel("baseModel").setProperty("/ExcCollapseVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/ExcOpenVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/ExcSearchBar", false);
		},

		onPressExOpen: function () {
			this.getView().getModel("baseModel").setProperty("/ExcCollapseVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/ExcOpenVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/ExcSearchBar", true);
		},

		onPressPreCollapse: function () {
			this.getView().getModel("baseModel").setProperty("/PrevCollapseVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/PrevopenVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/PrevSearchBar", false);
		},

		onPressPreOpen: function () {
			this.getView().getModel("baseModel").setProperty("/PrevCollapseVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/PrevopenVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/PrevSearchBar", true);
		},

		OnPressSelectionNv: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("DraftRecord", true);
		},

		// nav from records page to details on select of a record
		_handleRouteMatched: function () {
			var that = this;
			var baseModel = that.getView().getModel("baseModel");
			if (sap.ui.getCore().getModel("globalModel").getProperty("/phone")) {
				baseModel.setProperty("/phone", sap.ui.getCore().getModel("globalModel").getProperty("/phone"));
			} else {
				baseModel.setProperty("/phone", "");
			}
			if (sap.ui.getCore().getModel("draftItemModel") === undefined || sap.ui.getCore().getModel("draftItemModel").getData() === "") {
				baseModel.setProperty("/tableSelMode", "MultiSelect");
				baseModel.setProperty("/step1Validation", false);
				baseModel.setProperty("/step2Validation", false);
				baseModel.setProperty("/step3Validation", false);
				// if(!this.discard)
				this._getUser();
				return;
			}
			var oBusyDialog = new sap.m.BusyDialog();
			oBusyDialog.open();
			var data = sap.ui.getCore().getModel("draftItemModel").getData();
			// this.getView().getModel("baseModel").setProperty("/phone",data.phone);
			var sUrl = "/DKSHJavaService/returnRequest/getByReturnReqNum/" + data.returnReqNum + "&" + sap.ui.getCore().getModel("globalModel")
				.getProperty("/userId") + "&cc";
			var oModel = new sap.ui.model.json.JSONModel();
			var that = this;
			oModel.loadData(sUrl, true, "GET", false, false);
			oModel.attachRequestCompleted(function (oEvent) {
				oBusyDialog.close();

				that.editDraftData = oEvent.getSource().getData();
				var editDraftModel = new sap.ui.model.json.JSONModel({
					"results": that.editDraftData
				});
				that.getView().setModel(editDraftModel, "editDraftModel");
				that._setDraftData(that.editDraftData.docVersion);
				baseModel.setProperty("/step1Validation", true);
				baseModel.setProperty("/step2Validation", true);
				baseModel.setProperty("/step3Validation", true);
				baseModel.setProperty("/step4Validation", true);
			});
			oModel.attachRequestFailed(function (oEvent) {
				sap.m.MessageToast.show("Error");
				oBusyDialog.close();
			});
		},

		// set record detail data to models and tables
		_setDraftData: function (docVersion) {
			this.docVersion = docVersion;
			var baseModel = this.getView().getModel("baseModel");
			if (this.docVersion === "SUCCESS") {
				baseModel.setProperty("/visiblityROTypeSel", false);

				baseModel.setProperty("/enableAddAttachment", false);
				baseModel.setProperty("/enableViewAttachment", true);
				this.getView().byId("RotypeSegementedBtnID").setEnabled(false);
				baseModel.setProperty("/enableReturnReason", false);
				baseModel.setProperty("/custSelFormEditablity", false);
				baseModel.setProperty("/InvoiceNoIP", false);
				baseModel.setProperty("/InvMat", false);
				baseModel.setProperty("/InvBatNo", false);
				baseModel.setProperty("/InvSrlIP", false);
				baseModel.setProperty("/InvSrlChbx", false);
				baseModel.setProperty("/InvBillCat", false);
				baseModel.setProperty("/InvDateFrom", false);
				baseModel.setProperty("/InvDateTo", false);
				baseModel.setProperty("/datePrev", false);
				baseModel.setProperty("/dateNext", false);
				baseModel.setProperty("/InvSrch", false);
				baseModel.setProperty("/InvReset", false);
				baseModel.setProperty("/salesOrgEditable", false);
				baseModel.setProperty("/distChnlEditable", false);
				baseModel.setProperty("/disableSoldToParty", false);
				baseModel.setProperty("/billingTypeEnable", false);
				baseModel.setProperty("/InvSetting", false);
				baseModel.setProperty("/InvNext", false);
				baseModel.setProperty("/selRoTypeEdit", false);
				baseModel.setProperty("/CopyExcbtn", false);
				baseModel.setProperty("/RetUndo", false);
				baseModel.setProperty("/RetDel", false);
				baseModel.setProperty("/RetRemarkEnable", false);
				baseModel.setProperty("/RetAddFileEnable", false);
				baseModel.setProperty("/RetEmailChbxEnable", false);
				baseModel.setProperty("/RetEmailIPEnable", false);
				baseModel.setProperty("/RetSmsChbx", false);
				baseModel.setProperty("/RetPhNoIP", false);
				baseModel.setProperty("/RetReasonOwnerEnable", false);
				baseModel.setProperty("/RetRefNo", false);
				baseModel.setProperty("/RetRequestor", false);
				baseModel.setProperty("/exShipToEnable", false);
				baseModel.setProperty("/ExRemarkEnable", false);
				baseModel.setProperty("/enableAddMat", false);
				baseModel.setProperty("/enableExDel", false);
				baseModel.setProperty("/enableExUndo", false);
				baseModel.setProperty("/enableCompltDel", false);
				baseModel.setProperty("/saveAsDraftBtnVisiblitys", false);
				baseModel.setProperty("/previewBtnVisiblitys", false);
				baseModel.setProperty("/submitBtnVisiblitys", false);
				baseModel.setProperty("/attachmentDelEnable", false);
				baseModel.setProperty("/tableSelMode", "None");
				baseModel.refresh();
			} else {
				baseModel.setProperty("/visiblityROTypeSel", true);
				baseModel.setProperty("/enableAddAttachment", true);
				baseModel.setProperty("/enableViewAttachment", false);
				this.getView().byId("RotypeSegementedBtnID").setEnabled(true);
				baseModel.setProperty("/tableSelMode", "MultiSelect");
				baseModel.setProperty("/enableReturnReason", true);
				baseModel.setProperty("/custSelFormEditablity", true);
				baseModel.setProperty("/InvoiceNoIP", true);
				baseModel.setProperty("/InvMat", true);
				baseModel.setProperty("/InvBatNo", true);
				baseModel.setProperty("/InvSrlIP", true);
				baseModel.setProperty("/InvSrlChbx", true);
				baseModel.setProperty("/InvBillCat", true);
				baseModel.setProperty("/InvDateFrom", true);
				baseModel.setProperty("/InvDateTo", true);
				baseModel.setProperty("/datePrev", true);
				baseModel.setProperty("/dateNext", true);
				baseModel.setProperty("/billingTypeEnable", true);
				baseModel.setProperty("/InvSrch", true);
				baseModel.setProperty("/InvReset", true);
				baseModel.setProperty("/salesOrgEditable", true);
				baseModel.setProperty("/distChnlEditable", true);
				baseModel.setProperty("/disableSoldToParty", true);
				baseModel.setProperty("/InvSetting", true);
				baseModel.setProperty("/InvNext", true);
				baseModel.setProperty("/selRoTypeEdit", true);
				baseModel.setProperty("/CopyExcbtn", true);
				baseModel.setProperty("/RetSetting", true);
				baseModel.setProperty("/RetUndo", true);
				baseModel.setProperty("/RetDel", true);
				baseModel.setProperty("/RetRemarkEnable", true);
				baseModel.setProperty("/RetAddFileEnable", true);
				baseModel.setProperty("/RetEmailChbxEnable", true);
				baseModel.setProperty("/RetEmailIPEnable", true);
				baseModel.setProperty("/RetSmsChbx", true);
				baseModel.setProperty("/RetPhNoIP", true);
				baseModel.setProperty("/RetReasonOwnerEnable", true);
				baseModel.setProperty("/RetRefNo", true);
				baseModel.setProperty("/RetRequestor", true);
				baseModel.setProperty("/exShipToEnable", true);
				baseModel.setProperty("/ExRemarkEnable", true);
				baseModel.setProperty("/enableAddMat", true);
				baseModel.setProperty("/enableExDel", true);
				baseModel.setProperty("/enableExUndo", true);
				baseModel.setProperty("/enableExSetting", true);
				baseModel.setProperty("/enableCompltDel", true);
				baseModel.setProperty("/saveAsDraftBtnVisiblitys", true);
				baseModel.setProperty("/previewBtnVisiblitys", true);
				baseModel.setProperty("/submitBtnVisiblitys", true);
				baseModel.setProperty("/attachmentDelEnable", true);
			}
			var that = this;
			baseModel.setProperty("/step1Validation", true);
			baseModel.setProperty("/step2Validation", true);
			baseModel.setProperty("/step3Validation", true);
			var editDraftModel = this.getView().getModel("editDraftModel");
			var returnItems = this.getView().getModel("editDraftModel").getData().results.listItemDto;
			var invoiceSearchModel = this.getView().getModel("invoiceSearchModel");
			var returnModel = this.getView().getModel("returnModel");
			var exchangeModel = this.getView().getModel("exchangeModel");
			baseModel.setProperty("/billTo", editDraftModel.getData().results.billToParty);
			baseModel.setProperty("/contactDivision", editDraftModel.getData().results.contactDivision);
			baseModel.setProperty("/contactPerson", editDraftModel.getData().results.contactPerson);
			baseModel.setProperty("/contactTelephone", editDraftModel.getData().results.contactTelephone);
			baseModel.setProperty("/DistChan", editDraftModel.getData().results.distributionChannel);
			invoiceSearchModel.setProperty("/distChnlDesc", editDraftModel.getData().results.distributionChannelDesc);
			baseModel.setProperty("/selectedDivisionDesc", editDraftModel.getData().results.divisionDesc);
			if (editDraftModel.getData().results.requestorName.includes("P0000") === true) {
				baseModel.setProperty("/userName", editDraftModel.getData().results.requestorName.split("(")[1].split(")")[0]);

			} else {
				baseModel.setProperty("/userName", editDraftModel.getData().results.requestorName);
			}
			// baseModel.setProperty("/oneTimeCustomer", );
			baseModel.setProperty("/phone", "");
			invoiceSearchModel.setProperty("/salesOrgDesc", editDraftModel.getData().results.salesOrgDesc);
			baseModel.setProperty("/selectedSalesOrgDesc", editDraftModel.getData().results.salesOrgDesc);
			baseModel.setProperty("/selectedDistChlDesc", editDraftModel.getData().results.distributionChannelDesc);
			baseModel.setProperty("/selectedDistChnl", editDraftModel.getData().results.distributionChannel);
			baseModel.setProperty("/Division", editDraftModel.getData().results.division);
			baseModel.setProperty("/selectedReturnReason", editDraftModel.getData().results.orderReason + editDraftModel.getData().results.orderReasonText);
			baseModel.setProperty("/returnOrderType", editDraftModel.getData().results.orderType);
			baseModel.setProperty("/payer", editDraftModel.getData().results.payer);
			baseModel.setProperty("/reasonOwner", editDraftModel.getData().results.reasonOwner + " (" + editDraftModel.getData().results.reasonOwnerDesc +
				")");
			if (editDraftModel.getData().results.updatedBy !== null && editDraftModel.getData().results.updatedBy !== "") {
				baseModel.setProperty("/requestor", editDraftModel.getData().results.updatedBy);
			} else {
				baseModel.setProperty("/requestor", "");
			}
			baseModel.setProperty("/returnRemark", editDraftModel.getData().results.requestRemark);
			baseModel.setProperty("/selectedROTypeCode", editDraftModel.getData().results.roType);
			baseModel.setProperty("/customerPONumber", editDraftModel.getData().results.customerPo);
			if (editDraftModel.getData().results.roType === "TG" || editDraftModel.getData().results.roType === "TF") {
				baseModel.setProperty("/visiblityROTypeSel", true);
				baseModel.setProperty("/visiblityROTypeText", false);
			} else {
				baseModel.setProperty("/visiblityROTypeSel", false);
				baseModel.setProperty("/visiblityROTypeText", true);
			}

			if (editDraftModel.getData().results.oneTimeCustomer === null) {
				baseModel.setProperty("/oneTimeCustomer", "");
			} else {
				baseModel.setProperty("/oneTimeCustomer", editDraftModel.getData().results.oneTimeCustomer);
			}
			if (editDraftModel.getData().results.listAddressDo && editDraftModel.getData().results.listAddressDo.length > 0) {
				baseModel.setProperty("/partnerName", editDraftModel.getData().results.listAddressDo[0].name1);
				baseModel.setProperty("/partnerName4", editDraftModel.getData().results.listAddressDo[0].name4);
				baseModel.setProperty("/AddressStreet2", editDraftModel.getData().results.listAddressDo[0].street2);
				baseModel.setProperty("/AddressStreet3", editDraftModel.getData().results.listAddressDo[0].street3);
				baseModel.setProperty("/AddressStreet5", editDraftModel.getData().results.listAddressDo[0].street5);
				baseModel.setProperty("/District", editDraftModel.getData().results.listAddressDo[0].district);
				baseModel.setProperty("/DifferentCity", editDraftModel.getData().results.listAddressDo[0].differentCity);
				baseModel.setProperty("/postalCode", editDraftModel.getData().results.listAddressDo[0].postalCode);
				baseModel.setProperty("/refDocNum", editDraftModel.getData().results.listAddressDo[0].refDocNum);
				baseModel.setProperty("/city", editDraftModel.getData().results.listAddressDo[0].city);
				baseModel.setProperty("/telephone", editDraftModel.getData().results.listAddressDo[0].telephone);
				baseModel.setProperty("/mobileNumber", editDraftModel.getData().results.listAddressDo[0].mobilePhone);
				baseModel.setProperty("/taxId", editDraftModel.getData().results.listAddressDo[0].taxId);
				baseModel.setProperty("/bCode", editDraftModel.getData().results.listAddressDo[0].b_Codes);
				baseModel.setProperty("/bpNummr", editDraftModel.getData().results.listAddressDo[0].bpNummr);
			}

			baseModel.setProperty("/setRetAddress", editDraftModel.getData().results.listAddressDo);

			baseModel.setProperty("/returnSoldTo", editDraftModel.getData().results.soldToParty);
			baseModel.setProperty("/returnSoldToDesc", editDraftModel.getData().results.soldToPartyDesc);
			baseModel.setProperty("/returnShipTo", editDraftModel.getData().results.shipToParty);
			baseModel.setProperty("/returnShipToDesc", editDraftModel.getData().results.shipToPartyDesc);
			baseModel.setProperty("/returnPayer", editDraftModel.getData().results.payer);
			baseModel.setProperty("/returnPayerDesc", editDraftModel.getData().results.payerDesc);
			baseModel.setProperty("/returnBillTo", editDraftModel.getData().results.billToParty);
			baseModel.setProperty("/returnBillToDesc", editDraftModel.getData().results.billToDesc);

			// this.onClickROType();
			baseModel.setProperty("/selectedROType", editDraftModel.getData().results.roType);
			baseModel.setProperty("/billToDesc", editDraftModel.getData().results.billToDesc);
			baseModel.setProperty("/shipToDesc", editDraftModel.getData().results.shipToPartyDesc);
			baseModel.setProperty("/shipTo", editDraftModel.getData().results.shipToParty);
			baseModel.setProperty("/payerDesc", editDraftModel.getData().results.payerDesc);
			baseModel.setProperty("/salesOrgForRO", editDraftModel.getData().results.mappingId);
			if (editDraftModel.getData().results.requestorEmail) {
				baseModel.setProperty("/userEmailId", editDraftModel.getData().results.requestorEmail);
				baseModel.setProperty("/emailFlag", true);
				baseModel.setProperty("/emailInputVisiblity", true);
			}
			if (editDraftModel.getData().results.contactTelephone) {
				baseModel.setProperty("/phoneNum", editDraftModel.getData().results.contactTelephone);
				baseModel.setProperty("/smsInputVisiblity", true);
				baseModel.setProperty("/phoneNumFlag", true);
			}
			if (editDraftModel.getData().results.roType === "TG") {
				this.getView().byId("RotypeSegementedBtnID").setSelectedKey("TG");

			} else if (editDraftModel.getData().results.roType === "TF") {
				this.getView().byId("RotypeSegementedBtnID").setSelectedKey("TF");
				// baseModel.setProperty("/selectedROType", "UNSALABLE");
			} else if (editDraftModel.getData().results.roType === "TI") {
				this.getView().byId("RotypeSegementedBtnID").setSelectedKey("TI");
				// baseModel.setProperty("/selectedROType", "BORROW GOODS");
			} else {
				this.getView().byId("RotypeSegementedBtnID").setSelectedKey("TK");
				// baseModel.setProperty("/selectedROType", "DOC. CORRECTION");
			}
			baseModel.setProperty("/selectedROType", editDraftModel.getData().results.roTypeText);
			baseModel.setProperty("/SalesOrg", editDraftModel.getData().results.salesOrg);
			baseModel.setProperty("/selectedSalesOrg", editDraftModel.getData().results.salesOrg);
			baseModel.setProperty("/shipToParty", editDraftModel.getData().results.shipToParty);
			baseModel.setProperty("/exShipTo", editDraftModel.getData().results.shipToParty);
			baseModel.setProperty("/exchangeOrderType", editDraftModel.getData().results.exchangeOrderType);
			baseModel.setProperty("/selectedSoldtoParty", editDraftModel.getData().results.soldToParty);
			baseModel.setProperty("/selectedSoldtoPartyDesc", editDraftModel.getData().results.soldToPartyDesc);
			var order = editDraftModel.getData().results.orderReason + " (" + editDraftModel.getData().results.orderReasonText + ")";
			baseModel.setProperty("/selectedReturnReason", order);
			baseModel.setProperty("/returnReqNum", editDraftModel.getData().results.returnReqNum);
			baseModel.setProperty("/referenceNo", editDraftModel.getData().results.referenceNum);
			invoiceSearchModel.setProperty("/distChnl", editDraftModel.getData().results.distributionChannel);
			invoiceSearchModel.setProperty("/Division", editDraftModel.getData().results.division);
			invoiceSearchModel.setProperty("/salesOrgNo", editDraftModel.getData().results.salesOrg);
			invoiceSearchModel.setProperty("/shipTo", editDraftModel.getData().results.shipToParty);
			invoiceSearchModel.setProperty("/soldToParty", editDraftModel.getData().results.soldToParty);
			invoiceSearchModel.setProperty("/soldToPartyDesc", editDraftModel.getData().results.soldToPartyDesc);

			baseModel.refresh(true);
			this.getView().getModel("invoiceSearchModel").refresh(true);
			if (editDraftModel.getData().results.listAttachementDo !== null) {
				var attachmentDTO = editDraftModel.getData().results.listAttachementDo;
				var attachmentObject = [];
				for (var i = 0; i < attachmentDTO.length; i++) {
					var Object = {
						fileName: attachmentDTO[i].docName,
						fileType: attachmentDTO[i].docType,
						fileDoc: attachmentDTO[i].docData,
						compressedFile: attachmentDTO[i].docData,
						docId: attachmentDTO[i].docId
					};
					attachmentObject.push(Object);
				}
				this.getView().getModel("returnModel").setProperty("/attachmentObject", attachmentObject);
				baseModel.setProperty("/enableViewAttachment", true);
				baseModel.setProperty("/attachmentTableVisiblity", true);
			} else {
				baseModel.setProperty("/enableViewAttachment", false);
				baseModel.setProperty("/attachmentTableVisiblity", false);
			}
			//add invoice items
			var results = [];
			for (var i = 0; i < returnItems.length; i++) {
				var Invoiceitem = {
					"MaterialCode": returnItems[i].material,
					"MaterialGroup": returnItems[i].materialGroup,
					"MaterialGroup4": returnItems[i].materialGroup4,
					"BatchNumber": returnItems[i].batch,
					"ExpiryDate": returnItems[i].expiryDate,
					"BillingQty": returnItems[i].avlReturnQty.toString(),
					"SalesUnit": returnItems[i].returnUom,
					"AvailRetQtySalesUn": returnItems[i].avlReturnQty.toString(),
					"actualRetQty": returnItems[i].returnQty.toString(),
					"UnitPrice": returnItems[i].unitPriceCc.toString(),
					"ListPrice": returnItems[i].unitPriceCc.toString(),
					"DiscountAmount": "",
					"NetPrice": "",
					"itemVisibility": returnItems[i].itemVisibility.toString(),
					"storageLocation": returnItems[i].storageLocation,
					"billingDateFrom": returnItems[i].referenceInvDate,
					"ItemUsage": "",
					"SerialNum": "",
					"shipToParty": editDraftModel.getData().results.shipToParty,
					"InvoiceNum": returnItems[i].refDocNum,
					"InvoiceLineItem": returnItems[i].refDocItem,
					"HigherLvlItem": returnItems[i].higherLevel,
					"ActiveIndicator": "",
				};
				this.selectedReturnItems.push(Invoiceitem);
			}
			this._pricingSimulation(this.selectedReturnItems, "Returns");
			// set exchange data
			if (this.getView().getModel("editDraftModel").getData().results.exchangeDto !== null) {
				var exchangeItems = this.getView().getModel("editDraftModel").getData().results.exchangeDto.listExhangeItemDto;
				baseModel.setProperty("/exchangeOrderType", editDraftModel.getData().results.exchangeDto.orderType);
				baseModel.setProperty("/exchangeReqNum", editDraftModel.getData().results.exchangeDto.exchangeReqNum);
				baseModel.setProperty("/exchangeRemark", editDraftModel.getData().results.exchangeDto.requestRemark);
				baseModel.setProperty("/customerPONumberEx", editDraftModel.getData().results.exchangeDto.customerPo);
				baseModel.setProperty("/setExAddress", editDraftModel.getData().results.exchangeDto.listAddressDo);
				if (editDraftModel.getData().results.exchangeDto.exoneTimeCustomer === null) {
					baseModel.setProperty("/EXOneTimeCustomer", "");
				} else {
					baseModel.setProperty("/EXOneTimeCustomer", editDraftModel.getData().results.exchangeDto.exoneTimeCustomer);
				}
				if (editDraftModel.getData().results.exchangeDto.listAddressDo && editDraftModel.getData().results.exchangeDto.listAddressDo.length >
					0) {
					baseModel.setProperty("/EXaddressVisiblity", true);
					baseModel.setProperty("/partnerName", editDraftModel.getData().results.exchangeDto.listAddressDo[0].name1);
					baseModel.setProperty("/partnerName4", editDraftModel.getData().results.exchangeDto.listAddressDo[0].name4);
					baseModel.setProperty("/AddressStreet2", editDraftModel.getData().results.exchangeDto.listAddressDo[0].street2);
					baseModel.setProperty("/AddressStreet3", editDraftModel.getData().results.exchangeDto.listAddressDo[0].street3);
					baseModel.setProperty("/AddressStreet5", editDraftModel.getData().results.exchangeDto.listAddressDo[0].street5);
					baseModel.setProperty("/District", editDraftModel.getData().results.exchangeDto.listAddressDo[0].district);
					baseModel.setProperty("/DifferentCity", editDraftModel.getData().results.exchangeDto.listAddressDo[0].differentCity);
					baseModel.setProperty("/postalCode", editDraftModel.getData().results.exchangeDto.listAddressDo[0].postalCode);
					baseModel.setProperty("/city", editDraftModel.getData().results.exchangeDto.listAddressDo[0].city);
					baseModel.setProperty("/telephone", editDraftModel.getData().results.exchangeDto.listAddressDo[0].telephone);
					baseModel.setProperty("/mobileNumber", editDraftModel.getData().results.exchangeDto.listAddressDo[0].mobilePhone);
					baseModel.setProperty("/taxId", editDraftModel.getData().results.exchangeDto.listAddressDo[0].taxId);
					baseModel.setProperty("/bCode", editDraftModel.getData().results.exchangeDto.listAddressDo[0].b_Codes);
					baseModel.setProperty("/refDocNum", editDraftModel.getData().results.exchangeDto.listAddressDo[0].refDocNum);
					baseModel.setProperty("/bpNummr", editDraftModel.getData().results.exchangeDto.listAddressDo[0].bpNummr);
				}
				baseModel.setProperty("/exSoldTo", editDraftModel.getData().results.exchangeDto.soldToParty);
				baseModel.setProperty("/exSoldToDesc", editDraftModel.getData().results.exchangeDto.soldToPartyDesc);
				baseModel.setProperty("/exShipTo", editDraftModel.getData().results.exchangeDto.shipToParty);
				baseModel.setProperty("/exShipToDesc", editDraftModel.getData().results.exchangeDto.shipToPartyDesc);
				baseModel.setProperty("/exPayer", editDraftModel.getData().results.exchangeDto.payer);
				baseModel.setProperty("/exPayerDesc", editDraftModel.getData().results.exchangeDto.payerDescription);
				baseModel.setProperty("/exBillTo", editDraftModel.getData().results.exchangeDto.billToParty);
				baseModel.setProperty("/exBillToDesc", editDraftModel.getData().results.exchangeDto.billToPartyDesc);
				var Items = [];
				for (var j = 0; j < exchangeItems.length; j++) {
					if (editDraftModel.getData().results.roType === "TI") {

					}
					if (exchangeItems[j].manualFoc === null) {
						exchangeItems[j].manualFoc = "";
					}
					var item = {
						"itemNumber": "",
						"matNumber": exchangeItems[j].material,
						"itemShortText": exchangeItems[j].shortText,
						"materialGroup": exchangeItems[j].materialGroup,
						"materialGroup4": exchangeItems[j].materialGroup4,
						"quantity": exchangeItems[j].returnQty.toString(),
						"salesUnit": exchangeItems[j].returnUom,
						"unitPrice": exchangeItems[j].unitPriceCc.toString(),
						"unitPriceInv": exchangeItems[j].unitPriceCc.toString(),
						"discountAmount": "",
						"netAmount": "",
						"listPrice": "",
						"storageLocation": exchangeItems[j].storageLocation,
						"higherItem": exchangeItems[j].higherLevel,
						"batchNumber": exchangeItems[j].batch,
						"expiryDate": exchangeItems[j].expiryDate,
						"billingDate": exchangeItems[j].referenceInvDate,
						"refInvoice": exchangeItems[j].refDocNum,
						"refItemNumber": exchangeItems[j].refDocItem,
						"serialNumber": exchangeItems[j].serialNum,
						"active": "",
						"manualFoc": exchangeItems[j].manualFoc,
						"itemVisibility": exchangeItems[j].itemVisibility.toString(),
					};
					Items.push(item);
				}
				this._pricingSimulation(Items, "Exchange");
			}
			baseModel.setProperty("/step1Validation", true);
			baseModel.setProperty("/step2Validation", true);
			baseModel.setProperty("/step3Validation", true);
			this._getUser();
		},
		// nav back confirmation popup when clicked on home btn in launchpad
		onAfterRendering: function () {
			this.resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			var e = this;
			// var t = false;
			// if (this.ranOnce === true) {} else {
			// 	// attach event to launchpad home btn
			// 	if (sap.ui.getCore().byId("homeBtn")) {
			// 		sap.ui.getCore().byId("homeBtn").attachPress(function (e) {
			// 			// prevent from navigating to home btn
			// 			event.preventDefault();
			// 			if (location.hash.includes("Selection")) {

			// 				if (t === false) {
			// 					sap.m.MessageBox.information(this.resourceBundle.getText("homePageValidation"), {
			// 						actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
			// 						initialFocus: sap.m.MessageBox.Action.NO,
			// 						onClose: function (e) {
			// 							if (e === "YES") {
			// 								t = true;
			// 								var r = sap.ushell.Container.getService("CrossApplicationNavigation");
			// 								r.toExternal({
			// 									// navigation to home page
			// 									target: {
			// 										shellHash: "#"
			// 									}
			// 								});
			// 							} else {
			// 								t = true;
			// 								var router = sap.ui.core.UIComponent.getRouterFor(this);
			// 								router.navTo("Selection");
			// 								// event.preventDefault()
			// 							}
			// 						}
			// 					}, this);
			// 				}
			// 			}
			// 			// else{}
			// 		});
			// 	}
			// }
			// this.ranOnce = true;
			if (e.editDraftData) {
				var r = new sap.ui.model.json.JSONModel({
					results: e.editDraftData
				})
			}

		},

		_getUser: function () {
			var that = this;
			var oUserDetailModel = new sap.ui.model.json.JSONModel();
			that.getView().setModel(oUserDetailModel, "oUserDetailModel");
			oUserDetailModel.loadData("/services/userapi/attributes", null, true);
			oUserDetailModel.attachRequestCompleted(function (oEvent) {
				that.getView().getModel("baseModel").setProperty("/email", that.getView().getModel("oUserDetailModel").getData().email);
				var userId = that.getView().getModel("oUserDetailModel").getData().name;
				if (userId) {
					that._getLoggedInUserDetails(userId);
				}
				// that._getLoggedInUserDetails1(userId); //Method to get Logged in user PID
			});
			oUserDetailModel.attachRequestFailed(function (oEvent) {
				MessageBox.error(oEvent.getSource().getData().message);
			});
		},

		// _getLoggedInUserDetails1: function (userId) {
		// 	var that = this;
		// 	var oModel = new sap.ui.model.json.JSONModel();
		// 	that.getView().setModel(oModel, "oModel");
		// 	var busyDialog = new sap.m.BusyDialog();
		// 	busyDialog.open();
		// 	oModel.loadData("/DKSHJavaService/userDetails/findAllRightsForUserInDomain/" + userId + "&cc", null, true);
		// 	oModel.attachRequestCompleted(function (data) {
		// 		busyDialog.close();
		// 		if (!data.getParameters().errorobject) {
		// 			var custAttribute = data.getSource().getData();
		// 			if (custAttribute.message)
		// 				that.allAccess = false;
		// 			// var custAttribute = data.getSource().getData();
		// 			if (custAttribute.ATR01 !== null) {
		// 				that.salesOrgDataAccess = custAttribute.ATR01;

		// 			}
		// 			if (custAttribute.ATR02 !== null) {
		// 				that.distrChannelDataAccess = custAttribute.ATR02;
		// 				// that._distChannelList();
		// 			}
		// 			if (custAttribute.ATR03 !== null) {
		// 				that.divisionDataAccess = custAttribute.ATR03;
		// 			}
		// 			if (custAttribute.ATR04 !== null) {
		// 				that.materialGroupDataAccess = custAttribute.ATR04;
		// 			}
		// 			if (custAttribute.ATR05 !== null) {
		// 				that.materialGroup4DataAccess = custAttribute.ATR05;
		// 			}
		// 			if (custAttribute.ATR10 !== null) {
		// 				that.SLOCDataAccess = custAttribute.ATR10;
		// 			}
		// 			if (custAttribute.ATR09 !== null) {
		// 				that.plantDataAccess = custAttribute.ATR09;
		// 			}
		// 			if (custAttribute.ATR07 !== null) {
		// 				that.materialDataAccess = custAttribute.ATR07;
		// 			}
		// 			if (custAttribute.ATR08 !== null) {
		// 				that.orderTypeDataAccess = custAttribute.ATR08;
		// 			}
		// 		}
		// 		// else {

		// 		// 	sap.m.MessageBox.error(data.getParameters().errorobject.responseText);
		// 		// }
		// 	});
		// 	oModel.attachRequestFailed(function (oEvent) {
		// 		busyDialog.close();
		// 		// if (oEvent.status == 409)
		// 		that.allAccess = false;
		// 		// else
		// 		sap.m.MessageBox.error(oEvent.getParameters().responseText);
		// 	});

		// },

		_getLoggedInUserDetails: function (e) {
			var that = this;
			var o = new sap.ui.model.json.JSONModel;
			that.getView().setModel(o, "oLoggedInUserDetailModel");
			o.loadData("/UserManagement/service/scim/Users/" + e, null, true);
			o.attachRequestCompleted(function (e) {
				that.getView().getModel("baseModel").setProperty("/userId", e.getSource().getData().id);
				that.getView().getModel("baseModel").setProperty("/userName", e.getSource().getData().displayName);
				// if (e.getSource().getData().phoneNumbers !== undefined) {
				// 	r.getView().getModel("baseModel").setProperty("/phone", e.getSource().getData().phoneNumbers[0].value)
				// }
			});
			o.attachRequestFailed(function (e) {
				// that.error(e.getSource().getData().message)
			});
			var i = new sap.ui.model.json.JSONModel;
			that.getView().setModel(i, "oModel");
			var a = new sap.m.BusyDialog;
			a.open();
			i.loadData("/DKSHJavaService/userDetails/findAllRightsForUserInDomain/" + e + "&cc", null, true);
			i.attachRequestCompleted(function (e) {
				a.close();
				if (!e.getParameters().errorobject) {
					var custAttribute = e.getSource().getData();
					if (custAttribute.message)
						that.allAccess = false;
					if (custAttribute.ATR01 !== null) {
						that.salesOrgDataAccess = custAttribute.ATR01;
						// that._salesOrgList()
					}
					if (custAttribute.ATR02 !== null) {
						that.distrChannelDataAccess = custAttribute.ATR02;
						// that._distChannelList()
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
					if (custAttribute.ATR06 !== null) {
						that.custCodeDataAccess = custAttribute.ATR06;
					}
					if (custAttribute.ATR07 !== null) {
						that.materialDataAccess = custAttribute.ATR07;
					}
				}
				that._getRoTypeList();
				that._salesOrgList();
				that._distChannelList();
			});
			i.attachRequestFailed(function (e) {
				a.close();
				that.allAccess = false;
			});
		},

		onCompleteStep2: function () {
			if (!this.invoiceDetail) {
				this.invoiceDetail = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.InvoiceDetail", this);
				this.getView().addDependent(this.invoiceDetail);
			}
			var screen = "Web";
			if (sap.ui.Device.system.phone === true) {
				screen = "Phone";
			}
			var payload = {
				"userId": this.getView().getModel("baseModel").getProperty("/userId"),
				"appId": "keyInvoice",
				"runType": screen
			};
			this._getPersonalizationDetails("keyInvoice", "Before");
		},
		// check the serial no checkbox in invoice search header
		selectSerialCheckbox: function (oEvent) {
			var flag = oEvent.getSource().getSelected();
			if (flag === false) {
				this.getView().getModel("invoiceSearchModel").setProperty("/selectedSerialNum", false);
				this.getView().getModel("invoiceSearchModel").setProperty("/displayBySno", undefined);
			} else {
				this.getView().getModel("invoiceSearchModel").setProperty("/selectedSerialNum", true);
				this.getView().getModel("invoiceSearchModel").setProperty("/displayBySno", "X");
			}
			this.getView().getModel("invoiceSearchModel").refresh();
		},

		onPressRemarks: function () {
			if (this.docVersion === "SUCCESS") {} else {
				var that = this;
				if (!that.Remark) {
					that.Remark = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.Remark", this);
					that.getView().addDependent(that.Remark);
					that.Remark.addStyleClass("sapUiSizeCompact");
				}
				if (this.getView().byId("ID_TAB_BAR_PROV_APP").getSelectedKey() === "Exchange" && this.ROtypeCode === "TI") {
					var baseModel = this.getView().getModel("baseModel");
					if (baseModel.getProperty("/comment") === "") {
						baseModel.setProperty("/comment", "ไม่ต้องส่งของ หรือ ส่งของเพิ่มบางส่วน");
					}
				}

				that.Remark.open();
			}
		},

		onOKRemark: function () {
			// this.onPressViewRemark();
			var baseModel = this.getView().getModel("baseModel");

			if ((baseModel.getProperty("/comment") === undefined || baseModel.getProperty("/comment") === "") &&
				(baseModel.getProperty("/contactTelephone") === undefined || baseModel.getProperty("/contactTelephone") === "") &&
				(baseModel.getProperty("/contactDivision") === undefined || baseModel.getProperty("/contactDivision") === "") &&
				(baseModel.getProperty("/contactPerson") === undefined || baseModel.getProperty("/contactPerson") === "") &&
				(baseModel.getProperty("/remark") === undefined || baseModel.getProperty("/remark") === "")) {
				MessageBox.information(this.resourceBundle.getText("Enterthemadatoryfields"));
				// MessageBox.information("Enter the madatory fields");
			} else {
				var baseModel = this.getView().getModel("baseModel");
				var remark = "";
				if (this.getView().byId("ID_TAB_BAR_PROV_APP").getSelectedKey() === "Return") {
					if (this.ROtypeCode === "TI") {
						var thaiText = "ไม่ต้องส่งของ เคลียร์ใบส่งของชั่วคราว" + " ";
						var returnItems = this.getView().getModel("returnModel").getProperty("/results");
						for (var i = 0; i < returnItems.length; i++) {

							if (i === returnItems.length - 1) {
								if (!thaiText.includes(returnItems[i].refInvoice)) {
									thaiText = thaiText + returnItems[i].refInvoice + " " + "ส่งบิลที่แผนก ";
								} else {
									thaiText = thaiText + " " + "ส่งบิลที่แผนก ";
								}
							} else {
								if (!thaiText.includes(returnItems[i].refInvoice)) {
									thaiText = thaiText + returnItems[i].refInvoice + ", ";
								}
							}
						}
						if (baseModel.getProperty("/contactDivision") !== undefined && baseModel.getProperty("/contactDivision") !== "") {
							thaiText = thaiText + " " + baseModel.getProperty("/contactDivision") + "ติดต่อ";
						} else {
							MessageToast.show(this.resourceBundle.getText("Contactdivisionmandatory"));
							// MessageToast.show("Contact division mandatory");
							return;
						}
						if (baseModel.getProperty("/contactPerson") !== undefined && baseModel.getProperty("/contactPerson") !== "") {
							thaiText = thaiText + " " + baseModel.getProperty("/contactPerson");
						} else {
							MessageToast.show(this.resourceBundle.getText("Contactpersonmandatory"));
							// MessageToast.show("Contact person mandatory");
							return;
						}

						if (baseModel.getProperty("/contactTelephone") !== undefined && baseModel.getProperty("/contactTelephone") !== "") {
							thaiText = thaiText + " " + "Tel" + " " + baseModel.getProperty("/contactTelephone");
						} else {
							MessageToast.show(this.resourceBundle.getText("ContactTelephonemandatory"));
							// MessageToast.show("Contact Telephone mandatory");
							return;
						}
						if (baseModel.getProperty("/comment") !== undefined && baseModel.getProperty("/comment") !== "") {
							thaiText = thaiText + " " + baseModel.getProperty("/comment");
						}
					} else if (this.ROtypeCode === "TK") {
						var thaiText = "ใช้แทนบิล";
						var returnItems = this.getView().getModel("returnModel").getProperty("/results");
						for (var i = 0; i < returnItems.length; i++) {

							if (i === returnItems.length - 1) {
								if (!thaiText.includes(returnItems[i].refInvoice)) {
									thaiText = thaiText + returnItems[i].refInvoice + " " + "ไม่ต้องส่งของ แก้ไขเนื่องจาก" + " " + this.getView().getModel(
										"baseModel").getProperty("/selectedReturnReason") + "ส่งบิลที่";
								} else {
									thaiText = thaiText + " " + "ไม่ต้องส่งของ แก้ไขเนื่องจาก" + " " + this.getView().getModel(
										"baseModel").getProperty("/selectedReturnReason") + "ส่งบิลที่";
								}
							} else {
								if (!thaiText.includes(returnItems[i].refInvoice)) {
									thaiText = thaiText + returnItems[i].refInvoice + ", ";
								}
							}
						}
						if (baseModel.getProperty("/contactDivision") !== undefined && baseModel.getProperty("/contactDivision") !== "") {
							thaiText = thaiText + " " + baseModel.getProperty("/contactDivision") + "ติดต่อ";
						} else {
							MessageToast.show(this.resourceBundle.getText("Contactdivisionmandatory"));
							// MessageToast.show("Contact division mandatory");
							return;
						}
						if (baseModel.getProperty("/contactPerson") !== undefined && baseModel.getProperty("/contactPerson") !== "") {
							thaiText = thaiText + " " + baseModel.getProperty("/contactPerson");
						} else {
							MessageToast.show(this.resourceBundle.getText("Contactpersonmandatory"));
							// MessageToast.show("Contact person mandatory");
							return;
						}

						if (baseModel.getProperty("/contactTelephone") !== undefined && baseModel.getProperty("/contactTelephone") !== "") {
							thaiText = thaiText + " " + "Tel" + " " + baseModel.getProperty("/contactTelephone");
						} else {
							MessageToast.show(this.resourceBundle.getText("ContactTelephonemandatory"));
							// MessageToast.show("Contact Telephone mandatory");
							return;
						}
						if (baseModel.getProperty("/comment") !== undefined && baseModel.getProperty("/comment") !== "") {
							thaiText = thaiText + " " + baseModel.getProperty("/comment");
						}
					} else {
						var thaiText = "สาเหตุการคืน." + " " + this.getView().getModel("baseModel").getProperty("/selectedReturnReason") + " " +
							"รับคืนสินค้าที่คุณ ";

						if (baseModel.getProperty("/contactPerson") !== undefined && baseModel.getProperty("/contactPerson") !== "") {
							thaiText = thaiText + " " + baseModel.getProperty("/contactPerson") + "แผนก";
						} else {
							MessageToast.show(this.resourceBundle.getText("Contactpersonmandatory"));
							// MessageToast.show("Contact person mandatory");
							return;
						}
						if (baseModel.getProperty("/contactDivision") !== undefined && baseModel.getProperty("/contactDivision") !== "") {
							thaiText = thaiText + " " + baseModel.getProperty("/contactDivision");
						} else {
							MessageToast.show(this.resourceBundle.getText("Contactdivisionmandatory"));
							// MessageToast.show("Contact division mandatory");
							return;
						}
						if (baseModel.getProperty("/contactTelephone") !== undefined && baseModel.getProperty("/contactTelephone") !== "") {
							thaiText = thaiText + " " + "Tel" + " " + baseModel.getProperty("/contactTelephone");
						} else {
							MessageToast.show(this.resourceBundle.getText("ContactTelephonemandatory"));
							// MessageToast.show("Contact Telephone mandatory");
							return;
						}
						if (baseModel.getProperty("/comment") !== undefined && baseModel.getProperty("/comment") !== "") {
							thaiText = thaiText + " " + baseModel.getProperty("/comment");
						}
					}
				} else {
					// าเนื่องจาก
					if (this.ROtypeCode === "TI") {
						var thaiText = "เคลียร์ใบส่งของชั่วคราว" + " ";
						var exchangeItems = this.getView().getModel("returnModel").getProperty("/results");
						for (var i = 0; i < exchangeItems.length; i++) {

							if (i === exchangeItems.length - 1) {
								if (!thaiText.includes(exchangeItems[i].refInvoice)) {
									thaiText = thaiText + exchangeItems[i].refInvoice + " " + "ส่งบิลที่แผนก";
								} else {
									thaiText = thaiText + " " + "ส่งบิลที่แผน";
								}
							} else {
								if (!thaiText.includes(exchangeItems[i].refInvoice)) {
									thaiText = thaiText + exchangeItems[i].refInvoice + ", ";
								}
							}
						}
						if (baseModel.getProperty("/contactDivision") !== undefined && baseModel.getProperty("/contactDivision") !== "") {
							thaiText = thaiText + " " + baseModel.getProperty("/contactDivision") + "ติดต่อ";
						} else {
							MessageToast.show(this.resourceBundle.getText("Contactdivisionmandatory"));
							// MessageToast.show("Contact division mandatory");
							return;
						}
						if (baseModel.getProperty("/contactPerson") !== undefined && baseModel.getProperty("/contactPerson") !== "") {
							thaiText = thaiText + " " + baseModel.getProperty("/contactPerson") + "แผนก";
						} else {
							MessageToast.show(this.resourceBundle.getText("Contactpersonmandatory"));
							// MessageToast.show("Contact person mandatory");
							return;
						}

						if (baseModel.getProperty("/contactTelephone") !== undefined && baseModel.getProperty("/contactTelephone") !== "") {
							thaiText = thaiText + " " + "Tel" + " " + baseModel.getProperty("/contactTelephone");
						} else {
							MessageToast.show(this.resourceBundle.getText("ContactTelephonemandatory"));
							// MessageToast.show("Contact Telephone mandatory");
							return;
						}
						if (baseModel.getProperty("/comment") !== undefined && baseModel.getProperty("/comment") !== "") {
							thaiText = thaiText + " " + baseModel.getProperty("/comment");
						}
					} else if (this.ROtypeCode === "TK") {
						var thaiText = "ใช้แทนบิล" + "  ";
						var exchangeItems = this.getView().getModel("returnModel").getProperty("/results");
						for (var i = 0; i < exchangeItems.length; i++) {

							if (i === exchangeItems.length - 1) {
								if (!thaiText.includes(exchangeItems[i].refInvoice)) {
									thaiText = thaiText + exchangeItems[i].refInvoice + " " + "ไม่ต้องส่งของ แก้ไขเนื่องจาก" + " " + this.getView().getModel(
										"baseModel").getProperty(
										"/selectedReturnReason") + " " + "ส่งบิลที่นก";
								} else {
									thaiText = thaiText + " " + "ไม่ต้องส่งของ แก้ไขเนื่องจาก" + " " + this.getView().getModel(
										"baseModel").getProperty(
										"/selectedReturnReason") + " " + "ส่งบิลที่นก";
								}
							} else {
								if (!thaiText.includes(exchangeItems[i].refInvoice)) {
									thaiText = thaiText + exchangeItems[i].refInvoice + ", ";
								}
							}
						}
						if (baseModel.getProperty("/contactDivision") !== undefined && baseModel.getProperty("/contactDivision") !== "") {
							thaiText = thaiText + " " + baseModel.getProperty("/contactDivision") + "ติดต่อ";
						} else {
							MessageToast.show(this.resourceBundle.getText("Contactdivisionmandatory"));
							// MessageToast.show("Contact division mandatory");
							return;
						}
						if (baseModel.getProperty("/contactPerson") !== undefined && baseModel.getProperty("/contactPerson") !== "") {
							thaiText = thaiText + " " + baseModel.getProperty("/contactPerson");
						} else {
							MessageToast.show(this.resourceBundle.getText("Contactpersonmandatory"));
							// MessageToast.show("Contact person mandatory");
							return;
						}

						if (baseModel.getProperty("/contactTelephone") !== undefined && baseModel.getProperty("/contactTelephone") !== "") {
							thaiText = thaiText + " " + "Tel" + " " + baseModel.getProperty("/contactTelephone");
						} else {
							MessageToast.show(this.resourceBundle.getText("ContactTelephonemandatory"));
							// MessageToast.show("Contact Telephone mandatory");
							return;
						}
						if (baseModel.getProperty("/comment") !== undefined && baseModel.getProperty("/comment") !== "") {
							thaiText = thaiText + " " + baseModel.getProperty("/comment");
						}
					} else {
						// Start - USer Story STRY0012775 - 30/06/2021
						if (this.ROtypeCode === "TG" || this.ROtypeCode === "TF") {
							var thaiText = "มีสินค้าเปลี่ยน รับคืนสินค้าเนื่องจาก" + this.getView().getModel("baseModel").getProperty(
								"/selectedReturnReason") + " " + "ส่งสินค้าที่คุณ"
						} else {
							var thaiText = "มีสินค้าเปลี่ยน รับคืนสินค้าเนื่องจาก" + this.getView().getModel("baseModel").getProperty(
								"/selectedReturnReason") + " " + "รับคืนที่คุณ"
						};
						// End - USer Story STRY0012775 - 30/06/2021
						if (baseModel.getProperty("/contactPerson") !== undefined && baseModel.getProperty("/contactPerson") !== "") {
							thaiText = thaiText + " " + baseModel.getProperty("/contactPerson") + "แผนก";
						} else {
							MessageToast.show(this.resourceBundle.getText("Contactpersonmandatory"));
							// MessageToast.show("Contact person mandatory");
							return;
						}
						if (baseModel.getProperty("/contactDivision") !== undefined && baseModel.getProperty("/contactDivision") !== "") {
							thaiText = thaiText + " " + baseModel.getProperty("/contactDivision");
						} else {
							MessageToast.show(this.resourceBundle.getText("Contactdivisionmandatory"));
							// MessageToast.show("Contact division mandatory");
							return;
						}
						if (baseModel.getProperty("/contactTelephone") !== undefined && baseModel.getProperty("/contactTelephone") !== "") {
							thaiText = thaiText + " " + "Tel" + " " + baseModel.getProperty("/contactTelephone");
						} else {
							MessageToast.show(this.resourceBundle.getText("ContactTelephonemandatory"));
							// MessageToast.show("Contact Telephone mandatory");
							return;
						}
						if (baseModel.getProperty("/comment") !== undefined && baseModel.getProperty("/comment") !== "") {
							thaiText = thaiText + " " + baseModel.getProperty("/comment");
						}
					}
				}
				// if (baseModel.getProperty("/STSNotiValue") !== undefined) {
				// 	remark = thaiText + " " + baseModel.getProperty("/STSNotiValue");
				// }คุณ"
				if (thaiText.length > 250) {
					MessageToast.show(this.resourceBundle.getText("Remarksexceedingmaxlength"));
					// MessageToast.show("Remarks exceeding max length");
				}
				if (this.getView().byId("ID_TAB_BAR_PROV_APP").getSelectedKey() === "Return") {
					this.getView().getModel("baseModel").setProperty("/returnRemark", thaiText);
					this.getView().getModel("baseModel").setProperty("/remark", thaiText);
					this.getView().getModel("baseModel").refresh();
				} else {
					this.getView().getModel("baseModel").setProperty("/exchangeRemark", thaiText);
					this.getView().getModel("baseModel").setProperty("/remark", thaiText);
					this.getView().getModel("baseModel").refresh();
				}
				// baseModel.setProperty("/comment", "");
				// baseModel.setProperty("/contactTelephone", "");
				// baseModel.setProperty("/contactDivision", "");
				// baseModel.setProperty("/contactPerson", "");
				// baseModel.setProperty("/STSNotiValue", "");

				// baseModel.setProperty("/remark", "");
				this.Remark.close();
			}
		},

		onSelectSms: function (oEvent) {
			var flag = oEvent.getSource().getSelected();
			if (flag === false) {
				this.getView().getModel("baseModel").setProperty("/smsInputVisiblity", false);
			} else {
				this.getView().getModel("baseModel").setProperty("/smsInputVisiblity", true);
			}
			this.getView().getModel("baseModel").refresh();
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
			var oBinding = this.getView().byId("userListTableId").getBinding("items");
			// var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(filters);
		},

		onSelectDelivery: function (oEvent) {
			var flag = oEvent.getSource().getSelected();
			if (flag === false) {
				this.getView().getModel("baseModel").setProperty("/completedDeliveryFLAG", "");
			} else {
				this.getView().getModel("baseModel").setProperty("/completedDeliveryFLAG", "X");
			}
			this.getView().getModel("baseModel").refresh();
		},

		onSelectEmail: function (oEvent) {
			var flag = oEvent.getSource().getSelected();
			if (flag === false) {
				this.getView().getModel("baseModel").setProperty("/emailInputVisiblity", false);
			} else {
				this.getView().getModel("baseModel").setProperty("/emailInputVisiblity", true);
			}

			this.getView().getModel("baseModel").refresh();
		},

		onPressViewRemark: function () {
			var baseModel = this.getView().getModel("baseModel");
			var remark = "";
			if (this.getView().byId("ID_TAB_BAR_PROV_APP").getSelectedKey() === "Return") {
				if (this.ROtypeCode === "TI") {
					var thaiText = "ไม่ต้องส่งของ เคลียร์ใบส่งของชั่วคราว" + " ";
					var returnItems = this.getView().getModel("returnModel").getProperty("/results");
					for (var i = 0; i < returnItems.length; i++) {

						if (i === returnItems.length - 1) {
							if (!thaiText.includes(returnItems[i].refInvoice)) {
								thaiText = thaiText + returnItems[i].refInvoice + " " + "ส่งบิลที่แผนก ";
							} else {
								thaiText = thaiText + " " + "ส่งบิลที่แผนก ";
							}
						} else {
							if (!thaiText.includes(returnItems[i].refInvoice)) {
								thaiText = thaiText + returnItems[i].refInvoice + ", ";
							}
						}
					}
					if (baseModel.getProperty("/contactDivision") !== undefined && baseModel.getProperty("/contactDivision") !== "") {
						thaiText = thaiText + " " + baseModel.getProperty("/contactDivision") + "ติดต่อ";
					} else {
						MessageToast.show(this.resourceBundle.getText("Contactdivisionmandatory"));
						// MessageToast.show("Contact division mandatory");
						return;
					}
					if (baseModel.getProperty("/contactPerson") !== undefined && baseModel.getProperty("/contactPerson") !== "") {
						thaiText = thaiText + " " + baseModel.getProperty("/contactPerson");
					} else {
						MessageToast.show(this.resourceBundle.getText("Contactpersonmandatory"));
						// MessageToast.show("Contact person mandatory");
						return;
					}

					if (baseModel.getProperty("/contactTelephone") !== undefined && baseModel.getProperty("/contactTelephone") !== "") {
						thaiText = thaiText + " " + "Tel" + " " + baseModel.getProperty("/contactTelephone");
					} else {
						MessageToast.show(this.resourceBundle.getText("ContactTelephonemandatory"));
						// MessageToast.show("Contact Telephone mandatory");
						return;
					}
					if (baseModel.getProperty("/comment") !== undefined && baseModel.getProperty("/comment") !== "") {
						thaiText = thaiText + " " + baseModel.getProperty("/comment");
					}
				} else if (this.ROtypeCode === "TK") {
					var thaiText = "ใช้แทนบิล";
					var returnItems = this.getView().getModel("returnModel").getProperty("/results");
					for (var i = 0; i < returnItems.length; i++) {

						if (i === returnItems.length - 1) {
							if (!thaiText.includes(returnItems[i].refInvoice)) {
								thaiText = thaiText + returnItems[i].refInvoice + " " + "ไม่ต้องส่งของ แก้ไขเนื่องจาก" + " " + this.getView().getModel(
									"baseModel").getProperty("/selectedReturnReason") + "ส่งบิลที่";
							} else {
								thaiText = thaiText + " " + "ไม่ต้องส่งของ แก้ไขเนื่องจาก" + " " + this.getView().getModel(
									"baseModel").getProperty("/selectedReturnReason") + "ส่งบิลที่";
							}
						} else {
							if (!thaiText.includes(returnItems[i].refInvoice)) {
								thaiText = thaiText + returnItems[i].refInvoice + ", ";
							}
						}
					}
					if (baseModel.getProperty("/contactDivision") !== undefined && baseModel.getProperty("/contactDivision") !== "") {
						thaiText = thaiText + " " + baseModel.getProperty("/contactDivision") + "ติดต่อ";
					} else {
						MessageToast.show(this.resourceBundle.getText("Contactdivisionmandatory"));
						// MessageToast.show("Contact division mandatory");
						return;
					}
					if (baseModel.getProperty("/contactPerson") !== undefined && baseModel.getProperty("/contactPerson") !== "") {
						thaiText = thaiText + " " + baseModel.getProperty("/contactPerson");
					} else {
						MessageToast.show(this.resourceBundle.getText("Contactpersonmandatory"));
						// MessageToast.show("Contact person mandatory");
						return;
					}

					if (baseModel.getProperty("/contactTelephone") !== undefined && baseModel.getProperty("/contactTelephone") !== "") {
						thaiText = thaiText + " " + "Tel" + " " + baseModel.getProperty("/contactTelephone");
					} else {
						MessageToast.show(this.resourceBundle.getText("ContactTelephonemandatory"));
						// MessageToast.show("Contact Telephone mandatory");
						return;
					}
					if (baseModel.getProperty("/comment") !== undefined && baseModel.getProperty("/comment") !== "") {
						thaiText = thaiText + " " + baseModel.getProperty("/comment");
					}
				} else {
					var thaiText = "สาเหตุการคืน." + " " + this.getView().getModel("baseModel").getProperty("/selectedReturnReason") + " " +
						"รับคืนสินค้าที่คุณ ";

					if (baseModel.getProperty("/contactPerson") !== undefined && baseModel.getProperty("/contactPerson") !== "") {
						thaiText = thaiText + " " + baseModel.getProperty("/contactPerson") + "แผนก";
					} else {
						MessageToast.show(this.resourceBundle.getText("Contactpersonmandatory"));
						// MessageToast.show("Contact person mandatory");
						return;
					}
					if (baseModel.getProperty("/contactDivision") !== undefined && baseModel.getProperty("/contactDivision") !== "") {
						thaiText = thaiText + " " + baseModel.getProperty("/contactDivision");
					} else {
						MessageToast.show(this.resourceBundle.getText("Contactdivisionmandatory"));
						// MessageToast.show("Contact division mandatory");
						return;
					}
					if (baseModel.getProperty("/contactTelephone") !== undefined && baseModel.getProperty("/contactTelephone") !== "") {
						thaiText = thaiText + " " + "Tel" + " " + baseModel.getProperty("/contactTelephone");
					} else {
						MessageToast.show(this.resourceBundle.getText("ContactTelephonemandatory"));
						// MessageToast.show("Contact Telephone mandatory");
						return;
					}
					if (baseModel.getProperty("/comment") !== undefined && baseModel.getProperty("/comment") !== "") {
						thaiText = thaiText + " " + baseModel.getProperty("/comment");
					}
				}
			} else {
				// าเนื่องจาก
				if (this.ROtypeCode === "TI") {
					var thaiText = "เคลียร์ใบส่งของชั่วคราว" + " ";
					var exchangeItems = this.getView().getModel("returnModel").getProperty("/results");
					for (var i = 0; i < exchangeItems.length; i++) {

						if (i === exchangeItems.length - 1) {
							if (!thaiText.includes(exchangeItems[i].refInvoice)) {
								thaiText = thaiText + exchangeItems[i].refInvoice + " " + "ส่งบิลที่แผนก";
							} else {
								thaiText = thaiText + " " + "ส่งบิลที่แผนก";
							}
						} else {
							if (!thaiText.includes(exchangeItems[i].refInvoice)) {
								thaiText = thaiText + exchangeItems[i].refInvoice + ", ";
							}
						}
					}
					if (baseModel.getProperty("/contactDivision") !== undefined && baseModel.getProperty("/contactDivision") !== "") {
						thaiText = thaiText + " " + baseModel.getProperty("/contactDivision") + "ติดต่อ";
					} else {
						MessageToast.show(this.resourceBundle.getText("Contactdivisionmandatory"));
						// MessageToast.show("Contact division mandatory");
						return;
					}
					if (baseModel.getProperty("/contactPerson") !== undefined && baseModel.getProperty("/contactPerson") !== "") {
						thaiText = thaiText + " " + baseModel.getProperty("/contactPerson") + "แผนก";
					} else {
						MessageToast.show(this.resourceBundle.getText("Contactpersonmandatory"));
						// MessageToast.show("Contact person mandatory");
						return;
					}

					if (baseModel.getProperty("/contactTelephone") !== undefined && baseModel.getProperty("/contactTelephone") !== "") {
						thaiText = thaiText + " " + "Tel" + " " + baseModel.getProperty("/contactTelephone");
					} else {
						MessageToast.show(this.resourceBundle.getText("ContactTelephonemandatory"));
						// MessageToast.show("Contact Telephone mandatory");
						return;
					}
					if (baseModel.getProperty("/comment") !== undefined && baseModel.getProperty("/comment") !== "") {
						thaiText = thaiText + " " + baseModel.getProperty("/comment");
					}
				} else if (this.ROtypeCode === "TK") {
					var thaiText = "ใช้แทนบิล" + "  ";
					var exchangeItems = this.getView().getModel("returnModel").getProperty("/results");
					for (var i = 0; i < exchangeItems.length; i++) {

						if (i === exchangeItems.length - 1) {
							if (!thaiText.includes(exchangeItems[i].refInvoice)) {
								thaiText = thaiText + exchangeItems[i].refInvoice + " " + "ไม่ต้องส่งของ แก้ไขเนื่องจาก" + " " + this.getView().getModel(
									"baseModel").getProperty(
									"/selectedReturnReason") + " " + "ส่งบิลที่นก";
							} else {
								thaiText = thaiText + " " + "ไม่ต้องส่งของ แก้ไขเนื่องจาก" + " " + this.getView().getModel(
									"baseModel").getProperty(
									"/selectedReturnReason") + " " + "ส่งบิลที่นก";
							}
						} else {
							if (!thaiText.includes(exchangeItems[i].refInvoice)) {
								thaiText = thaiText + exchangeItems[i].refInvoice + ", ";
							}
						}
					}
					if (baseModel.getProperty("/contactDivision") !== undefined && baseModel.getProperty("/contactDivision") !== "") {
						thaiText = thaiText + " " + baseModel.getProperty("/contactDivision") + "ติดต่อ";
					} else {
						MessageToast.show(this.resourceBundle.getText("Contactdivisionmandatory"));
						// MessageToast.show("Contact division mandatory");
						return;
					}
					if (baseModel.getProperty("/contactPerson") !== undefined && baseModel.getProperty("/contactPerson") !== "") {
						thaiText = thaiText + " " + baseModel.getProperty("/contactPerson");
					} else {
						MessageToast.show(this.resourceBundle.getText("Contactpersonmandatory"));
						// MessageToast.show("Contact person mandatory");
						return;
					}

					if (baseModel.getProperty("/contactTelephone") !== undefined && baseModel.getProperty("/contactTelephone") !== "") {
						thaiText = thaiText + " " + "Tel" + " " + baseModel.getProperty("/contactTelephone");
					} else {
						MessageToast.show(this.resourceBundle.getText("ContactTelephonemandatory"));
						// MessageToast.show("Contact Telephone mandatory");
						return;
					}
					if (baseModel.getProperty("/comment") !== undefined && baseModel.getProperty("/comment") !== "") {
						thaiText = thaiText + " " + baseModel.getProperty("/comment");
					}
				} else {
					// Start - USer Story STRY0012775 - 30/06/2021
					if (this.ROtypeCode === "TG" || this.ROtypeCode === "TF") {
						var thaiText = "มีสินค้าเปลี่ยน รับคืนสินค้าเนื่องจาก" + this.getView().getModel("baseModel").getProperty(
							"/selectedReturnReason") + " " + "ส่งสินค้าที่คุณ"
					} else {
						var thaiText = "มีสินค้าเปลี่ยน รับคืนสินค้าเนื่องจาก" + this.getView().getModel("baseModel").getProperty(
							"/selectedReturnReason") + " " + "รับคืนที่คุณ"
					};
					// End - USer Story STRY0012775 - 30/06/2021
					if (baseModel.getProperty("/contactPerson") !== undefined && baseModel.getProperty("/contactPerson") !== "") {
						thaiText = thaiText + " " + baseModel.getProperty("/contactPerson") + "แผนก";
					} else {
						MessageToast.show(this.resourceBundle.getText("Contactpersonmandatory"));
						// MessageToast.show("Contact person mandatory");
						return;
					}
					if (baseModel.getProperty("/contactDivision") !== undefined && baseModel.getProperty("/contactDivision") !== "") {
						thaiText = thaiText + " " + baseModel.getProperty("/contactDivision");
					} else {
						MessageToast.show(this.resourceBundle.getText("Contactdivisionmandatory"));
						// MessageToast.show("Contact division mandatory");
						return;
					}
					if (baseModel.getProperty("/contactTelephone") !== undefined && baseModel.getProperty("/contactTelephone") !== "") {
						thaiText = thaiText + " " + "Tel" + " " + baseModel.getProperty("/contactTelephone");
					} else {
						MessageToast.show(this.resourceBundle.getText("ContactTelephonemandatory"));
						// MessageToast.show("Contact Telephone mandatory");
						return;
					}
					if (baseModel.getProperty("/comment") !== undefined && baseModel.getProperty("/comment") !== "") {
						thaiText = thaiText + " " + baseModel.getProperty("/comment");
					}
				}
			}
			if (thaiText.length > 250) {
				MessageToast.show(this.resourceBundle.getText("Remarksexceedingmaxlength"));
				// MessageToast.show("Remarks exceeding max length");
			}
			this.getView().getModel("baseModel").setProperty("/remark", thaiText);
			this.getView().getModel("baseModel").refresh();
		},

		onPressResetRemark: function () {
			var baseModel = this.getView().getModel("baseModel");
			if (this.getView().byId("ID_TAB_BAR_PROV_APP").getSelectedKey() === "Exchange" && this.ROtypeCode === "TI") {
				baseModel.setProperty("/comment", "ไม่ต้องส่งของ หรือ ส่งของเพิ่มบางส");
			} else {
				baseModel.setProperty("/comment", "");

			}
			baseModel.setProperty("/contactTelephone", "");
			baseModel.setProperty("/contactDivision", "");
			baseModel.setProperty("/contactPerson", "");
			// baseModel.setProperty("/STSNotiValue", "");
			// baseModel.setProperty("/returnRemark", "");
			// baseModel.setProperty("/exchangeRemark", "");
			baseModel.setProperty("/remark", "");
			baseModel.refresh();
		},

		onCancelRemark: function () {
			// this.onPressResetRemark();
			var baseModel = this.getView().getModel("baseModel");
			if (this.getView().byId("ID_TAB_BAR_PROV_APP").getSelectedKey() === "Return") {
				if (!baseModel.getProperty("/returnRemark")) {

					baseModel.setProperty("/comment", "");
					baseModel.setProperty("/contactTelephone", "");
					baseModel.setProperty("/contactDivision", "");
					baseModel.setProperty("/contactPerson", "");
					// baseModel.setProperty("/STSNotiValue", "");
					// baseModel.setProperty("/returnRemark", "");
					// baseModel.setProperty("/exchangeRemark", "");
					baseModel.setProperty("/remark", "");
					baseModel.refresh();
					this.Remark.close();
				} else {
					this.Remark.close();
				}
			} else {
				if (!baseModel.getProperty("/exchangeRemark")) {

					baseModel.setProperty("/comment", "");
					baseModel.setProperty("/contactTelephone", "");
					baseModel.setProperty("/contactDivision", "");
					baseModel.setProperty("/contactPerson", "");
					// baseModel.setProperty("/STSNotiValue", "");
					// baseModel.setProperty("/returnRemark", "");
					// baseModel.setProperty("/exchangeRemark", "");
					baseModel.setProperty("/remark", "");
					baseModel.refresh();
					this.Remark.close();
				} else {
					this.Remark.close();
				}
			}

		},

		// check presonalization for tab
		personalizationInvDetails: function (oEvent) {
			if (!this.FilterPersonalization) {
				this.FilterPersonalization = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.Personalization", this);
				this.getView().addDependent(this.FilterPersonalization);
			}
			if (oEvent.getSource().getTooltip() === this.resourceBundle.getText("InvoicePersonalization")) {
				this.currentStep = "keyInvoice";
			} else if (oEvent.getSource().getTooltip() === this.resourceBundle.getText("ReturnPersonalization")) {
				this.currentStep = "keyReturn";
			} else if (oEvent.getSource().getTooltip() === this.resourceBundle.getText("ExchangePersonalization")) {
				this.currentStep = "keyExchange";
			}
			this._getPersonalizationDetails(this.currentStep);
			this.FilterPersonalization.open();
		},

		// common function call for personalization of all the tab (invoice, return, exchange)
		_getPersonalizationDetails: function (tabName, before) {
			var that = this;
			var PersonalizationModel = that.getView().getModel("PersonalizationModel");
			var oModel = new sap.ui.model.json.JSONModel();
			that.getView().setModel(oModel, "oModel");
			// screen = web ----- for desktop view 
			var screen = "Web";
			var oHeader = {
				"Content-Type": "application/json;charset=utf-8"
			};
			var payload = {
				"userId": this.getView().getModel("baseModel").getProperty("/userId"),
				"appId": tabName,
				"runType": screen,
				"emailId": this.getView().getModel("baseModel").getData().email
			};
			oModel.loadData("/DKSHJavaService/variant/getVariant", JSON.stringify(payload), true, "POST", false, false, oHeader);
			oModel.attachRequestCompleted(function (success) {
				if (success.getSource().getData().userPersonaDto !== null) {
					if (before) {
						if (tabName === "keyInvoice") {
							that.getView().getModel("PersonalizationModel").setProperty("/personalizationInvoiceData", success.getSource().getData());
						} else if (tabName === "keyExchange") {
							that.getView().getModel("PersonalizationModel").setProperty("/personalizationExchangeData", success.getSource().getData());
						} else if (tabName === "keyReturn") {
							that.getView().getModel("PersonalizationModel").setProperty("/personalizationReturnData", success.getSource().getData());
						}

					} else {
						var FilterPersonalization = new sap.ui.model.json.JSONModel({
							"results": success.getSource().getData()
						});
						// that.getView().getModel("PersonalizationModel").setProperty("/personalizationData", success.getSource().getData());
						if (tabName === "keyInvoice") {
							that.getView().getModel("PersonalizationModel").setProperty("/personalizationInvoiceData", success.getSource().getData());
						} else if (tabName === "keyExchange") {
							that.getView().getModel("PersonalizationModel").setProperty("/personalizationExchangeData", success.getSource().getData());
						} else if (tabName === "keyReturn") {
							that.getView().getModel("PersonalizationModel").setProperty("/personalizationReturnData", success.getSource().getData());
						}
						that.FilterPersonalization.setModel(FilterPersonalization, "FilterPersonalization");
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/enableCheckBox", false);
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/selectVarVisible", true);
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/nameVarVisible", false);
						that.getView().getModel("PersonalizationModel").refresh();
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/okPersBtnVisible", true);
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/savePersBtnVisible", false);
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/cancelPersBtnVisible", true);
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/deletePersBtnVisible", false);
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/createPersBtnVisible", true);
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/editPersBtnVisible", true);
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/varinatNameValueState", "None");
						that.FilterPersonalization.getModel("FilterPersonalization").refresh();
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/action", "");
					}
				}
			});
			oModel.attachRequestFailed(function (oEvent) {
				MessageBox.error(oEvent.getSource().getData().message);
			});
		},

		// select checkbox when editing or creating variant
		onChangeCheckbox: function (oEvent) {
			var personalizationData = this.FilterPersonalization.getModel("FilterPersonalization").getData().results.userPersonaDto;
			var path = parseInt(oEvent.getSource().getBindingContext("FilterPersonalization").getPath().split("/")[3]);
			if (oEvent.getSource().getSelected() === true) {
				for (var j = 0; j < personalizationData.length; j++) {
					if (j === path) {
						personalizationData[j].status = true;
					}
					if (this.FilterPersonalization.getModel("FilterPersonalization").getProperty("/results/action") === "Create") {
						personalizationData[j].id = "";
					}
					this.selectedObjects = personalizationData;
				}
			} else {
				for (var i = 0; i < personalizationData.length; i++) {
					if (i === path) {
						personalizationData[i].status = false;
					}
				}
				this.selectedObjects = personalizationData;
			}
		},

		onChangeRetPO: function (oEvent) {
			var val = oEvent.getSource().getValue();
			if (val.length > 35) {
				messageToast.show(this.resourceBundle.getText("maxLengthPO"));
				return;
			}
		},

		onSelectvarian: function (oEvent) {
			var that = this;
			var pID = this.getView().getModel("baseModel").getData().userId;
			var oModel = new sap.ui.model.json.JSONModel();
			that.getView().setModel(oModel, "oModel");
			if (oEvent) {
				var varinatName = oEvent.getSource().getSelectedKey();
			} else {
				var varinatName = this.FilterPersonalization.getModel("FilterPersonalization").getData().results.currentVariant;
			}
			var oHeader = {
				"Content-Type": "application/json;charset=utf-8"
			};
			var screen = "Web";
			if (sap.ui.Device.system.phone === true) {
				screen = "Phone";
			}
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			oModel.loadData("/DKSHJavaService/variant/getvariantLists/" + pID + "/" + this.currentStep + "/" + varinatName + "/" + screen,
				true,
				"POST", false,
				false, oHeader);
			oModel.attachRequestCompleted(function (success) {
				busyDialog.close();
				var success = success.getSource().getData().userPersonaDto;
				if (that.FilterPersonalization.getModel("FilterPersonalization").getProperty("/results/action") === "Edit") {
					if (that.currentStep === "keyInvoice") {
						that.getView().getModel("PersonalizationModel").setProperty("/personalizationInvoiceData/userPersonaDto", success);
					} else if (that.currentStep === "keyExchange") {
						that.getView().getModel("PersonalizationModel").setProperty("/personalizationExchangeData/userPersonaDto", success);
					} else if (that.currentStep === "keyReturn") {
						that.getView().getModel("PersonalizationModel").setProperty("/personalizationReturnData/userPersonaDto", success);
					}
					that.FilterPersonalization.getModel("FilterPersonalization").setProperty(
						"/results/userPersonaDto", success);
					that.FilterPersonalization.getModel("FilterPersonalization").refresh();
					that.getView().getModel("PersonalizationModel").refresh();
					if (that.FilterPersonalization.getModel("FilterPersonalization").getProperty(
							"/results/currentVariant") ===
						"Default") {
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/action", "");
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/enableCheckBox", false);
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/savePersBtnVisible", false);
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/okPersBtnVisible", true);
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/deletePersBtnVisible", false);
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/selectVarVisible", true);
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/nameVarVisible", false);
						MessageToast.show(this.resourceBundle.getText("Cannoteditdefaultvariant"));
						// MessageToast.show("Cannot edit default variant");
						that.FilterPersonalization.getModel("FilterPersonalization").refresh();
					}
				} else {
					if (that.currentStep === "keyInvoice") {
						that.getView().getModel("PersonalizationModel").setProperty("/personalizationInvoiceData/userPersonaDto", success);
					} else if (that.currentStep === "keyExchange") {
						that.getView().getModel("PersonalizationModel").setProperty("/personalizationExchangeData/userPersonaDto", success);
					} else if (that.currentStep === "keyReturn") {
						that.getView().getModel("PersonalizationModel").setProperty("/personalizationReturnData/userPersonaDto", success);
					}
					that.FilterPersonalization.getModel("FilterPersonalization").setProperty(
						"/results/userPersonaDto", success);
					that.FilterPersonalization.getModel("FilterPersonalization").refresh();
					that.getView().getModel("PersonalizationModel").refresh();
				}
			});
			oModel.attachRequestFailed(function (oEvent) {
				MessageBox.error(oEvent.getSource().getData().message);
			});
		},

		onVariantSave: function (oEvent) {
			if (this.selectedObjects.length === 0) {
				MessageToast.show(this.resourceBundle.getText("Saveonlyafteredit"));
				// MessageToast.show("Save only after edit");
				return;
			}
			var that = this;
			var oModel = new sap.ui.model.json.JSONModel();
			var selected = oEvent.getSource();
			var PersonalizationModel = this.FilterPersonalization.getModel("FilterPersonalization");
			if (PersonalizationModel.getProperty("/results/action") === "Create") {
				if (PersonalizationModel.getData().newVariantName !== undefined && PersonalizationModel.getData().newVariantName !==
					"") {
					for (var j = 0; j < PersonalizationModel.getData().results.variantName.length; j++) {
						if (PersonalizationModel.getData().results.variantName[j].name === PersonalizationModel.getData().newVariantName) {
							this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/varinatNameValueState", "Error");
							MessageToast.show(this.resourceBundle.getText("Newvariantnamecannotbesame"));
							// MessageBox.error("New variant name cannot be same as the existing variant");
							return;
						}
					}

					this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/varinatNameValueState", "None");
					var VariantName = PersonalizationModel.getData().newVariantName;
					for (var i = 0; i < this.selectedObjects.length; i++) {
						this.selectedObjects[i].variantId = VariantName;
					}

				} else {
					this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/varinatNameValueState", "Error");
					sap.m.MessageBox.error(this.resourceBundle.getText("EnterVariantName"));
					// sap.m.MessageBox.error("Enter Variant Name");
					return;
				}
			}

			var pID = this.getView().getModel("baseModel").getData().userId;
			// var tab = "keyInvoice";
			var varinatName;
			var payload = {
				"varaiantObject": this.selectedObjects,
				"userId": pID,
				"applicationId": this.currentStep,
				"varaintId": this.selectedObjects[0].variantId
			};
			var oHeader = {
				"Content-Type": "application/json;charset=utf-8"
			};
			var url = "";
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			// this._doAjax(url, "PUT", payload).then(success => {
			oModel.loadData("/DKSHJavaService/variant/UpdateVariant", JSON.stringify(payload), true, "PUT", false,
				false, oHeader);
			oModel.attachRequestCompleted(function (success) {
				busyDialog.close();
				that.selectedObjects = [];
				that.FilterPersonalization.close();
				sap.m.MessageBox.success(this.resourceBundle.getText("CreatedSuccessfully"), {
					actions: [sap.m.MessageBox.Action.OK],
					onClose: function (sAction) {
						if (sAction === MessageBox.Action.OK) {
							that._getPersonalizationDetails(that.currentStep, "Before");
						}
					}
				});
			});
			oModel.attachRequestFailed(function (oEvent) {
				MessageBox.error(oEvent.getSource().getData().message);
			});
		},

		onVariantDelete: function () {
			var that = this;
			var pID = this.getView().getModel("baseModel").getData().userId;
			// var tab = this.getView().byId("ID_TAB_BAR_PROV_APP").getSelectedKey();
			var data = this.FilterPersonalization.getModel("FilterPersonalization").getProperty("/results/userPersonaDto");
			var varinatName;
			var payload = {
				"varaiantObject": data,
				"userId": pID,
				"applicationId": this.currentStep,
				"varaintId": this.FilterPersonalization.getModel("FilterPersonalization").getProperty(
					"/results/userPersonaDto")[0].variantId
			};
			var oHeader = {
				"Content-Type": "application/json;charset=utf-8"
			};
			var oModel = new sap.ui.model.json.JSONModel();
			// var url = "/DKSHJavaService/variant/deleteVariant";
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			oModel.loadData("/DKSHJavaService/variant/deleteVariant", JSON.stringify(payload), true, "DELETE", false,
				false, oHeader);
			oModel.attachRequestCompleted(function (success) {
				busyDialog.close();
				that.FilterPersonalization.close();
				// 	// var message = oNewEvent.getSource().getData().message;
				sap.m.MessageBox.success(success.getSource().getData().name, {
					actions: [sap.m.MessageBox.Action.OK],
					onClose: function (sAction) {
						if (sAction === MessageBox.Action.OK) {
							that._getPersonalizationDetails(that.currentStep, "Before");
						}
					}
				});
			});
			oModel.attachRequestFailed(function (oEvent) {
				MessageBox.error(oEvent.getSource().getData().name);
			});
		},

		onVariantCreate: function () {
			var PersonalizationModel = this.FilterPersonalization.getModel("FilterPersonalization");
			PersonalizationModel.setProperty("/results/action", "Create");
			PersonalizationModel.setProperty("/selectVarVisible", false);
			PersonalizationModel.setProperty("/nameVarVisible", true);
			PersonalizationModel.setProperty("/enableCheckBox", true);
			PersonalizationModel.setProperty("/okPersBtnVisible", false);
			// this.getView().getModel("PersonalizationModel").setProperty("/okPersBtnVisible", false);
			PersonalizationModel.setProperty("/savePersBtnVisible", true);
			PersonalizationModel.setProperty("/newVariantName", "");
			var fieldData = PersonalizationModel.getData().results.userPersonaDto;
			for (var i = 0; i < fieldData.length; i++) {
				fieldData[i].status = false;
			}
			PersonalizationModel.setProperty("/results/userPersonaDto", fieldData);
			this.FilterPersonalization.getModel("FilterPersonalization").refresh();
		},

		onVariantEdit: function () {
			var PersonalizationModel = this.FilterPersonalization.getModel("FilterPersonalization");
			if (PersonalizationModel.getData().results.currentVariant === "Default") {
				MessageToast.show(this.resourceBundle.getText("Cannoteditdefaultvariant"));
				// MessageToast.show("Cannot edit default variant");
				return;
			}
			PersonalizationModel.setProperty("/results/action", "Edit");
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/okPersBtnVisible", false);
			PersonalizationModel.setProperty("/enableCheckBox", true);
			PersonalizationModel.setProperty("/savePersBtnVisible", true);
			PersonalizationModel.setProperty("/deletePersBtnVisible", true);
			PersonalizationModel.setProperty("/selectVarVisible", true);
			PersonalizationModel.setProperty("/nameVarVisible", false);
			PersonalizationModel.refresh();
			this.onSelectvarian();
			MessageToast.show(this.resourceBundle.getText("Selectavarianttoedit"));
			// MessageToast.show("Select a variant to edit");
		},

		onPersonlizationClose: function () {
			var that = this;
			var PersonalizationModel = this.getView().getModel("PersonalizationModel");
			this.selectedObjects = [];
			this.FilterPersonalization.close();
		},

		onVariantOK: function () {
			var that = this;
			var PersonalizationModel = this.getView().getModel("PersonalizationModel");
			var FilterPersonalization = new sap.ui.model.json.JSONModel({
				"results": this.getView().getModel("PersonalizationModel").getData()
			});
			this.FilterPersonalization.setModel(FilterPersonalization, "FilterPersonalization");
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
			this.FilterPersonalization.close();
		},

		onSelectItemsFromInvoice: function (oEvent) {
			var selectedContext = [];
			var selectedObject = oEvent.getParameter("listItem").getBindingContext("invoiceSearchModel");
			if (oEvent.getParameters().selected === true) {
				if (oEvent.getParameters().selectAll === true) {
					selectedContext = oEvent.getSource().getSelectedContexts();
				}
				if (oEvent.getParameters().selectAll === false) {
					selectedContext.push(selectedObject);
				}
				// check if selected invoices are of same ship to party, avail ret qty > 0, not color coded red ,not repeated and available for return or exchange
				for (var i = 0; i < selectedContext.length; i++) {
					var count = 0;
					if (this.selectedReturnItems.length === 0 && parseInt(selectedContext[i].getObject().AvailRetQtySalesUn) > 0 && selectedContext[
							i]
						.getObject().ColorCode !== "R") {
						if (selectedContext[i].getObject().ActiveIndicator !== "X") {
							// selectedContext[i].getObject().SLoc = this.getView().getModel("baseModel").getProperty("/roTypeSLoc");
							this.selectedReturnItems.push(selectedContext[i].getObject());
							this.selectedInvoice.push(selectedContext[i].getObject());
							this.getView().getModel("baseModel").setProperty("/returnShipTo", selectedContext[i].getObject().shipToAddress.partnerNum);
							this.getView().getModel("baseModel").setProperty("/shipToDesc", selectedContext[i].getObject().shipToAddress.partnerName);
							this.getView().getModel("baseModel").setProperty("/returnSoldTo", selectedContext[i].getObject().soldToAddress.partnerNum);
							this.getView().getModel("baseModel").setProperty("/returnSoldToDesc", selectedContext[i].getObject().soldToAddress.partnerName);
							this.getView().getModel("baseModel").setProperty("/returnBillTo", selectedContext[i].getObject().billToAdress.partnerNum);
							this.getView().getModel("baseModel").setProperty("/returnBillToDesc", selectedContext[i].getObject().billToAdress.partnerName);
							this.getView().getModel("baseModel").setProperty("/returnPayer", selectedContext[i].getObject().payerAddress.partnerNum);
							this.getView().getModel("baseModel").setProperty("/returnPayerDesc", selectedContext[i].getObject().payerAddress.partnerName);
						} else {
							++count;
							this.getView().byId("InvoiceTableId").getItems()[parseInt(selectedContext[i].sPath.split("/")[2])].setSelected(false);
							MessageToast.show(this.resourceBundle.getText("Returnnotallowed"));
							// MessageToast.show("Return not allowed");
						}
					} else if (this.selectedReturnItems.length > 0) {

						for (var j = 0; j < this.selectedReturnItems.length; j++) {
							// this.selectedReturnItems[j].shipToParty
							if (parseInt(selectedContext[i].getObject().AvailRetQtySalesUn) > 0 && this.selectedReturnItems[j].shipToParty ===
								selectedContext[i].getObject().shipToParty && this.selectedReturnItems[j].billToAdress.partnerNum === selectedContext[i].getObject()
								.billToAdress.partnerNum &&
								this.selectedReturnItems[j].payerAddress.partnerNum === selectedContext[i].getObject().payerAddress.partnerNum &&
								selectedContext[i].getObject().ColorCode !==
								"R") {
								//
								if (selectedContext[i].getObject().ActiveIndicator !== "X") {
									if ((selectedContext[i].getObject().InvoiceLineItem === this.selectedReturnItems[j]
											.InvoiceLineItem &&
											selectedContext[i].getObject().InvoiceNum === this.selectedReturnItems[j]
											.InvoiceNum)) {
										++count;
										this.getView().byId("InvoiceTableId").getItems()[parseInt(selectedContext[i].sPath.split("/")[2])].setSelected(false);
										MessageToast.show(this.resourceBundle.getText("ItemisalreadyaddedtoReturns"));
										// MessageToast.show("Item is already added to Returns");
									} else {

									}
								} else {
									MessageToast.show(this.resourceBundle.getText("Returnnotallowed"));
									// MessageToast.show("Return not allowed");
									++count;
									this.getView().byId("InvoiceTableId").getItems()[parseInt(selectedContext[i].sPath.split("/")[2])].setSelected(false);
								}
							} else {
								MessageToast.show(this.resourceBundle.getText("Itemcannotbeadded"));
								// MessageToast.show("Item cannot be added");
								++count;
								this.getView().byId("InvoiceTableId").getItems()[parseInt(selectedContext[i].sPath.split("/")[2])].setSelected(false);
							}
						}
						if (count === 0) {
							this.selectedReturnItems.push(selectedContext[i].getObject());

							this.selectedInvoice.push(selectedContext[i].getObject());
						}
					} else {
						this.getView().byId("InvoiceTableId").getItems()[parseInt(selectedContext[i].sPath.split("/")[2])].setSelected(false);
						MessageToast.show(this.resourceBundle.getText("Itemcannotbeadded"));
						// MessageToast.show("Item cannot be added");
					}
				}
			} else {

				if (oEvent.getParameters().selectAll === false) {
					if (this.getView().byId("InvoiceTableId").getSelectedItems().length === 0) {
						for (var k = this.selectedInvoice.length - 1; k >= 0; k--) {
							for (var r = this.selectedReturnItems.length - 1; r >= 0; r--) {
								if (this.selectedReturnItems.length > 0) {
									if (this.selectedInvoice[k].InvoiceLineItem === this.selectedReturnItems[r].InvoiceLineItem && this.selectedInvoice[k].InvoiceNum ===
										this.selectedReturnItems[
											r].InvoiceNum) {
										this.selectedReturnItems.splice(r, 1);
									}
								} else {
									break;
								}
							}
						}
						this.selectedInvoice = [];
					} else {
						for (var r = this.selectedReturnItems.length - 1; r >= 0; r--) {
							if (selectedObject.getObject().InvoiceLineItem === this.selectedReturnItems[r].InvoiceLineItem && selectedObject.getObject().InvoiceNum ===
								this.selectedReturnItems[
									r].InvoiceNum) {
								this.selectedReturnItems.splice(r, 1);
								this.selectedInvoice.splice(r, 1);
							}
						}
					}
				}
			}
			if (this.selectedReturnItems.length > 10) {
				this.getView().getModel("baseModel").setProperty("/returnTableLength", "60vh");
			} else {
				this.getView().getModel("baseModel").setProperty("/returnTableLength", "");
			}
		},

		// on copying selected items from invoice to return
		onPressReturn: function () {
			var that = this;
			var returnsData = this.getView().getModel("returnModel").getProperty("/results");
			var results = [];
			var object;
			var returnAmountTotal = 0;
			if (this.getView().getModel("invoiceSearchModel").getProperty("/results") === "") {
				MessageBox.information("Search invoice to procced");
			} else if (this.getView().getModel("invoiceSearchModel").getProperty("/results") !== "") {
				if (this.selectedReturnItems.length > 0) {
					if (this.InvQtyCount > 0) {
						MessageBox.information(this.resourceBundle.getText("EnteredReturnedQtycannotbegreaterthanAvailableReturnQty"));
						// MessageBox.information("Entered Returned Qty cannot be greater than Available Return Qty");
						return;
					}
					that.getView().getModel("baseModel").setProperty("/disableSoldToParty", false);
					for (var i = 0; i < this.selectedReturnItems.length; i++) {
						returnAmountTotal = returnAmountTotal + parseFloat(this.selectedReturnItems[i].netAmount);
						object = {
							"refNum": "1234",
							"itmNum": "001",
							"matGrp": this.selectedReturnItems[i].MaterialGroup,
							"matGrp4": this.selectedReturnItems[i].MaterialGroup4,
							"itemRoType": "",
							"roTypeDesc": "",
							"material": this.selectedReturnItems[i].MaterialCode
						};
						results.push(object);
					}
					if (this._oPopover) {
						this._oPopover = undefined;
					}
					//  check if Foc items have their parents also selected 
					var invoice = [];
					var data = [];
					var count = 0;
					for (var i = 0; i < this.selectedInvoice.length; i++) {
						if (this.selectedInvoice[i].HigherLvlItem !== "000000") {
							for (var j = 0; j < this.selectedInvoice.length; j++) {
								if (this.selectedInvoice[j].InvoiceNum === this.selectedInvoice[i].InvoiceNum && this.selectedInvoice[j].ItemGroup === this.selectedInvoice[
										i].HigherLvlItem) {
									if (this.selectedInvoice[j].HigherLvlItem === "000000") {
										count++;
									} else {}
								}
							}
						} else {
							count++;
						}
					}
					if (count === 0) {
						MessageToast.show(this.resourceBundle.getText("Selectparentitem"));
						// MessageToast.show("Select parent item");
					} else {
						if (this.getView().getModel("baseModel").getProperty("/selectedROTypeCode") === "TI" || this.getView().getModel("baseModel").getProperty(
								"/selectedROTypeCode") === "TK") {
							this._getSLoc();
						} else {
							this._ROType(results);

						}

					}
				} else {
					MessageBox.information(this.resourceBundle.getText("Selectatleastoneitem"));
					// MessageBox.information("");
				}
			}
		},

		// fetch xsrf token for post to odata ----- to get return order type based on special mapping
		_ROType: function (results) {
			var that = this;
			var payload = {
				"d": {
					"refNum": "1234",
					"roType": that.ROtypeCode,
					"roTypeDesc": "",
					"roTyMatchingToRoTyItem": {
						"results": results
					}
				}
			};

			var oDataModel = this.getView().getModel("ZDKSH_CC_RETURNS_MANAGEMENT_SRV");
			var url1 =
				"/DKSHODataService/sap/opu/odata/sap/ZDKSH_CC_RETURNS_MANAGEMENT_SRV/roTypeMatchingSet(refNum='5700000669')?$expand=roTyMatchingToRoTyItem&$format=json";
			var url = "/DKSHODataService/sap/opu/odata/sap/ZDKSH_CC_RETURNS_MANAGEMENT_SRV/roTypeMatchingSet";
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			var token;
			$.ajax({
				url: url1,
				type: "GET",
				beforeSend: function (xhr) {
					xhr.setRequestHeader("X-CSRF-Token", "Fetch");
				},
				complete: function (xhr) {
					token = xhr.getResponseHeader("X-CSRF-Token");
					$.ajax({
						url: url,
						method: "POST",
						async: true,
						data: JSON.stringify(payload),

						beforeSend: function (xhr) {
							xhr.setRequestHeader('X-CSRF-Token', token);
						},
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},

						success: function (result, xhr, data) {
							busyDialog.close();
							if (result.d.roType === "TG" || result.d.roType === "TF") {
								that.ROtypeCode = result.d.roType;
								that.getView().getModel("baseModel").setProperty("/newSelectedROType", result.d.roTypeDesc);
								that.getView().getModel("baseModel").setProperty("/newSelectedROTypeCode", result.d.roType);
								that.getView().getModel("baseModel").refresh();
							} else {

							}
							that._getSLoc();
						},
						error: function (result, xhr, data) {
							busyDialog.close();
							var errorMsg = "";
							if (result.status === 504) {
								errorMsg = that.resourceBundle.getText("timeOut");
								// errorMsg = "Connection Fail To Fetch The Data";
								that.errorMsg(errorMsg);
							} else {
								var error = result.responseJSON.error.innererror.errordetails;
								// errorMsg = errorMsg.error.message.value;

								for (var i = 0; i < error.length; i++) {
									if (i < error.length - 1) {
										errorMsg = errorMsg + error[i].message;
									}
								}
								that.errorMsg(errorMsg);
							}
						}
					});
				}
			});
		},

		// get order type
		_getOrderType: function (billType, CountryCode, rotype) {
			var that = this;
			var filters = [];
			if (billType === undefined && CountryCode === undefined && rotype === undefined) {
				var billingType = this.getView().getModel("invoiceSearchModel").getProperty("/billingType");
				var countryCode = this.getView().getModel("invoiceSearchModel").getProperty("/salesOrgNo").slice(0, 2);
				var oFilter = new sap.ui.model.Filter({
					filters: [
						new sap.ui.model.Filter("billingType", sap.ui.model.FilterOperator.EQ, billingType),
						new sap.ui.model.Filter("countryCode", sap.ui.model.FilterOperator.EQ, countryCode),
						new sap.ui.model.Filter("roType", sap.ui.model.FilterOperator.EQ, this.ROtypeCode),
					],
					and: true
				});
			} else {
				var oFilter = new sap.ui.model.Filter({
					filters: [
						new sap.ui.model.Filter("billingType", sap.ui.model.FilterOperator.EQ, billingType),
						new sap.ui.model.Filter("countryCode", sap.ui.model.FilterOperator.EQ, countryCode),
						new sap.ui.model.Filter("roType", sap.ui.model.FilterOperator.EQ, rotype),
					],
					and: true
				});
			}

			filters.push(oFilter);
			var oDataModel = that.getView().getModel("ZDKSH_CC_RETURNS_MANAGEMENT_SRV");
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			oDataModel.read("/billingTypeMappingSet", {
				filters: filters,
				async: false,
				success: function (oData, oResponse) {
					busyDialog.close();
					that.getView().getModel("baseModel").setProperty("/returnOrderType", oData.results[0].returnOrderType);
					that.getView().getModel("baseModel").setProperty("/exchangeOrderType", oData.results[0].exchangeOrderType);
					that._pricingSimulation(that.selectedReturnItems, "Returns");
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.responseText);
					errorMsg = errorMsg.error.message.value;
					that.errorMsg(errorMsg);
				}

			});
		},

		// price simulation to calculate price, discount
		_pricingSimulation: function (data, tab) {
			var that = this;
			var baseModel = that.getView().getModel("baseModel");
			var returnModel = that.getView().getModel("returnModel");
			var exchangeModel = that.getView().getModel("exchangeModel");
			var invoiceSearchModel = that.getView().getModel("invoiceSearchModel");
			var url = "/DKSHODataService/sap/opu/odata/sap/ZDKSH_CC_RETURNS_ORDERCREATION_SRV/priceSimulationHeaderSet";
			var orderType;
			var results = [];
			if (tab === "Returns" || tab === "ReturnsTab") {
				orderType = this.getView().getModel("baseModel").getData().returnOrderType;
				var flag = "R";
			} else {

				orderType = this.getView().getModel("baseModel").getData().exchangeOrderType;
				var flag = "E";
			}
			for (var i = 0; i < data.length; i++) {
				if (tab === "ReturnsTab" || tab === "Exchange" || tab === "ExchangeTab" || tab === "ExchangeDelete") {
					if (data[i].avlRetQty === "") {
						data[i].avlRetQty = data[i].quantity;
					}
					if (data[i].unitPriceInv === "") {
						data[i].unitPriceInv = data[i].unitPrice;
					}
					if (data[i].listPrice !== undefined && data[i].listPrice === "") {
						data[i].listPrice = "0.00";
					}
					if (data[i].expiryDate === null) {
						data[i].expiryDate = "";
					}
					if (data[i].storageLocation === null) {
						data[i].storageLocation = "";
					}
					if (data[i].itemVisibility === undefined || data[i].itemVisibility === null) {
						data[i].itemVisibility = "false";
					}
					if (data[i].expiryDate.includes("(")) {
						var expDate = formatter.dateTimeFormatPS(data[i].expiryDate);
						var billDate = formatter.dateTimeFormatPS(data[i].billingDate);
					} else {
						var expDate = formatter.dateTimeFormat(data[i].expiryDate);
						var billDate = formatter.dateTimeFormat(data[i].billingDate);
					}
					if (data[i].manualFoc === null) {
						data[i].manualFoc = "";
					}
					if (data[i].expiryDate === "" || data[i].billingDate === "") {
						var object = {
							"refInvoice": data[i].refInvoice,
							"refItemNumber": data[i].refItemNumber,
							"matNumber": data[i].matNumber,
							"quantity": data[i].quantity,
							"salesUnit": data[i].salesUnit,
							"unitPrice": data[i].unitPrice,
							"materialGroup": data[i].materialGroup,
							"materialGroup4": data[i].materialGroup4,
							"avlRetQty": data[i].avlRetQty,
							"billingQty": data[i].avlRetQty,
							"baseUnit": data[i].salesUnit,
							"batchNumber": data[i].batchNumber,
							"storageLocation": data[i].storageLocation,
							// "expiryDate": formatter.dateTimeFormatPS(data[i].expiryDate),
							"serialNumber": data[i].serialNumber,
							// "billingDate": formatter.dateTimeFormatPS(data[i].billingDate),
							"unitPriceInv": data[i].unitPriceInv,
							"listPrice": data[i].listPrice,
							"active": data[i].active,
							"manualFoc": data[i].manualFoc,
							"itemVisibility": data[i].itemVisibility
						};
					} else {
						var object = {
							"refInvoice": data[i].refInvoice,
							"refItemNumber": data[i].refItemNumber,
							"matNumber": data[i].matNumber,
							"quantity": data[i].quantity,
							"salesUnit": data[i].salesUnit,
							"unitPrice": data[i].unitPrice,
							"materialGroup": data[i].materialGroup,
							"materialGroup4": data[i].materialGroup4,
							"avlRetQty": data[i].avlRetQty,
							"billingQty": data[i].avlRetQty,
							"baseUnit": data[i].salesUnit,
							"batchNumber": data[i].batchNumber,
							"expiryDate": expDate,
							"storageLocation": data[i].storageLocation,
							"serialNumber": data[i].serialNumber,
							"billingDate": billDate,
							"unitPriceInv": data[i].unitPriceInv,
							"listPrice": data[i].listPrice,
							"active": data[i].active,
							"manualFoc": data[i].manualFoc,
							"itemVisibility": data[i].itemVisibility
						};
					}
				} else {
					var Expdate = formatter.dateTimeFormat(data[i].ExpiryDate);
					var billingDate = formatter.dateTimeFormat(data[i].billingDateFrom);
					var object = {
						"refInvoice": data[i].InvoiceNum,
						"refItemNumber": data[i].InvoiceLineItem,
						"matNumber": data[i].MaterialCode,
						"quantity": data[i].actualRetQty,
						"salesUnit": data[i].actualRetUOM,
						"unitPrice": data[i].UnitPrice,
						"materialGroup": data[i].MaterialGroup,
						"materialGroup4": data[i].MaterialGroup4,
						"avlRetQty": data[i].AvailRetQtySalesUn,
						"billingQty": data[i].BillingQty,
						"baseUnit": data[i].BaseUnit,
						"batchNumber": data[i].BatchNumber,
						"expiryDate": Expdate,
						"serialNumber": data[i].SerialNum,
						"billingDate": billingDate,
						"unitPriceInv": data[i].UnitPrice,
						"listPrice": data[i].ListPrice,
						"storageLocation": data[i].storageLocation,
						"active": data[i].ActiveIndicator,
						"itemVisibility": data[i].itemVisibility
					};
				}
				results.push(object);
			}
			if (tab === "ReturnsTab" || tab === "Returns") {
				var payload = {
					"d": {
						"orderType": orderType,
						"distChannel": invoiceSearchModel.getData().distChnl,
						"salesOrg": invoiceSearchModel.getData().salesOrgNo,
						"division": invoiceSearchModel.getData().Division,
						"soldToParty": baseModel.getData().returnSoldTo,
						"shipToParty": baseModel.getData().returnShipTo,
						"billToParty": baseModel.getData().returnBillTo,
						"payer": baseModel.getData().returnPayer,
						"roType": this.ROtypeCode,
						"flag": flag,
						"navToPriceItem": {
							"results": results
						},
						"navToPriceConditions": {
							"results": []
						}
					}
				};
			} else {
				var payload = {
					"d": {
						"orderType": orderType,
						"distChannel": invoiceSearchModel.getData().distChnl,
						"salesOrg": invoiceSearchModel.getData().salesOrgNo,
						"division": invoiceSearchModel.getData().Division,
						"soldToParty": baseModel.getData().exSoldTo,
						"shipToParty": baseModel.getData().exShipTo,
						"billToParty": baseModel.getData().exBillTo,
						"payer": baseModel.getData().exPayer,
						"roType": this.ROtypeCode,
						"flag": flag,
						"navToPriceItem": {
							"results": results
						},
						"navToPriceConditions": {
							"results": []
						}
					}
				};
			}
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			var url1 =
				"/DKSHODataService/sap/opu/odata/sap/ZDKSH_CC_RETURNS_ORDERCREATION_SRV/priceSimulationHeaderSet";
			var token;
			$.ajax({
				url: url1,
				type: "GET",
				beforeSend: function (xhr) {
					xhr.setRequestHeader("X-CSRF-Token", "Fetch");
				},
				complete: function (xhr) {
					token = xhr.getResponseHeader("X-CSRF-Token");

					$.ajax({
						url: url,
						method: "POST",
						async: true,
						data: JSON.stringify(payload),
						beforeSend: function (xhr) {
							xhr.setRequestHeader('X-CSRF-Token', token);
						},
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						success: function (result, xhr, payload) {
							busyDialog.close();

							if (tab === "Returns" || tab === "ReturnsDraft") {
								that._wizard.setCurrentStep(that.byId("ID_WIZARD_RTEX"));
								var oldROType = baseModel.getProperty("/selectedROTypeCode");
								var newROType = baseModel.getProperty("/newSelectedROTypeCode");
								var newROTypeDesc = baseModel.getProperty("/newSelectedROType");
								if (baseModel.getProperty("/requestor") === undefined || baseModel.getProperty("/requestor") === "") {
									baseModel.setProperty("/requestor", formatter.concatenateStrings(baseModel.getProperty("/userName"), baseModel.getProperty(
										"/phone")));
								}
								if (newROType) {
									if (newROType === "TG" || newROType === "TF") {
										if (oldROType !== newROType) {
											baseModel.setProperty("/selectedROTypeCode", newROType);
											baseModel.setProperty("/selectedROType", newROTypeDesc);
											that.getView().byId("RotypeSegementedBtnID").setSelectedKey(newROType);
											MessageBox.information(that.resourceBundle.getText("Specialmapping"));
											// MessageBox.information("Special mapping detected, return type is changed");
										}
									}
								}
								if (that.docVersion === "SUCCESS") {
									baseModel.setProperty("/previewBtnVisiblitys", true);
									baseModel.setProperty(
										"/submitBtnVisiblitys", false);
								} else {
									baseModel.setProperty("/previewBtnVisiblitys", true);
									baseModel.setProperty(
										"/submitBtnVisiblitys", true);
								}
								var returnAmountTotal = 0;
								if (result.d.navToPriceConditions) {
									for (var i = 0; i < result.d.navToPriceConditions.results.length; i++) {
										that.returnConditions.push(result.d.navToPriceConditions.results[i]);
									}
									returnModel.setProperty("/returnConditions", that.returnConditions);
								}
								for (var j = 0; j < result.d.navToPriceItem.results.length; j++) {

									if (result.d.navToPriceItem.results[j].deleted === undefined) {
										result.d.navToPriceItem.results[j].deleted = "false";
									}
									/*--- settle borrow goods--*/
									if (that.docVersion === "SUCCESS") {
										result.d.navToPriceItem.results[j].editQtyRet = false;
										result.d.navToPriceItem.results[j].editUOMRet = false;
										result.d.navToPriceItem.results[j].editSLocRet = false;
										result.d.navToPriceItem.results[j].editUPRet = false;
										result.d.navToPriceItem.results[j].editBatchRet = false;
										result.d.navToPriceItem.results[j].editSerialNoRet = false;
									} else {
										if (baseModel.getData().selectedROTypeCode === "TI") {
											result.d.navToPriceItem.results[j].editQtyRet = true;
											result.d.navToPriceItem.results[j].editUOMRet = true;
											result.d.navToPriceItem.results[j].editSLocRet = false;
											result.d.navToPriceItem.results[j].editUPRet = false;
											result.d.navToPriceItem.results[j].editBatchRet = false;
											result.d.navToPriceItem.results[j].editSerialNoRet = false;
										} else if (baseModel.getData().selectedROTypeCode === "TK") {
											result.d.navToPriceItem.results[j].editSLocRet = false;
											result.d.navToPriceItem.results[j].editUPRet = false;
											result.d.navToPriceItem.results[j].editBatchRet = false;
											result.d.navToPriceItem.results[j].editSerialNoRet = false;
											result.d.navToPriceItem.results[j].editQtyRet = false;
											result.d.navToPriceItem.results[j].editUOMRet = false;
										} else {
											result.d.navToPriceItem.results[j].editSLocRet = true;
											result.d.navToPriceItem.results[j].editUPRet = true;
											result.d.navToPriceItem.results[j].editBatchRet = true;
											result.d.navToPriceItem.results[j].editSerialNoRet = true;
											result.d.navToPriceItem.results[j].editQtyRet = true;
											result.d.navToPriceItem.results[j].editUOMRet = true;
										}
									}
								}
								that.returnItems = result.d.navToPriceItem.results;
								for (var i = that.returnItems.length - 1; i >= 0; i--) {
									if (that.returnItems[i].deleted === "true") {
										that.returnItems.splice(i, 1);
									} else {
										returnAmountTotal = returnAmountTotal + parseFloat(that.returnItems[i].netAmount);
									}
								}
								returnModel.setProperty("/results", that.returnItems);
								baseModel.setProperty("/originalReturnData", JSON.parse(JSON.stringify(that.returnItems)));
								returnModel.setProperty("/returnLength", "Returns (" + that.returnItems.length +
									")");
								returnModel.setProperty("/returnAmountTotal", returnAmountTotal.toFixed(2) + "(THB)");
								returnModel.refresh();
								that.onResetSearchInvoice();
							} else if (tab === "ReturnsTab") {
								var returnAmountTotal = 0;
								var length = 0;
								var returnRowData = result.d.navToPriceItem.results;
								var returnData = returnModel.getProperty("/results");
								for (var i = 0; i < returnRowData.length; i++) {

									for (var j = 0; j < returnData.length; j++) {
										if (returnRowData[i].refInvoice === returnData[j].refInvoice && returnRowData[i].refItemNumber === returnData[j].refItemNumber) {
											if (returnData[j].deleted === "false") {
												returnRowData[i].deleted = "false";
											} else {
												returnRowData[i].deleted = "true";
											}
											returnData[j] = returnRowData[i];
											if (baseModel.getData().selectedROTypeCode === "TI") {
												returnData[j].editQtyRet = true;
												returnData[j].editUOMRet = true;
												returnData[j].editSLocRet = false;
												returnData[j].editUPRet = false;
												returnData[j].editBatchRet = false;
												returnData[j].editSerialNoRet = false;
											} else if (baseModel.getData().selectedROTypeCode === "TK") {
												returnData[j].editSLocRet = false;
												returnData[j].editUPRet = false;
												returnData[j].editBatchRet = false;
												returnData[j].editSerialNoRet = false;
												returnData[j].editQtyRet = false;
												returnData[j].editUOMRet = false;
											} else {
												returnData[j].editSLocRet = true;
												returnData[j].editUPRet = true;
												returnData[j].editBatchRet = true;
												returnData[j].editSerialNoRet = true;
												returnData[j].editQtyRet = true;
												returnData[j].editUOMRet = true;
											}
										}

									}
								}
								for (var j = 0; j < returnData.length; j++) {
									if (returnData[j].deleted === "false") {
										returnAmountTotal = returnAmountTotal + parseFloat(returnData[j].netAmount);
										++length;
									}
								}
								returnModel.setProperty("/results", returnData);
								baseModel.setProperty("/originalReturnData", JSON.parse(JSON.stringify(returnData)));
								// returnModel.setProperty("/results", that._getTotalAmount(returnItems));
								returnModel.setProperty("/returnLength", "Returns (" + length +
									")");
								returnModel.setProperty("/returnAmountTotal", returnAmountTotal.toFixed(2) + "(THB)");
								returnModel.refresh();
								if (result.d.navToPriceConditions) {
									for (var i = 0; i < result.d.navToPriceConditions.results.length; i++) {
										that.returnConditions.push(result.d.navToPriceConditions.results[i]);
									}
									returnModel.setProperty("/returnConditions", that.returnConditions);
								}
							} else if (tab === "Exchange") {
								that.getView().byId("ID_TAB_BAR_PROV_APP").setSelectedKey("Exchange");
								baseModel.setProperty("/exchangeTabVisiblity", true);
								var exchangeAmountTotal = 0;
								if (result.d.navToPriceConditions) {
									that.exchangeConditions = result.d.navToPriceConditions.results;
									exchangeModel.setProperty("/exchangeConditions", that.exchangeConditions);
								}
								that.exchangeItems = result.d.navToPriceItem.results;
								for (var j = 0; j < that.exchangeItems.length; j++) {
									exchangeAmountTotal = exchangeAmountTotal + parseFloat(that.exchangeItems[j].netAmount);
									if (that.exchangeItems[j].higherItem !== "000000") {
										that.exchangeItems[j].editable = false;

									} else {
										that.exchangeItems[j].editable = true;
									}
									that.exchangeItems[j].deleted = "false";
									that.exchangeItems[j].FOCEnabled = false;
									if (that.exchangeItems[j].refInvoice === "") {
										if (that.exchangeItems[j].higherItem !== "000000") {
											that.exchangeItems[j].FOCEnabled = false;
										} else {
											that.exchangeItems[j].FOCEnabled = true;
										}
									} else {
										that.exchangeItems[j].FOCEnabled = false;
									}
									if (that.exchangeItems[j].manualFoc === "X") {
										if (that.docVersion === "SUCCESS") {
											that.exchangeItems[j].manualFOCCheck = true;
											that.exchangeItems[j].FOCEnabled = false;
										} else {
											that.exchangeItems[j].manualFOCCheck = true;
											that.exchangeItems[j].FOCEnabled = true;
										}
									} else {
										that.exchangeItems[j].manualFOCCheck = false;
									}
									/*--- settle borrow goods--*/
									if (that.docVersion === "SUCCESS") {
										that.exchangeItems[j].editSLocEx = false;
										that.exchangeItems[j].editSerialNoEx = false;
										that.exchangeItems[j].editable = false;
										that.exchangeItems[j].editExqty = false;
										that.exchangeItems[j].editBatchEx = false;

									} else {
										if (baseModel.getData().selectedROTypeCode === "TI") {
											if (baseModel.getProperty("/roTypeSLoc")) {
												that.exchangeItems[j].storageLocation = baseModel.getProperty("/roTypeSLoc");
											}
											if (that.exchangeItems[j].refInvoice !== "") {
												that.exchangeItems[j].editSLocEx = false;
												that.exchangeItems[j].editSerialNoEx = true;
												that.exchangeItems[j].editBatchEx = true;
												that.exchangeItems[j].editBatchEx = true;
												that.exchangeItems[j].editable = false;
												that.exchangeItems[j].editExqty = false;

											} else {
												that.exchangeItems[j].editSLocEx = true;
												that.exchangeItems[j].editSerialNoEx = true;
												that.exchangeItems[j].editBatchEx = true;
												that.exchangeItems[j].editable = false;

												that.exchangeItems[j].editExqty = false;

											}
										} else if (baseModel.getData().selectedROTypeCode === "TK") {
											if (baseModel.getProperty("/roTypeSLoc")) {
												that.exchangeItems[j].storageLocation = baseModel.getProperty("/roTypeSLoc");
											}
											if (that.exchangeItems[j].refInvoice !== "") {
												that.exchangeItems[j].editSLocEx = false;
												that.exchangeItems[j].editSerialNoEx = false;
												that.exchangeItems[j].editBatchEx = true;
											} else {
												that.exchangeItems[j].editSLocEx = true;
												that.exchangeItems[j].editBatchEx = true;
											}
										} else {
											that.exchangeItems[j].editSLocEx = true;
											that.exchangeItems[j].editSerialNoEx = true;
											that.exchangeItems[j].editBatchEx = true;
										}
									}
								}

								exchangeModel.setProperty("/results", that.exchangeItems);
								baseModel.setProperty("/originalExchangeData", JSON.parse(JSON.stringify(that.exchangeItems)));
								exchangeModel.setProperty("/exchangeLength", "Exchange (" + that.exchangeItems.length +
									")");
								exchangeModel.setProperty("/exchangeAmountTotal", exchangeAmountTotal.toFixed(2) + "(THB)");
								exchangeModel.refresh();
							} else if (tab === "ExchangeTab") {
								var exchangeAmountTotal = 0;
								if (result.d.navToPriceConditions) {
									that.exchangeConditions = result.d.navToPriceConditions.results;
									exchangeModel.setProperty("/exchangeConditions", that.exchangeConditions);
								}
								var exchangeRowData = result.d.navToPriceItem.results;
								var exchangeData = exchangeModel.getProperty("/results");
								for (var i = 0; i < exchangeRowData.length; i++) {
									exchangeAmountTotal = exchangeAmountTotal + parseFloat(exchangeRowData[i].netAmount);
									if (exchangeRowData[i].higherItem !== "000000") {
										exchangeRowData[i].editable = false;
									} else {
										exchangeRowData[i].editable = true;
									}
									if (exchangeRowData[i].refInvoice === "") {
										if (exchangeRowData[i].higherItem !== "000000") {
											exchangeRowData[i].FOCEnabled = false;
										} else {
											exchangeRowData[i].FOCEnabled = true;
										}
									} else {
										exchangeRowData[i].FOCEnabled = false;
									}
									if (exchangeRowData[i].manualFoc === "X") {
										if (that.docVersion === "SUCCESS") {
											exchangeRowData[i].manualFOCCheck = true;
											exchangeRowData[i].FOCEnabled = false;
										} else {
											exchangeRowData[i].manualFOCCheck = true;
											exchangeRowData[i].FOCEnabled = true;
										}
									} else {
										exchangeRowData[i].manualFOCCheck = false;
									}
									exchangeRowData[i].deleted = "false";
									if (baseModel.getData().selectedROTypeCode === "TI") {
										if (exchangeRowData[i].refInvoice !== "") {
											exchangeRowData[i].editSLocEx = false;
											exchangeRowData[i].editSerialNoEx = true;
											exchangeRowData[i].editable = false;
											exchangeRowData[i].editExqty = false;
										} else {

											exchangeRowData[i].editSLocEx = true;
											exchangeRowData[i].editSerialNoEx = true;
											exchangeRowData[i].editable = false;
											exchangeRowData[i].editExqty = false;
										}
									} else if (baseModel.getData().selectedROTypeCode === "TK") {
										if (exchangeRowData[i].refInvoice !== "") {
											exchangeRowData[i].editSLocEx = false;
											exchangeRowData[i].editSerialNoEx = false;
										} else {

											exchangeRowData[i].editSLocEx = true;
											exchangeRowData[i].editSerialNoEx = false;
										}
									} else {
										exchangeRowData[i].editSLocRet = true;
										exchangeRowData[i].editSerialNoRet = true;
									}
								}
								exchangeModel.setProperty("/results", exchangeRowData);
								baseModel.setProperty("/originalExchangeData", JSON.parse(JSON.stringify(exchangeRowData)));
								exchangeModel.setProperty("/exchangeLength", "Exchange (" + exchangeRowData.length +
									")");
								exchangeModel.setProperty("/exchangeAmountTotal", exchangeAmountTotal.toFixed(2) + "(THB)");
								exchangeModel.refresh();
							} else if (tab === "ExchangeDelete") {
								var exchangeAmountTotal = 0;
								that.exchangeConditions = result.d.navToPriceConditions.results;
								exchangeModel.setProperty("/exchangeConditions", that.exchangeConditions);
								var exchangeRowData = result.d.navToPriceItem.results;
								var exchangeData = exchangeModel.getProperty("/results");
								for (var j = 0; j < exchangeData.length; j++) {
									for (var i = 0; i < exchangeRowData.length; i++) {
										exchangeAmountTotal = exchangeAmountTotal + parseFloat(exchangeRowData[i].netAmount);
										exchangeRowData[i].deleted = "false";
										if (exchangeRowData[i].higherItem !== "000000") {
											exchangeRowData[i].editable = false;

										} else {
											exchangeRowData[i].editable = true;
										}
										if (exchangeRowData[i].refInvoice === exchangeData[j].refInvoice && exchangeRowData[i].refItemNumber ===
											exchangeData[
												j].refItemNumber) {
											exchangeRowData[i].deleted = "false";
											exchangeData[j] = exchangeRowData[i];
										} else if (exchangeRowData[i].refInvoice === exchangeData[j].refInvoice && exchangeRowData[i].refItemNumber ===
											"000000") {
											exchangeRowData[i].deleted = "false";
											exchangeData[j] = exchangeRowData[i];
										}
									}
								}
								exchangeModel.setProperty("/results", exchangeData);
								baseModel.setProperty("/originalExchangeData", JSON.parse(JSON.stringify(exchangeRowData)));
								exchangeModel.setProperty("/exchangeLength", "Exchange (" + exchangeRowData.length +
									")");
								exchangeModel.setProperty("/exchangeAmountTotal", exchangeAmountTotal.toFixed(2) + "(THB)");
								exchangeModel.refresh();
							}
						},
						error: function (result, xhr, data) {
							busyDialog.close();
							var errorMsg = "";
							if (result.status === 504) {
								errorMsg = that.resourceBundle.getText("timeOut");
								errorMsg = "Request timed-out. Please try again using different search filters or add more search filters.";
								MessageBox.error(errorMsg);
								// that.errorMsg(errorMsg);
							} else {
								var generic = "";
								var detail = "";
								var errorContent = result.responseJSON.error.innererror.errordetails;
								for (var i = 0; i < errorContent.length; i++) {
									if (errorContent[i].severity === "warning") {
										generic = generic + " " + errorContent[i].message;
									} else {
										detail = detail + " " + errorContent[i].message;
									}
								}
								sap.m.MessageBox.error(generic, {
									title: "Error",
									id: "messageBoxId2",
									details: detail,
									contentWidth: "100px"

								});
							}
						}
					});
				}
			});
		},

		selectUom: function (oEvent) {
			var that = this;
			var data = [];
			if (this.getView().byId("ID_TAB_BAR_PROV_APP").getSelectedKey() === "Return" && (!this.UOMIndex.getObject().MaterialCode)) {
				this.getView().getModel("returnModel").getData().results[parseInt(this.UOMIndex.getPath().split("/")[2])].salesUnit = oEvent.getParameters()
					.selectedContexts[0].getObject().alternateUom;
				var currentObject = this.UOMIndex.getObject();
				var returnData = this.getView().getModel("returnModel").getProperty("/results");
				for (var j = 0; j < returnData.length; j++) {
					if (returnData[j].refInvoice === currentObject.refInvoice) {
						data.push(returnData[j]);
					}
				}
				var returnConditions = this.getView().getModel("returnModel").getProperty("/returnConditions");
				for (var j = returnConditions.length - 1; j >= 0; j--) {
					if (returnConditions[j].refInvoice === currentObject.refInvoice) {
						returnConditions.splice(j, 1);
					}
				}
				this.getView().getModel("returnModel").setProperty("/returnConditions", returnConditions);
				this._pricingSimulation(data, "ReturnsTab");
				this.getView().getModel("returnModel").refresh();
			} else if (this.getView().byId("ID_TAB_BAR_PROV_APP").getSelectedKey() === "Exchange") {
				this.getView().getModel("exchangeModel").getData().results[parseInt(this.UOMIndex.getPath().split("/")[2])].salesUnit = oEvent.getParameters()
					.selectedContexts[0].getObject().alternateUom;
				this.currentObject = this.UOMIndex.getObject();
				var path = parseInt(this.UOMIndex.getPath().split("/")[2]);
				var exchangeData = this.getView().getModel("exchangeModel").getProperty("/results");
				for (var j = 0; j < exchangeData.length; j++) {
					// check if item is foc or manual foc 
					if ((exchangeData[j].refInvoice === "" && exchangeData[j].higherItem !== "000000" && exchangeData[j].manualFoc !== "X" &&
							exchangeData[j].higherItem !== "")) {} else {
						data.push(exchangeData[j]);
					}
				}
				this._pricingSimulation(data, "ExchangeTab");
				this.getView().getModel("exchangeModel").refresh();
				// }
			} else {
				this.getView().getModel("invoiceSearchModel").getData().results[parseInt(this.UOMIndex.getPath().split("/")[2])].actualRetUOM =
					oEvent.getParameters()
					.selectedContexts[0].getObject().alternateUom;
				var currentObject = this.UOMIndex.getObject();
				this.getView().getModel("invoiceSearchModel").refresh();
			}
		},

		onChangeRetQTY: function (oEvent) {
			this.RetQtyCount = 0;
			var data = [];
			var orgRetData = this.getView().getModel("baseModel").getProperty("/originalReturnData");
			var currentObject = oEvent.getSource().getBindingContext("returnModel").getObject();
			var returnData = this.getView().getModel("returnModel").getProperty("/results");
			if (currentObject.quantity === "") {
				MessageBox.information(this.resourceBundle.getText("Quantitycannotbeempty"));
				// MessageBox.information("Quantity cannot be empty");
				return;
			}
			for (var i = 0; i < orgRetData.length; i++) {
				if (orgRetData[i].refInvoice === currentObject.refInvoice && orgRetData[i].refItemNumber === currentObject.refItemNumber) {
					if (parseFloat(currentObject.quantity) > parseFloat(orgRetData[i].avlRetQty)) {
						++this.RetQtyCount;
						MessageBox.information(this.resourceBundle.getText("EnteredReturnedQtycannotbegreaterthanAvailableReturnQty"));
						// MessageBox.information("Return qty cannot be larger than available return Qty");
					} else {
						if (this.RetQtyCount > 0) {
							--this.RetQtyCount;
						}
						for (var j = 0; j < returnData.length; j++) {
							if (returnData[j].refInvoice === currentObject.refInvoice && returnData[j].deleted === "false") {
								data.push(returnData[j]);
							}
						}
						var returnConditions = this.getView().getModel("returnModel").getProperty("/returnConditions");
						for (var j = returnConditions.length - 1; j >= 0; j--) {
							if (returnConditions[j].refInvoice === currentObject.refInvoice) {
								returnConditions.splice(j, 1);
							}
						}
						this.getView().getModel("returnModel").setProperty("/returnConditions", returnConditions);
						this._pricingSimulation(data, "ReturnsTab");
					}
				}
			}
		},

		onChangeExcQty: function (oEvent) {

			var data = [];
			var orgRetData = this.getView().getModel("baseModel").getProperty("/originalExchangeData");
			var currentObject = oEvent.getSource().getBindingContext("exchangeModel").getObject();
			var exchangeData = this.getView().getModel("exchangeModel").getProperty("/results");
			if (currentObject.quantity === "") {
				MessageBox.information(this.resourceBundle.getText("Quantitycannotbeempty"));
				// MessageBox.information("Quantity cannot be empty");
			} else {
				for (var j = 0; j < exchangeData.length; j++) {
					if (exchangeData[j].deleted === "false") {
						if ((exchangeData[j].refInvoice === "" && exchangeData[j].higherItem !== "000000" && exchangeData[j].manualFoc !== "X" &&
								exchangeData[j].higherItem !== "")) {} else {
							data.push(exchangeData[j]);
						}
					}
				}
				this._pricingSimulation(data, "ExchangeTab");
			}
		},

		onAddFOC: function (oEvent) {
			var data = [];
			var orgRetData = this.getView().getModel("baseModel").getProperty("/originalExchangeData");
			var index = parseInt(oEvent.getSource().getBindingContext("exchangeModel").sPath.split("/")[2]);
			var currentObject = oEvent.getSource().getBindingContext("exchangeModel").getObject();
			var exchangeData = this.getView().getModel("exchangeModel").getProperty("/results");
			if (exchangeData.length === 1) {
				if (oEvent.getSource().getSelected() === true) {
					oEvent.getSource().setSelected(false);
					MessageBox.information(this.resourceBundle.getText("CannotaddmanualFOC"));
					// MessageBox.information("Cannot add manual FOC");
				}

			} else {
				var flag = oEvent.getSource().getSelected();
				if (flag === false) {
					currentObject.manualFoc = "";
				} else {
					currentObject.manualFoc = "X";
				}

				for (var j = 0; j < exchangeData.length; j++) {
					if (exchangeData[j].deleted === "false") {
						if ((exchangeData[j].refInvoice === "" && exchangeData[j].higherItem !== "000000" && exchangeData[j].higherItem !== "" &&
								exchangeData[j].manualFoc !== "X" && index !== j)) {} else {
							// if()
							data.push(exchangeData[j]);
						}
					}
				}
				this._pricingSimulation(data, "ExchangeTab");
			}
		},

		onChangeUnitPrice: function (oEvent) {
			this.RetUPCount = 0;
			var data = [];
			var orgRetData = this.getView().getModel("baseModel").getProperty("/originalReturnData");
			var currentObject = oEvent.getSource().getBindingContext("returnModel").getObject();
			var returnData = this.getView().getModel("returnModel").getProperty("/results");
			if (parseFloat(currentObject.unitPrice) < parseFloat(currentObject.unitPriceInv)) {
				MessageToast.show(this.resourceBundle.getText("UnitPriceValidation"));
				// MessageToast.show("Unit Price entered is less Unit Price Inv");
			}

			for (var j = 0; j < returnData.length; j++) {
				if (returnData[j].refInvoice === currentObject.refInvoice && returnData[j].deleted === "false") {
					data.push(returnData[j]);
				}
			}
			var returnConditions = this.getView().getModel("returnModel").getProperty("/returnConditions");
			for (var j = returnConditions.length - 1; j >= 0; j--) {
				if (returnConditions[j].refInvoice === currentObject.refInvoice) {
					returnConditions.splice(j, 1);
				}
			}
			this.getView().getModel("returnModel").setProperty("/returnConditions", returnConditions);
			this._pricingSimulation(data, "ReturnsTab");
			// }
		},

		onChangeExcUP: function (oEvent) {
			this.ExcUPCount = 0;
			var data = [];
			var orgExcData = this.getView().getModel("baseModel").getProperty("/originalExchangeData");
			var currentObject = oEvent.getSource().getBindingContext("exchangeModel").getObject();
			var exchangeData = this.getView().getModel("exchangeModel").getProperty("/results");
			if (parseFloat(currentObject.unitPrice) < parseFloat(currentObject.unitPriceInv)) {

				MessageToast.show(this.resourceBundle.getText("UnitPriceValidation"));
			}
			for (var j = 0; j < exchangeData.length; j++) {
				if (exchangeData[j].deleted === "false") {
					if ((exchangeData[j].refInvoice === "" && exchangeData[j].higherItem !== "000000" && exchangeData[j].manualFoc !== "X" &&
							exchangeData[j].higherItem !== "")) {} else {
						data.push(exchangeData[j]);
					}
				}
			}
			this._pricingSimulation(data, "ExchangeTab");
		},

		// tab switch btw return and exchange
		onTabSelection: function (oEvent) {
			if (this._oPopover) {
				this._oPopover = undefined;
			}
			var baseModel = this.getView().getModel("baseModel");
			baseModel.setProperty("/comment", "");
			baseModel.setProperty("/contactTelephone", "");
			baseModel.setProperty("/contactDivision", "");
			baseModel.setProperty("/contactPerson", "");
			// baseModel.setProperty("/STSNotiValue", "");
			baseModel.setProperty("/remark", "");
			baseModel.refresh();
		},

		onCopyItemsToExchange: function () {
			var that = this;
			if (this._oPopover) {
				this._oPopover = undefined;
			}
			if (this.RetQtyCount > 0) {
				MessageBox.information("Entered Qty cannot be greater than Available Return Qty In Returns");
				return;
			}
			var smsInputVisiblity = this.getView().getModel("baseModel").getProperty("/smsInputVisiblity");
			var emailInputVisiblity = this.getView().getModel("baseModel").getProperty("/emailInputVisiblity");
			if (smsInputVisiblity === true && (this.getView().getModel("baseModel").getProperty("/phoneNum") === "" || this.getView().getModel(
					"baseModel").getProperty("/phoneNum") === undefined)) {
				MessageToast.show(this.resourceBundle.getText("EnterPhoneNumber"));
				// MessageToast.show("Enter Phone Number");
				return;
			}
			if (emailInputVisiblity === true && (this.getView().getModel("baseModel").getProperty("/userEmailId") === "" || this.getView().getModel(
					"baseModel").getProperty("/userEmailId") === undefined)) {
				MessageToast.show(this.resourceBundle.getText("EnterEmailId"));
				// MessageToast.show("Enter Email Id");
				return;
			}
			if (this.getView().getModel("baseModel").getProperty("/reasonOwner") === "" || this.getView().getModel("baseModel").getProperty(
					"/reasonOwner") === undefined) {
				MessageToast.show(this.resourceBundle.getText("ReasonOwnerisMandatory"));
				// MessageToast.show("Reason Owner is Mandatory");
				return;
			}
			if (this.getView().getModel("baseModel").getProperty("/referenceNo") === "" || this.getView().getModel("baseModel").getProperty(
					"/referenceNo") === undefined) {
				MessageToast.show(this.resourceBundle.getText("referenceNoisMandatory"));
				// MessageToast.show("reference No is Mandatory");
				return;
			}
			var exchangeItems = [];
			var returnItems = this.getView().getModel("returnModel").getData().results;
			var exchangeAmountTotal = 0;
			for (var i = 0; i < returnItems.length; i++) {
				if (returnItems[i].deleted === "false") {
					if (returnItems[i].active !== "E") {
						exchangeAmountTotal = exchangeAmountTotal + parseFloat(returnItems[i].netAmount);
						exchangeItems.push(JSON.parse(JSON.stringify(returnItems[i])));
						if (this.getView().getModel("baseModel").getData().selectedROTypeCode === "TI" || this.getView().getModel("baseModel").getData()
							.selectedROTypeCode ===
							"TK") {} else {}
					} else {
						MessageToast.show(this.resourceBundle.getText("exchangenotallowed"));
						// MessageToast.show("Sales/ exchange not allowed");
					}

				}
			}
			if (exchangeItems.length > 0) {
				for (var i = 0; i < exchangeItems.length; i++) {
					exchangeItems[i].storageLocation = "";
					exchangeItems[i].batchNumber = "";
					exchangeItems[i].serialNumber = "";
					exchangeItems[i].manualFoc = "";
				}
				this.selectedItemsforDelete = [];
				this.deletedItem = [];
				this._pricingSimulation(exchangeItems, "Exchange");
				if (this.getView().getModel("baseModel").getProperty("/exchangeTabVisiblity") === false) {
					this._getPersonalizationDetails("keyExchange", "Before");
					this.getView().getModel("baseModel").setProperty("/exchangeTabVisiblity", true);
				}
				this.getView().getModel("baseModel").setProperty("/exchangeTabVisiblity", true);
				this.getView().getModel("baseModel").refresh();
				if (exchangeItems.length > 10) {
					this.getView().getModel("baseModel").setProperty("/exchangeTableLength", "60vh");
				} else {
					this.getView().getModel("baseModel").setProperty("/exchangeTableLength", "");
				}
			} else {
				if (this.getView().getModel("baseModel").getProperty("/exchangeTabVisiblity") === false) {
					this._getPersonalizationDetails("keyExchange", "Before");
				}
				this.getView().getModel("baseModel").setProperty("/exchangeTabVisiblity", true);
				this.getView().byId("ID_TAB_BAR_PROV_APP").setSelectedKey("Exchange");
				this.getView().getModel("baseModel").refresh();
			}
			if (this._oPopover) {
				this._oPopover = undefined;
			}
			this._shipToDropdown();
			var baseModel = this.getView().getModel("baseModel");
			baseModel.setProperty("/comment", "");
			baseModel.setProperty("/contactTelephone", "");
			baseModel.setProperty("/contactDivision", "");
			baseModel.setProperty("/contactPerson", "");
			baseModel.setProperty("/remark", "");
			baseModel.setProperty("/exSoldTo", baseModel.getProperty("/returnSoldTo"));
			baseModel.setProperty("/exSoldToDesc", baseModel.getProperty("/returnSoldToDesc"));
			baseModel.setProperty("/exShipTo", baseModel.getProperty("/returnShipTo"));
			baseModel.setProperty("/exShipToDesc", baseModel.getProperty("/shipToDesc"));
			baseModel.setProperty("/exBillTo", baseModel.getProperty("/returnBillTo"));
			baseModel.setProperty("/exBillToDesc", baseModel.getProperty("/returnBillToDesc"));
			baseModel.setProperty("/exPayer", baseModel.getProperty("/returnPayer"));
			baseModel.setProperty("/exPayerDesc", baseModel.getProperty("/returnPayerDesc"));
			baseModel.refresh();
		},

		valueHelpRequestShipTo: function (oEvent) {
			var that = this;
			var invoiceSearchModel = this.getView().getModel("invoiceSearchModel");
			var baseModel = this.getView().getModel("baseModel");
			that.ShipTO = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.ShipTO", that);
			that.getView().addDependent(that.ShipTO);
			var oDataModel = this.getView().getModel("ZDKSH_CC_DAC_SOLDTOPARTY_SRV");
			var filters = [];
			var oFilter = new sap.ui.model.Filter({
				filters: [
					new sap.ui.model.Filter("CustCode", sap.ui.model.FilterOperator.EQ, baseModel.getProperty("/exSoldTo")),
					new sap.ui.model.Filter("SalesOrg", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getProperty("/salesOrgNo")),
					new sap.ui.model.Filter("DistChnl", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getProperty("/distChnl")),
					new sap.ui.model.Filter("Division", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getProperty("/Division"))
				],
				and: true
			});
			filters.push(oFilter);
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			oDataModel.read("/ShipToPartySet", {
				async: false,
				filters: filters,
				success: function (oData, oResponse) {
					busyDialog.close();
					var shipToModel = new sap.ui.model.json.JSONModel({
						"results": oData.results
					});
					that.ShipTO.setModel(shipToModel, "shipToModel");
					that.ShipTO.open();
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = "";
					if (error.statusCode === 504) {
						// errorMsg = "Request timed-out. Please try again!";
						errorMsg = that.resourceBundle.getText("timeOut");
						that.errorMsg(errorMsg);
					} else {
						errorMsg = JSON.parse(error.responseText);
						errorMsg = errorMsg.error.message.value;
						that.errorMsg(errorMsg);
					}
				}
			});
		},

		valueHelpRequestBillTo: function (oEvent) {
			var that = this;
			var invoiceSearchModel = this.getView().getModel("invoiceSearchModel");
			var baseModel = this.getView().getModel("baseModel");
			that.BillTo = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.BillTo", that);
			that.getView().addDependent(that.BillTo);
			var oDataModel = this.getView().getModel("ZDKSH_CC_DAC_SOLDTOPARTY_SRV");
			var filters = [];
			var oFilter = new sap.ui.model.Filter({
				filters: [
					new sap.ui.model.Filter("CustCode", sap.ui.model.FilterOperator.EQ, baseModel.getProperty("/exSoldTo")),
					new sap.ui.model.Filter("SalesOrg", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getProperty("/salesOrgNo")),
					new sap.ui.model.Filter("DistChnl", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getProperty("/distChnl")),
					new sap.ui.model.Filter("Division", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getProperty("/Division"))
				],
				and: true
			});
			filters.push(oFilter);
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			oDataModel.read("/BillToPartySet", {
				async: false,
				filters: filters,
				success: function (oData, oResponse) {
					busyDialog.close();
					var billToModel = new sap.ui.model.json.JSONModel({
						"results": oData.results
					});
					that.BillTo.setModel(billToModel, "billToModel");
					that.BillTo.open();
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = "";
					if (error.statusCode === 504) {
						// errorMsg = "Request timed-out. Please try again!";
						errorMsg = that.resourceBundle.getText("timeOut");
						that.errorMsg(errorMsg);
					} else {
						errorMsg = JSON.parse(error.responseText);
						errorMsg = errorMsg.error.message.value;
						that.errorMsg(errorMsg);
					}
				}
			});
		},

		valueHelpRequestPayer: function (oEvent) {
			var that = this;
			var invoiceSearchModel = this.getView().getModel("invoiceSearchModel");
			var baseModel = this.getView().getModel("baseModel");
			that.Payer = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.Payer", that);
			that.getView().addDependent(that.Payer);
			var oDataModel = this.getView().getModel("ZDKSH_CC_DAC_SOLDTOPARTY_SRV");
			var filters = [];
			var oFilter = new sap.ui.model.Filter({
				filters: [
					new sap.ui.model.Filter("CustCode", sap.ui.model.FilterOperator.EQ, baseModel.getProperty("/exSoldTo")),
					new sap.ui.model.Filter("SalesOrg", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getProperty("/salesOrgNo")),
					new sap.ui.model.Filter("DistChnl", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getProperty("/distChnl")),
					new sap.ui.model.Filter("Division", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getProperty("/Division"))
				],
				and: true
			});
			filters.push(oFilter);
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			oDataModel.read("/PayerSet", {
				async: false,
				filters: filters,
				success: function (oData, oResponse) {
					busyDialog.close();
					var payerModel = new sap.ui.model.json.JSONModel({
						"results": oData.results
					});
					that.Payer.setModel(payerModel, "payerModel");
					that.Payer.open();
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = "";
					if (error.statusCode === 504) {
						// errorMsg = "Request timed-out. Please try again!";
						errorMsg = that.resourceBundle.getText("timeOut");
						that.errorMsg(errorMsg);
					} else {
						errorMsg = JSON.parse(error.responseText);
						errorMsg = errorMsg.error.message.value;
						that.errorMsg(errorMsg);
					}
				}
			});
		},

		_loadCity: function (oEvent) {
			var that = this;
			var invoiceSearchModel = this.getView().getModel("invoiceSearchModel");
			var oDataModel = this.getView().getModel("ZDKSH_CC_RETURNS_MANAGEMENT_SRV");
			var filters = [];
			var oFilter = new sap.ui.model.Filter({
				filters: [
					new sap.ui.model.Filter("salesOrg", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getProperty("/salesOrgNo")),
				],
				// and: true
			});
			filters.push(oFilter);
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			oDataModel.read("/cityLookupSet", {
				async: false,
				filters: filters,
				success: function (oData, oResponse) {
					busyDialog.close();
					var cityModel = new sap.ui.model.json.JSONModel({
						"results": oData.results
					});
					that.getView().setModel(cityModel, "cityModel");
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = "";
					if (error.statusCode === 504) {
						// errorMsg = "Request timed-out. Please try again!";
						errorMsg = that.resourceBundle.getText("timeOut");
						that.errorMsg(errorMsg);
					} else {
						errorMsg = JSON.parse(error.responseText);
						errorMsg = errorMsg.error.message.value;
						that.errorMsg(errorMsg);
					}
				}
			});
		},

		//  stip to for exchange header
		_shipToDropdown: function (oEvent) {
			var that = this,
				aPayload = this.getView().getModel("baseModel").getData(),
				afilters = [];
			afilters.push(new sap.ui.model.Filter("CustCode", sap.ui.model.FilterOperator.EQ, this.getView().getModel("invoiceSearchModel").getData()
				.soldToParty));
			afilters.push(new sap.ui.model.Filter("Distchl", sap.ui.model.FilterOperator.EQ, that.distrChannelDataAccess));
			afilters.push(new sap.ui.model.Filter("Division", sap.ui.model.FilterOperator.EQ, that.divisionDataAccess));
			afilters.push(new sap.ui.model.Filter("SalesOrg", sap.ui.model.FilterOperator.EQ, that.salesOrgDataAccess));
			afilters.push(new sap.ui.model.Filter("languageID", sap.ui.model.FilterOperator.EQ, this.getView().getModel("baseModel").getProperty(
				"/languageID")));
			var oDataModel = this.getView().getModel("ZDKSH_CC_DAC_SOLDTOPARTY_SRV");
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			oDataModel.read("/ZSoldToPartySH", {
				async: false,
				filters: afilters,
				success: function (oData, oResponse) {
					busyDialog.close();
					var shipToListSet = new sap.ui.model.json.JSONModel({
						"results": oData.results
					});
					that.getView().setModel(shipToListSet, "shipToListSet");
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = "";
					if (error.statusCode === 504) {
						errorMsg = that.resourceBundle.getText("timeOut");
						// errorMsg = "Request timed-out. Please try again!";
						that.errorMsg(errorMsg);
					} else {
						errorMsg = JSON.parse(error.responseText);
						errorMsg = errorMsg.error.message.value;
						that.errorMsg(errorMsg);
					}
				}
			});
		},

		onSelectReturnReason: function (oEvent) {
			if (this.getView().getModel("baseModel").getProperty("/selectedROType") === undefined || this.getView().getModel("baseModel").getProperty(
					"/selectedROType") === "") {
				MessageToast.show(this.resourceBundle.getText("SelectROTypefirst"));
				// MessageToast.show("Select RO Type first");
				this.getView().getModel("baseModel").setProperty("/selectedReturnReason", "");
				// return;
			} else {
				this.retReasonCode = oEvent.getSource().getSelectedKey();
				this.getView().getModel("baseModel").setProperty("/step1Validation", true);
				this.getView().byId("RotypeSegementedBtnID").setEnabled(false);
				this.getView().getModel("baseModel").setProperty("/enableReturnReason", true);
				this._getReasonOwner();
				var invoiceSearchModel = this.getView().getModel("invoiceSearchModel");
				var baseModel = this.getView().getModel("baseModel");
				invoiceSearchModel.setProperty("/salesOrgNo", baseModel.getData().selectedSalesOrg);
				invoiceSearchModel.setProperty("/salesOrgDesc", baseModel.getData().selectedSalesOrgDesc);
				invoiceSearchModel.setProperty("/distChnl", baseModel.getData().selectedDistChl);
				invoiceSearchModel.setProperty("/distChnlDesc", baseModel.getData().selectedDistChlDesc);
				invoiceSearchModel.setProperty("/soldToParty", baseModel.getData().selectedSoldtoParty);
				invoiceSearchModel.setProperty("/soldToPartyDesc", baseModel.getData().selectedSoldtoPartyDesc);
				// this._wizard.goToStep(this.byId("ID_WIZARD_SEL_CUST"));
				this._wizard.setCurrentStep(this.byId("ID_WIZARD_SEL_CUST"));
			}

		},

		valueHelpRequestSalesOrg: function () {
			var that = this;
			if (that.salesOrgDataAccess === "No Access") {
				MessageToast.show(this.resourceBundle.getText("NoDataAccess"));
				// MessageToast.show("No Data Access");
			} else {
				this.salesOrg.open();
			}
		},

		handleWizardCancel: function () {
			var that = this;
			sap.m.MessageBox.confirm(this.resourceBundle.getText("progress"), {
				onClose: function (sAction) {
					if (sAction === MessageBox.Action.OK) {
						that._discardChanges();
						that._wizard.discardProgress(that._wizard.getSteps()[0]);
						var router = sap.ui.core.UIComponent.getRouterFor(that);
						router.navTo("DraftRecord");
					}
				}
			});
		},

		_discardChanges: function () {
			var that = this;
			this.discard = true;
			this.selectedRetObjects = [];
			this.returnItems = [];
			this.returnConditions = [];
			this.exchangeItems = [];
			this.exchangeConditions = [];
			this.selectedObjects = [];
			var attachmentObject = [];
			this.changeSoldToParty = undefined;
			this.getView().byId("RotypeSegementedBtnID").setEnabled(true);
			var exchangeModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(exchangeModel, "exchangeModel");
			var returnModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(returnModel, "returnModel");
			this.getView().getModel("returnModel").setProperty("/attachmentObject", attachmentObject);
			var baseModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(baseModel, "baseModel");
			var baseModel = this.getView().getModel("baseModel");
			var invoiceSearchModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(invoiceSearchModel, "invoiceSearchModel");
			var PersonalizationModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(PersonalizationModel, "PersonalizationModel");
			baseModel.setProperty("/enableReturnReason", true);
			this.docVersion = undefined;
			that.docVersion = undefined;
			baseModel.setProperty("/step1Validation", false);
			baseModel.setProperty("/step2Validation", false);
			baseModel.setProperty("/step3Validation", false);
			baseModel.setProperty("/step4Validation", false);
			baseModel.setProperty("/step5Validation", false);
			baseModel.setProperty("/phone", "");
			this.getView().byId("RotypeSegementedBtnID").setSelectedKey("");
			this.getView().byId("RotypeSegementedBtnID").setSelectedButton("None");
			this._wizard = this.byId("ID_WIZARD_RETURN");
			this._oNavContainer = this.byId("ID_RETURN_NAVCON");
			this._oWizardContentPage = this.byId("ID_RETURN_PAGE");
			baseModel.setProperty("/cancelBtnVisiblitys", true);
			baseModel.setProperty("/submitBtnVisiblitys", false);
			this.getView().getModel("baseModel").setProperty("/EXaddressVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/addressFieldEnable", true);
			baseModel.setProperty("/EXOneTimeCustomer", "");
			baseModel.setProperty("/oneTimeCustomer", "");
			baseModel.setProperty("/previewBtnVisiblitys", false);
			baseModel.setProperty("/exchangeBtnVisiblitys", false);
			baseModel.setProperty("/saveAsDraftBtnVisiblitys", true);
			baseModel.setProperty("/addressVisiblity", false);
			baseModel.setProperty("/billingTypeEnable", true);
			baseModel.setProperty("/salesOrgEditable", true);
			baseModel.setProperty("/distChnlEditable", true);
			baseModel.setProperty("/exchangeTabVisiblity", false);
			baseModel.setProperty("/smsInputVisiblity", false);
			baseModel.setProperty("/emailInputVisiblity", false);
			baseModel.setProperty("/commentsLength", 2);
			baseModel.setProperty("/attachmentLength", 0);
			baseModel.setProperty("/referenceNo", "");
			baseModel.setProperty("/reasonOwner", "");
			baseModel.setProperty("/customerPONumber", "");
			baseModel.setProperty("/customerPONumberEx", "");
			baseModel.setProperty("/selectedSalesOrg", "");
			baseModel.setProperty("/selectedSalesOrgDesc", "");
			baseModel.setProperty("/selectedDistChnl", "");
			baseModel.setProperty("/selectedDistChlDesc", "");
			baseModel.setProperty("/selectedSoldtoParty", "");
			baseModel.setProperty("/selectedSoldtoPartyDesc", "");
			baseModel.setProperty("/completedDelivery", false);
			baseModel.setProperty("/selectedReturnReason", "");
			baseModel.setProperty("/phoneNumFlag", false);
			baseModel.setProperty("/emailFlag", false);
			baseModel.setProperty("/phoneNum", "");
			baseModel.setProperty("/userEmailId", "");
			baseModel.setProperty("/retDivEditablity", true);
			baseModel.setProperty("/retSalesOrgEditablity", true);
			baseModel.setProperty("/retDistChnlEditablity", true);
			baseModel.setProperty("/saveAsDraftBtnVisiblitys", false);
			this.getView().getModel("invoiceSearchModel").setProperty("/billingCategory", "C");
			this.getView().getModel("invoiceSearchModel").setProperty("/billingCategoryDesc", "Commercial Invoice");
			// this._getUser();
			this.selectedReturnItems = [];
			that.salesOrgDataAccess = "No Access";
			that.SLOCDataAccess = "No Access";
			that.distrChannelDataAccess = "No Access";
			that.divisionDataAccess = "No Access";
			that.materialGroupDataAccess = "No Access";
			that.materialGroup4DataAccess = "No Access";
			that.plantDataAccess = "No Access";
			// this.startDateRange = 4;
			// this.endDateRange = 3;
			if (sap.ui.getCore().getConfiguration().getLanguage() === "en-US") {

				baseModel.setProperty("/language", "TH");
			} else {
				baseModel.setProperty("/language", sap.ui.getCore().getConfiguration().getLanguage());
			}
			baseModel.setProperty("/languageID", "E");
			baseModel.setProperty("/invoiceTableLength", "");
			baseModel.setProperty("/returnTableLength", "");
			baseModel.setProperty("/exchangeTableLength", "");
			baseModel.setProperty("/disableSoldToParty", true);
			this.onResetSoldToParty();
			this.onResetSearchInvoice();
			if (this.getView().getModel("OrderReasonSet")) {
				this.getView().getModel("OrderReasonSet").setData("");
			}
			if (sap.ui.getCore().getModel("draftItemModel")) {
				sap.ui.getCore().setModel("draftItemModel", undefined);
			}
			baseModel.setProperty("/InvCollapseVisiblity", true);
			baseModel.setProperty("/InvOpenVisiblity", false);
			baseModel.setProperty("/InvSearchBar", true);
			baseModel.setProperty("/ExcCollapseVisiblity", true);
			baseModel.setProperty("/ExcOpenVisiblity", false);
			baseModel.setProperty("/ExcSearchBar", true);
			baseModel.setProperty("/PrevCollapseVisiblity", true);
			baseModel.setProperty("/PrevopenVisiblity", false);
			baseModel.setProperty("/PrevSearchBar", true);
			baseModel.setProperty("/RetCollapseVisiblity", true);
			baseModel.setProperty("/RetOpenVisiblity", false);
			baseModel.setProperty("/ReturnSeacrhBar", true);
		},

		valueHelpRequestDistChan: function () {
			var that = this;
			if (that.distrChannelDataAccess === "No Access") {
				MessageToast.show(this.resourceBundle.getText("NoDataAccess"));
				// MessageToast.show("No Data Access");
			} else {
				this.DistChnl.open();
			}
		},

		onSelectSalesOrg: function (oEvent) {
			var baseModel = this.getView().getModel("baseModel");

			baseModel.setProperty("/SalesOrg", oEvent.getSource().getSelectedItem().getText().split(" ")[0]);
			baseModel.setProperty("/selectedSalesOrg", oEvent.getSource().getSelectedItem().getText().split(" ")[0]);

			baseModel.setProperty("/Salesorg", oEvent.getSource().getSelectedItem().getText().split(" ")[0]);
			baseModel.setProperty("/selectedSalesOrgDesc", oEvent.getSource().getSelectedItem().getText().split("(")[1].split(")")[0]);
			baseModel.setProperty("/SalesOrgDesc", oEvent.getSource().getSelectedItem().getText().split("(")[1].split(")")[0]);
			if (baseModel.getData().selectedSoldtoParty !== undefined && baseModel.getData().selectedSoldtoParty !== "") {
				baseModel.setProperty("/step2Validation", true);
				// this._wizard.goToStep(this.byId("ID_WIZARD_INV_SRCH"));
				this._wizard.setCurrentStep(this.byId("ID_WIZARD_INV_SRCH"));

			}
			baseModel.refresh();
		},

		onchangeDistChnl: function (oEvent) {
			var baseModel = this.getView().getModel("baseModel");
			baseModel.setProperty("/selectedDistChnl", oEvent.getSource().getSelectedItem().getText().split(" ")[0]);
			baseModel.setProperty("/DistChan", oEvent.getSource().getSelectedItem().getText().split(" ")[0]);
			baseModel.setProperty("/selectedDistChlDesc", oEvent.getSource().getSelectedItem().getText().split("(")[1].split(")")[0]);
			baseModel.refresh();
		},

		onSelectReasonOwner: function (oEvent) {
			var baseModel = this.getView().getModel("baseModel");
			baseModel.setProperty("/reasonOwner", oEvent.getSource().getSelectedItem().getText().split(" ")[0] + " " + oEvent.getSource().getSelectedItem()
				.getText().split(" ")[1]);
			baseModel.refresh();
		},

		onChangeShipTo: function (oEvent) {
			var baseModel = this.getView().getModel("baseModel");
			baseModel.setProperty("/exShipTo", oEvent.getSource().getSelectedItem().getText().split(" ")[0]);
			baseModel.setProperty("/exShipToDesc", oEvent.getSource().getSelectedItem().getText().split("(")[1].split(")")[0]);
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

		onLiveChangeName4: function (oEvent) {
			var value = oEvent.getParameters().value;
			// if (value.length < 40) {
			this.getView().getModel("baseModel").setProperty("/maxLengthName4", (40 - value.length) + " Char remainaing");
			// } else {
			// this.getView().getModel("baseModel").setProperty("/maxLengthName4", "");
			// }
			this.getView().getModel("baseModel").refresh();
		},

		onLiveChangeStreet2: function (oEvent) {
			var value = oEvent.getParameters().value;
			// if (value.length < 40) {
			this.getView().getModel("baseModel").setProperty("/maxLengthAddressStreet2", (40 - value.length) + " Char remainaing");
			// } else {
			// this.getView().getModel("baseModel").setProperty("/maxLengthAddressStreet2", "");
			// }
			this.getView().getModel("baseModel").refresh();
		},

		onLiveChangeStreet3: function (oEvent) {
			var value = oEvent.getParameters().value;
			// if (value.length < 40) {
			this.getView().getModel("baseModel").setProperty("/maxLengthAddressStreet3", (40 - value.length) + " Char remainaing");
			// } else {
			// this.getView().getModel("baseModel").setProperty("/maxLengthAddressStreet3", "");
			// }
			this.getView().getModel("baseModel").refresh();
		},

		onLiveChangeStreet5: function (oEvent) {
			var value = oEvent.getParameters().value;
			// if (value.length < 40) {
			this.getView().getModel("baseModel").setProperty("/maxLengthAddressStreet5", (40 - value.length) + " Char remainaing");
			// } else {
			// this.getView().getModel("baseModel").setProperty("/maxLengthAddressStreet5", "");
			// }
			this.getView().getModel("baseModel").refresh();
		},

		onLiveChangeDistrict: function (oEvent) {
			var value = oEvent.getParameters().value;
			// if (value.length < 40) {
			this.getView().getModel("baseModel").setProperty("/maxLengthDistrict", (40 - value.length) + " Char remainaing");
			// } else {
			// this.getView().getModel("baseModel").setProperty("/maxLengthDistrict", "");
			// }
			this.getView().getModel("baseModel").refresh();
		},

		onLiveChangeDifferentCity: function (oEvent) {
			var value = oEvent.getParameters().value;
			// if (value.length < 40) {
			this.getView().getModel("baseModel").setProperty("/maxLengthDifferentCity", (40 - value.length) + " Char remainaing");
			// } else {
			// this.getView().getModel("baseModel").setProperty("/maxLengthDifferentCity", "");
			// }
			this.getView().getModel("baseModel").refresh();
		},

		onLiveChangePostalCode: function (oEvent) {
			var value = oEvent.getParameters().value;
			if (value.length > 5) {
				this.getView().getModel("baseModel").setProperty("/postalCode", value.substring(0, 5));
				oEvent.getSource().setValue(value.substring(0, 5));
				this.getView().getModel("baseModel").refresh();
			} else {

				this.getView().getModel("baseModel").setProperty("/maxLengthPostalCode", (5 - value.length) + " Char remainaing");
			}
			// } else {
			// this.getView().getModel("baseModel").setProperty("/maxLengthPostalCode", "");
			// }
			this.getView().getModel("baseModel").refresh();
		},

		onLiveChangeTelephone: function (oEvent) {
			var value = oEvent.getParameters().value;
			// if (value.length < 30) {
			this.getView().getModel("baseModel").setProperty("/maxLengthtelephone", (30 - value.length) + " Char remainaing");
			// } else {
			// this.getView().getModel("baseModel").setProperty("/maxLengthtelephone", "");
			// }
			this.getView().getModel("baseModel").refresh();
		},

		onLiveChangeMobilePhone: function (oEvent) {
			var value = oEvent.getParameters().value;
			// if (value.length < 30) {
			this.getView().getModel("baseModel").setProperty("/maxLengthmobileNumber", (30 - value.length) + " Char remainaing");
			// } else {
			// this.getView().getModel("baseModel").setProperty("/maxLengthmobileNumber", "");
			// }
			this.getView().getModel("baseModel").refresh();
		},

		onLiveChangeTaxID: function (oEvent) {
			var value = oEvent.getParameters().value;
			// if (value.length < 13) {
			this.getView().getModel("baseModel").setProperty("/maxLengthtaxId", (13 - value.length) + " Char remainaing");
			// } else {
			// this.getView().getModel("baseModel").setProperty("/maxLengthtaxId", "");
			// }
			this.getView().getModel("baseModel").refresh();
		},

		onLiveChangeBCODE: function (oEvent) {
			var value = oEvent.getParameters().value;
			// if (value.length < 5) {
			this.getView().getModel("baseModel").setProperty("/maxLengthbCode", (5 - value.length) + " Char remainaing");
			if (this.getView().getModel("baseModel").getProperty("/bpNummr") === "N" || this.getView().getModel("baseModel").getProperty(
					"/bpNummr") === "H") {
				this.getView().getModel("baseModel").setProperty("/bCode", "00000");
				oEvent.getSource().setValue("00000");
			}
			// } else {
			// this.getView().getModel("baseModel").setProperty("/maxLengthbCode", "");
			// }
			this.getView().getModel("baseModel").refresh();
		},

		onLiveChangeBPNUMMR: function (oEvent) {
			var value = oEvent.getParameters().value;
			// if (value.length < 1) {
			this.getView().getModel("baseModel").setProperty("/maxLengthbpNummr", (1 - value.length) + " Char remainaing");
			// } else {
			// this.getView().getModel("baseModel").setProperty("/maxLengthbpNummr", "");
			// }
			var previousVal = this.getView().getModel("baseModel").getProperty("/bpNummr");
			this.getView().getModel("baseModel").refresh();
			if (value === "N" || value === "H") {
				this.getView().getModel("baseModel").setProperty("/bCode", "00000");
			} else if (value === "") {
				this.getView().getModel("baseModel").setProperty("/bCode", "");
			} else {
				this.getView().getModel("baseModel").setProperty("/bpNummr", "");
				oEvent.getSource().setValue("");
				MessageToast.show("Invalid Input");
			}
		},

		onSearchSoldToParty: function (oEvent) {
			var that = this,
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
				// MessageBox.information("Select at least one input criteria");
				return;
			}
			if (aPayload.SoldtoParty !== "" && aPayload.SoldtoParty !== undefined) {
				afilters.push(new sap.ui.model.Filter("CustCode", sap.ui.model.FilterOperator.EQ, aPayload.SoldtoParty));
			}
			if (that.custCodeDataAccess !== "*" && that.custCodeDataAccess !== undefined) {
				afilters.push(new sap.ui.model.Filter("custNumEx", sap.ui.model.FilterOperator.EQ, that.custCodeDataAccess));
			}
			// if(customerCodeDac)

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
					afilters.push(new sap.ui.model.Filter("Name1", sap.ui.model.FilterOperator.EQ, "*" + aPayload.SoldTopartyName.toUpperCase() +
						"*"));
				}
			} else {
				if (aPayload.SoldTopartyName !== "" && aPayload.SoldTopartyName !== undefined) {
					afilters.push(new sap.ui.model.Filter("Name2", sap.ui.model.FilterOperator.EQ, "*" + aPayload.SoldTopartyName.toUpperCase() +
						"*"));
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
			if (this._wizard.getCurrentStep() === "__xmlview1--ID_WIZARD_RTEX" || this._wizard.getCurrentStep() ===
				"__xmlview0--ID_WIZARD_RTEX") {
				var entity = "/ZSoldToPartySet";
			} else {
				var entity = "/ZSoldToPartySH";
			}
			oDataModel.read(entity, {
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
						// errorMsg = "Request timed-out. Please try again!";
						// errorMsg = that.i18nModel.getProperty("connectionFailToFetchTheData");
						that.errorMsg(errorMsg);
					} else {
						errorMsg = JSON.parse(error.responseText);
						errorMsg = errorMsg.error.message.value;
						that.errorMsg(errorMsg);
					}
				}
			});

		},

		onSortPress: function () {
			if (!this.SortFrag) {
				this.SortFrag = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.sort", this);
				this.getView().addDependent(this.SortFrag);
			}
			this.SortFrag.open();
		},

		handleSortDialogConfirm: function (oEvent) {
			var oTable = sap.ui.getCore().byId("idSoldtoPartyTable"),
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

		// on click of submit of sold-to-party f4 help
		onSubmitSoldtoParty: function (oEvent) {
			var oTable = sap.ui.getCore().byId("idSoldtoPartyTable");
			if (oTable.getItems().length > 0 && oTable.getSelectedContextPaths().length > 0) {
				var oBinding = oTable.getSelectedItem().getBindingContext("SoldToPartyListSet");
				var baseModel = this.getView().getModel("baseModel").getData();
				if (this._wizard.getCurrentStep().includes("ID_WIZARD_RTEX") === true) {
					//=== "__xmlview1--ID_WIZARD_RTEX"
					if (this.getView().getModel("exchangeModel") && this.getView().getModel("exchangeModel").getProperty("/results").length > 0) {
						this.changeSoldToParty = true;
						baseModel.exSoldTo = oBinding.getProperty("CustCode");
						baseModel.exSoldToDesc = oBinding.getProperty("Name1");
						baseModel.exShipTo = oBinding.getProperty("shipToParty");
						baseModel.exShipToDesc = oBinding.getProperty("shipToPartyName");
						baseModel.exPayer = oBinding.getProperty("payer");
						baseModel.exPayerDesc = oBinding.getProperty("payerName");
						baseModel.partnerName = oBinding.getProperty("payerName");
						baseModel.exBillTo = oBinding.getProperty("billToParty");
						baseModel.exBillToDesc = oBinding.getProperty("billToPartyName");
						this.getView().getModel("baseModel").setProperty(
							"/EXOneTimeCustomer", oBinding.getProperty("oneTimeCustomer"));
						this.getView().getModel("baseModel").refresh();
						this.onResetSoldToParty();
						this.SoldtoParty.close();

						this._pricingSimulation(this.getView().getModel("exchangeModel")
							.getProperty(
								"/results"), "Exchange");
					} else {
						MessageToast.show("Add items for exchange");
					}
				} else {
					baseModel.selectedSoldtoParty = oBinding.getProperty("CustCode");
					baseModel.selectedSoldtoPartyDesc = oBinding.getProperty("Name1");
					baseModel.selectedDistChnl = oBinding.getProperty("Distchl");
					baseModel.DistChan = oBinding.getProperty("Distchl");
					baseModel.selectedDistChan = oBinding.getProperty("Distchl");
					baseModel.SalesOrg = oBinding.getProperty("SalesOrg");
					baseModel.selectedSalesOrg = oBinding.getProperty("SalesOrg");
					baseModel.selectedDistChlDesc = oBinding.getProperty("DCName");
					baseModel.selectedSalesOrg = oBinding.getProperty("SalesOrg");
					baseModel.selectedSalesOrgDesc = oBinding.getProperty("SOrgName");
					baseModel.Division = oBinding.getProperty("Division");
					baseModel.selectedDivisionDesc = oBinding.getProperty("DName");
					baseModel.shipTo = oBinding.getProperty("shipToParty");
					baseModel.shipToDesc = oBinding.getProperty("shipToPartyName");
					baseModel.exShipTo = oBinding.getProperty("shipToParty");
					baseModel.exShipToDesc = oBinding.getProperty("shipToPartyName");
					baseModel.billTo = oBinding.getProperty("billToParty");
					baseModel.billToDesc = oBinding.getProperty("billToPartyName");
					baseModel.payer = oBinding.getProperty("payer");
					baseModel.payerDesc = oBinding.getProperty("payerName");
					var invoiceSearchModel = this.getView().getModel("invoiceSearchModel");
					invoiceSearchModel.setProperty("/salesOrgNo", baseModel.selectedSalesOrg);
					invoiceSearchModel.setProperty("/salesOrgDesc", baseModel.selectedSalesOrgDesc);
					invoiceSearchModel.setProperty("/distChnl", baseModel.DistChan);
					invoiceSearchModel.setProperty("/distChnlDesc", baseModel.selectedDistChlDesc);
					invoiceSearchModel.setProperty("/soldToParty", baseModel.selectedSoldtoParty);
					invoiceSearchModel.setProperty("/Division", baseModel.Division);
					invoiceSearchModel.setProperty("/soldToPartyDesc", baseModel.selectedSoldtoPartyDesc);
					invoiceSearchModel.setProperty("/shipTo", oBinding.getProperty("shipToParty"));
					invoiceSearchModel.setProperty("/billTo", oBinding.getProperty("billToParty"));
					invoiceSearchModel.setProperty("/payer", oBinding.getProperty("payer"));
					this.getView().getModel("baseModel").setProperty("/oneTimeCustomer", oBinding.getProperty("oneTimeCustomer"));
					this.getView().getModel("baseModel").refresh();
					this.onResetSoldToParty();
					this.SoldtoParty.close();
					this.getView().getModel("baseModel").setProperty("/salesOrgEditable", false);
					this.getView().getModel("baseModel").setProperty("/distChnlEditable", false);
					this.getView().getModel("baseModel").setProperty("/step2Validation", true);

					this._wizard.setCurrentStep(
						this.byId("ID_WIZARD_INV_SRCH"));
					this._getSalesOrgForOrderID();
				}
			} else {
				MessageBox.information(this.resourceBundle.getText("Selectatleastoneitem"));
				// MessageBox.information("Select at least one item");
			}

		},

		_getSalesOrgForOrderID: function () {
			var that = this;
			var selectedSalesOrg = this.getView().getModel("baseModel").getProperty("/selectedSalesOrg");
			if (this.getView().getModel("ZDKSH_CC_DAC_SOLDTOPARTY_SRV")) {
				var oDataModel = this.getView().getModel("ZDKSH_CC_DAC_SOLDTOPARTY_SRV");
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
						// new sap.ui.model.Filter("Language", sap.ui.model.FilterOperator.EQ, "EN"),
						new sap.ui.model.Filter("salesOrg", sap.ui.model.FilterOperator.EQ, selectedSalesOrg)
					],
					// and: true
				});
				filters.push(oFilter);
				var busyDialog = new sap.m.BusyDialog();
				busyDialog.open();
				oDataModel.read("/TransactionNumSet", {
					filters: filters,
					async: false,
					success: function (oData, oResponse) {
						busyDialog.close();
						that.getView().getModel("baseModel").setProperty("/salesOrgForRO", oData.results[0].mappingID);
					},
					error: function (error) {
						busyDialog.close();
						var errorMsg = "";
						if (error.statusCode === 504) {
							errorMsg = that.resourceBundle.getText("timeOut");
							// errorMsg = "Request timed-out. Please try again!";
							that.errorMsg(errorMsg);
						} else {
							errorMsg = JSON.parse(error.responseText);
							errorMsg = errorMsg.error.message.value;
							that.errorMsg(errorMsg);
						}
					}
				});
			}
		},

		onResetSoldToParty: function () {
			var baseModel = this.getView().getModel("baseModel");
			if (this._wizard.getCurrentStep() === "__xmlview1--ID_WIZARD_RTEX" || this._wizard.getCurrentStep() ===
				"__xmlview0--ID_WIZARD_RTEX") {
				baseModel.setProperty("/SoldtoParty", "");
				baseModel.setProperty("/SoldTopartyName", "");
			} else {
				baseModel.setProperty("/SoldtoParty", "");
				baseModel.setProperty("/SoldTopartyName", "");
				baseModel.setProperty("/Division", "");
				baseModel.setProperty("/DistChan", "");
				baseModel.setProperty("/DivisionDesc", "");
				baseModel.setProperty("/SalesOrgDesc", "");
				baseModel.setProperty("/DistChanDesc", "");
				baseModel.setProperty("/SalesOrg", "");
			}

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
			baseModel.setProperty("/DivisionDesc", "");
			baseModel.setProperty("/SalesOrgDesc", "");
			baseModel.setProperty("/DistChanDesc", "");
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

		onBillDateSelectionFrom: function (oEvent) {

			var startDate = formatter.dateTimeFormat(oEvent.getParameters().value);
			this.invoiceDetail.getModel("invoiceSearchModel").setProperty("/billingDateFrom", oEvent.getParameters().value);
			// var endDate = formatter.dateTimeFormat(oEvent.getParameters().value.split("-")[1]);
			// this.invoiceDetail.getModel("invoiceSearchModel").setProperty("/billingDateTo", endDate);
		},

		onBillDateSelectionTo: function (oEvent) {
			if (this.invoiceDetail) {
				var startDate = this.invoiceDetail.getModel("invoiceSearchModel").getProperty("/billingDateFrom");
				// this.invoiceDetail.getModel("invoiceSearchModel").setProperty("/billingDateFrom", startDate);
				if (startDate === "" || startDate === undefined) {
					// MessageToast.show("Select 'From' Date");
					return;
				} else {
					var endDate = formatter.dateTimeFormat(oEvent.getParameters().value);
					this.invoiceDetail.getModel("invoiceSearchModel").setProperty("/billingDateTo", oEvent.getParameters().value);
				}
			}
		},

		onConfirmChangeBillingType: function (oEvent) {
			var billingType = oEvent.getParameters().selectedContexts[0].getObject().domvalueL;
			this.invoiceDetail.getModel("invoiceSearchModel").setProperty("/billingCategory", billingType);
			this.invoiceDetail.getModel("invoiceSearchModel").setProperty("/billingCategoryDesc", oEvent.getParameters().selectedContexts[
					0]
				.getObject()
				.ddtext);
			this.invoiceDetail.getModel("invoiceSearchModel").refresh();
		},

		onSearchInvoice: function () {
			if (this.getView().getModel("returnModel").getData().results && this.getView().getModel("returnModel").getData().results.length >
				0) {
				var returnsItems = this.getView().getModel("returnModel").getData().results;
				for (var j = this.selectedReturnItems.length - 1; j >= 0; j--) {
					var count = 0;
					for (var i = returnsItems.length - 1; i >= 0; i--) {

						if (this.selectedReturnItems[j].InvoiceNum === returnsItems[i].refInvoice && this.selectedReturnItems[j].InvoiceLineItem ===
							returnsItems[i].refItemNumber) {
							// this.selectedReturnItems.splice(j, 1);
							count++;
						} else {

						}
					}
					if (count === 0) {
						this.selectedReturnItems.splice(j, 1);
					}

				}
			} else {
				this.selectedReturnItems = [];
			}
			this.selectedInvoice = [];
			var that = this;
			var invoiceSearchModel = this.invoiceDetail.getModel("invoiceSearchModel");
			var url = "$filter=";
			var oDataModel = this.getView().getModel("ZDKSH_CC_RETURNS_MANAGEMENT_SRV"),
				aPayload = this.invoiceDetail.getModel("invoiceSearchModel").getData(),
				afilters = [];
			if ((aPayload.invoiceNo === "" || aPayload.invoiceNo === undefined) && (aPayload.materialNo === "" || aPayload.materialNo ===
					undefined) && (aPayload.batchNo === "" || aPayload.batchNo === undefined) && (aPayload.SerialNum === "" || aPayload.SerialNum ===
					undefined)) {
				MessageBox.information(this.resourceBundle.getText("Enteratleastoninputcriteria"));
				// MessageBox.information("Enter at least one input criteria");
				return;
			} else {
				if (aPayload.invoiceNo !== "" && aPayload.invoiceNo !== undefined) {
					if (url.length === 8) {
						url = url + "invoiceNum eq " + "'" + aPayload.invoiceNo + "'";
					} else {
						url = url + " and " + "invoiceNum eq " + "'" + aPayload.invoiceNo + "'";
					}
				}
				if (aPayload.materialNo !== "" && aPayload.materialNo !== undefined) {
					if (url.length === 8) {
						url = url + "materialCode eq " + "'" + aPayload.materialNo + "'";
					} else {
						url = url + " and " + "materialCode eq " + "'" + aPayload.materialNo + "'";
					}
				}
				if (aPayload.batchNo !== "" && aPayload.batchNo !== undefined) {
					if (url.length === 8) {
						url = url + "batchNumber eq " + "'" + aPayload.batchNo + "'";
					} else {
						url = url + " and " + "batchNumber eq " + "'" + aPayload.batchNo + "'";
					}
				}
				if (aPayload.salesOrgNo !== "" && aPayload.salesOrgNo !== undefined) {
					if (url.length === 8) {
						url = url + "salesOrg eq " + "'" + aPayload.salesOrgNo + "'";
					} else {
						url = url + " and " + "salesOrg eq " + "'" + aPayload.salesOrgNo + "'";
					}
				}
				if (aPayload.distChnl !== "" && aPayload.distChnl !== undefined) {
					if (url.length === 8) {
						url = url + "distChannel eq " + "'" + aPayload.distChnl + "'";
					} else {
						url = url + " and " + "distChannel eq " + "'" + aPayload.distChnl + "'";
					}
				}
				if (aPayload.soldToParty !== "" && aPayload.soldToParty !== undefined) {
					if (url.length === 8) {
						url = url + "soldToParty eq " + "'" + aPayload.soldToParty + "'";
					} else {
						url = url + " and " + "soldToParty eq " + "'" + aPayload.soldToParty + "'";
					}
				}
				var baseModel = this.getView().getModel("baseModel").getData();
				if (aPayload.Division !== "" && aPayload.Division !== undefined) {
					if (url.length === 8) {
						url = url + "division eq " + "'" + aPayload.Division + "'";
					} else {
						url = url + " and " + "division eq " + "'" + aPayload.Division + "'";
					}
				}
				if (aPayload.billingDateFrom !== "" && aPayload.billingDateFrom !== undefined) {
					aPayload.billingDateFrom = formatter.dateTimeFormat(aPayload.billingDateFrom);
					if (url.length === 8) {
						url = url + "billingDateFrom eq datetime" + "'" + aPayload.billingDateFrom + "'";
					} else {
						url = url + " and " + "billingDateFrom eq datetime" + "'" + aPayload.billingDateFrom + "'";
					}
				} else {
					if (aPayload.invoiceNo !== "" && aPayload.invoiceNo !== undefined) {
						var billingDateFrom = "";
					} else {
						var billingDateFrom = formatter.dateTimeFormat(new Date("2016/01/01"));
						if (url.length === 8) {
							url = url + "billingDateFrom eq datetime" + "'" + billingDateFrom + "'";
						} else {
							url = url + " and " + "billingDateFrom eq datetime" + "'" + billingDateFrom + "'";
						}
					}
				}
				if (aPayload.billingDateTo !== "" && aPayload.billingDateTo !== undefined) {
					aPayload.billingDateTo = formatter.dateTimeFormat(aPayload.billingDateTo);
					if (url.length === 8) {
						url = url + "billingDateTo eq datetime" + "'" + aPayload.billingDateTo + "'";
					} else {
						url = url + " and " + "billingDateTo eq datetime" + "'" + aPayload.billingDateTo + "'";
					}
				} else {
					if (aPayload.invoiceNo !== "" && aPayload.invoiceNo !== undefined) {
						var billingDateTo = "";
					} else {
						var billingDateTo = formatter.dateTimeFormat(new Date("2017/12/31"));
						if (url.length === 8) {
							url = url + "billingDateTo eq datetime" + "'" + billingDateTo + "'";
						} else {
							url = url + " and " + "billingDateTo eq datetime" + "'" + billingDateTo + "'";
						}
					}
				}
				if (that.materialGroupDataAccess !== "No Access") {
					if (url.length === 8) {
						url = url + "materialGroup eq " + "'" + that.materialGroupDataAccess + "'";
					} else {
						url = url + " and " + "materialGroup eq " + "'" + that.materialGroupDataAccess + "'";
					}
				}
				if (that.materialGroup4DataAccess !== "" && that.materialGroup4DataAccess !== undefined) {
					if (url.length === 8) {
						url = url + "materialGroup4 eq " + "'" + that.materialGroup4DataAccess + "'";
					} else {
						url = url + " and " + "materialGroup4 eq " + "'" + that.materialGroup4DataAccess + "'";
					}
				}
				if (aPayload.displayBySno !== "" && aPayload.displayBySno !== undefined) {
					if (url.length === 8) {
						url = url + "displayBySno eq " + "'" + aPayload.displayBySno + "'";
					} else {
						url = url + " and " + "displayBySno eq " + "'" + aPayload.displayBySno + "'";
					}
				}
				if (aPayload.SerialNum !== "" && aPayload.SerialNum !== undefined) {
					if (url.length === 8) {
						url = url + "serialNum eq " + "'" + aPayload.SerialNum + "'";
					} else {
						url = url + " and " + "serialNum eq " + "'" + aPayload.SerialNum + "'";
					}
				}
				if (aPayload.billingCategory !== "" && aPayload.billingCategory !== undefined) {
					if (url.length === 8) {
						url = url + "invCategory eq " + "'" + aPayload.billingCategory + "'";
					} else {
						url = url + " and " + "invCategory eq " + "'" + aPayload.billingCategory + "'";
					}
				}
				if (that.materialDataAccess !== "*" && that.materialDataAccess !== undefined) {
					if (url.length === 8) {
						url = url + "materialCodeDac eq " + "'" + that.materialDataAccess + "'";
					} else {
						url = url + " and " + "materialCodeDac eq " + "'" + that.materialDataAccess + "'";
					}
				}
				if (that.custCodeDataAccess !== "*" && that.custCodeDataAccess !== undefined) {
					if (url.length === 8) {
						url = url + "customerCodeDac eq " + "'" + that.custCodeDataAccess + "'";
					} else {
						url = url + " and " + "customerCodeDac eq " + "'" + that.custCodeDataAccess + "'";
					}
				}
				url = url + " and " + "roType eq " + "'" + this.ROtypeCode + "'";
				var busyDialog = new sap.m.BusyDialog();
				busyDialog.open();
				oDataModel.read("/billingDocumentSet", {
					async: false,
					urlParameters: url + "&$expand=billingDocItemSerialNav,billingDocToBusiPartners&$format=json",
					success: function (oData, oResponse) {
						busyDialog.close();
						that.getView().byId("InvoiceTableId").removeSelections();

						if ((aPayload.invoiceNo === "" || aPayload.invoiceNo === undefined) && (aPayload.billingDateFrom === "" || aPayload.billingDateFrom ===
								undefined)) {
							aPayload.billingDateTo = "2017-12-31";
							aPayload.billingDateFrom = "2016-01-01";
						}
						if (aPayload.billingDateFrom !== "" && aPayload.billingDateFrom !== undefined) {
							aPayload.billingDateFrom = formatter.dateTimeFormat1(aPayload.billingDateFrom);
						}
						if (aPayload.billingDateTo !== "" && aPayload.billingDateTo !== undefined) {
							aPayload.billingDateTo = formatter.dateTimeFormat1(aPayload.billingDateTo);
						}

						that.getView().getModel("baseModel").setProperty("/billingTypeEnable", false);
						var invoiceData = [];
						for (var i = 0; i < oData.results.length; i++) {
							var items = oData.results[i].billingDocItemSerialNav.results;
							for (var j = 0; j < items.length; j++) {
								var object = {
									shipToParty: parseInt(oData.results[i].billingDocToBusiPartners.results[2].partnerNum).toString(),
									shipToPartyDesc: that.getView().getModel("baseModel").getProperty("/shipToDesc"),
									billingDateFrom: oData.results[i].billingDateFrom,
									billingDateTo: oData.results[i].billingDateTo,
									billingType: oData.results[i].billingType,
									shipToAddress: oData.results[i].billingDocToBusiPartners.results[3],
									soldToAddress: oData.results[i].billingDocToBusiPartners.results[0],
									payerAddress: oData.results[i].billingDocToBusiPartners.results[2],
									billToAdress: oData.results[i].billingDocToBusiPartners.results[1],
									Active: items[j].Active,
									AvailRetQtyBaseUn: items[j].AvailRetQtyBaseUn,
									AvailRetQtySalesUn: items[j].AvailRetQtySalesUn,
									BaseUnit: items[j].BaseUnit,
									BatchNumber: items[j].BatchNumber,
									BillingQty: items[j].BillingQty,
									ColorCode: items[j].ColorCode,
									DiscountAmount: items[j].DiscountAmount,
									ExpiryDate: items[j].ExpiryDate,
									InvoiceLineItem: items[j].InvoiceLineItem,
									InvoiceNum: items[j].InvoiceNum,
									ItemUsage: items[j].ItemUsage,
									MaterialCode: items[j].MaterialCode,
									MaterialDesc: items[j].MaterialDesc,
									MaterialGroup: items[j].MaterialGroup,
									MaterialGroup4: items[j].MaterialGroup4,
									NetPrice: items[j].NetPrice,
									SalesUnit: items[j].SalesUnit,
									SerialNum: items[j].SerialNum,
									UnitPrice: items[j].UnitPrice,
									deleted: "false",
									actualRetQty: items[j].AvailRetQtySalesUn,
									actualRetUOM: items[j].SalesUnit,
									editablity: true,
									ListPrice: items[j].ListPrice,
									HigherLvlItem: items[j].HigherLvlItem,
									ItemGroup: items[j].ItemGroup,
									docCurrency: items[j].docCurrency,
									ActiveIndicator: items[j].ActiveIndicator
								};

								invoiceData.push(object);
							}
						}
						invoiceSearchModel.setSizeLimit(invoiceData.length);
						invoiceSearchModel.setProperty("/billingType", oData.results[0].billingType);
						invoiceSearchModel.setProperty("/results", invoiceData);
						that.getView().getModel("baseModel").setProperty("/originalInvoiceData", JSON.parse(JSON.stringify(invoiceData)));
						if (invoiceData.length > 10) {
							that.getView().getModel("baseModel").setProperty("/invoiceTableLength", "60vh");
						} else {
							that.getView().getModel("baseModel").setProperty("/invoiceTableLength", "");
						}
						invoiceSearchModel.setProperty("/invoiceItemsLength", "Invoice (" + invoiceData.length + ")");
						invoiceSearchModel.refresh();
						that.getView().byId("InvoiceTableId").removeSelections();
					},
					error: function (error) {
						busyDialog.close();
						that.getView().byId("InvoiceTableId").removeSelections();
						if ((aPayload.invoiceNo === "" || aPayload.invoiceNo === undefined) && (aPayload.billingDateFrom === "" || aPayload.billingDateFrom ===
								undefined)) {
							aPayload.billingDateTo = "2017-12-31";
							aPayload.billingDateFrom = "2016-01-01";
						}
						if (aPayload.billingDateFrom !== "" && aPayload.billingDateFrom !== undefined) {
							aPayload.billingDateFrom = formatter.dateTimeFormat1(aPayload.billingDateFrom);
						}
						if (aPayload.billingDateTo !== "" && aPayload.billingDateTo !== undefined) {
							aPayload.billingDateTo = formatter.dateTimeFormat1(aPayload.billingDateTo);
						}
						if (invoiceSearchModel.getProperty("/results")) {
							invoiceSearchModel.setProperty("/results", "");
							invoiceSearchModel.setProperty("/invoiceItemsLength", "");
						}

						that.getView().getModel("baseModel").setProperty("/billingTypeEnable", false);
						that.getView().getModel("baseModel").setProperty("/invoiceTableLength", "");
						that.getView().getModel("baseModel").refresh();
						invoiceSearchModel.refresh();
						// if (aPayload.invoiceNo == "") {
						// 	aPayload.billingDateTo = "2017-12-31";
						// 	aPayload.billingDateFrom = "2016-01-01";
						// }
						var errorMsg = "";
						if (error.statusCode === 504) {
							errorMsg = that.resourceBundle.getText("timeOut");
							// errorMsg = "Request timed-out. Please try again!";
							that.errorMsg(errorMsg);
						} else {
							errorMsg = JSON.parse(error.responseText);
							errorMsg = errorMsg.error.message.value;
							that.errorMsg(errorMsg);
						}
					}
				});
			}
		},

		onResetSearchInvoice: function () {
			var invoiceSearchModel = this.getView().getModel("invoiceSearchModel");
			invoiceSearchModel.setProperty("/results", "");
			invoiceSearchModel.setProperty("/invoiceNo", "");
			invoiceSearchModel.setProperty("/selectedSerialNum", false);
			invoiceSearchModel.setProperty("/billingDateFrom", "");
			invoiceSearchModel.setProperty("/billingDateTo", "");
			invoiceSearchModel.setProperty("/SerialNum", "");
			if (this.docVersion === "SUCCESS") {
				this.getView().getModel("baseModel").setProperty("/billingTypeEnable", false);
			} else {
				this.getView().getModel("baseModel").setProperty("/billingTypeEnable", true);
			}
			if (this.ROtypeCode === "TI") {
				invoiceSearchModel.setProperty("/billingCategory", "B");
				invoiceSearchModel.setProperty("/billingCategoryDesc", "Consignment Fill Up");
			} else {
				invoiceSearchModel.setProperty("/billingCategory", "C");
				invoiceSearchModel.setProperty("/billingCategoryDesc", "Commercial Invoice");
			}
			invoiceSearchModel.setProperty("/batchNo", "");
			invoiceSearchModel.setProperty("/materialNo", "");
			invoiceSearchModel.setProperty("/results", "");
			invoiceSearchModel.setProperty("/invoiceItemsLength", "");
			invoiceSearchModel.refresh();
			if (this.getView().getModel("returnModel").getData().results && this.getView().getModel("returnModel").getData().results.length >
				0) {
				var returnsItems = this.getView().getModel("returnModel").getData().results;
				for (var j = this.selectedReturnItems.length - 1; j >= 0; j--) {
					var count = 0;
					for (var i = returnsItems.length - 1; i >= 0; i--) {

						if (this.selectedReturnItems[j].InvoiceNum === returnsItems[i].refInvoice && this.selectedReturnItems[j].InvoiceLineItem ===
							returnsItems[i].refItemNumber) {
							// this.selectedReturnItems.splice(j, 1);
							count++;
						} else {

						}
					}
					if (count === 0) {
						this.selectedReturnItems.splice(j, 1);
					}

				}
			} else {
				this.selectedReturnItems = [];
			}
		},

		onPressPreviousRange: function () {
			var prevFromDate = this.getView().getModel("invoiceSearchModel").getData().billingDateFrom;
			var PrevToDate = this.getView().getModel("invoiceSearchModel").getData().billingDateTo;
			var today = new Date();
			var currentFrom = new Date(prevFromDate);
			currentFrom.setYear(currentFrom.getFullYear() - 2);
			var currentTo = new Date(PrevToDate);
			currentTo.setYear(currentTo.getFullYear() - 2);
			if (currentFrom.getFullYear() === currentTo.getFullYear()) {
				currentTo.setYear(currentFrom.getFullYear() + 2);
			}
			// this.startDateRange = this.startDateRange + 2;
			// this.endDateRange = this.endDateRange + 2;
			var startDate = new Date(currentFrom);
			var endDate = new Date(currentTo);
			// var dateFormat = DateFormat.getDateInstance({
			// 	pattern: "MMM dd,yyyy",
			// 	calendarType: "Gregorian"
			// });
			var dateFormat = sap.ui.core.format.DateFormat
				.getDateInstance({
					pattern: "MM.dd.yyyy",
					calendarType: "Gregorian"
				});
			startDate = dateFormat.format(startDate);
			endDate = dateFormat.format(endDate);
			var billingDate = startDate + " - " + endDate;

			// this.getView().getModel("invoiceSearchModel").setProperty("/billingDate", billingDate);
			this.getView().getModel("invoiceSearchModel").setProperty("/billingDateFrom", startDate);
			this.getView().getModel("invoiceSearchModel").setProperty("/billingDateTo", endDate);

		},

		onPressNextRange: function () {
			var prevFromDate = this.getView().getModel("invoiceSearchModel").getData().billingDateFrom;
			var PrevToDate = this.getView().getModel("invoiceSearchModel").getData().billingDateTo;
			var today = new Date();
			var currentFrom = new Date(prevFromDate);
			currentFrom.setYear(currentFrom.getFullYear() + 2);
			var currentTo = new Date(PrevToDate);
			currentTo.setYear(currentTo.getFullYear() + 2);
			if (currentFrom.getFullYear() === currentTo.getFullYear()) {
				currentTo.setYear(currentFrom.getFullYear() + 2);
			}
			// this.startDateRange = this.startDateRange + 2;
			// this.endDateRange = this.endDateRange + 2;
			var startDate = new Date(currentFrom);
			var endDate = new Date(currentTo);
			var dateFormat = sap.ui.core.format.DateFormat
				.getDateInstance({
					pattern: "MM.dd.yyyy",
					calendarType: "Gregorian"
				});
			// var dateFormat = DateFormat.getDateInstance({
			// 	pattern: "MMM dd,yyyy",
			// 	calendarType: "Gregorian"
			// });
			startDate = dateFormat.format(startDate);
			endDate = dateFormat.format(endDate);
			var billingDate = startDate + " - " + endDate;

			// this.getView().getModel("invoiceSearchModel").setProperty("/billingDate", billingDate);
			this.getView().getModel("invoiceSearchModel").setProperty("/billingDateFrom", startDate);
			this.getView().getModel("invoiceSearchModel").setProperty("/billingDateTo", endDate);
		},

		onCompleteStep3: function () {
			if (this.docVersion === "SUCCESS") {
				this.getView().getModel("baseModel").setProperty("/saveAsDraftBtnVisiblitys", false);
				this.getView().getModel("baseModel").setProperty("/exchangeBtnVisiblitys", false);
				this.getView().getModel("baseModel").setProperty("/submitBtnVisiblitys", false);
			} else {
				this.getView().getModel("baseModel").setProperty("/saveAsDraftBtnVisiblitys", true);
				this.getView().getModel("baseModel").setProperty("/exchangeBtnVisiblitys", true);
				this.getView().getModel("baseModel").refresh();
				this._getPersonalizationDetails("keyReturn", "Before");
			}
		},

		onPressAddress: function (oEvent) {
			var addressData = oEvent.getSource().getBindingContext("invoiceSearchModel").getObject();
			var addressModel = new sap.ui.model.json.JSONModel({
				"shipToAddress": addressData.shipToAddress,
				"soldToAddress": addressData.soldToAddress,
				"payerAddress": addressData.payerAddress,
				"billToAdress": addressData.billToAdress
			});
			this.getView().setModel(addressModel, "addressModel");
			this.getView().getModel("baseModel").setProperty("/invoiceTableVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/addressVisiblity", true);
			this.getView().getModel("baseModel").refresh();
		},

		onPressNavBackToItems: function () {
			this.getView().getModel("baseModel").setProperty("/invoiceTableVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/addressVisiblity", false);
			this.getView().getModel("baseModel").refresh();
		},

		// onPress2: function () {
		// 	this.getView().getModel("baseModel").setProperty("/step1Validation", false);
		// },

		valueHelpRequestSoldtoParty: function () {
			var baseModel = this.getView().getModel("baseModel");
			if (baseModel.getProperty("/selectedSalesOrg") !== undefined) {
				baseModel.setProperty("/SalesOrg", baseModel.getProperty(
					"/selectedSalesOrg"));
				baseModel.setProperty("/SalesOrgDesc", baseModel.getProperty(
					"/selectedSalesOrgDesc"));
			}
			if (baseModel.getProperty("/selectedDistChnl") !== undefined) {
				baseModel.setProperty("/DistChan", baseModel.getProperty(
					"/selectedDistChnl"));
				baseModel.setProperty("/DistChanDesc", baseModel.getProperty(
					"/selectedDistChlDesc"));
			}
			if (this._wizard.getCurrentStep().includes("ID_WIZARD_RTEX") === true) {
				baseModel.setProperty("/Division", this.getView().getModel("invoiceSearchModel").getProperty("/Division"));
				baseModel.setProperty("/DivisionDesc", baseModel.getProperty("/selectedDivisionDesc"));
				baseModel.setProperty("/retDivEditablity", false);
				baseModel.setProperty("/retSalesOrgEditablity", false);
				baseModel.setProperty(
					"/retDistChnlEditablity", false);
			} else {
				baseModel.setProperty("/Division", "");
				baseModel.setProperty("/DivisionDesc", "");
				baseModel.setProperty("/retDivEditablity", true);
				baseModel.setProperty("/retSalesOrgEditablity", true);
				baseModel.setProperty("/retDistChnlEditablity", true);
			}
			var that = this;
			if (!that.SoldtoParty) {
				that.SoldtoParty = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.SoldtoParty", this);
				that.getView().addDependent(that.SoldtoParty);
				that.SoldtoParty.addStyleClass("sapUiSizeCompact");
			}
			// sap.ui.getCore().byId("idFrgCustID").setValueState(sap.ui.core.ValueState.None);
			// sap.ui.getCore().byId("idSearchSoldToParty").setValue("");
			that.SoldtoParty.open();
		},

		onDownloadAttachment: function (oEvent) {
			var selectedObj = oEvent.getSource().getSelectedContexts()[0].getObject();
			var that = this;

			if (this.docVersion === "SUCCESS" || this.docVersion === "DRAFT") {
				// if (selectedObj.docId) {
				// 	// if (window.location.href.includes("https://flpnwc-xlgtvarz5i.dispatcher.ap1.hana.ondemand.com")) {
				// 	// var link = "https://flpnwc-xlgtvarz5i.dispatcher.ap1.hana.ondemand.com/connect_client_phase-II/Attachment/downloadFile/" +
				// 	// 	selectedObj.docId;
				// 	// }
				// 	var link = "https://" + window.location.href.split("/")[2] + "/connect_client_phase-II/Attachment/downloadFile/" + selectedObj.docId;
				// 	// else if()
				// 	window.open(link, "_self");
				// } else {
				// 	MessageToast.show(this.resourceBundle.getText("Attachmentcannotbedownloaded"));
				// 	// MessageToast.show("Attachment cannot be downloaded");
				// }
				if (window.location.href.includes("https://flpnwc-xlgtvarz5i.dispatcher.ap1.hana.ondemand.com")) {
					var link =
						"https://flpnwc-xlgtvarz5i.dispatcher.ap1.hana.ondemand.com/sap/fiori/returnprocess/DKSHJavaService/Attachment/downloadFile/" +
						selectedObj.docId;
				} else {
					var link =
						"https://flpnwc-cdd660bcb.dispatcher.ap1.hana.ondemand.com/sap/fiori/returnprocess/DKSHJavaService/Attachment/downloadFile/" +
						selectedObj.docId;
				}
				window.open(link, "_self");
			} else {

			}

			// https: //flpnwc-uk81qreeol.dispatcher.ap1.hana.ondemand.com/connect_client_phase-II/Attachment/downloadFile/5f7287c8-6380-410e-bf3f-881299462771
			// https: //dkshsoservicesuk81qreeol.ap1.hana.ondemand.com/connect_client_phase-II/Attachment/downloadFile/5f7287c8-6380-410e-bf3f-881299462771
		},

		onPressAttachment: function (oEvent) {
			this.attachemntMode = "Add";
			if (oEvent.getSource().getTooltip() === "Cannot add Files") {
				this.attachmentName = "Preview";
			} else {
				this.attachmentName = "Return";
			}
			var that = this;
			if (!that.attachment) {
				that.attachment = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.attachment", this);
				that.getView().addDependent(that.attachment);
				that.attachment.addStyleClass("sapUiSizeCompact");
			}
			this.getView().getModel("baseModel").setProperty("/attachmentVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/attachmentDelEnable", true);
			that.attachment.open();

		},

		onViewAttachment: function (oEvent) {
			this.attachemntMode = "View";
			if (oEvent.getSource().getTooltip() === "Cannot add Files") {
				this.attachmentName = "Preview";
			} else {
				this.attachmentName = "Return";
			}
			var that = this;
			if (!that.attachment) {
				that.attachment = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.attachment", this);
				that.getView().addDependent(that.attachment);
				that.attachment.addStyleClass("sapUiSizeCompact");
			}
			this.getView().getModel("baseModel").setProperty("/attachmentVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/attachmentDelEnable", false);
			that.attachment.open();
		},

		okAttachment: function () {
			if (this.docVersion === "SUCCESS") {
				this.attachment.close();
			} else {
				if (this.getView().getModel("returnModel").getData().attachmentObject === undefined || this.getView().getModel("returnModel")
					.getData()
					.attachmentObject.length === 0) {
					MessageBox.information(this.resourceBundle.getText("Addatleastonfile"));
					// MessageBox.information("Add at least on file");
				} else {
					this.getView().getModel("baseModel").setProperty("/attachmentValue", "");
					this.attachment.close();
				}
			}
		},

		cancelAttachment: function () {
			if (this.docVersion === "SUCCESS") {
				this.attachment.close();
				return;
			} else if (this.docVersion === "DRAFT") {
				if (this.attachemntMode === "View") {
					this.attachment.close();
				} else {
					// if (this.getView().getModel("returnModel").getData().attachmentObject.length > 0) {
					// 	var attachmentList = this.getView().getModel("returnModel").getData().attachmentObject;
					// 	for (var i = attachmentList.length - 1; i >= 0; i--) {
					// 		if (attachmentList[i].docId === "") {
					// 			attachmentList.splice(i, 1);
					// 		}
					// 	}
					// 	this.getView().getModel("returnModel").setProperty("/attachmentObject", attachmentList);
					// }
					if (this.getView().getModel("returnModel").getData().attachmentObject.length === 0) {
						this.getView().getModel("returnModel").setProperty("/enableViewAttachment", false);
					}
					this.attachment.close();
				}
			} else {
				if (this.attachemntMode = "View") {
					this.attachment.close();
				} else {
					// this.getView().getModel("returnModel").getData().attachmentObject = [];
					this.getView().getModel("returnModel").refresh(true);
					this.getView().getModel("baseModel").setProperty("/attachmentValue", "");
					this.attachment.close();
				}
			}
		},

		valueHelpBillingType: function () {
			var that = this;
			if (!that.BillingType) {
				that.BillingType = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.BillingType", that);
				that.getView().addDependent(that.BillingType);
				var oDataModel = this.getView().getModel("ZDKSH_CC_RETURNS_MANAGEMENT_SRV");
				var busyDialog = new sap.m.BusyDialog();
				busyDialog.open();
				oDataModel.read("/billingTypeLookUpSet", {
					async: false,
					success: function (oData, oResponse) {
						busyDialog.close();
						var billingTypeModel = new sap.ui.model.json.JSONModel({
							"results": oData.results
						});
						if (oData.results.length === 1) {

						}
						that.BillingType.setModel(billingTypeModel, "billingTypeModel");
						that.BillingType.open();
					},
					error: function (error) {
						busyDialog.close();
						var errorMsg = "";
						if (error.statusCode === 504) {
							errorMsg = that.resourceBundle.getText("timeOut");
							// errorMsg = "Request timed-out. Please try again!";
							that.errorMsg(errorMsg);
						} else {
							errorMsg = JSON.parse(error.responseText);
							errorMsg = errorMsg.error.message.value;
							that.errorMsg(errorMsg);
						}
					}
				});
			} else {
				that.BillingType.open();
			}
		},

		valueHelpUOM: function (oEvent) {

			// this.excTab = "ExchangeTab";
			if (oEvent.getSource().getBindingContext("exchangeModel") !== undefined) {
				this.UOMIndex = oEvent.getSource().getBindingContext("exchangeModel");
			} else if (oEvent.getSource().getBindingContext("invoiceSearchModel") !== undefined) {
				this.UOMIndex = oEvent.getSource().getBindingContext("invoiceSearchModel");
			} else {
				this.UOMIndex = oEvent.getSource().getBindingContext("returnModel");

			}

			var that = this;
			// var material = oEvent.getSource().getValue();
			if (oEvent.getSource().getBindingContext("exchangeModel") !== undefined) {
				var bindingModel = oEvent.getSource().getBindingContext("exchangeModel");
			} else if (oEvent.getSource().getBindingContext("invoiceSearchModel") !== undefined) {
				var bindingModel = oEvent.getSource().getBindingContext("invoiceSearchModel");
			} else {
				var bindingModel = oEvent.getSource().getBindingContext("returnModel");
			}
			var path = parseInt(bindingModel.getPath().split("/")[2]);
			this.currentRowObject = bindingModel.getObject();

			var invoiceSearchModel = this.getView().getModel("invoiceSearchModel");
			var filters = [];
			if (oEvent.getSource().getBindingContext("invoiceSearchModel") !== undefined) {
				var oFilter = new sap.ui.model.Filter({
					filters: [
						new sap.ui.model.Filter("materialNum", sap.ui.model.FilterOperator.EQ, this.currentRowObject.MaterialCode),
						new sap.ui.model.Filter("salesOrg", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getData().salesOrgNo),
						new sap.ui.model.Filter("distChannel", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getData().distChnl),
						new sap.ui.model.Filter("division", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getData().division),
						new sap.ui.model.Filter("shipToParty", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getData().shipToParty),
						new sap.ui.model.Filter("soldToParty", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getData().soldToParty),
						new sap.ui.model.Filter("orderType", sap.ui.model.FilterOperator.EQ, this.getView().getModel("baseModel").getData().exchangeOrderType),
						new sap.ui.model.Filter("materialGroup", sap.ui.model.FilterOperator.EQ, this.currentRowObject.MaterialGroup),
						new sap.ui.model.Filter("materialGroup4", sap.ui.model.FilterOperator.EQ, this.currentRowObject.MaterialGroup4),
						new sap.ui.model.Filter("quantity", sap.ui.model.FilterOperator.EQ, this.currentRowObject.actualRetQty)
					],
					and: true
				});
			} else {
				if (this.currentRowObject.matNumber === "") {
					MessageBox.information(this.resourceBundle.getText("Materialcannotbeempty"));
					// MessageBox.information("Material cannot be empty");
					return;
				} else {
					var oFilter = new sap.ui.model.Filter({
						filters: [
							new sap.ui.model.Filter("materialNum", sap.ui.model.FilterOperator.EQ, this.currentRowObject.matNumber),
							new sap.ui.model.Filter("salesOrg", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getData().salesOrgNo),
							new sap.ui.model.Filter("distChannel", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getData().distChnl),
							new sap.ui.model.Filter("division", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getData().division),
							new sap.ui.model.Filter("shipToParty", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getData().shipToParty),
							new sap.ui.model.Filter("soldToParty", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getData().soldToParty),
							new sap.ui.model.Filter("orderType", sap.ui.model.FilterOperator.EQ, this.getView().getModel("baseModel").getData().exchangeOrderType),
							new sap.ui.model.Filter("materialGroup", sap.ui.model.FilterOperator.EQ, this.currentRowObject.materialGroup),
							new sap.ui.model.Filter("materialGroup4", sap.ui.model.FilterOperator.EQ, this.currentRowObject.materialGroup4),
							new sap.ui.model.Filter("quantity", sap.ui.model.FilterOperator.EQ, this.currentRowObject.quantity)
						],
						and: true
					});
				}
			}
			filters.push(oFilter);
			var oDataModel = this.getView().getModel("ZDKSH_CC_RETURNS_MANAGEMENT_SRV");
			// if (!that.UOM) {
			that.UOM = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.UOM", that);
			that.getView().addDependent(that.BillingType);
			var oDataModel = this.getView().getModel("ZDKSH_CC_RETURNS_MANAGEMENT_SRV");
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			oDataModel.read("/materialDataSet", {
				async: false,
				filters: filters,
				urlParameters: "&$expand=materialDataToMaterialAltUom,materialDataToMatPricingScale,materialDataToMatBonusGoods&$format=json",
				success: function (oData, oResponse) {
					busyDialog.close();
					var UOMModel = new sap.ui.model.json.JSONModel({
						"results": oData.results[0].materialDataToMaterialAltUom.results
					});
					that.UOM.setModel(UOMModel, "UOMModel");
					that.UOM.getModel("UOMModel").refresh();
					that.UOM.open();
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = "";
					if (error.statusCode === 504) {
						errorMsg = that.resourceBundle.getText("timeOut");
						errorMsg = "Request timed-out. Please try again!";
						that.errorMsg(errorMsg);
					} else {
						errorMsg = JSON.parse(error.responseText);
						errorMsg = errorMsg.error.message.value;
						that.errorMsg(errorMsg);
					}
				}
			});
			// }
		},

		// sales Org odata service call
		_salesOrgList: function (oEvent) {
			var that = this;
			if (this.getView().getModel("ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV")) {
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
						new sap.ui.model.Filter("Language", sap.ui.model.FilterOperator.EQ, "EN"),
						new sap.ui.model.Filter("Salesorg", sap.ui.model.FilterOperator.EQ, that.salesOrgDataAccess)
					],
					and: true
				});
				filters.push(oFilter);
				var busyDialog = new sap.m.BusyDialog();
				busyDialog.open();
				oDataModel.read("/ZSearchHelp_SalesOrgSet", {
					filters: filters,
					async: false,
					success: function (oData, oResponse) {
						busyDialog.close();
						var salesOrgModel = new sap.ui.model.json.JSONModel({
							"results": oData.results
						});
						salesOrgModel.setSizeLimit(salesOrgModel.getData().results.length);
						that.getView().setModel(salesOrgModel, "salesOrgModel");

						if (oData.results.length === 1) {
							that.getView().getModel("baseModel").setProperty("/selectedSalesOrg", oData.results[0].Salesorg);
							that.getView().getModel("baseModel").setProperty("/selectedSalesOrgDesc", oData.results[0].SalesorgDesc);
						}
						if (!that.salesOrg) {
							that.salesOrg = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.SalesOrg", that);
							that.getView().addDependent(that.salesOrg);
							var salesOrgModel = new sap.ui.model.json.JSONModel({
								"results": oData.results
							});
							that.salesOrg.setModel(salesOrgModel, "salesOrgModel");
						}
					},
					error: function (error) {
						busyDialog.close();
						var errorMsg = "";
						if (error.statusCode === 504) {
							errorMsg = that.resourceBundle.getText("timeOut");
							// errorMsg = "Request timed-out. Please try again!";
							that.errorMsg(errorMsg);
						} else {
							errorMsg = JSON.parse(error.responseText);
							errorMsg = errorMsg.error.message.value;
							that.errorMsg(errorMsg);
						}
					}
				});
			}
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

		_distChannelList: function () {
			var that = this;
			if (that.distrChannelDataAccess === "No Access") {
				MessageToast.show(this.resourceBundle.getText("NoDataAccess"));
			} else {
				if (this.getView().getModel("ZDKSH_CC_HDR_LOOKUP_SRV")) {
					var oDataModel = this.getView().getModel("ZDKSH_CC_HDR_LOOKUP_SRV");
					var filters = [];
					var lang = "";
					// if (sap.ushell.Container) {
					// 	lang = sap.ui.getCore().getConfiguration().getLanguage();
					// } else {
					// 	lang = "EN";
					// }
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
							if (oData.results.length === 1) {
								that.getView().getModel("baseModel").setProperty("/selectedDistChnl", oData.results[0].DistChl);
								that.getView().getModel("baseModel").setProperty("/selectedDistChlDesc", oData.results[0].Name);
							}
							if (!that.DistChnl) {
								that.DistChnl = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.DistChnl", that);
								that.getView().addDependent(that.DistChnl);
								var DivisionModel = new sap.ui.model.json.JSONModel({
									"results": oData.results
								});
								that.DistChnl.setModel(DivisionModel, "DistChanSet");
								// that.DivisionFrag.open();
							}

						},
						error: function (error) {
							busyDialog.close();
							var errorMsg = "";
							if (error.statusCode === 504) {
								errorMsg = that.resourceBundle.getText("timeOut");
								// errorMsg = "Request timed-out. Please try again!";
								that.errorMsg(errorMsg);
							} else {
								errorMsg = JSON.parse(error.responseText);
								errorMsg = errorMsg.error.message.value;
								that.errorMsg(errorMsg);
							}
						}
					});
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
								// errorMsg = "Request timed-out. Please try again!";
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
					that.Division.open();
				}
			}
		},

		onConfirmChangeSalesOrg: function (oEvent) {
			oEvent.getSource().getBinding("items").filter([]);
			this.getView().getModel("baseModel").setProperty("/salesOrgContainer", "soldToPartyFrag");
			this.getView().getModel("baseModel").setProperty("/SalesOrg", oEvent.getParameters().selectedContexts[0].getObject().Salesorg);
			this.getView().getModel("baseModel").setProperty("/SalesOrgDesc", oEvent.getParameters().selectedContexts[0].getObject().SalesorgDesc);
			this.getView().getModel("baseModel").setProperty("/selectedSalesOrg", oEvent.getParameters().selectedContexts[0].getObject().Salesorg);
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

		onLiveChangeShipTo: function (oEvent) {
			var value = oEvent.getParameters().value;
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("ShipToPartyCode", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("ShipToPartyName", sap.ui.model.FilterOperator.Contains, value)
			]);
			filters.push(oFilter);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(filters);
		},

		onLiveChangeBillTo: function (oEvent) {
			var value = oEvent.getParameters().value;
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("BillToPartyCode", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("BillToPartyName", sap.ui.model.FilterOperator.Contains, value)
			]);
			filters.push(oFilter);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(filters);
		},

		onLiveChangePayer: function (oEvent) {
			var value = oEvent.getParameters().value;
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("PayerCode", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("PayerName", sap.ui.model.FilterOperator.Contains, value)
			]);
			filters.push(oFilter);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(filters);
		},

		onConfirmChangePayer: function (oEvent) {
			oEvent.getSource().getBinding("items").filter([]);
			if (this.getView().getModel("exchangeModel") && this.getView().getModel("exchangeModel").getProperty("/results").length > 0) {
				this.getView().getModel("baseModel").setProperty("/exPayer", oEvent.getParameters().selectedContexts[0].getObject().PayerCode);
				this.getView().getModel("baseModel").setProperty("/exPayerDesc", oEvent.getParameters().selectedContexts[0].getObject().PayerName);
				this.getView().getModel("baseModel").refresh();
				this._pricingSimulation(this.getView().getModel("exchangeModel").getProperty("/results"), "Exchange");
			} else {
				MessageToast.show("Add items for exchange");
			}
		},

		onConfirmChangeBillTo: function (oEvent) {
			oEvent.getSource().getBinding("items").filter([]);
			if (this.getView().getModel("exchangeModel") && this.getView().getModel("exchangeModel").getProperty("/results").length > 0) {
				this.getView().getModel("baseModel").setProperty("/exBillTo", oEvent.getParameters().selectedContexts[0].getObject().BillToPartyCode);
				this.getView().getModel("baseModel").setProperty("/exBillToDesc", oEvent.getParameters().selectedContexts[0].getObject().BillToPartyName);
				this.getView().getModel("baseModel").refresh();
				this._pricingSimulation(this.getView().getModel("exchangeModel").getProperty("/results"), "Exchange");
			} else {
				MessageToast.show("Add items for exchange");
			}

		},

		onConfirmChangeShipTo: function (oEvent) {
			oEvent.getSource().getBinding("items").filter([]);
			if (this.getView().getModel("exchangeModel") && this.getView().getModel("exchangeModel").getProperty("/results").length > 0) {
				this.getView().getModel("baseModel").setProperty("/exShipTo", oEvent.getParameters().selectedContexts[0].getObject().ShipToPartyCode);
				this.getView().getModel("baseModel").setProperty("/exShipToDesc", oEvent.getParameters().selectedContexts[0].getObject().ShipToPartyName);
				this.getView().getModel("baseModel").refresh();
				this._pricingSimulation(this.getView().getModel("exchangeModel").getProperty("/results"), "Exchange");
			} else {
				MessageToast.show("Add items for exchange");
			}
		},

		handleAddDivision: function (oEvent) {
			oEvent.getSource().getBinding("items").filter([]);
			// this.getView().getModel("baseModel").setProperty("/salesOrgContainer", "soldToPartyFrag");
			this.getView().getModel("baseModel").setProperty("/Division", oEvent.getParameters().selectedContexts[0].getObject().Division);
			this.getView().getModel("baseModel").setProperty("/DivisionDesc", oEvent.getParameters().selectedContexts[0].getObject().Name);
			// this.getView().getModel("baseModel").setProperty("/Division", oEvent.getParameters().selectedContexts[0].getObject().Name);
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

		onClickROType: function (oEvent) {
			var that = this;
			var baseModel = this.getView().getModel("baseModel");
			var selectedROType = oEvent.getSource().getBindingContext("ROTypeListModel").getObject();
			this.ROtypeCode = selectedROType.roType;
			baseModel.setProperty("/selectedROType", selectedROType.roTypeDesc);
			baseModel.setProperty("/selectedROTypeCode", this.ROtypeCode);
			if (this.ROtypeCode === "TI") {
				this.getView().getModel("invoiceSearchModel").setProperty("/billingCategory", "B");
				this.getView().getModel("invoiceSearchModel").setProperty("/billingCategoryDesc", "Consignment Fill Up");
				baseModel.setProperty("/visiblityROTypeSel", false);
				baseModel.setProperty("/visiblityROTypeText", true);
			} else {
				this.getView().getModel("invoiceSearchModel").setProperty("/billingCategory", "C");
				this.getView().getModel("invoiceSearchModel").setProperty("/billingCategoryDesc", "Commercial Invoice");
				baseModel.setProperty("/visiblityROTypeSel", true);
				baseModel.setProperty("/visiblityROTypeText", false);
			}
			baseModel.refresh();
			var filters = [];
			var oFilter = new sap.ui.model.Filter("roType", sap.ui.model.FilterOperator.EQ, this.ROtypeCode);
			filters.push(oFilter);
			var oDataModel = that.getView().getModel("ZDKSH_CC_RETURNS_MANAGEMENT_SRV");
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			oDataModel.read("/roTypeReturnReasonSet", {
				filters: filters,
				async: false,
				success: function (oData, oResponse) {
					busyDialog.close();

					that.reasonModel = new sap.ui.model.json.JSONModel({
						"results": oData.results
					});
					that.getView().setModel(that.reasonModel, "OrderReasonSet");
					that._getSLoc();
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.responseText);
					errorMsg = errorMsg.error.message.value;
					that.errorMsg(errorMsg);
				}

			});
		},

		_getSLoc: function () {
			var that = this;
			var filters = [];
			var oFilter = new sap.ui.model.Filter("roType", sap.ui.model.FilterOperator.EQ, this.ROtypeCode);
			filters.push(oFilter);
			var oDataModel = that.getView().getModel("ZDKSH_CC_RETURNS_MANAGEMENT_SRV");
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			oDataModel.read("/roTypeSlocSet", {
				filters: filters,
				async: false,
				success: function (oData, oResponse) {
					busyDialog.close();
					if (oData.results.length > 0) {
						if (that.selectedReturnItems) {
							for (var i = 0; i < that.selectedReturnItems.length; i++) {
								that.selectedReturnItems[i].storageLocation = oData.results[0].Sloc;
							}
						}
						that.getView().getModel("baseModel").setProperty("/roTypeSLoc", oData.results[0].Sloc);
					} else {
						MessageBox.error(that.resourceBundle.getText("NoSLocAvailablefor") + this.ROtypeCode);
					}
					that._getOrderType();
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.responseText);
					errorMsg = errorMsg.error.message.value;
					that.errorMsg(errorMsg);
				}

			});
		},

		_getRoTypeList: function () {
			var that = this;
			var oModel = this.getView().getModel("ZDKSH_CC_RETURNS_MANAGEMENT_SRV");
			var busyDialog = new sap.m.BusyDialog;
			busyDialog.open();
			oModel.read("/returnTypeSet", {
				async: true,
				success: function (success) {
					busyDialog.close();
					var list = success.results;
					var sortedROType = [];
					// sortedROType.push()
					for (var i = 0; i < list.length; i++) {
						if (list[i].roType === "TG") {
							var obj = {
								"roType": list[i].roType,
								"icon": "sap-icon://inspect"
							}
							sortedROType.splice(0, 0, obj);
						}
						if (list[i].roType === "TF") {
							var obj = {
								"roType": list[i].roType,
								"icon": "sap-icon://inspect-down"
							}
							sortedROType.splice(1, 0, obj);
						}
						if (list[i].roType === "TI") {
							var obj = {
								"roType": list[i].roType,
								"icon": "sap-icon://paid-leave"
							}
							sortedROType.splice(2, 0, obj);
						}
						if (list[i].roType === "TK") {
							var obj = {
								"roType": list[i].roType,
								"icon": "sap-icon://activity-2"
							}
							sortedROType.splice(3, 0, obj);
						}
					}
					// sortedROType.sort();
					// var sortedList = [];
					for (var i = 0; i < sortedROType.length; i++) {
						for (var j = 0; j < list.length; j++) {
							if (list[j].roType === sortedROType[i].roType) {
								sortedROType[i].roTypeDesc = list[j].roTypeDesc;
							}
						}
						// sortedList.push(object);
					}
					var ROTypeListModel = new sap.ui.model.json.JSONModel({
						"results": sortedROType
					});
					that.getView().setModel(ROTypeListModel, "ROTypeListModel");

				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.responseText);
					errorMsg = errorMsg.error.message.value;
					that.errorMsg(errorMsg);
				}
			});
		},

		_getReasonOwner: function () {
			var that = this;
			var filters = [];
			var oFilter = new sap.ui.model.Filter({
				filters: [
					new sap.ui.model.Filter("roType", sap.ui.model.FilterOperator.EQ, this.ROtypeCode),
					new sap.ui.model.Filter("returnReasonCode", sap.ui.model.FilterOperator.EQ, this.retReasonCode)
				],
				and: true
			});
			filters.push(oFilter);
			var oDataModel = that.getView().getModel("ZDKSH_CC_RETURNS_MANAGEMENT_SRV");
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			oDataModel.read("/reasonOwnerSet", {
				filters: filters,
				async: false,
				success: function (oData, oResponse) {
					busyDialog.close();
					var reasonOwnerModel = new sap.ui.model.json.JSONModel({
						"results": oData.results
					});
					that.getView().setModel(reasonOwnerModel, "reasonOwnerModel");
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.responseText);
					errorMsg = errorMsg.error.message.value;
					that.errorMsg(errorMsg);
				}

			});
		},

		onPressShowAddress: function (oEvent) {
			var oButton = oEvent.getSource();
			// create popover
			if (!this._oPopover) {
				Fragment.load({
					name: "incture.com.Inventory.Fragments.popoverTable",
					controller: this
				}).then(function (pPopover) {
					this._oPopover = pPopover;
					this.getView().addDependent(this._oPopover);
					this._oPopover.bindElement("");
					if (sap.ui.Device.system.phone === true) {
						this._oPopover.setPlacement("Bottom");
						this._oPopover.openBy(oButton);
					} else {
						this._oPopover.openBy(oButton);
					}
				}.bind(this));
			} else {
				if (sap.ui.Device.system.phone === true) {
					this._oPopover.setPlacement("Bottom");
					this._oPopover.openBy(oButton);
				} else {
					this._oPopover.openBy(oButton);
				}
			}
		},

		handleAddDistChan: function (oEvent) {
			oEvent.getSource().getBinding("items").filter([]);
			this.getView().getModel("baseModel").setProperty("/DistChan", oEvent.getParameters().selectedContexts[0].getObject().DistChl);
			this.getView().getModel("baseModel").setProperty("/selectedDistChnl", oEvent.getParameters().selectedContexts[0].getObject().DistChl);
			this.getView().getModel("baseModel").setProperty("/DistChanDesc", oEvent.getParameters().selectedContexts[0].getObject().Name);
			this.getView().getModel("baseModel").refresh();
		},

		onEditMaterial: function (oEvent) {
			var that = this;
			var invoiceSearchModel = this.getView().getModel("invoiceSearchModel");
			var baseModel = this.getView().getModel("baseModel");
			var filters = [];
			var oFilter = new sap.ui.model.Filter({
				filters: [
					new sap.ui.model.Filter("materialNum", sap.ui.model.FilterOperator.EQ, that.getView().getModel("baseModel").getProperty(
						"/newMaterial")),
					new sap.ui.model.Filter("salesOrg", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getData().salesOrgNo),
					new sap.ui.model.Filter("distChannel", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getData().distChnl),
					new sap.ui.model.Filter("division", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getData().Division),
					new sap.ui.model.Filter("shipToParty", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getData().shipTo),
					new sap.ui.model.Filter("soldToParty", sap.ui.model.FilterOperator.EQ, invoiceSearchModel.getData().soldToParty),
					new sap.ui.model.Filter("orderType", sap.ui.model.FilterOperator.EQ, this.getView().getModel("baseModel").getData().exchangeOrderType),
					new sap.ui.model.Filter("materialGroup", sap.ui.model.FilterOperator.EQ, that.materialGroupDataAccess),
					new sap.ui.model.Filter("materialGroup4", sap.ui.model.FilterOperator.EQ, that.materialGroup4DataAccess),
					new sap.ui.model.Filter("customerCodeDac", sap.ui.model.FilterOperator.EQ, that.custCodeDataAccess),
					new sap.ui.model.Filter("materialCodeDac", sap.ui.model.FilterOperator.EQ, that.materialDataAccess)
				],
				and: true
			});
			filters.push(oFilter);

			var oDataModel = this.getView().getModel("ZDKSH_cc_returns_management_SRV");
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			oDataModel.read("/materialDataSet", {
				async: false,
				filters: filters,
				urlParameters: "&$expand=materialDataToMaterialAltUom,materialDataToMatPricingScale,materialDataToMatBonusGoods&$format=json",
				success: function (oData, oResponse) {
					busyDialog.close();
					var oData = oData.results[0];
					// var oData = oData.results[0];
					if (oData.active === "E") {
						MessageToast.show(that.resourceBundle.getText("exchangenotallowed"));
						// MessageToast.show("Sales/ exchange not allowed");
					} else {
						if (that.getView().getModel("exchangeModel")) {
							var tableData = that.getView().byId("ExchangeTableId").getModel("exchangeModel").getData().results;
						} else {
							var exchangeModel = new sap.ui.model.json.JSONModel();
							that.getView().setModel(exchangeModel, "exchangeModel");
							that.getView().getModel("exchangeModel").setProperty("/results", []);
							var tableData = that.getView().byId("ExchangeTableId").getModel("exchangeModel").getData().results;
						}
						var newRow = {
							Active: "",
							itemNumber: "",
							matNumber: oData.materialNum,
							itemShortText: oData.materialDesc,
							materialGroup: oData.materialGroup,
							materialGroup4: oData.materialGroup4,
							avlRetQty: "",
							quantity: oData.quantity,
							salesUnit: oData.uom,
							unitPrice: oData.unitPrice,
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
							listPrice: oData.listPrice,
							// shipToParty: "",
							deleted: "false",
							manualFOC: "",
						};
						tableData.push(newRow);
						that.getView().getModel("exchangeModel").setProperty("/results", tableData);
						that.getView().getModel("exchangeModel").refresh();
						that.getView().getModel("baseModel").setProperty("/newMaterial", "");
						that.getView().getModel("baseModel").refresh();
						that.AddMaterial.close();
					}
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.responseText);
					errorMsg = errorMsg.error.message.value;
					that.errorMsg(errorMsg);
					that.AddMaterial.close();
				}
			});

		},

		onPressInvoiceDetail: function (oEvent) {
			if (sap.ui.Device.system.phone === true) {
				var results = oEvent.getSource().getBindingContext("invoiceSearchModel").getObject();
				var oButton = oEvent.getSource();
				// create popover
				if (!this._oPopover) {
					Fragment.load({
						name: "incture.com.ConnectClient_ReturnCreate.Fragments.InvoicePopover",
						controller: this
					}).then(function (pPopover) {
						this._oPopover = pPopover;
						this.getView().addDependent(this._oPopover);
						var invoiceSearchPopoverModel = new sap.ui.model.json.JSONModel({
							"results": results
						});
						// var  = new sap.ui.model.json.JSONModel();
						this._oPopover.setModel(invoiceSearchPopoverModel, "invoiceSearchPopoverModel");
						this._oPopover.getModel("invoiceSearchPopoverModel").refresh();
						this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
						this._oPopover.getModel("PersonalizationModel").refresh();
						// this._oPopover.bindElement("/ATPOverviewTableModel/oEvent.getSource().getBindingContext("ATPOverviewTableModel").getPath()");
						if (sap.ui.Device.system.phone === true) {
							this._oPopover.setPlacement("Bottom");
							this._oPopover.openBy(oButton);
						} else {
							this._oPopover.openBy(oButton);
						}

					}.bind(this));
				} else {
					var invoiceSearchPopoverModel = new sap.ui.model.json.JSONModel({
						"results": results
					});
					this._oPopover.setModel(invoiceSearchPopoverModel, "invoiceSearchPopoverModel");
					this._oPopover.getModel("invoiceSearchPopoverModel").refresh();
					this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
					this._oPopover.getModel("PersonalizationModel").refresh();
					// this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
					// this._oPopover.getModel("PersonalizationModel").refresh();
					if (sap.ui.Device.system.phone === true) {
						this._oPopover.setPlacement("Bottom");
						this._oPopover.openBy(oButton);
					} else {
						this._oPopover.openBy(oButton);
					}
				}
			}
		},

		onPressReturnDetail: function (oEvent) {
			if (sap.ui.Device.system.phone === true) {
				var results = oEvent.getSource().getBindingContext("returnModel").getObject();
				var oButton = oEvent.getSource();
				// create popover
				if (!this._oPopover) {
					Fragment.load({
						name: "incture.com.ConnectClient_ReturnCreate.Fragments.ReturnPopover",
						controller: this
					}).then(function (pPopover) {
						this._oPopover = pPopover;
						this.getView().addDependent(this._oPopover);
						var returnPopoverModel = new sap.ui.model.json.JSONModel({
							"results": results
						});
						// var  = new sap.ui.model.json.JSONModel();
						this._oPopover.setModel(returnPopoverModel, "returnPopoverModel");
						this._oPopover.getModel("returnPopoverModel").refresh();
						this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
						this._oPopover.getModel("PersonalizationModel").refresh();
						// this._oPopover.bindElement("/ATPOverviewTableModel/oEvent.getSource().getBindingContext("ATPOverviewTableModel").getPath()");
						if (sap.ui.Device.system.phone === true) {
							this._oPopover.setPlacement("Bottom");
							this._oPopover.openBy(oButton);
						} else {
							this._oPopover.openBy(oButton);
						}

					}.bind(this));
				} else {
					var returnPopoverModel = new sap.ui.model.json.JSONModel({
						"results": results
					});
					this._oPopover.setModel(returnPopoverModel, "returnPopoverModel");
					this._oPopover.getModel("returnPopoverModel").refresh();
					this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
					this._oPopover.getModel("PersonalizationModel").refresh();
					// this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
					// this._oPopover.getModel("PersonalizationModel").refresh();
					if (sap.ui.Device.system.phone === true) {
						this._oPopover.setPlacement("Bottom");
						this._oPopover.openBy(oButton);
					} else {
						this._oPopover.openBy(oButton);
					}
				}
			}
		},

		onPressReturnDetailPopover: function (oEvent) {
			if (sap.ui.Device.system.phone === true) {
				var results = oEvent.getSource().getBindingContext("returnPreviewModel").getObject();
				var oButton = oEvent.getSource();
				// create popover
				if (!this._oPopover) {
					Fragment.load({
						name: "incture.com.ConnectClient_ReturnCreate.Fragments.ReturnPreviewPopover",
						controller: this
					}).then(function (pPopover) {
						this._oPopover = pPopover;
						this.getView().addDependent(this._oPopover);
						var returnPreviewPopoverModel = new sap.ui.model.json.JSONModel({
							"results": results
						});
						// var  = new sap.ui.model.json.JSONModel();
						this._oPopover.setModel(returnPreviewPopoverModel, "returnPreviewPopoverModel");
						this._oPopover.getModel("returnPreviewPopoverModel").refresh();
						this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
						this._oPopover.getModel("PersonalizationModel").refresh();
						// this._oPopover.bindElement("/ATPOverviewTableModel/oEvent.getSource().getBindingContext("ATPOverviewTableModel").getPath()");
						if (sap.ui.Device.system.phone === true) {
							this._oPopover.setPlacement("Bottom");
							this._oPopover.openBy(oButton);
						} else {
							this._oPopover.openBy(oButton);
						}

					}.bind(this));
				} else {
					var returnPreviewPopoverModel = new sap.ui.model.json.JSONModel({
						"results": results
					});
					this._oPopover.setModel(returnPreviewPopoverModel, "returnPreviewPopoverModel");
					this._oPopover.getModel("returnPreviewPopoverModel").refresh();
					this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
					this._oPopover.getModel("PersonalizationModel").refresh();
					// this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
					// this._oPopover.getModel("PersonalizationModel").refresh();
					if (sap.ui.Device.system.phone === true) {
						this._oPopover.setPlacement("Bottom");
						this._oPopover.openBy(oButton);
					} else {
						this._oPopover.openBy(oButton);
					}
				}
			}
		},

		onPressExchangeDetailPopover: function (oEvent) {
			if (sap.ui.Device.system.phone === true) {
				var results = oEvent.getSource().getBindingContext("exchangePreviewModel").getObject();
				var oButton = oEvent.getSource();
				// create popover
				if (!this._oPopover) {
					Fragment.load({
						name: "incture.com.ConnectClient_ReturnCreate.Fragments.ExchangePreviewPopover",
						controller: this
					}).then(function (pPopover) {
						this._oPopover = pPopover;
						this.getView().addDependent(this._oPopover);
						var exchangePreviewPopoverModel = new sap.ui.model.json.JSONModel({
							"results": results
						});
						// var  = new sap.ui.model.json.JSONModel();
						this._oPopover.setModel(exchangePreviewPopoverModel, "exchangePreviewPopoverModel");
						this._oPopover.getModel("exchangePreviewPopoverModel").refresh();
						this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
						this._oPopover.getModel("PersonalizationModel").refresh();
						// this._oPopover.bindElement("/ATPOverviewTableModel/oEvent.getSource().getBindingContext("ATPOverviewTableModel").getPath()");
						if (sap.ui.Device.system.phone === true) {
							this._oPopover.setPlacement("Bottom");
							this._oPopover.openBy(oButton);
						} else {
							this._oPopover.openBy(oButton);
						}

					}.bind(this));
				} else {
					var exchangePreviewPopoverModel = new sap.ui.model.json.JSONModel({
						"results": results
					});
					this._oPopover.setModel(exchangePreviewPopoverModel, "exchangePreviewPopoverModel");
					this._oPopover.getModel("exchangePreviewPopoverModel").refresh();
					this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
					this._oPopover.getModel("PersonalizationModel").refresh();
					// this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
					// this._oPopover.getModel("PersonalizationModel").refresh();
					if (sap.ui.Device.system.phone === true) {
						this._oPopover.setPlacement("Bottom");
						this._oPopover.openBy(oButton);
					} else {
						this._oPopover.openBy(oButton);
					}
				}
			}
		},

		onPressExchangeDetail: function (oEvent) {
			if (sap.ui.Device.system.phone === true) {
				var results = oEvent.getSource().getBindingContext("exchangeModel").getObject();
				var oButton = oEvent.getSource();
				// create popover
				if (!this._oPopover) {
					Fragment.load({
						name: "incture.com.ConnectClient_ReturnCreate.Fragments.ExchangePopover",
						controller: this
					}).then(function (pPopover) {
						this._oPopover = pPopover;
						this.getView().addDependent(this._oPopover);
						var exchangePopoverModel = new sap.ui.model.json.JSONModel({
							"results": results
						});
						// var  = new sap.ui.model.json.JSONModel();
						this._oPopover.setModel(exchangePopoverModel, "exchangePopoverModel");
						this._oPopover.getModel("exchangePopoverModel").refresh();
						this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
						this._oPopover.getModel("PersonalizationModel").refresh();
						// this._oPopover.bindElement("/ATPOverviewTableModel/oEvent.getSource().getBindingContext("ATPOverviewTableModel").getPath()");
						if (sap.ui.Device.system.phone === true) {
							this._oPopover.setPlacement("Bottom");
							this._oPopover.openBy(oButton);
						} else {
							this._oPopover.openBy(oButton);
						}

					}.bind(this));
				} else {
					var exchangePopoverModel = new sap.ui.model.json.JSONModel({
						"results": results
					});
					this._oPopover.setModel(exchangePopoverModel, "exchangePopoverModel");
					this._oPopover.getModel("exchangePopoverModel").refresh();
					this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
					this._oPopover.getModel("PersonalizationModel").refresh();
					if (sap.ui.Device.system.phone === true) {
						this._oPopover.setPlacement("Bottom");
						this._oPopover.openBy(oButton);
					} else {
						this._oPopover.openBy(oButton);
					}
				}
			}
		},

		onFileUploadChange: function (oEvent) {
			var that = this;
			var event = oEvent.getSource();
			if (this.docVersion === "SUCCESS" || this.attachmentName === "Preview") {

				MessageToast.show(this.resourceBundle.getText("CannotUpload"));
				// MessageToast.show("Cannot Upload");
				return;
			}
			this.file = oEvent.getParameter("files")[0];
			if (this.file) {

				var reader = new FileReader();
				let fileByteArray = [];

				reader.onload = function (readerEvt) {
					var binaryString;
					if (!readerEvt) {
						binaryString = reader.content;
					} else {
						binaryString = readerEvt.target.result;
					}
					if (readerEvt.target.readyState == FileReader.DONE) {
						let arrayBuffer = readerEvt.target.result,
							array = new Uint8Array(arrayBuffer);
						for (var byte of array) {
							fileByteArray.push(byte);
						}
					}
					var length = 0;
					var attachmentData = {};
					attachmentData["fileName"] = this.file.name;
					attachmentData["fileSize"] = this.file.size;
					attachmentData["fileType"] = this.file.type;
					attachmentData["fileDoc"] = fileByteArray;
					attachmentData["compressedFile"] = attachmentData["fileDoc"];
					attachmentData["returnReqNum"] = "";
					attachmentData["docId"] = "";
					// this.attachmentObject.push(attachmentData);
					for (var i = 0; i < this.getView().getModel("returnModel").getData().attachmentObject.length; i++) {
						if (this.file.name === this.getView().getModel("returnModel").getData().attachmentObject[i].fileName) {
							MessageToast.show(this.resourceBundle.getText("sameFileValidation"));
							// MessageToast.show("Cannot add files with same name");
							return;
						}
						length = length + this.getView().getModel("returnModel").getData().attachmentObject[i].fileSize;

					}
					// if()
					if (length + this.file.size > 1048576) {
						MessageToast.show(this.resourceBundle.getText("fileSizeValidation"));
						// MessageToast.show("File exceeding the size limit");
						return;
					}
					this.getView().getModel("returnModel").getData().attachmentObject.push(attachmentData);
					this.getView().getModel("baseModel").setProperty("/attachmentLength", this.getView().getModel("returnModel").getData().attachmentObject
						.length);
					this.getView().getModel("returnModel").refresh();
					this.getView().getModel("baseModel").setProperty("/enableViewAttachment", true);
					this.getView().getModel("baseModel").setProperty("/attachmentTableVisiblity", true);
					this.getView().getModel("baseModel").refresh();
				}.bind(this);
			}
			reader.readAsArrayBuffer(this.file);
			event.clear();
		},

		onRemoveAttachmennt: function (oEvent) {
			var that = this;
			var tokenKey = oEvent.getSource().getBindingContext("returnModel").getObject().fileName;
			var attachmentData = this.getView().getModel("returnModel").getData().attachmentObject;
			for (var i = 0; i < attachmentData.length; i++) {
				if (attachmentData[i].fileName === tokenKey) {
					var docId = attachmentData[i].docId;
				}
			}
			if (docId !== "" && docId !== undefined) {
				var oModel = new sap.ui.model.json.JSONModel();
				that.getView().setModel(oModel, "oModel");
				var busyDialog = new sap.m.BusyDialog();
				busyDialog.open();
				var oHeader = {
					"Content-Type": "application/json;charset=utf-8"
				};
				oModel.loadData("/DKSHJavaService/Attachment/deleteAttachment/" + docId, null, true, "DELETE", false, false, oHeader);
				oModel.attachRequestCompleted(function (oEvent) {
					busyDialog.close();
					for (var i = 0; i < attachmentData.length; i++) {
						if (attachmentData[i].fileName === tokenKey) {
							returnModel.getData().attachmentObject.splice(i, 1);
							returnModel.refresh();
						}
						if (tokenKey === this.file.name) {
							this.getView().getModel("dashBoardModel").getData().attachmentValue = "";
						}
					}
					// that.getView().byId("idTMFileUploader").setValue("");
				});
				oModel.attachRequestFailed(function (oEvent) {
					busyDialog.close();
				});
			} else {
				for (var i = 0; i < attachmentData.length; i++) {
					if (attachmentData[i].fileName === tokenKey) {
						this.getView().getModel("returnModel").getData().attachmentObject.splice(i, 1);
						this.getView().getModel("returnModel").refresh();
					}
				}
				// this.getView().byId("idTMFileUploader").setValue("");
			}
			if (this.getView().getModel("returnModel").getData().attachmentObject.length === 0) {
				this.getView().getModel("baseModel").setProperty("/enableViewAttachment", false);
				this.getView().getModel("baseModel").setProperty("/attachmentTableVisiblity", false);
			}
		},

		addRow: function (oEvent) {

			if (!this.AddMaterial) {
				this.AddMaterial = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.AddMaterial", this);
				this.getView().addDependent(this.AddMaterial);
				this.AddMaterial.addStyleClass("sapUiSizeCompact");
			}
			this.AddMaterial.open();
		},
		closeAddMaterialFrag: function () {
			this.getView().getModel("baseModel").setProperty("/newMaterial", "");
			// this._editMaterial();
			this.AddMaterial.close();
		},

		addMaterial: function (oEvent) {
			this.onEditMaterial();
		},

		returnDeleteRow: function (oEvent) {
			var returnAmountTotal = 0;
			var count = 0;
			this.selectedRetItemsforDelete = (JSON.parse(JSON.stringify(this.getView().byId("ReturnTableId").getSelectedContextPaths())));
			if (this.selectedRetItemsforDelete.length > 0) {
				var tableData = this.getView().getModel("returnModel").getData().results;
				var conditions = this.getView().getModel("returnModel").getData().returnConditions;
				this.getView().byId("ReturnTableId").getSelectedItems()[0].getBindingContext("returnModel").getObject();
				for (var j = this.selectedRetItemsforDelete.length - 1; j >= 0; j--) {
					var index = parseInt(this.selectedRetItemsforDelete[j].split("/")[2]);
					tableData[index].deleted = "true";
					this.getView().byId("ReturnTableId").getItems()[index].setSelected(false);
					MessageToast.show(this.resourceBundle.getText("ItemDeleted"));
					// MessageToast.show("Item Deleted");
					for (var k = this.selectedReturnItems.length - 1; k >= 0; k--) {
						if (this.selectedReturnItems[k].InvoiceLineItem === tableData[index].refItemNumber && this.selectedReturnItems[k].InvoiceNum ===
							tableData[index].refInvoice) {
							this.selectedReturnItems.splice(k, 1);
						}
						for (var i = 0; i < conditions.length; i++) {
							if (tableData[index].refInvoice === conditions[i].refInvoice && tableData[index].itemNumber ===
								conditions[
									i].itemNumber) {
								conditions[i].deleted = "true";
							}
						}
					}
					this.getView().getModel("returnModel").setProperty("/returnConditions", conditions);
					// this.getView().byId("ReturnTableId").getItems()[parseInt(this.selectedItemsforDelete[j].split("/")[2])].setSelected(false);
				}
				for (var i = 0; i < tableData.length; i++) {
					if (tableData[i].deleted === "false") {
						returnAmountTotal = returnAmountTotal + parseFloat(tableData[i].netAmount);
						++count;
					}
				}
				if (count === 0) {
					if (this.getView().getModel("exchangeModel").getData().results !== undefined && this.getView().getModel("exchangeModel").getData()
						.results.length > 0) {
						this.getView().getModel("exchangeModel").getData().results = "";
						this.getView().getModel("baseModel").setProperty("/exchangeLength", "Exchange " + "(0)");
						this.getView().getModel("baseModel").setProperty("/exchangeAmountTotal", "0.00 (THB)");
						// this.getView().getModel("exchangeModel").setData("");
						this.getView().getModel("exchangeModel").refresh();
					}
					this.getView().getModel("baseModel").setProperty("/disableSoldToParty", true);
					this.getView().getModel("baseModel").refresh();
				}
				this.getView().getModel("returnModel").setProperty("/results", tableData);
				var oFilter = new sap.ui.model.Filter("deleted", sap.ui.model.FilterOperator.Contains, "false");
				var oBinding = [];
				oBinding = this.getView().byId("ReturnTableId").getBinding("items");
				oBinding.filter([oFilter]);
				this.getView().getModel("returnModel").setProperty("/returnAmountTotal", returnAmountTotal.toFixed(2) + "(THB)");
				this.getView().getModel("returnModel").setProperty("/returnLength", "Return (" + count + ")");
				// if (this.selectedRetItemsforDelete.length === tableData.length) {
				// 	this.getView().getModel("returnModel").getData().results = [];
				// 	this.returnItems = [];
				// }
				this.getView().getModel("returnModel").refresh(true);
				// this.getView().byId("ReturnTableId").removeSelections();
			} else {
				MessageToast.show(this.resourceBundle.getText("selectItemValidation"));
				// MessageToast.show("Select at least one item to delete");
			}

		},

		deleteRow: function (oEvent) {
			var exchangeAmountTotal = 0;
			var count = 0;
			this.deletedItem = [];
			this.selectedItemsforDelete = (JSON.parse(JSON.stringify(this.getView().byId("ExchangeTableId").getSelectedContextPaths())));
			if (this.selectedItemsforDelete.length > 0) {
				var tableData = this.getView().getModel("exchangeModel").getData().results;
				for (var j = 0; j < this.selectedItemsforDelete.length; j++) {
					var index = parseInt(this.selectedItemsforDelete[j].split("/")[2]);
					tableData[index].deleted = "true";
					this.deletedItem.push(tableData[index]);
					this.getView().byId("ExchangeTableId").getItems()[index].setSelected(false);
					MessageToast.show(this.resourceBundle.getText("ItemDeleted"));
					// MessageToast.show("Item Deleted");
				}
				var data = [];
				for (var i = 0; i < tableData.length; i++) {
					if (tableData[i].deleted === "false") {
						exchangeAmountTotal = exchangeAmountTotal + parseFloat(tableData[i].netAmount);
						++count;
						if ((tableData[i].refInvoice === "" && tableData[i].higherItem !== "000000" && tableData[i].higherItem !== "" && tableData[
									i]
								.manualFoc !==
								"X")) {} else {
							data.push(tableData[i]);
						}
						// data.push(tableData[i]);
					} else {
						for (var j = 0; j < tableData.length; j++) {
							if (tableData[i].itemNumber === tableData[j].higherItem) {
								tableData[j].deleted = "true";
								// this.deletedItem.push(tableData[j]);
							}
						}
					}
				}
				if (data.length > 0) {
					this._pricingSimulation(data, "ExchangeTab");
				}

				this.getView().getModel("exchangeModel").setProperty("/results", tableData);
				var oFilter = new sap.ui.model.Filter("deleted", sap.ui.model.FilterOperator.Contains, "false");
				var oBinding = [];
				oBinding = this.getView().byId("ExchangeTableId").getBinding("items");
				oBinding.filter([oFilter]);
				this.getView().getModel("exchangeModel").setProperty("/exchangeAmountTotal", exchangeAmountTotal.toFixed(2) + "(THB)");
				this.getView().getModel("exchangeModel").setProperty("/exchangeLength", "Exchange (" + count + ")");
				this.getView().getModel("exchangeModel").refresh(true);
				if (this.selectedItemsforDelete.length === tableData.length) {
					this.getView().byId("ID_TAB_BAR_PROV_APP").setSelectedKey("Return");
				}
			} else {
				MessageToast.show(this.resourceBundle.getText("selectItemValidation"));
				// MessageToast.show("Select at least one item to delete");
			}
		},

		returnUndoDelete: function (oEvent) {
			var returnAmountTotal = 0;
			var count = 0;

			// this.selectedRetItemsforDelete = this.getView().byId("ReturnTableId").getSelectedContextPaths();
			if (this.selectedRetItemsforDelete !== undefined && this.selectedRetItemsforDelete.length > 0) {
				var tableData = this.getView().getModel("returnModel").getData().results;
				for (var j = 0; j < this.selectedRetItemsforDelete.length; j++) {
					var index = parseInt(this.selectedRetItemsforDelete[j].split("/")[2]);
					tableData[index].deleted = "false";
					var obj = {
						"InvoiceLineItem": tableData[index].refItemNumber,
						"InvoiceNum": tableData[index].refInvoice
					};

					this.selectedReturnItems.push(obj);
					var conditions = this.getView().getModel("returnModel").getProperty("/returnConditions");
					for (var i = 0; i < conditions.length; i++) {
						if (tableData[index].refInvoice === conditions[i].refInvoice && tableData[index].itemNumber === conditions[
								i].itemNumber) {
							conditions[i].deleted = "false";
						}
					}
					this.getView().getModel("returnModel").setProperty("/returnConditions", conditions);
				}
				for (var i = 0; i < tableData.length; i++) {
					if (tableData[i].deleted === "false") {
						returnAmountTotal = returnAmountTotal + parseFloat(tableData[i].netAmount);
						++count;
					}
				}
				var oFilter = new sap.ui.model.Filter("deleted", sap.ui.model.FilterOperator.Contains, "false");
				var oBinding = [];
				oBinding = this.getView().byId("ReturnTableId").getBinding("items");
				oBinding.filter([oFilter]);
				this.getView().getModel("returnModel").setProperty("/returnAmountTotal", returnAmountTotal.toFixed(2) + "(THB)");
				this.getView().getModel("returnModel").setProperty("/returnLength", "Return (" + count + ")");
				// this.getView().getModel("returnModel").setProperty("/returnLength", "Returns (" + oFilter.length + ")");
				this.getView().getModel("returnModel").refresh(true);
				this.selectedRetItemsforDelete = undefined;
			} else {
				MessageToast.show(this.resourceBundle.getText("undoValidation"));
				// MessageToast.show("No deleted row to undo");
			}
		},

		undoDelete: function (oEvent) {

			var exchangeAmountTotal = 0;
			var count = 0;
			// this.selectedItemsforDelete = this.getView().byId("ExchangeTableId").getSelectedContextPaths();
			if (this.deletedItem !== undefined && this.deletedItem.length > 0) {
				var tableData = this.getView().getModel("exchangeModel").getData().results;
				// for (var j = 0; j < this.selectedItemsforDelete.length; j++) {
				// 	var index = parseInt(this.selectedItemsforDelete[j].split("/")[2]);
				// 	tableData[index].deleted = "false";
				// }
				for (var j = 0; j < this.selectedItemsforDelete.length; j++) {
					var index = parseInt(this.selectedItemsforDelete[j].split("/")[2]);
					tableData.splice(index, 0, this.deletedItem[j]);
					tableData[index].deleted = "false";
					for (var k = 0; k < tableData.length; k++) {
						if (tableData[index].itemNumber === tableData[k].higherItem) {
							tableData[k].deleted = "false";
						}
					}
				}
				var data = [];
				for (var i = 0; i < tableData.length; i++) {
					if (tableData[i].deleted === "false") {
						if ((tableData[i].higherItem !== "000000" && tableData[i].higherItem !== "" && tableData[i].manualFoc !== "X")) {} else {
							data.push(tableData[i]);
						}
						exchangeAmountTotal = exchangeAmountTotal + parseFloat(tableData[i].netAmount);
						++count;
					}
				}
				var oFilter = new sap.ui.model.Filter("deleted", sap.ui.model.FilterOperator.Contains, "false");
				var oBinding = [];
				oBinding = this.getView().byId("ExchangeTableId").getBinding("items");
				oBinding.filter([oFilter]);
				this.getView().getModel("exchangeModel").setProperty("/exchangeAmountTotal", exchangeAmountTotal.toFixed(2) + "(THB)");
				this.getView().getModel("exchangeModel").setProperty("/exchangeLength", "Exchange (" + count + ")");
				this.getView().getModel("exchangeModel").refresh(true);
				this._pricingSimulation(data, "ExchangeTab");
				this.deletedItem = [];
			} else {
				MessageToast.show(this.resourceBundle.getText("undoValidation"));
				// MessageToast.show("No deleted row to undo");
			}
		},

		onpressPreview: function () {
			if (this._oPopover) {
				this._oPopover = undefined;
			}
			var returns = [];
			var exchange = [];
			var exchangeAmount = 0;
			var returnAmount = 0;

			var returnItems = this.getView().getModel("returnModel").getProperty("/results");

			var exchangeItems = this.getView().getModel("exchangeModel").getProperty("/results");
			if (exchangeItems !== undefined && exchangeItems.length > 0) {
				for (var i = 0; i < exchangeItems.length; i++) {
					if (exchangeItems[i].deleted === "false") {
						exchange.push(JSON.parse(JSON.stringify(exchangeItems[i])));
						if (exchangeItems[i].netAmount === "" || exchangeItems[i].netAmount === undefined) {
							exchangeItems[i].netAmount = 0.00;
						}
						exchangeAmount = exchangeAmount + parseFloat(exchangeItems[i].netAmount);
					}
				}
				this.getView().getModel("exchangePreviewModel").setProperty("/exchangeAmount", exchangeAmount + "(THB)");
				this.getView().getModel("exchangePreviewModel").setProperty("/results", exchange); // exchange
				this.getView().getModel("exchangePreviewModel").setProperty("/exchangePreviewLength", "Exchange (" + exchange.length + ")");
			}
			if (returnItems !== undefined && returnItems.length > 0) {
				this._wizard.setCurrentStep(this.byId("ID_WIZARD_PREVIEW"));
				for (var j = 0; j < returnItems.length; j++) {
					if (returnItems[j].deleted === "false") {
						returns.push(JSON.parse(JSON.stringify(returnItems[j])));
						if (returnItems[j].netAmount === "" || returnItems[j].netAmount === undefined) {
							returnItems[j].netAmount = 0.00;
						}
						returnAmount = returnAmount + parseFloat(returnItems[j].netAmount);
					}

				}
				this.getView().getModel("returnPreviewModel").setProperty("/returnAmount", returnAmount + "(THB)");
				this.getView().getModel("returnPreviewModel").setProperty("/results", returns); // exchange
				this.getView().getModel("returnPreviewModel").setProperty("/returnPreviewLength", "Return (" + returns.length + ")");
			} else {
				MessageBox.information(this.resourceBundle.getText("Selectatleastoneitem"));
				// MessageBox.information("Select at least one item");
			}
			// this._wizard.goToStep(this.byId("ID_WIZARD_PREVIEW"));
		},

		onPressSave: function (oEvent) {
			var baseModel = this.getView().getModel("baseModel").getData();

			var invoiceSearchModel = this.getView().getModel("invoiceSearchModel").getData();
			var returnModel = this.getView().getModel("returnModel");
			var exchangeModel = this.getView().getModel("exchangeModel");
			var baseModel = this.getView().getModel("baseModel");
			baseModel.setProperty("/savePressed", true);
			if (this.RetQtyCount > 0) {
				MessageBox.information(this.resourceBundle.getText("EnteredReturnedQtycannotbegreaterthanAvailableReturnQty"));
				return;
			}
			if (this.getView().getModel("baseModel").getProperty("/reasonOwner") === "" || this.getView().getModel("baseModel").getProperty(
					"/reasonOwner") === undefined) {
				MessageToast.show(this.resourceBundle.getText("ReasonOwnerisMandatory"));
				// MessageToast.show("Reason Owner is Mandatory");
				return;
			}
			if (this.getView().getModel("baseModel").getProperty("/referenceNo") === "" || this.getView().getModel("baseModel").getProperty(
					"/referenceNo") === undefined) {
				MessageToast.show(this.resourceBundle.getText("referenceNoisMandatory"));
				// MessageToast.show("reference No is Mandatory");
				return;
			}
			// check for time and 
			if (baseModel.getProperty("/oneTimeCustomer") === "X" && baseModel.getProperty("/returnSoldTo") !== baseModel.getProperty(
					"/exSoldTo") && baseModel.getProperty("/EXOneTimeCustomer") === "X") {
				if (!this.address) {
					this.address = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.Address", this);
					this.getView().addDependent(this.address);
				}
				this._loadCity();
				if (this.getView().getModel("editDraftModel")) {
					if (this.changeSoldToParty === true) {
						baseModel.setProperty("/partnerName", "");
						baseModel.setProperty("/AddressStreet2", "");
						baseModel.setProperty("/AddressStreet3", "");
						baseModel.setProperty("/AddressStreet5", "");
						baseModel.setProperty("/District", "");
						baseModel.setProperty("/DifferentCity", "");
						baseModel.setProperty("/postalCode", "");
						baseModel.setProperty("/city", "");
						baseModel.setProperty("/telephone", "");
						baseModel.setProperty("/mobileNumber", "");
						baseModel.setProperty("/taxId", "");
						baseModel.setProperty("/bCode", "00000");
						baseModel.setProperty("/bpNummr", "N");
						baseModel.setProperty("/partnerName4", "");
						baseModel.setProperty("/maxLengthName4", "40 char remaining");
						baseModel.setProperty("/maxLengthAddressStreet2", "40 char remaining");
						baseModel.setProperty("/maxLengthAddressStreet3", "40 char remaining");
						baseModel.setProperty("/maxLengthAddressStreet5", "40 char remaining");
						baseModel.setProperty("/maxLengthDistrict", "40 char remaining");
						baseModel.setProperty("/maxLengthDifferentCity", "40 char remaining");
						baseModel.setProperty("/maxLengthPostalCode", "5 char remaining");
						baseModel.setProperty("/maxLengthtelephone", "30 char remaining");
						baseModel.setProperty("/maxLengthmobileNumber", "30 char remaining");
						baseModel.setProperty("/maxLengthtaxId", "13 char remaining");
						baseModel.setProperty("/maxLengthbCode", "0 char remaining");
						baseModel.setProperty("/maxLengthbpNummr", "0 char remaining");
						this.address.open();
						return;
					} else {
						baseModel.setProperty("/maxLengthName4", (40 - baseModel.getProperty("/partnerName4").length) + " char remaining");
						baseModel.setProperty("/maxLengthAddressStreet2", (40 - baseModel.getProperty("/AddressStreet2").length) + " char remaining");
						baseModel.setProperty("/maxLengthAddressStreet3", (40 - baseModel.getProperty("/AddressStreet3").length) + " char remaining");
						baseModel.setProperty("/maxLengthAddressStreet5", (40 - baseModel.getProperty("/AddressStreet5").length) + " char remaining");
						baseModel.setProperty("/maxLengthDistrict", (40 - baseModel.getProperty("/District").length) + " char remaining");
						baseModel.setProperty("/maxLengthDifferentCity", (40 - baseModel.getProperty("/DifferentCity").length) + " char remaining");
						baseModel.setProperty("/maxLengthPostalCode", (5 - baseModel.getProperty("/postalCode").length) + " char remaining");
						baseModel.setProperty("/maxLengthtelephone", (30 - baseModel.getProperty("/telephone").length) + " char remaining");
						baseModel.setProperty("/maxLengthmobileNumber", (30 - baseModel.getProperty("/mobileNumber").length) + " char remaining");
						baseModel.setProperty("/maxLengthtaxId", (13 - baseModel.getProperty("/taxId").length) + " char remaining");
						baseModel.setProperty("/maxLengthbCode", (5 - baseModel.getProperty("/bCode").length) + " char remaining");
						baseModel.setProperty("/maxLengthbpNummr", (1 - baseModel.getProperty("/bpNummr").length) + " char remaining");
						this.address.open();
						return;
					}
				} else {
					baseModel.setProperty("/partnerName", "");
					baseModel.setProperty("/AddressStreet2", "");
					baseModel.setProperty("/AddressStreet3", "");
					baseModel.setProperty("/AddressStreet5", "");
					baseModel.setProperty("/District", "");
					baseModel.setProperty("/DifferentCity", "");
					baseModel.setProperty("/postalCode", "");
					baseModel.setProperty("/city", "");
					baseModel.setProperty("/telephone", "");
					baseModel.setProperty("/mobileNumber", "");
					baseModel.setProperty("/taxId", "");
					baseModel.setProperty("/bCode", "00000");
					baseModel.setProperty("/bpNummr", "N");
					baseModel.setProperty("/partnerName4", "");
					baseModel.setProperty("/maxLengthName4", "40 char remaining");
					baseModel.setProperty("/maxLengthAddressStreet2", "40 char remaining");
					baseModel.setProperty("/maxLengthAddressStreet3", "40 char remaining");
					baseModel.setProperty("/maxLengthAddressStreet5", "40 char remaining");
					baseModel.setProperty("/maxLengthDistrict", "40 char remaining");
					baseModel.setProperty("/maxLengthDifferentCity", "40 char remaining");
					baseModel.setProperty("/maxLengthPostalCode", "5 char remaining");
					baseModel.setProperty("/maxLengthtelephone", "30 char remaining");
					baseModel.setProperty("/maxLengthmobileNumber", "30 char remaining");
					baseModel.setProperty("/maxLengthtaxId", "13 char remaining");
					baseModel.setProperty("/maxLengthbCode", "0 char remaining");
					baseModel.setProperty("/maxLengthbpNummr", "0 char remaining");
					this.address.open();
					return;
				}
			} else if ((baseModel.getProperty("/oneTimeCustomer") === "X") && exchangeModel.getData()
				.results !== undefined && exchangeModel.getData().results
				.length > 0 && baseModel.getProperty("/returnSoldTo") === baseModel.getProperty("/exSoldTo")) {
				if (!this.address) {
					this.address = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.Address", this);
					this.getView().addDependent(this.address);
				}
				this._loadCity();
				if (this.docVersion === undefined) {
					var invoiceItems = this.selectedReturnItems[0];
					baseModel.setProperty("/partnerName", invoiceItems.soldToAddress.partnerName);
					baseModel.setProperty("/partnerName4", invoiceItems.soldToAddress.partnerName4);
					baseModel.setProperty("/AddressStreet2", invoiceItems.soldToAddress.AddressStreet2);
					baseModel.setProperty("/AddressStreet3", invoiceItems.soldToAddress.AddressStreet3);
					baseModel.setProperty("/AddressStreet5", invoiceItems.soldToAddress.AddressStreet5);
					baseModel.setProperty("/District", invoiceItems.soldToAddress.District);
					baseModel.setProperty("/DifferentCity", invoiceItems.soldToAddress.DifferentCity);
					baseModel.setProperty("/postalCode", invoiceItems.soldToAddress.postalCode);
					baseModel.setProperty("/city", invoiceItems.soldToAddress.City);
					baseModel.setProperty("/telephone", invoiceItems.soldToAddress.telephone);
					baseModel.setProperty("/mobileNumber", invoiceItems.soldToAddress.mobileNumber);
					baseModel.setProperty("/taxId", invoiceItems.soldToAddress.taxId);
					baseModel.setProperty("/bCode", invoiceItems.soldToAddress.bCode);
					if (invoiceItems.soldToAddress.bpNummr === "N" || invoiceItems.soldToAddress.bpNummr === "H") {
						baseModel.setProperty("/bCode", "00000");
					}
					baseModel.setProperty("/bpNummr", invoiceItems.soldToAddress.bpNummr);
					baseModel.setProperty("/maxLengthName4", (40 - invoiceItems.soldToAddress.partnerName4.length) + " char remaining");
					baseModel.setProperty("/maxLengthAddressStreet2", (40 - invoiceItems.soldToAddress.AddressStreet2.length) + " char remaining");
					baseModel.setProperty("/maxLengthAddressStreet3", (40 - invoiceItems.soldToAddress.AddressStreet3.length) + " char remaining");
					baseModel.setProperty("/maxLengthAddressStreet5", (40 - invoiceItems.soldToAddress.AddressStreet5.length) + " char remaining");
					baseModel.setProperty("/maxLengthDistrict", (40 - invoiceItems.soldToAddress.District.length) + " char remaining");
					baseModel.setProperty("/maxLengthDifferentCity", (40 - invoiceItems.soldToAddress.DifferentCity.length) + " char remaining");
					baseModel.setProperty("/maxLengthPostalCode", (5 - invoiceItems.soldToAddress.postalCode.length) + " char remaining");
					baseModel.setProperty("/maxLengthtelephone", (30 - invoiceItems.soldToAddress.telephone.length) + " char remaining");
					baseModel.setProperty("/maxLengthmobileNumber", (30 - invoiceItems.soldToAddress.mobileNumber.length) + " char remaining");
					baseModel.setProperty("/maxLengthtaxId", (13 - invoiceItems.soldToAddress.taxId.length) + " char remaining");
					baseModel.setProperty("/maxLengthbCode", (5 - invoiceItems.soldToAddress.bCode.length) + " char remaining");
					baseModel.setProperty("/maxLengthbpNummr", (1 - invoiceItems.soldToAddress.bpNummr.length) + " char remaining");
					this.address.setModel(baseModel, "/baseModel");
					this.address.open();
				} else {
					// baseModel.setProperty("/partnerName", invoiceItems.soldToAddress.partnerName);
					// baseModel.setProperty("/partnerName4", baseModel.getProperty("/partnerName4"));
					// baseModel.setProperty("/AddressStreet2", baseModel.getProperty("/partnerName4"));
					// baseModel.setProperty("/AddressStreet3", baseModel.getProperty("/partnerName4"));
					// baseModel.setProperty("/AddressStreet5", baseModel.getProperty("/partnerName4"));
					// baseModel.setProperty("/District", baseModel.getProperty("/partnerName4"));
					// baseModel.setProperty("/DifferentCity", baseModel.getProperty("/partnerName4"));
					// baseModel.setProperty("/postalCode", baseModel.getProperty("/partnerName4"));
					// baseModel.setProperty("/city", baseModel.getProperty("/partnerName4"));
					// baseModel.setProperty("/telephone", baseModel.getProperty("/partnerName4"));
					// baseModel.setProperty("/mobileNumber", baseModel.getProperty("/partnerName4"));
					// baseModel.setProperty("/taxId", baseModel.getProperty("/partnerName4"));
					// baseModel.setProperty("/bCode", baseModel.getProperty("/partnerName4"));
					// baseModel.setProperty("/bpNummr", baseModel.getProperty("/partnerName4"));
					baseModel.setProperty("/maxLengthName4", (40 - baseModel.getProperty("/partnerName4").length) + " char remaining");
					baseModel.setProperty("/maxLengthAddressStreet2", (40 - baseModel.getProperty("/AddressStreet2").length) + " char remaining");
					baseModel.setProperty("/maxLengthAddressStreet3", (40 - baseModel.getProperty("/AddressStreet3").length) + " char remaining");
					baseModel.setProperty("/maxLengthAddressStreet5", (40 - baseModel.getProperty("/AddressStreet5").length) + " char remaining");
					baseModel.setProperty("/maxLengthDistrict", (40 - baseModel.getProperty("/District").length) + " char remaining");
					baseModel.setProperty("/maxLengthDifferentCity", (40 - baseModel.getProperty("/DifferentCity").length) + " char remaining");
					baseModel.setProperty("/maxLengthPostalCode", (5 - baseModel.getProperty("/postalCode").length) + " char remaining");
					baseModel.setProperty("/maxLengthtelephone", (30 - baseModel.getProperty("/telephone").length) + " char remaining");
					baseModel.setProperty("/maxLengthmobileNumber", (30 - baseModel.getProperty("/mobileNumber").length) + " char remaining");
					baseModel.setProperty("/maxLengthtaxId", (13 - baseModel.getProperty("/taxId").length) + " char remaining");
					baseModel.setProperty("/maxLengthbCode", (5 - baseModel.getProperty("/bCode").length) + " char remaining");
					baseModel.setProperty("/maxLengthbpNummr", (1 - baseModel.getProperty("/bpNummr").length) + " char remaining");
					this.address.open();
				}
				return;
			} else if ((baseModel.getProperty("/EXOneTimeCustomer") === "X") && (baseModel.getProperty("/oneTimeCustomer") === "")) {
				if (!this.address) {
					this.address = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.Address", this);
					this.getView().addDependent(this.address);
				}
				this._loadCity();
				baseModel.setProperty("/partnerName", "");
				baseModel.setProperty("/AddressStreet2", "");
				baseModel.setProperty("/AddressStreet3", "");
				baseModel.setProperty("/AddressStreet5", "");
				baseModel.setProperty("/District", "");
				baseModel.setProperty("/DifferentCity", "");
				baseModel.setProperty("/postalCode", "");
				baseModel.setProperty("/city", "");
				baseModel.setProperty("/telephone", "");
				baseModel.setProperty("/mobileNumber", "");
				baseModel.setProperty("/taxId", "");
				baseModel.setProperty("/bCode", "00000");
				baseModel.setProperty("/bpNummr", "N");
				baseModel.setProperty("/partnerName4", "");
				baseModel.setProperty("/maxLengthName4", "40 char remaining");
				baseModel.setProperty("/maxLengthAddressStreet2", "40 char remaining");
				baseModel.setProperty("/maxLengthAddressStreet3", "40 char remaining");
				baseModel.setProperty("/maxLengthAddressStreet5", "40 char remaining");
				baseModel.setProperty("/maxLengthDistrict", "40 char remaining");
				baseModel.setProperty("/maxLengthDifferentCity", "40 char remaining");
				baseModel.setProperty("/maxLengthPostalCode", "5 char remaining");
				baseModel.setProperty("/maxLengthtelephone", "30 char remaining");
				baseModel.setProperty("/maxLengthmobileNumber", "30 char remaining");
				baseModel.setProperty("/maxLengthtaxId", "13 char remaining");
				baseModel.setProperty("/maxLengthbCode", "5 char remaining");
				baseModel.setProperty("/maxLengthbpNummr", "1 char remaining");
				this.address.open();
				return;
			} else if (baseModel.getProperty("/EXOneTimeCustomer") === "" && baseModel.getProperty("/returnSoldTo") !== baseModel.getProperty(
					"/exSoldTo")) {
				this._continueSave();
				return;
			}
			this._continueSave();

		},

		onOKAddrerss: function (oEvent) {
			var baseModel = this.getView().getModel("baseModel");
			if (this.docVersion === undefined || this.docVersion === "DRAFT" ||
				this.docVersion === "ERROR") {
				if ((baseModel.getProperty("/partnerName4") === undefined || baseModel.getProperty("/partnerName4") === "") || (baseModel.getProperty(
						"/AddressStreet2") === undefined || baseModel.getProperty(
						"/AddressStreet2") === "") || (baseModel.getProperty(
						"/taxId") === undefined || (baseModel.getProperty(
						"/taxId") === "")) ||
					(baseModel.getProperty(
						"/AddressStreet5") === undefined || baseModel.getProperty(
						"/AddressStreet5") === "") ||
					(baseModel.getProperty("/District") === undefined || baseModel.getProperty("/District") === "") || (baseModel.getProperty(
						"/DifferentCity") === undefined || baseModel.getProperty(
						"/DifferentCity") === "") ||
					(baseModel.getProperty("/postalCode") === undefined || baseModel.getProperty("/postalCode") === "") || (baseModel.getProperty(
						"/city") === undefined || baseModel.getProperty(
						"/city") === "")) {
					MessageBox.information("Enter all the mandatory fields");
				} else {
					if (baseModel.getProperty("/savePressed") === true) {
						this._continueSave();
					} else {
						this._continueSubmit();
					}
				}
			} else {
				this.address.close();
			}
		},

		onCancelAddress: function (oEvent) {
			var baseModel = this.getView().getModel("baseModel");
			if (this.docVersion === undefined) {
				baseModel.setProperty("/partnerNum", "");
				baseModel.setProperty("/partnerName4", "");
				baseModel.setProperty("/AddressStreet2", "");
				baseModel.setProperty("/AddressStreet3", "");
				baseModel.setProperty("/AddressStreet5", "");
				baseModel.setProperty("/District", "");
				baseModel.setProperty("/DifferentCity", "");
				baseModel.setProperty("/postalCode", "");
				baseModel.setProperty("/city", "");
				baseModel.setProperty("/telephone", "");
				baseModel.setProperty("/mobileNumber", "");
				baseModel.setProperty("/taxId", "");
				baseModel.setProperty("/bCode", "00000");
				baseModel.setProperty("/bpNummr", "N");
				baseModel.setProperty("/maxLengthName4", "40 char remaining");
				baseModel.setProperty("/maxLengthAddressStreet2", "40 char remaining");
				baseModel.setProperty("/maxLengthAddressStreet3", "40 char remaining");
				baseModel.setProperty("/maxLengthAddressStreet5", "40 char remaining");
				baseModel.setProperty("/maxLengthDistrict", "40 char remaining");
				baseModel.setProperty("/maxLengthDifferentCity", "40 char remaining");
				baseModel.setProperty("/maxLengthPostalCode", "5 char remaining");
				baseModel.setProperty("/maxLengthtelephone", "30 char remaining");
				baseModel.setProperty("/maxLengthmobileNumber", "30 char remaining");
				baseModel.setProperty("/maxLengthtaxId", "13 char remaining");
				baseModel.setProperty("/maxLengthbCode", "5 char remainiing");
				baseModel.setProperty("/maxLengthbpNummr", "1 char remaining");
			}
			this.address.close();
		},

		_continueSave: function (oEvent) {
			var that = this;
			var baseModel = this.getView().getModel("baseModel").getData();
			var invoiceSearchModel = this.getView().getModel("invoiceSearchModel").getData();
			var returnModel = this.getView().getModel("returnModel");
			var exchangeModel = this.getView().getModel("exchangeModel");
			var baseModel = this.getView().getModel("baseModel");
			var returnItems = [];
			var exchangeItems = [];
			if (baseModel.getData().returnReqNum) {
				var returnReqNum = baseModel.getData().returnReqNum;
			} else {
				var returnReqNum = "";
			}
			if (baseModel.getData().exchangeReqNum) {
				var exchangeReqNum = baseModel.getData().exchangeReqNum;
			} else {
				var exchangeReqNum = "";
			}
			if (returnModel.getData().results !== undefined || returnModel.getData().results.length > 0) {
				var returnsData = returnModel.getData().results;
				for (var i = 0; i < returnsData.length; i++) {

					if (returnsData[i].deleted === undefined || returnsData[i].deleted === "false") {
						var Items = {
							"refDocNum": returnsData[i].refInvoice,
							"refDocItem": returnsData[i].refItemNumber,
							"returnReqItemid": returnsData[i].itemNumber,
							"materialGroup": returnsData[i].materialGroup,
							"materialGroup4": returnsData[i].materialGroup4,
							"material": returnsData[i].matNumber,
							"shortText": returnsData[i].itemShortText,
							"avlReturnQty": returnsData[i].avlRetQty,
							"avlUom": returnsData[i].salesUnit,
							"returnQty": returnsData[i].quantity,
							"returnUom": returnsData[i].salesUnit,
							"unitPriceCc": returnsData[i].unitPrice,
							"unitPriceInv": returnsData[i].unitPriceInv,
							"invoiceTotalAmount": returnModel.getData().returnAmountTotal.split("(")[0],
							"storageLocation": returnsData[i].storageLocation,

							"higherLevel": returnsData[i].higherItem,
							"batch": returnsData[i].batchNumber,
							"referenceInvDate": formatter.dateTimeFormatPS(returnsData[i].billingDate).split("T")[0],
							"expiryDate": formatter.dateTimeFormatPS(returnsData[i].expiryDate).split("T")[0],
							"pricingDate": formatter.dateTimeFormatPS(returnsData[i].pricingDate),
							"serviceRenderedDate": formatter.dateTimeFormatPS(returnsData[i].serviceRenderedDate),
							"serialNum": returnsData[i].serialNumber,
							"returnReqNum": returnReqNum,
							"billingType": invoiceSearchModel.billingType,
							"sapReturnOrderNum": "",
							"sapReturnOrderItemNum": "",
							"overallItemWorkflowStatus": "",
							"plant": returnsData[i].plant,
							"paymentTerms": returnsData[i].paymentTerms,
							"conditionGroup4": returnsData[i].conditionGroup4
						};
						returnItems.push(Items);
					}

				}
				if (returnItems.length === 0) {
					MessageBox.information(this.resourceBundle.getText("ReturnItemscannotbeempty"));
					// MessageBox.information("Return Items cannot be empty");
					return;
				}
			}

			if (baseModel.getData().userEmailId) {
				var email = baseModel.getData().userEmailId;
				var emailTrigger = true;
			} else {
				var email = "";
				var emailTrigger = false;
			}
			if (this.docVersion === "DRAFT") {
				var docVersion = "DRAFT";
			} else if (this.docVersion === "ERROR") {
				var docVersion = "ERROR";
			} else {
				var docVersion = "DRAFT";
			}
			if (baseModel.getData().requestor === baseModel.getData().userName + " (" + baseModel.getData().phone + ")") {
				var requestor = "";
			} else {
				var requestor = baseModel.getData().requestor;
			}
			var payload = {
				"returns": {
					"createdAt": new Date(),
					"customerPo": baseModel.getData().customerPONumber,
					"mappingId": baseModel.getData().salesOrgForRO,
					"updatedBy": requestor,
					"requestorName": baseModel.getData().userId + "(" + baseModel.getData().userName + ")",
					"requestedBy": baseModel.getData().userId,
					"roType": baseModel.getData().selectedROTypeCode,
					"roTypeText": baseModel.getData().selectedROType,
					"salesOrg": baseModel.getData().selectedSalesOrg,
					"salesOrgDesc": invoiceSearchModel.salesOrgDesc,
					"distributionChannel": baseModel.getData().selectedDistChnl,
					"distributionChannelDesc": invoiceSearchModel.distChnlDesc,
					"division": invoiceSearchModel.Division,
					"divisionDesc": baseModel.getData().selectedDivisionDesc,
					"soldToParty": baseModel.getData().returnSoldTo,
					"soldToPartyDesc": baseModel.getData().returnSoldToDesc,
					"shipToParty": baseModel.getData().returnShipTo,
					"shipToPartyDesc": baseModel.getData().shipToDesc,
					"billToParty": baseModel.getData().returnBillTo,
					"billToDesc": baseModel.getData().returnBillToDesc,
					"payer": baseModel.getData().returnPayer,
					"payerDesc": baseModel.getData().returnPayerDesc,
					// "requestedBy": baseModel.getData().userId,
					"requestorEmail": baseModel.getData().email,
					"contactPerson": baseModel.getData().userEmailId,
					"contactDivsion": baseModel.getData().contactDivision,
					"contactTelephone": baseModel.getData().phoneNum,
					"referenceNum": baseModel.getData().referenceNo,
					"requestRemark": baseModel.getData().returnRemark,
					"oneTimeCustomer": baseModel.getData().oneTimeCustomer,
					"orderReason": baseModel.getData().selectedReturnReason.split(" ")[0],
					"orderReasonText": baseModel.getData().selectedReturnReason.split("(")[1].split(")")[0],
					"reasonOwner": baseModel.getData().reasonOwner.split(" ")[0],
					"reasonOwnerDesc": baseModel.getData().reasonOwner.split(" ")[1].split("(")[1].split(")")[0],
					"orderType": baseModel.getData().returnOrderType,
					"orderTypeText": baseModel.getData().returnOrderType,
					"returnTotalAmt": returnModel.getData().returnAmountTotal.split("(")[0],
					"totalRoAmount": this.getView().getModel("returnModel").getData().returnAmountTotal.split("(")[0],
					"returnReqNum": returnReqNum,
					"workflowInstance": "",
					"overallWorkflowStatus": "",
					"processingStatus": "",
					"logisticalStatus": "",
					"docVersion": docVersion,
					"flagRoSo": "R",
					"emailTrigger": emailTrigger,
					"exchangeOrderType": baseModel.getData().exchangeOrderType,
					// "distributionChannel": invoiceSearchModel.getData().distChnl,
					// "address": [],
					// "items": retItemsArray,
					// "attachment": [],
					// "orderCondition": retConditionsArray
					// "address": addressModel,
					"items": returnItems,

				}
			};
			if (baseModel.getProperty("/oneTimeCustomer") === "X") {
				if (this.docVersion === undefined) {
					var invoiceItems = this.selectedReturnItems;
					var soldToAddress = invoiceItems[0].soldToAddress;
					var shipToAddress = invoiceItems[0].shipToAddress;
					var billToAddress = invoiceItems[0].billToAdress;
					var payerAddress = invoiceItems[0].payerAddress;
					var address = [{
						id: "",
						returnReqNum: "",
						zipCode: soldToAddress.postalCode,
						refDocNum: invoiceItems[0].InvoiceNum,
						email: "",
						salesDocument: "",
						partnerRole: "AG",
						name1: soldToAddress.partnerName,
						name2: "",
						name3: "",
						name4: soldToAddress.partnerName4,
						street2: soldToAddress.AddressStreet2,
						street3: soldToAddress.AddressStreet3,
						street5: soldToAddress.AddressStreet5,
						district: soldToAddress.District,
						differentCity: soldToAddress.DifferentCity,
						postalCode: soldToAddress.postalCode,
						city: soldToAddress.City,
						region: "",
						country: "",
						telephone: soldToAddress.telephone,
						mobilePhone: soldToAddress.mobileNumber,
						taxId: soldToAddress.taxId,
						b_Codes: soldToAddress.bCode,
						bpNummr: soldToAddress.bpNummr,
					}, {
						id: "",
						returnReqNum: "",
						zipCode: shipToAddress.postalCode,
						refDocNum: invoiceItems[0].InvoiceNum,
						email: "",
						salesDocument: "",
						partnerRole: "WE",
						name1: shipToAddress.partnerName,
						name2: "",
						name3: "",
						name4: shipToAddress.partnerName4,
						street2: shipToAddress.AddressStreet2,
						street3: shipToAddress.AddressStreet3,
						street5: shipToAddress.AddressStreet5,
						district: shipToAddress.District,
						differentCity: shipToAddress.DifferentCity,
						postalCode: shipToAddress.postalCode,
						city: shipToAddress.City,
						region: "",
						country: "",
						telephone: shipToAddress.telephone,
						mobilePhone: shipToAddress.mobileNumber,
						taxId: shipToAddress.taxId,
						b_Codes: shipToAddress.bCode,
						bpNummr: shipToAddress.bpNummr,
					}, {
						id: "",
						returnReqNum: "",
						zipCode: billToAddress.postalCode,
						refDocNum: invoiceItems[0].InvoiceNum,
						email: "",
						salesDocument: "",
						partnerRole: "RE",
						name1: billToAddress.partnerName,
						name2: "",
						name3: "",
						name4: billToAddress.partnerName4,
						street2: billToAddress.AddressStreet2,
						street3: billToAddress.AddressStreet3,
						street5: billToAddress.AddressStreet5,
						district: billToAddress.District,
						differentCity: billToAddress.DifferentCity,
						postalCode: billToAddress.postalCode,
						city: billToAddress.City,
						region: "",
						country: "",
						telephone: billToAddress.telephone,
						mobilePhone: billToAddress.mobileNumber,
						taxId: billToAddress.taxId,
						b_Codes: billToAddress.bCode,
						bpNummr: billToAddress.bpNummr
					}, {
						id: "",
						returnReqNum: "",
						zipCode: payerAddress.postalCode,
						refDocNum: invoiceItems[0].InvoiceNum,
						email: "",
						salesDocument: "",
						partnerRole: "RG",
						name1: payerAddress.partnerName,
						name2: "",
						name3: "",
						name4: payerAddress.partnerName4,
						street2: payerAddress.AddressStreet2,
						street3: payerAddress.AddressStreet3,
						street5: payerAddress.AddressStreet5,
						district: payerAddress.District,
						differentCity: payerAddress.DifferentCity,
						postalCode: payerAddress.postalCode,
						city: payerAddress.City,
						region: "",
						country: "",
						telephone: payerAddress.telephone,
						mobilePhone: payerAddress.mobileNumber,
						taxId: payerAddress.taxId,
						b_Codes: payerAddress.bCode,
						bpNummr: payerAddress.bpNummr
					}];
					payload.returns.address = address;
				} else {
					payload.returns.address = baseModel.getProperty("/setRetAddress");
				}
			}
			if (exchangeModel.getData().results !== undefined && exchangeModel.getData().results.length > 0) {
				var exchangeData = exchangeModel.getData().results;
				if (exchangeData !== undefined || exchangeData.length === 0) {
					for (var k = 0; k < exchangeData.length; k++) {
						if (exchangeData[k].deleted === "false") {
							var items = {
								"refDocNum": exchangeData[k].refInvoice,
								"refDocItem": exchangeData[k].refItemNumber,
								"exchangeReqItemid": exchangeData[k].itemNumber,
								"materialGroup": exchangeData[k].materialGroup,
								"materialGroup4": exchangeData[k].materialGroup4,
								"material": exchangeData[k].matNumber,
								"sapMaterialNum": exchangeData[k].matNumber,
								"shortText": exchangeData[k].itemShortText,
								"avlReturnQty": exchangeData[k].quantity,
								"avlUom": exchangeData[k].salesUnit,
								"returnQty": exchangeData[k].quantity,
								"returnUom": exchangeData[k].salesUnit,
								"unitPriceCc": exchangeData[k].unitPrice,
								"unitPriceInv": exchangeData[k].unitPriceInv,
								"manualFoc": exchangeData[k].manualFoc,
								"invoiceTotalAmount": exchangeModel.getData().exchangeAmountTotal.split("(")[0],
								"totalNetAmount": this.getView().getModel("exchangeModel").getData().exchangeAmountTotal.split("(")[0],
								"storageLocation": exchangeData[k].storageLocation,
								"sloc": exchangeData[k].storageLocation,
								"higherLevel": exchangeData[k].higherItem,
								"batch": exchangeData[k].batchNumber,
								"referenceInvDate": formatter.dateTimeFormatPS(exchangeData[k].billingDate).split("T")[0],
								"expiryDate": formatter.dateTimeFormatPS(exchangeData[k].expiryDate).split("T")[0],
								"serialNum": exchangeData[k].serialNumber,
								"returnReqNum": returnReqNum,
								"exchangeReqNum": exchangeReqNum,
								"billingType": invoiceSearchModel.billingType,
								"sapReturnOrderNum": "",
								"sapReturnOrderItemNum": "",
								"overallItemWorkflowStatus": "",
								"plant": exchangeData[k].plant,
								"paymentTerms": exchangeData[k].paymentTerms,
								"conditionGroup4": exchangeData[k].conditionGroup4,
								// "pricingDate": formatter.dateTimeFormatPS(exchangeItems[k].pricingDate).split("T")[0],
								// "serviceRenderedDate": formatter.dateTimeFormatPS(exchangeItems[k].serviceRenderedDate).split("T")[0]
							};
							exchangeItems.push(items);
						}
					}
					if (exchangeItems.length > 0) {
						var exchange = {
							"customerPo": baseModel.getData().customerPONumberEx,
							"roType": baseModel.getData().selectedROTypeCode,
							"payer": baseModel.getData().payer,
							"referenceNum": baseModel.getData().referenceNo,
							"reasonOwner": baseModel.getData().reasonOwner.split(" ")[0],
							"requestRemark": baseModel.getData().exchangeRemark,
							"billToParty": baseModel.getData().billTo,
							"orderCategory": baseModel.getData().exchangeOrderType,
							"orderType": baseModel.getData().exchangeOrderType,
							"orderTypeText": baseModel.getData().exchangeOrderType,
							"salesOrg": baseModel.getData().selectedSalesOrg,
							"distributionChannel": baseModel.getData().selectedDistChnl,
							"division": invoiceSearchModel.Division,
							"soldToParty": baseModel.getData().exSoldTo,
							"soldToPartyDesc": baseModel.getData().exSoldToDesc,
							"shipToParty": baseModel.getData().exShipTo,
							"shipToPartyDesc": baseModel.getData().exShipToDesc,
							"billToParty": baseModel.getData().exBillTo,
							"billToDesc": baseModel.getData().exBillToDesc,
							"billToPartyDesc": baseModel.getData().exBillToDesc,
							"payer": baseModel.getData().exPayer,
							"payerDesc": baseModel.getData().exPayerDesc,
							"payerDescription": baseModel.getData().exPayerDesc,
							"remarks": baseModel.getData().exchangeRemark,
							"totalNetAmount": exchangeModel.getData().exchangeAmountTotal.split("(")[0],
							"delComplete": baseModel.getData().completedDeliveryFLAG,
							"docCurrency": "",
							"exoneTimeCustomer": baseModel.getData().EXOneTimeCustomer,
							"deliveryBlock": "",
							"billingBlock": "",
							"overallStatus": "",
							"rejectionStatus": "",
							"deliveryStatus": "",
							"creditStatus": "",
							"overallWorkflowStatus": "",
							"flagRoSo": "E",
							"items": exchangeItems,
							"returnReqNum": returnReqNum,
							"exchangeReqNum": exchangeReqNum
						};

						payload.exchange = exchange;
					}
					// payload.returns.attachment.push(attachmentObject);
				}
				if (baseModel.getProperty("/EXOneTimeCustomer") === "X" || baseModel.getProperty("/oneTimeCustomer") === "X") {
					if (this.docVersion === undefined) {
						var invoiceItems = this.selectedReturnItems;
						var address = [{
							id: "",
							returnReqNum: "",
							zipCode: "",
							refInvoiceNum: invoiceItems[0].InvoiceNum,
							email: "",
							salesDocument: "",
							partnerRole: "AG",
							name1: baseModel.getProperty("/partnerName"),
							name2: "",
							name3: "",
							name4: baseModel.getProperty("/partnerName4"),
							street2: baseModel.getProperty("/AddressStreet2"),
							street3: baseModel.getProperty("/AddressStreet3"),
							street5: baseModel.getProperty("/AddressStreet5"),
							district: baseModel.getProperty("/District"),
							differentCity: baseModel.getProperty("/DifferentCity"),
							postalCode: baseModel.getProperty("/postalCode"),
							city: baseModel.getProperty("/city"),
							region: "",
							country: "",
							telephone: baseModel.getProperty("/telephone"),
							mobilePhone: baseModel.getProperty("/mobileNumber"),
							taxId: baseModel.getProperty("/taxId"),
							b_Codes: baseModel.getProperty("/bCode"),
							bpNummr: baseModel.getProperty("/bpNummr")
						}, {
							id: "",
							returnReqNum: "",
							zipCode: "",
							refInvoiceNum: invoiceItems[0].InvoiceNum,
							email: "",
							salesDocument: "",
							partnerRole: "WE",
							name1: baseModel.getProperty("/partnerName"),
							name2: "",
							name3: "",
							name4: baseModel.getProperty("/partnerName4"),
							street2: baseModel.getProperty("/AddressStreet2"),
							street3: baseModel.getProperty("/AddressStreet3"),
							street5: baseModel.getProperty("/AddressStreet5"),
							district: baseModel.getProperty("/District"),
							differentCity: baseModel.getProperty("/DifferentCity"),
							postalCode: baseModel.getProperty("/postalCode"),
							city: baseModel.getProperty("/city"),
							region: "",
							country: "",
							telephone: baseModel.getProperty("/telephone"),
							mobilePhone: baseModel.getProperty("/mobileNumber"),
							taxId: baseModel.getProperty("/taxId"),
							b_Codes: baseModel.getProperty("/bCode"),
							bpNummr: baseModel.getProperty("/bpNummr")
						}, {
							id: "",
							returnReqNum: "",
							zipCode: "",
							refInvoiceNum: invoiceItems[0].InvoiceNum,
							email: "",
							salesDocument: "",
							partnerRole: "RE",
							name1: baseModel.getProperty("/partnerName"),
							name2: "",
							name3: "",
							name4: baseModel.getProperty("/partnerName4"),
							street2: baseModel.getProperty("/AddressStreet2"),
							street3: baseModel.getProperty("/AddressStreet3"),
							street5: baseModel.getProperty("/AddressStreet5"),
							district: baseModel.getProperty("/District"),
							differentCity: baseModel.getProperty("/DifferentCity"),
							postalCode: baseModel.getProperty("/postalCode"),
							city: baseModel.getProperty("/city"),
							region: "",
							country: "",
							telephone: baseModel.getProperty("/telephone"),
							mobilePhone: baseModel.getProperty("/mobileNumber"),
							taxId: baseModel.getProperty("/taxId"),
							b_Codes: baseModel.getProperty("/bCode"),
							bpNummr: baseModel.getProperty("/bpNummr")
						}, {
							id: "",
							returnReqNum: "",
							zipCode: "",
							refInvoiceNum: invoiceItems[0].InvoiceNum,
							email: "",
							salesDocument: "",
							partnerRole: "RG",
							name1: baseModel.getProperty("/partnerName"),
							name2: "",
							name3: "",
							name4: baseModel.getProperty("/partnerName4"),
							street2: baseModel.getProperty("/AddressStreet2"),
							street3: baseModel.getProperty("/AddressStreet3"),
							street5: baseModel.getProperty("/AddressStreet5"),
							district: baseModel.getProperty("/District"),
							differentCity: baseModel.getProperty("/DifferentCity"),
							postalCode: baseModel.getProperty("/postalCode"),
							city: baseModel.getProperty("/city"),
							region: "",
							country: "",
							telephone: baseModel.getProperty("/telephone"),
							mobilePhone: baseModel.getProperty("/mobileNumber"),
							taxId: baseModel.getProperty("/taxId"),
							b_Codes: baseModel.getProperty("/bCode"),
							bpNummr: baseModel.getProperty("/bpNummr")
						}];
						payload.exchange.address = address;
					} else {
						var address = [{
							id: "",
							returnReqNum: "",
							zipCode: "",
							refInvoiceNum: baseModel.getProperty("/refDocNum"),
							email: "",
							salesDocument: "",
							partnerRole: "AG",
							name1: baseModel.getProperty("/partnerName"),
							name2: "",
							name3: "",
							name4: baseModel.getProperty("/partnerName4"),
							street2: baseModel.getProperty("/AddressStreet2"),
							street3: baseModel.getProperty("/AddressStreet3"),
							street5: baseModel.getProperty("/AddressStreet5"),
							district: baseModel.getProperty("/District"),
							differentCity: baseModel.getProperty("/DifferentCity"),
							postalCode: baseModel.getProperty("/postalCode"),
							city: baseModel.getProperty("/city"),
							region: "",
							country: "",
							telephone: baseModel.getProperty("/telephone"),
							mobilePhone: baseModel.getProperty("/mobileNumber"),
							taxId: baseModel.getProperty("/taxId"),
							b_Codes: baseModel.getProperty("/bCode"),
							bpNummr: baseModel.getProperty("/bpNummr")
						}, {
							id: "",
							returnReqNum: "",
							zipCode: "",
							refInvoiceNum: baseModel.getProperty("/refDocNum"),
							email: "",
							salesDocument: "",
							partnerRole: "WE",
							name1: baseModel.getProperty("/partnerName"),
							name2: "",
							name3: "",
							name4: baseModel.getProperty("/partnerName4"),
							street2: baseModel.getProperty("/AddressStreet2"),
							street3: baseModel.getProperty("/AddressStreet3"),
							street5: baseModel.getProperty("/AddressStreet5"),
							district: baseModel.getProperty("/District"),
							differentCity: baseModel.getProperty("/DifferentCity"),
							postalCode: baseModel.getProperty("/postalCode"),
							city: baseModel.getProperty("/city"),
							region: "",
							country: "",
							telephone: baseModel.getProperty("/telephone"),
							mobilePhone: baseModel.getProperty("/mobileNumber"),
							taxId: baseModel.getProperty("/taxId"),
							b_Codes: baseModel.getProperty("/bCode"),
							bpNummr: baseModel.getProperty("/bpNummr")
						}, {
							id: "",
							returnReqNum: "",
							zipCode: "",
							refInvoiceNum: baseModel.getProperty("/refDocNum"),
							email: "",
							salesDocument: "",
							partnerRole: "RE",
							name1: baseModel.getProperty("/partnerName"),
							name2: "",
							name3: "",
							name4: baseModel.getProperty("/partnerName4"),
							street2: baseModel.getProperty("/AddressStreet2"),
							street3: baseModel.getProperty("/AddressStreet3"),
							street5: baseModel.getProperty("/AddressStreet5"),
							district: baseModel.getProperty("/District"),
							differentCity: baseModel.getProperty("/DifferentCity"),
							postalCode: baseModel.getProperty("/postalCode"),
							city: baseModel.getProperty("/city"),
							region: "",
							country: "",
							telephone: baseModel.getProperty("/telephone"),
							mobilePhone: baseModel.getProperty("/mobileNumber"),
							taxId: baseModel.getProperty("/taxId"),
							b_Codes: baseModel.getProperty("/bCode"),
							bpNummr: baseModel.getProperty("/bpNummr")
						}, {
							id: "",
							returnReqNum: "",
							zipCode: "",
							refInvoiceNum: baseModel.getProperty("/refDocNum"),
							email: "",
							salesDocument: "",
							partnerRole: "RG",
							name1: baseModel.getProperty("/partnerName"),
							name2: "",
							name3: "",
							name4: baseModel.getProperty("/partnerName4"),
							street2: baseModel.getProperty("/AddressStreet2"),
							street3: baseModel.getProperty("/AddressStreet3"),
							street5: baseModel.getProperty("/AddressStreet5"),
							district: baseModel.getProperty("/District"),
							differentCity: baseModel.getProperty("/DifferentCity"),
							postalCode: baseModel.getProperty("/postalCode"),
							city: baseModel.getProperty("/city"),
							region: "",
							country: "",
							telephone: baseModel.getProperty("/telephone"),
							mobilePhone: baseModel.getProperty("/mobileNumber"),
							taxId: baseModel.getProperty("/taxId"),
							b_Codes: baseModel.getProperty("/bCode"),
							bpNummr: baseModel.getProperty("/bpNummr")
						}];
						payload.exchange.address = address;

					}
				}
			}

			if (this.getView().getModel("returnModel").getData().attachmentObject.length > 0) {
				var attachment = [];
				var attachmentObject = this.getView().getModel("returnModel").getData().attachmentObject;
				for (var j = 0; j < attachmentObject.length; j++) {
					var attach = {
						"docName": attachmentObject[j].fileName,
						"docType": attachmentObject[j].fileType,
						"docData": attachmentObject[j].fileDoc,
						"docId": attachmentObject[j].docId,
						"returnReqNum": returnReqNum
					};
					attachment.push(attach);
				}
				payload.returns.attachment = attachment;
				// payload.returns.attachment.push(attachment);
			}
			var oHeader = {
				"Content-Type": "application/json;charset=utf-8"
			};
			var oBusyDialog = new sap.m.BusyDialog();
			oBusyDialog.open();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/DKSHJavaService/returnRequest/createReturnRequest/saveAsDraft", JSON.stringify(payload), true, "POST",
				false,
				false, oHeader);
			oModel.attachRequestCompleted(function (success) {
				oBusyDialog.close();
				if (that.address) {
					that.address.close();
				}
				if (sap.ui.getCore().getModel("submitRequest")) {
					sap.ui.getCore().getModel("submitRequest").setData("");
				}
				var orderNO = success.getSource().getData().name.split(" ")[1];

				that.oDefaultDialog = new sap.m.Dialog({
					type: sap.m.DialogType.Message,
					title: "Success",
					styleClass: "sapUiSizeCompact",
					content: [new sap.m.Text({
							text: " " + success.getSource().getData().name + "."
						}),
						new sap.m.Text({
							text: " " + that.resourceBundle.getText("Fordetailsclick")
						}),
						new sap.m.Link({
							text: orderNO,
							target: "_top",
							press: function (oEvent) {
								that._wizard.discardProgress(that._wizard.getSteps()[0]);
								that._discardChanges();
								var order = {
									orderNO: orderNO
								};
								var oModelTb = new sap.ui.model.json.JSONModel(order);
								sap.ui.getCore().setModel(oModelTb, "saveDraft");
								var router = sap.ui.core.UIComponent.getRouterFor(that);
								router.navTo("DraftRecord");
							}
						})
					],
					beginButton: new sap.m.Button({

						text: that.resourceBundle.getText("OK"),
						press: function () {
							that._wizard.discardProgress(that._wizard.getSteps()[0]);
							that._discardChanges();

							var router = sap.ui.core.UIComponent.getRouterFor(that);
							router.navTo("DraftRecord");
						}.bind(that)
					}),
					endButton: new sap.m.Button({
						text: "Close",
						press: function () {
							that._wizard.discardProgress(that._wizard.getSteps()[0]);
							that._discardChanges();

							var router = sap.ui.core.UIComponent.getRouterFor(that);
							router.navTo("DraftRecord");
						}.bind(that)
					})
				});

				// to get access to the controller's model
				that.getView().addDependent(that.oDefaultDialog);
				that.oDefaultDialog.open();
			});
			oModel.attachRequestFailed(function (oEvent) {
				oBusyDialog.close();
				MessageBox.error(oEvent.getParameters().responseText);
			});
		},

		onPressSubmit: function (oEvent) {
			if (this.RetQtyCount > 0) {
				MessageBox.information(this.resourceBundle.getText("EnteredReturnedQtycannotbegreaterthanAvailableReturnQty"));
				// MessageBox.information("Entered Qty cannot be greater than Available Return Qty In Returns");
				return;
			}
			if (this.getView().getModel("baseModel").getProperty("/reasonOwner") === "" || this.getView().getModel("baseModel").getProperty(
					"/reasonOwner") === undefined) {
				MessageToast.show(this.resourceBundle.getText("ReasonOwnerisMandatory"));
				// MessageToast.show("Reason Owner is Mandatory");
				return;
			}
			if (this.getView().getModel("baseModel").getProperty("/referenceNo") === "" || this.getView().getModel("baseModel").getProperty(
					"/referenceNo") === undefined) {
				MessageToast.show(this.resourceBundle.getText("referenceNoisMandatory"));
				// MessageToast.show("reference No is Mandatory");
				return;
			}
			var that = this;
			var invoiceSearchModel = this.getView().getModel("invoiceSearchModel");
			var returnModel = this.getView().getModel("returnModel");
			var exchangeModel = this.getView().getModel("exchangeModel");
			var baseModel = this.getView().getModel("baseModel");
			this.getView().getModel("baseModel").setProperty("/savePressed", false);
			this.getView().getModel("baseModel").setProperty("/submitPressed", true);
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
			if (exchangeModel.getData().results !== undefined && exchangeModel.getData().results.length > 0) {
				if (parseFloat(returnModel.getData().returnAmountTotal) !== parseFloat(exchangeModel.getData().exchangeAmountTotal)) {
					sap.m.MessageBox.information(this.resourceBundle.getText("retrunAmountValidation"), {
						actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
						onClose: function (sAction) {
							if (sAction === MessageBox.Action.OK) {
								that._checkAddress();
							}
						}
					});
				} else {
					that._checkAddress();
					// that._continueSubmit();

				}
			} else if (returnModel.getData().results === undefined || returnModel.getData().results.length === 0) {
				MessageBox.information(this.resourceBundle.getText("ReturnItemscannotbeempty"));
			} else {
				that._checkAddress();
				// that._continueSubmit();
			}

		},

		_checkAddress: function () {
			var that = this;
			var invoiceSearchModel = this.getView().getModel("invoiceSearchModel");
			var returnModel = this.getView().getModel("returnModel");
			var exchangeModel = this.getView().getModel("exchangeModel");
			var baseModel = this.getView().getModel("baseModel");
			// if (baseModel.getProperty("/oneTimeCustomer") === "X" && exchangeModel.getData().results !== undefined && exchangeModel.getData()
			// 	.results
			// 	.length > 0) {

			if (baseModel.getProperty("/oneTimeCustomer") === "X" && baseModel.getProperty("/returnSoldTo") !== baseModel.getProperty(
					"/exSoldTo") && baseModel.getProperty("/EXOneTimeCustomer") === "X") {
				if (!this.address) {
					this.address = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.Address", this);
					this.getView().addDependent(this.address);
				}
				this._loadCity();
				if (this.getView().getModel("editDraftModel")) {
					if (this.changeSoldToParty === true) {
						baseModel.setProperty("/partnerName", "");
						baseModel.setProperty("/AddressStreet2", "");
						baseModel.setProperty("/AddressStreet3", "");
						baseModel.setProperty("/AddressStreet5", "");
						baseModel.setProperty("/District", "");
						baseModel.setProperty("/DifferentCity", "");
						baseModel.setProperty("/postalCode", "");
						baseModel.setProperty("/city", "");
						baseModel.setProperty("/telephone", "");
						baseModel.setProperty("/mobileNumber", "");
						baseModel.setProperty("/taxId", "");
						baseModel.setProperty("/bCode", "00000");
						baseModel.setProperty("/bpNummr", "N");
						baseModel.setProperty("/partnerName4", "");
						baseModel.setProperty("/maxLengthName4", "40 char remaining");
						baseModel.setProperty("/maxLengthAddressStreet2", "40 char remaining");
						baseModel.setProperty("/maxLengthAddressStreet3", "40 char remaining");
						baseModel.setProperty("/maxLengthAddressStreet5", "40 char remaining");
						baseModel.setProperty("/maxLengthDistrict", "40 char remaining");
						baseModel.setProperty("/maxLengthDifferentCity", "40 char remaining");
						baseModel.setProperty("/maxLengthPostalCode", "5 char remaining");
						baseModel.setProperty("/maxLengthtelephone", "30 char remaining");
						baseModel.setProperty("/maxLengthmobileNumber", "30 char remaining");
						baseModel.setProperty("/maxLengthtaxId", "13 char remaining");
						baseModel.setProperty("/maxLengthbCode", "0 char remaining");
						baseModel.setProperty("/maxLengthbpNummr", "0 char remaining");
						this.address.open();
						return;
					} else {
						baseModel.setProperty("/maxLengthName4", (40 - baseModel.getProperty("/partnerName4").length) + " char remaining");
						baseModel.setProperty("/maxLengthAddressStreet2", (40 - baseModel.getProperty("/AddressStreet2").length) + " char remaining");
						baseModel.setProperty("/maxLengthAddressStreet3", (40 - baseModel.getProperty("/AddressStreet3").length) + " char remaining");
						baseModel.setProperty("/maxLengthAddressStreet5", (40 - baseModel.getProperty("/AddressStreet5").length) + " char remaining");
						baseModel.setProperty("/maxLengthDistrict", (40 - baseModel.getProperty("/District").length) + " char remaining");
						baseModel.setProperty("/maxLengthDifferentCity", (40 - baseModel.getProperty("/DifferentCity").length) + " char remaining");
						baseModel.setProperty("/maxLengthPostalCode", (5 - baseModel.getProperty("/postalCode").length) + " char remaining");
						baseModel.setProperty("/maxLengthtelephone", (30 - baseModel.getProperty("/telephone").length) + " char remaining");
						baseModel.setProperty("/maxLengthmobileNumber", (30 - baseModel.getProperty("/mobileNumber").length) + " char remaining");
						baseModel.setProperty("/maxLengthtaxId", (13 - baseModel.getProperty("/taxId").length) + " char remaining");
						baseModel.setProperty("/maxLengthbCode", (5 - baseModel.getProperty("/bCode").length) + " char remaining");
						baseModel.setProperty("/maxLengthbpNummr", (1 - baseModel.getProperty("/bpNummr").length) + " char remaining");
						this.address.open();
						return;
					}
				} else {
					baseModel.setProperty("/partnerName", "");
					baseModel.setProperty("/AddressStreet2", "");
					baseModel.setProperty("/AddressStreet3", "");
					baseModel.setProperty("/AddressStreet5", "");
					baseModel.setProperty("/District", "");
					baseModel.setProperty("/DifferentCity", "");
					baseModel.setProperty("/postalCode", "");
					baseModel.setProperty("/city", "");
					baseModel.setProperty("/telephone", "");
					baseModel.setProperty("/mobileNumber", "");
					baseModel.setProperty("/taxId", "");
					baseModel.setProperty("/bCode", "00000");
					baseModel.setProperty("/bpNummr", "N");
					baseModel.setProperty("/partnerName4", "");
					baseModel.setProperty("/maxLengthName4", "40 char remaining");
					baseModel.setProperty("/maxLengthAddressStreet2", "40 char remaining");
					baseModel.setProperty("/maxLengthAddressStreet3", "40 char remaining");
					baseModel.setProperty("/maxLengthAddressStreet5", "40 char remaining");
					baseModel.setProperty("/maxLengthDistrict", "40 char remaining");
					baseModel.setProperty("/maxLengthDifferentCity", "40 char remaining");
					baseModel.setProperty("/maxLengthPostalCode", "5 char remaining");
					baseModel.setProperty("/maxLengthtelephone", "30 char remaining");
					baseModel.setProperty("/maxLengthmobileNumber", "30 char remaining");
					baseModel.setProperty("/maxLengthtaxId", "13 char remaining");
					baseModel.setProperty("/maxLengthbCode", "0 char remaining");
					baseModel.setProperty("/maxLengthbpNummr", "0 char remaining");
					this.address.open();
					return;
				}
			} else if ((baseModel.getProperty("/oneTimeCustomer") === "X") && exchangeModel.getData()
				.results !== undefined && exchangeModel.getData().results
				.length > 0 && baseModel.getProperty("/returnSoldTo") === baseModel.getProperty("/exSoldTo")) {
				if (!this.address) {
					this.address = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.Address", this);
					this.getView().addDependent(this.address);
				}
				this._loadCity();
				if (this.docVersion === undefined) {
					var invoiceItems = this.selectedReturnItems[0];
					baseModel.setProperty("/partnerName", invoiceItems.soldToAddress.partnerName);
					baseModel.setProperty("/partnerName4", invoiceItems.soldToAddress.partnerName4);
					baseModel.setProperty("/AddressStreet2", invoiceItems.soldToAddress.AddressStreet2);
					baseModel.setProperty("/AddressStreet3", invoiceItems.soldToAddress.AddressStreet3);
					baseModel.setProperty("/AddressStreet5", invoiceItems.soldToAddress.AddressStreet5);
					baseModel.setProperty("/District", invoiceItems.soldToAddress.District);
					baseModel.setProperty("/DifferentCity", invoiceItems.soldToAddress.DifferentCity);
					baseModel.setProperty("/postalCode", invoiceItems.soldToAddress.postalCode);
					baseModel.setProperty("/city", invoiceItems.soldToAddress.City);
					baseModel.setProperty("/telephone", invoiceItems.soldToAddress.telephone);
					baseModel.setProperty("/mobileNumber", invoiceItems.soldToAddress.mobileNumber);
					baseModel.setProperty("/taxId", invoiceItems.soldToAddress.taxId);
					baseModel.setProperty("/bCode", invoiceItems.soldToAddress.bCode);
					if (invoiceItems.soldToAddress.bpNummr === "N" || invoiceItems.soldToAddress.bpNummr === "H") {
						baseModel.setProperty("/bCode", "00000");
					}
					baseModel.setProperty("/bpNummr", invoiceItems.soldToAddress.bpNummr);
					baseModel.setProperty("/maxLengthName4", (40 - invoiceItems.soldToAddress.partnerName4.length) + " char remaining");
					baseModel.setProperty("/maxLengthAddressStreet2", (40 - invoiceItems.soldToAddress.AddressStreet2.length) + " char remaining");
					baseModel.setProperty("/maxLengthAddressStreet3", (40 - invoiceItems.soldToAddress.AddressStreet3.length) + " char remaining");
					baseModel.setProperty("/maxLengthAddressStreet5", (40 - invoiceItems.soldToAddress.AddressStreet5.length) + " char remaining");
					baseModel.setProperty("/maxLengthDistrict", (40 - invoiceItems.soldToAddress.District.length) + " char remaining");
					baseModel.setProperty("/maxLengthDifferentCity", (40 - invoiceItems.soldToAddress.DifferentCity.length) + " char remaining");
					baseModel.setProperty("/maxLengthPostalCode", (5 - invoiceItems.soldToAddress.postalCode.length) + " char remaining");
					baseModel.setProperty("/maxLengthtelephone", (30 - invoiceItems.soldToAddress.telephone.length) + " char remaining");
					baseModel.setProperty("/maxLengthmobileNumber", (30 - invoiceItems.soldToAddress.mobileNumber.length) + " char remaining");
					baseModel.setProperty("/maxLengthtaxId", (13 - invoiceItems.soldToAddress.taxId.length) + " char remaining");
					baseModel.setProperty("/maxLengthbCode", (5 - invoiceItems.soldToAddress.bCode.length) + " char remaining");
					baseModel.setProperty("/maxLengthbpNummr", (1 - invoiceItems.soldToAddress.bpNummr.length) + " char remaining");
					this.address.setModel(baseModel, "/baseModel");
					this.address.open();
				} else {
					// baseModel.setProperty("/partnerName", invoiceItems.soldToAddress.partnerName);
					// baseModel.setProperty("/partnerName4", invoiceItems.soldToAddress.partnerName4);
					// baseModel.setProperty("/AddressStreet2", invoiceItems.soldToAddress.AddressStreet2);
					// baseModel.setProperty("/AddressStreet3", invoiceItems.soldToAddress.AddressStreet3);
					// baseModel.setProperty("/AddressStreet5", invoiceItems.soldToAddress.AddressStreet5);
					// baseModel.setProperty("/District", invoiceItems.soldToAddress.District);
					// baseModel.setProperty("/DifferentCity", invoiceItems.soldToAddress.DifferentCity);
					// baseModel.setProperty("/postalCode", invoiceItems.soldToAddress.postalCode);
					// baseModel.setProperty("/city", invoiceItems.soldToAddress.City);
					// baseModel.setProperty("/telephone", invoiceItems.soldToAddress.telephone);
					// baseModel.setProperty("/mobileNumber", invoiceItems.soldToAddress.mobileNumber);
					// baseModel.setProperty("/taxId", invoiceItems.soldToAddress.taxId);
					// baseModel.setProperty("/bCode", invoiceItems.soldToAddress.bCode);
					// baseModel.setProperty("/bpNummr", invoiceItems.soldToAddress.bpNummr);
					baseModel.setProperty("/maxLengthName4", (40 - baseModel.getProperty("/partnerName4").length) + " char remaining");
					baseModel.setProperty("/maxLengthAddressStreet2", (40 - baseModel.getProperty("/AddressStreet2").length) + " char remaining");
					baseModel.setProperty("/maxLengthAddressStreet3", (40 - baseModel.getProperty("/AddressStreet3").length) + " char remaining");
					baseModel.setProperty("/maxLengthAddressStreet5", (40 - baseModel.getProperty("/AddressStreet5").length) + " char remaining");
					baseModel.setProperty("/maxLengthDistrict", (40 - baseModel.getProperty("/District").length) + " char remaining");
					baseModel.setProperty("/maxLengthDifferentCity", (40 - baseModel.getProperty("/DifferentCity").length) + " char remaining");
					baseModel.setProperty("/maxLengthPostalCode", (5 - baseModel.getProperty("/postalCode").length) + " char remaining");
					baseModel.setProperty("/maxLengthtelephone", (30 - baseModel.getProperty("/telephone").length) + " char remaining");
					baseModel.setProperty("/maxLengthmobileNumber", (30 - baseModel.getProperty("/mobileNumber").length) + " char remaining");
					baseModel.setProperty("/maxLengthtaxId", (13 - baseModel.getProperty("/taxId").length) + " char remaining");
					baseModel.setProperty("/maxLengthbCode", (5 - baseModel.getProperty("/bCode").length) + " char remaining");
					baseModel.setProperty("/maxLengthbpNummr", (1 - baseModel.getProperty("/bpNummr").length) + " char remaining");
					this.address.setModel(baseModel, "/baseModel");
					this.address.open();
				}
				return;
			} else if ((baseModel.getProperty("/EXOneTimeCustomer") === "X") && (baseModel.getProperty("/oneTimeCustomer") === "")) {
				if (!this.address) {
					this.address = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.Address", this);
					this.getView().addDependent(this.address);
				}
				this._loadCity();
				baseModel.setProperty("/partnerName", "");
				baseModel.setProperty("/AddressStreet2", "");
				baseModel.setProperty("/AddressStreet3", "");
				baseModel.setProperty("/AddressStreet5", "");
				baseModel.setProperty("/District", "");
				baseModel.setProperty("/DifferentCity", "");
				baseModel.setProperty("/postalCode", "");
				baseModel.setProperty("/city", "");
				baseModel.setProperty("/telephone", "");
				baseModel.setProperty("/mobileNumber", "");
				baseModel.setProperty("/taxId", "");
				baseModel.setProperty("/bCode", "00000");
				baseModel.setProperty("/bpNummr", "N");
				baseModel.setProperty("/partnerName4", "");
				baseModel.setProperty("/maxLengthName4", "40 char remaining");
				baseModel.setProperty("/maxLengthAddressStreet2", "40 char remaining");
				baseModel.setProperty("/maxLengthAddressStreet3", "40 char remaining");
				baseModel.setProperty("/maxLengthAddressStreet5", "40 char remaining");
				baseModel.setProperty("/maxLengthDistrict", "40 char remaining");
				baseModel.setProperty("/maxLengthDifferentCity", "40 char remaining");
				baseModel.setProperty("/maxLengthPostalCode", "5 char remaining");
				baseModel.setProperty("/maxLengthtelephone", "30 char remaining");
				baseModel.setProperty("/maxLengthmobileNumber", "30 char remaining");
				baseModel.setProperty("/maxLengthtaxId", "13 char remaining");
				baseModel.setProperty("/maxLengthbCode", "0 char remaining");
				baseModel.setProperty("/maxLengthbpNummr", "0 char remaining");
				this.address.open();
				return;
			} else if (baseModel.getProperty("/EXOneTimeCustomer") === "" && baseModel.getProperty("/returnSoldTo") !== baseModel.getProperty(
					"/exSoldTo")) {
				this._continueSubmit();
				return;
			}

			// }
			this._continueSubmit();
		},

		onViewExAddress: function () {
			if (!this.address) {
				this.address = sap.ui.xmlfragment("incture.com.ConnectClient_ReturnCreate.Fragments.Address", this);
				this.getView().addDependent(this.address);
			}
			this.getView().getModel("baseModel").setProperty("/addressFieldEnable", false);
			this.getView().getModel("baseModel").refresh();
			this.address.open();
		},

		_continueSubmit: function () {
			var that = this;
			var invoiceSearchModel = this.getView().getModel("invoiceSearchModel");
			var returnModel = this.getView().getModel("returnModel");
			var exchangeModel = this.getView().getModel("exchangeModel");
			var baseModel = this.getView().getModel("baseModel");
			// if (baseModel.getData().returnReqNum) {
			// 	var docVersion = "DRAFT";
			// } else {
			// 	var docVersion = "NEW";
			// }
			if (this.docVersion === "DRAFT") {
				var docVersion = "DRAFT";
			} else if (this.docVersion === "ERROR") {
				var docVersion = "ERROR";
			} else {
				var docVersion = "NEW";
			}
			var attachment = {
				"docName": "retunr03",
				"docType": "pdf",
				"docData": [
					0,
					1
				]
			};
			if (baseModel.getData().returnReqNum) {
				var returnReqNum = baseModel.getData().returnReqNum;
			} else {
				var returnReqNum = "";
			}
			if (baseModel.getData().exchangeReqNum) {
				var exchangeReqNum = baseModel.getData().exchangeReqNum;
			} else {
				var exchangeReqNum = "";
			}
			var returnItems = returnModel.getData().results;
			var retItemsArray = [];
			for (var i = 0; i < returnItems.length; i++) {
				if (returnItems[i].deleted === "false") {
					var Items = {
						"refDocNum": returnItems[i].refInvoice,
						"refDocItem": returnItems[i].refItemNumber,
						"returnReqItemid": returnItems[i].itemNumber,
						"materialGroup": returnItems[i].materialGroup,
						"materialGroup4": returnItems[i].materialGroup4,
						"material": returnItems[i].matNumber,
						"shortText": returnItems[i].itemShortText,
						"avlReturnQty": returnItems[i].avlRetQty,
						"avlUom": returnItems[i].salesUnit,
						"returnQty": returnItems[i].quantity,
						"returnUom": returnItems[i].salesUnit,
						"unitPriceCc": returnItems[i].unitPrice,
						"unitPriceInv": returnItems[i].unitPriceInv,
						"invoiceTotalAmount": returnModel.getData().returnAmountTotal.split("(")[0],
						"storageLocation": returnItems[i].storageLocation,
						"higherLevel": returnItems[i].higherItem,
						"batch": returnItems[i].batchNumber,
						"referenceInvDate": formatter.dateTimeFormatPS(returnItems[i].billingDate).split("T")[0],
						"expiryDate": formatter.dateTimeFormatPS(returnItems[i].expiryDate).split("T")[0],
						"pricingDate": formatter.dateTimeFormatPS(returnItems[i].pricingDate),
						"serviceRenderedDate": formatter.dateTimeFormatPS(returnItems[i].serviceRenderedDate),
						"serialNum": returnItems[i].serialNumber,
						"billingType": invoiceSearchModel.getData().billingType,
						"sapReturnOrderNum": "",
						"sapReturnOrderItemNum": "",
						"overallItemWorkflowStatus": "",
						"plant": returnItems[i].plant,
						"returnReqNum": returnReqNum,
						"exchangeOrderType": baseModel.getData().exchangeOrderType,
						"paymentTerms": returnItems[i].paymentTerms,
						"conditionGroup4": returnItems[i].conditionGroup4
					};
					retItemsArray.push(Items);
				}
			}
			if (retItemsArray.length === 0) {
				MessageBox.information(this.resourceBundle.getText("ReturnItemscannotbeempty"));
				return;
			}

			if (baseModel.getData().userEmailId) {
				var email = baseModel.getData().userEmailId;
				var emailTrigger = true;
			} else {
				var email = "";
				var emailTrigger = false;
			}
			if (baseModel.getData().phoneNum) {
				var contactelephone = baseModel.getData().phoneNum;
				var smsTrigger = true;
				var smsNumberList = [];
				smsNumberList.push(contactelephone);
			} else {
				var contactelephone = "";
				var smsTrigger = false;
				var smsNumberList = [];
			}
			if (retConditionsArray && retConditionsArray.length > 0) {
				var retCond = retConditionsArray;
			} else {
				var retCond = "";
			}
			if (baseModel.getData().requestor === baseModel.getData().userName + " (" + baseModel.getData().phone + ")") {
				var requestor = "";
			} else {
				var requestor = baseModel.getData().requestor;
			}
			var payload = {
				"returns": {
					"customerPo": baseModel.getData().customerPONumber,
					"contactelephone": contactelephone,
					"smsNumberList": smsNumberList,
					"smsTrigger": smsTrigger,
					"smsFrom": "DKSH-TH",
					"createdAt": new Date(),
					"mappingId": baseModel.getData().salesOrgForRO,
					"updatedBy": requestor,
					"requestorName": baseModel.getData().userId + "(" + baseModel.getData().userName + ")",
					"requestedBy": baseModel.getData().userId,
					"roType": baseModel.getData().selectedROTypeCode,
					"roTypeText": baseModel.getData().selectedROType,
					"salesOrg": baseModel.getData().selectedSalesOrg,
					"salesOrgDesc": invoiceSearchModel.getData().salesOrgDesc,
					"distributionChannel": baseModel.getData().selectedDistChnl,
					"distributionChannelDesc": invoiceSearchModel.getData().distChnlDesc,
					"division": invoiceSearchModel.getData().Division,
					"divisionDesc": baseModel.getData().selectedDivisionDesc,
					"soldToParty": baseModel.getData().returnSoldTo,
					"soldToPartyDesc": baseModel.getData().returnSoldToDesc,
					"shipToParty": baseModel.getData().returnShipTo,
					"shipToPartyDesc": baseModel.getData().shipToDesc,
					"billToParty": baseModel.getData().returnBillTo,
					"billToDesc": baseModel.getData().returnBillToDesc,
					"payer": baseModel.getData().returnPayer,
					"payerDesc": baseModel.getData().returnPayerDesc,
					"requestorEmail": email,
					"contactPerson": baseModel.getData().contactPerson,
					"contactDivsion": baseModel.getData().contactDivision,
					"contactTelephone": baseModel.getData().phoneNum,
					"referenceNum": baseModel.getData().referenceNo,
					"requestRemark": baseModel.getData().returnRemark,
					"orderReason": baseModel.getData().selectedReturnReason.split(" ")[0],
					"orderReasonText": baseModel.getData().selectedReturnReason.split("(")[1].split(")")[0],
					"reasonOwner": baseModel.getData().reasonOwner.split(" ")[0],
					"reasonOwnerDesc": baseModel.getData().reasonOwner.split(" ")[1],
					"orderType": baseModel.getData().returnOrderType,
					"orderTypeText": baseModel.getData().returnOrderType,
					"returnTotalAmt": returnModel.getData().returnAmountTotal.split("(")[0],
					"totalRoAmount": this.getView().getModel("returnModel").getData().returnAmountTotal.split("(")[0],
					"returnReqNum": returnReqNum,
					"workflowInstance": "",
					"overallWorkflowStatus": "",
					"processingStatus": "",
					"logisticalStatus": "",
					"oneTimeCustomer": baseModel.getData().oneTimeCustomer,
					"docVersion": docVersion,
					"flagRoSo": "R",
					"emailTrigger": emailTrigger,
					"exchangeOrderType": baseModel.getData().exchangeOrderType,
					// "distributionChannel": invoiceSearchModel.getData().distChnl,
					// "address": [],
					"items": retItemsArray,
					// "attachment": [],
					// "orderCondition": retCond
				}
			};
			if (returnModel.getData().returnConditions) {
				var retCon = returnModel.getData().returnConditions;
				var retConditionsArray = [];

				for (var j = 0; j < retCon.length; j++) {
					if (retCon[j].deleted === undefined || retCon[j].deleted === "false") {
						var retOrderCondition = {
							"refDoc": retCon[j].refInvoice,
							"salesDocument": "",
							"itemNumber": retCon[j].itemNumber,
							"stepNumber": retCon[j].stepNumber,
							"condCounter": retCon[j].condCounter,
							"condType": retCon[j].condType,
							"condRate": retCon[j].condRate,
							"currency": retCon[j].currency,
							"condUnit": retCon[j].condUnit,
							"condPricingUnit": retCon[j].condPricingUnit,
							"calculationType": retCon[j].calculationType,
							"condFlag": retCon[j].condFlag,
							"condUpdateFlag": retCon[j].condUpdateFlag
						};
						retConditionsArray.push(retOrderCondition);
					}
				}
				payload.returns.orderCondition = retConditionsArray;
			}
			if (baseModel.getProperty("/oneTimeCustomer") === "X") {
				if (this.docVersion === undefined) {
					var invoiceItems = this.selectedReturnItems;
					var soldToAddress = invoiceItems[0].soldToAddress;
					var shipToAddress = invoiceItems[0].shipToAddress;
					var billToAddress = invoiceItems[0].billToAdress;
					var payerAddress = invoiceItems[0].payerAddress;
					var address = [{
						id: "",
						returnReqNum: "",
						zipCode: soldToAddress.postalCode,
						refDocNum: invoiceItems[0].InvoiceNum,
						email: "",
						salesDocument: "",
						partnerRole: "AG",
						name1: soldToAddress.partnerName,
						name2: "",
						name3: "",
						name4: soldToAddress.partnerName4,
						street2: soldToAddress.AddressStreet2,
						street3: soldToAddress.AddressStreet3,
						street5: soldToAddress.AddressStreet5,
						district: soldToAddress.District,
						differentCity: soldToAddress.DifferentCity,
						postalCode: soldToAddress.postalCode,
						city: soldToAddress.City,
						region: "",
						country: "",
						telephone: soldToAddress.telephone,
						mobilePhone: soldToAddress.mobileNumber,
						taxId: soldToAddress.taxId,
						b_Codes: soldToAddress.bCode,
						bpNummr: soldToAddress.bpNummr,
					}, {
						id: "",
						returnReqNum: "",
						zipCode: shipToAddress.postalCode,
						refDocNum: invoiceItems[0].InvoiceNum,
						email: "",
						salesDocument: "",
						partnerRole: "WE",
						name1: shipToAddress.partnerName,
						name2: "",
						name3: "",
						name4: shipToAddress.partnerName4,
						street2: shipToAddress.AddressStreet2,
						street3: shipToAddress.AddressStreet3,
						street5: shipToAddress.AddressStreet5,
						district: shipToAddress.District,
						differentCity: shipToAddress.DifferentCity,
						postalCode: shipToAddress.postalCode,
						city: shipToAddress.City,
						region: "",
						country: "",
						telephone: shipToAddress.telephone,
						mobilePhone: shipToAddress.mobileNumber,
						taxId: shipToAddress.taxId,
						b_Codess: shipToAddress.bCode,
						bpNummr: shipToAddress.bpNummr,
					}, {
						id: "",
						returnReqNum: "",
						zipCode: billToAddress.postalCode,
						refDocNum: invoiceItems[0].InvoiceNum,
						email: "",
						salesDocument: "",
						partnerRole: "RE",
						name1: billToAddress.partnerName,
						name2: "",
						name3: "",
						name4: billToAddress.partnerName4,
						street2: billToAddress.AddressStreet2,
						street3: billToAddress.AddressStreet3,
						street5: billToAddress.AddressStreet5,
						district: billToAddress.District,
						differentCity: billToAddress.DifferentCity,
						postalCode: billToAddress.postalCode,
						city: billToAddress.City,
						region: "",
						country: "",
						telephone: billToAddress.telephone,
						mobilePhone: billToAddress.mobileNumber,
						taxId: billToAddress.taxId,
						b_Codess: billToAddress.bCode,
						bpNummr: billToAddress.bpNummr
					}, {
						id: "",
						returnReqNum: "",
						zipCode: payerAddress.postalCode,
						refDocNum: invoiceItems[0].InvoiceNum,
						email: "",
						salesDocument: "",
						partnerRole: "RG",
						name1: payerAddress.partnerName,
						name2: "",
						name3: "",
						name4: payerAddress.partnerName4,
						street2: payerAddress.AddressStreet2,
						street3: payerAddress.AddressStreet3,
						street5: payerAddress.AddressStreet5,
						district: payerAddress.District,
						differentCity: payerAddress.DifferentCity,
						postalCode: payerAddress.postalCode,
						city: payerAddress.City,
						region: "",
						country: "",
						telephone: payerAddress.telephone,
						mobilePhone: payerAddress.mobileNumber,
						taxId: payerAddress.taxId,
						b_Codes: payerAddress.bCode,
						bpNummr: payerAddress.bpNummr
					}];
					payload.returns.address = address;
				} else {
					payload.returns.address = baseModel.getProperty("/setRetAddress");
				}
			}
			if (exchangeModel.getData().results !== undefined && exchangeModel.getData().results.length > 0) {
				var exchangeItems = exchangeModel.getData().results;
				var excItemsArray = [];
				for (var k = 0; k < exchangeItems.length; k++) {
					if (exchangeItems[k].deleted === "false") {

						var excItems = {
							"refDocNum": exchangeItems[k].refInvoice,
							"refDocItem": exchangeItems[k].refItemNumber,
							"exchangeReqItemid": exchangeItems[k].itemNumber,
							"materialGroup": exchangeItems[k].materialGroup,
							"materialGroup4": exchangeItems[k].materialGroup4,
							"material": exchangeItems[k].matNumber,
							"shortText": exchangeItems[k].itemShortText,
							// "avlReturnQty": exchangeItems[k].quantity,
							// "avlUom": exchangeItems[k].salesUnit,
							"manualFoc": exchangeItems[k].manualFoc,
							"returnQty": exchangeItems[k].quantity,
							"returnUom": exchangeItems[k].salesUnit,
							"unitPriceCc": exchangeItems[k].unitPrice,
							"unitPriceInv": exchangeItems[k].unitPriceInv,
							"invoiceTotalAmount": exchangeModel.getData().exchangeAmountTotal.split("(")[0],
							"totalNetAmount": this.getView().getModel("exchangeModel").getData().exchangeAmountTotal.split("(")[0],
							"storageLocation": exchangeItems[k].storageLocation,
							"higherLevel": exchangeItems[k].higherItem,
							"batch": exchangeItems[k].batchNumber,
							"referenceInvDate": formatter.dateTimeFormatPS(exchangeItems[k].billingDate).split("T")[0],
							"expiryDate": formatter.dateTimeFormatPS(exchangeItems[k].expiryDate).split("T")[0],
							"serialNum": exchangeItems[k].serialNumber,
							"returnReqNum": "",
							"billingType": invoiceSearchModel.getData().billingType,
							"sapReturnOrderNum": "",
							"sapReturnOrderItemNum": "",
							"overallItemWorkflowStatus": "",
							"plant": exchangeItems[k].plant,
							"exchangeReqNum": exchangeReqNum,
							"paymentTerms": exchangeItems[k].paymentTerms,
							"conditionGroup4": exchangeItems[k].conditionGroup4,
							// "storageLocation": exchangeItems[k].SLoc,
							"pricingDate": formatter.dateTimeFormatPS(exchangeItems[k].pricingDate),
							"serviceRenderedDate": formatter.dateTimeFormatPS(exchangeItems[k].serviceRenderedDate)

						};
						excItemsArray.push(excItems);
					}
				}
				if (excItemsArray.length > 0) {

					if (excCondArray && excCondArray.length > 0) {
						var exCond = excCondArray;
					} else {
						var exCond = "";
					}
					var exchange = {
						"customerPo": baseModel.getData().customerPONumberEx,
						"roType": baseModel.getData().selectedROTypeCode,
						"payer": baseModel.getData().exPayer,
						"referenceNum": baseModel.getData().referenceNo,
						"reasonOwner": baseModel.getData().reasonOwner.split(" ")[0],
						"requestRemark": baseModel.getData().exchangeRemark,
						"billToParty": baseModel.getData().exBillTo,
						"billToDesc": baseModel.getData().exBillToDesc,
						"billToPartyDesc": baseModel.getData().exBillToDesc,
						"payerDescription": baseModel.getData().exPayerDesc,
						"payerDesc": baseModel.getData().exPayerDesc,
						"orderCategory": baseModel.getData().exchangeOrderType,
						"orderType": baseModel.getData().exchangeOrderType,
						"orderTypeText": baseModel.getData().exchangeOrderType,
						"salesOrg": baseModel.getData().selectedSalesOrg,
						"distributionChannel": baseModel.getData().selectedDistChnl,
						"division": invoiceSearchModel.getData().Division,
						"soldToParty": baseModel.getData().exSoldTo,
						"soldToPartyDesc": baseModel.getData().exSoldToDesc,
						"shipToParty": baseModel.getData().exShipTo,
						"shipToPartyDesc": baseModel.getData().exShipToDesc,
						"remarks": baseModel.getData().exchangeRemark,
						"totalNetAmount": exchangeModel.getData().exchangeAmountTotal.split("(")[0],
						"delComplete": baseModel.getData().completedDeliveryFLAG,
						"docCurrency": "",
						"deliveryBlock": "",
						"billingBlock": "",
						"overallStatus": "",
						"rejectionStatus": "",
						"deliveryStatus": "",
						"creditStatus": "",
						"overallWorkflowStatus": "",
						"items": excItemsArray,
						"flagRoSo": "E",
						"requestorName": baseModel.getData().userId + "(" + baseModel.getData().userName + ")",
						"exoneTimeCustomer": baseModel.getData().EXOneTimeCustomer,
						// "orderCondition": exCond,
						"exchangeReqNum": exchangeReqNum
							// "distributionChannel": invoiceSearchModel.getData().distChnl,
					};
					payload.exchange = exchange;
				}
				if (exchangeModel.getData().exchangeConditions) {
					var exchangeConditions = exchangeModel.getData().exchangeConditions;
					var excCondArray = [];
					for (var l = 0; l < exchangeConditions.length; l++) {
						var excOrderConditions = {
							"refDoc": exchangeConditions[l].refInvoice,
							"salesDocument": "",
							"itemNumber": exchangeConditions[l].itemNumber,
							"stepNumber": exchangeConditions[l].stepNumber,
							"condCounter": exchangeConditions[l].condCounter,
							"condType": exchangeConditions[l].condType,
							"condRate": exchangeConditions[l].condRate,
							"currency": exchangeConditions[l].currency,
							"condUnit": exchangeConditions[l].condUnit,
							"condPricingUnit": exchangeConditions[l].condPricingUnit,
							"calculationType": exchangeConditions[l].calculationType,
							"condFlag": exchangeConditions[l].condFlag,
							"condUpdateFlag": exchangeConditions[l].condUpdateFlag
						};
						excCondArray.push(excOrderConditions);
					}
					payload.exchange.orderCondition = excCondArray;
				}
				if (baseModel.getProperty("/EXOneTimeCustomer") === "X" || baseModel.getProperty("/oneTimeCustomer") === "X") {
					if (this.docVersion === undefined) {
						var invoiceItems = this.selectedReturnItems;
						var address = [{
							id: "",
							returnReqNum: "",
							zipCode: "",
							refDocNum: invoiceItems[0].InvoiceNum,
							email: "",
							salesDocument: "",
							partnerRole: "AG",
							name1: baseModel.getProperty("/partnerName"),
							name2: "",
							name3: "",
							name4: baseModel.getProperty("/partnerName4"),
							street2: baseModel.getProperty("/AddressStreet2"),
							street3: baseModel.getProperty("/AddressStreet3"),
							street5: baseModel.getProperty("/AddressStreet5"),
							district: baseModel.getProperty("/District"),
							differentCity: baseModel.getProperty("/DifferentCity"),
							postalCode: baseModel.getProperty("/postalCode"),
							city: baseModel.getProperty("/city"),
							region: "",
							country: "",
							telephone: baseModel.getProperty("/telephone"),
							mobilePhone: baseModel.getProperty("/mobileNumber"),
							taxId: baseModel.getProperty("/taxId"),
							b_Codes: baseModel.getProperty("/bCode"),
							bpNummr: baseModel.getProperty("/bpNummr")
						}, {
							id: "",
							returnReqNum: "",
							zipCode: "",
							refDocNum: invoiceItems[0].InvoiceNum,
							email: "",
							salesDocument: "",
							partnerRole: "WE",
							name1: baseModel.getProperty("/partnerName"),
							name2: "",
							name3: "",
							name4: baseModel.getProperty("/partnerName4"),
							street2: baseModel.getProperty("/AddressStreet2"),
							street3: baseModel.getProperty("/AddressStreet3"),
							street5: baseModel.getProperty("/AddressStreet5"),
							district: baseModel.getProperty("/District"),
							differentCity: baseModel.getProperty("/DifferentCity"),
							postalCode: baseModel.getProperty("/postalCode"),
							city: baseModel.getProperty("/city"),
							region: "",
							country: "",
							telephone: baseModel.getProperty("/telephone"),
							mobilePhone: baseModel.getProperty("/mobileNumber"),
							taxId: baseModel.getProperty("/taxId"),
							b_Codes: baseModel.getProperty("/bCode"),
							bpNummr: baseModel.getProperty("/bpNummr")
						}, {
							id: "",
							returnReqNum: "",
							zipCode: "",
							refDocNum: invoiceItems[0].InvoiceNum,
							email: "",
							salesDocument: "",
							partnerRole: "RE",
							name1: baseModel.getProperty("/partnerName"),
							name2: "",
							name3: "",
							name4: baseModel.getProperty("/partnerName4"),
							street2: baseModel.getProperty("/AddressStreet2"),
							street3: baseModel.getProperty("/AddressStreet3"),
							street5: baseModel.getProperty("/AddressStreet5"),
							district: baseModel.getProperty("/District"),
							differentCity: baseModel.getProperty("/DifferentCity"),
							postalCode: baseModel.getProperty("/postalCode"),
							city: baseModel.getProperty("/city"),
							region: "",
							country: "",
							telephone: baseModel.getProperty("/telephone"),
							mobilePhone: baseModel.getProperty("/mobileNumber"),
							taxId: baseModel.getProperty("/taxId"),
							b_Codes: baseModel.getProperty("/bCode"),
							bpNummr: baseModel.getProperty("/bpNummr")
						}, {
							id: "",
							returnReqNum: "",
							zipCode: "",
							refDocNum: invoiceItems[0].InvoiceNum,
							email: "",
							salesDocument: "",
							partnerRole: "RG",
							name1: baseModel.getProperty("/partnerName"),
							name2: "",
							name3: "",
							name4: baseModel.getProperty("/partnerName4"),
							street2: baseModel.getProperty("/AddressStreet2"),
							street3: baseModel.getProperty("/AddressStreet3"),
							street5: baseModel.getProperty("/AddressStreet5"),
							district: baseModel.getProperty("/District"),
							differentCity: baseModel.getProperty("/DifferentCity"),
							postalCode: baseModel.getProperty("/postalCode"),
							city: baseModel.getProperty("/city"),
							region: "",
							country: "",
							telephone: baseModel.getProperty("/telephone"),
							mobilePhone: baseModel.getProperty("/mobileNumber"),
							taxId: baseModel.getProperty("/taxId"),
							b_Codes: baseModel.getProperty("/bCode"),
							bpNummr: baseModel.getProperty("/bpNummr")
						}];
						payload.exchange.address = address;
					} else {
						var address = [{
							id: "",
							returnReqNum: "",
							zipCode: "",
							refDocNum: baseModel.getProperty("/refDocNum"),
							email: "",
							salesDocument: "",
							partnerRole: "AG",
							name1: baseModel.getProperty("/partnerName"),
							name2: "",
							name3: "",
							name4: baseModel.getProperty("/partnerName4"),
							street2: baseModel.getProperty("/AddressStreet2"),
							street3: baseModel.getProperty("/AddressStreet3"),
							street5: baseModel.getProperty("/AddressStreet5"),
							district: baseModel.getProperty("/District"),
							differentCity: baseModel.getProperty("/DifferentCity"),
							postalCode: baseModel.getProperty("/postalCode"),
							city: baseModel.getProperty("/city"),
							region: "",
							country: "",
							telephone: baseModel.getProperty("/telephone"),
							mobilePhone: baseModel.getProperty("/mobileNumber"),
							taxId: baseModel.getProperty("/taxId"),
							b_Codes: baseModel.getProperty("/bCode"),
							bpNummr: baseModel.getProperty("/bpNummr")
						}, {
							id: "",
							returnReqNum: "",
							zipCode: "",
							refDocNum: baseModel.getProperty("/refDocNum"),
							email: "",
							salesDocument: "",
							partnerRole: "WE",
							name1: baseModel.getProperty("/partnerName"),
							name2: "",
							name3: "",
							name4: baseModel.getProperty("/partnerName4"),
							street2: baseModel.getProperty("/AddressStreet2"),
							street3: baseModel.getProperty("/AddressStreet3"),
							street5: baseModel.getProperty("/AddressStreet5"),
							district: baseModel.getProperty("/District"),
							differentCity: baseModel.getProperty("/DifferentCity"),
							postalCode: baseModel.getProperty("/postalCode"),
							city: baseModel.getProperty("/city"),
							region: "",
							country: "",
							telephone: baseModel.getProperty("/telephone"),
							mobilePhone: baseModel.getProperty("/mobileNumber"),
							taxId: baseModel.getProperty("/taxId"),
							b_Codes: baseModel.getProperty("/bCode"),
							bpNummr: baseModel.getProperty("/bpNummr")
						}, {
							id: "",
							returnReqNum: "",
							zipCode: "",
							refDocNum: baseModel.getProperty("/refDocNum"),
							email: "",
							salesDocument: "",
							partnerRole: "RE",
							name1: baseModel.getProperty("/partnerName"),
							name2: "",
							name3: "",
							name4: baseModel.getProperty("/partnerName4"),
							street2: baseModel.getProperty("/AddressStreet2"),
							street3: baseModel.getProperty("/AddressStreet3"),
							street5: baseModel.getProperty("/AddressStreet5"),
							district: baseModel.getProperty("/District"),
							differentCity: baseModel.getProperty("/DifferentCity"),
							postalCode: baseModel.getProperty("/postalCode"),
							city: baseModel.getProperty("/city"),
							region: "",
							country: "",
							telephone: baseModel.getProperty("/telephone"),
							mobilePhone: baseModel.getProperty("/mobileNumber"),
							taxId: baseModel.getProperty("/taxId"),
							b_Codes: baseModel.getProperty("/bCode"),
							bpNummr: baseModel.getProperty("/bpNummr")
						}, {
							id: "",
							returnReqNum: "",
							zipCode: "",
							refDocNum: baseModel.getProperty("/refDocNum"),
							email: "",
							salesDocument: "",
							partnerRole: "RG",
							name1: baseModel.getProperty("/partnerName"),
							name2: "",
							name3: "",
							name4: baseModel.getProperty("/partnerName4"),
							street2: baseModel.getProperty("/AddressStreet2"),
							street3: baseModel.getProperty("/AddressStreet3"),
							street5: baseModel.getProperty("/AddressStreet5"),
							district: baseModel.getProperty("/District"),
							differentCity: baseModel.getProperty("/DifferentCity"),
							postalCode: baseModel.getProperty("/postalCode"),
							city: baseModel.getProperty("/city"),
							region: "",
							country: "",
							telephone: baseModel.getProperty("/telephone"),
							mobilePhone: baseModel.getProperty("/mobileNumber"),
							taxId: baseModel.getProperty("/taxId"),
							b_Codes: baseModel.getProperty("/bCode"),
							bpNummr: baseModel.getProperty("/bpNummr")
						}];
						payload.exchange.address = address;

					}
				}
			}
			if (this.getView().getModel("returnModel").getData().attachmentObject.length > 0) {
				var attachment = [];
				var attachmentObject = this.getView().getModel("returnModel").getData().attachmentObject;
				for (var j = 0; j < attachmentObject.length; j++) {
					var attach = {
						"docName": attachmentObject[j].fileName,
						"docType": attachmentObject[j].fileType,
						"docData": attachmentObject[j].fileDoc
					};
					attachment.push(attach);
				}

				payload.returns.attachment = attachment;
				// payload.returns.attachment.push(attachment);
			}
			var oHeader = {
				"Content-Type": "application/json;charset=utf-8"
			};
			var oBusyDialog = new sap.m.BusyDialog();
			oBusyDialog.open();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/DKSHJavaService/returnRequestAsync/createReturnRequest", JSON.stringify(payload), true, "POST",
				false,
				false, oHeader);
			oModel.attachRequestCompleted(function (success) {
				oBusyDialog.close();
				if (sap.ui.getCore().getModel("saveDraft")) {
					sap.ui.getCore().getModel("saveDraft").setData("");
				}
				if (success.getSource().getData().status) {
					var orderNO = success.getSource().getData().status.split(" ")[1];
					that.oDefaultDialog = new sap.m.Dialog({
						type: sap.m.DialogType.Message,
						title: "Success",
						content: [new sap.m.Text({
								text: " " + success.getSource().getData().status + "."
							}),
							new sap.m.Text({
								text: " " + that.resourceBundle.getText("Fordetailsclick")
							}),
							new sap.m.Link({
								text: orderNO,
								target: "_top",
								press: function (oEvent) {
									that._wizard.discardProgress(that._wizard.getSteps()[0]);
									that._discardChanges();
									var order = {
										orderNO: orderNO
									};
									var oModelTb = new sap.ui.model.json.JSONModel(order);
									sap.ui.getCore().setModel(oModelTb, "submitRequest");
									var router = sap.ui.core.UIComponent.getRouterFor(that);
									router.navTo("DraftRecord");
								}
							})
						],
						beginButton: new sap.m.Button({

							text: that.resourceBundle.getText("OK"),
							press: function () {
								that._wizard.discardProgress(that._wizard.getSteps()[0]);
								that._discardChanges();
								var router = sap.ui.core.UIComponent.getRouterFor(that);
								router.navTo("DraftRecord");
							}.bind(that)
						}),
						endButton: new sap.m.Button({
							text: that.resourceBundle.getText("Close"),
							press: function () {
								that._wizard.discardProgress(that._wizard.getSteps()[0]);
								that._discardChanges();
								var router = sap.ui.core.UIComponent.getRouterFor(that);
								router.navTo("DraftRecord");
							}.bind(that)
						})
					});

					// to get access to the controller's model
					that.getView().addDependent(that.oDefaultDialog);
					that.oDefaultDialog.open();
				}

				// }
			});
			oModel.attachRequestFailed(function (oEvent) {
				oBusyDialog.close();
				MessageBox.error(oEvent.getParameters().responseText);
			});
		},
		onExit: function () {
			if (this.SoldtoParty) {
				this.SoldtoParty.destroy();
			}
			if (sap.ui.getCore().byId("homeBtn")) {
				sap.ui.getCore().byId("homeBtn").detachPress();
				sap.ui.getCore().byId("homeBtn").attachPress(function (oData) {
					var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
					oCrossAppNavigator.toExternal({
						target: {
							shellHash: "#"
						}
					});
				});
			}
			// 	// {
			// 
			// }
		}

	});

});