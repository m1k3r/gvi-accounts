/**
 * Created by daniel on 30/06/15.
 */
$(document).ready(function() {
    $(window).load(function() {
        lockSelections();

    });
});

function lockSelections(){
    var lockCategory = function () {
        if ($("#enableCategory").is(":checked")) {
            $('#categorySelect').prop('disabled', false);
        }
        else {
            $('#categorySelect').prop('disabled', 'disabled');
        }
    };

    var lockSubcategory = function () {
        if ($("#enableSubcategory").is(":checked")) {
            $('#subcategorySelect').prop('disabled', false);
        }
        else {
            $('#subcategorySelect').prop('disabled', 'disabled');
        }
    };


    $(lockCategory);
    $("#enableCategory").change(lockCategory);
    $(lockSubcategory);
    $("#enableSubcategory").change(lockSubcategory);

}