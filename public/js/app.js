const weatherFrom = document.querySelector('form');
const search = document.querySelector('input');
const paragraphOne = document.querySelector('#message-1');
const paragraphTwo = document.querySelector('#message-2');

weatherFrom.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
    console.log(location);
    paragraphOne.textContent = 'Loading...';
    paragraphTwo.textContent = '';
    fetch(`http://localhost:3000/weather?address=${encodeURIComponent(location)}`)
    .then(response => response.json())
    .then((data) => {
        if(data.error) {
            console.log('Error: ',data.error);
            paragraphOne.textContent = data.error;
        } else {
            console.log('Location: ',data.location);
            console.log('Forecast: ',data.forecast);
            paragraphOne.textContent = data.location;
            paragraphTwo.textContent = data.forecast;
        }
    });
})