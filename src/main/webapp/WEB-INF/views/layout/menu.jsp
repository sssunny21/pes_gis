<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<ul class="smenu">
	<li id="btn1"><a href="#"><img src="${pageContext.request.contextPath}/resources/images/mt_search_on.png" alt="검색" /></a></li>
	<li id="btn2"><a href="#"><img src="${pageContext.request.contextPath}/resources/images/mt_layer_off.png" alt="레이어" /></a></li>
	<li id="btn3"><a href="#"><img src="${pageContext.request.contextPath}/resources/images/mt_history_off.png" alt="이력" /></a></li>
	<li id="btn4"><a href="#"><img src="${pageContext.request.contextPath}/resources/images/mt_statistic_off.png" alt="통계" /></a></li>
</ul>

<div id="part1">
	<div class="smenu_con">
		<div class="search_box">
			<div class="search">
				<input type="text" id="search_text" class="namepikr">
				<div id="search_btn" onclick="searchT()" class="search_btn"></div>
			</div>
			<div>
				<select id="search_type" name="search_type" class="part1_search_select">
					<option value="1">지형지물</option>
					<option value="2">도로명</option>
					<option value="3">지번</option>
				</select>
				<label class="part1_search_check"><input type="checkbox" value="" id="bboxchk">화면 내 검색</label>
			</div>
			<div class="part1_search_sum">
				전체 <span id="search_list_count">0</span>건
			</div>
		</div>
	</div>

	<div id="search_list" class="search_result2"></div>
	<div id="search_list_paging" class="paging"></div>

</div>