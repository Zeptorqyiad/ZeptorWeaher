const APIKEY = '99b2e1dbf424a2da06a5a952a40f53d1'

const $cardsBox = document.getElementById('cards-box')
const $locationForm = document.getElementById('location-form')
const $locationInput = document.getElementById('location-form-input')
let currentCard = null

async function getWeatherData(location) {
   const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}&units=metric`
   )

   const data = await response.json()

   return data
}

function getNewCard() {
   const card = document.createElement('div')
   card.classList.add('card')

   // Card Inner
   let cardInner = document.createElement('div')
   cardInner.classList.add('card__inner')
   // Card Head
   let cardHead = document.createElement('div')
   cardHead.classList.add('card__head')
   // cardHeadLeft
   let cardHeadLeft = document.createElement('div')
   cardHeadLeft.classList.add('card__head-left')
   // cardIcon
   let cardIcon = document.createElement('div')
   cardIcon.classList.add('card__icon')
   let cardHeadLeftTitle = document.createElement('div')
   cardHeadLeftTitle.classList.add('card__head-left-title')
   // cardHeadRight
   let cardHeadRight = document.createElement('div')
   cardHeadRight.classList.add('card__head-right card-param')
   // card

   cardHeadLeft.prepend(cardIcon)
   cardHead.append(cardHeadLeft, cardHeadRight)
   cardInner.append(cardHead)
   card.append(cardInner)

   return {
      card,
      $icon: $card.querySelector('.card__icon'),
      $title: $card.querySelector('.card__title'),
      $temp: $card.querySelector('card-param-value_temp'),
      $desc: $card.querySelector('card__desc'),
      $wind: $card.querySelector('card-param-value_wind'),
      $humidity: $card.querySelector('card-param-value_humidity'),
   }
}

$locationForm.addEventListener('submit', function (event) {
   event.preventDefault()

   const newCard = getNewCard()

   const location = $locationInput.value.trim()
   $locationInput.value = ''

   $cardsBox.prepend(newCard.$card)

   setTimeout(async function () {
      newCard.$card.classList.add('loading')

      const data = await getWeatherData(location)

      newCard.$icon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`

      newCard.$title.textContent = data.name
      // newCard.$desc.textContent = data.weather[0].description
      // newCard.$temp.textContent = data.main.temp
      // newCard.$wind.textContent = data.wind.speed
      // newCard.$humidity.textContent = data.main.humidity

      console.log(data)

      setTimeout(function () {
         document
            .querySelector('.app__container')
            .classList.add('app__container_top')

         if (currentCard !== null) {
            currentCard.$card.classList.add('glass')
         }

         document.body.style.backgroundImage = `url(img/bg/${data.weather[0].icon}.jpg)`

         currentCard = newCard

         newCard.$card.classList.remove('loading')
         newCard.$card.classList.add('full')
      }, 800)
   }, 30)
})
