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

  var map = new google.maps.Map(document.getElementById('map'), {
    scroll: false
  });
  
  var geocoder = new google.maps.Geocoder();
  setBounds(geocoder, map);
  $('#city').change(function() {
    setBounds(geocoder, map)
  })

  autocomplete.addListener('place_changed', function() { fillInAddress(geocoder, map) } );
  // document.getElementById('submit').addEventListener('click', function() {
  //   geocodeAddress(geocoder, map);
  // });
}

function setMarker(location, map) {
  map.setCenter(location);
  var marker = new google.maps.Marker({
    map: map,
    position: location
  });
}

function setBounds(geocoder, map) {
  var city = $('#city').val();
  $('#autocomplete').val('');

  geocoder.geocode({'address': city}, function(results, status) {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);
      map.setZoom(8);

      var circle = new google.maps.Circle({
        center: results[0].geometry.location,
        radius: 8000 // ~5 miles in meters
      });
      autocomplete.setBounds(circle.getBounds());
    }
  });
}

function fillInAddress(geocoder, map) {
  var place = autocomplete.getPlace();
  var location = $('#autocomplete').val();

  if (place == null) {
    // geocode address and set center and drop pin
    geocoder.geocode({'address': location}, function(results, status) {
      if (status === 'OK') {
        map.setCenter(results[0].geometry.location);
        setMarker(results[0].geometry.location, map)

        $('#lat').val(results[0].geometry.location.lat);
        $('#lng').val(results[0].geometry.location.lng);
      }
    });
    // set address
    $('#address').val(location);

  } else {
    // Center map and drop pin on place
    map.setCenter(place.geometry.location);
    setMarker(place.geometry.location, map)
    map.setZoom(18);

    $('#place').val(place.name);
    $('#address').val(place.formatted_address);
    $('#lat').val(place.geometry.location.lat);
    $('#lng').val(place.geometry.location.lng);
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

    // TODO PARSE STARTING AT ENDING AT DATES
    
    var month = monthNames.indexOf($('#starts-on-month').val())
    var day = $('#starts-on-day').val()
    var year = $('#starts-on-year').val()
    var startsAt = $('#starts-at').val()// + ":00" 
    var endsAt = $('#ends-at').val()// + ":00"

    console.log(year + "-" + day + "-" + month + " " + startsAt)
    var booking = {
      place: $('#place').val(),
      address: $('#address').val(),
      lat: $('#lat').val(),
      lng: $('#lng').val(),
      startsAt: Date.parse(year + month + day + startsAt),
      endsAt: Date.parse(year, month, day, endsAt),
      instructions: $('#instructions').val(),
    }

    $.post('/bookings', booking)
        .done(function(data){ 
          // CONFIRMATION SENT BY EMAIL
          console.log(data);
        })
        .fail(function(xhr, status, error) {
          console.log(error);
        });
  });

});