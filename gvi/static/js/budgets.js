/**
 * Created by daniel on 9/07/15.
 */
$(document).ready(function () {
    $(window).load(function () {
        addBudget();
        datepickersBudgets();
        toggleSubcategory();
        addBudgetVariable();
        searchBudget();

    });
});

function addBudget() {
    var wrapper = $(".input_fields_wrap"); //Fields wrapper
    var add_button = $(".add_field_button"); //Add button ID

    var insert = "";
    var x = 0; //initlal text box count
    $(add_button).click(function (e) { //on add input button click
        e.preventDefault();

        x++; //text box increment
        insert = '<div class="row" name="extra' + x + '" id="extra' + x + '"><div class="col-xs-5">' +
            '<select class="form-control" id="form-' + x + '-category" name="form-' + x + '-category">';
        $("#form-0-category option").each(function () {
            insert = insert + '<option>' + $(this).val() + '</option>';
        });
        insert = insert + '</select>' +
            '</div>' +
            '<div class="col-xs-3">' +
            '<input type="number" id="form-' + x + '-amount" name="form-' + x + '-amount" class="form-control amount-offset" placeholder="Amount" required>' +
            '</div>' +
            '<div class="col-xs-3">' +
            '<select class="form-control currency-offset" name="form-' + x + '-currency" id="form-' + x + '-currency">';
        $("#form-0-currency option").each(function () {
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

function addBudgetVariable() {
    var wrapper = $(".input_fields_wrap"); //Fields wrapper
    var add_button = $(".add_field_button_variable"); //Add button ID

    var insert = "";
    var x = 1; //initlal text box count
    $(add_button).click(function (e) { //on add input button click
        e.preventDefault();

        x++; //text box increment
        insert = '<div class="row" name="extra' + x + '" id="extra' + x + '"><div class="col-xs-4">' +
            '<select class="form-control" id="form-' + x + '-category" name="form-' + x + '-category">';
        $("#form-0-category option").each(function () {
            insert = insert + '<option>' + $(this).val() + '</option>';
        });
        insert = insert + '</select>' +
            '</div>' +
            '<div class="col-xs-3">' +
            '<input type="number" id="form-' + x + '-amount" name="form-' + x + '-amount" class="form-control amount-offset" placeholder="Amount" required>' +
            '</div>' +
            '<div class="col-xs-3">' +
            '<select class="form-control currency-offset" name="form-' + x + '-currency" id="form-' + x + '-currency">';
        $("#form-0-currency option").each(function () {
            insert = insert + '<option>' + $(this).val() + '</option>';
        });

        insert = insert + '</select>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="checkbox checkbox-offset">' +
            '<input type="checkbox" name="form-' + x + '-type" id="form-' + x + '-type">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1 checkbox"><a href="#" class="remove_field_variable" name="' + x + '">' +
            '<span class="glyphicon glyphicon-remove"></span>' +
            '</a>' +
            '</div>' +
            '</div>';

        $(wrapper).append(insert);


    });

    $(wrapper).on("click", ".remove_field_variable", function (e) { //user click on remove text
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
        divName = '#' + $(this).attr('name') + 'sub';
        $(divName).toggle(500);
    })
}

function dateChangedBudget(ev) {
    var fromDate = $('#newBudgetFromDate').val();
    var toDate = $('#newBudgetToDate').val();

    console.log(fromDate + ' ' + toDate);

    fromDate = fromDate.split("-");
    toDate = toDate.split("-");


    if (fromDate[0] > toDate[0]) {
        $('#budgetSave').prop('disabled', true);
        $("#dateError").show(500);


    }
    else if (fromDate[0] == toDate[0] && fromDate[1] > toDate[1]) {
        $('#budgetSave').prop('disabled', true);
        $("#dateError").show(500);
    }
    else if (fromDate[0] == toDate[0] && fromDate[1] == toDate[1] && fromDate[2] > toDate[2]) {
        $('#budgetSave').prop('disabled', true);
        $("#dateError").show(500);
    }
    else {
        $('#budgetSave').prop('disabled', false);
        $("#dateError").hide(500);
    }


}

function searchBudget() {
    $(document).on('submit', '#searchBudgetForm', function(e){
        e.preventDefault();
        //alert("Buscando en Backend:");
        var fechas = { de: $('#fromDate').val(), a: $('#toDate').val() }
        var request = $.ajax({
            url:'search_budget',
            method: "GET",
            data: fechas,
            dataType: "JSON",
            success: function (data) {
                testJson(data);
            },
            error: function(){
                alert("An error occurred connecting to the server.");
            }
        });


    });
}


function testJson(JSON) {
    //JSON = '{"Pesos":{"Fuel":{"total":100,"Car Fuel":50,"Boat Fuel":50},"Office":{"total":200,"paper":50,"clips":150}},"Dollars":{"Fuel":{"total":20,"Car Fuel":15,"Boat Fuel":5},"Office":{"total":200,"clips":200}}}';

    var obj = jQuery.parseJSON(JSON);

    transactionResult='';

    $.each(obj, function(key, element) {
        transactionResult += '<div class="row budgets budgets_wrap"><div class="col-xs-8"><h3 id="'+key+'" name="'+key+'">'+key+'</h3></div>';
        $.each(obj[key], function(key2, element) {
            //console.log(obj[key][key2]);
            transactionResult += '<div class="row"><div class="col-xs-offset-1 col-xs-5"><h4 >'+key2+': <label>'+obj[key][key2]['total']+'</label></div><div class="col-xs-1"><div class="col-xs-1 checkbox"><a href="#" class="toggle_sub" name="'+key+key2+'"><span class="glyphicon glyphicon-triangle-bottom"></span></a></div></div>';

            transactionResult += '<div class="row"><div class="col-xs-offset-1 col-xs-11"><ul id="'+key+key2+'sub" name="'+key+key2+'sub">';
            $.each(obj[key][key2], function(key3, element) {
                if(key3 != 'total'){

                    transactionResult += '<li><h5>'+key3+': <label>'+obj[key][key2][key3]+'</label></h5></li>';
                }


            });
            transactionResult += "</ul></div></div>";
            transactionResult += '</div>'
        });
        transactionResult += '</div>';
    });

    console.log(transactionResult);

    $('#transaction').append(transactionResult);
}