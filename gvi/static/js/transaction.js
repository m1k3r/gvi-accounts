/**
 * Created by daniel on 30/06/15.
 */
$(document).ready(function() {
    $(window).load(function() {
        lockSelections();
        datepickers();

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
        pickTime: false
    });



    $('#datetimepickerTo').datetimepicker({
        viewMode: 'years',
        format: 'YYYY-MM-DD',
        pickTime: false
    });

}