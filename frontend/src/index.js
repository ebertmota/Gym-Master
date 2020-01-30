
console.log('script loaded')

const submitBtn = document.getElementById('submit-btn');
const searchInput = document.getElementById('search');

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  let str = searchInput.value;
  if (window.find) //funcao de encontrar
      {
       strFound = self.find(str);
   
       if (!strFound)
        {
         strFound = self.find(str, 0, 1)
         while (self.find(str, 0, 1)) continue
        }
      }
})