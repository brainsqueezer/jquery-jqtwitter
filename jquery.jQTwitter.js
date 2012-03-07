(function($){

 	$.fn.extend({ 
 		
 		jQTwitter: function(settings) {

			var defaults = {
				username : 'twitter',
                count : 5,
				show_image: true,
                image_size: 48
			}
				
			var settings =  $.extend(defaults, settings);

    		return this.each(function() {
				var set = settings;
                var $this = $(this);  
				//Grab the JSON feed of the user
			$.getJSON('http://twitter.com/status/user_timeline/' + set.username + '.json?count=' + set.count + '&callback=?', 
			
				function(data){ 

					$.each(data, function(i, item) {       
					//Create a <li> for each tweet
						var jQtweet = '<li class="tweetItem">';
						
						if (set.show_image){
							if (set.image_size != 0) {
								//jQtweet += '<div class="tweetpic">';
								jQtweet += '<a href="http://twitter.com/' + item.user['screen_name'] + '" target="_blank">'
								jQtweet += '<img class="tweetimg" width="' + set.image_size +'" height="' + set.image_size + '" src="' + item.user['profile_image_url'] + '" />';
								jQtweet += '</a> ';
								//jQtweet += '</div>';
							}
						}
						var tweetTxt = item.text;
						tweetTxt = tweetTxt.replace(/(http\:\/\/[A-Za-z0-9\/\.\?\=\-]*)/g,'<a href="$1" target="_blank">$1</a>'); //Screen Name Link
						tweetTxt = tweetTxt.replace(/@([A-Za-z0-9\/_]*)/g,'<a href="http://twitter.com/$1" target="_blank">@$1</a>'); //Mentions Link @
						tweetTxt = tweetTxt.replace(/#([A-Za-z0-9\/\.]*)/g,'<a href="http://twitter.com/search?q=$1" target="_blank">#$1</a>');// Hash Link #
						
						jQtweet += tweetTxt;
						jQtweet += '<br />'
						jQtweet += '</li>';

						$this.append(jQtweet);
					});      			   
				});
    		});
    	}
	});
})(jQuery);
