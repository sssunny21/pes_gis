package bsns_test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class MapController {
	@RequestMapping(value="/map.do")
	public String map(Model model){		
		return "map/map";
	}	
	
	/**
	 * @method_desc 주소검색 api 서비스
	 * @returns 주소검색 api 서비스
	 */
	@RequestMapping(value = "/apiVworldCall.do", produces = "application/json", method = RequestMethod.POST)
	@ResponseBody
	public JSONObject apiVworldCall(HttpServletRequest req) {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> map = new HashMap<String, Object>();
		
		JSONObject result = null;

		try {
			// json 문자열 hashmap 매핑
			map = mapper.readValue(req.getParameter("json").toString(), new TypeReference<Map<String, String>>() {});
		} catch (JsonParseException e1) {
			e1.printStackTrace();
		} catch (JsonMappingException e1) {
			e1.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}

		try {
			String apiURL = "";
			String str = ((String) map.get("text")).replaceAll("\\p{Z}", "\\/"); //string 공백제거
			str = URLEncoder.encode(str, "utf-8");
			
			String bound = "";
			if (map.get("bound1") != null)
				bound = "&bbox=" + (String) map.get("bound1") + "," + (String) map.get("bound2") + "," + (String) map.get("bound3") + "," + (String) map.get("bound4");
				String pageNum = (String) map.get("pageNum");
			if (map.get("type").equals("1")) {
				apiURL = "http://api.vworld.kr/req/search?service=search&request=search&version=2.0&crs=EPSG:900913&size=5&page="
						+ pageNum + "&query=" + str + bound
						+ "&type=place&format=json&errorformat=json&key=25DE79AA-5074-3586-A909-70433B4EF531";
			}
			if (map.get("type").equals("2")) {
				apiURL = "http://api.vworld.kr/req/search?service=search&request=search&version=2.0&crs=EPSG:900913&size=5&page="
						+ pageNum + "&query=" + str + bound
						+ "&type=address&category=road&format=json&errorformat=json&key=25DE79AA-5074-3586-A909-70433B4EF531";
			}
			if (map.get("type").equals("3")) {
				apiURL = "http://api.vworld.kr/req/search?service=search&request=search&version=2.0&crs=EPSG:900913&size=5&page="
						+ pageNum + "&query=" + str + bound
						+ "&type=address&category=parcel&format=json&errorformat=json&key=25DE79AA-5074-3586-A909-70433B4EF531";
			}
			URL url = new URL(apiURL);
			//System.out.println("검색어 :" + map.get("text"));
			HttpURLConnection con = (HttpURLConnection) url.openConnection();
			con.setRequestMethod("GET");
			
			int responseCode = con.getResponseCode();
			BufferedReader br;
			if (responseCode == 200) { // 정상 호출
				br = new BufferedReader(new InputStreamReader(con.getInputStream(), "utf-8"));
			} else { // 에러 발생
				br = new BufferedReader(new InputStreamReader(con.getErrorStream(), "utf-8"));
			}
			String inputLine;
			StringBuffer response = new StringBuffer();
			while ((inputLine = br.readLine()) != null) {
				response.append(inputLine);
			}
			br.close();
			
			JSONParser parser = new JSONParser();
			JSONObject json = (JSONObject) parser.parse(response.toString());
			
			result = (JSONObject) json.get("response");

		} catch (Exception e) {
			System.out.println(e);
		}

		return result;
	}

}
