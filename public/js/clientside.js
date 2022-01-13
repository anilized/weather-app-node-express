const weatherForm = document.querySelector('form')

const searchElement = document.querySelector('input')

const messageOne = document.querySelector('#messageOne');

const messageTwo = document.querySelector('#messageTwo');



const fetchData = (url) => {
  fetch(url).then((response) => {
  response.json().then((data) => {
    if (!data.error) {
      messageOne.textContent = data.forecast;
      messageTwo.textContent = data.location;
    } else {
      messageOne.textContent = data.error;
      messageTwo.textContent = '';
    }
  });
});
}


weatherForm.addEventListener('submit',(e) => {
  e.preventDefault();
  const location = searchElement.value;
  const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(location);
  fetchData(url);
  console.log(location);
})
