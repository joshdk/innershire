;(function(geoPosition, jx, shire){

	var ajax = function(url, onSuccess, onError){
		jx.load(url, onSuccess, "json");
	}

	var fillLocation = function(){
		if(!geoPosition.init()){
			alert("Error: Your device does not currently support Geolocation.");
			return;
		}

		geoPosition.getCurrentPosition(
			function(position){
				document.getElementById("form-address").value = position.coords.latitude + ", " + position.coords.longitude;
			},
			function(){
				alert("Error: Could not obtain device Geolocation.");
			}
		);
	}

	var searchLocation = function(){

		var address = document.getElementById("form-address").value;
		var answerNode = document.getElementById("answer");

		shire.init(ajax);
		shire.setLocation(address);

		answerNode.innerHTML = "Searching...";

		shire.checkInnerShire(
			function(isInner, time){

				if(isInner){
					console.log("You are in the inner shire!");
					answerNode.innerHTML = "You are in the inner shire!";
					return;
				}
//{{{ Check outer shire
				shire.checkOuterShire(
					function(isOuter, time){
						console.log(isOuter);
						console.log(time);

						if(isOuter){
							console.log("You are in the outer shire!");
							answerNode.innerHTML = "You are in the outer shire!";
							return;
						}

						console.log("You are outside the shire...");
						answerNode.innerHTML = "You are outside the shire entirely...";

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

	}



	window.onload = function(){
		document.getElementById("form-locate").onclick = function(){
			fillLocation();
			return false;
		}

		document.getElementById("form-submit").onclick = function(){
			searchLocation();
			return false;
		}

		document.getElementById("form").onsubmit = function(){
			searchLocation();
			return false;
		}

	};

})(geoPosition, jx, shire);
