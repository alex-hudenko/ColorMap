(function($) {

    $.colorMap = {
        instances: new Array()
    };

    // jQuery methods

    var methods = {

        init: function(options) {
            options = $.extend({}, $.fn.colorMap.defaults, options);
            return this.each(function(index, value) {
                var $this = $(this);
                var colorMap = $this.data('colorMap');
                if (!colorMap) {
                    $this.data('colorMap', new ColorMap($this, options));
                    $.colorMap.instances.push($this);
                }
            });
        },

        palette: function(palette) {
            return this.each(function(index, value) {
                var $this = $(this);
                var colorMap = $this.data('colorMap');
                if (colorMap) {
                    colorMap.setPalette(palette);
                } else {
                    $.error('ColorMap must be initiated before using "palette"');
                }
            });
        },

        colorScheme: function() {

        }
    };

    $.fn.colorMap = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.colorMap');
        }
    };

    // defauult settings

    $.fn.colorMap.defaults = {
        map: {
            zoom: 11
        }
    };

//----------------------------------------------------------------------------
    // ColorMap main class
    var ColorMap = function(element, options) {
        var self = this;
        self.element = element;
        self.options = options;
        self._init();
    };

    ColorMap.prototype = {
        element: undefined,
        map: undefined,
        _palette: {
            administrative: '#AFD7DB',
            landscape:      '#AF7575',
            road:           '#EFD8A1',
            water:          '#3D9CA8',
            labels:         '#BCD693'
        },
        _customTypeName: 'custom',
        _styles: [],
        _paletteSchema: {
            administrative: {
                'administrative.country':       {},
                'administrative.province':      {},
                'administrative.locality':      {},
                'administrative.locality':      {},
                'administrative.neighborhood':  {},
                'administrative.land_parcel':   {}
            },
            landscape: {
                'landscape.man_made':           { gamma: 0.3 },
                'landscape.natural':            { gamma: 0.3 },
                'poi':                          {},
                'poi.park':                     {}
            },
            road: {
                'road.highway':                 {},
                'road.arterial':                {},
                'road.local':                   {},
                'transit':                      {}
            },
            water: {
                'water':                        {}
            },
            labels: {
                'all':                          { elementType: 'labels' }
            }
        },

        _init: function() {
            var self = this;
            var mapOptions = self.options.map;
            mapOptions.mapTypeControlOptions = { mapTypeIds: [google.maps.MapTypeId.ROADMAP, self._customTypeName] };
            self.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        },

        _getStyle: function(key, options) {
            var style = {
                featureType : key,
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
        },

        _setStylesGeneric: function(styles, color) {
            var self = this;
            $.each(styles, function(key, options) {
                var hsl = $.Color(color).toHSL();
                var saturation = Math.ceil(hsl.saturationL() * 200 - 100);
                var lightness = Math.ceil(hsl.lightness() * 200 - 100);

                var style = self._getStyle(key, options);
                style.stylers[0].hue = color;
                style.stylers[1].saturation = saturation;
                style.stylers[2].lightness = lightness;

                self._styles.push(style);
            });
        },

        _setStylesForLabels: function(styles, color) {
            var self = this;
            $.each(styles, function(key, options) {
                var style = self._getStyle(key, options);
                style.stylers[0].hue = color;
                style.stylers[1].saturation = 100;
                style.stylers[2].lightness = 20;

            });
        },

        _updateStyles: function(palette) {
            var self = this;
            self._palette = $.extend(self._palette, palette);
            self._styles = [];
            $.each(self._palette, function(groupName, color) {
                var setStylesMethod = '_setStylesFor' + groupName.charAt(0).toUpperCase() + groupName.slice(1);
                if (typeof(self[setStylesMethod]) == 'function') {
                    self[setStylesMethod](self._paletteSchema[groupName], color);
                } else {
                    self._setStylesGeneric(self._paletteSchema[groupName], color);
                }
            });

            var customMapType = new google.maps.StyledMapType(self._styles);
            self.map.mapTypes.set(self._customTypeName, customMapType);
            self.map.setMapTypeId(self._customTypeName);
        },

        setPalette: function(palette) {
            var self = this;
            self._updateStyles({
                administrative: palette[3],
                landscape:      palette[0],
                road:           palette[1],
                water:          palette[4],
                labels:         palette[2]
            });
        }

    };


})(jQuery);
