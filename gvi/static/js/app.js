
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
function isNumberDecimal(field){
    if(field.match(/^[1-9]\d*(\.\d+)?$/)){
        return true;
    }else{
        return false;
    }
}

//Function that receives a json and connects to the backend

function jsonAjax(lejson){
    console.log("Entra a funcion");
    console.log(lejson);
    console.log(JSON.stringify(lejson));

    $.ajax({
        url : "create_account/", // the endpoint
        type : "POST", // http method
        data : lejson, // data sent with the post request
        dataType: 'json',

        // handle a successful response
        success : function(jsonResponse) {

            // Hides the modal and update the tables DOM

            console.log(jsonResponse); // log the returned json to the console
            console.log("success"); // another sanity check


            $('#modalAddAccount').modal('hide');
            $('#modalAddAccount').find('#inputAmount').val('');
            $('#modalAddAccount').find('#inputAccountNo').val('');
            $('#modalAddAccount').find('#inputBank').val('');

            var balance = parseInt(lejson.balance).toFixed(2);

            if(lejson.account_type == 'c'){
                console.log('Cambiar la tabla de Cash');
                // This code was used to manipulated the DOM and add the new account into the table.
                /*$('#cashAccounts').append('<tr id='+ jsonResponse.pk +'><td hidden id="pk">'+ jsonResponse.pk + '</td>' +
                                          '<td>' + lejson.currency + '</td><td>' + balance + '</td>' +
                                          '<td><a class="glyphicon glyphicon-pencil" ' +
                    'data-toggle="modal" data-target="#modalEditAccount" onclick="editAccount()"></a></td></tr>');*/
                location.reload();

            }
            else {
                console.log('Cambiar la tabla de Bank');
                location.reload()
            }

        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {

            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert("Error saving the account. Please try again or contact the system manager.");

            $('#modalAddAccount').modal('hide');
            $('#modalAddAccount').find('#inputAmount').val('');
            $('#modalAddAccount').find('#inputAccountNo').val('');
            $('#modalAddAccount').find('#inputBank').val('');

        }
    });

    return true;
}

//Function to SAVE info from the New Account modal
$(document).on('click', '#modal_save' ,function (){

    //Validate account type
    var accountType = $('input[name=accountTypeRadio]:checked', '#addAccountForm').val();

    console.log("Despues accountType");
    console.log(accountType);

    //Get data
    if(accountType == "c"){

        console.log("EN SAVE CCCC");

        var currency = $('#currencySelect').val();
        var amount= $('#inputAmount').val();

        //Validations
        if(isNull(currency)==false){
            console.log("in currency");
            alert("You need to select a currency");
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
        var accountData = {"account_type": accountType, "balance":amount, "currency":currency};
        /*if(jsonAjax(accountData)==false){
         alert("Error saving the account, can't reach the server. Please try again or contact the system manager.");
         return false;
         }*/
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
            alert("The field amount cannot be empty");
            return;
        }
        if(isNumberInteger(account)==false){
            alert("The Account # must be a number without decimals");
            return;
        }
        if(isNumberDecimal(amount)==false){
            alert("The Amount must be a number");
            return;
        }


        //Connection to backend
        var accountData={"account_type":accountType, "bank_name":bank, "number":account, "balance":amount, "currency":currency};

        jsonAjax(accountData)




    }


});

function getJson(id){
    //var prueba='{"account_type":"b", "bank_name":"CACA", "number":"123456", "balance":"500.00", "currency":"Pesos"}';
    //var prueba='{"account_type":"c", "balance":"1000.00", "currency":"Pounds"}';
    //alert(id)
    var lejson = {'id': id };

    var jxhr = $.ajax({
        url : "create_account/", // the endpoint
        type : "GET", // http method
        data : lejson, // data sent with the post request

        // handle a successful response
        success : function(jsonResponse) {

            // Hides the modal and update the tables DOM

            console.log(jsonResponse); // log the returned json to the console
            console.log("success"); // another sanity check

        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {

            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert("Error saving the account. Please try again or contact the system manager.");


        }
    });

    return jxhr;

    //return null;
}


function updateJson(json){
    //var prueba='{"account_type":"b", "bank_name":"CACA", "number":"123456", "balance":"500.00", "currency":"Pesos"}';
    //var prueba='{"account_type":"c", "balance":"1000.00", "currency":"Pounds"}';
    //alert(id)

    $.ajax({
        url : "change_account/", // the endpoint
        type : "POST", // http method
        data : json, // data sent with the post request

        // handle a successful response
        success : function(jsonResponse) {

            // Hides the modal and update the tables DOM
            $('#modalEditAccount').modal('hide');
            $('#modalEditAccount').find('#inputAmountEdit').val('');
            $('#modalEditAccount').find('#inputAccountNoEdit').val('');
            $('#modalEditAccount').find('#inputBankEdit').val('');

            //var balance = parseInt(lejson.balance).toFixed(2);

            if(json.account_type == 'c'){
                location.reload();

            }
            else {
                console.log('Cambiar la tabla de Bank');
                location.reload()
            }

            console.log(jsonResponse); // log the returned json to the console
            console.log("success"); // another sanity check

        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {

            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert("Error editing the account. Please try again or contact the system manager.");

        }
    });

    //return null;
}

//Function to EDIT account info
function editAccount(id){
    id = id.attr('id');
    //var lejson = {'id': id };

    // get json form backend
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

$(document).on('click', '#modal_edit' ,function () {

    //Validate account type


    var accountType = $('input[name=accountTypeRadioEdit]:checked', '#editAccountForm').val();

    var id = $("#idAccountEdit").val();
    //Get data
    if(accountType == "c"){

        var currency = $('#currencySelectEdit').val();
        var amount= $('#inputAmountEdit').val();

        //Validations
        if(isNull(currency)==false){
            console.log("in currency");
            alert("You need to select a currency");
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

        /*if(jsonAjax(accountData)==false){
         alert("Error saving the account, can't reach the server. Please try again or contact the system manager.");
         return false;
         }*/
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

$(document).on('click', '#modal_editDelete' ,function () {
    $('#modal_editDelete').css("background", "#C61212");
    $('#modal_editDelete').css("color", "#ffffff");
    $('#deleteConfirmation').css("display", "block");
});

$(document).on('click', '#deleteNo' ,function () {
    $('#modal_editDelete').css("background", "#ffffff");
    $('#modal_editDelete').css("color", "#C61212");
    $('#deleteConfirmation').css("display", "none");
});

$(document).on('click', '#deleteYes' ,function () {
    $('#modal_editDelete').css("background", "#ffffff");
    $('#modal_editDelete').css("color", "#C61212");
    $('#deleteConfirmation').css("display", "none");

    var id = $("#idAccountEdit").val();
    deleteJson(id);
});

function deleteJson(id){
    var lejson = {'id': id };

    var jxhr = $.ajax({
        url : "change_account/", // the endpoint
        type : "GET", // http method
        data : lejson, // data sent with the post request

        // handle a successful response
        success : function(jsonResponse) {

            // Hides the modal and update the tables DOM

            console.log(jsonResponse); // log the returned json to the console
            console.log("success"); // another sanity check
            $('#modalEditAccount').modal('hide');
            location.reload()

        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {

            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert("Error saving the account. Please try again or contact the system manager.");


        }
    });

    return jxhr;
}

//Function to hide additional fields when the account type is cash
function cashSelectAddAccount(){
    $('#bankTxtField').css("display", "none");
    $('#accountNoTxtField').css("display", "none");
}

//Function to display additional fields when the account type is bank
function bankSelectAddAccount(){
    $('#bankTxtField').css("display", "block");
    $('#accountNoTxtField').css("display", "block");
}

function cashSelectEditAccount(){
    $('#bankTxtFieldEdit').css("display", "none");
    $('#accountNoTxtFieldEdit').css("display", "none");
}

//Function to display additional fields when the account type is bank
function bankSelectEditAccount(){
    $('#bankTxtFieldEdit').css("display", "block");
    $('#accountNoTxtFieldEdit').css("display", "block");
}

function deleteBtnOver(){
    $('#modal_editDelete').css("background", "#C61212");
    $('#modal_editDelete').css("color", "#ffffff");
}

function deleteBtnOut(){
    $('#modal_editDelete').css("background", "#ffffff");
    $('#modal_editDelete').css("color", "#C61212");
}

function deleteBtnOverYes(){
    $('#deleteYes').css("background", "#C61212");
    $('#deleteYes').css("color", "#ffffff");
}

function deleteBtnOutYes(){
    $('#deleteYes').css("background", "#ffffff");
    $('#deleteYes').css("color", "#C61212");
}

function deleteBtnOverNo(){
    $('#deleteNo').css("background", "darkorange");
    $('#deleteNo').css("color", "#ffffff");
}

function deleteBtnOutNo(){
    $('#deleteNo').css("background", "#ffffff");
    $('#deleteNo').css("color", "darkorange");
}


function cashSelectMoneyTransferSource(){
    $('#sourceBankAccount').css("display", "none");
    $('#defaultSelectSource').css("display", "none");
    $('#sourceCashAccount').css("display", "block");
    $('#sourceCashAccount').val('');
    $('#labelSourceCurrency').empty();
}

function bankSelectMoneyTransferSource(){
    $('#sourceBankAccount').css("display", "block");
    $('#defaultSelectSource').css("display", "none");
    $('#sourceCashAccount').css("display", "none");
    $('#sourceBankAccount').val('');
    $('#labelSourceCurrency').empty();
}

function cashSelectMoneyTransferDestiny(){
    $('#destinyAccountBank').css("display", "none");
    $('#defaultSelectDestiny').css("display", "none");
    $('#destinyAccountCash').css("display", "block");
    $('#destinyAccountCash').val('');
    $('#labelDestinyCurrency').empty();
}

function bankSelectMoneyTransferDestiny(){
    $('#destinyAccountBank').css("display", "block");
    $('#defaultSelectDestiny').css("display", "none");
    $('#destinyAccountCash').css("display", "none");
    $('#destinyAccountBank').val('');
    $('#labelDestinyCurrency').empty();
}

function selectSourceAccount(currency){
    var data = currency.split('.');
    $('#labelSourceCurrency').empty();
    $('#labelSourceCurrency').append(data[0]);
}

function selectDestinyAccount(currency){
    var data = currency.split('.');
    $('#labelDestinyCurrency').empty();
    $('#labelDestinyCurrency').append(data[0]);
}

function calculateAmount(amount){

    var exchangeRate = $("#inputExchangeRate").val();

    if(isNull(exchangeRate) == false){
        alert("You must enter an exchange rate.");
        $("#inputAmountTransfer").val("");
        return;
    }
    if(amount != "") {
        if (!(amount.match(/^\d*\.?\d*$/))) {
            alert("The amount must be a number.");
            $("#inputAmountTransfer").val("");
            return;
        }
    }
    var res = amount*exchangeRate;
    $("#inputAmountTransferResult").val(res);

}

function validateExchangeRate(exchangeRate){
    if(exchangeRate != "") {
        if (!(exchangeRate.match(/^\d*\.?\d*$/))) {
            alert("The exchange rate must be a number.");
            $("#inputExchangeRate").val("");
            return;
        }
    }
}

$(document).on('click', '#btnSaveTransfer' ,function (){

    var sourceType = $('input[name=accountTypeRadioSource]:checked', '#modalMoneyTransfer').val();
    var destinyType = $('input[name=accountTypeRadioDestiny]:checked', '#modalMoneyTransfer').val();

    if(isNull(sourceType)==false){
        alert("You must select a Source Account type (bank/cash).");
        return;
    }

    if(isNull(destinyType)==false){
        alert("You must select a Destiny Account type (bank/cash).");
        return;
    }

    if(sourceType == "b"){
        var valSource = $("#sourceBankAccount").val();
        var valSourceArray = valSource.split('.');
        var sourceId = valSourceArray[1];
    }else{
        var valSource = $("#sourceCashAccount").val();
        var valSourceArray = valSource.split('.');
        var sourceId = valSourceArray[1];
    }

    if(destinyType == "b"){
        var valDestiny = $("#destinyAccountBank").val();
        var valDestinyArray = valDestiny.split('.');
        var destinyId = valDestinyArray[1];
    }else{
        var valDestiny = $("#destinyAccountCash").val();
        var valDestinyArray = valDestiny.split('.');
        var destinyId = valDestinyArray[1];
    }

    var exchangeRate = $("#inputExchangeRate").val();
    var amount = $("#inputAmountTransfer").val();

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
        alert("The exchange rate must be a number.");
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

    //source_id target_id amount rate
    var json = {"source_id":sourceId, "target_id":destinyId, "amount":amount, "rate":exchangeRate};
    jsonTransfer(json);

});

function jsonTransfer(json) {

    console.log(JSON.stringify(json));

    $.ajax({
        url: "money_transfer/", // the endpoint
        type: "POST", // http method
        data: json, // data sent with the post request
        dataType: 'json',

        // handle a successful response
        success: function (jsonResponse) {

            // Hides the modal and update the tables DOM

            console.log(jsonResponse); // log the returned json to the console
            console.log("success"); // another sanity check


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
            alert("Error saving the money transfer. Please try again or contact the system manager.");


        }
    });
}