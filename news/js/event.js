// Đổ danh sách bài viết đã xem
showArticleViewed = (data) => {
    console.log("téttt")
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

           
        </div>

        <!-- Post Content -->
        <div class="post-content">
        <a href="javascript:void(0)" onClick="funcDeleteArticleViewed('${val.id}')" class="post-cata cata-sm cata-success">Xoá</a>
            <a href="single-post.html" class="post-title text-white">'${val.title}'</a>
            <div class="post-meta d-flex">
               
                
        </div>
    </div>`; 
    });
    
    elmAreaArticleViewed.html(xhtml);
}

// ko cần
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
// cop
funcViewArticle = (id, title, thumb, link ) => {
    let items       = [];
    console.log(link)
    items = addItem(id, title, thumb, link);
    showArticleViewed(items);
}
// cop
funcDeleteArticleViewed= (id) => {
    let text = "DELETE!\nBạn chắc chắn muốn xoá bài viết này";
    if (confirm(text) == true) {
        let items = deleteItem(id);
        showArticleViewed(items);
    } 
}


funcLove = (id, title, thumb, link, description, category, local ) => {
    addItemLove(id, title, thumb, link,description, category, local);
    showItemss();
    // showItemsCategory();
    // showArticleNew();
    // showArticleLove();
   // Load lại danh sách
}
funcRemoveLove = (id, local) => {
    let items = listItemss();
    items = $.grep(items, function(e){ 
        return e.id != id; 
   });
   saveLove(items);
   showItemss();
   showLoveNews();
//    showItemsCategory();
//    showArticleNew();
//    showArticleLove();
//    showItemsCategory();
}

funcOpenVideo = (idVideo) =>{
    showVideos(idVideo)

}