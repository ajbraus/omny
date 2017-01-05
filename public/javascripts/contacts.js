$(document).ready(function() {

  $('#contact-form').submit(function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    
    var contact = $(this).serialize();

    $.post('/contacts', contact, function(response) {
      $('#alert').addClass("alert-success")
      $('#alert').append('Thank you for requesting a free trial. We will contact you within 24 hours.')
      $('#alert').fadeIn();
      $('#contact-form')[0].reset();
    })
    .fail(function(response) {
      $('#alert').addClass("alert-danger")
      $('#alert').append('There was a problem. Please try again or contact us for help.')
      $('#alert').fadeIn();
    })

    return false;
  });
  
});


// var getUrlParameter = function getUrlParameter(sParam) {
//   var sPageURL = decodeURIComponent(window.location.search.substring(1)),
//     sURLVariables = sPageURL.split('&'),
//     sParameterName,
//     i;

//   for (i = 0; i < sURLVariables.length; i++) {
//     sParameterName = sURLVariables[i].split('=');

//     if (sParameterName[0] === sParam) {
//         return sParameterName[1] === undefined ? true : sParameterName[1];
//     }
//   }
// };

// var token = getUrlParameter('token');