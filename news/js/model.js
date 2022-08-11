loadStorage = () => {
    return JSON.parse(localStorage.getItem("ARTICLES_VIEWED")) ;
}

saveStorage = (items) => {
    localStorage.setItem("ARTICLES_VIEWED", JSON.stringify(items));
}

listItems = () => {
    let items = loadStorage() ;
    if(items === null) items = [];  // 
    return items;
}


deleteItem = (id) => {
  let items = listItems(); 
  items = items.filter(item => item.id !== id);
  saveStorage(items);
  return items;
}

addItem = (id, title, thumb, link) => {
    let taskNew = {id: id, title: title, thumb: thumb, link:link};
   
    let items = listItems();
    items.push(taskNew);

    // Lưu item vào storgare
    saveStorage(items);

    return items;
}

// xóa thêm yêu thích
loadLove = () => {
    return JSON.parse(localLove.getItem("ARTICLES_LOVED")) ;
}

saveLove = (items) => {
    localLove.setItem("ARTICLES_LOVED", JSON.stringify(items));
}

listItemsLove = () => {
    let items = loadLove() ;
    if(items === null) items = [];  // 
    return items;
}


deleteItemLove = (id) => {
  let items = listItemsLove(); 
  items = items.filter(item => item.id !== id);
  saveLove(items);
  return items;
}

addItemLove = (id, title, thumb, link) => {
    let taskNew = {id: id, title: title, thumb: thumb, link:link};
   
    let items = listItemsLove();
    items.push(taskNew);

    // Lưu item vào storgare
    saveLove(items);

    return items;
}


