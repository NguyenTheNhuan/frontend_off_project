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
    function showItemss() { 
        let nameCategory = $("#news-name")
        let idParam = $.urlParam('id');
        if (idParam !== null) {
        $.getJSON( API_PREFIX + "categories_news/" + idParam + "/articles", function( data ) {
            let xhtml = '';
            let name  = data[0].category.name
            nameCategory.text(name)
            $.each( data, function( key, val ) {
                let title = val.title.replace(/'/g, '').replace(/"/g, '');   
                let description = val.description.replace(/'/g, '').replace(/"/g, '');  
                let statusHeart = `
                            <a href="javascript:void(0);" onClick="funcLove('${val.id}','`+title+`','${val.thumb}','${val.link}','${description}','${val.category.name}','newsLove');">
                            <span class="badge badge-danger font-weight-bold loveItems" data-type="news">
                                <i class="fa-solid fa-heart" style="margin-right: 4px;"></i>Thích
                        </span>
                    </a>               `
                let day = val.publish_date.split(" ")[0].split("-")
                let time = val.publish_date.split(" ")[1]
                let loveNews = loadLove();
                
                let idNews = val.id;
                $.each(loveNews, function (key, val) {
             if (val.id == idNews) {
                        statusHeart = `
                        <a href="javascript:void(0);" onClick="funcRemoveLove(${val.id},'newsLove');">
                             <span class="badge badge-danger font-weight-bold loveItems bg-white text-primary" data-type="news">
                                 <i class="fa-solid fa-heart text-primary" style="margin-right: 4px;"></i>Bỏ Thích
                            </span>
                        </a>`
                    }
                })
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
                            <div class="post-meta   ">
                            <!-- <p class="text-light mb-0"><i class="fa-solid fa-clock mr-2"></i>` + day[2]+"-"+day[1]+"-"+day[0] + " " + time + `</p> -->
                                <a href="#"><i class="" aria-hidden="true"></i><i class="fa-solid fa-clock mr-2"></i>` + day[2]+"-"+day[1]+"-"+day[0] + " " + time + `</a>

                            </div>
                            <p class="mb-2">${val.description}</p>
                            ${statusHeart}
                        </div>
                    </div>
                </div>
            </div>`;
            });
            elmAreaListNews.html(xhtml);
            
        });
    } else {
        $.getJSON( API_PREFIX + "articles?offset=0&limit=20&sort_by=id&sort_dir=desc", function( data ) {
            let xhtml = '';
            
            $.each( data, function( key, val ) {
                let title = val.title.replace(/'/g, '').replace(/"/g, '');   
                let description = val.description.replace(/'/g, '').replace(/"/g, '');  
                let statusHeart = `
                            <a href="javascript:void(0);" onClick="funcLove('${val.id}','`+title+`','${val.thumb}','${val.link}','${description}','${val.category.name}','newsLove');">
                            <span class="badge badge-danger font-weight-bold loveItems" data-type="news">
                                <i class="fa-solid fa-heart" style="margin-right: 4px;"></i>Thích
                        </span>
                    </a>               `
                let day = val.publish_date.split(" ")[0].split("-")
                let time = val.publish_date.split(" ")[1]
                let loveNews = loadLove();
                
                let idNews = val.id;
                $.each(loveNews, function (key, val) {
             if (val.id == idNews) {
                        statusHeart = `
                        <a href="javascript:void(0);" onClick="funcRemoveLove(${val.id},'newsLove');">
                             <span class="badge badge-danger font-weight-bold loveItems bg-white text-primary" data-type="news">
                                 <i class="fa-solid fa-heart text-primary" style="margin-right: 4px;"></i>Bỏ Thích
                            </span>
                        </a>`
                    }
                })
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
                            <div class="post-meta   ">
                                <p class="text-light mb-0"><i class="fa-solid fa-clock mr-2"></i>` + day[2]+"-"+day[1]+"-"+day[0] + " " + time + `</p>
                            </div>
                            <p class="mb-2">${val.description}</p>
                            ${statusHeart}
                        </div>
                    </div>
                </div>
            </div>`;
            });
            elmAreaListNews.html(xhtml);
            
        });
    }}
    // Giá vàng
let elmAreaGold = $("#zvn-area-gold");
function showGold() {
    
    $.getJSON( API_PREFIX + "get-gold", function( data ) {
        let xhtml = '';
        $.each( data, function( key, val ) {
        
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
    
$.getJSON( API_PREFIX + "categories_news/6/articles?offset=34&limit=50&sort_by=id&sort_dir=desc", function( data ) {
let xhtml = '';
$.each( data, function( key, val ) {

    let active = (key === 0) ? "active" : "";

    xhtml += `<li class="nav-item">
    <a class="nav-link ${active} id="post-${key}-tab" data-toggle="pill" href="#post-${key}" role="tab" aria-controls="post-${key}" aria-selected="true">
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
    let day = val.publish_date.split(" ")[0].split("-")
    let time = val.publish_date.split(" ")[1]
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
            <a href="#"><i class="" aria-hidden="true"></i><i class="fa-solid fa-clock mr-2"></i>` + day[2]+"-"+day[1]+"-"+day[0] +  `</a>

            
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
        let day = val.publish_date.split(" ")[0].split("-")
        let time = val.publish_date.split(" ")[1]
        let active = (key===0) ? "show active" : "";
        xhtml += `
<div class="single-feature-post video-post bg-img" style="background-image: url(${val.thumb});">
                                <!-- Play Button -->
                                <a href="${val.link}" class=""><i class="" aria-hidden="true"></i></a>

                                <!-- Post Content -->
                                <div class="post-content">
                                       
                                        <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2">${val.title}</a>
                                    <div class="post-meta d-flex">
                                        <a href="#"><i class="" aria-hidden="true"></i><i class="fa-solid fa-clock mr-2"></i>` + day[2]+"-"+day[1]+"-"+day[0] + " " + time + `</a>
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
        let day = val.publish_date.split(" ")[0].split("-")
        let time = val.publish_date.split(" ")[1]
        let active = (key===0) ? "show active" : "";
        xhtml += `<div class="col-12 col-lg-6 mb-2">
<!-- Post Thumbnail -->
<div class="post-thumbnail">
    <img src="${val.thumb}" alt="">

    
</div>
</div>
<div class="col-12 col-lg-6">
<!-- Post Content -->
<div class="post-content mt-0">
<!-- <a href="#" class="post-cata cata-sm cata-success"></a>-->
    <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2">${val.title}</a>
    <div class="post-meta d-flex align-items-center mb-2">
    <a href="#"><i class="" aria-hidden="true"></i><i class="fa-solid fa-clock mr-2"></i>` + day[2]+"-"+day[1]+"-"+day[0] + " " + time + `
    </a>
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


 // cuối trang  du lich

 let elmAreaNewsHome_Last_one = $("#news-home-Travel-Last");
$.getJSON( API_PREFIX + "categories_news/11/articles?offset=0&limit=1&sort_by=id&sort_dir=desc", function( data ) {
    let xhtml = '';
    $.each( data, function( key, val ) {
        let day = val.publish_date.split(" ")[0].split("-")
                let time = val.publish_date.split(" ")[1]
        let active = (key===0) ? "show active" : "";
        xhtml += `
<div class="single-feature-post video-post bg-img" style="background-image: url(${val.thumb});">
                                <!-- Play Button -->
                                <a href="${val.link}" class=""><i class="" aria-hidden="true"></i></a>

                                <!-- Post Content -->
                                <div class="post-content">
                                    <!-- <a href="#" class="post-cata">${val.category.name}</a> -->
                                    <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2">${val.title}</a>
                                    <div class="post-meta d-flex">
                                    <a href="#"><i class="" aria-hidden="true"></i><i class="fa-solid fa-clock mr-2"></i>` + day[2]+"-"+day[1]+"-"+day[0] + " " + time + `</a>
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
        let day = val.publish_date.split(" ")[0].split("-")
                let time = val.publish_date.split(" ")[1]

        let active = (key===0) ? "show active" : "";
        xhtml += `
<div class="col-12 col-lg-6 mb-2">
            <!-- Post Thumbnail -->
            <div class="post-thumbnail">
                <img src="${val.thumb}" alt="">

               
            </div>
        </div>
        <div class="col-12 col-lg-6">
            <!-- Post Content -->
            <div class="post-content mt-0">
               <!-- <a href="#" class="post-cata cata-sm cata-danger">${val.category.name}</a> -->
                <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2">${val.title}</a>
                <div class="post-meta d-flex align-items-center mb-2">
                <a href="#"><i class="" aria-hidden="true"></i> <i class="fa-solid fa-clock mr-2"></i>` + day[2]+"-"+day[1]+"-"+day[0] + " " + time + `</a>
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
        let day = val.publish_date.split(" ")[0].split("-")
        let time = val.publish_date.split(" ")[1]
        let active = (key===0) ? "show active" : "";
        xhtml += `
<div class="single-feature-post video-post bg-img" style="background-image: url(${val.thumb});">
                                <!-- Play Button -->
                                <a href="${val.link}" class=""><i class="" aria-hidden="true"></i></a>

                                <!-- Post Content -->
                                <div class="post-content">
                                  <!--  <a href="#" class="post-cata">${val.category.name}</a> -->
                                    <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2">${val.title}</a>
                                    <div class="post-meta d-flex">
                                    <a href="#"><i class="" aria-hidden="true"></i><i class="fa-solid fa-clock mr-2"></i>` + day[2]+"-"+day[1]+"-"+day[0] + " " + time + `</a>
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
        let day = val.publish_date.split(" ")[0].split("-")
        let time = val.publish_date.split(" ")[1]
        let active = (key===0) ? "show active" : "";
        xhtml += `
<div class="col-12 col-lg-6 mb-2">
            <!-- Post Thumbnail -->
            <div class="post-thumbnail">
                <img src="${val.thumb}" alt="">

                
            </div>
        </div>
        <div class="col-12 col-lg-6">
            <!-- Post Content -->
            <div class="post-content mt-0">
               <!-- <a href="#" class="post-cata cata-sm cata-primary">${val.category.name}</a> -->
                <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2">${val.title}</a>
                <div class="post-meta d-flex align-items-center mb-2">
                <a href="#"><i class="" aria-hidden="true"></i><i class="fa-solid fa-clock mr-2"></i>` + day[2]+"-"+day[1]+"-"+day[0] + " " + time + `</a>
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
        let day = val.publish_date.split(" ")[0].split("-")
        let time = val.publish_date.split(" ")[1]
        let active = (key===0) ? "show active" : "";
        xhtml += `
<div class="single-feature-post video-post bg-img" style="background-image: url(${val.thumb});">
                                <!-- Play Button -->
                                <a href="${val.link}" class=""><i class="" aria-hidden="true"></i></a>

                                <!-- Post Content -->
                                <div class="post-content">
                                    <!-- <a href="#" class="post-cata">${val.category.name}</a> -->
                                    <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2">${val.title}</a>
                                    <div class="post-meta d-flex">
                                    <a href="#"><i class="" aria-hidden="true"></i><i class="fa-solid fa-clock mr-2"></i>` + day[2]+"-"+day[1]+"-"+day[0] + " " + time + `</a>
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
        let day = val.publish_date.split(" ")[0].split("-")
        let time = val.publish_date.split(" ")[1]
        let active = (key===0) ? "show active" : "";
        xhtml += `
<div class="col-12 col-lg-6 mb-2">
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
     <a href="#" class="mb-2"></a> 
    <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2">${val.title}</a>
    <div class="post-meta d-flex align-items-center mb-2">
    <a href="#"><i class="" aria-hidden="true"></i> <i class="fa-solid fa-clock mr-2"></i>` + day[2]+"-"+day[1]+"-"+day[0] + " " + time + `</a>
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
            let day = val.publish_date.split(" ")[0].split("-")
            let time = val.publish_date.split(" ")[1]

            
            // if  (key > 5) return false;
            xhtml += `<div class="post-thumbnail">
                        <img src="${val.thumb}" alt="">  
                    </div>

                    <!-- Post Content -->
                    <div class="post-content">
                        <a href="#" class="post-cata cata-sm cata-success">${val.category.name}</a>
                        <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2 text-white">${val.title}</a>
                        <div class="post-meta d-flex">
                        <p class="text-light mb-0"></p>
                        <a href="#"><i class="" aria-hidden="true"></i><i class="fa-solid fa-clock mr-2"></i> ` + day[2]+"-"+day[1]+"-"+day[0] +  `</a>

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
                            let day = val.publish_date.split(" ")[0].split("-")
            let time = val.publish_date.split(" ")[1]
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
                        <p class="text-light mb-0"></p>
                        <a href="#"><i class="" aria-hidden="true"></i><i class="fa-solid fa-clock mr-2"></i> ` + day[2]+"-"+day[1]+"-"+day[0] +  `</a>

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
        let day = val.publish_date.split(" ")[0].split("-")
            let time = val.publish_date.split(" ")[1]
           
           // if  (key > 5) return false;
           xhtml += ` <div class="post-thumbnail">
           <img src="${val.thumb}" alt="">

          
       </div>

       <!-- Post Content -->
       <div class="post-content">
           <a href="#" class="post-cata cata-sm cata-primary">${val.category.name}</a>
           <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2 text-white">${val.title}</a>
           <div class="post-meta d-flex">
           <p class="text-light mb-0"></p>
           <a href="#"><i class="" aria-hidden="true"></i><i class="fa-solid fa-clock mr-2"></i> ` + day[2]+"-"+day[1]+"-"+day[0] +  `</a>
           </div>
       </div>
   </div>

            </div>
                         </div>
        
                 </div>`;
                    });
                    elmAreaNewsNew2.html(xhtml);



        // xem nhieu nhat
        let elmFilmBestView     = $("#api-film-best-view");
        showBestView = () => {
            let items = getFilmBestView(5);
            let xhtm = "";
             $.each(items,  function (key, val) {
                xhtm+=  `
                    <a href="anime-watching.html?watching=${val.id}">
                        <div class="product__sidebar__view__item set-bg mix day years bg-image"
                        style="background-image: url('${val.thumbnail}');">
                                <div class="view"><i class="fa fa-eye"></i>`+val.viewCount.toLocaleString()+`</div>
                                <h5>${val.title}</h5>
                        </div>
                    </a>
                    `
            });
            elmFilmBestView.html(xhtm);
        }
                
            });


            // yeu thich va bo thich
showLoveNews = () =>{
    
        let data= (loadLove() == null) ? [] : loadLove()
        let xhtml = (data.length== 0 || data== null) ?'<p class= "ml-4" style="color: #db4437;">Danh sách yêu thích Trống</p>':"";
        $.each( data, function( key, val ) {

            
            let idNews = val.id;
                    statusHeart = `
                    <a href="javascript:void(0);" onClick="funcRemoveLove(${val.id},'newsLove');">
                         <span class="badge badge-danger font-weight-bold loveItems bg-white text-primary" data-type="news">
                             <i class="fa-solid fa-heart text-primary" style="margin-right: 4px;"></i>Bỏ Thích
                        </span>
                    </a>`
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
                        <div class="post-meta   ">
                        </div>
                        <p class="mb-2">${val.description}</p>
                        ${statusHeart}
                    </div>
                </div>
            </div>
        </div>`;
        });
        elmLoveNews.html(xhtml);
    

}


// videos giua trang
showvideo = () => {
    let xhtml = "";
    $.getJSON( API_PREFIX + "playlists?offset=0&sortBy=id&sort_dir=asc&type=course", function( data ) {
        $.each( data, function( key, val ) {
            let strJSONImg = val.thumbnail.replace(/"\"/g,"")
             let thumbnailJson = JSON.parse(strJSONImg);
             console.log(thumbnailJson)

              thumbLink = thumbnailJson.maxres.url
              console.log(thumbLink)
              console.log(val.id)
              if (key > 0) return false;
        xhtml += `<div class="single-feature-post video-post bg-img" style="background-image: url(${thumbLink});">
        <!-- Play Button -->
        <a href="/news/video-post.html?idplaylist=${val.id}" class="btn play-btn"><i class="fa fa-play" aria-hidden="true"></i></a>

        <!-- Post Content -->
        <div class="post-content">
            <a href="#" class="post-cata">Khóa Học</a>
            <a href="/news/video-post.html?idplaylist=${val.id}" class="post-title">${val.title}</a>
            <div class="post-meta d-flex">
                
            </div>
        </div>
        </div>
  `
        })
        elmNewsvideo.html(xhtml);
    }
    )

}

showvideosmall = () => {
    console.log("uuu")
    let xhtml = "";
    $.getJSON( API_PREFIX + "playlists?offset=5&limit=1&sortBy=id&sort_dir=asc&type=course", function( data ) {
        $.each( data, function( key, val ) {
            let strJSONImg = val.thumbnail.replace(/"\"/g,"")
             let thumbnailJson = JSON.parse(strJSONImg);
             console.log(thumbnailJson)

              thumbLink = thumbnailJson.maxres.url
              console.log(thumbLink)
              console.log(val.id)
              if (key > 0) return false;
        xhtml += `<div class="single-post-area mb-80">
        <!-- Post Thumbnail -->
        <div class="post-thumbnail">
            <img src="${thumbLink}" alt="">

           
        </div>

        <!-- Post Content -->
        <div class="post-content">
            <a href="#" class="post-cata cata-sm cata-danger">Khóa Hoc</a>
            <a href="/news/video-post.html?idplaylist=${val.id}" class="post-title">${val.title}</a>
            <div class="post-meta d-flex">
               
            </div>
        </div>
    </div>
</div>
</div>
</div>
`
})
elmNewsvideo_1.html(xhtml);
}
)

}

showvideosmallone = () => {
    console.log("uuu")
    let xhtml = "";
    $.getJSON( API_PREFIX + "playlists?offset=1&limit=1&sortBy=id&sort_dir=asc&type=course", function( data ) {
        $.each( data, function( key, val ) {
            let strJSONImg = val.thumbnail.replace(/"\"/g,"")
             let thumbnailJson = JSON.parse(strJSONImg);
             console.log(thumbnailJson)

              thumbLink = thumbnailJson.maxres.url
              console.log(thumbLink)
              console.log(val.id)
              if (key > 0) return false;
        xhtml += `<div class="single-post-area mb-80">
        <!-- Post Thumbnail -->
        <div class="post-thumbnail">
            <img src="${thumbLink}" alt="">

            
        </div>

        <!-- Post Content -->
        <div class="post-content">
            <a href="#" class="post-cata cata-sm cata-primary">Khóa Hoc</a>
            <a href="/news/video-post.html?idplaylist=${val.id}" class="post-title">${val.title}</a>
            <div class="post-meta d-flex">
                
            </div>
        </div>
    </div>
</div>
</div>
</div>
</div>
`
})
elmNewsvideo_2.html(xhtml);
}
)
}

// tim kiem

showSearchNews = () => {
    let paramSearch = $.urlParam('search')
    let xhtm ="";
    let searchValue = [];
    if ( paramSearch == 0 || paramSearch == null) {
            xhtm =`<p class="ml-4 text-light font-weight-light font-italic text-center">
             Nhập Từ Khóa Tìm Kiếm
                 </p>`;
                 elmNewsSearch.html(xhtm);
        return false;
    } else {
        let txt = paramSearch.replaceAll("+"," ")
        elmKeyWordShow.text(` ${txt}`)
        $("input#search-input").val(txt)
        let arrSearch = paramSearch.split("+")
        $.each(arrSearch, function (index, value) {
                    let string = value.toLowerCase()
                    
                    var newArr = $.getJSON( API_PREFIX + `articles/search?q=${string}&offset=0&limit=10&sort_by=id&sort_dir=desc`, function(data) {
                        console.log( "success" );
                        searchValue.push(...data)
                        // }
                      })
                        .done(function() {
                          console.log( "second success" );
                        })
                        .fail(function() {
                          console.log( "error" );
                        })
                        .always(function() {
                          console.log( "complete" );
                        });
                       
                      // Perform other work here ...
                       console.log(searchValue)
                      // Set another completion function for the request above
                      newArr.always(function(data) {
                        console.log( "second complete" );
                        
                        if (searchValue.length == 0 ) {
                            xhtm =`<p class="ml-4 text-light font-weight-light font-italic text-center">
                            Không có kết quả phù hợp!
                                 </p>`;
                                 elmNewsSearch.html(xhtm);
                         } else {
                         $.each(searchValue, function (index, val) {
                            let title= val.title.toLowerCase()
                            let description = val.description.toLowerCase()
                            console.log(title)
                            console.log(description)
                            console.log(string)

                            if (title.includes(" "+string+ " ") || description.includes(" "+string+ " ")){
                                    let day = val.publish_date.split(" ")[0].split("-")
                                    let title = val.title.replaceAll(/'/g, '').replaceAll(/"/g, '');
                                    let titleHightlight = highlight(val.title, string)
                                    let descriptionHightLight = highlight(val.description, string)
                                xhtm += ` <div class="single-post-area style-2">
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
                                                                
                                                                    <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2 text-white">`+ titleHightlight + `</a> 
                                                                    <div class="post-meta   ">
                                                                        <a href="#"><i class="" aria-hidden="true"></i><i class="fa-solid fa-clock mr-2"></i>` + day[2]+"-"+day[1]+"-"+day[0] + `</a>

                                                                    </div>
                                                                    <p class="mb-2">`+ descriptionHightLight+ `</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>`;
                                elmNewsSearch.html(xhtm);
                         }})}
                      });

         })

        

}}

function showVideos(idVideo) {
    console.log(idVideo)
   

    let idParam = $.urlParam('idplaylist');
    let htmlIframe= "";
    let htmlTitle = "";
    let xhtml="";
    if (idParam !== null) {
    $.getJSON( API_PREFIX + `playlists/${idParam}/videos?offset=0&sort_by=id&sort_dir=asc`, function( data ) {
        htmlIframe = data[0].iframe
        htmlTitle = `
            <h4>${data[0].title}</h4>`
        $.each(data, async function (index, val) {
           if ( idVideo === val.id){
                htmlIframe =  val.iframe
                htmlTitle =  `
                    <h4>${val.title}</h4>

                `  
                $('html, body').animate({
                    scrollTop: $(".vizew-breadcrumb").offset().top
                },1000);
            } 


    
            let strJSONImg = val.thumbnail.replace(/"\"/g,"")
            let thumbnailJson = JSON.parse(strJSONImg);
            thumbLink = thumbnailJson.high.url
            xhtml += `
            <div class="col-12 col-md-6">
            <div class="single-post-area mb-50">
                <!-- Post Thumbnail -->
                <div class="post-thumbnail">
                    <img src="${thumbLink}" alt="">

                    <!-- Video Duration -->
                    <span class="video-duration">05.03</span>
                </div>

                <!-- Post Content -->
                <div class="post-content">
                    <a href="javascript:void(0);" onClick="funcOpenVideo(${val.id});" class="post-title">${val.title}</a>
                    <div class="post-meta d-flex">
                        <!-- <a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 22</a>
                        <a href="#"><i class="fa fa-eye" aria-hidden="true"></i> 16</a>
                        <a href="#"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> 15</a> -->
                    </div>
                </div>
            </div>
        </div>
            `
            elfirstVideo.html(htmlIframe);
            elmTitleVideo.html(htmlTitle);
            elmlistVideo.html(xhtml)      
            
            
        })
    });
} ;
}

