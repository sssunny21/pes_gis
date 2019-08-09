<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <tiles:insertAttribute name="head" />
</head>
<body>

	<div id="mheader">
		<div class="user_info">
			<span class="logout" id="closeWindow" style="cursor: pointer;">창닫기</span>
		</div>
	</div>
	<div id="contents">
		<div class="map_left">
			<tiles:insertAttribute name="menu"/> 
		</div>
		<div class="map_right">
			<tiles:insertAttribute name="content"/>
		</div>
	</div>
	<!-- js -->
	<script defer type="text/javascript" src="${pageContext.request.contextPath}/resources/js/map/map_base_fn.js"></script>
	<script defer type="text/javascript" src="${pageContext.request.contextPath}/resources/js/map/map_event.js"></script>
	<script defer type="text/javascript" src="${pageContext.request.contextPath}/resources/js/map/map_layer.js"></script>
	<script defer type="text/javascript" src="${pageContext.request.contextPath}/resources/js/map/map.js"></script>
</body>
</html>


