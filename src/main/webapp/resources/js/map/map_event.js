 /** 
  * Version : 1.1
  * 파일명: map_event.js
  * 작성일자 : 2019-08-08
  * 작성자 : 박은선
  * 설명 : 지도페이지 이벤트 동작 정의 
*/

// 배경지도 바꾸기
function backgroudChange() {
	if ($('#background option:selected').val() == "1") {
		map.removeLayer(baseLayer_2);
		map.removeLayer(baseLayer_3);
		map.removeLayer(baseLayer_4);
		map.addLayer(baseLayer_1);
	}

	if ($('#background option:selected').val() == "2") {
		map.removeLayer(baseLayer_1);
		map.removeLayer(baseLayer_3);
		map.removeLayer(baseLayer_4);
		map.addLayer(baseLayer_2);
	}

	if ($('#background option:selected').val() == "3") {
		map.removeLayer(baseLayer_1);
		map.removeLayer(baseLayer_2);
		map.removeLayer(baseLayer_4);
		map.addLayer(baseLayer_3);
	}

	if ($('#background option:selected').val() == "4") {
		map.removeLayer(baseLayer_1);
		map.removeLayer(baseLayer_2);
		map.removeLayer(baseLayer_3);
		map.addLayer(baseLayer_4);
	}
}

//주소 검색
function searchT(num) {
	var obj = new Object();
	obj.text = $('#search_text').val().trim();
	obj.type = $('#search_type option:selected').val();

	// 화면 내 검색
	if ($('input[id="bboxchk"]').is(":checked")) {
		obj.bound1 = map.getView().calculateExtent(map.getSize())[0];
		obj.bound2 = map.getView().calculateExtent(map.getSize())[1];
		obj.bound3 = map.getView().calculateExtent(map.getSize())[2];
		obj.bound4 = map.getView().calculateExtent(map.getSize())[3];
	}

	if (num == null)
		obj.pageNum = "1";
	else
		obj.pageNum = num;

	var data = JSON.stringify(obj);
	
	$.ajax({
		url : "/apiVworldCall.do",
		type : "POST",
		data : {
			json : data
		},
		dataType : "json",
		success : function(result) {
			searchResultParser(result, obj.type);
		},
		error : function(xhr, textStatus, error) {
			noList();
		}
	});
}

//에러 or 결과 없음
function noList() {
	var $addressList = $('#search_list');
	var noHtml = '';
	noHtml += '<div>';
	noHtml += '검색 결과가 없습니다.';
	noHtml += '</div>';
	
	$('#search_list_paging').empty();
	$('#search_list_count').text("0");
	
	map.removeLayer(markerLayer);
	$addressList.empty();
	$addressList.append(noHtml);
}

// 결과 파싱
function searchResultParser(result, type) {
	if (result.result != null) {
		var addressList = result.result.items;
		var $addressList = $('#search_list');
		$addressList.empty();
		pagingParser(result);

		$addressList.append(getAddressHtml(addressList, type));
		initMarker(addressList);
	} else {
		noList();
	}
}

//페이징 function
function pagingParser(result) {
	var totalCount = result.record.total;
	var pagingCount = parseInt(result.page.total);
	var $count = $('#search_list_count');
	var $paging = $('#search_list_paging');

	$count.text(totalCount);
	$paging.empty();
	$paging.append(getPagingHtml(result.page));
}

