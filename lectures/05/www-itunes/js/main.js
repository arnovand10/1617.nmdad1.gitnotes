(function(){
	function ITunesApp(){
		this.API_URL = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D'itunes.apple.com%2Fsearch%3Fterm%3Ddaft%2Bpunk'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
		this.results;
		
		//load the data from the API
		this.loadData = function(){
			var that = this;
			//Define a XMLHttpRequest object in order to load data
			var xhr = new XMLHttpRequest();
			//1. open a connection to the API
			//get verb: Get the information from the end-point (READ)
			//third option (true): means asynchronous action.
			xhr.open('get', this.API_URL, true);
			//2. Settings
			xhr.responseType = "json";
			//3. Listeners
			//3.1 onload: recieved something that's not an error
			xhr.onload = function(){
				console.log("welcome to itunes");
				
				//3.1.1 Get the loaded data
				var data = (!xhr.responseType)?JSON.parse(xhr.response):xhr.response;
				console.log(data);
				
				//3.1.2 navigate in object to get the results as array
				that.results = data.query.results.json.results;
				console.log(this.results);

				//Call the updateUI() function
				that.updateUI();

			};
			//3.2 error: recieved an error
			xhr.onerror = function(){
				console.log("error");
			};

			//4. Send the request
			xhr.send();
		};

		this.updateUI = function(){
			console.log("update the ui");
			var artistName;
			var trackName;
			var collectionName;
			var collectionPrice;
			var currency;
			var primaryGenreName;
			var artworkUrl60;

			/*aanmaken div*/
			var div = document.createElement("ul");
			div.className = 'tabel';
			
			for(var i=0; i<this.results.length; i++){
				artworkUrl60 = this.results[i].artworkUrl60;
				artistName = this.results[i].artistName;
				trackName = this.results[i].trackName;
				collectionName = this.results[i].collectionName;
				collectionPrice = this.results[i].collectionPrice;
				currency = this.results[i].currency;
				div.innerHTML += 
				"<li><ul>"+
				"<li class='song'><img src="+artworkUrl60+"></li>"+
				"<li class='genre'>"+trackName+"</li>"+
				"<li class='artist'>"+artistName+"</li>"+
				"<li class='price'>"+collectionPrice+" "+currency+"</li>"+
				"</ul></li>";
			}
			
			document.body.appendChild(div);
			console.log(this.results);
		};
	};

//Make an instance of the ITunesApp
var app = new ITunesApp();
app.loadData();
})();