import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref , push , onValue , remove } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

const firebaseConfig = {

    databaseURL: //database url
}
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const refFromDB = ref( database , "leads")


const inputel = document.getElementById("input-el")
const inputbtn = document.getElementById("input-btn")
const listel = document.getElementById("listel")
const delbtn = document.getElementById("del-btn")

    
onValue(refFromDB , function(snapshot) {
    if(snapshot.exists()){
    const snapVal = snapshot.val()
    const leads = Object.values(snapVal)
    showLeads(leads)
    }
})

inputbtn.addEventListener("click",function(){
              push(refFromDB , inputel.value)
        inputel.value=""
        
        
})

function showLeads(leads){
    let list=""
    for(let i=0;i<leads.length;i++){
        list += `
            <li>
               
               <button id="del-btn"><a target='_blank' href='${leads[i]}'>
               ${leads[i]}
               </a></button>
           </li>    
       `
    }
    listel.innerHTML=list    
}

delbtn.addEventListener("dblclick",function(){
    

remove(refFromDB)
listel.innerHTML=""

})
