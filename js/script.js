const container = document.getElementById('container')
const income = document.getElementById('income')
const age = document.getElementById('age')
const quantity = document.getElementById('quantity')
const purpose = document.getElementById('purpose')
const pledge = document.getElementById('pledge')
const creditTerm = document.getElementById('creditTerm')
const amountOfCredits = document.getElementById('amountOfCredits')
const answer = document.getElementById('answer')

const button = document.getElementById('button')

button.addEventListener('click', ()=>{
  let answerPayout = payoutCoefficient(amountOfCredits.value, creditTerm.value, income.value)
  let answerQuantity = quantityCoefficient(quantity.value);
  let answerPurpose = purposeCoefficient(purpose.value);
  let answerPledge = pledgeCoefficient(pledge.value);
  let answerAge = ageCoefficient(age.value)
  let answerTotal = net.run({payout: answerPayout, quantity: answerQuantity, purpose: answerPurpose, pledge: answerPledge, age: answerAge});
  answer.textContent = answer.textContent + ` ${Math.round(answerTotal.yes * 100) / 100}`
  
  container.classList.add('hide')
  button.classList.add('hide')
  answer.classList.remove('hide')
})


const net = new brain.NeuralNetwork();

net.train([
  { input: { payout: 0.21, quantity: 0.2, purpose: 0, pledge: 0, age: 0 }, output: { yes: 1 } },
  { input: { payout: 0.12, quantity: 0, purpose: 0.25, pledge: 0, age: 0.3 }, output: { yes: 1 } },
  { input: { payout: 0.11, quantity: 0.2, purpose: 0.5, pledge: 0, age: 0 }, output: { yes: 1 } },
  { input: { payout: 0.21, quantity: 0, purpose: 0, pledge: 0, age: 0.6 }, output: { yes: 1 } },
  { input: { payout: 0.09, quantity: 0.4, purpose: 0.25, pledge: 0, age: 0.3 }, output: { yes: 1 } },
  { input: { payout: 0.25, quantity: 0, purpose: 0, pledge: 0, age: 0 }, output: { yes: 1 } },
  { input: { payout: 0.17, quantity: 0.2, purpose: 0.25, pledge: 0, age: 0.3 }, output: { yes: 1 } },
  { input: { payout: 1, quantity: 0.6, purpose: 1, pledge: 0, age: 0.3 }, output: { no: 1 } },
  { input: { payout: 0.67, quantity: 0.2, purpose: 0.75, pledge: 0, age: 0 }, output: { no: 1 } },
  { input: { payout: 0.42, quantity: 0.4, purpose: 0.5, pledge: 0, age: 0.3 }, output: { no: 1 } },
  { input: { payout: 1, quantity: 0.4, purpose: 1, pledge: 0, age: 0.3 }, output: { no: 1 } },
  { input: { payout: 0.42, quantity: 0.2, purpose: 0.25, pledge: 0, age: 0.3 }, output: { no: 1 } },
  { input: { payout: 0.03, quantity: 0.4, purpose: 1, pledge: 0, age: 0.6 }, output: { no: 1 } },
  { input: { payout: 0.42, quantity: 0.6, purpose: 0.75, pledge: 0, age: 0.3 }, output: { no: 1 } },
]);

const output = net.run({payout: 0.1, quantity: 2, purpose: 0, pledge: 0, age: 0});
console.log(output)

function payoutCoefficient(amountOfCredits, creditTerm, income) {
  let coefficient = (amountOfCredits / creditTerm) / income; //ко-эф платежеспособности
  if (coefficient >= 1) {
    coefficient = 1
  }
  if (coefficient <= 0) {
    coefficient = 0
  }
  coefficient = Math.round(coefficient * 100) / 100;
  return coefficient
}

function quantityCoefficient(quantity) { //ко-эф количества кредитов
  let coefficient = 0;
  if (quantity <= 0) { coefficient = 0 }; //0 кредитов
  if (quantity == 1) { coefficient = 0.2 }; //1 кредит
  if (quantity == 2) { coefficient = 0.4 }; //2 кредита
  if (quantity == 3) { coefficient = 0.6 }; //3 кредита
  if (quantity == 4) { coefficient = 0.8 }; //4 кредита
  if (quantity >= 5) { coefficient = 1 }; //5 и более кредитов
  return coefficient
}

function purposeCoefficient(purpose) { //ко-эф цели кредита
  let coefficient = 0;
  if (purpose == 'Образование') { coefficient = 0 }; //образование
  if (purpose == 'Недвижимость') { coefficient = 0.25 }; //недвижимость
  if (purpose == 'Бизнес') { coefficient = 0.50 }; //бизнес
  if (purpose == 'Авто') { coefficient = 0.75 }; //авто
  if (purpose == 'Потребительский кредит') { coefficient = 1 }; //потреб
  return coefficient
}

function pledgeCoefficient(pledge) { //ко-эф залога
  let coefficient = 0;
  if (pledge == 'Нет') { coefficient = 1 }; //Ничего
  if (pledge == 'Авто') { coefficient = 0.5 }; //Авто
  if (pledge == 'Недвижимость') { coefficient = 0 }; //Недвижимость
  return coefficient
}

function ageCoefficient(age) { //ко-эф возраста
  let coefficient = 0;
  if ((age > 18) && (age <= 20)) { coefficient = 1 }
  if ((age > 20) && (age <= 25)) { coefficient = 0.6 }
  if ((age > 25) && (age <= 30)) { coefficient = 0.3 }
  if ((age > 30) && (age <= 40)) { coefficient = 0 }
  if ((age > 40) && (age <= 50)) { coefficient = 0.3 }
  if ((age > 50) && (age <= 60)) { coefficient = 0.6 }
  if ((age > 60) && (age <= 100)) { coefficient = 1 }
  return coefficient
}

function gaveLoanCoefficient(gaveLoan) {
  let coefficient = 0;
  if (gaveLoan == '1') {
    return 'yes: 1'
  }
  if (gaveLoan == '0') {
    return 'no: 1'
  }
}