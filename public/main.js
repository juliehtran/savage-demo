
const thumbDown = document.getElementsByClassName(`js-thumbs-down`);

// makes all of the thumbDown buttons clickable
Array.from(thumbDown).forEach((element) => {
  element.addEventListener(`click`, onThumbDown);
});

function onThumbDown(clickEvent) {
  changeThumbValue(clickEvent, -1)
}

// ------------------------------------------------------------------------------------------------------------
const thumbUp = document.getElementsByClassName(`js-thumbs-up`);

// makes all of the thumbUp buttons clickable
Array.from(thumbUp).forEach((element) => {
  element.addEventListener(`click`, onThumbUp);
});

function onThumbUp(clickEvent) {
  changeThumbValue(clickEvent, 1)
}

// ------------------------------------------------------------------------------------------------------------
const trash = document.getElementsByClassName(`js-trash`);

Array.from(trash).forEach((element) => {
  element.addEventListener(`click`, onTrashClicked)
});

function onTrashClicked(event) {
  const name = event.target.parentNode.parentNode.childNodes[1].innerText
  const msg = event.target.parentNode.parentNode.childNodes[3].innerText
  fetch(`messages`, {
    method: `DELETE`,
    headers: {
      'Content-Type': `application/json`
    },
    body: JSON.stringify({
      name: name,
      msg: msg
    })
  }).then((response) => response.json()).then((response) => {
    window.location.reload()
    console.log(response)
  })
}

// utility functions
function changeThumbValue(clickEvent, newThumbValue) {
  // get the clicked element
  const clickedElement = clickEvent.target

  // get the message associated with the clicked element (closest message)
  const message = clickedElement.closest(`.message`)

  // get the message info from inside the message div
  const name = message.querySelector(`.name`).innerText
  const msg = message.querySelector(`.msg`).innerText
  const thumbUp = parseInt(message.querySelector(`.thumbUp`).innerText)

  // we hit the /messages endpoint of our own server
  fetch(`messages`, {
    // we are performing an update
    method: `PUT`,
    // our content will be JSON, or a javascript object
    headers: { 'Content-Type': `application/json` },
    // we send the information from the DOM
    body: JSON.stringify({
      name: name,
      msg: msg,
      thumbUp: thumbUp + newThumbValue
    })
  }).then(response => {
    if (response.ok) return response.json()
  }).then(data => {
    console.log(data)
    window.location.reload()
  })
}