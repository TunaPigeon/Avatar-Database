
'use strict'


// used fetch to grab multiple apis

const getCharacters = () => {
  document.getElementById("cardExpanded").innerText = ""

  fetch('https://api.sampleapis.com/avatar/characters', {
    method: 'GET',

    headers: {
      'Content-Type': 'application/json',
    },


  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      getData(json)        // sends this data to function

    })
    .catch((error) => {
      console.error(error)
    })

}
const getQuiz = () => {
  document.getElementById("cardExpanded").innerText = ""

  fetch('https://api.sampleapis.com/avatar/questions', {
    method: 'GET',

    headers: {
      'Content-Type': 'application/json',

    },
  })

    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      getQuizData(json)  // sends this data to function
    })
    .catch((error) => {
      console.error(error + 'ph no')
    })

}

const getHome = () => {
  document.getElementById("cardExpanded").innerText = ""

  fetch('https://api.sampleapis.com/avatar/info', {
    method: 'GET',

    headers: {
      'Content-Type': 'application/json',

    },
  })

    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      getHomeData(json)  // sends this data to function
    })
    .catch((error) => {
      console.error(error + 'ph no')
    })

}

const getQuizData = (json) => {
  document.getElementById("headings").innerHTML = "Quiz"    // edits the div
  document.getElementById("data").innerHTML = ""    // edits the div
  setTimeout(function () {
    for (let i = 0; i < json.length; i++) {
      addQuiz(json[i])  // loops and grabs data and sends to function
    }
  }, 0)
}

const getData = (json) => {


  document.getElementById("headings").innerHTML = "Characters"   // edits the div
  document.getElementById("data").innerHTML = ""   // edits the div
  setTimeout(function () {
    for (let i = 0; i < json.length; i++) {

      addCharacters(json[i]) // loops and grabs data and sends to function
    }
  }, 0)
}

const getHomeData = (json) => {

  document.getElementById("headings").innerHTML = "Home"   // edits the div

  document.getElementById("data").innerHTML = ""   // edits the div
  setTimeout(function () {
    for (let i = 0; i < json.length; i++) {

      addHome(json[i]) // loops and grabs data and sends to function

    }
  }, 0)
}


// puts data and fills in template
function addCharacters(items) {
  const template = document
    .getElementById('character-template')
    .content.cloneNode(true)
  const cardImg = template.querySelector('.card-img-top')
  const cardId = template.querySelector('.card-id')
  const cardTitle = template.querySelector('.card-title')


  cardImg.src = items.image
  console.log(cardImg.src)
  cardId.innerText = ""
  cardTitle.innerText = items.name
  // cards will be able to be clicked on to expand and output a bigger version of the card clicked
  cardImg.addEventListener('click', function () {
    if (document.getElementById("cardExpanded").innerText == "") {

      const template = document.getElementById('character-template-expanded').content.cloneNode(true)
      const cardImg = template.querySelector('.card-img-top')
      const cardId = template.querySelector('.card-id')
      const cardTitle = template.querySelector('.card-title')
      const cardText = template.querySelector('.card-text')
      const cardPrice = template.querySelector('.card-price')
      const cardAges = template.querySelector('.card-ages')
      const cardVoice = template.querySelector('.card-voice')
      cardImg.src = items.image
      cardId.innerText = ""
      cardTitle.innerText = items.name
      cardText.innerText = "Ethnicity: " + items.bio.ethnicity;

      cardPrice.innerText = "Nationality: " + items.bio.nationality

      cardAges.innerText = "Ages: " + items.bio.ages
      cardVoice.innerText = "Voiced by: " + items.chronologicalInformation.voicedBy
      document.querySelector('#cardExpanded').appendChild(template)

      console.log("show")
      document.getElementById("cardExpanded").addEventListener('click', function () {
        document.getElementById("cardExpanded").innerText = ""


      })

    }

    else {
      document.getElementById("cardExpanded").innerText = ""
      console.log("no show")
    }

  })
  document.querySelector('#data').appendChild(template)

}


