jQuery(document).ready(function() {
    jQuery('.btn-menu-mobile').click(function() {
        jQuery('#nav-icon').toggleClass('mobile_active');

        if(jQuery('#nav-icon.mobile_active').select().length != 0) {
            jQuery('.menu_mobile').slideDown();
        } else {
            jQuery('.menu_mobile').slideUp();
        }
    });

    jQuery('.sliders_box').bxSlider({
        pager: false,
        auto: true
    });

    jQuery('.newspaper').tab();
	
	if(jQuery('.reviews_wrapper .grid').length) {
        setTimeout(function () {
            jQuery('.grid').masonry({
                itemSelector: '.grid-item'
            });
        }, 500);
    }

	jQuery(document).on('click', '.search_col_md', function() {
		jQuery('.search-form').fadeToggle( 'slow' );
	});

    if(jQuery(window).width() < 992) {
        jQuery('.slider_videos').bxSlider({
            minSlides: 3,
            maxSlides: 3,
            slideWidth: 360,
            slideMargin: 30,
            pager: false,
            controls: false,
            auto: true
        });
    } else {
        jQuery('.slider_videos').bxSlider({
            minSlides: 3,
            maxSlides: 3,
            slideWidth: 360,
            slideMargin: 30,
            pager: false
        });
    }
	
	var height = jQuery('.menu_wrapper').height();
	var offset = jQuery('.menu_wrapper').offset().top;
	var scrolls = jQuery(document).scrollTop();
	
	MenuFixed(scrolls, offset, height);
	
	jQuery(window).scroll(function() {
		scrolls = jQuery(document).scrollTop();
		MenuFixed(scrolls, offset, height);
	});
	
	
	if(jQuery('.banner-left-content').length > 0 && jQuery('.banner-right-content').length > 0) {
		var offsetContent = jQuery('.banner-right-left').offset().top;
		var offsetFooter = jQuery('#footer_wrapper').offset().top;
		var scrollContent = jQuery(document).scrollTop();
		
		scrollBanner(scrollContent, offsetContent, offsetFooter);
		
		jQuery(window).scroll(function() {
			offsetContent = jQuery('.banner-right-left').offset().top;
			offsetFooter = jQuery('#footer_wrapper').offset().top;
			scrollContent = jQuery(document).scrollTop();
			scrollBanner(scrollContent, offsetContent, offsetFooter);
		});
	}
	
	jQuery('#order_phone').keypress(function (e) {
		if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
			return false;
		}
	});
	
	HeightMenu();
	titleHeightVideo('.all_video_show .title_all_video, .article_row .title_article_col, .newspaper_contents .title_col_newspaper');
	
	jQuery(window).resize(function() {
		HeightMenu();
		titleHeightVideo('.all_video_show .title_all_video, .article_row .title_article_col, .newspaper_contents .title_col_newspaper');
	});
	
	if(jQuery('.tnp-field-email .tnp-email').length) {
		jQuery('.tnp-field-email .tnp-email').attr('placeholder', 'Email của Quý Khách');
	}
	
	if(jQuery('.tnp-field-button .tnp-submit').length) {
        jQuery('.tnp-field-button .tnp-submit').val('Đăng ký');
    }
	
	jQuery(".nav-product > ul > li.menu-item-type-custom > a").click(function(e) { 
		e.preventDefault(); 
		var id = jQuery(this).attr('href');
		goToByScroll(id);           
	});
	
	jQuery(".landing_page_product .nav-mobile > ul > li.menu-item-type-custom > a").click(function(e) { 
		e.preventDefault(); 
		var id = jQuery(this).attr('href');
		goToByScroll(id);           
	});
	
	menuScroll(jQuery(document).scrollTop());
	
	jQuery(window).scroll(function() {
		menuScroll(jQuery(document).scrollTop());
	});
	
});

function scrollBanner(scrolls, offsetContent, offsetFooter) {
	var widthContent = jQuery('.banner-right-left > .container').outerWidth();
	var widthScreen = jQuery(window).width();
	var paddingContent = ((widthScreen - widthContent) / 2) - 120;
	
	if(scrolls > (offsetContent - 50) && scrolls < (offsetFooter - 600)) {
		jQuery('.banner-left-content').css('left', paddingContent + 'px').removeClass('banner-left-bottom').addClass('banner-left-fixed');
		jQuery('.banner-right-content').css('right', paddingContent + 'px').removeClass('banner-right-bottom').addClass('banner-right-fixed');
	} else if(scrolls > (offsetFooter - 600)) {
		jQuery('.banner-left-content').removeAttr('style').removeClass('banner-left-fixed').addClass('banner-left-bottom');
		jQuery('.banner-right-content').removeAttr('style').removeClass('banner-right-fixed').addClass('banner-right-bottom');
	} else {
		jQuery('.banner-left-content').removeAttr('style').removeClass('banner-left-fixed banner-left-bottom');
		jQuery('.banner-right-content').removeAttr('style').removeClass('banner-right-fixed banner-right-bottom');
	}
}

