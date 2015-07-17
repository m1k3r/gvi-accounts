/**
 * Created by daniel on 30/06/15.
 */
$(document).ready(function() {
    $(window).load(function() {
        lockSelections();
        datepickers();
        datepickersTransactions();
        loadCategories();
        //changeSubcategory();

    });
});



function lockSelections(){
    var lockCategory = function () {
        if ($("#enableCategory").is(":checked")) {
            $('#categorySelect').prop('disabled', false);
        }
        else {
            $('#categorySelect').prop('disabled', 'disabled');
            $('#subcategorySelect').prop('disabled', 'disabled');
        }
    };

    var lockSubcategory = function () {
        if ($("#enableSubcategory").is(":checked")) {
            $('#subcategorySelect').prop('disabled', false);
            $('#enableCategory').prop('checked', true);
            $('#categorySelect').prop('disabled', false);
        }
        else {
            $('#subcategorySelect').prop('disabled', 'disabled');
        }
    };


    $(lockCategory);
    $("#enableCategory").change(lockCategory);
    $("#enableSubcategory").change(lockCategory);
    $(lockSubcategory);
    $("#enableSubcategory").change(lockSubcategory);
    $("#enableCategory").change(lockSubcategory);
}


function datepickers(){
    $('#datetimepickerFrom').datetimepicker({
        viewMode: 'years',
        format: 'YYYY-MM-DD',
        pickTime: false,
        defaultDate: new Date()
    })
        .change(dateChanged)
        .on('changeDate', dateChanged);




    $('#datetimepickerTo').datetimepicker({
        viewMode: 'years',
        format: 'YYYY-MM-DD',
        pickTime: false,
        defaultDate: new Date()
    })
        .change(dateChanged)
        .on('changeDate', dateChanged);


}


function datepickersTransactions() {
    $('.datepickTransaction').datetimepicker({
        viewMode: 'years',
        format: 'YYYY-MM-DD',
        pickTime: false,
        defaultDate: new Date()
    })

}

function dateChanged(ev) {
    var fromDate = $('#fromDate').val();
    var toDate = $('#toDate').val();

    fromDate = fromDate.split("-");
    toDate = toDate.split("-");


    if(fromDate[0] > toDate[0]){
        $('button').prop('disabled', true);
        $("#dateError").show(500);


    }
    else if (fromDate[0] == toDate[0] && fromDate[1] > toDate[1]){
        $('button').prop('disabled', true);
        $("#dateError").show(500);
    }
    else if (fromDate[0] == toDate[0] && fromDate[1] == toDate[1] && fromDate[2] > toDate[2]){
        $('button').prop('disabled', true);
        $("#dateError").show(500);
    }
    else{
        $('button').prop('disabled', false);
        $("#dateError").hide(500);
    }

}

//******************************************* ADD TRANSACTION **********************************************************

//Function triggered by the SAVE button on the Add Transaction modal
//Validates fields, creates json and calls jsonAddTransaction() function
$(document).on('click', '#modal_saveTransaction' ,function () {

    //Get data
    var type = $('input[name=transTypeRadio]:checked', '#addTransactionForm').val();
    var category = $("#categorySelectModal").val();
    var subcategory = $("#subcategorySelectModal").val();
    var date = $("#newTransaction").val();
    var amount = $("#inputAmount").val();
    var comment = $("#inputComment").val();
    var id= $("#idAccount").val();

    //Validations
    if(isNull(type)==false){
        alert("You must select a transaction type.");
        return;
    }

    if(isNull(category)==false){
        alert("You must enter a category.");
        return;
    }

    if(isNull(subcategory)==false){
        alert("You must enter a subcategory.");
        return;
    }

    if(isNull(date)==false){
        alert("You must enter a date.");
        return;
    }

    if(isNull(amount)==false){
        alert("You must enter an amount.");
        return;
    }

    if(isNumberDecimal(amount)==false){
        alert("The amount must be a number");
        return;
    }

    //Connection to backend
    var json = {"category":category, "subcategory":subcategory, "date":date, "amount":amount, "comment":comment, "type":type, "id":id};
    jsonAddTransaction(json);
});

