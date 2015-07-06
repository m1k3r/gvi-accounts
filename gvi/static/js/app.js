/* This file contains all the js functions of the accounts app, it is divided in the following sections:
    -GENERAL VALIDATIONS
        isNull()
        isNumberInteger()
        isNumberDecimal()

    -ADD ACCOUNT
        SAVE button function    (add account modal)
        jsonAjax()
        CANCEL button function  (add account modal)

    -EDIT ACCOUNT
        editAccount()
        getJson()
        SAVE button function    (edit account modal)
        updateJson()

    -DELETE ACCOUNT
        DELETE button function  (edit account modal)
        NO button function      (edit account modal)
        YES button function     (edit account modal)
        deleteJson()

    -MONEY TRANSFER
        selectSourceAccount()
        selectDestinyAccount()
        validateExchangeRate()
        calculateAmount()
        SAVE button function    (money transfer modal)
        jsonTransfer()
        CANCEL button function  (money transfer modal)

    -ADD CURRENCY
        SAVE button function    (add currency modal)
        jsonAddCurrency()
        CANCEL button function  (add currency modal)

    -DELETE CURRENCY
        currencyDeleteConfirm()
        YES button function     (delete currency modal)
        jsonDeleteCurrency()

    -CSS FUNCTIONS
        cashSelectAddAccount()  (add account modal)
        bankSelectAddAccount()  (add account modal)
        cashSelectEditAccount() (edit account modal)
        bankSelectEditAccount() (edit account modal)
        deleteBtnOver()         (edit account modal)
        deleteBtnOut()          (edit account modal)
        deleteBtnOverYes()      (edit account and delete currency modal)
        deleteBtnOutYes()       (edit account and delete currency modal)
        deleteBtnOverNo()       (edit account and delete currency modal)
        deleteBtnOutNo()        (edit account and delete currency modal)
        cashSelectMoneyTransferSource()     (money transfer modal)
        bankSelectMoneyTransferSource()     (money transfer modal)
        cashSelectMoneyTransferDestiny()    (money transfer modal)
        bankSelectMoneyTransferDestiny()    (money transfer modal)

*/


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

//******************************************* ADD ACCOUNT **************************************************************

//Function triggered by SAVE on the Add Account modal
//Validates fields, creates json and calls jsonAjax() function
$(document).on('click', '#modal_save' ,function (){

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
        jsonAjax(accountData)

    }
});

