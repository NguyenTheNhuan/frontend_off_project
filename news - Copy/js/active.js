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

    // Đổ dữ liệu ra category news
    // const API_PREFIX = 'http://apiforlearning.zendvn.com/api/';
    const API_PREFIX = 'http://apiforlearning.zendvn.com/api/';
    let elmAreaCategoryNews = $("ul#zvn-area-category-news");
    $.getJSON( API_PREFIX + "categories_news", function( data ) {
        let xhtml = '';
        $.each( data, function( key, val ) {
            xhtml += `<li><a href="archive-list.html?id=${val.id}">- ${val.name}</a></li>`;
        });
       
        elmAreaCategoryNews.html(xhtml);
    });

   // Giá vàng
let elmAreaGold = $("#zvn-area-gold");
function showGold() {
    
    $.getJSON( API_PREFIX + "get-gold", function( data ) {
        let xhtml = '';
        $.each( data, function( key, val ) {
            console.log(val);
            xhtml += `<div class="area-gold-item">
                    <p>${val.type}</p>
                    Mua: <span class="buy">${val.buy}.000đ</span>, Bán <span class="sell">${val.sell}.000đ</span>
                </div>`;
        }); 
        // elmAreaGold.html(xhtml);
        elmAreaGold.after(xhtml);
    });
}

// Giá coin
    let elmAreaCoin = $("#zvn-area-coin");
    function showCoin ()  {
    $.getJSON( API_PREFIX + "get-coin", function( data ) {
        let xhtml = '';
        $.each( data, function( key, val ) {
            val.price = val.price.toLocaleString(); 
            val.percent_change_24h = val.percent_change_24h.toFixed(2); 
            let classPrice = (val.percent_change_24h > 0) ? 'green' : 'red';
            xhtml += `<div class="area-coin-item"> 
                    <p>${val.name}</p>
                    Price: <span class="price">${val.price}</span>, Percent 24h <span class="sell ${classPrice}">${val.percent_change_24h}%</span>
                </div>`;
        }); 
        elmAreaCoin.after(xhtml);
    });
}  

