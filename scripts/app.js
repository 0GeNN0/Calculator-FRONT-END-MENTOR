const numbers = document.querySelectorAll('.num');
const equal = document.querySelector('#equal');
const delButton = document.querySelector('#del');
const resetButton = document.querySelector('#reset');
const renderEl = document.querySelector('#render');
const themeOne = document.querySelector('#one');
const themeTwo = document.querySelector('#two');
const themeThree = document.querySelector('#three');
const toggleBtn = document.querySelector('.toggle--li');
let numberToCalc = [];
let sum = '';
let answer = 0;

// Adding Value to the numbers so I can use it when button clicked in the sum
numbers.forEach((number) => {
  if (number.hasAttribute('id')) return;

  number.textContent !== 'x' ? number.setAttribute('value', `${number.textContent}`) : number.setAttribute('value', '*');

  if (!number.hasAttribute('value')) return;

  number.addEventListener('click', (e) => {
    if (numberToCalc.indexOf(Infinity) > -1) {
      numberToCalc.pop();
      numberToCalc.push(e.target.value);
      sum = numberToCalc.join('');
      renderEl.textContent = sum;
    } else {
      numberToCalc.push(e.target.value);
      sum = numberToCalc.join('');
      renderEl.textContent = sum;
    }
  });
});

// Display the answer to the user and handling some errors if there is no input or invalid sum
equal.addEventListener('click', (e) => {
  if (sum === '') {
    renderEl.textContent = 'No Inputs!';
  } else {
    try {
      answer = eval(`${sum}`);
      numberToCalc = [answer];
      renderEl.textContent = answer;
    } catch (e) {
      numberToCalc = [];
      renderEl.textContent = 'Syntax Error';
    }
  }

});

// Removing the last input that user add
delButton.addEventListener('click', e => {
  numberToCalc.pop();
  sum = numberToCalc.join('');

  if (!sum) {
    renderEl.textContent = 0;
  } else {
    renderEl.textContent = sum;
  }
});

// Reset everything to 0
resetButton.addEventListener('click', e => {
  numberToCalc = [];
  sum = '';
  answer = 0;
  renderEl.textContent = answer;
});

// Render Themes

const getTheme = sessionStorage.getItem('Themes');

const manageThemes = (theme = '') => {
  sessionStorage.setItem('Themes', theme);
  const storedTheme = sessionStorage.getItem('Themes');
  if (storedTheme === 'theme-2') {
    toggleBtn.style.left = '27px';
    document.body.classList.remove('theme-3');
    document.body.classList.add(storedTheme);
  } else if (storedTheme === 'theme-3') {
    toggleBtn.style.left = '50px';
    document.body.classList.remove('theme-2');
    document.body.classList.add(storedTheme);
  } else {
    toggleBtn.style.left = '5px';
    document.body.classList.remove('theme-2', 'theme-3');
  }
};

manageThemes(getTheme);

themeOne.addEventListener('click', e => {
  manageThemes();
});

themeTwo.addEventListener('click', e => {
  manageThemes('theme-2');
});

themeThree.addEventListener('click', e => {
  manageThemes('theme-3');
});