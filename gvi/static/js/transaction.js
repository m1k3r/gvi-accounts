/**
 * Created by daniel on 30/06/15.
 */
$(document).ready(function() {
    $(window).load(function() {
        lockSelections();
        datepickers();
        datepickersTransactions();
    });
});

function enableDatePicker(){
    datepickersForm();
}

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
        .change(dateChangedNewTransaction)
        .on('changeDate', dateChangedNewTransaction);
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

//******************************************* ADD TRANSACTION ******************************************************************

//Function triggered by the SAVE button on the Add Transaction modal
//Validates fields, creates json and calls jsonAddTransaction() function
$(document).on('click', '#modal_saveTransaction' ,function () {

    //Get data
    var category = $("#categorySelectModal").val();
    var subcategory = $("#subcategorySelectModal").val();
    var date = $("#newTransaction").val();
    var amount = $("#inputAmount").val();
    var comment = $("#inputComment").val();

    //Validations
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
    var json = {"category":category, "subcategory":subcategory, "date":date, "amount":amount, "comment":comment};
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


});
//***************************************** ENDS ADD HUB ***************************************************************
