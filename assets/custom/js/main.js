;(function(geoPosition, $, shire){

	var $address = false;
	var $answerInner = false;
	var $answerOuter = false;
	var $formLocate = false;
	var $formSubmit = false;
	var $form = false;


	var fillLocation = function(){
		if(!geoPosition.init()){
			alert("Error: Your device does not currently support Geolocation.");
			return;
		}

		geoPosition.getCurrentPosition(
			function(position){
				$address.val(position.coords.latitude + ", " + position.coords.longitude);
			},
			function(){
				alert("Error: Could not obtain device Geolocation.");
			}
		);
	}


	var searchLocation = function(){

		shire.setLocation($address.val());

		$answerOuter.slideUp(500, function(){
			$answerInner.slideUp(500).text("Searching the Inner Shire...").slideDown(500, function(){

				shire.checkInnerShire(
					function(isInner, time){
						if(isInner){
							console.log("You are in the inner shire!");
							$answerInner.text("You are in the inner shire!");
						}else{
							$answerInner.text("You are not in the inner shire...");
						}

						$answerOuter.slideDown(500).text("Searching the Outer Shire...");

						shire.checkOuterShire(
							function(isOuter, time){
								if(isOuter){
									console.log("You are in the Outer Shire!");
									$answerOuter.text("You are in the Outer Shire!");
								}else{
									$answerOuter.text("You are not in the Outer Shire...");
								}
							},
							function(){
								console.log("checkOuterShire failed...");
								$answerOuter.slideUp(500);
								alert("Error: Failed to query Google Maps for the given location.");
							}
						);

					},
					function(){
						console.log("checkInnerShire failed...");
						$answerInner.slideUp(500);
						alert("Error: Failed to query Google Maps for the given location.");
					}
				);

			});
		});

	}


	window.onload = function(){

		$address = $("#form-address");
		$answerInner = $("#answer-inner");
		$answerOuter = $("#answer-outer");
		$formLocate = $("#form-locate");
		$formSubmit = $("#form-submit");
		$form = $("#form");
		shire.init($.getJSON);

		$formLocate.click(function(){
			fillLocation();
			return false;
		});

		$formSubmit.click(function(){
			searchLocation();
			return false;
		});

		$form.submit(function(){
			searchLocation();
			return false;
		});

	};

})(geoPosition, $, shire);
