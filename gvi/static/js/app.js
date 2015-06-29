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

function jsonAjax(json){
    console.log("Entra a funcion");
    console.log(json);
    console.log(JSON.stringify(json));

    $.ajax({
        url : "create_account/", // the endpoint
        type : "POST", // http method
        data : json, // data sent with the post request

        // handle a successful response
        success : function(json) {

            console.log(json); // log the returned json to the console
            console.log("success"); // another sanity check
            $('#modalAddAccount').modal('hide');
            $('#modalAddAccount').find('#inputAmount').val('');
            $('#modalAddAccount').find('#inputAccountNo').val('');
            $('#modalAddAccount').find('#inputBank').val('');
            //$('#modalAddAccount').find("input[type=radio]").prop("checked", "radioBank");
            //$('#bankTxtField').css("display", "block");
            //$('#accountNoTxtField').css("display", "block");


        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {

            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert("Error saving the account, can't reach the server. Please try again or contact the system manager.");

            $('#modalAddAccount').modal('hide');
            $('#modalAddAccount').find('#inputAmount').val('');
            $('#modalAddAccount').find('#inputAccountNo').val('');
            $('#modalAddAccount').find('#inputBank').val('');
            /*$('#modalAddAccount').find("input,select").val('').end();
            $('#modalAddAccount').find("input[type=radio]").prop("checked", "radioBank");
            $('#bankTxtField').css("display", "block");
            $('#accountNoTxtField').css("display", "block");*/

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

        console.log("DESPUES DE C Y B");

        //Connection to backend
        var accountData={"account_type":accountType, "bank_name":bank, "number":account, "balance":amount, "currency":currency};

        jsonAjax(accountData)




    }

    /*//Close modal and clear fields
     $('#modalAddAccount').modal('hide');
     $('#modalAddAccount').find("input,select").val('').end();
     $('#modalAddAccount').find("input[type=radio]").prop("checked", "radioBank");
     $('#bankTxtField').css("display", "block");
     $('#accountNoTxtField').css("display", "block");*/

});

function getJson(){
    //var prueba='{"account_type":"b", "bank_name":"Santander", "number":"123456", "balance":"500.00", "currency":"Pesos"}';
    var prueba='{"account_type":"c", "balance":"1000.00", "currency":"Pounds"}';
    return prueba;
    //return null;
}

//Function to EDIT account info
function editAccount(){

    //Get json from backend
    var json=getJson();

    //Validate
    if(json==null){
        alert("Error. Can't reach the server.");
        return false;
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
