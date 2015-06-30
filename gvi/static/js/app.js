/**
 * Created by anauriarte on 6/23/15.
 */

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


            if(lejson.account_type == 'c'){
                console.log('Cambiar la tabla de Cash');

                $('#cashAccounts').append('<tr><td hidden id="pk">'+ jsonResponse.pk + '</td>' +
                                          '<td>' + jsonResponse + '');
            }
            else {
                console.log('Cambiar la tabla de Bank');
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

function getJson(){
    var prueba='{"account_type":"b", "bank_name":"Santander", "number":"123456", "balance":"500.00", "currency":"Pesos"}';
    //var prueba='{"account_type":"c", "balance":"1000.00", "currency":"Pounds"}';

    return prueba;
    //return null;
}

//Function to EDIT account info
function editAccount(id){
    alert(id.attr('id'));

    //Get json from backend
    var json=getJson();

    //Validate
    if(json==null){
        alert("Error. Can't reach the server.");
        return;
    }
    else{
        var data = JSON.parse(json);
        var accountType = data.account_type;

        // Get data
        if(accountType == "b") {

            var bank = data.bank_name;
            var accountNo = data.number;
            var amount = data.balance;
            var currency = data.currency;

            //Fill fields
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
            $("#radioCashEdit").prop('checked', true);
            $("#currencySelectEdit").val(currency);
            $("#inputAmountEdit").val(amount);
            $('#bankTxtFieldEdit').css("display", "none");
            $('#accountNoTxtFieldEdit').css("display", "none");
        }

    }
}

$(document).on('click', '#modal_edit' ,function () {

    return;

    //Validate account type
    var accountType = $('input[name=accountTypeRadio]:checked', '#addAccountForm').val();

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
        var accountData = {"account_type": accountType, "balance":amount, "currency":currency};
        /*if(jsonAjax(accountData)==false){
         alert("Error saving the account, can't reach the server. Please try again or contact the system manager.");
         return false;
         }*/
        //jsonAjax(accountData);
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
        var accountData={"account_type":accountType, "bank_name":bank, "number":account, "balance":amount, "currency":currency};

        //jsonAjax(accountData);
});

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
    $('#deleteBtnEdit').css("background", "#C61212");
    $('#deleteBtnEdit').css("color", "#ffffff");
}

function deleteBtnOut(){
    $('#deleteBtnEdit').css("background", "#ffffff");
    $('#deleteBtnEdit').css("color", "#C61212");
}
