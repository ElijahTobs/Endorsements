import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
  databaseURL: "https://simple-endorsements-default-rtdb.firebaseio.com/"
}
const messageEl = document.getElementById("message")
const sendBtnEl = document.getElementById("send-btn")
const endorsementListEl = document.getElementById("endorsement-list")

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

sendBtnEl.addEventListener("click", ()=>{
  let messageValue = messageEl.value
  endorsementListEl.innerHTML += `<li>${messageValue}</li>`
})
