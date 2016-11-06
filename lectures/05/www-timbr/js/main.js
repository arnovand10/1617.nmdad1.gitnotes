(function(){
	function TimbrApp(){
		this.API_URL = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'https%3A%2F%2Fdatatank.stad.gent%2F4%2Fmilieuennatuur%2Finventarisstraatbomen1juli2011.json'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
		this.results;
		//load data from API
		this.loadData = function(){
			var that = this;
			var xhr = new XMLHttpRequest();
			xhr.open('get',this.API_URL, true);
			xhr.responseType = "json";
			xhr.onload = function(){
				console.log("welcome to gentTreeDatabase");
				var data = (!xhr.responseType)?JSON.parse(xhr.response):xhr.response;
				console.log(data);
				that.results = data.query.results.body;
				console.log(this.results);
				that.updateUI();
			};
			xhr.onerror = function(){
				console.log("error");
			};
			xhr.send();
		};

		this.updateUI = function(){
			console.log("update the UI");
			var ul = document.createElement("ul");
			var ul2 = document.createElement("ul");

			//de } uit de string halen
			var elements = this.results.replace("}",'');
			elements =elements.replace("]",'');
			//de string opsplitsen op "{" om een array te bekomen
			elements = elements.split("{");
			console.log(elements[1]);

			var item;
			var straatnamenlijst;
			var boomsoorten;
			var aantal;
			var omtrek;
			var $18plus = false;
			for(var i=1; i<elements.length; i++){
				item = elements[i].split(",");
				straatnamenlijst = item[0].split(":")[1].replace("\"",'').replace("\"",'').replace("'",'').replace("'",'');
				boomsoorten = item[1].split(":")[1].replace("\"",'').replace("\"",'').replace("'",'').replace("'",'');
				aantal = item[2].split(":")[1].replace("\"",'').replace("\"",'').replace("'",'').replace("'",'');
				omtrek = item[3].split(":")[1].replace("\"",'').replace("\"",'').replace("}",'').replace("'",'').replace("'",'');

				if(omtrek>40){
					ul.innerHTML += "<li class='legal animated slideInRight'>Boomsoort: <strong>"+boomsoorten+"</strong> met een omtrek van <strong>"+omtrek+"</strong></li>";
				}else{
					ul2.innerHTML += "<li class='ilegal animated  slideInLeft'>Boomsoort: <strong>"+boomsoorten+"</strong> met een omtrek van <strong>"+omtrek+"</strong></li>";
				}

				
			}		
			document.body.appendChild(ul);
			document.body.appendChild(ul2);
		}
	};

	var app = new TimbrApp();
	app.loadData();
})();