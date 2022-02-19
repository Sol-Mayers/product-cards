//Переменные
const cardsContaner = document.querySelector('.cards-contaner');
let start = document.querySelector('.start');
let cards = [];
let pages = [];
const changeSort = document.getElementById('change-sort');
const paginBox = document.getElementById('pagination-container');

//Основная функция - получение данных с сервера и сортировка
const getProducts = async() => {
  const obj = await fetch('https://www.lenvendo.ru/api/js-test-task/');
  const result = await obj.json();
  showProducts(result.products);
  let totalPages = Math.ceil(result.total_count / result.products.length);
  showPagination(totalPages);
  changeSort.onchange = function() {
    //Сортировка по ценам
    if(this.value === 'price-up') {
      clearHtml();
      cards.sort((prev, next) => prev.crPrice - next.crPrice);
      renderHtml();
    };
    if(this.value === 'price-down') {
      clearHtml();
      cards.sort((prev, next) => next.crPrice - prev.crPrice);
      renderHtml();
    };
    //Сортировка по наименованиям
    if(this.value === 'name-up') {
      clearHtml();
      cards.sort(function(prev, next) {
        let x = prev.crName.toLowerCase();
        let y = next.crName.toLowerCase();
        if(x < y) {
          return -1;
        }
        if(x > y) {
          return 1;
        }
        return 0;
      });
      renderHtml();
    };
    if(this.value === 'name-down') {
      clearHtml();
      cards.sort(function(prev, next) {
        let x = prev.crName.toLowerCase();
        let y = next.crName.toLowerCase();
        if(x < y) {
          return 1;
        }
        if(x > y) {
          return -1;
        }
        return 0;
      });
      renderHtml();
    };
  };
}
getProducts();

//Первичное отображение товаров
function showProducts(items) {
  items.forEach(item => {
    if (cards.length <= 9) {
      cards.push({
        crName: item.name,
        crImage: item.image,
        crPrice: item.price
      });
    }
  });
  for(let c = 0; c <= cards.length - 1; c++) {
    cardsContaner.innerHTML += `
    <div class="container__card">
      <div class="card__title">${cards[c].crName}</div>
      <img class="card__image" width="100" src="${cards[c].crImage}" />
      <div class="card__price">${'Цена: ' + cards[c].crPrice + ' руб.'}</div>
    </div>`;
  }
};

//Отрисовка Html
let renderHtml = function() {
    for(let c = 0; c <= cards.length - 1; c++) {
      cardsContaner.innerHTML += `
    <div class="container__card">
      <div class="card__title">${cards[c].crName}</div>
      <img class="card__image" width="100" src="${cards[c].crImage}" />
      <div class="card__price">${'Цена: ' + cards[c].crPrice + ' руб.'}</div>
    </div>`;
    }
  }

//Очистка товаров
let clearHtml = function() {
    for(let c = 0; c <= cards.length - 1; c++) {
      cardsContaner.innerHTML = "";
    }
}
//Очистка страниц
let clearHtmlPages = function() {
    for(let c = 0; c <= pages.length - 1; c++) {
      paginBox.innerHTML = "";
    }
}

//Поиск товаров
let filter = function() {
  let search = document.getElementById('search');
  search.addEventListener('keyup', function() {
    let filter = search.value.toLowerCase(),
      filterItems = document.querySelectorAll('.container__card');
    filterItems.forEach(item => {
      if(item.innerHTML.toLowerCase().indexOf(filter) > -1) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    })
  })
};
filter();

//Отображение номеров страниц
function showPagination(items) {
  for (let i = 1; i <= items; i++) {
    pages.push(i);
  }
  for (let p = 0; p < pages.length - 1; p++) {
    paginBox.innerHTML += `
      <button class="usual-button">${pages[p]}</button>`;
  }
  let allButtons = document.querySelectorAll('.usual-button');
  for(let button = 0; button <= allButtons.length - 1; button++) {
    allButtons[button].addEventListener('click', function() {
      let changeNow = allButtons[button].textContent;
      clearHtml();
      clearHtmlPages();
      cards.splice(0);
      pages.splice(0);
      const getNextPage = async() => {
        const obj = await fetch('https://www.lenvendo.ru/api/js-test-task/?page=' + changeNow);
        const result = await obj.json();
        showProducts(result.products);
        let totalPages = Math.ceil(result.total_count / result.products.length);
        showPagination(totalPages);
        changeSort.onchange = function() {
          //Сортировка по ценам
          if(this.value === 'price-up') {
            clearHtml();
            cards.sort((prev, next) => prev.crPrice - next.crPrice);
            renderHtml();
          };
          if(this.value === 'price-down') {
            clearHtml();
            cards.sort((prev, next) => next.crPrice - prev.crPrice);
            renderHtml();
          };
          //Сортировка по наименованиям
          if(this.value === 'name-up') {
            clearHtml();
            cards.sort(function(prev, next) {
              let x = prev.crName.toLowerCase();
              let y = next.crName.toLowerCase();
              if(x < y) {
                return -1;
              }
              if(x > y) {
                return 1;
              }
              return 0;
            });
            renderHtml();
          };
          if(this.value === 'name-down') {
            clearHtml();
            cards.sort(function(prev, next) {
              let x = prev.crName.toLowerCase();
              let y = next.crName.toLowerCase();
              if(x < y) {
                return 1;
              }
              if(x > y) {
                return -1;
              }
              return 0;
            });
            renderHtml();
          };
        };
      }
getNextPage();


    });
  }
}


/*function showProducts(items) {
  items.forEach(item => {
    cards.push({
      crName: item.name,
      crImage: item.image,
      crPrice: item.price
    });
  });
  for(let c = 0; c <= cards.length - 1; c++) {
    cardsContaner.innerHTML += `
    <div class="container__card">
      <div class="card__title">${cards[c].crName}</div>
      <img class="card__image" width="100" src="${cards[c].crImage}" />
      <div class="card__price">${'Цена: ' + cards[c].crPrice + ' руб.'}</div>
    </div>`;
  }
};
*/
