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

//Function that recieves a json and connects to the backend
function jsonAjax(json ){
    console.log("Entra a funcion");
    console.log(json);
    console.log(JSON.stringify(json));

    return true;
}

//Function to SAVE info from the New Account modal
function saveNewAccount(){

    //Validate account type
    var accountType = $('input[name=accountTypeRadio]:checked', '#addAccountForm').val();

    //Get data
    if(accountType == "cash"){
        var currency = $('#currencySelect').val();
        var amount= $('#inputAmount').val();

        //Validations
        if(isNull(currency)==false){
            alert("You need to select a currency");
           return false;
        }
        if(isNull(amount)==false){
            alert("The field Amount cannot be empty");
            return false;
        }
        if(isNumberDecimal(amount)==false){
            alert("The amount must be a number");
            return false;
        }

        //Connection to backend
        var accountData = {account_type: accountType, balance:amount, currency:currency};
        if(jsonAjax(accountData)==false){
            alert("Error saving the account, can't reach the server. Please try again or contact the system manager.");
            return false;
        }
    }
    if(accountType == "bank"){
        var currency = $('#currencySelect').val();
        var bank= $('#inputBank').val();
        var account= $('#inputAccountNo').val();
        var amount= $('#inputAmount').val();

        //Validations
        if(isNull(currency)==false){
            alert("You need to select a currency");

            return false;
        }
        if(isNull(bank)==false){
            alert("The field Bank cannot be empty");
            return false;
        }
        if(isNull(account)==false){
            alert("The field Account cannot be empty");
            return false;
        }
        if(isNull(amount)==false){
            alert("The field amount cannot be empty");
            return false;
        }
        if(isNumberInteger(account)==false){
            alert("The Account # must be a number without decimals");
            return false;
        }
        if(isNumberDecimal(amount)==false){
            alert("The Amount must be a number");
            return false;
        }

        //Connection to backend
        var accountData={account_type:accountType, bank_name:bank, number:account, balance:amount, currency:currency};
        if(jsonAjax(accountData)==false){
            alert("Error saving the account, can't reach the server. Please try again or contact the system manager.");
            return false;
        }

    }

    //Close modal and clear fields
    $('#modalAddAccount').modal('hide');
    $('#modalAddAccount').find("input,select").val('').end();
    $('#modalAddAccount').find("input[type=radio]").prop("checked", "radioBank");
    $('#bankTxtField').css("display", "block");
    $('#accountNoTxtField').css("display", "block");

}

//Function to hide additional fields when the account type is cash
function cashSelect(){
    $('#bankTxtField').css("display", "none");
    $('#accountNoTxtField').css("display", "none");
}

//Function to display additional fields when the account type is bank
function bankSelect(){
    $('#bankTxtField').css("display", "block");
    $('#accountNoTxtField').css("display", "block");
}