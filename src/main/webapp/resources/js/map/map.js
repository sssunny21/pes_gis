/**
 * 지도 초기화 및 레이어 셋팅
 */

 
/*
 * 지도의 투영, 초기위치, 줌레벨을 설정해줍니다.
 */
var view =  new ol.View({
	//projection :'EPSG:4326',
	//center: [128, 37], //osm EPSG:4326 좌표
	//center: [946170.1205730336, 1953511.8578193234],  //네이버 EPSG:5179 좌표
	center: [14135912.772183012, 4518334.067689836],  //vworld EPSG:3857 좌표
	zoom: 14,
	minZoom: 8,
	maxZoom:20
});

/*
 * 맵 오브젝트 선언
 */
var map = new ol.Map({
	target: 'map',
	layers: [
		//네이버 맵
		//naverTileLayer


		/*  //오픈스트리트맵
		new ol.layer.Tile({
            source: new ol.source.OSM()
		})
		*/

		 //브이월드맵
		new ol.layer.Tile({
			//name: 'VWORLD 2D',
			source: new ol.source.XYZ({
				attributions: new ol.Attribution({
					html: 'Data by <a href="http://map.vworld.kr">VWORLD 2D</a>"'
				}),
				projection: 'EPSG:3857',
				crossOrigin: 'anonymous',
				url: 'https://xdworld.vworld.kr/2d/Base/201612/{z}/{x}/{y}.png'
			}),
			visible: true
		})
		


	],
	view: view,

	
	/*  기본 맵 컨트롤러
	controls: ol.control.defaults({
		attribution: false, //맵 속성
		zoom: true,  //줌 슬라이더
		rotate: true
	})
	*/

	//컨트롤러 확장.
	//각 컨트롤러 위치는 css로 설정하는게 편합니다. (크롬속성으로 클래스 알아내서 할 것.)
	controls: ol.control.defaults().extend(
		[
			new ol.control.ZoomSlider()  //줌슬라이더
			,new ol.control.ScaleLine({"units": "metric"}) //스케일라인.  유감스럽게도 EPSG 4326 지도에서는 부정확하다고한다... 
														   //ol 5버전에서 해결되었다고함...
														   //ScaleLine 을 projection.getUnits()을 사용해서 커스터마이징 하면 될거같긴 합니다...
			,new ol.control.MousePosition() //마우스 포지션위치 표시
			//이것 외 풀스크린, 오버뷰맵, 로테이트 등이 있다.
		]
	)
	//맵 만들때 위와같이 컨트롤러에 속성을 바로 넣어주거나 
	//map.addControl 함수를 쓰는방법도 있음.

});





