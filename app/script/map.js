function init () {
	
	var map = new ColorMap();
	
	map.init('map', {
    zoom: 7,
 		// disableDefaultUI: true,
    center: new google.maps.LatLng(40.6743890, -73.9455)
	});
	
	var styler = new ColorMapStyleCollection();
		
	$.getJSON(
		'/kuler', 
		function(response) {
			var colors = response.colors;
			
			for (var i=0; i < colors.length; i++) {				
				$('#toolbar #palette #color-'+i).css({ background : colors[i] });				
			};
			
			styler.setColor('administrative', colors[3]);
			styler.setColor('landscape', colors[0]);
			styler.setColor('road', colors[1]);
			styler.setColor('water', colors[4]);
			styler.setColor('labels', colors[2]);
			map.applyStyles(styler.getStyles());
		}
	);
	
	$('#palette').draggable();

}