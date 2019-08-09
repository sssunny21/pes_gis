/*
 *
 * 지도 기본기능
 *
 */

//지도 줌인
function zoom_in() {
	map.getView().setZoom(map.getView().getZoom() + 1);
}

// 지도 줌아웃
function zoom_out() {
	map.getView().setZoom(map.getView().getZoom() - 1);
}

// 면적 또는 거리 재기
function toggleControl_m(fn_type) {

	// 면적 또는 거리 재기 포인트 좌표 지우기
	map.removeInteraction(draw);

	// 면적 또는 거리 형상 지우기
	// var features = vector.getSource().getFeatures();
	//
	// if (features.length > 0) {
	// for (var i = 0; i < features.length; i++) {
	// vector.getSource().removeFeature(features[i]);
	// }
	// }

	// 면적 또는 거리 텍스트 지우기
	// $('.ol-overlay-container').remove();

	// 면적 또는 거리 측정
	if (fn_type == 'line') {
		addInteraction('LineString');
	} else {
		addInteraction('Polygon');
	}
}

// 작업취소(맵 초기화)
function initMap() {
	map.removeInteraction(draw);

	// 오버레이 컨테이너 제거
	$('.ol-overlay-container').remove();

	// 맵에 존재하는 모든 features 들을 제거
	var features = vector.getSource().getFeatures();

	if (features.length > 0) {
		for (var i = 0; i < features.length; i++) {
			// 그려지는 feature의 타입을 미리 지정해서 지우지 말아야할것들은 지우지 않는다.
			vector.getSource().removeFeature(features[i]);
		}
	}

	overlay = new ol.Overlay(({
		element : container
	}));
	map.addOverlay(overlay);
}

/*
 * 이미지 저장 - (오픈레이어 예제) 거리재기, 면적재기등의 tooltip 이 나오지 않는다. IE11에서 안됨...
 */
function saveMapImage_ol_example() {
	map.once('postcompose', function(event) {
		var canvas = event.context.canvas;
		
		if (navigator.msSaveBlob) {
			navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
		} else {
			canvas.toBlob(function(blob) {
				saveAs(blob, 'map.png');
			});
		}
	});
	map.renderSync();
}
/*
 * 이미지 저장 - div를 저장하기때문에 tooltip도 나온다.
 */
function saveMapImage_div_to_image_example() {
	html2canvas($("#map"), {
		//useCORS : true,
		//allowTaint: true,
		onrendered : function(canvas) {
			// 다음 if절이 true면 ie
			if (canvas.msToBlob) {
				var blob = canvas.msToBlob();
				window.navigator.msSaveBlob(blob, 'map.png');
			} else {

				// 크롬에서 다운로드
				var link = document.createElement("a");
				var blob = dataURLtoBlob(canvas.toDataURL()); //.replace(/^data:image\/png/, "data:application/octet-stream") 이미지 태그
				var objurl = URL.createObjectURL(blob);
				link.href = objurl;
				link.download = "map.png";
				link.click();

				// 파이어폭스에서 다운로드
				/*
				 * var event = new MouseEvent('click');
				 * link.dispatchEvent(event);
				 */
			}
		}
	});
}

/* DataUrl을 Blob로 바꾼다. */
function dataURLtoBlob(dataurl) {
	var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(
			n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([ u8arr ], {
		type : mime
	});
}