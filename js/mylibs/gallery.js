( function($) 
{
	var rsGallery = function (gallery, options)
	{

		// Set up member variables
		var _galleryNode$;
		var _options;
		var _mediaShowcaseList$;
		var _closedGalleryHeight;
		
		// create the object
		var that = {};
		

		//---------------------------------------------------------------------------
		// setup
		//---------------------------------------------------------------------------
		that.setup = function( )
		{


			_galleryNode$ = $(gallery);
			_options = $.extend({
				galleryShowcaseHeight: 300,
				thumbnailSpacing: 30,
				gallerySourceToShowcasePathFunction: null,
				gallerySourceToThumbnailPathFunction: null,
				galleryOpeningDelegateFunction: null,
				galleryClosingDelegateFunction: null,
				navigationControlsWidth: null,
				nextControl: null,
				previousControl: null
			},options||{});
			
			
			_closedGalleryHeight = _galleryNode$.height();

			// Add the showcase area div.  This holds the showcase image centered inside it
			$('<div>').addClass('rsGalleryShowcaseArea').css({ bottom: _closedGalleryHeight, height:_options.galleryShowcaseHeight } ).prependTo(_galleryNode$);
			

			var mediaContainer$ = that.setupMediaContainer();

			
			return that;
		};
			
		//---------------------------------------------------------------------------
		// open
		//---------------------------------------------------------------------------
		that.open = function( indexOfItemToShowcase ) 
		{
		
			_galleryNode$.animate(
			{
				height: _galleryNode$.height() + _options.galleryShowcaseHeight
			});
			
			// add close button
			var closeButton$ = $('<div>').addClass('rsGallery-CloseButton').css({ top: 0, left: 0 } ).prependTo( _galleryNode$.find('.rsGalleryShowcaseArea') );
			closeButton$.click( function()
			{
				that.close();
			})
			
			
			that.showcase( indexOfItemToShowcase );
			
			_options.galleryOpeningDelegateFunction();
			
			return that;
		};
		
		//---------------------------------------------------------------------------
		// isOpen
		//---------------------------------------------------------------------------
		that.isOpen = function()
		{
			return (_galleryNode$.height() <= _closedGalleryHeight);
		};
				
		//---------------------------------------------------------------------------
		// close
		//---------------------------------------------------------------------------
		that.close = function() 
		{
			if ((typeof(window.jwplayer) !== "undefined"))
			{
				var video = jwplayer("rsGalleryShowcaseVideo");
				if (video)
					video.stop();
			}
			_galleryNode$.animate(
			{
				height: _galleryNode$.height() - _options.galleryShowcaseHeight
			}, function()
			{
				that.showcase(-1);
			});

			// fade and remove close button
			$('.rsGallery-CloseButton').fadeOut( 'normal', function ()
			{
				$(this).remove();
			})
		
			// fade and remove showcase
			
		
			_options.galleryClosingDelegateFunction();
			return that;
		};
			
		//---------------------------------------------------------------------------
		// showcase
		//---------------------------------------------------------------------------
		that.showcase = function( indexOfItemToShowcase )
		{
			// do we have anything in the showcase now?
			var showcase$ = _galleryNode$.find( '.rsGalleryShowcaseImage' );

			// if we are already showcasing this item, do nothing
			if (showcase$.length && showcase$.data('showcaseIndex') == indexOfItemToShowcase)
				return that;

			// remove the existing showcase
			if (showcase$.length)
			{
				if ((typeof(window.jwplayer) !== "undefined"))
				{
					var video = jwplayer("rsGalleryShowcaseVideo");
					if (video)
						video.stop();
				}
				showcase$.remove();
			}
			
			// if showcase index is negative, don't showcase anything
			if (indexOfItemToShowcase < 0)
				return that;

			
			var newShowcase$ = null;
			// add the new showcase
			// if this is a video and there is no html5 video support, make flash video instead
			if ($(_mediaShowcaseList$.get(indexOfItemToShowcase)).is('video') && !Modernizr.video)
			{
				var mp4Source = $(_mediaShowcaseList$[indexOfItemToShowcase]).find('[type="video/mp4"]');
				var movieSrc = mp4Source.attr('src');
				
				newShowcase$ = $('<div id="rsGalleryShowcaseVideo">');
				newShowcase$.css({ 'margin-left':'auto', 'margin-right': 'auto', 'display':'block', 'height':'100%', 'width': '100%', 'background-color' : 'transparent'});
				
				
				newShowcase$.prependTo( _galleryNode$.find('.rsGalleryShowcaseArea') ); 

				jwplayer("rsGalleryShowcaseVideo").setup({
					flashplayer: "jwplayer/player.swf",
					file: movieSrc, 
					height: $(_mediaShowcaseList$[indexOfItemToShowcase]).attr('height'), 
					width: $(_mediaShowcaseList$[indexOfItemToShowcase]).attr('width'),					
				});

				
				// need to add class to wrapper that is created as it is what we need to remove
				$('#rsGalleryShowcaseVideo_wrapper').addClass('rsGalleryShowcaseImage');
				$('#rsGalleryShowcaseVideo_wrapper').css('background-color', 'transparent');
				
				
				
				jwplayer("rsGalleryShowcaseVideo").play();
				
			} else
			{
				newShowcase$ = $(_mediaShowcaseList$.get(indexOfItemToShowcase)).clone();

				newShowcase$.prependTo( _galleryNode$.find('.rsGalleryShowcaseArea') ); 
				newShowcase$.addClass('rsGalleryShowcaseImage');

				if (newShowcase$.play) 
				{
					newShowcase$.play();
				}
			}
			

			
			return that;			
		};
			
		//---------------------------------------------------------------------------
		// setupMediaContainer
		//---------------------------------------------------------------------------
		that.setupMediaContainer = function(  )
		{
			that.addNavigationButtons();

			// width of mediaContainer$ is determined by the space that nav buttons take up
			var mediaContainerWidth = _galleryNode$.width() - (2*_options.navigationControlsWidth);


			// create the container(mediaContainer$) and the scrolling view that is inside the container(mediaScroller$)
			var mediaContainer$ = $("<div/>").height(_galleryNode$.height()).width(mediaContainerWidth).css('bottom', '0px').css('overflow', 'hidden').appendTo(_galleryNode$);
			var mediaScroller$ = $("<div/>").addClass('rsMediaScroller').height('100%').css( {position:'absolute', left: 0} ).appendTo(mediaContainer$);
			
			mediaContainer$.css( { position: 'absolute', bottom: 0, left: _options.navigationControlsWidth } );
	
			_mediaShowcaseList$ = _galleryNode$.children('img, video').remove();
	
			

			_mediaShowcaseList$.each( function (index) 
			{
				var item$ = $(this);
				
				// modify source on showcase item
				var showcaseSrc = _options.gallerySourceToShowcasePathFunction( $(this).data('src') );
				if ( $(this).is('img') )
				{
					$(this).attr( 'src', showcaseSrc );
				} 
				else if ( $(this).is('video') )
				{
					// for videos, this can return an array or a string
					if ( typeof showcaseSrc === 'string' )
					{
						showcaseSrc = [ showcaseSrc ];
					}
					
					var flashSource = null;
					for (var i = 0; i < showcaseSrc.length; i += 1)
					{
						var extension = showcaseSrc[i].substr( showcaseSrc[i].lastIndexOf(".") + 1);
						// for ogg, extension is ogv while mime is video/ogg
						if (extension == 'ogv')
							extension = 'ogg';
						var type = "video/" + extension;
						if (extension == 'mp4')
							flashSource = showcaseSrc[i];

						$("<source>").attr('src', showcaseSrc[i]).attr('type', type).appendTo($(this));
						
					}
					
					
					// Add flash fallback to movie
/*
					if (flashSource)
					{
						var flashDiv = document.createElement('div');
				
						
	//						width: postageVideo$.width(),
	//						height: postageVideo$.height(),
	
						$(flashDiv).flash({
							swf: 'player.swf',
							width:610,
							height: 380,
							flashvars: {
								file: flashSource,
								controlbar: "over",
								'controlbar.idlehide': 'true',
								autostart: true,
							}
						});
			console.log($(flashDiv).html());
				
						this.appendChild( flashDiv );
			//			$(flashDiv).appendTo( $(this) );
			
					}
*/
				}
							
			});

			

 			that.populateThumbnails( mediaContainer$.width() ); 
			
			
 			that.enableNavigationButtons(); 
		
			return mediaContainer$;

		};
		
		//---------------------------------------------------------------------------
		// populateThumbnails
		// Make sure the scroller has enough thumbnails in it.  We only add the thumbnails
		// that we need.  scrollerOffset is passed in that tells us how much of the scroller
		// will be visible and that we should fill up that much of the scroller with thumbs
		//---------------------------------------------------------------------------
		that.populateThumbnails = function( scrollerOffset )
		{
			var mediaScroller$ = _galleryNode$.find('.rsMediaScroller');
			var mediaContainer$ = mediaScroller$.parent();
			var currentEndPosition = 0;
			var numThumbs = mediaScroller$.children().length;
			
			if (numThumbs > 0)
			{
				var last = mediaScroller$.children().last();
				currentEndPosition = last.position().left + last.width();
			}	
				
			while ( currentEndPosition < scrollerOffset && numThumbs < _mediaShowcaseList$.length )
			{
				var mediaItem$ = $( _mediaShowcaseList$.get(numThumbs) );
				var title = mediaItem$.is('img') ? mediaItem$.attr( 'alt' ) : mediaItem$.data('title');
			
				// we put thumbnail and text in a div and put that into the media scroller
				var thumbDiv$ = $('<div>').addClass('rsGalleryThumbDiv');
				thumbDiv$.append('<p>' + title + '</p>');
				thumbDiv$.appendTo( mediaScroller$  );
				
				var src = _options.gallerySourceToThumbnailPathFunction( mediaItem$.data('src') );

				// we used to clone(), but on ie it would strangely give it a large width and height
				var thumbnail$ = $("<img>");
				thumbnail$.addClass('rsGalleryThumb');
				thumbnail$.attr('src', src ).prependTo( thumbDiv$ );
			
				// For videos, we add the video indicator
				if ( !mediaItem$.is('img') )
				{
					var videoIndicator$ = $('<div>').addClass('rsGalleryVideoIndicatorDiv');
					videoIndicator$.appendTo( thumbDiv$ );
				}
			
				numThumbs++;

				currentEndPosition += thumbDiv$.width();

				// Add the click event handler
				thumbnail$.click( function()
				{
					// open gallery if closed
					if ( that.isOpen()  )
					{
						// click is on thumbnail, we want index of its div parent
						that.open( $(this).parent().index() );
					} else
					{
						that.showcase( $(this).parent().index() );
					}
					
				
				});
			}

			if (numThumbs > 0)
				mediaScroller$.width( _mediaShowcaseList$.length * mediaScroller$.children().first().width() ); 
				
		}
		
		//---------------------------------------------------------------------------
		// addNavigationButtons
		//---------------------------------------------------------------------------
		that.addNavigationButtons = function( thumbnail$ )
		{
			$('<div>').addClass('rsGallery-NextNav').appendTo(_galleryNode$).click( function()
			{
				that.navigate(true);			
			});
			
			$('<div>').addClass('rsGallery-PrevNav').appendTo(_galleryNode$).click( function()
			{
				that.navigate(false);			
			});
			
			if (_options.navigationControlsWidth == null)
				_options.navigationControlsWidth = _galleryNode$.find('.rsGallery-NextNav').width();
			
		};
		
		//---------------------------------------------------------------------------
		// enableNavigationButtons
		//---------------------------------------------------------------------------
		that.enableNavigationButtons = function(  ) 
		{
			var mediaScroller$ = _galleryNode$.find('.rsMediaScroller');

			// hide prev if needed
			var prev = _galleryNode$.find('.rsGallery-PrevNav');
			var leftt = mediaScroller$.position().left;
			if ( mediaScroller$.position().left >= 0)
			{
				prev.fadeOut();
			} else if (prev.is(':hidden'))
			{
				prev.fadeIn();
			}
		
			// hide next if needed
			var next = _galleryNode$.find('.rsGallery-NextNav');
			if (mediaScroller$.position().left + mediaScroller$.width() <= mediaScroller$.parent().width() )
			{
				next.fadeOut();
			} else if (next.is(':hidden'))
			{
				next.fadeIn();
			}
		};
		
		//---------------------------------------------------------------------------
		// navigate
		//---------------------------------------------------------------------------
		that.navigate = function( navigateNext ) 
		{
			var mediaScroller$ = _galleryNode$.find('.rsMediaScroller');
			
			var newLeftPosition = mediaScroller$.position().left + (navigateNext ?  -mediaScroller$.parent().width() : mediaScroller$.parent().width() );
			
			that.populateThumbnails( mediaScroller$.parent().width() - newLeftPosition ); // newLeftPosition will be negative, so it ends up adding to width
			
			mediaScroller$.animate( { left: newLeftPosition }, function () 
				{ 
					that.enableNavigationButtons(); 
				}
			);
			
		};


		return that.setup();
		
	};

	// collect images/movies that are child of gallery into list
	// gallery bar height is height that it starts out as(closed height)
	// create and center 'showcase' image and showcase video
	// add navigation arrows
	// create div for images and put the images in them (overflow: hidden)
	$.fn.rogueSheepGallery = function(options)
	{
		var newGallery = rsGallery( this, options );
	}


})(jQuery);

