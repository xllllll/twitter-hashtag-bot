//CHANGE TWITTER API PARAMETERS
var Twitter = require('twitter');
var fs = require("fs");
var client = new Twitter({
    consumer_key: '**************',
    consumer_secret: '*******************',
    access_token_key: '*******************',
    access_token_secret: '******************'
});

var minz = 1000;
var maxz= 2500;
var randomint = Math.round(Math.random() * (maxz - minz)) + minz;

var tweetinterval = randomint; //Tweetinterval in seconds, so 1800 = every 30 minutes
function tweet (text) {
	
	client.get('trends/place', {id:1},function (error, name, response) {
     
     
	   var hashtag= [];
     var min = 0;
     var max = JSON.stringify(name[0]['trends'].length);
     var random = Math.round(Math.random() * (max - min)) + min;
   
	   for(var i = 0; i<JSON.stringify(name[0]['trends'].length);  i++) {
		   if(JSON.stringify(name[0]['trends'][i]['tweet_volume'])>5000){

			  console.log(JSON.stringify(name[0]['trends'][i]['name'])+
				", volume ="+JSON.stringify(name[0]['trends'][i]['tweet_volume']));
        
        hashtag =[JSON.stringify(name[0]['trends'][i]['name'])];

		   } 

    }

     text = text + " " + hashtag[0] ;
	   console.log(text);
      
	   client.post('statuses/update', {status: text}, function (error, tweet, response) {
       if (error) throw error;
     });
	
    });
}

setInterval(function () {
	var tweets = JSON.parse(String(fs.readFileSync("tweets.json"))).objects;
  var min = 0;
  var max = Object.keys(tweets).length;
  var min = 0;
  var max = Object.keys(tweets).length;
  var random = Math.round(Math.random() * (max - min)) + min;

  tweet(tweets[random]);
}, tweetinterval*1000);
