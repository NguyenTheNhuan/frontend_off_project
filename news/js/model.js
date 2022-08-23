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

function preg_quote (str, delimiter) {
    //  discuss at: https://locutus.io/php/preg_quote/
    // original by: booeyOH
    // improved by: Ates Goral (https://magnetiq.com)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //   example 1: preg_quote("$40")
    //   returns 1: '\\$40'
    //   example 2: preg_quote("*RRRING* Hello?")
    //   returns 2: '\\*RRRING\\* Hello\\?'
    //   example 3: preg_quote("\\.+*?[^]$(){}=!<>|:")
    //   returns 3: '\\\\\\.\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:'
   
    return (str + '')
      .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&')
  }
  
function highlight(str, search) {
    return str.replace(new RegExp("(" + preg_quote(search) + ")", 'gi'), '<span class="bg-warning p-1">$1</span>');
}