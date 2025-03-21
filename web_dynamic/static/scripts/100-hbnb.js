$('document').ready(function () {
    const api = 'http://' + window.location.hostname;
  
    $.get(api + ':5001:/api/v1/status/', function (response) {
      if (response.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  
    $.ajax({
      url: api + ':5001/api/v1/places_search/',
      type: 'POST',
      data: '{}',
      contentType: 'application/json',
      dataType: 'json',
      success: appendPlaces
    });
  
    let states = {};
    $('.locations > ul > h2 > input[type="checkbox"]').change(function () {
      if ($(this).is(':checked')) {
        states[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
        delete states[$(this).attr('data-id')];
      }
      const locations = Object.assign({}, states, cities);
      if (Object.values(locations).length === 0) {
        $('.locations h4').html('&nbsp;');
      } else {
        $('.locations h4').text(Object.values(locations).join(', '));
      }
    });
  
    let cities = {};
    $('.locations > ul > ul > li input[type="checkbox"]').change(function () {
      if ($(this).is(':checked')) {
        cities[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
        delete cities[$(this).attr('data-id')];
      }
      const locations = Object.assign({}, states, cities);
      if (Object.values(locations).length === 0) {
        $('.locations h4').html('&nbsp;');
      } else {
        $('.locations h4').text(Object.values(locations).join(', '));
      }
    });
  
    let amenities = {};
    $('.amenities input[type="checkbox"]').change(function () {
      if ($(this).is(':checked')) {
        amenities[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
        delete amenities[$(this).attr('data-id')];
      }
      if (Object.values(amenities).length === 0) {
        $('.amenities h4').html('&nbsp;');
      } else {
        $('.amenities h4').text(Object.values(amenities).join(', '));
      }
    });
  
    $('button').click(function () {
      $.ajax({
        url: api + ':5001/api/v1/places_search/',
        type: 'POST',
        data: JSON.stringify({
          'states': Object.keys(states),
          'cities': Object.keys(cities),
          'amenities': Object.keys(amenities)
        }),
        contentType: 'application/json',
        dataType: 'json',
        success: appendPlaces
      });
    });
  });
  
  function appendPlaces (data) {
    $('section.places').empty();
    $('section.places').append(data.map(place => {
      return `<article>
                <div class="title">
                  <h2>${place.name}</h2>
                    <div class="price_by_night">
                      ${place.price_by_night}
                    </div>
                  </div>
                  <div class="information">
                    <div class="max_guest">
                      <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                      </br>
                      ${place.max_guest} Guests
                    </div>
                    <div class="number_rooms">
                      <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                      </br>
                      ${place.number_rooms} Bedrooms
                    </div>
                    <div class="number_bathrooms">
                      <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                      </br>
                      ${place.number_bathrooms} Bathrooms
                    </div>
                  </div>
                  <div class="description">
                    ${place.description}
                  </div>
                </article>`;
    }));
}