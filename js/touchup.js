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
    		galleryShowcaseHeight: $('.BannerDetailContainer').outerHeight(),
    		gallerySourceToShowcasePathFunction: function (dataSrc)
    		{
	    		var mp4 = ".mp4";
	    		var basePath = "https://s3.amazonaws.com/TouchUpMedia2/gallery/";
    			if (dataSrc.lastIndexOf(mp4) == dataSrc.length - mp4.length)
    			{
	    			var mp4Src = basePath + dataSrc;
	    			oggName = dataSrc.replace(".mp4", ".ogv");
	    			var oggSrc = basePath + oggName;
	    			return [mp4Src, oggSrc];
	    		} else
	    		{
	    			return basePath + dataSrc;
	    		}
    		},
    		
    		gallerySourceToThumbnailPathFunction: function (dataSrc)
    		{
    			var thumbName = dataSrc.replace(".jpg", ".thumb.jpg");
    			thumbName = thumbName.replace(".mp4", ".thumb.jpg");
   				var thumbSrc = "https://s3.amazonaws.com/TouchUpMedia2/galleryThumbs/" + thumbName;
		   		return thumbSrc;
    		},

    		galleryOpeningDelegateFunction: function ()
    		{
 				$('.BannerDetailContainer').slideUp('normal');
				$('.iPadScreenshotWidget').fadeOut('normal');
				$('#GalleryModeAppStoreButton').fadeIn('normal');
   			},

    		galleryClosingDelegateFunction: function ()
    		{
 				$('.BannerDetailContainer').slideDown('normal');
				$('.iPadScreenshotWidget').fadeIn('normal');
				$('#GalleryModeAppStoreButton').fadeOut('normal');
   			},
    		
			navigationControlsWidth: 54,
    	} );
    	
 
	});

