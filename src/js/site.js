$('#fillRequirementsModal').on('show.bs.modal', function (event) {

    let dateFrom = document.getElementById('dateFrom');
    let dateTo = document.getElementById('dateTo');
    let inputAdults = document.getElementById('inputAdults');
    let inputChildren = document.getElementById('inputChildren');

    $("#spinIcon").hide();

    dateFrom.value = moment().format("YYYY-MM-DD");
    dateTo.value = moment().add(10, 'days').format("YYYY-MM-DD");
    inputAdults.value = 1;
    inputChildren.value = 0;

});

var saveButtonClicked = false;

$('#requirementsModalSaveButton').on('click', function () {
    // $("#spinIcon").show();
    if (saveButtonClicked) {
        console.log("Ignoring button click");
        return;
    }
    saveButtonClicked = true;
    let myForm = document.getElementById('requirementsModalForm');
    let dateFrom = document.getElementById('dateFrom');
    let dateTo = document.getElementById('dateTo');
    let eMail = document.getElementById('inputEmail');
    let customerName = document.getElementById('customerName');
    let inputAdults = document.getElementById('inputAdults');
    let inputChildren = document.getElementById('inputChildren');
    let inputCity = document.getElementById('inputCity');
    let inputCountry = document.getElementById('inputCountry');
    let roomType = document.getElementById('roomType');


    if (dateFrom.value > dateTo.value) {
        dateFrom.setCustomValidity('From Date must be before To date');
        dateTo.setCustomValidity('To Date must be after from date');
    } else {
        dateFrom.setCustomValidity('');
        dateTo.setCustomValidity('');
    }
    if (myForm.checkValidity() === false) {
        // $("#spinIcon").hide();
        saveButtonClicked = false;
        toastr.error('Please correct all the errors!', 'Villa Koukoudis', {
            progressBar: true,
            positionClass: "toast-bottom-center"
        });
    } else {
        //Testapi varsion
        let formData = {
            RequestDate: moment().format("YYYY-MM-DD"),
            RequesterEmail: eMail.value,
            RequesterName: customerName.value,
            Adults: inputAdults.value,
            Children: inputChildren.value,
            // City
            Country: inputCountry.value,
            RoomType: roomType.value,
            DateFrom: dateFrom.value,
            DateTo: dateTo.value
        };
        //var uri = 'http://localhost:60928/api/RoomQuoteRequests'
        var uri = 'http://testapi.potos.tours/api/RoomQuoteRequests'
        $("#spinIcon").show();
        var formDataJSON = JSON.stringify(formData);
        var jqxhr = $.ajax({
            url: uri,
            type: 'POST',
            data: formDataJSON,
            contentType: "application/json",
            success: function () {
                console.log("success in post call ");

                $("#spinIcon").hide();
                $('#fillRequirementsModal').modal('hide')
                saveButtonClicked = false;
                toastr.success('Thank you for your request!', 'Villa Koukoudis', {
                    progressBar: true,
                    positionClass: "toast-bottom-center"
                });
            },
            error: function (xhr, textStatus, errorThrown) {
                saveButtonClicked = false;
                $("#spinIcon").hide();
                toastr.error("There was an error with your request. Please try again later","Villa Koukoudis",{
                    progressBar: true,
                    positionClass: "toast-bottom-center"
                });
                console.log("error in post call ");
                console.log(xhr.statusText);
                console.log(textStatus);
                //console.log(error);
            }
        });

    }
    myForm.classList.add('was-validated');
});






// function setCookie(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//     var expires = "expires="+d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// function getCookie(cname) {
//     var name = cname + "=";
//     var ca = document.cookie.split(';');
//     for(var i = 0; i < ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return '';
// }