import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
  databaseURL: "https://simple-endorsements-default-rtdb.firebaseio.com/"
}
const messageEl = document.getElementById("message")
const senderEl = document.getElementById("from")
const receiverEl = document.getElementById("to")
const sendBtnEl = document.getElementById("send-btn")
const endorsementListEl = document.getElementById("endorsement-list")

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsementList")

sendBtnEl.addEventListener("click", ()=>{
  let messageValue = messageEl.value
  let senderValue = senderEl.value
  let receiverValue = receiverEl.value
  if (messageEl.value) {
    clearmessageEl()
    // addEndorsementsToListEl(messageValue)
    push(endorsementsInDB, [messageValue, senderValue, receiverValue])
  }
  
})

function clearListEl(){
  endorsementListEl.innerHTML = ""
}

function clearmessageEl(){
  messageEl.value = ""
  senderEl.value = ""
  receiverEl.value = ""
}

onValue(endorsementsInDB, (snapshot)=>{
  if (snapshot.exists()){
    let endorsementArr = Object.entries(snapshot.val())
    clearListEl()

    for (let x in endorsementArr){
      let currentItem = endorsementArr[x]

      appendToListEl(currentItem)
    }
  } else {
    endorsementListEl.innerHTML = `<p>No endorsements here yet...</p>`
  }
 
})

function appendToListEl(messageArr){
  let messageID = messageArr[0]
  let messageValue = messageArr[1][0]
  let messageSender = messageArr[1][1]
  let messageReceiver = messageArr[1][2]

  // const newEl = document.createElement("li")
  // newEl.textContent = `${messageValue} <br>      from <strong>${messageSender}</strong>`

  // endorsementListEl.append(newEl)

  endorsementListEl.innerHTML += 
    `
      <li>
        to <strong>${messageReceiver}</strong> 
        <br><br>
        ${messageValue} <br><br> 
        from <strong>${messageSender}</strong>
      </li>
    `

  newEl.addEventListener("click", ()=>{
    let locationInDB = ref(database, `endorsementList/${itemID}`)
    remove(locationInDB)
  })

}