function MenuFixed(scrolls, offset, height) {
	if(scrolls > offset) {
		jQuery('.menu_wrapper').addClass('menu_fixed');
		jQuery('#header_wrapper').css('margin-bottom', height + 'px');
	} else {
		jQuery('.menu_wrapper').removeClass('menu_fixed');
		jQuery('#header_wrapper').removeAttr('style');
	}
}

function validateEmail(email) {
    var checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return checkEmail.test(email);
}

function validatePhone(phone) {
	if(phone.length == 10 || phone.length == 11) {
		var filter;
		if(phone.length == 10) {
			filter = /\(?[0]{1}?([0-9]{9})\)?$/;
		} else {
			filter = /\(?[0]{1}?([0-9]{10})\)?$/;
		}
		 
		if (filter.test(phone)) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

function HeightMenu() {
	if(jQuery(window).width() < 768) {
		jQuery('.menu_mobile').css('height', jQuery(window).height() - jQuery('.menu_wrapper').height() + 'px');
	}
}

function titleHeightVideo(child) {
	var highestBox = 0;
	
	if(jQuery(window).width() > 767) {
		
		jQuery(child).each(function() {
			jQuery(child).removeAttr('style');
			
			if(jQuery(this).height() > highestBox) {
				highestBox = jQuery(this).height()
			}
		});
		
		jQuery(child).height(highestBox);
	}
}

function goToByScroll(id){
      // Remove "link" from the ID
    id = id.replace("link", "");
      // Scroll
    jQuery('html,body').animate({
        scrollTop: jQuery(id).offset().top - jQuery('.menu_wrapper').height()},
		'slow');
}

function menuScroll(scroltop) {
	var offset1 = '';
	var offset2 = '';
	var offset3 = '';
	var offset4 = '';
	var offset5 = '';

	if(jQuery('#section_landing_one').select().length != 0) {
		offset1 = jQuery('#section_landing_one').offset().top;
	}

	if(jQuery('#section_landing_two').select().length != 0) {
		offset2 = jQuery('#section_landing_two').offset().top;
	}
	
	if(jQuery('#section_landing_three').select().length != 0) {
		offset3 = jQuery('#section_landing_three').offset().top;
	}
	
	if(jQuery('#section_landing_four').select().length != 0) {
		offset4 = jQuery('#section_landing_four').offset().top;
	}
	
	if(jQuery('#footer_wrapper').select().length != 0) {
		offset5 = jQuery('#footer_wrapper').offset().top;
	}
	
	if(scroltop < offset1 - 80) {
		jQuery('.nav-product > ul > li').removeClass('product_menu_active');
		jQuery('.nav-product > ul > li:first-child').addClass('product_menu_active');
	} else if(scroltop >= offset1 - 80 && scroltop < offset2 - 80) {
		jQuery('.nav-product > ul > li > a').each(function() {
			if(jQuery(this).attr('href') == '#section_landing_one') {
				jQuery('.nav-product > ul > li').removeClass('product_menu_active');
				jQuery(this).parent().addClass('product_menu_active');
			}
		});
	} else if (scroltop >= offset2 - 80 && scroltop < offset3 - 80) {
		jQuery('.nav-product > ul > li > a').each(function() {
			if(jQuery(this).attr('href') == '#section_landing_two') {
				jQuery('.nav-product > ul > li').removeClass('product_menu_active');
				jQuery(this).parent().addClass('product_menu_active');
			}
		});
	} else if (scroltop >= offset3 - 80 && scroltop < offset4 - 80) {
		jQuery('.nav-product > ul > li > a').each(function() {
			if(jQuery(this).attr('href') == '#section_landing_three') {
				jQuery('.nav-product > ul > li').removeClass('product_menu_active');
				jQuery(this).parent().addClass('product_menu_active');
			}
		});
	} else if (scroltop >= offset4 - 80 && scroltop < offset5 - 80) {
		jQuery('.nav-product > ul > li > a').each(function() {
			if(jQuery(this).attr('href') == '#section_landing_four') {
				jQuery('.nav-product > ul > li').removeClass('product_menu_active');
				jQuery(this).parent().addClass('product_menu_active');
			}
		});
	} else if (scroltop >= offset5 - 80) {
		jQuery('.nav-product > ul > li > a').each(function() {
			if(jQuery(this).attr('href') == '#footer_wrapper') {
				jQuery('.nav-product > ul > li').removeClass('product_menu_active');
				jQuery(this).parent().addClass('product_menu_active');
			}
		});
	}
	
}

function sameHeightElm(elm) {
    var height = jQuery(elm).map(function() {
        return jQuery(this).outerHeight();
    }).get();

    maxHeight = Math.max.apply(null, height);

    jQuery(elm).css('min-height', maxHeight + 'px');
}