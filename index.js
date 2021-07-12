// parent element to store cards
const taskContainer=document.querySelector(".task__container");

//Global store
let globalStore=[];
const generateNewCard = (taskData) =>
`<div class="col-md-6 col-lg-4">
 <div class="card shadow-sm task__card">
    <div class="card-header d-flex justify-content-end gap-2">
      <button type="button" class="btn btn-outline-success" onclick="editCard()">
        <i class="fas fa-pencil-alt" onclick="editCard()"></i>
      </button>
      <button type="button" id=${taskData.id} class="btn btn-outline-danger" onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i></button>
    </div>
    <img src=${taskData.imageUrl}  class="card-img-top" alt="..."/>
    <div class="card-body">
      <h5 class="card-title" id="title">${taskData.taskTitle}</h5>
      <p class="card-text" id="description">${taskData.taskDescription}</p>
      <span class="badge bg-primary" id="type">${taskData.taskType}</span>
    </div>
    <div class="card-footer">
      <button type="button"  onclick="saveEdit()" class="btn btn-outline-primary float-end">
        Save Changes
      </button>
      <button type="button" class="btn btn-primary float-right" data-bs-target="#openModal" onclick="openModal()" data-bs-toggle="modal>
        <i clas="fas fa-external-link-alt" onclick="openModal()" data-bs-target="#openModal" data-bs-toggle="modal></i>
      </button>  
      
    </div>
  </div>
</div>`

const loadInitialCardData = () => {
  //access localstorage
  const getCardData = localStorage.getItem("tasky"); //null
  //convert stringobject to object
  const { cards } = JSON.parse(getCardData);
  //map around the array to generate HTML card and inject it to DOM
  cards.map((cardObject) => {
    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));
    globalStore.push(cardObject);
  })
};
 const saveChanges = () => {
    const taskData = {
        id:`${Date.now()}`, // unique no for card id number and generate random number
        imageUrl:document.getElementById("imageurl").value,
        taskTitle:document.getElementById("tasktitle").value,
        taskType:document.getElementById("tasktype").value,
        taskDescription:document.getElementById("taskdescription").value,
    }
    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));
    globalStore.push(taskData);

    //API (application programming interface)
    //localstorage->interface->programming
    //adding to local storage
    localStorage.setItem("tasky",JSON.stringify({cards:globalStore})); //key->data ie-tasky 
};
const deleteCard = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname=event.target.tagName;
  globalStore=globalStore.filter((cardObject)=> cardObject.id !== targetID);
  localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
if(tagname === "BUTTON") {
  return taskContainer.removeChild(
  event.target.parentNode.parentNode.parentNode);
}else {
return taskContainer.removeChild(
  event.target.parentNode.parentNode.parentNode.parentNode);
} 
};
const editCard = () =>{
  document.getElementById("title").contentEditable="true";
  document.getElementById("description").contentEditable="true";
  document.getElementById("type").contentEditable="true";
};
const saveEdit = () =>{
  const editTitle = document.getElementById("title").textContent;
  const editDescription = document.getElementById("description").textContent;
  const editType = document.getElementById("type").textContent;
  document.getElementById("title").innerHTML = editTitle;
  document.getElementById("description").innerHTML = editDescription;
  document.getElementById("type").innerHTML = editType;
  document.getElementById("title").contentEditable="false";
  document.getElementById("description").contentEditable="false";
  document.getElementById("type").contentEditable="false";
};
const openModal = () => {
  openTitle=document.getElementById("title").textContent;
  openDescription=document.getElementById("description").textContent;
  openType=document.getElementById("type").textContent;
  document.getElementById("openTitle").innerHTML=openTitle;
  document.getElementById("openDescription").innerHTML=openDescription;
  document.getElementById("openType").innerHTML=openType;


};




















