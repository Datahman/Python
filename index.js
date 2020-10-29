// Import stylesheets
import './style.css';

const url = `hcsp://product-list?name=test 2&items=2136393/3,2136423/F,431364/F,365828,272196,272197/4/F`
const box = document.getElementById('app');

const parseUrl = (url) => {
    const parser = new DOMParser;
    const dom = parser.parseFromString('<!doctype html><body>' + decodeURI(url), 'text/html');
    url = dom.body.textContent;
    
    const listObj = {
      name: null,
      items: []
    };

    const itemsString = url.split(/(?:\?)|(?:\?items=)/)[ 1 ];
    if (itemsString) {
      const itemsPart = itemsString.split(',').splice(1);
      const items = itemsPart.map(item => {
        item = item.split('/');
        const itemObj = {
          key: item[ 0 ],
          quantity: item[ 1 ] * 1 || 1,
          agreement: item[ 2 ]
        };
        Object.keys(itemObj).forEach(key => !itemObj[ key ] ? delete itemObj[ key ] : '');
        return itemObj;
      });
      listObj.items = items;
    }

    if ( /name=/.test(url) ) {
      listObj.name = url.match(/name=?(.*)&/)[1];
    }
    return listObj;
  }

const parsed = parseUrl(url);
console.log('----------------')
console.log(parsed)
box.innerHTML = parsed.name;
console.log('----------------')
parsed.items.forEach(item => {
console.log(item);
})
