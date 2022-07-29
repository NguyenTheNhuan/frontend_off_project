(function ($) {
    'use strict';

    var browserWindow = $(window);

    // :: 1.0 Preloader Active Code
    browserWindow.on('load', function () {
        $('.preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

    // :: 2.0 Nav Active Code
    if ($.fn.classyNav) {
        $('#vizewNav').classyNav();
    }

    // :: 3.0 Newsticker Active Code
    if ($.fn.simpleTicker) {
        $.simpleTicker($("#breakingNewsTicker"), {
            speed: 1000,
            delay: 3000,
            easing: 'swing',
            effectType: 'roll'
        });
    }

    // :: 4.0 Sticky Active Code
    if ($.fn.sticky) {
        $("#sticker").sticky({
            topSpacing: 0
        });
    }

    // :: 5.0 Sliders Active Code
    if ($.fn.owlCarousel) {
        $('.twitter-slides').owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 1000
        });

        $('.featured-post-slides').owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: true,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 1000
        });

        $('.sport-video-slides').owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: true,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 1000
        });

        $('.business-video-slides').owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: true,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 1000
        });
    }

    // :: 6.0 Nicescroll Active Code
    if ($.fn.niceScroll) {
        $(".vizew-nav-tab").niceScroll({
            cursorcolor: "#838586",
            cursorwidth: "6px",
            cursorborder: 'none'
        });
    }

    // :: 7.0 ScrollUp Active Code
    if ($.fn.scrollUp) {
        browserWindow.scrollUp({
            scrollSpeed: 1500,
            scrollText: '<i class="ti-angle-up"></i>'
        });
    }

    // :: 8.0 Tooltip Active Code
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // :: 9.0 CounterUp Active Code
    if ($.fn.counterUp) {
        $('.counter').counterUp({
            delay: 10,
            time: 3000
        });
    }

    // :: 10.0 Prevent Default a Click
    $('a[href="#"]').on('click', function (e) {
        e.preventDefault();
    });

    // :: 11.0 Wow Active Code
    if (browserWindow.width() > 767) {
        new WOW().init();
    }

    const API_PREFIX = 'http://apiforlearning.zendvn.com/api/';
    let elmAreaCategoryNews = $("ul#zvn-area-category-news");
    $.getJSON( API_PREFIX + "categories_news", function( data ) {
        let xhtml = '';
        $.each( data, function( key, val ) {
            xhtml += `<li><a href="archive-list.html?id=${val.id}">- ${val.name}</a></li>`;
        });
       
        elmAreaCategoryNews.html(xhtml);
    });

    $.urlParam = function (name) {
        console.log("name" + name)
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        }
        return decodeURI(results[1]) || 0;
    }
    
        let idParam = $.urlParam('id');
        let elmAreaListNews = $("#zvn-area-list-news");
        if (idParam !== null) {
            console.log(idParam)
        $.getJSON( API_PREFIX + "categories_news/" + idParam + "/articles", function( data ) {
            let xhtml = '';
            $.each( data, function( key, val ) {
                console.log(val)
                xhtml += ` <div class="single-post-area style-2">
                <div class="row align-items-center">
                    <div class="col-12 col-md-6">
                        <!-- Post Thumbnail -->
                        <div class="post-thumbnail">
                            <img src="${val.thumb}" alt="">
    
                            <!-- Video Duration -->
                            <span class="video-duration">Tin Mới</span>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <!-- Post Content -->
                        <div class="post-content mt-0">
                            <a href="#" class="post-cata cata-sm cata-danger">${val.category.name}</a>
                            <a href="single-post.html" class="post-title mb-2">${val.title}</a>
                            <div class="post-meta d-flex align-items-center mb-2">
                                <a href="#" class="post-author">By Jane</a>
                                <i class="fa fa-circle" aria-hidden="true"></i>
                                <a href="#" class="post-date">Sep 08, 2018</a>
                            </div>
                            <p class="mb-2">${val.description}</p>
                            <div class="post-meta d-flex">
                                <a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 32</a>
                                <a href="#"><i class="fa fa-eye" aria-hidden="true"></i> 42</a>
                                <a href="#"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> 7</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
            });
           
            elmAreaListNews.append(xhtml);
        });
    }
    

})(jQuery);

