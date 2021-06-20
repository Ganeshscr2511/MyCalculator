const calcWindow=document.createElement('div');
calcWindow.setAttribute('class','calculator-grid');
document.body.appendChild(calcWindow);


// Calculator display
const calcBox=document.createElement('div');
calcBox.setAttribute('class','output');
calcWindow.appendChild(calcBox);

const input1=document.createElement('div');
input1.setAttribute('class','previous-operand');
input1.setAttribute('data-previous-operand','');


const input2=document.createElement('div');
input2.setAttribute('class','current-operand');
input2.setAttribute('data-current-operand','');
calcBox.append(input1, input2);


// operation button
const buttonClr=document.createElement('button');
buttonClr.setAttribute('class','span-two');
buttonClr.setAttribute('data-all-clear','');
buttonClr.innerText="AC";
const buttonDel=document.createElement('button');
buttonDel.setAttribute('class','btn');
buttonClr.setAttribute('data-delete','');
buttonDel.innerText="DEL";


// number buttons
const button9=document.createElement('button');
button9.setAttribute('class','btn');
button9.setAttribute('data-number','');
button9.innerText=" 9 ";
const button8=document.createElement('button');
button8.setAttribute('class','btn');
button8.setAttribute('data-number','');
button8.innerText=" 8 ";
const button7=document.createElement('button');
button7.setAttribute('class','btn');
button7.setAttribute('data-number','');
button7.innerText=" 7 ";
const button6=document.createElement('button');
button6.setAttribute('class','btn');
button6.setAttribute('data-number','');
button6.innerText=" 6 ";
const button5=document.createElement('button');
button5.setAttribute('class','btn');
button5.setAttribute('data-number','');
button5.innerText=" 5 ";
const button4=document.createElement('button');
button4.setAttribute('class','btn');
button4.setAttribute('data-number','');
button4.innerText=" 4 ";
const button3=document.createElement('button');
button3.setAttribute('class','btn');
button3.setAttribute('data-number','');
button3.innerText=" 3 ";
const button2=document.createElement('button');
button2.setAttribute('class','btn');
button2.setAttribute('data-number','');
button2.innerText=" 2 ";
const button1=document.createElement('button');
button1.setAttribute('class','btn');
button1.setAttribute('data-number','');
button1.innerText=" 1 ";
const button0=document.createElement('button');
button0.setAttribute('class','btn');
button0.setAttribute('data-number','');
button0.innerText=" 0 ";
const buttonDot=document.createElement('button');
buttonDot.setAttribute('class','dotBtn');
buttonDot.setAttribute('data-number','');
buttonDot.innerText=".";

// mathematical operation buttons
const buttonDivision=document.createElement('button');
buttonDivision.setAttribute('class','btn');
buttonDivision.setAttribute('data-operation','')
buttonDivision.innerText="/";

const buttonMulti=document.createElement('button');
buttonMulti.setAttribute('class','btn');
buttonMulti.setAttribute('data-operation','');
buttonMulti.innerText="*";

const buttonSub=document.createElement('button');
buttonSub.setAttribute('class','btn');
buttonSub.setAttribute('data-operation','');
buttonSub.innerText=" - ";

const buttonAdd=document.createElement('button');
buttonAdd.setAttribute('class','btn');
buttonAdd.setAttribute('data-operation','');
buttonAdd.innerText="+";

const buttonSubmit=document.createElement('button');
buttonSubmit.setAttribute('class','span-two');
buttonSubmit.setAttribute('data-equals','');
buttonSubmit.innerText="=";

// appending all elements

calcWindow.append(buttonClr,buttonDel,buttonDivision,button1,button2,button3,buttonMulti,button4,button5,button6,buttonSub,button7,button8,button9,buttonAdd,buttonDot,button0,buttonSubmit);




class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})