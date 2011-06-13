function init() {

    $.getJSON(
            '/kuler',

            function(response) {
                var colors = response.colors;

                $('#map').colorMap({
                    map: {
                        zoom: 11,
                        center: new google.maps.LatLng(40.6743890, -73.9455)
                    }
                });

                $('#map').colorMap('palette', colors);

                for (var i = 0; i < colors.length; i++) {
                    $('#toolbar #palette #color-' + i).css({ background : colors[i] }); // debug palette
                }
            }
    );

    $('#palette').draggable();

}
