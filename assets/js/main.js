;(function(geoPosition, jx, shire){

	var ajax = function(url, onSuccess, onError){
		jx.load(url, onSuccess, "json");
	}

	window.onload = function(){
		if(!geoPosition.init()){  // Geolocation Initialisation
			console.log("Geolocation not supported...");
			return;
		}

		geoPosition.getCurrentPosition(
			function(position){
				shire.init(ajax);
				shire.setLocation(position.coords.latitude + "," + position.coords.longitude);
//{{{ Check inner shire
				shire.checkInnerShire(
					function(isInner, time){
						console.log(isInner);
						console.log(time);

						if(isInner){
							console.log("You are in the inner shire!");
							return;
						}
//{{{ Check outer shire
						shire.checkOuterShire(
							function(isOuter, time){
								console.log(isOuter);
								console.log(time);

								if(isOuter){
									console.log("You are in the outer shire!");
									return;
								}

								console.log("You are outside the shire...");

							},
							function(){
								console.log("checkOuterShire failed...");
							}
						);
//}}}
					},
					function(){
						console.log("checkInnerShire failed...");
					}
				);
//}}}
			},
			function(){
				console.log("failed to obtain geoposition");
			}
		);

	};

})(geoPosition, jx, shire);
