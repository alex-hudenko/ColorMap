<div id="map"></div>

<div id="toolbar">
	<div id="palette">
		<div id="color-0" class="color">0</div>
		<div id="color-1" class="color">1</div>
		<div id="color-2" class="color">2</div>
		<div id="color-3" class="color">3</div>
		<div id="color-4" class="color">4</div>
	</div>

	<select name="features" id="features">
		<optgroup label="administrative">
			<option value="0">administrative.country</option>
			<option value="1">administrative.province</option>
			<option value="2">administrative.locality</option>
			<option value="3">administrative.neighborhood</option>
			<option value="4">administrative.land_parcel</option>
		</optgroup>
		<optgroup label="landscape">
			<option value="5">landscape.man_made</option>
			<option value="6">landscape.natural</option>
		</optgroup>
		<optgroup label="road">
			<option value="7">road.highway</option>
			<option value="8">road.arterial</option>
			<option value="9">road.local</option>
		</optgroup>
		<optgroup label="water">
			<option value="10">water</option>
		</optgroup>
		<optgroup label="labels">
			<option value="14">labels</option>
		</optgroup>
		<optgroup label="poi">
			<option value="11">point of interest</option>
			<option value="12">poi.park</option>
		</optgroup>
		
		<optgroup label="transit">
			<option value="13">transit</option>
		</optgroup>
			
	</select><br>
	
	saturation(<span id="currentSaturation"></span>):<div id="slider-s"></div>
	lightness(<span id="currentLightness"></span>):<div id="slider-l"></div>
	
</div>

<script type="text/javascript" charset="utf-8">	
	$(document).ready(function(){ 
		init();
	});
</script>