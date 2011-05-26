function init () {
	
	var map = new ColorMap();

asdfas	
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
				$('#toolbar #palette #color-'+i).css({ background : colors[i] }); // debug palette
				// $('#toolbar #features optgroup:eq('+i+')').css({ background : colors[i] }); // debug palette
			};
			
			// $('#toolbar #features optgroup:eq(5)').css({ background : colors[0] }); // color for poi
			// $('#toolbar #features optgroup:eq(6)').css({ background : colors[1	] }); // color for transit
			
			styler.setColor('administrative', colors[3]);
			styler.setColor('landscape', colors[0]);//0
			styler.setColor('road', colors[1]);
			styler.setColor('water', colors[4]);
			styler.setColor('labels', colors[2]);
			map.applyStyles(styler.getStyles());
		}
	);
	
	// 	debug toolbar	
	$('#currentSaturation').text('?');
	$('#currentLightness').text('?');
	
	$('#palette').draggable();

	$( "#slider-s" ).slider({
		min: -100,
		max: 100, 
		value: 0,
		stop: function(e, ui) {	
			$('#currentSaturation').text(ui.value);
			styler.styles[$("#features").val()].stylers[1].saturation = ui.value;			
			map.applyStyles(styler.getStyles());
		}
	});
	
	$( "#slider-l" ).slider({
		min: -100,
		max: 100, 
		value: 0,
		stop: function(e, ui) {			
			$('#currentLightness').text(ui.value);
			styler.styles[$("#features").val()].stylers[2].lightness = ui.value;			
			map.applyStyles(styler.getStyles());			
		}
	});
}