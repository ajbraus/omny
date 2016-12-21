var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete')), 
    { types: ['geocode', 'establishment'] }
  );
  
  autocomplete.addListener('place_changed', fillInAddress);

  // var map = new google.maps.Map(document.getElementById('map'), {
  //   zoom: 8,
  //   center: {lat: -34.397, lng: 150.644}
  // });

  var geocoder = new google.maps.Geocoder();
  var city = document.getElementById('city').value;

  geocoder.geocode({'address': city}, function(results, status) {
    if (status === 'OK') {
      // resultsMap.setCenter(results[0].geometry.location);
      // var marker = new google.maps.Marker({
      //   map: resultsMap,
      //   position: results[0].geometry.location
      // });


      // var geolocation = {
      //   lat: results[0].geometry.location.lat,
      //   lng: results[0].geometry.location.lng
      // };
      var circle = new google.maps.Circle({
        center: results[0].geometry.location,
        radius: 8000 // ~5 miles in meters
      });
      autocomplete.setBounds(circle.getBounds());
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

  // document.getElementById('submit').addEventListener('click', function() {
  //   geocodeAddress(geocoder, map);
  // });
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}

$(document).ready(function() {

  // SET TOMORROW'S DATE AS DEFAULT
  var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  console.log(tomorrow.getYear());
  $('#starts-on-month').val(monthNames[tomorrow.getMonth()])
  $('#starts-on-day').val(tomorrow.getDate())
  $('#starts-on-year').val(tomorrow.getYear() + 1900)


  // SUBMIT FORM
  $('#booking-form').submit(function(e) {
    e.preventDefault();
    
    var formData = $(this).serialize();

    $.post('/bookings', formData)
        .done(function(data){ 
          console.log(data);
        })
        .fail(function(xhr, status, error) {
          console.log(error);
        });
  });



});