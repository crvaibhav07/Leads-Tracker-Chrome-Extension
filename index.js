let myLeads = []

const saveEl = document.getElementById("save-el")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteEl = document.getElementById("delete-el")
const saveTabEl = document.getElementById("saveTab-el")

//getting myLeads stringified array from local storage and converting it into array
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    renderLeads(myLeads)
}

// const tabs = [
//     {url:"www.google.com"}
// ]

saveTabEl.addEventListener("click", function(){

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    myLeads.push((tabs[0].url))
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads(myLeads)
    })

})

function renderLeads(leads){
    let leadList = ""
    
        for(let i=0; i<leads.length; i++)
        {
            // ulEl.innerHTML += "<li>"+myLeads[i]+"</li>"  for direct DOM manipulation of ul
            // leadList += "<li><a>"+myLeads[i]+"</a></li>" 
            leadList+= `<li>
            <a href="${leads[i]}" target="_blank"> ${leads[i]} </a>
            </li>`
            console.log(leadList)
        }
        ulEl.innerHTML = leadList
    }

    deleteEl.addEventListener("click", function(){
        localStorage.clear();
        myLeads = []
        // ulEl.innerHTML = ""     //also works
        renderLeads(myLeads)
    })

saveEl.addEventListener("click", function(){
    
    myLeads.push(inputEl.value)
    inputEl.value = ""
    //converting array to string and storing it in local storage
    localStorage.setItem("myLeads",JSON.stringify(myLeads)) 
    renderLeads(myLeads)
    
})



