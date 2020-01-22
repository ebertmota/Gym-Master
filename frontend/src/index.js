
console.log('script loaded')


const searchForm = document.getElementById('search-form');
const searchInput = document.getElementsByName('searchInput');
searchForm.onsubmit = (event) => {
  event.preventDefault();
  console.log(searchInput.value)
}


