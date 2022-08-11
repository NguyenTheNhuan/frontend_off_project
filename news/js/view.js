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


    //Lấy danh sách bài viết trong 1 category nào đó

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
        });
    }

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


// tin tưc cuoi Trang

// cuối trang 1-thoi sự
let elmAreaNewsHome_Last = $("#news-home-news-Last");
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


let elmAreaNewsHome_Last_1 = $("#news-home-new-Last-1");  
$.getJSON( API_PREFIX + "categories_news/2/articles?offset=2&limit=2&sort_by=id&sort_dir=desc", function( data ) {
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


 // cuối trang  thoi sư

 let elmAreaNewsHome_Last_one = $("#news-home-Travel-Last");
$.getJSON( API_PREFIX + "categories_news/11/articles?offset=0&limit=1&sort_by=id&sort_dir=desc", function( data ) {
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
                    
                    
                    elmAreaNewsHome_Last_one.html(xhtml);
                    
});

let elmAreaNewsHome_Last_2 = $("#news-home-Travel-Last-1");  
$.getJSON( API_PREFIX + "categories_news/11/articles?offset=1&limit=3&sort_by=id&sort_dir=desc", function( data ) {
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


// cuối trang  suc khoe

let elmAreaNewsHome_Health_Last = $("#news-home-Health-Last");
$.getJSON( API_PREFIX + "categories_news/9/articles?offset=0&limit=1&sort_by=id&sort_dir=desc", function( data ) {
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
                    
                    
                    elmAreaNewsHome_Health_Last.html(xhtml);
                    
});


let elmAreaNewsHome_Health_last_1 = $("#news-home-Health-Last-1");  
$.getJSON( API_PREFIX + "categories_news/9/articles?offset=1&limit=3&sort_by=id&sort_dir=desc", function( data ) {
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


elmAreaNewsHome_Health_last_1.html(xhtml);

});


// cuối trang  giáo dục

let elmAreaNewsHome_Education_Last = $("#news-home-Education-Last");
$.getJSON( API_PREFIX + "categories_news/8/articles?offset=1&limit=1&sort_by=id&sort_dir=desc", function( data ) {
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
                    
                    
                    elmAreaNewsHome_Education_Last.html(xhtml);
                    
});


let elmAreaNewsHome_Education_Last_1 = $("#news-Education-Last-1");  
$.getJSON( API_PREFIX + "categories_news/8/articles?offset=2&limit=2&sort_by=id&sort_dir=desc", function( data ) {
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


elmAreaNewsHome_Education_Last_1.html(xhtml);

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