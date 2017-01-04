var placeSearch, autocomplete;

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete')), 
    { types: ['geocode', 'establishment'] }
  );

  var map = new google.maps.Map(document.getElementById('map'), {
    scrollwheel: false,
    mapTypeControl: false,
    streetViewControl: false
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

function calcTotalFee() {
  var startsAt = $('#starts-at').val()
  var endsAt = $('#ends-at').val()

  var startsAtDate = Date.parse("Wed, 09 Aug 1995 " + startsAt)
  var endsAtDate = Date.parse("Wed, 09 Aug 1995 " + endsAt)

  var totalTimeInMilliseconds = endsAtDate - startsAtDate;
  var totalTimeInHours = totalTimeInMilliseconds/1000/60/60;

  if (totalTimeInHours <= 0) {
    var totalRentalFee = 0;  
  } else {
    var totalRentalFee = 40 * totalTimeInHours;  
  }
  

  $('#rentalFee').text(totalRentalFee);
  $('#totalFee').text(totalRentalFee + 25)
}

$(document).ready(function() {

  $("#autocomplete").keypress(function(e) {
      var code = (e.keyCode ? e.keyCode : e.which);
      if(code == 13) { //Enter keycode
          return false;
      }
  });

  // SET TOMORROW'S DATE AS DEFAULT
  var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  console.log(tomorrow.getYear());
  $('#starts-on-month').val(monthNames[tomorrow.getMonth()])
  $('#starts-on-day').val(tomorrow.getDate())
  $('#starts-on-year').val(tomorrow.getYear() + 1900)

  calcTotalFee()
  $('#starts-at, #ends-at').change(function() {
    calcTotalFee();
  })

  // SUBMIT FORM
  $('#request-teleporation').click(function(e) {
    e.preventDefault();
    var month = monthNames.indexOf($('#starts-on-month').val()) + 1;
    var day = $('#starts-on-day').val();
    var year = $('#starts-on-year').val();
    var startsAt = $('#starts-at').val();
    var endsAt = $('#ends-at').val();

    console.log(month)
    console.log(day)
    console.log(year)
    console.log(startsAt)
    // "2011-10-10T14:48:00"
    // Date.parse('Wed, 09 Aug 1995 00:00:00');
    var startsAtDateTime = Date.parse(month + " " + day + " " + year + " " + startsAt);
    var endsAtDateTime = Date.parse(month + " " + day + " " + year + " " + endsAt);
    var hours = (endsAtDateTime - startsAtDateTime)/1000/60/60;

    var booking = {
      name: $('#name').val(),
      phone: $('#phone').val(),

      place: $('#place').val(),
      address: $('#address').val(),
      lat: $('#lat').val(),
      lng: $('#lng').val(),

      startsAt: startsAtDateTime,
      endsAt: endsAtDateTime,
      hours: hours,
      
      instructions: $('#instructions').val(),

      rentalFeeInCents: parseInt($('#rentalFee').text())*100,
      deliveryFeeInCents: parseInt($('#deliveryFee').text())*100,
      totalFeeInCents: parseInt($('#totalFee').text())*100
    }
    console.log(booking)
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