// Đổ danh sách bài viết đã xem
showArticleViewed = (data) => {
   
    // Đổ dữ liệu ra category news
    let elmAreaArticleViewed = $("#zvn-viewed")
    let xhtml = '';
    $.each( data, function( key, val ) {
        xhtml += `
  
    <!-- Single Blog Post -->
    <div class="single-post-area mb-30">
        <!-- Post Thumbnail -->
        <div class="post-thumbnail">
            <img src="${val.thumb}" alt="">

            <!-- Video Duration -->
            <span class="video-duration">05.03</span>
        </div>

        <!-- Post Content -->
        <div class="post-content">
        <a href="javascript:void(0)" onClick="funcDeleteArticleViewed('${val.id}')" class="post-cata cata-sm cata-success">Xoá</a>
            <a href="single-post.html" class="post-title text-white">'${val.title}'</a>
            <div class="post-meta d-flex">
                <a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 14</a>
                <a href="#"><i class="fa fa-eye" aria-hidden="true"></i> 38</a>
                <a href="#"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> 22</a>
                <a href="#"><i class="fas fa-heart" aria-hidden="true"></i>Yêu thích</a>
            </div>
        </div>
    </div>`; 
    });
    
    elmAreaArticleViewed.html(xhtml);
}


funcDeleteArticleViewed= (id) => {
    let text = "DELETE!\nBạn chắc chắn muốn xoá bài viết này";
    if (confirm(text) == true) {
        let items = deleteItem(id);
        showArticleViewed(items);
    } 
}


funcSubmitForm = () => {
    let valueName   = elemInputName.value;
    let valueLevel  = elemInputLevel.value;
    let valueID     = elemInputID.value;
    let items       = [];
    
    if(valueID == ""){ // add
        items = addItem(valueName, valueLevel);
    }else{ // edit
        items = editItem(valueID, valueName, valueLevel);
    }

    // Load lại danh sách
    showItems(items);

   
}

funcViewArticle = (id, title, thumb, link ) => {
    let items       = [];
    console.log(link)
    items = addItem(id, title, thumb, link);
    showArticleViewed(items);
}

funcDeleteArticleViewed= (id) => {
    let text = "DELETE!\nBạn chắc chắn muốn xoá bài viết này";
    if (confirm(text) == true) {
        let items = deleteItem(id);
        showArticleViewed(items);
    } 
}