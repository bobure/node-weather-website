const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')
const message4 = document.querySelector('#message-4')
const message5 = document.querySelector('#message-5')
const message6 = document.querySelector('#message-6')
const message7 = document.querySelector('#message-7')
const message8 = document.querySelector('#message-8')
const message9 = document.querySelector('#message-9')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = encodeURIComponent(search.value)
    
    message1.textContent = ''
    message2.textContent = ''
    message3.textContent = '' 
    message4.textContent = ''
    message5.textContent = ''
    message6.textContent = '' 
    message7.textContent = ''
    message8.textContent = ''
    message9.textContent = ''

    fetch('/weather?location=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast.dailySummary
                message3.textContent = 'temperature: ' + data.forecast.temperature 
                message4.textContent = ' precipProbability: ' + data.forecast.precipProbability
                message5.textContent = ' precipType: ' + data.forecast.precipType
                message6.textContent = ' temperature: ' + data.forecast.temperature
                message7.textContent = ' temperatureHigh: ' + data.forecast.temperatureHigh
                message8.textContent = ' temperatureLow: ' + data.forecast.temperatureLow
                message9.textContent = ' visibility: ' + data.forecast.visibility

            }
        })
    })
})