//페이징 구현 function
function getPagingHtml(page) {
	var pRCnt = parseInt(page.current / 5);
	if (page.current % 5 == 0)
		pRCnt = parseInt(page.current / 5) - 1;
	var startP = pRCnt * 5;
	var pagingHtml = '';

	if (startP != 0) {
		pagingHtml += '<a style="margin-right:5px;" class="before" href="javascript:searchT('
				+ (pRCnt * 5) + ')"><span class="blind">이전페이지로</span></a>';
	}

	if (startP + 5 >= page.total) {
		for (var i = startP + 1; i <= page.total; i++) {
			if (i == page.current) {
				pagingHtml += '<a class="current" href="javascript:searchT(' + i + ')">' + i
						+ '</a>';
			} else {
				pagingHtml += '<a class="lnk" href="javascript:searchT(' + i + ')">' + i + '</a>';
			}
			pagingHtml += ' ';
		}
	} else {
		for (var i = startP + 1; i < startP + 6; i++) {
			if (i == page.current) {
				pagingHtml += '<a class="current" href="javascript:searchT(' + i + ')">' + i
						+ '</a>';
			} else {
				pagingHtml += '<a class="lnk" href="javascript:searchT(' + i + ')">' + i + '</a>';
			}
			pagingHtml += ' ';
		}
	}

	if (page.total > (pRCnt + 1) * 5) {
		pagingHtml += '<a class="after" href="javascript:searchT(' + ((pRCnt + 1) * 5 + 1)
				+ ')"><span class="blind">다음페이지로</span></a>';
	}
	return pagingHtml;
}

//리스트 출력 function
function getAddressHtml(addressList, type) {
	var eng = [ 'A', 'B', 'C', 'D', 'E' ];
	var addressHtml = '';

	addressHtml += '<ul>';

	for (var i = 0; i < addressList.length; i++) {
		addressHtml += '<li class="search_result2">';
		addressHtml += '	<a href="javascript:clickAList(\''
		+ addressList[i].point.x + '\', \'' + addressList[i].point.y
		+ '\', \'' + addressList[i].address.road + '\');">';
		addressHtml += '		<div id="' + addressList[i].id + '" class="search_result_dt_g">';
		addressHtml += '		<span class="search_result_dt_nb">' + eng[i] + '</span>';

		if (type == '1') {
			// 지형지물
			addressHtml += '			<span class="search_result_dt_t">' + addressList[i].title
					+ '</span>';
			addressHtml += '			<span class="search_result_dt_s">' + addressList[i].address.parcel
					+ '</span>';
		} else if (type == '2') {
			// 도로명
			addressHtml += '			<span class="search_result_dt_t">' + addressList[i].address.bldnm
					+ '</span>';
			addressHtml += '			<span class="search_result_dt_s">' + addressList[i].address.road
					+ '</span>';
		} else if (type == '3') {
			// 지번
			addressHtml += '			<span class="search_result_dt_t">' + addressList[i].address.parcel
					+ '</span>';
			addressHtml += '			<span class="search_result_dt_s">' + addressList[i].address.zipcode
					+ '</span>';
		}

		addressHtml += '		</div>';
		addressHtml += '	</a>';
		addressHtml += '</li>';
	}
	addressHtml += '</ul>';
	return addressHtml;
}

//마커 찍어주는 function
function initMarker(addressList) {
	map.removeLayer(markerLayer);
	
	var list = addressList;
	
	var iconFeatures = [];
	var iconFeature = null;	
	
	for(var i = 0; i < list.length; i++){
		iconFeature = new ol.Feature({
			geometry : new ol.geom.Point([list[i].point.x,list[i].point.y]),
			name : list[i].title,
			id : list[i].id,
			address : list[i].address
		})
		iconFeature.setStyle(iconStyle);
		iconFeatures.push(iconFeature);
	}
	
	var vectorSource = new ol.source.Vector({
		features : iconFeatures
	});
	
	markerLayer = new ol.layer.Vector({
		source : vectorSource,
		zIndex : 30
	});
	
	map.addLayer(markerLayer);
	if ($('input[id="bboxchk"]').is(":checked")) {
	} else {
		setMapCenter(list[0].point.x, list[0].point.y, 14);
	}
}

//center를 set시키는 function
function setMapCenter(x, y, zoom) {
	map.getView().setCenter([x*1,y*1]);
	map.getView().setZoom(zoom);
}