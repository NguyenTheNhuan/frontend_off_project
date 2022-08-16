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
    return JSON.parse(localStorage.getItem("newsLove")) ;
}

saveLove = (loves) => {
    localStorage.setItem("newsLove", JSON.stringify(loves));
}

listItemss = () => {
    let loves = loadLove() ;
    if(loves === null) loves = [];  // 
    return loves;
}


deleteItemLove = (id) => {
  let loves = loadLove(); 
  loves = loves.filter(item => item.id !== id);
  saveLove(loves);
  showItemss();
  return loves;
}

addItemLove = (id, title, thumb, link, description, category, local ) => {
    let taskNew = {id, title, thumb, link, description, category, local };
   
    let loves = listItemss();
    loves.push(taskNew);

    // Lưu item vào storgare
    saveLove(loves);
    showItemss();
    return loves;
}


