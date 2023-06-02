import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
  databaseURL: "https://simple-endorsements-default-rtdb.firebaseio.com/"
}
const inputFieldEl = document.getElementById("message")
const sendBtnEl = document.getElementById("send-btn")
const endorsementListEl = document.getElementById("endorsement-list")

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsementList")

sendBtnEl.addEventListener("click", ()=>{
  let inputValue = inputFieldEl.value
  if (inputFieldEl.value) {
    clearinputFieldEl()
    // addEndorsementsToListEl(inputFieldValue)
    push(endorsementsInDB, inputValue)
  }
  
})

function clearListEl(){
  endorsementListEl.innerHTML = ""
}

function clearinputFieldEl(){
  inputFieldEl.value = ""
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

function appendToListEl(itemArr){
  let itemID = itemArr[0]
  let itemValue = itemArr[1]

  const newEl = document.createElement("li")
  newEl.textContent = itemValue

  endorsementListEl.append(newEl)
  // endorsementListEl.innerHTML += `<li>${itemValue}</li>`

  newEl.addEventListener("click", ()=>{
    let locationInDB = ref(database, `endorsementList/${itemID}`)
    remove(locationInDB)
  })

}