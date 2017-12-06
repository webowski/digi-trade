jQuery(document).ready(function($) {
	
	ymaps.ready(function() {
		$('.map').each(function() {

			var $map 			= $(this)
				, location 	= $map.data('location')
				, locationTitle 	= $map.data('title')
				;

			var center = ($map.data('center')) ? $map.data('center') : $map.data('location');

			var map = new ymaps.Map( this, {
				center: center,
				zoom: 17,
				controls: ["fullscreenControl"]
			});

			var marker = new ymaps.Placemark($map.data('location'), {
				iconCaption: locationTitle,
				rotation: 0
			}, {
				preset: 'islands#redDotIconWithCaption'
			});
			map.geoObjects.add(marker);
			map.controls.add('zoomControl', {position: { top: 10, left: 10 }});
			map.behaviors.disable('scrollZoom');

		});
	});


});

