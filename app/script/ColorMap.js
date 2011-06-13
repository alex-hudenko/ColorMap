function ColorMap() {	
	this.map = undefined;	
	this.styles = [];
	this.customTypeName = 'custom';
}

ColorMap.prototype.init = function(containerId, mapOptions) {
	mapOptions.mapTypeControlOptions = { mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'custom'] };
  this.map = new google.maps.Map(document.getElementById(containerId), mapOptions);
};

ColorMap.prototype.applyStyles = function(styles) {
	var customMapType = new google.maps.StyledMapType(styles);
	this.map.mapTypes.set(this.customTypeName, customMapType);
	this.map.setMapTypeId(this.customTypeName);
};