//Function that receives a json with the New Account info and connects to the backend to add the account
function jsonAjax(lejson){

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
$(document).on('click', '#addAccountCancel' ,function () {

    $('#modalAddAccount').modal('hide');
    $('#modalAddAccount').find('#inputAmount').val('');
    $('#modalAddAccount').find('#inputAccountNo').val('');
    $('#modalAddAccount').find('#inputBank').val('');

    //Set the default account type to Bank
    $('#radioBank').prop('checked', true);
    $('#bankTxtField').css("display", "block");
    $('#accountNoTxtField').css("display", "block");

});

//************************************* ENDS ADD ACCOUNT ***************************************************************

//*************************************** EDIT ACCOUNT *****************************************************************

//Function to fill in information in the Edit Account modal
//Receives the account id, calls getJson() function that returns a json with the account info and fills in the modal fields
function editAccount(id){

    //Get the id from the object
    id = id.attr('id');

    //Get json form backend
    var response = getJson(id);

    response.done(function(data){

        var accountType = data.type;

        // Get data
        if(accountType == "b") {

            var bank = data.bank;
            var accountNo = data.number;
            var amount = data.balance;
            var currency = data.currency;


            //Fill fields
            $("#idAccountEdit").val(id);
            $("#radioBankEdit").prop('checked', true);
            $("#currencySelectEdit").val(currency);
            $("#inputBankEdit").val(bank);
            $("#inputAccountNoEdit").val(accountNo);
            $("#inputAmountEdit").val(amount);
            $('#bankTxtFieldEdit').css("display", "block");
            $('#accountNoTxtFieldEdit').css("display", "block");

        }
        if(accountType == "c"){
            var amount = data.balance;
            var currency = data.currency;

            //Fill fields
            $("#idAccountEdit").val(id);
            $("#radioCashEdit").prop('checked', true);
            $("#currencySelectEdit").val(currency);
            $("#inputAmountEdit").val(amount);
            $('#bankTxtFieldEdit').css("display", "none");
            $('#accountNoTxtFieldEdit').css("display", "none");
        }
    }).fail(function (json) {
        alert("Error 1. Can't reach the server.");
        return;
    });

}

//Function that receives an account id, connects to the backend and return a json with the account info
function getJson(id){

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
$(document).on('click', '#modal_edit' ,function () {

    var accountType = $('input[name=accountTypeRadioEdit]:checked', '#editAccountForm').val();
    var id = $("#idAccountEdit").val();

    //Get data
    if(accountType == "c"){

        var currency = $('#currencySelectEdit').val();
        var amount= $('#inputAmountEdit').val();

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
        updateJson(accountData);

    }
    if(accountType == "b") {
        var currency = $('#currencySelectEdit').val();
        var bank = $('#inputBankEdit').val();
        var account = $('#inputAccountNoEdit').val();
        var amount = $('#inputAmountEdit').val();

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
        updateJson(accountData);
});

//Function that receives a json with the Account info and connects to the backend to edit the account
function updateJson(json){

    $.ajax({
        url : "change_account/", // the endpoint
        type : "POST", // http method
        data : json, // data sent with the post request

        // handle a successful response
        success : function(jsonResponse) {

            // Hides the modal, updates the tables DOM and cleans modal fields
            $('#modalEditAccount').modal('hide');
            $('#modalEditAccount').find('#inputAmountEdit').val('');
            $('#modalEditAccount').find('#inputAccountNoEdit').val('');
            $('#modalEditAccount').find('#inputBankEdit').val('');

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
$(document).on('click', '#modal_editDelete' ,function () {

    $('#modal_editDelete').css("background", "#C61212");
    $('#modal_editDelete').css("color", "#ffffff");
    $('#deleteConfirmation').css("display", "block");
});

//Function triggered by the NO button on the confirmation to delete the account
//Hides the confirmation
$(document).on('click', '#deleteNo' ,function () {

    $('#modal_editDelete').css("background", "#ffffff");
    $('#modal_editDelete').css("color", "#C61212");
    $('#deleteConfirmation').css("display", "none");
});

//Function triggered by the YES button on the confirmation to delete the account
//Hides the confirmation, gets the account id and calls deleteJson() function
$(document).on('click', '#deleteYes' ,function () {

    $('#modal_editDelete').css("background", "#ffffff");
    $('#modal_editDelete').css("color", "#C61212");
    $('#deleteConfirmation').css("display", "none");

    var id = $("#idAccountEdit").val();
    deleteJson(id);
});

//Function that receives the account id and connects to the backend to delete the account
function deleteJson(id){

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
function selectSourceAccount(currency){

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
    $('#labelSourceCurrency').empty();
    $('#labelSourceCurrency').append(label);
}

//Function triggered (onchange) when you select the Destiny Account int the Money Transfer modal
//Updates the destiny currency label on the exchange rate section
function selectDestinyAccount(currency){
    //currency has the account currency+.+account id
    var data = currency.split('.');

    //Set the label
    $('#labelDestinyCurrency').empty();
    $('#labelDestinyCurrency').append(data[0]);
}

//Function triggered when an exchange rate is entered (onmouseup)
//Validates the exchange rate and amount and updates the result of the amount transferred (amount*exchangeRate)
function validateExchangeRate(exchangeRate){

    if(exchangeRate != "") {
        //Validate if the exchange rate is a number
        if (!(exchangeRate.match(/^\d*\.?\d*$/))) {
            alert("The exchange rate must be a number.");
            //Clear the field
            $("#inputExchangeRate").val("");
            return;
        }
    }
    if($("#inputAmountTransfer").val() != ""){
        //Get the amount
        var amount = $("#inputAmountTransfer").val();
        //Validate if the amount is a number
        if (!(amount.match(/^\d*\.?\d*$/))) {
            alert("The amount must be a number.");
            //Clear the field
            $("#inputAmountTransfer").val("");
            return;
        }
        //Get the result of the amount transferred and update the label on the amount section
        var res = amount*exchangeRate;
        $("#inputAmountTransferResult").val(res);
    }
}

//Function triggered when an amount is entered (onmouseup)
//Validates the amount and updates the result of the amount transferred (amount*exchangeRate)
function calculateAmount(amount){

    //Get the exchange rate
    var exchangeRate = $("#inputExchangeRate").val();

    if(amount != "") {
        if(isNull(exchangeRate) == true){

            //Validate if the amount is a number
            if (!(amount.match(/^\d*\.?\d*$/))) {
                alert("The amount must be a number.");
                $("#inputAmountTransfer").val("");
                return;
            }
        }
    }

    ///Get the result of the amount transferred and update the label on the amount section
    var res = amount*exchangeRate;
    $("#inputAmountTransferResult").val(res);

}

//Function triggered by the SAVE button on the Money Transfer modal
//Validates fields, creates json and calls jsonTransfer() function
$(document).on('click', '#btnSaveTransfer' ,function (){

    //Get destiny and source account type
    var sourceType = $('input[name=accountTypeRadioSource]:checked', '#modalMoneyTransfer').val();
    var destinyType = $('input[name=accountTypeRadioDestiny]:checked', '#modalMoneyTransfer').val();

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
        var valSource = $("#sourceBankAccount").val();
        var valSourceArray = valSource.split('.');
        var sourceId = valSourceArray[1];
    }else{
        var valSource = $("#sourceCashAccount").val();
        var valSourceArray = valSource.split('.');
        var sourceId = valSourceArray[1];
    }

    //Get the destiny account id
    //The field value is account currency+.+account id
    if(destinyType == "b"){
        var valDestiny = $("#destinyAccountBank").val();
        var valDestinyArray = valDestiny.split('.');
        var destinyId = valDestinyArray[1];
    }else{
        var valDestiny = $("#destinyAccountCash").val();
        var valDestinyArray = valDestiny.split('.');
        var destinyId = valDestinyArray[1];
    }

    //Get the exchange rate and amount
    var exchangeRate = $("#inputExchangeRate").val();
    var amount = $("#inputAmountTransfer").val();

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
    jsonTransfer(json);

});

//Function that receives the Money Transfer info and connects to the backend to add it
function jsonTransfer(json) {


    $.ajax({
        url: "money_transfer/", // the endpoint
        type: "POST", // http method
        data: json, // data sent with the post request
        dataType: 'json',

        // handle a successful response
        success: function (jsonResponse) {

            // Hides the modal, cleans fields and update the tables DOM
            $('#modalMoneyTransfer').modal('hide');
            $('#modalMoneyTransfer').find('#sourceBankAccount').val('');
            $('#modalMoneyTransfer').find('#sourceCashAccount').val('');
            $('#modalMoneyTransfer').find('#destinyAccountBank').val('');
            $('#modalMoneyTransfer').find('#destinyAccountCash').val('');
            $('#modalMoneyTransfer').find('#inputExchangeRate').val('');
            $('#modalMoneyTransfer').find('#inputAmountTransfer').val('');
            $('#modalMoneyTransfer').find('#inputAmountTransferResult').val('');
            $('#labelDestinyCurrency').empty();
            $('#labelSourceCurrency').empty();
            $('#destinyAccountBank').css("display", "none");
            $('#defaultSelectDestiny').css("display", "block");
            $('#destinyAccountCash').css("display", "none");
            $('#sourceBankAccount').css("display", "none");
            $('#defaultSelectSource').css("display", "block");
            $('#sourceCashAccount').css("display", "none");
            $('#radioBankTransferSource').prop('checked', false);
            $('#radioCashTransferSource').prop('checked', false);
            $('#radioBankTransferDestiny').prop('checked', false);
            $('#radioCashTransferDestiny').prop('checked', false);

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
$(document).on('click', '#moneyTransferCancel' ,function () {

    $('#modalMoneyTransfer').modal('hide');

    //Source account type
    $('#radioBankTransferSource').prop('checked', false);
    $('#radioCashTransferSource').prop('checked', false);

    //Destiny account type
    $('#radioBankTransferDestiny').prop('checked', false);
    $('#radioCashTransferDestiny').prop('checked', false);

    //Source account select
    $('#modalMoneyTransfer').find('#sourceBankAccount').val('');
    $('#modalMoneyTransfer').find('#sourceCashAccount').val('');

    //Destiny account select
    $('#modalMoneyTransfer').find('#destinyAccountBank').val('');
    $('#modalMoneyTransfer').find('#destinyAccountCash').val('');

    //Set the default Destiny Account Select
    $('#defaultSelectDestiny').css("display", "block");
    $('#destinyAccountBank').css("display", "none");
    $('#destinyAccountCash').css("display", "none");

    //Set the default Source Account Select
    $('#defaultSelectSource').css("display", "block");
    $('#sourceBankAccount').css("display", "none");
    $('#sourceCashAccount').css("display", "none");

    //Exchange rate field
    $('#modalMoneyTransfer').find('#inputExchangeRate').val('');

    //Labels for source and destiny currency on exchange rate section
    $('#labelDestinyCurrency').empty();
    $('#labelSourceCurrency').empty();

    //Amount field
    $('#modalMoneyTransfer').find('#inputAmountTransfer').val('');

    //Result amount
    $('#modalMoneyTransfer').find('#inputAmountTransferResult').val('');

});
//*************************************** ENDS MONEY TRANSFER **********************************************************

//******************************************* ADD CURRENCY *************************************************************

//Function triggered by the SAVE button on the Add Currency modal
//Validates fields, creates json and calls jsonAddCurrency() function
$(document).on('click', '#currencySave' ,function () {

    //Get data
    var name = $("#inputName").val();
    var contraction = $("#inputContraction").val();

    //Validations
    if(isNull(name)==false){
        alert("You must enter a name.")
        return;
    }

    if(isNull(contraction)==false){
        alert("You must enter a contraction.")
        return;
    }

    //Connection to backend
    var json = {"name":name, "contraction":contraction};
    jsonAddCurrency(json);
});

//Function that receives the New Currency info and connects to the backend to add it
function jsonAddCurrency(json){

    $.ajax({
        url : "../currencies/", // the endpoint
        type : "POST", // http method
        data : json, // data sent with the post request
        dataType: 'json',

        // handle a successful response
        success : function(jsonResponse) {

            // Hides the modal, cleans fields and update the tables DOM
            $('#modalAddCurrency').modal('hide');
            $('#modalAddCurrency').find('#inputName').val('');
            $('#modalAddCurrency').find('#inputContraction').val('');

            location.reload();

        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {

            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert("Error saving the currency. Please try again or contact the system manager.");
            $('#modalAddCurrency').find('#inputName').val('');
            $('#modalAddCurrency').find('#inputContraction').val('');

        }
    });

    return true;
}

//Function triggered by the CANCEL button on the Add Currency modal
//Hides the modal, cleans all fields
$(document).on('click', '#addCurrencyCancel' ,function () {

    $('#modalAddCurrency').modal('hide');

    $('#modalAddCurrency').find('#inputName').val('');
    $('#modalAddCurrency').find('#inputContraction').val('');

});
//***************************************** ENDS ADD CURRENCY **********************************************************

//****************************************** DELETE CURRENCY ***********************************************************

//Function triggered by the Delete icon on the currencies table
//Receives the currency info and updates the confirmation question
function currencyDeleteConfirm(data){

    //get the currency name and id
    // data is currency id+.+currency name
    data = data.attr('id');
    var arrayData = data.split(".");
    var id = arrayData[0];
    var name = "Are your sure you want to delete the currency "+arrayData[1]+"?";

    //Update fields
    $('#currencyId').val(id);
    $('#labelCurrencyName').empty();
    $('#labelCurrencyName').append(name);

}

//Function triggered by the YES button on the Delete Currency confirmation modal
//Gets the currency id, creates the json and calls jsonDeleteCurrency() function
$(document).on('click', '#currencyDeleteYes' ,function () {

    var id= $('#currencyId').val();
    var json = {"currency_id":id};
    jsonDeleteCurrency(json);

});

//Function that receives the Currency id and connects to the backend to delete the currency
function jsonDeleteCurrency(json){

    $.ajax({
        url : "../currencies/", // the endpoint
        type : "GET", // http method
        data : json, // data sent with the post request
        dataType: 'json',

        // handle a successful response
        success : function(jsonResponse) {

            // Hides the modal and update the tables DOM
            $('#modalDeleteCurrency').modal('hide');
            location.reload();

        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {

            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert("Error deleting the currency. Please try again or contact the system manager.");

        }
    });

    return true;
}
//**************************************** ENDS DELETE CURRENCY ********************************************************

//********************************************* CSS FUNCTIONS **********************************************************

//Add account modal
//Function to hide additional fields when the account type is cash
function cashSelectAddAccount(){
    $('#bankTxtField').css("display", "none");
    $('#accountNoTxtField').css("display", "none");
}

//Add account modal
//Function to display additional fields when the account type is bank
function bankSelectAddAccount(){
    $('#bankTxtField').css("display", "block");
    $('#accountNoTxtField').css("display", "block");
}

//Edit account modal
//Function to hide additional fields when the account type is cash
function cashSelectEditAccount(){
    $('#bankTxtFieldEdit').css("display", "none");
    $('#accountNoTxtFieldEdit').css("display", "none");
}

//Edit account modal
//Function to display additional fields when the account type is bank
function bankSelectEditAccount(){
    $('#bankTxtFieldEdit').css("display", "block");
    $('#accountNoTxtFieldEdit').css("display", "block");
}

//Edit Account modal
//Changes DELETE button styles onmouseover
function deleteBtnOver(id){

    id.css("background", "#C61212");
    id.css("color", "#ffffff");
}

//Edit Account modal
//Changes DELETE button styles onmouseout
function deleteBtnOut(id){
    id.css("background", "#ffffff");
    id.css("color", "#C61212");
}

//Edit Account and Delete Currency modal
//Changes YES button styles onmouseover
function deleteBtnOverYes(id){

    id.css("background", "#C61212");
    id.css("color", "#ffffff");
}

//Edit Account and Delete Currency modal
//Changes YES button styles onmouseout
function deleteBtnOutYes(id){
    id.css("background", "#ffffff");
    id.css("color", "#C61212");
}

//Edit Account and Delete Currency modal
//Changes NO button styles onmouseover
function deleteBtnOverNo(id){
    id.css("background", "darkorange");
    id.css("color", "#ffffff");
}

//Edit Account and Delete Currency modal
//Changes NO button styles onmouseout
function deleteBtnOutNo(id){
    id.css("background", "#ffffff");
    id.css("color", "darkorange");
}


//Money Transfer modal
//Triggered when the Source Account Type is CASH
//Function that displays the source cash accounts select, sets the value to ' ' and hides the bank accounts select
function cashSelectMoneyTransferSource(){

    $('#sourceCashAccount').css("display", "block");
    $('#sourceBankAccount').css("display", "none");
    $('#defaultSelectSource').css("display", "none");

    $('#sourceCashAccount').val('');

    $('#labelSourceCurrency').empty();
}

//Money Transfer modal
//Triggered when the Source Account Type is BANK
//Function that displays the source bank accounts select, sets the value to ' ' and hides the cash accounts select
function bankSelectMoneyTransferSource(){

    $('#sourceBankAccount').css("display", "block");
    $('#defaultSelectSource').css("display", "none");
    $('#sourceCashAccount').css("display", "none");

    $('#sourceBankAccount').val('');

    $('#labelSourceCurrency').empty();
}

//Money Transfer modal
//Triggered when the Destiny Account Type is CASH
//Function that displays the destiny cash accounts select, sets the value to ' ' and hides the bank accounts select
function cashSelectMoneyTransferDestiny(){

    $('#destinyAccountCash').css("display", "block");
    $('#destinyAccountBank').css("display", "none");
    $('#defaultSelectDestiny').css("display", "none");

    $('#destinyAccountCash').val('');

    $('#labelDestinyCurrency').empty();
}

//Money Transfer modal
//Triggered when the Destiny Account Type is BANK
//Function that displays the destiny bank accounts select, sets the value to ' ' and hides the cash accounts select
function bankSelectMoneyTransferDestiny(){

    $('#destinyAccountBank').css("display", "block");
    $('#defaultSelectDestiny').css("display", "none");
    $('#destinyAccountCash').css("display", "none");

    $('#destinyAccountBank').val('');

    $('#labelDestinyCurrency').empty();
}

//*********************************** END CSS FUNCTIONS ****************************************************************







