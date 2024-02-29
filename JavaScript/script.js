// Elements del Dom
const labelWelcome = document.querySelector('.welcome')
const labelDate = document.querySelector('.date')
const labelBalance = document.querySelector('.balance__value')
const labelSumIn = document.querySelector('.summary__value--in')
const labelSumOut = document.querySelector('.summary__value--out')
const labelSumInterest = document.querySelector('.summary__value--interest')
const labelTimer = document.querySelector('.timer')

const containerApp = document.querySelector('.app')
const containerMovements = document.querySelector('.movements')

const btnLogin = document.querySelector('.login__btn')
const btnTransfer = document.querySelector('.form__btn--transfer')
const btnLoan = document.querySelector('.form__btn--loan')
const btnClose = document.querySelector('.form__btn--close')
const btnSort = document.querySelector('.btn--sort')

const inputLoginUsername = document.querySelector('.login__input--user')
const inputLoginPin = document.querySelector('.login__input--pin')
const inputTransferTo = document.querySelector('.form__input--to')
const inputTransferAmount = document.querySelector('.form__input--amount')
const inputLoanAmount = document.querySelector('.form__input--loan-amount')
const inputCloseUsername = document.querySelector('.form__input--user')
const inputClosePin = document.querySelector('.form__input--pin')

//trayendo los datos del api

const SERVER_URL = 'http://localhost:3000'
const Login_URL = `${SERVER_URL}/login?`

btnLogin.addEventListener('click', async function procesarDatos(e) {
  //1.no llamar al aservidor
  e.preventDefault()
  //2.buscar cuenta del usuario  y ver si existe
  const username = inputLoginUsername.value
  const pin = inputLoginPin.value
  const URL_ALL = `${Login_URL}username=${username}&pin=${pin}`
 const loginData = await  fetch(URL_ALL)
    .then((response) => {
      return response.json() // no olvidar el return si hay llaves en la función
    })
    .then((data) => data)

const { account, token, message } = loginData
 console.log(loginData)
  //4.validar que accounts no este vacio
  if (!message) {
    console.log('Login correcto')
    //5.si existe, mostrar la app y el mensaje de bienvenida
    containerApp.style.opacity = 100
    labelWelcome.textContent = `Bienvenido, ${account.owner}`
    labelWelcome.style.opacity = 100
  } else {

 console.log('Login incorrecto')
  }
  //4.limpiar los inputs
  inputLoginUsername.value = inputLoginPin.value = ''
  inputLoginPin.blur() //quita el focus
})
