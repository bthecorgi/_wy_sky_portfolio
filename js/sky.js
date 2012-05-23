function sky()
{
	var CONST_TOP_ME = 0;
	var CONST_TOP_CREATIVE = 710;
	var CONST_TOP_CONTACT = 1487;
	var CONST_SLIDE_DURATION = 500;						// in ms.
	var CONST_INDICATOR_ME = 35;						// left value
	var CONST_INDICATOR_CREATIVE = 140;					// left value
	var CONST_INDICATOR_CONTACT = 268;					// LEFT VALUE
	var CONST_INDICATOR_TOTAL_WIDTH = CONST_INDICATOR_CONTACT - CONST_INDICATOR_ME;
	var CONST_EASING_FUNCTION = 'swing';
	var gallery;

	var portfolio_descriptions1 = {title: 'Unique Coffee Roasters', message: 'A complete and thorough examination of packaging design and creative brainstorming led to this transformation for Unique Coffee Roasters brand and packaging. Point of purchase, content hierarchy and physical packaging appearance were amongst the few elements considered in creating the final product.<br /><br />Our group felt inspired to create a design that felt alive; a mixture of energetic colours wrapped around a tall, sleek shape. This dramatic improvement allows UCR products to stand out amongst its competitors at point of purchase.'};
	var portfolio_descriptions2 = {title: 'The Wild Chef', message: 'Large billboard advertisements are created here to encourage more watchers to tune into the adventurous culinary journey of Martin Picard, a chef in the wild cooking up dishes never dreamed of. <br /><br />Three campaign advertisements with curious imagery and an overall simplistic theme will deliver amusement and appeal to a humored yet, interested crowd.'};
	var portfolio_descriptions3 = {title: 'VQA Ontario: Annual Report', message: 'As with many companies, Vintner\'s Quality Assessment Ontario yields annual reports with an overview of their financial year.<br /><br />This annual report is recreated from content used in their 2010 annual report but the look and layout has been redesigned with a corporate and professional appeal and includes some personally photographed images.'};
	var portfolio_descriptions4 = {title: 'Unique Coffee Roasters Website', message: 'The UCR website is designed to mimic the brand and relay coffee knowledge and information through a visually appealing user experience. Here, customers can find out more about coffee and their origins.<br /><br />The website intends to be bold with vibrant colours and high visual content, however, balancing with breathable white space to provide information that is clearly and cleanly displayed.'};
	var portfolio_descriptions5 = {title: 'Interactive Magazine', message: 'Exposure is an inspirational geographic magazine with beautiful imagery (personally photographed) and focus on stories about our planet; from wildlife to gorgeous hideaways.<br /><br />This revised layout based off a school project is an interactive magazine for the iPad. Focus is on navigational behaviour with clearly defined interactivity and a simple, efficient layout. This combined with strong visiual elements offers a great user experience.'};
	var portfolio_descriptions6 = {title: 'ROM: Ancient Peru Exhibition', message: 'The Royal Ontario Museum is featur- ing a unique exhibition exploring an exceptional array of lost treasures from the Sican civilization.<br /><br />My designs for this acedemic project is provide advertising banners which express the cultural representation of the event, with visually stunning imag- ery and colours.'};
	var portfolio_descriptions7 = {title: 'The Nutcracker Ballet', message: 'This art deco inspired project, reintroduces the highly acclaimed and outstanding ballet performance, The Nutcracker. Returning for upcoming performances in Toronto, the newly designed material presents the ballet in a different yet intriguing style, in hopes to arouse a new sense of awareness and curiosity.<br /><br />My goal in taking this stylistic approach is to withdraw from typical assumptions of a ballet. The dramatic, mysterious appeal to this poster creates different interpretations and perceptions.'};
	var portfolio_descriptions8 = {title: 'Santiago Calatrava', message: 'To launch the opening exhibition of the well-known Spanish architect, Santiago Calatrava, this identity series includes?several promotional materials to support and promote this one-time event.<br /><br>Logo, colours and typefaces are intentionally designed to reflect the real-life structure of the Tenerife Opera House.'};

	var port_description_array = [portfolio_descriptions1
								, portfolio_descriptions2
								, portfolio_descriptions3
								, portfolio_descriptions4
								, portfolio_descriptions5
								, portfolio_descriptions6
								, portfolio_descriptions7
								, portfolio_descriptions8
								];
	// thesre are the indices of the first image for the corresponding portfolio
	// so for portfolio 2 (at index 1), the first image is at index 3
	// another example: for portfiolo 8 (at index 7), the first image is at index 21
	var portfolio_slide_corresponding_image_index = [0, 2, 5, 12, 13, 14, 17, 20];

	var _move_indicator_to_position = function(left_position, speed)
	{
		if (speed == 'instant')
		{
			$('.nav_indicator').css('left', left_position + 'px');
		}
		else
		{
			$('.nav_indicator').animate({left: left_position}, CONST_SLIDE_DURATION, CONST_EASING_FUNCTION);
		}
	}
	,_move_indicator_timeout = null
	,_move_indicator = function(section_index)
	{
		if (_move_indicator_timeout)
		{
			clearTimeout(_move_indicator_timeout);
		}
		_move_indicator_timeout = setTimeout(function()
		{
			$('.sky_nav').find('li').each(function(i)
				{
					if (i == section_index)
					{
						$(this).addClass('active');
					}
					else
					{
						$(this).removeClass('active');
					}
				});
		}, 100);
	}
	,_select_portfolio_thumbnails = function(slider_index)
	{
		var j_slider_thumbs = $('.slider_thumbs');
		j_slider_thumbs.find('.active').removeClass('active');
		j_slider_thumbs.find('.slider_thumb').eq(slider_index).addClass('active');
	}
	,_select_portfolio_description = function(slide_index)
	{
		$('#portfolio_title').text(port_description_array[slide_index].title);
		$('#portfolio_description').html(port_description_array[slide_index].message);
	}
	,_select_portfolio_by_index = function(portfolio_index)
	{
		// change the galleria slide
		gallery.show(portfolio_slide_corresponding_image_index[portfolio_index]);
		// change the thumbnail selected state
		_select_portfolio_thumbnails(portfolio_index);
		// change description and title
		_select_portfolio_description(portfolio_index);
	}
	,_get_portfolio_index = function(image_url)
	{
		// depends on the url format.  we're ALWAYS expecting to be
		// something/something/n/something.png
		// where n is the portfolio number!  PLEASE DONT CHANGE THIS!
		var index = image_url.split('/')[2];
		return parseInt(index);
	}
	,_galleria_next = function()
	{
		var next_index = gallery.getIndex() + 1;
		if (next_index >= gallery.getDataLength())
		{
			next_index = 0;
		}
		var portfolio_index = _get_portfolio_index_from_image_index(next_index);

		// _select_portfolio_thumbnails requires a 0 based index
		_select_portfolio_thumbnails(portfolio_index - 1);
		_select_portfolio_description(portfolio_index - 1);
		gallery.next();
	}
	// portfolio index here is NOT zero based. starts at 1.
	,_get_portfolio_index_from_image_index = function(image_index)
	{
		var image_url = gallery.getData(image_index).image;
		var portfolio_index = _get_portfolio_index(image_url);
		return portfolio_index;
	}
	,_galleria_previous = function()
	{
		var previous_index = gallery.getIndex() - 1;
		if (previous_index < 0)
		{
			previous_index = gallery.getDataLength() - 1;
		}
		var portfolio_index = _get_portfolio_index_from_image_index(previous_index);

		// _select_portfolio_thumbnails requires a 0 based index
		_select_portfolio_thumbnails(portfolio_index - 1);
		_select_portfolio_description(portfolio_index - 1);
		gallery.prev();
	}
	,_load_galleria = function()
	{
		Galleria.loadTheme('js/galleria/themes/classic/galleria.classic.min.js');
		Galleria.configure({
			transition: 'fade'
			,thumbnails: false
			,showImagenav: false
		});
		Galleria.on('image', function(e)
				{
					var portfolio_index = _get_portfolio_index_from_image_index(gallery.getIndex());
					if (portfolio_index == 4 || portfolio_index == 5)
					{
						 $('.galleria-image')
							.find('.galleria-layer')
							.next()
							.click(function()
							{
								if (portfolio_index == 4)
								 {
									 $('#portfolio_imc_swf').click();
								 }
								else if (portfolio_index == 5)
								 {
									 $('#portfolio_exposure_swf').click();
								 }
							})
							.css('cursor', 'pointer');
					}
					else
					{
						 $('.galleria-image')
							.find('.galleria-layer')
							.next()
							.css('cursor', 'auto');
					}
				});
		Galleria.run('#galleria',
		{
			extend: function()
			{
				gallery = this;
				$('.slider_left').click(function()
				{
					_galleria_previous();
				});

				$('.slider_right').click(function()
				{
					_galleria_next();
				});
			}
		});
		_select_portfolio_description(0);
		// activate slider thumbnails
		$('.slider_thumb1').click(function()
				{
					_select_portfolio_by_index(0);
				});

		$('.slider_thumb2').click(function()
				{
					_select_portfolio_by_index(1);
				});
		$('.slider_thumb3').click(function()
				{
					_select_portfolio_by_index(2);
				});
		$('.slider_thumb4').click(function()
				{
					_select_portfolio_by_index(3);
				});
		$('.slider_thumb5').click(function()
				{
					_select_portfolio_by_index(4);
				});
		$('.slider_thumb6').click(function()
				{
					_select_portfolio_by_index(5);
				});
		$('.slider_thumb7').click(function()
				{
					_select_portfolio_by_index(6);
				});
		$('.slider_thumb8').click(function()
				{
					_select_portfolio_by_index(7);
				});
	}
	,_reset_scroll = function()
	{
		$('html, body').animate({scrollTop: CONST_TOP_ME}, CONST_SLIDE_DURATION);
	}
	,_scroll_handler = function()
	{
		// dynamically move the indicator based on where the scroll bar is
		var current_scroll_top = $(window).scrollTop();
		var document_height = $(document).height();
		var indicator_position;
		if (current_scroll_top >= CONST_TOP_ME && current_scroll_top < CONST_TOP_CREATIVE)
		{
			// get the percentage and calculate the left position based on the width between the two indicators
			indicator_position = parseInt(current_scroll_top / CONST_TOP_CREATIVE * (CONST_INDICATOR_CREATIVE - CONST_INDICATOR_ME) + CONST_INDICATOR_ME);
			_move_indicator_to_position(indicator_position, 'instant');
		}
		else if (current_scroll_top >= CONST_TOP_CREATIVE && current_scroll_top < CONST_TOP_CONTACT)
		{
			// get the percentage and calculate the left position based on the width between the two indicators
			var scroll_top_minus_creative = current_scroll_top - CONST_TOP_CREATIVE;
			var contact_diff_creative = CONST_TOP_CONTACT - CONST_TOP_CREATIVE;

			indicator_position = parseInt(scroll_top_minus_creative / contact_diff_creative * (CONST_INDICATOR_CONTACT - CONST_INDICATOR_CREATIVE) + CONST_INDICATOR_CREATIVE);
			_move_indicator_to_position(indicator_position, 'instant');
		}
		// calculate the link start positions relative to the indicator position!
		var link_me_start_position = CONST_INDICATOR_ME - $('#link_me').width() / 2;
		var link_creative_start_position = CONST_INDICATOR_CREATIVE - $('#link_creative').width() / 2;
		var link_contact_start_position = CONST_INDICATOR_CONTACT - $('#link_contact').width() / 2;
		if (indicator_position >= link_me_start_position && indicator_position <= link_creative_start_position)
		{
			_move_indicator(0);
		}
		else if (indicator_position >= link_creative_start_position && indicator_position < link_contact_start_position)
		{
			_move_indicator(1);
		}
		else if (indicator_position >= link_contact_start_position)
		{
			_move_indicator(2);
		}
	};
	$('#link_me, .nav_logo').click(function()
	{
		_move_indicator(0);
		_reset_scroll();
		return false;
	});
	$('#link_creative').click(function()
	{
		_move_indicator(1);
		$('html, body').animate({scrollTop: CONST_TOP_CREATIVE}, CONST_SLIDE_DURATION, CONST_EASING_FUNCTION);
		return false;
	});
	$('#link_contact').click(function()
	{
		_move_indicator(2);
		$('html, body').animate({scrollTop: CONST_TOP_CONTACT}, CONST_SLIDE_DURATION, CONST_EASING_FUNCTION);
		return false;
	});
	$(window).scroll(_scroll_handler);
	setTimeout(function()
	{
		_reset_scroll();
	}, 200);
	$('#portfolio_exposure_swf').prettyPhoto({social_tools: false});
	$('#portfolio_imc_swf').prettyPhoto({social_tools: false});
	_load_galleria();
	_move_indicator_to_position(CONST_INDICATOR_ME, 'instant');
};

$().ready(function()
{
	var s = new sky();
	var email_form = new sky_email_form();
});
