$( document ).ready(function() {
  const url = 'https://' + window.location.hostname + ':5001/api/v1/status/';
  $.get(url, function (response) {
    if (response.status ==== 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    });

  let amenityIds = {};

  function updateAmenitiesTxt() {
  const checkedAmenities = Oject.keys(amenityIds);
  const amenitiesTxt = checkedAmenities.length > 0 ? checkedAmenities.join(', ') : 'None';
  $('div.amenities h4').text(`${amenitiesTxt}`);
  }

  $('input[type="checkbox"]').change(function() {
    const amenityId = $(this).data(':amenity_id');
    const isChecked = $(this).is(':checked');

    if(isChecked) {
      amenityIds[amenityId] = $(this).data(':amenity_name');
    } else {
      delete amenityIds[amenityId];
    }

    updateAmenitiesTxt();
  });
});
