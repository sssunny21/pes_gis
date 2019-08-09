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
	console.log(ctx);
	$.ajax({
		url : ctx + "/apiVworldCall",
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
		for (var i = 0; i < addressList.length; i++) {

		}

		$addressList.append(getAddressHtml(addressList, type));
		initMarker(addressList);
	} else {
		noList();
	}
}