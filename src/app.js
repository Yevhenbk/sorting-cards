import "bootstrap";
import "./style.css";
const ICONS = ["♥", "♠", "♦", "♣"];
const COLORS = ["black", "red"];
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const CARD_LIST = document.querySelector("#cardList");
const CARD_LIST_ORDERED = document.querySelector("#cardListOrdered");
const INPUT = document.querySelector("#cardInput");
const SORT_BUTTON_BUBBLE = document.querySelector("#bubbleSort");
const SORT_BUTTON_SELECT = document.querySelector("#selectSort");
const GENERATE_BUTTON = document.querySelector("#Draw");

let cardList = [];
let cardListBubble = [];

window.onload = function() {
  generateNewCards();
  sortCardsBubble();
  sortCardsSelect();
};

function generateNewCards() {
  let numberOfCards = "";
  GENERATE_BUTTON.addEventListener("click", event => {
    numberOfCards = INPUT.value;
    CARD_LIST.innerHTML = "";
    CARD_LIST_ORDERED.innerHTML = "";
    cardList = [];
    let row = document.createElement("div");
    for (let index = 0; index < numberOfCards; index++) {
      let cardTemp = getCard();
      cardList.push(cardTemp);
      drawCard(cardTemp, CARD_LIST, row);
    }
    console.log(cardList);
  });
}

function randomElement(myArray) {
  return myArray[Math.floor(Math.random() * myArray.length)];
}

function getCard() {
  let cardAux = {
    symbol: "",
    number: ""
  };
  cardAux.symbol = randomElement(ICONS);
  cardAux.number = randomElement(NUMBERS);

  return cardAux;
}

function drawCard(myObject, place, row) {
  let topBox = document.createElement("div");
  let centerBox = document.createElement("div");
  let bottomBox = document.createElement("div");
  let card = document.createElement("div");

  topBox.id = "topBox";
  topBox.classList.add("topBox");
  topBox.innerHTML = myObject.symbol;

  centerBox.id = "centerBox";
  centerBox.classList.add("centerBox");
  if (
    myObject.number != 1 &&
    myObject.number != 11 &&
    myObject.number != 12 &&
    myObject.number != 13 &&
    myObject.number != 14
  ) {
    centerBox.innerHTML = myObject.number;
  }
  if (myObject.number == 1) {
    centerBox.innerHTML = "A";
  }
  if (myObject.number == 11) {
    centerBox.innerHTML = "J";
  }
  if (myObject.number == 12) {
    centerBox.innerHTML = "Q";
  }
  if (myObject.number == 13) {
    centerBox.innerHTML = "K";
  }

  bottomBox.id = "bottomBox";
  bottomBox.classList.add("bottomBox");
  bottomBox.innerHTML = myObject.symbol;
  bottomBox.style.color = myObject.color;
  if (bottomBox.innerHTML == "♥" || bottomBox.innerHTML == "♦") {
    topBox.style.color = "red";
    bottomBox.style.color = "red";
  }
  if (myObject.number == 14) {
    topBox.innerHTML = "";
    bottomBox.innerHTML = "";
  }
  card.id = "card";
  card.appendChild(topBox);
  card.appendChild(centerBox);
  card.appendChild(bottomBox);
  row.classList.add("row");
  row.appendChild(card);
  place.appendChild(row);
}

function drawRowOfCards(myArray, index) {
  let row = document.createElement("div");
  row.innerHTML = index;
  for (let index = 0; index < cardList.length; index++) {
    drawCard(myArray[index], CARD_LIST_ORDERED, row);
  }
}

function sortCardsBubble() {
  SORT_BUTTON_BUBBLE.addEventListener("click", event => {
    CARD_LIST_ORDERED.innerHTML = "";
    CARD_LIST_ORDERED.innerHTML = "<p>Bubble Sort:</p>";
    bubbleSort(cardList);
  });
}

function sortCardsSelect() {
  SORT_BUTTON_SELECT.addEventListener("click", event => {
    CARD_LIST_ORDERED.innerHTML = "";
    CARD_LIST_ORDERED.innerHTML = "<p>Select Sort:</p>";
    selectSort(cardList);
  });
}

function bubbleSort(arr) {
  let wall = arr.length - 1;
  let contador = 0;
  while (wall > 0) {
    let index = 0;
    while (index < wall) {
      if (arr[index].number > arr[index + 1].number) {
        let aux = arr[index];
        arr[index] = arr[index + 1];
        arr[index + 1] = aux;
        drawRowOfCards(cardList, contador);
        contador++;
      }

      index++;
    }
    wall--;
  }
  console.log(arr);
  return arr;
}

function selectSort(arr) {
  let min = 0;
  let contador = 0;
  while (min < arr.length - 1) {
    for (let i = min + 1; i < arr.length; i++) {
      if (arr[min].number > arr[i].number) {
        let aux = arr[min];
        arr[min] = arr[i];
        arr[i] = aux;
        drawRowOfCards(cardList, contador);
        contador++;
      }
    }
    min++;
  }
  return arr;
}
