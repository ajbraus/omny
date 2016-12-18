$(document).ready(function() {
  console.log('hello')
  $('#earlyAdopterForm').submit(function(e) {
    e.preventDefault();
    
    var formData = $(this).serialize();
    console.log(formData)

    $.post('/early-adopters', formData)
        .done(function(data){ 
          console.log(data);
        })
        .fail(function(xhr, status, error) {
          console.log(error);
        });
  })  
})


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