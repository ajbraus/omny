$(document).ready(function() {
  $('#reservationForm').submit(function(e) {
    e.preventDefault();
    
    var formData = $(this).serialize();

    $.post('/reservations', formData)
        .done(function(data){ 
          console.log(data);
        })
        .fail(function(xhr, status, error) {
          console.log(error);
        });
  })  
})