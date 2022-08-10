// Đổ dữ liệu ra category news
showCategoryInMenu = () => {
    
    $.getJSON( API_PREFIX + "categories_news", function( data ) {
        let xhtml = '';
        $.each( data, function( key, val ) {
            xhtml += `<li><a href="category.html?id=${val.id}">- ${val.name}</a></li>`;
        });
        elmAreaCategoryNews.html(xhtml);
    });
}

// Giá vàng
showGold = () => {
    $.getJSON( API_PREFIX + "get-gold", function( data ) {
        let xhtml = '';
        $.each( data, function( key, val ) {
            xhtml += `<div class="area-gold-item">
                    <p>${val.type}</p>
                    Mua: <span class="buy">${val.buy}.000đ</span>, Bán <span class="sell">${val.sell}.000đ</span>
                </div>`;
        }); 
        elmAreaGold.after(xhtml);
    });
}
    
// Giá coin
showCoin = () => {
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

// Đổ danh sách bài viết trong một category nào đó
showArticleInCategory = (categoryID) => {
    // let categoryID = $.urlParam('id'); 
    if(categoryID !== null) {
        // Đổ dữ liệu ra category news
        $.getJSON( API_PREFIX + `categories_news/${categoryID}/articles?offset=0&limit=10&sort_by=id&sort_dir=desc`, function( data ) {
            let xhtml = '';
            $.each( data, function( key, val ) {
                xhtml += `<div class="single-post-area style-2">
                            <div class="row align-items-center">
                                <div class="col-12 col-md-6">
                                    <!-- Post Thumbnail -->
                                    <div class="post-thumbnail">
                                        <img src="${val.thumb}" alt="${val.title}">
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <!-- Post Content -->
                                    <div class="post-content mt-0">
                                        <a href="${val.link}" target="_blank" onClick="funcViewArticle('${val.id}', '${val.title}', '${val.thumb}', '${val.link}')" class="post-title mb-2">${val.title}</a> 
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
            elmAreaListArticle.after(xhtml);
        });
    }
}

// Đổ danh sách bài viết mới nhất
showLatestArticle = (total) => {
    // Đổ dữ liệu ra category news

    $.getJSON( API_PREFIX + `articles?offset=0&limit=${total}&sort_by=id&sort_dir=desc`, function( data ) {
        let xhtml = '';
        $.each( data, function( key, val ) {
            xhtml += `<div class="col-12 col-md-4">
                        <div class="single-post-area mb-80">
                            <!-- Post Thumbnail -->
                            <div class="post-thumbnail">
                                <img src="${val.thumb}" alt="${val.title}" style="max-height: 210px"> 
                            </div>

                            <!-- Post Content --> 
                            <div class="post-content">
                                <a href="category.html?id=${val.category.id}" class="post-cata cata-sm cata-success">${val.category.name}</a>
                                <a href="${val.link}" class="post-title">${val.title}</a>
                                <div class="post-meta d-flex">
                                    <a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> ${val.publish_date}</a>
                                    <a href="#"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> 15</a>
                                </div>
                            </div>
                        </div>
                    </div>`;
        });
        elmAreaLatestArticle.html(xhtml);
    });

}

// Đổ danh sách category và bài viết của category ngoài trang chủ
showCategoryDetail = () => {
   
    $.each( arrCategoryInHome, function( key, value ) {
        let xhtml = '';
        $.getJSON( API_PREFIX + `categories_news/${value}/articles?offset=0&limit=4&sort_by=id&sort_dir=desc`, function( data ) { 
            xhtml = `<div class="section-heading style-2">
                        <h4>${data[0].category.name}</h4>
                        <div class="line"></div>
                    </div>`;
            $.each( data, function( key, val ) {
                xhtml += `<!-- Single Post Area -->
                        <div class="single-post-area mb-30">
                            <div class="row align-items-center">
                                <div class="col-12 col-lg-6">
                                    <!-- Post Thumbnail -->
                                    <div class="post-thumbnail">
                                        <img src="${val.thumb}" alt="${val.name}">
                                        <span class="video-duration">05.03</span>
                                    </div>
                                </div>
                                <div class="col-12 col-lg-6">
                                    <!-- Post Content -->
                                    <div class="post-content mt-0">
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
            elmAreaLeftContent.after(xhtml);
        });
        
    });
}


// Đổ danh sách bài viết đã xem
showArticleViewed = (data) => {
    // Đổ dữ liệu ra category news
    elmAreaArticleViewed.nextAll('div').remove();
    
    let xhtml = '';
    $.each( data, function( key, val ) {
        xhtml += `<!-- Single Blog Post -->
        <div class="single-blog-post d-flex">
            <div class="post-thumbnail">
                <img src="${val.thumb}" alt="${val.title}"> 
            </div>
            <div class="post-content">
                <a href="${val.link}" class="post-title" style="display: inline;">${val.title}</a>
                <a href="javascript:void(0)" onClick="funcDeleteArticleViewed('${val.id}')" class="post-cata cata-sm cata-success">Xoá</a>
            </div>
        </div>`; 
    });
    elmAreaArticleViewed.after(xhtml);

}