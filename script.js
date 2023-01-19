const typingText = document.querySelector(".typing-text p"),
  inputField = document.querySelector(".wrapper .input-field"),
  mistakeTag = document.querySelector(".mistake span"),
  timeTag = document.querySelector(".time span b"),
  wpmTag = document.querySelector(".wpm span"),
  cpmTag = document.querySelector(".cpm span"),
  tryAgain = document.querySelector("button");

let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = (mistakes = isTyping = 0);

const randomParagraph = () => {
  //getting random nuumber and it will always less than the paragraph length
  let randIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  //getting random item from the paragraphs array, splitting all characters
  //of it adding each character inside span and then adding this span inside p tag

  paragraphs[randIndex].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  //focusing input field on keydown or click event

  document.addEventListener("keydown", () => inputField.focus());
  typingText.addEventListener("click", () => inputField.focus());
};

randomParagraph();

const initTyping = () => {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inputField.value.split("")[charIndex];
  //typed char less than total characters and timer is 0
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer - setInterval(initTimer, 1000);
      isTyping = true;
    }

    //if user hasn't entered any character or pressed backspace
    if (typedChar == null) {
      charIndex--;
      if (characters[charIndex].classList.contains("incorrect")) {
        mistakes--;
      }
      characters[charIndex].classList.remove("correct", "incorrect");
    } else {
      if (characters[charIndex].innerText === typedChar) {
        //if user typed character and shown character matched then add the
        //correct class else increment the mistakes add the incorrect class
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
        //characters[charIndex].classList.add("active");
      }

      charIndex++;
    }
    characters.forEach((span) => span.classList.remove("active"));
    characters[charIndex].classList.add("active");
    console.log(typedChar);
    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );

    //if wpm value is 0 , empty or ,infinity then setting its's calue to 0
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = wpm;
    //cpm will not count mistakes
    cpmTag.innerText = charIndex - mistakes;
  } else {
    inputField.value = "";
    clearInterval(timer);
  }
};

//Timer function
const initTimer = () => {
  //if timeLeft is greater than 0 the decrement the time
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
};

//when try again Button is pressed
const resetGame = () => {
  //calling load paragraph
  //resetting each varaibles and elements value to default
  randomParagraph();
  inputField.value = "";
  clearInterval(timer);
  (timeLeft = maxTime), (charIndex = mistakes = isTyping = 0);
  timeTag.innerText = timeLeft;
  mistakeTag.innerText = mistakes;
  wpmTag.innerText = 0;
  cpmTag.innerText = 0;
};

inputField.addEventListener("input", initTyping);
tryAgain.addEventListener("click", resetGame);
