function ColorMapStyleCollection() {
	this.styles = [
		// administrative
		this.createStyle({ featureType: 'administrative.country' 	  }), // 0
		this.createStyle({ featureType: 'administrative.province' 		}), // 1
		this.createStyle({ featureType: 'administrative.locality' 		}), // 2
		this.createStyle({ featureType: 'administrative.neighborhood' }), // 3
		this.createStyle({ featureType: 'administrative.land_parcel' 	}), // 4
		
		// landscape
		this.createStyle({ featureType: 'landscape.man_made', gamma: 0.3 					}), // 5 
		this.createStyle({ featureType: 'landscape.natural', gamma: 0.3 					}), // 6 
		
		
		// road
		this.createStyle({ featureType: 'road.highway' 								}), // 7
		this.createStyle({ featureType: 'road.arterial' 							}), // 8
		this.createStyle({ featureType: 'road.local' 									}), // 9
		
		// water
		this.createStyle({ featureType: 'water' 											}), // 10 , gamma: 0.6
		
		// poi		
		this.createStyle({ featureType: 'poi' }), // 11
		this.createStyle({ featureType: 'poi.park' }), // 12
		
		// transit
		this.createStyle({ featureType: 'transit'											}), // 13
		
		// labels
		this.createStyle({ featureType: 'all', elementType: 'labels'}), // 14	
		
	];
}

ColorMapStyleCollection.prototype.setColor = function(feature, color) {
	var hsl = $.Color(color).toHSL();
	var saturation = Math.ceil(hsl.saturationL() * 200 - 100);	
	var lightness = Math.ceil(hsl.lightness() * 200 - 100);
	var indexes;
	switch(feature) {
		case 'administrative':
			indexes = [0, 1, 2, 3, 4];
			this.setHSLAtIndex(indexes, color, saturation, lightness);
			break;
		case 'landscape':
			indexes = [5, 6, 11, 12];
			this.setHSLAtIndex(indexes, color, saturation, lightness);
			break;
		case 'road':
			indexes = [7, 8, 9, 13];
			this.setHSLAtIndex(indexes, color, saturation, lightness);
			break;		
		case 'water':
			indexes = [10];
			this.setHSLAtIndex(indexes, color, saturation, lightness);
			break;
		case 'labels':
			indexes = [14];
			this.styles[14].stylers[0].hue = color;
			this.styles[14].stylers[1].saturation = 100;
			this.styles[14].stylers[2].lightness = 20;
			break;
	}	
};

ColorMapStyleCollection.prototype.setHSLAtIndex = function(indexes, hue, saturation, lightness) {
	for (var i=0; i < indexes.length; i++) {			
		this.styles[indexes[i]].stylers[0].hue = hue;
		this.styles[indexes[i]].stylers[1].saturation = saturation;
		this.styles[indexes[i]].stylers[2].lightness = lightness;
	}
}

ColorMapStyleCollection.prototype.createStyle = function(options) {
	var style = {
		featureType : options.featureType,
		elementType : options.elementType ? options.elementType : "geometry",
		stylers : [
		  { hue: options.hue ? options.hue : "#000" },
		  { saturation: options.saturation ? options.saturation : 0 },
		  { lightness: options.lightness ? options.lightness : 0 },
		  { gamma: options.gamma ? options.gamma : 1 },
		  { visibility: options.visibility ? options.visibility : 'on' }
		]
	};
	return style;
};

ColorMapStyleCollection.prototype.getStyles = function() {
	return this.styles;
}