//Function that receives the New Transaction info and connects to the backend to add it
function jsonAddTransaction(json){

    $.ajax({
        url : "new_transaction/", // the endpoint
        type : "POST", // http method
        data : json, // data sent with the post request
        dataType: 'json',

        // handle a successful response
        success : function(jsonResponse) {

            // Hides the modal, cleans fields and update the tables DOM
            $('#modalAddTransaction').modal('hide');
            $('#modalAddTransaction').find('#categorySelectModal').val('');
            $('#modalAddTransaction').find('#subcategorySelectModal').val('');
            $('#modalAddTransaction').find('#inputAmount').val('');
            $('#modalAddTransaction').find('#inputComment').val('');
            $('#radioIn').prop('checked', false);
            $('#radioOut').prop('checked', false);

            location.reload();

        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {

            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert("Error saving the transaction. Please try again or contact the system manager.");
            //$('#modalAddHub').find('#inputName').val('');
            //$('#modalAddHub').find('#inputManager').val('');
            //$('#modalAddHub').find('#inputCountry').val('');

        }
    });

    return true;
}

//Function triggered by the CANCEL button on the Add Currency modal
//Hides the modal, cleans all fields
$(document).on('click', '#addTransactionCancel' ,function () {

    $('#modalAddTransaction').modal('hide');
    $('#modalAddTransaction').find('#categorySelectModal').val('');
    $('#modalAddTransaction').find('#subcategorySelectModal').val('');
    $('#modalAddTransaction').find('#inputAmount').val('');
    $('#modalAddTransaction').find('#inputComment').val('');
    $('#radioIn').prop('checked', false);
    $('#radioOut').prop('checked', false);
    $('#addNewSubcategory').css("display", "none");


});
//***************************************** ENDS ADD TRANSACTION *******************************************************

//******************************************* EDIT TRANSACTION *********************************************************

//Function to fill in information in the Edit Transaction modal
//Receives the hub id, calls getJson() function that returns a json with the hub info and fills in the modal fields
function editTransaction(id){

    //Get the id from the object
    //id = id.attr('id');

    //Get json form backend
    var response = getJsonTransaction(id);

    response.done(function(data){
        var category = data.category;
        var subcategory = data.subcategory;
        var date = data.date;
        var amount = data.amount;
        var comment = data.comment;
        var type = data.type;

        console.log(data);
        console.log(amount);

        loadCatEdit();
        $("#idTransactionEdit").val(id);
        $('#modalEditTransaction').find('#categorySelectModalEdit').val(category);
        $('#modalEditTransaction').find('#subcategorySelectModalEdit').val(subcategory);
        $('#modalEditTransaction').find('#inputAmountEdit').val(amount);
        $('#modalEditTransaction').find('#inputCommentEdit').val(comment);
        $('#modalEditTransaction').find('#newTransactionEdit').val(date);

        if(type=="i"){
            $('#radioInEdit').prop('checked', true);
        }else{
            $('#radioOutEdit').prop('checked', true);
        }

    }).fail(function (json) {
        alert("Error 1. Can't reach the server.");
        $('#modalEditTransaction').modal('hide');
    });



}

//Function that receives a transaction id, connects to the backend and return a json with the transaction info
function getJsonTransaction(id){

    //Create json with the account id
    var lejson = {'id': id };

    var jxhr = $.ajax({
        url : "new_transaction/", // the endpoint
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

//Function triggered by SAVE on the Edit Transaction modal
//Validates fields, creates json and calls updateJsonTransaction() function
$(document).on('click', '#modal_editTransaction' ,function () {

    //Get data
    var id = $("#idTransactionEdit").val();
    var idAccount = $("#idAccountEdit").val();
    var type = $('input[name=transTypeRadioEdit]:checked', '#editTransactionForm').val();
    var category = $("#categorySelectModalEdit").val();
    var subcategory = $("#subcategorySelectModalEdit").val();
    var date = $("#newTransactionEdit").val();
    var amount = $("#inputAmountEdit").val();
    var comment = $("#inputCommentEdit").val();




    //Validations
    if(isNull(type)==false){
        alert("You must select a transaction type.");
        return;
    }

    if(isNull(category)==false){
        alert("You must enter a category.");
        return;
    }

    /*if(isNull(subcategory)==false){
        alert("You must enter a subcategory.");
        return;
    }*/

    if(isNull(date)==false){
        alert("You must enter a date.");
        return;
    }

    if(isNull(amount)==false){
        alert("You must enter an amount.");
        return;
    }

    if(isNumberDecimal(amount)==false){
        alert("The amount must be a number");
        return;
    }

    //Connection to backend
    var transactionData = {"id":id, "idAccount":idAccount, "category":category, "subcategory":subcategory, "date":date, "amount":amount, "comment":comment, "type":type};
    updateJsonTransaction(transactionData);

});

//Function that receives a json with the Account info and connects to the backend to edit the account
function updateJsonTransaction(lejson){

    $.ajax({
        url : "change_transaction/", // the endpoint
        type : "POST", // http method
        data : lejson, // data sent with the post request

        // handle a successful response
        success : function(jsonResponse) {

        // Hides the modal, updates the tables DOM and cleans modal fields
        $('#modalAddTransaction').modal('hide');
        $('#modalAddTransaction').find('#categorySelectModal').val('');
        $('#modalAddTransaction').find('#subcategorySelectModal').val('');
        $('#modalAddTransaction').find('#inputAmount').val('');
        $('#modalAddTransaction').find('#inputComment').val('');
        $('#radioIn').prop('checked', false);
        $('#radioOut').prop('checked', false);

            location.reload();

        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert("Error editing the transaction. Please try again or contact the system manager.");

        }
    });
}

//********************************************* ENDS EDIT HUB **********************************************************

//******************************************* DELETE TRANSACTION *******************************************************

//Function triggered by the DELETE button on the Edit Transaction modal
//Display the confirmation to delete the transaction
$(document).on('click', '#edit_deleteTransaction' ,function () {

    $('#edit_deleteTransaction').css("background", "#C61212");
    $('#edit_deleteTransaction').css("color", "#ffffff");
    $('#deleteTransactionConfirmation').css("display", "block");
});

//Function triggered by the NO button on the confirmation to delete the account
//Hides the confirmation
$(document).on('click', '#deleteTransactionNo' ,function () {

    $('#edit_deleteTransaction').css("background", "#ffffff");
    $('#edit_deleteTransaction').css("color", "#C61212");
    $('#deleteTransactionConfirmation').css("display", "none");
});

//Function triggered by the YES button on the confirmation to delete the account
//Hides the confirmation, gets the account id and calls deleteJson() function
$(document).on('click', '#deleteTransactionYes' ,function () {

    $('#edit_deleteTransaction').css("background", "#ffffff");
    $('#edit_deleteTransaction').css("color", "#C61212");
    $('#deleteTransactionConfirmation').css("display", "none");

    var idAccount = $("#idAccountEdit").val();
    var id = $("#idTransactionEdit").val();
    var lejson = {'id': id, 'idAccount':idAccount };
    deleteJsonDetail(lejson);
});

//Function that receives the account id and connects to the backend to delete the account
function deleteJsonDetail(lejson){


    var jxhr = $.ajax({
        url : "change_transaction/", // the endpoint
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
            alert("Error deleting the transaction. Please try again or contact the system manager.");

        }
    });

    return jxhr;
}
//*************************************** ENDS DELETE TRANSACTION ******************************************************

function displayNewSubcategory(option){
    if(option=="new"){

        var category = $("#categorySelectModal").val();

        if(isNull(category)==false){
            alert("You need to select a Category");
            $("#subcategorySelectModal").val('');
            return;
        }

        var label = "New Subcategory for "+category+ ":";
        $('#labelCategory').empty();
        $('#labelCategory').append(label);
        $('#addNewSubcategory').css("display", "block");
    }else{
        $('#addNewSubcategory').css("display", "none");
    }
}

function validateSubcategory(){
    var subcategory =  $('#subcategorySelectModal').val();
    var category = $('#categorySelectModal').val();

    if(subcategory == "new"){
        if(isNull(category)==false){
            alert("You need to select a Category");
             $('#addNewSubcategory').css("display", "none");
             $("#subcategorySelectModal").val('');
            return;
        }

        var label = "New Subcategory for "+category+ ":";
        $('#labelCategory').empty();
        $('#labelCategory').append(label);
    }else{
        $('#addNewSubcategory').css("display", "none");
    }
}

$(document).on('click', '#modal_saveNewSubc' ,function () {
    var subcategory =  $('#inputNewSubcategory').val();
    var category = $("#categorySelectModal").val();

    if(isNull(subcategory)==false){
        alert("You need to select a subcategory");
        return;
    }

    if(isNull(category)==false){
        alert("You need to select a category");
        return;
    }

    var json = {'category': category, 'subcategory':subcategory };
    jsonAddSubcategory(json);
});

//Function that receives the New Subcategory info and connects to the backend to add it
function jsonAddSubcategory(json){

    $.ajax({
        url : "../../../new_subcategory/", // the endpoint
        type : "POST", // http method
        data : json, // data sent with the post request
        dataType: 'json',

        // handle a successful response
        success : function(jsonResponse) {

            // Hides the modal, cleans fields and update the tables DOM
            $('#addNewSubcategory').css("display", "none");

            location.reload();

        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {

            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert("Error saving the subcategory. Please try again or contact the system manager.");

        }
    });

    return true;
}

$(document).on('click', '#newSubcCancel' ,function () {
    $("#subcategorySelectModal").val('');
    $('#inputNewSubcategory').val('');
    $('#addNewSubcategory').css("display", "none");

});


var categories;

function loadCategories(){
    $.ajax({
        url : "../../../cats_subs/", // the endpoint
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
            alert("Error loading Categories JSON");

        }
    });
}

function loadCat() {

            var catModal = '#categorySelectModal';
            var subModal = '#subcategorySelectModal';
            var obj;
            obj = categories;

            console.log("MMMM");
            console.log(obj);


            var categoryVal = $(catModal).val();
                $(subModal).empty();
                $(subModal).append('<option></option>');
                $.each(obj[categoryVal], function(i, item) {
                    $(subModal).append($('<option>', { item : i }).text(item));

                });
                $(subModal).append('<option value="new">+ New Subcategory</option>');

            $(catModal).change(function() {

                var categoryVal = $(catModal).val();
                $(subModal).empty();
                $(subModal).append('<option></option>');
                $.each(obj[categoryVal], function(i, item) {
                    $(subModal).append($('<option>', { item : i }).text(item));

                });
                $(subModal).append('<option value="new">+ New Subcategory</option>');

                validateSubcategory();
            });
}

function loadCatEdit() {

            var catModal = '#categorySelectModalEdit';
            var subModal = '#subcategorySelectModalEdit';
            var obj;
            obj = categories;

            console.log("MMMM");
            console.log(obj);


            var categoryVal = $(catModal).val();
                $(subModal).empty();
                $(subModal).append('<option></option>');
                $.each(obj[categoryVal], function(i, item) {
                    $(subModal).append($('<option>', { item : i }).text(item));

                });
                $(subModal).append('<option value="new">+ New Subcategory</option>');

            $(catModal).change(function() {

                var categoryVal = $(catModal).val();
                $(subModal).empty();
                $(subModal).append('<option></option>');
                $.each(obj[categoryVal], function(i, item) {
                    $(subModal).append($('<option>', { item : i }).text(item));

                });
                $(subModal).append('<option value="new">+ New Subcategory</option>');

                validateSubcategory();
            });
}