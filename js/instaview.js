$(window).load(function() {
    $('#screenshotNivoSlider').nivoSlider({
					effect: 'slideInLeft',
					animSpeed: 150,
					pauseTime:4000,
			});
});

$(function() 
	{
		$('div.MacScreenshotWidget a').fancyZoom({directory: 'https://s3.amazonaws.com/InstaviewMedia/screenshots', scaleImg: false, closeOnClick: true});
		
    	$('#FrameGallery').rogueSheepGallery( 
    	{
    		galleryShowcaseHeight: 550,
    		gallerySourceToShowcasePathFunction: function (dataSrc)
    		{
    			var fullSrc = "https://s3.amazonaws.com/InstaviewMedia/frameGallery/" + dataSrc;  			
 		   		return fullSrc;
    		},
    		
    		gallerySourceToThumbnailPathFunction: function (dataSrc)
    		{
   				var thumbSrc = "https://s3.amazonaws.com/InstaviewMedia/frameGallery/thumbs/" + dataSrc;
		   		return thumbSrc;
    		},

    		galleryOpeningDelegateFunction: function ()
    		{
   			},

    		galleryClosingDelegateFunction: function ()
    		{
 				$('#FramesFeature').slideDown('normal');
   			},
   			
			navigationControlsWidth: 56,
    		
    	} );
    	
 
	}
);


