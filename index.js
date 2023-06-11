import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


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
    endorsementListEl.innerHTML = `<span>No endorsements here yet...</span>`
  }
 
})

let counter = 0

function appendToListEl(messageArr){
  let messageID = messageArr[0]
  let messageValue = messageArr[1][0]
  let messageSender = messageArr[1][1]
  let messageReceiver = messageArr[1][2]


  const listEl = document.createElement("div")

  const likeIcon = document.createElement("i")
  likeIcon.classList.add("fa-heart", "fa-regular", "fa-sharp")

  let listItem = 
  `    
    <span id="receiver">To ${messageReceiver}</span><br><br>

    <span id="">${messageValue} <br><br></span> 

    <div id="sender-row">
      <span id="sender">From ${messageSender}</span>
      
      <div id="likes">
        
        <span id="like-count"></span>
      </div>
      
    </div>
  `
  listEl.innerHTML = listItem
  endorsementListEl.append(listEl)

  let likeCount = listEl.querySelector("#like-count")
 
  function increaseLikeCount(){
    if (!counter) {
      likeCount.innerHTML = ""
    } else {
      likeCount.innerHTML = counter
    }
    // likeCount.textContent = counter
    // update(endorsementsInDB/messageID, counter)
  }

  const likesContainer = listEl.querySelector("#likes");
  likesContainer.insertBefore(likeIcon, likesContainer.firstChild);
  
  likeIcon.addEventListener("click", ()=>{
    if (likeIcon.classList.contains("fa-regular")) {
      counter += 1
      increaseLikeCount()      
      likeIcon.classList.remove("fa-regular")
      likeIcon.classList.add("fa-solid")
      
    } else {
      counter -= 1
      increaseLikeCount()
      likeIcon.classList.remove("fa-solid")
      likeIcon.classList.add("fa-regular")
    }

    // likeIcon.classList.toggle("fa-solid")
  })

  // -------------------------------------------
  // ----------FOR DELETING AN ENDORSEMENT------
  // -------------------------------------------
  // listEl.addEventListener("click", ()=>{
  //   let locationInDB = ref(database, `endorsementList/${messageID}`)
  //   remove(locationInDB)
  // })

}