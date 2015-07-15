/**
 * Created by daniel on 9/07/15.
 */
$(document).ready(function () {
    $(window).load(function () {
        addBudget();
        datepickersBudgets();
        toggleSubcategory();

    });
});

function addBudget() {
    var wrapper = $(".input_fields_wrap"); //Fields wrapper
    var add_button = $(".add_field_button"); //Add button ID

    var insert = "";
    var x = 1; //initlal text box count
    $(add_button).click(function (e) { //on add input button click
        e.preventDefault();

        x++; //text box increment
        insert = '<div class="row" name="extra' + x + '" id="extra' + x + '"><div class="col-xs-5">' +
            '<select class="form-control" id="category' + x + '" name="category' + x + '">';
        $("#category1 option").each(function () {
            insert = insert + '<option>' + $(this).val() + '</option>';
        });
        insert = insert + '</select>' +
            '</div>' +
            '<div class="col-xs-3">' +
            '<input type="number" id="amount' + x + '" name="amount' + x + '" class="form-control amount-offset" placeholder="Amount">' +
            '</div>' +
            '<div class="col-xs-3">' +
            '<select class="form-control currency-offset" name="currency' + x + '" id="currency' + x + '">';
        $("#currency1 option").each(function () {
            insert = insert + '<option>' + $(this).val() + '</option>';
        });

        insert = insert + '</select>' +
            '</div>' +
            '<div class="col-xs-1 checkbox"><a href="#" class="remove_field" name="' + x + '">' +
            '<span class="glyphicon glyphicon-remove"></span>' +
            '</a>' +
            '</div>' +
            '</div>';

        $(wrapper).append(insert);


    });

    $(wrapper).on("click", ".remove_field", function (e) { //user click on remove text
        divName = '#extra' + $(this).attr('name');
        e.preventDefault();
        $(divName).remove();
    })
}

function datepickersBudgets() {
    $('.datepick').datetimepicker({
        viewMode: 'years',
        format: 'YYYY-MM-DD',
        pickTime: false,
        defaultDate: new Date()
    })
        .change(dateChangedBudget)
        .on('changeDate', dateChangedBudget);
}

function toggleSubcategory() {
    var wrapper = $(".budgets_wrap"); //Fields wrapper

    $(wrapper).on("click", ".toggle_sub", function (e) { //user click on remove text
        divName = '#'+$(this).attr('name')+'sub';
        $(divName).toggle(500);
    })
}

function dateChangedBudget(ev) {
    var fromDate = $('#newBudgetFromDate').val();
    var toDate = $('#newBudgetToDate').val();

    console.log(fromDate+' '+toDate);

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