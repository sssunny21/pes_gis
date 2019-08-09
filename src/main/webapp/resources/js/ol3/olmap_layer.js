
		// 네이버에서 쓰는 define epsg:5179 projection
		proj4.defs("EPSG:5179","+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
		ol.proj.setProj4 = proj4;

		var resolutions = [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25];
		var extent      = [90112, 1192896, 2187264, 2765760];  // 4 * 3

		var projection = new ol.proj.Projection({
			code: 'EPSG:5179',
			extent: extent,
			units: 'm'
		});

		// 네이버 타일 지도 정의
		var naverTileLayer = new ol.layer.Tile({
			title : 'Naver 지도',
			visible : true,
			type : 'base',
			source : new ol.source.XYZ({
				projection: projection,
				crossOrigin: 'anonymous',
				tileSize: 256,
				minZoom: 0,
				maxZoom: resolutions.length - 1,
				tileGrid: new ol.tilegrid.TileGrid({
					extent: extent,
					origin: [extent[0], extent[1]],
					resolutions: resolutions
				}),
				tileUrlFunction: function (tileCoord, pixelRatio, projection) {
					if (tileCoord == null) return undefined;
					
					var s = Math.floor(Math.random() * 3) + 1;  // 1 ~ 4
					var z = tileCoord[0] + 1;
					var x = tileCoord[1];
					var y = tileCoord[2];
					
					return 'http://onetile' + s + '.map.naver.net/get/149/0/0/' + z + '/' + x + '/' + y + '/bl_vc_bg/ol_vc_an';
				},
				attributions: [
					new ol.Attribution({ 
						html: ['<a href="http://map.naver.com"><img src="http://static.naver.net/maps2/logo_naver_s.png"></a>']
					})
				]
			})
		});
