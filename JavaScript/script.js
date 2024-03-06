// Elements del Dom
const labelWelcome = document.querySelector('.welcome')
const labelcuenta = document.querySelector('.cuenta')
const labelerror = document.querySelector('.alert-error')
const labelID = document.querySelector('.ID')
const labeladdres=document.querySelector('.addres')
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

  const { account, token:tokenunit ,message } = loginData
localStorage.setItem('clave', tokenunit)
 
 
  //4.validar que accounts no este vacio
  if (!message) {
  
    //5.si existe, mostrar la app y el mensaje de bienvenida
    containerApp.style.opacity = 100
    labelWelcome.textContent = `Bienvenido, ${account.owner}`
    labelcuenta.textContent= `Numero de cuenta: ${account.numberAccount}`
    labeladdres.textContent = `Direccion: ${account.address} `
    labelID.textContent = `ID: ${account.nationalIdNumber}`
    labelWelcome.style.opacity = 100
    labelcuenta.style.opacity = 100
    labeladdres.style.opacity = 100
    labelID.style.opacity = 100
    labelerror.style.opacity = 0
  } else {
labelerror.style.opacity = 100
  }
  //4.limpiar los inputs
  const { movements } = account

  updateUI(movements)
 
  inputLoginUsername.style.opacity = 0
  inputLoginPin.style.opacity = 0
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
   const  fechaActual = new Date()
   labelDate.textContent = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`
 }

  const displaySummary = function (movements) {
    const sumIn = movements
      .filter((mon) => mon.amount > 0)
      .reduce((acc, mon) => acc + mon.amount, 0)
    labelSumIn.textContent = `${sumIn.toFixed(2)}€`

    const sumOut = movements
      .filter((mon) => mon.amount < 0)
      .reduce((acc, mon) => acc + mon.amount, 0)
    labelSumOut.textContent = `${Math.abs(sumOut).toFixed(2)}€`
  }



  // Example POST method implementation:

  
btnLoan.addEventListener( 'click', async function postData(e){
 e.preventDefault()
  let token = localStorage.getItem('clave')
  const url = `http://localhost:4000/movements?token=${token}`
  const data = {
   amount: inputLoanAmount.value, date: new Date().toISOString() ,
  }
  const response = await fetch(url, {
    method: 'POST', // GET por defecto
    body: JSON.stringify(data), // body data type must match "Content-Type" header
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => {
    console.log(data) // JSON data parsed by `data.json()` call
  })
})
