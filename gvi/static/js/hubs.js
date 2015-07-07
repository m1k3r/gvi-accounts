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
    var response = getJson(id);

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
        return;
    });

}

//Function that receives a hub id, connects to the backend and return a json with the hub info
function getJson(id){

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
    alert ("entra");

    //Get data
    var id = $("#idHubEdit").val();
    var name = $("#inputNameEdit").val();
    var manager = $("#inputManagerEdit").val();
    var country = $("#inputCountryEdit").val();


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
    updateJson(hubData);

});

//Function that receives a json with the Account info and connects to the backend to edit the account
function updateJson(json){

    $.ajax({
        url : "change_hub/", // the endpoint
        type : "POST", // http method
        data : json, // data sent with the post request

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


