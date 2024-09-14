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
   const $card = document.createElement('div')
   $card.classList.add('card')

   $card.innerHTML = `
		<div class="card__inner">
					<div class="card__head">
						<div class="card__head-left">
							<div class="card__icon"></div>
							<div class="card__head-left-title">
								<h3 class="card__title"></h3>
								<span class="card__desc"></span>
							</div>
						</div>
						<div class="card__head-right card-param">
							<svg class="card-param-icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="573.699px" height="573.699px"
								viewBox="0 0 573.699 573.699" style="enable-background:new 0 0 573.699 573.699;"
								xml:space="preserve">
								<g>
									<g>
										<path d="M344.25,401.699V57.4c0-32.5-24.9-57.4-57.4-57.4c-32.5,0-57.4,26.8-57.4,57.4v344.2c-23,17.201-38.2,45.9-38.2,76.5
																				c0,53.5,42.1,95.6,95.6,95.6c53.5,0,95.599-42.1,95.599-95.6C382.449,447.5,367.15,418.9,344.25,401.699z M286.85,554.699
																				c-42.1,0-76.5-34.398-76.5-76.5c0-28.699,15.3-53.5,38.2-66.898V57.4c0-21,17.2-38.2,38.2-38.2s38.199,17.2,38.199,38.2v353.799
																				c23,13.4,38.201,38.201,38.201,66.9C363.35,520.199,328.949,554.699,286.85,554.699z" />
										<path d="M305.949,424.6c0-1.9,0-1.9,0-3.799v-95.602c0-11.5-7.6-19.1-19.099-19.1c-11.5,0-19.1,7.6-19.1,19.1v95.602
																				c0,1.898,0,1.898,0,3.799c-23,7.701-38.2,28.701-38.2,53.5c0,32.5,24.9,57.4,57.4,57.4c32.499,0,57.399-24.9,57.399-57.4
																				C344.25,453.301,328.949,432.301,305.949,424.6z" />
									</g>
								</g>
							</svg>
							<span class="card-param-text">
								<span class="card-param-value card-param-value_temp"></span>
								<sup>o</sup>C
							</span>
						</div>
					</div>

					<!-- Футер -->
					<div class="card__footer">
						<div class="card__footer-left">
							<div class="card__footer-left card-param">
								<svg class="card-param-icon card-param-icon_footer" version="1.1" id="Capa_1"
									xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
									viewBox="0 0 309.118 309.118" style="enable-background:new 0 0 309.118 309.118;"
									xml:space="preserve">
									<g>
										<path d="M211.044,170.163c-0.983,0-1.947-0.019-2.918-0.064L6.44,170.163c-3.554,0-6.427-2.873-6.427-6.427
																				c0-3.548,2.873-6.427,6.427-6.427l201.97-0.058c1.06,0.039,1.844,0.058,2.641,0.058c30.258,0,54.872-24.615,54.872-54.872
																				c0-30.251-24.615-54.866-54.872-54.866c-30.251,0-54.866,24.615-54.866,54.866c0,7.442,1.465,14.653,4.338,21.427
																				c1.395,3.271-0.135,7.044-3.393,8.432c-3.271,1.401-7.05-0.135-8.432-3.393c-3.56-8.374-5.366-17.275-5.366-26.459
																				c0-37.34,30.38-67.72,67.72-67.72s67.726,30.386,67.726,67.72C278.77,139.784,248.384,170.163,211.044,170.163z M309.118,227.806
																				c0-25.694-20.9-46.595-46.595-46.595c-0.675,0-1.343,0.013-1.735,0.039L6.433,181.211l0,0c-3.548,0-6.427,2.873-6.427,6.427
																				c0,3.548,2.879,6.427,6.427,6.427l254.631,0.032l1.459-0.032c18.606,0,33.741,15.135,33.741,33.741s-15.135,33.741-33.741,33.741
																				c-18.606,0-33.741-15.135-33.741-33.741c0-4.582,0.9-9.01,2.667-13.175c1.395-3.265-0.135-7.044-3.393-8.432
																				c-3.265-1.401-7.037,0.122-8.432,3.393c-2.455,5.758-3.695,11.89-3.695,18.207c0,25.694,20.9,46.595,46.595,46.595
																				C288.218,274.394,309.118,253.5,309.118,227.806z M6.433,145.06l75.329-0.026l1.472,0.026c20.547,0,37.269-16.723,37.269-37.269
																				s-16.723-37.269-37.269-37.269c-20.553,0-37.276,16.723-37.276,37.269c0,5.051,0.99,9.955,2.956,14.57
																				c1.388,3.265,5.174,4.769,8.432,3.393c3.265-1.395,4.788-5.167,3.393-8.432c-1.279-3.014-1.928-6.215-1.928-9.531
																				c0-13.464,10.951-24.416,24.422-24.416c13.464,0,24.416,10.951,24.416,24.416s-10.951,24.416-24.416,24.416l-1.33-0.026
																				l-75.477,0.026c-3.548,0-6.427,2.879-6.427,6.427C0.006,142.187,2.886,145.06,6.433,145.06L6.433,145.06z M103.909,213.615
																				c0-3.554-2.873-6.427-6.427-6.427H6.433c-3.548,0-6.427,2.873-6.427,6.427s2.879,6.427,6.427,6.427h91.049
																				C101.036,220.042,103.909,217.169,103.909,213.615z" />
									</g>
								</svg>
								<span class="card-param-text_footer">
									<span class="card-param-value card-param-value_wind">
									</span>м/с
								</span>
							</div>
						</div>
						<div class="card__footer-right card-param">
							<img class="card-param-icon_footer" src="./img/humidity_icon_216429.png" alt="Humidity">
							<span class="card-param-text_footer">
								<span class="card-param-value card-param-value_humidity"></span>%
							</span>
						</div>
					</div>
				</div>
	`

   return {
      $card,
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
      newCard.$desc.textContent = data.weather[0].description
      newCard.$temp.textContent = data.main.temp
      newCard.$wind.textContent = data.wind.speed
      newCard.$humidity.textContent = data.main.humidity

      console.log(data)

      setTimeout(function () {
         document
            .querySelector('.app__container')
            .classList.add('app__container_top')

         if (currentCard !== null) {
            // currentCard.$card.classList.remove('full')
            currentCard.$card.classList.add('glass')
         }

         currentCard = newCard

         newCard.$card.classList.remove('loading')
         newCard.$card.classList.add('full')
      }, 600)
   }, 30)
})
