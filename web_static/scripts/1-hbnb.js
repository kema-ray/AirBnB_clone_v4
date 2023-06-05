$( document ).ready(function() {
  const amenityIds = {};

  function updateAmenitiesTxt() {
  const checkedAmenities = Oject.keys(amenityIds);
  const amenitiesTxt = checkedAmenities.length > 0 ? checkedAmenities.join(', ') : 'None';
  $('div.amenities h4').text(`${amenitiesTxt}`);
  }

  $('input[type="checkbox"]').change(function() {
    const amenityId = $(this).data(':amenity_id');
    const isChecked = $(this).is(':checked');

    if(isChecked) {
      amenityIds[amenityId] = true;
    } else {
      delete amenityIds[amenityId];
    }

    updateAmenitiesTxt();
  });
});