showGold();
showCoin();

    $.urlParam = function (name) {
        
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        }
        return decodeURI(results[1]) || 0;
    }
    
        let idParam = $.urlParam('id');
        let elmAreaListNews = $("#zvn-area-list-news");
        if (idParam !== null) {
           
        $.getJSON( API_PREFIX + "categories_news/" + idParam + "/articles", function( data ) {
            let xhtml = '';
            $.each( data, function( key, val ) {
               
                xhtml += ` <div class="single-post-area style-2">
                <div class="row align-items-center">
                    <div class="col-12 col-md-6">
                        <!-- Post Thumbnail -->
                        <div class="post-thumbnail">
                            <img src="${val.thumb}" alt="">
    
                            <!-- Video Duration -->
                            <span class="video-duration">05.03</span>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <!-- Post Content -->
                        <div class="post-content mt-0">
                            <a href="#" class="post-cata cata-sm cata-danger">${val.category.name}</a>
                            <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2 text-white">${val.title}</a> 
                            <div class="post-meta d-flex align-items-center mb-2">
                            <a href="#"><i class="" aria-hidden="true"></i> ${val.publish_date}</a>
                                <a href="#"><i class="fas fa-heart" aria-hidden="true"></i>Yêu thích</a>
                            </div>
                            <p class="mb-2">${val.description}</p>
                            <div class="post-meta d-flex">
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
            });
           
            elmAreaListNews.append(xhtml);
        });}

        // tin mới nhất
        // let elmAreaLatestNews = $("#zvn-area-category-news-new");
        //  $.getJSON( API_PREFIX + "articles?offset=6&limit=3&sort_by=id&sort_dir=desc", function( data ) {
    //         $.getJSON( API_PREFIX + "articles?offset=80&limit=3&sort_by=id&sort_dir=desc", function( data ) {
    //         let xhtml = '';
    //         $.each( data, function( key, val ) {
                
    //             if  (key > 5) return false;
    //             xhtml += ` <div class="col-12 col-md-4">
    //                 <div class="single-post-area mb-80">
    //                     <!-- Post Thumbnail -->
    //                     <div class="post-thumbnail">
    //                         <img src="${val.thumb}" alt="">

                            
    //                     </div>

    //                     <!-- Post Content -->
    //                     <div class="post-content">
    //                         <a href="#" class="post-cata cata-sm cata-success">${val.category.name}</a>
    //                         <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2 text-white">${val.title}</a>
    //                         <div class="post-meta d-flex" ${val.description}>
                            
    //                         <a href="#"><i class="" aria-hidden="true"></i> ${val.publish_date}</a>
                               
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>

    //         </div>`;
    //         });
    //         elmAreaLatestNews.html(xhtml);
        
    // });


       // trang tin tức Kinh doanh, giải trí, du lịch
//         let elmAreaHome_1News = $("#zvn-area-category-news-home_1");
 
//         $.getJSON( API_PREFIX + "categories_news/3/articles?offset=0&limit=3&sort_by=id&sort_dir=desc", function( data ) {
//             let xhtml = '';
//             $.each( data, function( key, val ) {
                
//                 xhtml += `<div class="col-12 col-lg-12">
//                 <div class="single-blog-post style-3 d-flex mb-50">
//                                 <div class="post-thumbnail">
//                                     <img src="${val.thumb}" alt="">
//                                 </div>
//                     <div class="post-content">
//                         <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2 text-white">${val.title}
//                         </a> 
//                         <div class="post-meta d-flex justify-content-between"> ${val.description}
//                         </div>
//                         <div class="post-meta d-flex justify-content-left" >
//                         <a href="#" class="mr-4"><i class="fa fa-comments-o " aria-hidden="true"></i> 16</a>
//                         <a href="#" class="mr-4"><i class="fa fa-eye " aria-hidden="true"></i> 26</a>
//                         <a href="#"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> 17</a>
                        
                        
//                     </div>
//                 </div>
//             </div>

//             </div>`;
//         });
//         elmAreaHome_1News.html(xhtml);
    
//     });

//         let elmAreaHome_2News = $("#zvn-area-category-news-home_2");
 
//         $.getJSON( API_PREFIX + "categories_news/5/articles?offset=0&limit=3&sort_by=id&sort_dir=desc", function( data ) {
//         let xhtml = '';
//         $.each( data, function( key, val ) {
            
            
//             xhtml += `<div class="col-12 col-lg-12">
//             <div class="single-blog-post style-3 d-flex mb-50">
//                 <div class="post-thumbnail">
//                     <img src="${val.thumb}" alt="">
//                 </div>
//                 <div class="post-content">
//                 <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2 text-white">${val.title}</a>
//                     <div class="post-meta d-flex justify-content-between" >${val.description}
//                     </div>
//                     <div class="post-meta d-flex justify-content-left" >
                    
//                         <a href="#" class="mr-4"><i class="fa fa-comments-o " aria-hidden="true"></i> 16</a>
//                         <a href="#" class="mr-4"><i class="fa fa-eye " aria-hidden="true"></i> 26</a>
//                         <a href="#"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> 17</a>
                       
//                 </div>
//             </div>
//         </div>

//         </div>`;
//     });
//     elmAreaHome_2News.html(xhtml);

//     });

//         let elmAreaHome_3News = $("#zvn-area-category-news-home_3");
 
//         $.getJSON( API_PREFIX + "categories_news/11/articles?offset=0&limit=3&sort_by=id&sort_dir=desc", function( data ) {
//         let xhtml = '';
//         $.each( data, function( key, val ) {
            
            
//             xhtml += `<div class="col-12 col-lg-12">
//             <div class="single-blog-post style-3 d-flex mb-50">
//                 <div class="post-thumbnail">
//                     <img src="${val.thumb}" alt="">
//                 </div>
//                 <div class="post-content">
//                 <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2 text-white">${val.title}</a>
//                     <div class="post-meta d-flex justify-content-between" > ${val.description}
                        
//                     </div>
//                     <div class="post-meta d-flex justify-content-left" >
                    
//                     <a href="#" class="mr-4"><i class="fa fa-comments-o " aria-hidden="true"></i> 16</a>
//                         <a href="#" class="mr-4"><i class="fa fa-eye " aria-hidden="true"></i> 26</a>
//                         <a href="#"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> 17</a>
                       
                        
//                 </div>
//             </div>
//         </div>

//         </div>`;
//     });
//     elmAreaHome_3News.html(xhtml);

//     let items = listItems()

//     showArticleViewed(items);

    
// } );     



    
    
    
     // trang tin tức đầu bài
    
    
    
    let elmAreasportNews = $("#zvn-area-category-sport-news1");
    $.getJSON( API_PREFIX + "categories_news/6/articles?offset=34&limit=50&sort_by=id&sort_dir=desc", function( data ) {
    let xhtml = '';
    $.each( data, function( key, val ) {
        
        xhtml += `<li class="nav-item">
        <a class="nav-link " id="post-${key}-tab" data-toggle="pill" href="#post-${key}" role="tab" aria-controls="post-${key}" aria-selected="true">
            <!-- Single Blog Post -->
            <div class="single-blog-post style-2 d-flex align-items-center">
                <div class="post-thumbnail">
                    <img src="${val.thumb}" alt="">
                </div>
                <div class="post-content">
                    <h6 class="post-title">${val.title}</h6>
                    <div class="post-meta d-flex justify-content-between">
                       
                        
                    </div>
                </div>
            </div>
        </a>
    </li>
    </li>`;
});
 elmAreasportNews.html(xhtml);

});

    let elmAreasportNewsHome = $("#zvn-area-category-sport-home");
    $.getJSON( API_PREFIX + "categories_news/6/articles?offset=34&limit=50&sort_by=id&sort_dir=desc", function( data ) {
    let xhtml = '';
    $.each( data, function( key, val ) {
        let active = (key===0) ? "show active" : "";
        xhtml += `<div class="tab-pane fade ${active}" id="post-${key}" role="tabpanel" aria-labelledby="post-${key}-tab">
        <!-- Single Feature Post -->
        <div class="single-feature-post video-post bg-img" style="background-image: url(${val.thumb});">
            <!-- Play Button -->
            <a href="${val.link}" class=""><i class="" aria-hidden="true"></i></a>

            <!-- Post Content -->
            <div class="post-content" >
                <a href="" class="post-cata">${val.category.name}</a>
                <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2">${val.title}</a> 
                <div class="post-meta d-flex">
                <a href="#"><i class="" aria-hidden="true"></i> ${val.publish_date}</a>

                   
                </div>
            </div>

            
        </div>
    </div>
        `;
});
elmAreasportNewsHome.html(xhtml);

});  


// trang video tin tức ở giưa
// showVideoInTop = () => {
//     let showVideoTOP = $("#zvn-news-video-home");
//     // $.getJSON( API_PREFIX + "playlists/7/videos?offset=0&limit=1&sort_by=id&sort_dir=asc", function( data ) {
//          $.getJSON( API_PREFIX + "playlists/7/videos?offset=0&limit=1&sort_by=id&sort_dir=asc", function( data ) {
//     let xhtmlTop = '';
//     let xhtmlBottom = '';

//     $.each( data, function( key, val ) {
//         let thumbnailObj = JSON.parse(val.thumbnail);
//         let classActiveBottom = (key===0) ? "show active" : "";
//         xhtmlTop += ` <div class="single-feature-post video-post bg-img" style="background-image: url(${val.thumbnail});">
//         <!-- Play Button -->
//         <a href="" class="btn play-btn"><i class="fa fa-play" aria-hidden="true"></i></a>

//         <!-- Post Content -->
//         <div class="post-content">
//             <a href="#" class="post-cata">${val.category.name}</a>
//             <a href="" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumbnail}', '${val.link}')" class="post-title mb-2 text-white">${val.title}</a>
//             <div class="post-meta d-flex">
                
//             </div>
//         </div>

//         <!-- Video Duration -->
//         <span class="video-duration">05.03</span>
//     </div>
// </div>
//                                 </div>
//                             </div>
//                             </div>    `;
// });


// showVideoTOP.html(xhtml);

// });
// }

// trang tin tức ở giữa 2 (sau tin tức video)
    let elmAreaNewsHome_2a = $("#zvn-news-home_2a");
    $.getJSON( API_PREFIX + "categories_news/7/articles?offset=11&limit=1&sort_by=id&sort_dir=desc", function( data ) {
    let xhtml = '';
    $.each( data, function( key, val ) {
        let active = (key===0) ? "show active" : "";
        xhtml += `<div class="single-post-area mb-80">
                                    <!-- Post Thumbnail -->
                                    <div class="post-thumbnail">
                                        <img src="${val.thumb}" alt="">

                                        <!-- Video Duration -->
                                        <!-- <span class="video-duration">05.03</span> -->
                                    </div>

                                    <!-- Post Content -->
                                    <div class="post-content">
                                        <a href="#" class="post-cata cata-sm cata-danger">${val.category.name}</a>
                                        <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2">${val.title}</a>
                                        <div class="post-meta d-flex" >
                                        <a href="#"><i class="" aria-hidden="true"></i> ${val.publish_date}</a>
                                            
                                            
                </div>
            </div>

            
        </div>
    </div>
                            `;

});


elmAreaNewsHome_2a.html(xhtml);

});

    let elmAreaNewsHome_2b = $("#zvn-news-home_2b");
    $.getJSON( API_PREFIX + "categories_news/3/articles?offset=11&limit=1&sort_by=id&sort_dir=desc", function( data ) {
    let xhtml = '';
    $.each( data, function( key, val ) {
        let active = (key===0) ? "show active" : "";
        xhtml += `<div class="single-post-area mb-80">
                                    <!-- Post Thumbnail -->
                                    <div class="post-thumbnail">
                                        <img src="${val.thumb}" alt="">

                                        <!-- Video Duration -->
                                        <!-- <span class="video-duration">05.03</span> -->
                                    </div>

                                    <!-- Post Content -->
                                    <div class="post-content">
                                        <a href="#" class="post-cata cata-sm cata-danger">${val.category.name}</a>
                                        <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2">${val.title}</a>
                                        <div class="post-meta d-flex" >
                                        <a href="#"><i class="" aria-hidden="true"></i> ${val.publish_date}</a>
                                          
                                          
                </div>
            </div>

            
        </div>
    </div>
                            `;

});


elmAreaNewsHome_2b.html(xhtml);

});


// Đổ danh sách category và bài viết của category ngoài trang chủ
// let elmAreaLeftContent  = $("#zvn-area-left-content");
// showCategoryDetail = () => {
   
//     $.each( arrCategoryInHome, function( key, value ) {
//         let xhtml = '';
//         $.getJSON( API_PREFIX + `categories_news/${value}/articles?offset=0&limit=4&sort_by=id&sort_dir=desc`, function( data ) { 
//             xhtml = `<div class="section-heading style-2">
//                         <h4>${data[0].category.name}</h4>
//                         <div class="line"></div>
//                     </div>`;
//             $.each( data, function( key, val ) {
//                 xhtml += `<!-- Single Post Area -->
//                         <div class="single-post-area mb-30">
//                             <div class="row align-items-center">
//                                 <div class="col-12 col-lg-6">
//                                     <!-- Post Thumbnail -->
//                                     <div class="post-thumbnail">
//                                         <img src="${val.thumb}" alt="${val.name}">
//                                         <span class="video-duration">05.03</span>
//                                     </div>
//                                 </div>
//                                 <div class="col-12 col-lg-6">
//                                     <!-- Post Content -->
//                                     <div class="post-content mt-0">
//                                     <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2">${val.title}</a> 
//                                         <div class="post-meta d-flex align-items-center mb-2">
//                                         <a href="#"><i class="" aria-hidden="true"></i> ${val.publish_date}</a>
//                                         </div>
//                                         <p class="mb-2">${val.description}</p>
//                                         <div class="post-meta d-flex">
//                                             <a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 32</a>
//                                             <a href="#"><i class="fa fa-eye" aria-hidden="true"></i> 42</a>
//                                             <a href="#"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> 7</a>
//                                             <a href="#"><i class="fas fa-heart" aria-hidden="true"></i>Yêu thích</a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>`;
//             });
//             elmAreaLeftContent.after(xhtml);
//             // elmAreaLeftContent.html(xhtml);
//         });
//         //  elmAreaLeftContent.after(xhtml);
        
//     });
// }



// tin tưc cuoi Trang
let elmAreaNewsHome_Last = $("#news-home-Last");
$.getJSON( API_PREFIX + "categories_news/2/articles?offset=0&limit=1&sort_by=id&sort_dir=desc", function( data ) {
    let xhtml = '';
    $.each( data, function( key, val ) {
        let active = (key===0) ? "show active" : "";
        xhtml += `
<div class="single-feature-post video-post bg-img" style="background-image: url(${val.thumb});">
                                <!-- Play Button -->
                                <a href="${val.link}" class=""><i class="" aria-hidden="true"></i></a>

                                <!-- Post Content -->
                                <div class="post-content">
                                    <a href="#" class="post-cata">${val.category.name}</a>
                                    <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2">${val.title}</a>
                                    <div class="post-meta d-flex">
                                    <a href="#"><i class="" aria-hidden="true"></i> ${val.publish_date}</a>
                                    </div>
                                </div>

                                
                            </div>

                           
                            </div>
                        </div>

                        </div>
                        </div>
                                                `;
                    
                    });
                    
                    
                    elmAreaNewsHome_Last.html(xhtml);
                    
});


let elmAreaNewsHome_Last_1 = $("#news-home-Last-1");  
$.getJSON( API_PREFIX + "categories_news/11/articles?offset=0&limit=2&sort_by=id&sort_dir=desc", function( data ) {
    let xhtml = '';
    $.each( data, function( key, val ) {
        let active = (key===0) ? "show active" : "";
        xhtml += `<div class="col-12 col-lg-6">
<!-- Post Thumbnail -->
<div class="post-thumbnail">
    <img src="${val.thumb}" alt="">

    
</div>
</div>
<div class="col-12 col-lg-6">
<!-- Post Content -->
<div class="post-content mt-0">
    <a href="#" class="post-cata cata-sm cata-success">${val.category.name}</a>
    <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2">${val.title}</a>
    <div class="post-meta d-flex align-items-center mb-2">
    <a href="#"><i class="" aria-hidden="true"></i> ${val.publish_date}</a>
    </div>
    <p class="mb-2">${val.description}</p>
    <div class="post-meta d-flex">
        
    </div>
</div>
</div>
</div>
</div>
                         </div>

                     </div>
                       </div>
                                              `;
                    
                    });
                    
                    
                    elmAreaNewsHome_Last_1.html(xhtml);
                    
});


let elmAreaNewsHome_Last_2 = $("#news-home-Last-2");  
$.getJSON( API_PREFIX + "categories_news/10/articles?offset=0&limit=2&sort_by=id&sort_dir=desc", function( data ) {
    let xhtml = '';
    $.each( data, function( key, val ) {
        let active = (key===0) ? "show active" : "";
        xhtml += `
<div class="col-12 col-lg-6">
            <!-- Post Thumbnail -->
            <div class="post-thumbnail">
                <img src="${val.thumb}" alt="">

               
            </div>
        </div>
        <div class="col-12 col-lg-6">
            <!-- Post Content -->
            <div class="post-content mt-0">
                <a href="#" class="post-cata cata-sm cata-danger">${val.category.name}</a>
                <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2">${val.title}</a>
                <div class="post-meta d-flex align-items-center mb-2">
                <a href="#"><i class="" aria-hidden="true"></i> ${val.publish_date}</a>
                </div>
                <p class="mb-2">${val.description}</p>
                <div class="post-meta d-flex">
                    
                </div>
            </div>
        </div>
    </div>
</div>

</div>

</div>
  </div>
                         `;

});


elmAreaNewsHome_Last_2.html(xhtml);

});


let elmAreaNewsHome_Last_3 = $("#news-home-Last-3");  
$.getJSON( API_PREFIX + "categories_news/9/articles?offset=0&limit=2&sort_by=id&sort_dir=desc", function( data ) {
    let xhtml = '';
    $.each( data, function( key, val ) {
        let active = (key===0) ? "show active" : "";
        xhtml += `
<div class="col-12 col-lg-6">
            <!-- Post Thumbnail -->
            <div class="post-thumbnail">
                <img src="${val.thumb}" alt="">

                
            </div>
        </div>
        <div class="col-12 col-lg-6">
            <!-- Post Content -->
            <div class="post-content mt-0">
                <a href="#" class="post-cata cata-sm cata-primary">${val.category.name}</a>
                <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2">${val.title}</a>
                <div class="post-meta d-flex align-items-center mb-2">
                <a href="#"><i class="" aria-hidden="true"></i> ${val.publish_date}</a>
                </div>
                <p class="mb-2">${val.description}</p>
                <div class="post-meta d-flex">
                   
                </div>
            </div>
        </div>
    </div>
</div>
</div>

</div>
  </div>
                         `;

});


elmAreaNewsHome_Last_3.html(xhtml);

});

let elmAreaNewsHome_Last_4 = $("#news-home-Last-4");  
$.getJSON( API_PREFIX + "categories_news/8/articles?offset=0&limit=2&sort_by=id&sort_dir=desc", function( data ) {
    let xhtml = '';
    $.each( data, function( key, val ) {
        let active = (key===0) ? "show active" : "";
        xhtml += `
<div class="col-12 col-lg-6">
<!-- Post Thumbnail -->
<div class="post-thumbnail">
    <img src="${val.thumb}" alt="">

    <!-- Video Duration -->
    <span class="video-duration">05.03</span>
</div>
</div>
<div class="col-12 col-lg-6">
<!-- Post Content -->
<div class="post-content mt-0">
    <a href="#" class="post-cata cata-sm cata-danger">${val.category.name}</a>
    <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2">${val.title}</a>
    <div class="post-meta d-flex align-items-center mb-2">
    <a href="#"><i class="" aria-hidden="true"></i> ${val.publish_date}</a>
    </div>
    <p class="mb-2">${val.description}</p>
    <div class="post-meta d-flex">
        
    </div>
</div>
</div>
</div>
</div>

</div>

</div>
  </div>
                         `;

});


elmAreaNewsHome_Last_4.html(xhtml);

});


// tin mới nhất (chỉnh lại)


    let elmAreaNewsNew = $("#zvn-news-new");
    $.getJSON( API_PREFIX + "articles?offset=1&limit=1&sort_by=id&sort_dir=desc", function( data ) {
            let xhtml = '';
            $.each( data, function( key, val ) {
                
                // if  (key > 5) return false;
                xhtml += `<div class="post-thumbnail">
                            <img src="${val.thumb}" alt="">  
                        </div>

                        <!-- Post Content -->
                        <div class="post-content">
                            <a href="#" class="post-cata cata-sm cata-success">${val.category.name}</a>
                            <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2 text-white">${val.title}</a>
                            <div class="post-meta d-flex">
                            <a href="#"><i class="" aria-hidden="true"></i> ${val.publish_date}</a>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                             </div>
            
                     </div>`;
                        });
                        elmAreaNewsNew.html(xhtml);
                    
                });

    let elmAreaNewsNew1 = $("#zvn-news-new-1");
    $.getJSON( API_PREFIX + "articles?offset=0&limit=1&sort_by=id&sort_dir=desc", function( data ) {
                            let xhtml = '';
                            $.each( data, function( key, val ) {
                                
                                // if  (key > 5) return false;
                                xhtml += `
                <div class="post-thumbnail">
                            <img src="${val.thumb}" alt="">

                            
                        </div>

                        <!-- Post Content -->
                        <div class="post-content">
                            <a href="#" class="post-cata cata-sm cata-danger">${val.category.name}</a>
                            <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2 text-white">${val.title}</a>
                            <div class="post-meta d-flex">
                            <a href="#"><i class="" aria-hidden="true"></i> ${val.publish_date}</a>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </div>

        </div>`;
           });
           elmAreaNewsNew1.html(xhtml);
       
   });


   let elmAreaNewsNew2 = $("#zvn-news-new-2");
   $.getJSON( API_PREFIX + "articles?offset=5&limit=1&sort_by=id&sort_dir=desc", function( data ) {
           let xhtml = '';
           $.each( data, function( key, val ) {
               
               // if  (key > 5) return false;
               xhtml += ` <div class="post-thumbnail">
               <img src="${val.thumb}" alt="">

              
           </div>

           <!-- Post Content -->
           <div class="post-content">
               <a href="#" class="post-cata cata-sm cata-primary">${val.category.name}</a>
               <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2 text-white">${val.title}</a>
               <div class="post-meta d-flex">
               <a href="#"><i class="" aria-hidden="true"></i> ${val.publish_date}</a>
               </div>
           </div>
       </div>

                </div>
                             </div>
            
                     </div>`;
                        });
                        elmAreaNewsNew2.html(xhtml);
                    
                });

})(jQuery);
