 /** 
  * Version : 1.0
  * 파일명: common.js
  * 작성일자 : 2018-10-10
  * 작성자 : 양상완
  * 설명 : 컨텍스프 패스 처리 .
*/
function getContextPath(){
    var offset=location.href.indexOf(location.host)+location.host.length;
    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
    return ctxPath;
}
//경로가 aaa/bbb 로 되면 앞에것만 가져오기때문에 작동 X
//var ctx = getContextPath();
var ctx = getContextPath();

//replaceAll 선언
String.prototype.replaceAll = function(org, dest){
    return this.split(org).join(dest);
}

/*리사이징*/
function reScaleScreen(fixWidth){
    var oriWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var tScale = oriWidth / fixWidth;    // 720p 기준에 스케일 산출
    var viewPortString = $('meta[name=viewport]').attr('content');
    // viewport의 Scale 옵션 변환 (주 Target인 fixWidth 적용)
    viewPortString = viewPortString.replaceAll(1, tScale);
    // 메타 태그 적용
    $('meta[name=viewport]').attr('content', viewPortString);
}
//reScaleScreen(720);


