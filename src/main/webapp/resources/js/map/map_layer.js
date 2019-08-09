 /** 
  * Version : 1.1
  * 파일명: map_layer.js
  * 작성일자 : 2019-08-08
  * 작성자 : 박은선
  * 설명 : 지도 객체와 레이어 
*/

var map = null;
var markerLayer = null;
// popup overlay객체
/*var container = $('#roadinfo_layer')[0];
var content = $('#popup')[0];
var closer = $('#popup-closer')[0];
var overlay = new ol.Overlay(({
	element : container
}));
closer.onclick = function() {
	overlay.setPosition(undefined);
	closer.blur();
	return false;
};*/

/* 지도의 투영, 초기위치, 줌레벨을 설정해줍니다.
 */

var view = new ol.View({

	// projection :'EPSG:4326',

	// center: [128, 37], //osm EPSG:4326 좌표

	// center: [946170.1205730336, 1953511.8578193234], //네이버 EPSG:5179 좌표

	center : [ 14135912.772183012, 4518334.067689836 ], // vworld EPSG:3857 좌표

	zoom : 14,

	minZoom : 7,

	maxZoom : 18

});


//기본 배경지도
var baseLayer_1 = new ol.layer.Tile({

	// name: 'VWORLD 2D',

	source : new ol.source.XYZ({

		attributions : new ol.Attribution({

			html : 'Data by <a href="http://map.vworld.kr">VWORLD 2D</a>"'

		}),

		projection : 'EPSG:3857',

		crossOrigin : 'anonymous',

		url : 'https://xdworld.vworld.kr/2d/Base/201802/{z}/{x}/{y}.png'

	}),

	visible : true

// ,zIndex : 0

});

// 배경지도_위성
var baseLayer_2 = new ol.layer.Tile({

	// name: 'VWORLD 2D',

	source : new ol.source.XYZ({

		attributions : new ol.Attribution({

			html : 'Data by <a href="http://map.vworld.kr">VWORLD 2D</a>"'

		}),

		projection : 'EPSG:3857',

		crossOrigin : 'anonymous',

		// url :

		// 'http://map.vworld.kr/js/apis.do?type=Base&apiKey=25DE79AA-5074-3586-A909-70433B4EF531'

		url : 'https://xdworld.vworld.kr/2d/Satellite/201807/{z}/{x}/{y}.jpeg'

	}),

	visible : true

// ,zIndex : 0

});

// 배경지도_회색
var baseLayer_3 = new ol.layer.Tile({

	// name: 'VWORLD 2D',

	source : new ol.source.XYZ({

		attributions : new ol.Attribution({

			html : 'Data by <a href="http://map.vworld.kr">VWORLD 2D</a>"'

		}),

		projection : 'EPSG:3857',

		crossOrigin : 'anonymous',

		// url :

		// 'http://map.vworld.kr/js/apis.do?type=Base&apiKey=25DE79AA-5074-3586-A909-70433B4EF531'

		url : 'https://xdworld.vworld.kr/2d/gray/201812/{z}/{x}/{y}.png'

	}),

	visible : true

// ,zIndex : 0

});

// 배경지도_야간
var baseLayer_4 = new ol.layer.Tile({

	// name: 'VWORLD 2D',

	source : new ol.source.XYZ({

		attributions : new ol.Attribution({

			html : 'Data by <a href="http://map.vworld.kr">VWORLD 2D</a>"'

		}),

		projection : 'EPSG:3857',

		crossOrigin : 'anonymous',

		// url :

		// 'http://map.vworld.kr/js/apis.do?type=Base&apiKey=25DE79AA-5074-3586-A909-70433B4EF531'

		url : 'https://xdworld.vworld.kr/2d/midnight/201812/{z}/{x}/{y}.png'

	}),

	visible : true

// ,zIndex : 0

});

