/**
 * Counts the characters that have been captured in the input
 */
const countCharacters = (e) => {
  var textEnteredTxtA, currentTxtA, counterTxtA;
  var textEnteredIn, currentIn, counterIn;

  textEnteredTxtA = document.getElementById('textarea').value;
  textEnteredIn = document.getElementById('input').value;

  counterTxtA = textEnteredTxtA.length;
  counterIn = textEnteredIn.length;

  currentTxtA = document.getElementById('textarea-current');
  currentIn = document.getElementById('input-current');

  currentTxtA.textContent = counterTxtA;
  currentIn.textContent = counterIn;
}

export default countCharacters;