// puts data and fills in template
function addQuiz(items) {
  const template = document
    .getElementById('quiz-template')
    .content.cloneNode(true)

  const cardId = template.querySelector('.card-id')
  const cardTitle = template.querySelector('.card-title')
  const cardText = template.querySelector('.card-text')
  const cardPrice = template.querySelector('.card-price')

  cardId.innerText = "Question " + items.id
  cardTitle.innerText = items.question
  cardText.innerText = items.possibleAnsers
  cardPrice.innerText = items.correctAnswer

  // flip the card with a click
  const card = template.querySelector('.card-inner');
  card.addEventListener('click', function () {
    card.classList.toggle('is-flipped')
    console.log("WORKS CLICKS")
  })
  document.querySelector('#data').appendChild(template)
}

// puts data and fills in template
function addHome(items) {
  const template = document
    .getElementById('info-template')
    .content.cloneNode(true)

  const cardId = template.querySelector('.card-id')
  const cardTitle = template.querySelector('.card-title')
  const cardText = template.querySelector('.card-text')
  const cardPrice = template.querySelector('.card-price')
  const cardCreator = template.querySelector('.creators')


  cardId.innerText = "Synopsis"
  cardTitle.innerText = items.synopsis
  cardText.innerText = items.yearsAired
  cardPrice.innerText = items.genres

  var x = "Created by ";

  //  used this to print out the creators and remove the "and" at the end with splice
  for (let i in items.creators) {
    console.log(items.creators[i].name)
    x += items.creators[i].name + " and ";
  }

  x = x.slice(0, -4);
  cardCreator.innerText = x
  console.log(x);

  document.querySelector('#data').appendChild(template)
  console.log(items)
}



//  grabs id of button and changes html based on button clicked
const buttonThemes = (data) => {

  console.log(data)
  if (data == "water") {
    document.body.style.backgroundImage = "url(images/water.jpg)"
    document.getElementById("headings").style.color = "rgb(193, 246, 255)";
    document.getElementById("mainHeading").style.color = "rgb(193, 246, 255)";

    const buttonsColor = document.getElementsByClassName("btn-dark");
    for (let i = 0; i < buttonsColor.length; i++) {
      buttonsColor[i].style.color = "rgb(193, 246, 255)";
    }
  }
  else if (data == "earth") {
    document.body.style.background = "url(images/earth.jpg)"
    document.getElementById("headings").style.color = "rgb(199, 198, 194)";
    document.getElementById("mainHeading").style.color = "rgb(199, 198, 194)";

    const buttonsColor = document.getElementsByClassName("btn-dark");
    for (let i = 0; i < buttonsColor.length; i++) {
      buttonsColor[i].style.color = "rgb(199, 198, 194)";
    }
  }
  else if (data == "fire") {
    document.body.style.background = "url(images/fire.jpg)"
    document.getElementById("headings").style.color = "orange";
    document.getElementById("mainHeading").style.color = "orange";

    const buttonsColor = document.getElementsByClassName("btn-dark");
    for (let i = 0; i < buttonsColor.length; i++) {
      buttonsColor[i].style.color = "orange";
    }
  }
  else if (data == "air") {
    document.body.style.background = "url(images/air.jpg)"
    document.getElementById("headings").style.color = "rgb(108, 214, 249)";
    document.getElementById("mainHeading").style.color = "rgb(108, 214, 249)";

    const buttonsColor = document.getElementsByClassName("btn-dark");
    for (let i = 0; i < buttonsColor.length; i++) {
      buttonsColor[i].style.color = "rgb(108, 214, 249)";
    }
  }
  else if (data == "default") {
    document.body.style.background = "grey"
    document.getElementById("headings").style.color = "white";
    document.getElementById("mainHeading").style.color = "white";

    const buttonsColor = document.getElementsByClassName("btn-dark");
    for (let i = 0; i < buttonsColor.length; i++) {
      buttonsColor[i].style.color = "white";
    }

  }


}
// run at the start
getHome();