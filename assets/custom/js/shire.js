;var shire = (function(){

	var shire = {
//{{{ Location definitions
		origin : "100 Hamilton Ave, Palo Alto, CA",
		inner : {
			mode : "walking",
			time : 60 * 20
		},
		outer : {
			mode : "bicycling",
			time : 60 * 15
		}
//}}}
	};

	var ajax = false;
	var location = false;

	shire.init = function(_ajax){
		ajax = _ajax
	};

	shire.setLocation = function(_location){
		location = _location;
	};

//{{{ Check if the given location is inside the given shire
	shire.checkShire = function(name, onSuccess, onError){
		if(!location){
			return;
		}

		var params = [
			"origins=" + encodeURIComponent(shire.origin),
			"destinations=" + encodeURIComponent(location),
			"mode=" + shire[name].mode,
			"sensor=true"
		];

		var url = "https://maps.googleapis.com/maps/api/distancematrix/json?" + params.join("&");

		ajax(url,
			function(data){
				try{
					time = data.rows[0].elements[0].duration.value;
					onSuccess(time <= shire[name].time, time);
				}catch(e){
					onError();
				}
			},
			onError
		);
	};
//}}}

//{{{ Check if the given location is inside the inner shire
	shire.checkInnerShire = function(onSuccess, onError){
		return shire.checkShire("inner", onSuccess, onError);
	};
//}}}

//{{{ Check if the given location is inside the outer shire
	shire.checkOuterShire = function(onSuccess, onError){
		return shire.checkShire("outer", onSuccess, onError);
	};
//}}}

	return shire;

})();
