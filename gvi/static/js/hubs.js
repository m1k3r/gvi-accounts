$(document).ready(function() {
    $(window).load(function() {
        lockSelections();
        datepickers();
        datepickersTransactions();
        loadCategoriesHubs();
        //changeSubcategory();

    });
});

//************************************** GENERAL VALIDATIONS ***********************************************************
//Function to validate if a field or select is null or empty
function isNull(field){
    if (field == '' || field == null) {
        return false;
    }
    else {
        return true;
    }
}

//Function to validate if a field has only number without decimals
function isNumberInteger(field){
    if(field.match(/^[1-9]\d*$/)){
        return true;
    }
    else{
        return false;
    }
}

//Function to validate if a field has only numbers with or without decimals
//(Number can start with zero or decimal and have or not numbers after decimal)
function isNumberDecimal(field){
    //if(field.match(/^[1-9]\d*(\.\d+)?$/)){
    if(field.match(/^\d*\.?\d*$/)){
        return true;
    }else{
        return false;
    }
}
//************************************* END GENERAL VALIDATIONS ********************************************************

//******************************************* ADD HUB ******************************************************************

//Function triggered by the SAVE button on the Add Hub modal
//Validates fields, creates json and calls jsonAddHub() function
$(document).on('click', '#hubSave' ,function () {

    //Get data
    var name = $("#inputName").val();
    var manager = $("#inputManager").val();
    var country = $("#inputCountry").val();

    //Validations
    if(isNull(name)==false){
        alert("You must enter a name.")
        return;
    }

    if(isNull(manager)==false){
        alert("You must enter a manager.")
        return;
    }

    if(isNull(country)==false){
        alert("You must enter a country.")
        return;
    }
    //Connection to backend
    var json = {"name":name, "manager":manager, "country":country};
    jsonAddHub(json);
});

