$(window).load(function() {
    $('#screenshotNivoSlider').nivoSlider({
					effect: 'slideInLeft',
					animSpeed: 150,
					pauseTime:4000,
			});
});

$(function() 
	{
    	$('#Gallery').rogueSheepGallery( 
    	{
/*     		galleryShowcaseHeight: $('.BannerDetailContainer').height() + $('#TemplatesFeature').height() + 30, */
    		galleryShowcaseHeight: $('#TemplatesFeature').outerHeight(true),
    		gallerySourceToShowcasePathFunction: function (dataSrc)
    		{
//    			var fullSrc = "https://s3.amazonaws.com/TouchUpMedia/" + dataSrc;  		
    			var fullSrc = "https://s3.amazonaws.com/PostageMedia2/templateGallery/" + dataSrc;  			
 		   		return fullSrc;
    		},
    		
    		gallerySourceToThumbnailPathFunction: function (dataSrc)
    		{
/*
    			var thumbName = dataSrc.replace(".jpg", "_Thumb.jpg");
    			thumbName = thumbName.replace(".mp4", "_Thumb.jpg");
*/
   				var thumbSrc = "https://s3.amazonaws.com/PostageMedia2/templateGallery/thumbs/" + dataSrc;
		   		return thumbSrc;
    		},

    		galleryOpeningDelegateFunction: function ()
    		{
 				$('#TemplatesFeature').slideUp('normal');
   			},

    		galleryClosingDelegateFunction: function ()
    		{
 				$('#TemplatesFeature').slideDown('normal');
   			},
   			
			navigationControlsWidth: 56,
    		
    	} );
    	
 
	}
);

endVideo = function ()
{
	if (Modernizr.video)
		$('#postagevideo').get(0).pause();
	else
		jwplayer("postagevideo").stop();
		
	$('#videoContainer').fadeOut('normal');

	$('#videobutton').text('Watch the Video');
	$('#videobutton').removeClass('stopvideo');
	$('#videobutton').addClass('playvideo');
}

$(function()
	{
		var postageVideo$ = $('#postagevideo');
	
		$('#videobutton').click( function() 
		{
			if ( $(this).hasClass('stopvideo') )
			{
				endVideo();
			} else
			{
				$(this).removeClass('playvideo');
				$(this).addClass('stopvideo');
				$(this).text('Stop the Video');

				// show video
				$('#videoContainer').show();
				
				// play the video
				if (Modernizr.video) 
				{
					postageVideo$.get(0).currentTime = 0;
					postageVideo$.get(0).play();
	
					// hide when video ends
					postageVideo$.bind('ended', function() 
					{
						endVideo();
					
					});
				} else
				{
					jwplayer("postagevideo").play();
					
					jwplayer("postagevideo").onComplete( function (event) 
					{
						endVideo();
					})
				}
			
			}
		});
		
		// Add flash fallback to movie
		if (!Modernizr.video)
		{
			jwplayer("postagevideo").setup({
				flashplayer: "jwplayer/player.swf",
				file: postageVideo$.attr('src'), 
			});
		} else
		{
			// need to change the video tag to support ogg
			var src = postageVideo$.attr('src');
			var oggSrc = src.substr( 0, src.lastIndexOf(".") + 1) + "ogv";

			$('<source>').attr('src', src).attr('type', 'video/mp4').appendTo(postageVideo$);
			$('<source>').attr('src', oggSrc).attr('type', 'video/ogg').appendTo(postageVideo$);
			
			postageVideo$.removeAttr('src');
			postageVideo$.removeAttr('type');
			
		}

			
/*
		var flashDiv = document.createElement('div');
		$(flashDiv).attr('id', 'postageVideoFlashPlayer');
		var movieSrc = $('#mainVideoSource').attr('src');

		
		$(flashDiv).flash({
			swf: 'player.swf',
			width: postageVideo$.width(),
			height: postageVideo$.height(),
			flashvars: {
				file: movieSrc,
				image: movieSrc + '.poster.jpg',
				controlbar: "over",
				'controlbar.idlehide': 'true',
				autostart: true,
			}
		});

		$(flashDiv).appendTo( postageVideo$ );
*/

		
	}
)