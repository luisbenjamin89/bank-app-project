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

const SERVER_URL = 'http://localhost:3000/login?'


btnLogin.addEventListener('click', async function procesarDatos(e) {
  //1.no llamar al aservidor
  e.preventDefault()
  //2.buscar cuenta del usuario  y ver si existe
  const username = inputLoginUsername.value
  const pin = inputLoginPin.value
  const URL_ALL = `${SERVER_URL}username=${username}&pin=${pin}`
  const loginData = await fetch(URL_ALL)
    .then((response) => {
      return response.json()
    })
    .then((data) => data)

  const { account, token, message } = loginData

  //4.validar que accounts no este vacio
  if (!message) {
    console.log('Login correcto')
    //5.si existe, mostrar la app y el mensaje de bienvenida
    containerApp.style.opacity = 100
    labelWelcome.textContent = `Bienvenido, ${account.owner}`
    labelWelcome.style.opacity = 100
  } else {
    containerMovements.innerHTML = ''
    /*    const html = `
      <div role="alert" class="alert alert-warning">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  <span>Warning:Usuario o contraseña invalidos!</span>
</div>
    `
    containerMovements.insertAdjacentHTML('afterbegin', html)  */
    console.log('loggin inconrrecto')
  }
  //4.limpiar los inputs
  const { movements } = account

  updateUI(movements)
  inputLoginUsername.value = inputLoginPin.value = ''
  inputLoginPin.blur() //quita el focus
})

function updateUI(movements) {
  displayMovements(movements)
   displayBalance(movements)
  displaySummary(movements)
}

function displayMovements(movements) {
  containerMovements.innerHTML = ''
  movements.forEach(function (mon, i) {
    const type = mon.amount > 0 ? 'deposit' : 'withdrawal'
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mon.amount}€</div>
        <div class="movements__date"> ${mon.date}</div>
      </div>
    `
    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}

 const displayBalance = function (movements) {
   const balance = movements.reduce((acc, mon) => {
     return acc + mon.amount
   }, 0)
   labelBalance.textContent = `${balance.toFixed(2)}€`
 }

 