//Function that receives the New Hub info and connects to the backend to add it
function jsonAddHub(json){

    $.ajax({
        url : "hub/", // the endpoint
        type : "POST", // http method
        data : json, // data sent with the post request
        dataType: 'json',

        // handle a successful response
        success : function(jsonResponse) {

            // Hides the modal, cleans fields and update the tables DOM
            $('#modalAddHub').modal('hide');
            $('#modalAddHub').find('#inputName').val('');
            $('#modalAddHub').find('#inputManager').val('');
            $('#modalAddHub').find('#inputCountry').val('');

            location.reload();

        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {

            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert("Error saving the hub. Please try again or contact the system manager.");
            //$('#modalAddHub').find('#inputName').val('');
            //$('#modalAddHub').find('#inputManager').val('');
            //$('#modalAddHub').find('#inputCountry').val('');

        }
    });

    return true;
}

//Function triggered by the CANCEL button on the Add Currency modal
//Hides the modal, cleans all fields
$(document).on('click', '#addHubCancel' ,function () {

    $('#modalAddHub').modal('hide');
    $('#modalAddHub').find('#inputName').val('');
    $('#modalAddHub').find('#inputManager').val('');
    $('#modalAddHub').find('#inputCountry').val('');


});
//***************************************** ENDS ADD HUB ***************************************************************

//******************************************* EDIT HUB *****************************************************************

//Function to fill in information in the Edit Hub modal
//Receives the hub id, calls getJson() function that returns a json with the hub info and fills in the modal fields
function editHub(id){

    //Get the id from the object
    id = id.attr('id');

    //Get json form backend
    var response = getJsonHub(id);

    response.done(function(data){
        var name = data.name;
        var manager = data.manager;
        var country = data.country;

        $("#idHubEdit").val(id);
        $("#inputNameEdit").val(name);
        $("#inputManagerEdit").val(manager);
        $("#inputCountryEdit").val(country);

    }).fail(function (json) {
        alert("Error 1. Can't reach the server.");
        $('#modalEditHub').modal('hide');
    });



}

//Function that receives a hub id, connects to the backend and return a json with the hub info
function getJsonHub(id){

    //Create json with the account id
    var lejson = {'id': id };

    var jxhr = $.ajax({
        url : "hub/", // the endpoint
        type : "GET", // http method
        data : lejson, // data sent with the post request

        // handle a successful response
        success : function(jsonResponse) {

        },
        // handle a non-successful response
        error : function(xhr,errmsg,err) {

            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert("Error connecting to the server. Please try again or contact the system manager.");

        }
    });

    return jxhr;

}

//Function triggered by SAVE on the Edit Hub modal
//Validates fields, creates json and calls updateJson() function
$(document).on('click', '#modal_editHub' ,function () {

    //Get data
    var id = $("#idHubEdit").val();
    var name = $("#inputNameEdit").val();
    var manager = $("#inputManagerEdit").val();
    var country = $("#inputCountryEdit").val();

    console.log
    console.log(id, name, manager, country);


    //Validations
    if(isNull(name)==false){
        alert("You need to enter a name.");
        return;
    }
    if(isNull(manager)==false){
        alert("You need to enter a manager.");
        return;
    }
    if(isNull(country)==false){
        alert("You need to enter a country.");
        return;
    }

    //Connection to backend
    var hubData = {"id":id, "name": name, "manager":manager, "country":country};
    updateJsonHub(hubData);

});

//Function that receives a json with the Account info and connects to the backend to edit the account
function updateJsonHub(lejson){

    $.ajax({
        url : "change_hub/", // the endpoint
        type : "POST", // http method
        data : lejson, // data sent with the post request

        // handle a successful response
        success : function(jsonResponse) {

            // Hides the modal, updates the tables DOM and cleans modal fields
            $('#modalEditHub').modal('hide');
            $('#modalEditHub').find('#inputNameEdit').val('');
            $('#modalEditHub').find('#inputManagerNoEdit').val('');
            $('#modalEditHub').find('#inputCountryEdit').val('');

            location.reload();

        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert("Error editing the hub. Please try again or contact the system manager.");

        }
    });
}

//********************************************* ENDS EDIT HUB **********************************************************

//*********************************************** DELETE HUB ***********************************************************

//Function triggered by the DELETE button on the Edit Hub modal
//Display the confirmation to delete the hub
$(document).on('click', '#edit_deleteHub' ,function () {

    $('#edit_deleteHub').css("background", "#C61212");
    $('#edit_deleteHub').css("color", "#ffffff");
    $('#deleteHubConfirmation').css("display", "block");
});

//Function triggered by the NO button on the confirmation to delete the hub
//Hides the confirmation
$(document).on('click', '#deleteHubNo' ,function () {

    $('#edit_deleteHub').css("background", "#ffffff");
    $('#edit_deleteHub').css("color", "#C61212");
    $('#deleteHubConfirmation').css("display", "none");
});

//Function triggered by the YES button on the confirmation to delete the account
//Hides the confirmation, gets the account id and calls deleteJson() function
$(document).on('click', '#deleteHubYes' ,function () {

    $('#edit_deleteHub').css("background", "#ffffff");
    $('#edit_deleteHub').css("color", "#C61212");
    $('#deleteHubConfirmation').css("display", "none");

    var id = $("#idHubEdit").val();
    deleteJsonHub(id);
});

//Function that receives the hub id and connects to the backend to delete the hub
function deleteJsonHub(id){

    //Create json with the id
    var lejson = {'id': id };

    var jxhr = $.ajax({
        url : "change_hub/", // the endpoint
        type : "GET", // http method
        data : lejson, // data sent with the post request

        // handle a successful response
        success : function(jsonResponse) {

            // Hides the modal and update the tables DOM
            $('#modalEditHub').modal('hide');
            location.reload()

        },
        // handle a non-successful response
        error : function(xhr,errmsg,err) {

            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert("Error deleting the account. Please try again or contact the system manager.");

        }
    });

    return jxhr;
}
//*************************************** ENDS DELETE HUB **********************************************************

//***************************************** ADD ACCOUNT ****************************************************************

//Function triggered by SAVE on the Add Account modal
//Validates fields, creates json and calls jsonAjax() function
$(document).on('click', '#modal_saveDetail' ,function (){

    //Validate account type
    var accountType = $('input[name=accountTypeRadio]:checked', '#addAccountForm').val();

    //Get data according to the account type
    if(accountType == "c"){
        var currency = $('#currencySelect').val();
        var amount= $('#inputAmount').val();

        //Validations
        if(isNull(currency)==false){
            alert("You need to select a currency");
            return;
        }
        if(isNull(amount)==false){
            alert("The field Amount cannot be empty");
            return;
        }
        if(isNumberDecimal(amount)==false){
            alert("The amount must be a number");
            return;
        }

        //Connection to backend
        var accountData = {"account_type": accountType, "balance":amount, "currency":currency};
        jsonAjax(accountData);
    }
    if(accountType == "b"){
        var currency = $('#currencySelect').val();
        var bank= $('#inputBank').val();
        var account= $('#inputAccountNo').val();
        var amount= $('#inputAmount').val();

        //Validations
        if(isNull(currency)==false){
            alert("You need to select a currency");
            return;
        }
        if(isNull(bank)==false){
            alert("The field Bank cannot be empty");
            return;
        }
        if(isNull(account)==false){
            alert("The field Account cannot be empty");
            return;
        }
        if(isNull(amount)==false){
            alert("The field Amount cannot be empty");
            return;
        }
        if(isNumberInteger(account)==false){
            alert("The Account # must be a number without decimals");
            return;
        }
        if(isNumberDecimal(amount)==false){
            alert("The amount must be a number");
            return;
        }

        //Connection to backend
        var accountData={"account_type":accountType, "bank_name":bank, "number":account, "balance":amount, "currency":currency};
        //alert(accountData);
        jsonAjaxDetail(accountData)

    }
});

//Function that receives a json with the New Account info and connects to the backend to add the account
function jsonAjaxDetail(lejson){

    $.ajax({
        url : "create_account/", // the endpoint
        type : "POST", // http method
        data : lejson, // data sent with the post request
        dataType: 'json',

        //Handle a successful response
        success : function(jsonResponse) {

            // Hides the modal, updates the tables DOM and cleans the modal fields
            $('#modalAddAccount').modal('hide');
            $('#modalAddAccount').find('#inputAmount').val('');
            $('#modalAddAccount').find('#inputAccountNo').val('');
            $('#modalAddAccount').find('#inputBank').val('');

            var balance = parseInt(lejson.balance).toFixed(2);

            location.reload();
        },

        //Handle a non-successful response
        error : function(xhr,errmsg,err) {

            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert("Error saving the account. Please try again or contact the system manager.");

            // Hides the modal and cleans the modal fields
            $('#modalAddAccount').modal('hide');
            $('#modalAddAccount').find('#inputAmount').val('');
            $('#modalAddAccount').find('#inputAccountNo').val('');
            $('#modalAddAccount').find('#inputBank').val('');

        }
    });

    return true;
}

//Function triggered by the CANCEL button on the Add Account modal
//Hides the modal, cleans fields
$(document).on('click', '#addAccountCancelDetail' ,function () {

    $('#modalAddAccount').modal('hide');
    $('#modalAddAccount').find('#inputAmount').val('');
    $('#modalAddAccount').find('#inputAccountNo').val('');
    $('#modalAddAccount').find('#inputBank').val('');

    //Set the default account type to Bank
    $('#radioBank').prop('checked', true);
    $('#bankTxtField').css("display", "block");
    $('#accountNoTxtField').css("display", "block");

});

//*************************************** ENDS ADD ACCOUNT *************************************************************

//*************************************** EDIT ACCOUNT *****************************************************************

//Function to fill in information in the Edit Account modal
//Receives the account id, calls getJson() function that returns a json with the account info and fills in the modal fields
function editAccountDetail(id){

    //Get the id from the object
    id = id.attr('id');

    //Get json form backend
    var response = getJsonDetail(id);

    response.done(function(data){

        var accountType = data.type;

        // Get data
        if(accountType == "b") {

            var bank = data.bank;
            var accountNo = data.number;
            var amount = data.balance;
            var currency = data.currency;


            //Fill fields
            $("#idAccountEditDetail").val(id);
            $("#radioBankEditDetail").prop('checked', true);
            $("#currencySelectEditDetail").val(currency);
            $("#inputBankEditDetail").val(bank);
            $("#inputAccountNoEditDetail").val(accountNo);
            $("#inputAmountEditDetail").val(amount);
            $('#bankTxtFieldEditDetail').css("display", "block");
            $('#accountNoTxtFieldEditDetail').css("display", "block");

        }
        if(accountType == "c"){
            var amount = data.balance;
            var currency = data.currency;

            //Fill fields
            $("#idAccountEditDetail").val(id);
            $("#radioCashEditDetail").prop('checked', true);
            $("#currencySelectEditDetail").val(currency);
            $("#inputAmountEditDetail").val(amount);
            $('#bankTxtFieldEditDetail').css("display", "none");
            $('#accountNoTxtFieldEditDetail').css("display", "none");
        }
    }).fail(function (json) {
        alert("Error 1. Can't reach the server.");
        return;
    });

}

//Function that receives an account id, connects to the backend and return a json with the account info
function getJsonDetail(id){

    //Create json with the account id
    var lejson = {'id': id };

    var jxhr = $.ajax({
        url : "create_account/", // the endpoint
        type : "GET", // http method
        data : lejson, // data sent with the post request

        // handle a successful response
        success : function(jsonResponse) {

        },
        // handle a non-successful response
        error : function(xhr,errmsg,err) {

            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert("Error connecting to the server. Please try again or contact the system manager.");

        }
    });

    return jxhr;

}

//Function triggered by SAVE on the Edit Account modal
//Validates fields, creates json and calls updateJson() function
$(document).on('click', '#modal_editDetail' ,function () {

    var accountType = $('input[name=accountTypeRadioEditDetail]:checked', '#editAccountFormDetail').val();
    var id = $("#idAccountEditDetail").val();

    //Get data
    if(accountType == "c"){

        var currency = $('#currencySelectEditDetail').val();
        var amount= $('#inputAmountEditDetail').val();

        //Validations
        if(isNull(currency)==false){
            console.log("in currency");
            alert("You need to select a Currency");
            return;
        }
        if(isNull(amount)==false){
            console.log("in amount");
            alert("The field Amount cannot be empty");
            return;
        }
        if(isNumberDecimal(amount)==false){
            console.log("in number");
            alert("The amount must be a number");
            return;
        }

        //Connection to backend
        var accountData = {"id":id, "account_type": accountType, "balance":amount, "currency":currency};
        updateJsonDetail(accountData);

    }
    if(accountType == "b") {
        var currency = $('#currencySelectEditDetail').val();
        var bank = $('#inputBankEditDetail').val();
        var account = $('#inputAccountNoEditDetail').val();
        var amount = $('#inputAmountEditDetail').val();

        //Validations
        if (isNull(currency) == false) {
            alert("You need to select a currency");
            return;
        }
        if (isNull(bank) == false) {
            alert("The field Bank cannot be empty");
            return;
        }
        if (isNull(account) == false) {
            alert("The field Account cannot be empty");
            return;
        }
        if (isNull(amount) == false) {
            alert("The field amount cannot be empty");
            return;
        }
        if (isNumberInteger(account) == false) {
            alert("The Account # must be a number without decimals");
            return;
        }
        if (isNumberDecimal(amount) == false) {
            alert("The Amount must be a number");
            return;
        }
    }

        //Connection to backend
        var accountData={"id":id, "account_type":accountType, "bank_name":bank, "number":account, "balance":amount, "currency":currency};
        updateJsonDetail(accountData);
});

//Function that receives a json with the Account info and connects to the backend to edit the account
function updateJsonDetail(json){

    $.ajax({
        url : "change_account/", // the endpoint
        type : "POST", // http method
        data : json, // data sent with the post request

        // handle a successful response
        success : function(jsonResponse) {

            // Hides the modal, updates the tables DOM and cleans modal fields
            $('#modalEditAccountDetail').modal('hide');
            $('#modalEditAccountDetail').find('#inputAmountEditDetail').val('');
            $('#modalEditAccountDetail').find('#inputAccountNoEditDetail').val('');
            $('#modalEditAccountDetail').find('#inputBankEditDetail').val('');

            location.reload();

        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert("Error editing the account. Please try again or contact the system manager.");

        }
    });
}

//***************************************** ENDS EDIT ACCOUNT **********************************************************

//******************************************* DELETE ACCOUNT ***********************************************************

//Function triggered by the DELETE button on the Edit Account modal
//Display the confirmation to delete the account
$(document).on('click', '#modal_editDeleteDetail' ,function () {

    $('#modal_editDeleteDetail').css("background", "#C61212");
    $('#modal_editDeleteDetail').css("color", "#ffffff");
    $('#deleteConfirmationDetail').css("display", "block");
});

//Function triggered by the NO button on the confirmation to delete the account
//Hides the confirmation
$(document).on('click', '#deleteNoDetail' ,function () {

    $('#modal_editDeleteDetail').css("background", "#ffffff");
    $('#modal_editDeleteDetail').css("color", "#C61212");
    $('#deleteConfirmationDetail').css("display", "none");
});

//Function triggered by the YES button on the confirmation to delete the account
//Hides the confirmation, gets the account id and calls deleteJson() function
$(document).on('click', '#deleteYesDetail' ,function () {

    $('#modal_editDeleteDetail').css("background", "#ffffff");
    $('#modal_editDeleteDetail').css("color", "#C61212");
    $('#deleteConfirmationDetail').css("display", "none");

    var id = $("#idAccountEditDetail").val();
    deleteJsonDetail(id);
});

//Function that receives the account id and connects to the backend to delete the account
function deleteJsonDetail(id){

    //Create json with the id
    var lejson = {'id': id };

    var jxhr = $.ajax({
        url : "change_account/", // the endpoint
        type : "GET", // http method
        data : lejson, // data sent with the post request

        // handle a successful response
        success : function(jsonResponse) {

            // Hides the modal and update the tables DOM
            $('#modalEditAccount').modal('hide');
            location.reload()

        },
        // handle a non-successful response
        error : function(xhr,errmsg,err) {

            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert("Error deleting the account. Please try again or contact the system manager.");

        }
    });

    return jxhr;
}
//*************************************** ENDS DELETE ACCOUNT **********************************************************

//***************************************** MONEY TRANSFER *************************************************************

//Function triggered (onchange) when you select the Source Account int the Money Transfer modal
//Updates the source currency label on the exchange rate section
function selectSourceAccountAddMoney(currency){

    //currency has the account currency+.+account id
    //Get the account currency
    var data = currency.split('.');
    var lastChar = data[0].slice(-1);

    //If the currency is in plural, delete the last "s"
    if(lastChar == "s"){
        var curr = data[0].slice(0, -1);
    }

    //Create the label to look like --> "1 Dollar ="
    var label = "1 "+curr+" =";

    //Set the label
    $('#labelSourceCurrencyAddMoney').empty();
    $('#labelSourceCurrencyAddMoney').append(label);
}

//Function triggered (onchange) when you select the Destiny Account int the Money Transfer modal
//Updates the destiny currency label on the exchange rate section
function selectDestinyAccountAddMoney(currency){
    //currency has the account currency+.+account id
    var data = currency.split('.');

    //Set the label
    $('#labelDestinyCurrencyAddMoney').empty();
    $('#labelDestinyCurrencyAddMoney').append(data[0]);
}

//Function triggered when an exchange rate is entered (onmouseup)
//Validates the exchange rate and amount and updates the result of the amount transferred (amount*exchangeRate)
function validateExchangeRateAddMoney(exchangeRate){

    if(exchangeRate != "") {
        //Validate if the exchange rate is a number
        if (!(exchangeRate.match(/^\d*\.?\d*$/))) {
            alert("The exchange rate must be a number.");
            //Clear the field
            $("#inputExchangeRateAddMoney").val("");
            return;
        }
    }
    if($("#inputAmountTransferAddMoney").val() != ""){
        //Get the amount
        var amount = $("#inputAmountTransferAddMoney").val();
        //Validate if the amount is a number
        if (!(amount.match(/^\d*\.?\d*$/))) {
            alert("The amount must be a number.");
            //Clear the field
            $("#inputAmountTransferAddMoney").val("");
            return;
        }
        //Get the result of the amount transferred and update the label on the amount section
        var res = amount*exchangeRate;
        $("#inputAmountTransferResultAddMoney").val(res);
    }
}

//Function triggered when an amount is entered (onmouseup)
//Validates the amount and updates the result of the amount transferred (amount*exchangeRate)
function calculateAmountAddMoney(amount){

    //Get the exchange rate
    var exchangeRate = $("#inputExchangeRateAddMoney").val();

    if(amount != "") {
        if(isNull(exchangeRate) == true){

            //Validate if the amount is a number
            if (!(amount.match(/^\d*\.?\d*$/))) {
                alert("The amount must be a number.");
                $("#inputAmountTransferAddMoney").val("");
                return;
            }
        }
    }

    ///Get the result of the amount transferred and update the label on the amount section
    var res = amount*exchangeRate;
    $("#inputAmountTransferResultAddMoney").val(res);

}

//Function triggered by the SAVE button on the Money Transfer modal
//Validates fields, creates json and calls jsonTransfer() function
$(document).on('click', '#btnSaveAddMoney' ,function (){

    //Get destiny and source account type
    var sourceType = $('input[name=accountTypeRadioSourceAddMoney]:checked', '#modalAddMoney').val();
    var destinyType = $('input[name=accountTypeRadioDestinyAddMoney]:checked', '#modalAddMoney').val();

    //Validate destiny and source account types
    if(isNull(sourceType)==false){
        alert("You must select a Source Account type (bank/cash).");
        return;
    }
    if(isNull(destinyType)==false){
        alert("You must select a Destiny Account type (bank/cash).");
        return;
    }

    //Get the source account id
    //The field value is account currency+.+account id
    if(sourceType == "b"){
        var valSource = $("#sourceBankAccountAddMoney").val();
        var valSourceArray = valSource.split('.');
        var sourceId = valSourceArray[1];
    }else{
        var valSource = $("#sourceCashAccountAddMoney").val();
        var valSourceArray = valSource.split('.');
        var sourceId = valSourceArray[1];
    }

    //Get the destiny account id
    //The field value is account currency+.+account id
    if(destinyType == "b"){
        var valDestiny = $("#destinyAccountBankAddMoney").val();
        var valDestinyArray = valDestiny.split('.');
        var destinyId = valDestinyArray[1];
    }else{
        var valDestiny = $("#destinyAccountCashAddMoney").val();
        var valDestinyArray = valDestiny.split('.');
        var destinyId = valDestinyArray[1];
    }

    //Get the exchange rate and amount
    var exchangeRate = $("#inputExchangeRateAddMoney").val();
    var amount = $("#inputAmountTransferAddMoney").val();

    //Validations
    if(isNull(sourceId)==false){
        alert("You must select a source account.");
        return;
    }

    if(isNull(destinyId)==false){
        alert("You must select a destiny account.");
        return;
    }

    if(isNull(exchangeRate) == false){
        alert("You must enter an exchange rate.");
        return;
    }

    if(isNumberDecimal(exchangeRate)==false){
        alert("The exchange rate must be a number1.");
        return;
    }

    if(isNull(amount)==false){
        alert("You must enter an amount.");
        return;
    }

    if(isNumberDecimal(amount)==false){
        alert("The amount must be a number.");
        return;
    }

    //Connection to the backend
    var json = {"source_id":sourceId, "target_id":destinyId, "amount":amount, "rate":exchangeRate};
    jsonAddMoney(json);

});

//Function that receives the Money Transfer info and connects to the backend to add it
function jsonAddMoney(json) {


    $.ajax({
        url: "money_transfer/", // the endpoint
        type: "POST", // http method
        data: json, // data sent with the post request
        dataType: 'json',

        // handle a successful response
        success: function (jsonResponse) {

            // Hides the modal, cleans fields and update the tables DOM
            $('#modalAddMoney').modal('hide');
            $('#modalAddMoney').find('#sourceBankAccountAddMoney').val('');
            $('#modalAddMoney').find('#sourceCashAccountAddMoney').val('');
            $('#modalAddMoney').find('#destinyAccountBankAddMoney').val('');
            $('#modalAddMoney').find('#destinyAccountCashAddMoney').val('');
            $('#modalAddMoney').find('#inputExchangeRateAddMoney').val('');
            $('#modalAddMoney').find('#inputAmountTransferAddMoney').val('');
            $('#modalAddMoney').find('#inputAmountTransferResultAddMoney').val('');
            $('#labelDestinyCurrencyAddMoney').empty();
            $('#labelSourceCurrencyAddMoney').empty();
            $('#destinyAccountBankAddMoney').css("display", "none");
            $('#defaultSelectDestinyAddMoney').css("display", "block");
            $('#destinyAccountCashAddMoney').css("display", "none");
            $('#sourceBankAccountAddMoney').css("display", "none");
            $('#defaultSelectSourceAddMoney').css("display", "block");
            $('#sourceCashAccountAddMoney').css("display", "none");
            $('#radioBankTransferSourceAddMoney').prop('checked', false);
            $('#radioCashTransferSourceAddMoney').prop('checked', false);
            $('#radioBankTransferDestinyAddMoney').prop('checked', false);
            $('#radioCashTransferDestinyAddMoney').prop('checked', false);

            location.reload();

        },

        // handle a non-successful response
        error: function (xhr, errmsg, err) {

            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert("Error saving the Money Transfer. Please try again or contact the system manager.");


        }
    });
}

//Function triggered by the CANCEL button on the Money Transfer modal
//Hides the modal, cleans all fields
$(document).on('click', '#addMoneyCancel' ,function () {

    $('#modalAddMoney').modal('hide');

    //Source account type
    $('#radioBankTransferSourceAddMoney').prop('checked', false);
    $('#radioCashTransferSourceAddMoney').prop('checked', false);

    //Destiny account type
    $('#radioBankTransferDestinyAddMoney').prop('checked', false);
    $('#radioCashTransferDestinyAddMoney').prop('checked', false);

    //Source account select
    $('#modalAddMoney').find('#sourceBankAccountAddMoney').val('');
    $('#modalAddMoney').find('#sourceCashAccountAddMoney').val('');

    //Destiny account select
    $('#modalAddMoney').find('#destinyAccountBankAddMoney').val('');
    $('#modalAddMoney').find('#destinyAccountCashAddMoney').val('');

    //Set the default Destiny Account Select
    $('#defaultSelectDestinyAddMoney').css("display", "block");
    $('#destinyAccountBankAddMoney').css("display", "none");
    $('#destinyAccountCashAddMoney').css("display", "none");

    //Set the default Source Account Select
    $('#defaultSelectSourceAddMoney').css("display", "block");
    $('#sourceBankAccountAddMoney').css("display", "none");
    $('#sourceCashAccountAddMoney').css("display", "none");

    //Exchange rate field
    $('#modalAddMoney').find('#inputExchangeRateAddMoney').val('');

    //Labels for source and destiny currency on exchange rate section
    $('#labelDestinyCurrencyAddMoney').empty();
    $('#labelSourceCurrencyAddMoney').empty();

    //Amount field
    $('#modalAddMoney').find('#inputAmountTransferAddMoney').val('');

    //Result amount
    $('#modalAddMoney').find('#inputAmountTransferResultAddMoney').val('');

});
//*************************************** ENDS MONEY TRANSFER **********************************************************
//Edit account modal
//Function to hide additional fields when the account type is cash
function cashSelectEditAccountDetail(){
    $('#bankTxtFieldEditDetail').css("display", "none");
    $('#accountNoTxtFieldEditDetail').css("display", "none");
}

//Edit account modal
//Function to display additional fields when the account type is bank
function bankSelectEditAccountDetail(){
    $('#bankTxtFieldEditDetail').css("display", "block");
    $('#accountNoTxtFieldEditDetail').css("display", "block");
}

//Money Transfer modal
//Triggered when the Source Account Type is CASH
//Function that displays the source cash accounts select, sets the value to ' ' and hides the bank accounts select
function cashSelectMoneyTransferSourceAddMoney(){

    $('#sourceCashAccountAddMoney').css("display", "block");
    $('#sourceBankAccountAddMoney').css("display", "none");
    $('#defaultSelectSourceAddMoney').css("display", "none");

    $('#sourceCashAccountAddMoney').val('');

    $('#labelSourceCurrencyAddMoney').empty();
}

//Money Transfer modal
//Triggered when the Source Account Type is BANK
//Function that displays the source bank accounts select, sets the value to ' ' and hides the cash accounts select
function bankSelectMoneyTransferSourceAddMoney(){

    $('#sourceBankAccountAddMoney').css("display", "block");
    $('#defaultSelectSourceAddMoney').css("display", "none");
    $('#sourceCashAccountAddMoney').css("display", "none");

    $('#sourceBankAccountAddMoney').val('');

    $('#labelSourceCurrencyAddMoney').empty();
}

//Money Transfer modal
//Triggered when the Destiny Account Type is CASH
//Function that displays the destiny cash accounts select, sets the value to ' ' and hides the bank accounts select
function cashSelectMoneyTransferDestinyAddMoney(){

    $('#destinyAccountCashAddMoney').css("display", "block");
    $('#destinyAccountBankAddMoney').css("display", "none");
    $('#defaultSelectDestinyAddMoney').css("display", "none");

    $('#destinyAccountCashAddMoney').val('');

    $('#labelDestinyCurrencyAddMoney').empty();
}

//Money Transfer modal
//Triggered when the Destiny Account Type is BANK
//Function that displays the destiny bank accounts select, sets the value to ' ' and hides the cash accounts select
function bankSelectMoneyTransferDestinyAddMoney(){

    $('#destinyAccountBankAddMoney').css("display", "block");
    $('#defaultSelectDestinyAddMoney').css("display", "none");
    $('#destinyAccountCashAddMoney').css("display", "none");

    $('#destinyAccountBankAddMoney').val('');

    $('#labelDestinyCurrencyAddMoney').empty();
}

var categories;

function loadCategoriesHubs(){

    console.log("STUUUUUF");

    $.ajax({
        url : "../../../../transactions/cats_subs/", // the endpoint
        type : "GET", // http method
        // data : json, // data sent with the post request
        // dataType: 'json',

        // handle a successful response
        success : function(jsonResponse) {

            var category = '#categorySelect';
            var subcategory = '#subcategorySelect';

            var obj;
            obj = jsonResponse;
            categories = obj;
            console.log(JSON.stringify(obj));

            var categoryVal = $(category).val();
                $(subcategory).empty();
                $.each(obj[categoryVal], function(i, item) {
                    $(subcategory).append($('<option>', { item : i }).text(item));

                });

            $(category).change(function() {

                var categoryVal = $(category).val();
                $(subcategory).empty();
                $.each(obj[categoryVal], function(i, item) {
                    $(subcategory).append($('<option>', { item : i }).text(item));

                });
            });

        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {

            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            console.log("Error loading Categories JSON IN HUBS");

        }
    });
}
