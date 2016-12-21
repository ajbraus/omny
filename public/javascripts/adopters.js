$(document).ready(function() {

  $('#adopter-form').submit(function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    
    var adopter = $(this).serialize();

    $.post('/adopters', adopter, function(response) {
      $('#adopter-form')[0].reset();
      alert("Message sent! Thank you for adoptering us.")
    })
    .fail(function(response) {
      alert(response.data);
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