/**
 * Created by daniel on 9/07/15.
 */
$(document).ready(function() {
    $(window).load(function() {
        addBudget();

    });
});

function addBudget(){
    var wrapper         = $(".input_fields_wrap"); //Fields wrapper
    var add_button      = $(".add_field_button"); //Add button ID

    var insert ="";
    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();

        x++; //text box increment
        insert = '<div class="row" name="extra'+x+'" id="extra'+x+'"><div class="col-xs-5">' +
            '<select class="form-control" id="category'+x+'" name="category'+x+'">';
        $("#category1 option").each(function()
        {
            insert = insert + '<option>'+$(this).val()+'</option>';
        });
        insert = insert + '</select>' +
            '</div>' +
            '<div class="col-xs-3">' +
            '<input type="number" id="amount'+x+'" name="amount'+x+'" class="form-control amount-offset" placeholder="Amount">' +
            '</div>' +
            '<div class="col-xs-3">' +
            '<select class="form-control currency-offset" name="currency'+x+'" id="currency'+x+'">';
        $("#currency1 option").each(function()
        {
            insert = insert + '<option>'+$(this).val()+'</option>';
        });

        insert = insert + '</select>' +
            '</div>' +
            '<div class="col-xs-1 checkbox"><a href="#" class="remove_field" name="'+x+'">' +
            '<span class="glyphicon glyphicon-remove"></span>' +
            '</a>' +
            '</div>' +
            '</div>';

        $(wrapper).append(insert);


    });

    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        divName = '#extra'+$(this).attr('name');
        e.preventDefault();
        $(divName).remove();
    })
}
