// All DOM element selection
const buttons=document.querySelectorAll('.button');
const allBtn=buttons[0];
const openBtn=buttons[1];
const closeBtn=buttons[2];
const loader=document.getElementById('loader');
const cardContainer=document.getElementById('card-container');
const issueCounter=document.getElementById('issue-counter');
const form=document.getElementById('form');
const searchField=document.getElementById('search');
const searchBtn=document.getElementById('submitBtn');
const modal=document.getElementById('my_modal_1');
const modalBox=document.querySelector('.modal-box');
const modalAction=document.querySelector('.modal-action');

// All data API URL
const allDataURL=`https://phi-lab-server.vercel.app/api/v1/lab/issues`;

// Variables for storing data
let allData=[];
let openData=[];
let closedData=[];
let searchData=[];
let modalData={};

// Function for getting all data through API
async function getAPIData(url){
  loader.classList.remove('hidden');
  loader.classList.add('block');
  const response=await fetch(url);
  if(response.ok){
    const useableData=await response.json();
    allData=useableData.data;
    getOpendData(useableData.data);
    getClosedData(useableData.data);
    issueCounter.textContent=`${allData.length} `;
    randerCard(allData);
  }
  loader.classList.remove('block');
  loader.classList.add('hidden');
}
getAPIData(allDataURL);

// Function for getting search data through API
async function getSearchAPIData(url){
  if(url){
    loader.classList.remove('hidden');
    loader.classList.add('block');
    const response=await fetch(url);
    if(response.ok){
      const useableData=await response.json();
      if(useableData.data.length!==0){
        searchData=useableData.data;
        issueCounter.textContent=`${searchData.length} `;
        randerCard(searchData);
        searchField.value='';
      }else{
        alert('Invalid keyword!');
        searchField.value='';
      }
    }
  }
  loader.classList.remove('block');
  loader.classList.add('hidden');
}

// Function for getting search URL
function getSearchURL(){
  if(searchField.value.length!==0){
    return `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchField.value}`;
  }else{
    alert('You must entered the valid keyword!');
  }
}

// Event listener for search form submission
form.addEventListener('submit',(event)=>{
  event.preventDefault();
  getSearchAPIData(getSearchURL());
},false);

// Function for randering cards
function randerCard(cards){
  cardContainer.innerHTML='';
  cardContainer.appendChild(loader);
  cardContainer.appendChild(modal);
  cards.forEach((card)=>{
    const cardWrapper=document.createElement('div');
    cardWrapper.classList.add('size-full');
    cardWrapper.innerHTML=`
    <div class="p-2 flex flex-col gap-2 rounded-md shadow-[0_0_0.625rem_rgba(0,0,0,0.5)] border-t-4 ${changeBorderColor(card.status)} h-72" onclick="showCardData(${card.id})">
          <!-- Image and priority -->
           <div class="flex items-center justify-between">
            ${changeImage(card.status)}
            ${changePriority(card.priority)}
           </div>
           <h2 class="font-bold line-clamp-2">
            ${card.title}
           </h2>
           <p class="font-semibold text-gray-500 line-clamp-2">${card.description}</p>
           <!-- Batch container -->
            <div class="flex gap-2">
              ${addBatch(card.labels)}
            </div>
            <!-- Horizontal line -->
             <hr class="border-none h-[1.5px] bg-gray-500">
             <!-- Author -->
             <div class="flex justify-between font-semibold text-gray-500">
              <div class="flex flex-col gap-1 text-left">
                <p>#${card.id} by ${card.author}</p>
                <p>Assignee: ${card.assignee===''? 'No data': card.assignee}</p>
              </div>
              <div class="flex flex-col gap-1 text-right">
                <p>${new Date(card.createdAt).toLocaleDateString()}</p>
                <p>Updated: ${new Date(card.updatedAt).toLocaleDateString()}</p>
              </div>
             </div>
         </div>
    `;
    cardContainer.appendChild(cardWrapper);
  });
}

// Function for getting modal data through API
async function getCardAPIData(id){
  const response=await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
  if(response.ok){
    const useableData=await response.json();
    modalData=useableData.data;
  }
}

// Function for showing modal card data
async function showCardData(id){
 await getCardAPIData(id);
  modalBox.innerHTML='';
  const modalContainer=document.createElement('div');
  modalContainer.classList.add('rounded-md','shadow-[0_0_0.625rem_rgba(0,0,0,0.5)]');
  modalContainer.innerHTML=`
    <div class="shadow-md flex flex-col gap-2 p-2">
      <!-- Title container -->
      <h1 class="font-bold text-xl line-clamp-2">${modalData.title}</h1>
      <div class="flex gap-2">
        ${changeStatus(modalData.status)}
        <ul class="flex list-inside list-disc gap-2">
          <li><span class="font-semibold">${modalData.author}</span></li>
          <li><span class="text-gray-500 font-semibold">${new Date(modalData.createdAt).toLocaleDateString()}</span></li>
        </ul>
      </div>
      <div>
        <div class="flex gap-2">
          ${addBatch(modalData.labels)}
        </div>
        <p class="font-semibold line-clamp-2">${modalData.description}</p>
        <div class="bg-gray-200 p-2 rounded-md flex justify-between">
          <p class="font-semibold flex flex-col"><span class="text-gray-500">Assingee: </span><span class="font-bold">${modalData.assignee===''? 'No data': modalData.assignee}</span></p>
          <div>
            <span class="font-semibold text-gray-500">Priority: </span>
            ${changePriority(modalData.priority)}
          </div>
        </div>
      </div>
     </div>
  `;
  modalBox.appendChild(modalContainer);
  modalBox.appendChild(modalAction);
  modal.showModal();
}

// Function for adding batch in different condition
function addBatch(labels){
  let batch='';
  labels.forEach((label)=>{
    batch+=`<div class="px-2 py-1 bg-yellow-200 text-yellow-700 font-semibold rounded-sm shadow-sm line-clamp-1">${label.toUpperCase()}</div>`;
  });
  return batch;
}

// Function for adding priority in different condition
function changePriority(priority){
  if(priority==='high'){
    return '<h1 class="bg-red-200 px-4 py-1 font-semibold text-red-700 rounded-sm shadow-sm">HIGH</h1>';
  }else if(priority==='medium'){
    return '<h1 class="bg-yellow-200 px-4 py-1 font-semibold text-yellow-700 rounded-sm shadow-sm">MEDIUM</h1>';
  }else{
    return '<h1 class="bg-gray-200 px-4 py-1 font-semibold text-gray-700 rounded-sm shadow-sm">LOW</h1>';
  }
}

// Function for adding border color in different condition
function changeBorderColor(status){
  if(status==='open'){
    return 'border-green-700';
  }else{
    return 'border-violet-700';
  }
}

// Function for changing status in different condition
function changeStatus(status){
  if(status==='open'){
    return '<div class="px-2 py-1 bg-green-300 text-green-800 font-semibold rounded-md">Opened</div>';
  }else{
    return '<div class="px-2 py-1 bg-violet-300 text-violet-800 font-semibold rounded-md">Closed</div>';
  }
}

// Function for changing image in different condition
function changeImage(status){
  if(status==='open'){
    return '<figure><img src="../assets/Open-Status.png" alt="Open status image"></figure>';
  }else{
    return '<figure><img src="../assets/Closed- Status .png" alt="Close status image"></figure>'
  }
}

// Function for all button functionality
allBtn.addEventListener('click',()=>{
  getAPIData();
  issueCounter.textContent=`${allData.length} `;
  randerCard(allData);
});

// Function for open button functionality
openBtn.addEventListener('click',()=>{
  getAPIData();
  issueCounter.textContent=`${openData.length} `;
  randerCard(openData);
});

// Function for closed button functionality
closeBtn.addEventListener('click',()=>{
  getAPIData();
  issueCounter.textContent=`${closedData.length} `;
  randerCard(closedData);
});

// Filter out opende data
function getOpendData(allData){
  openData=allData.filter((data)=>{
    if(data.status==="open"){
      return data;
    }
  });
}

// Filter out closed data
function getClosedData(allData){
  closedData=allData.filter((data)=>{
    if(data.status==='closed'){
      return data;
    }
  });
}

// Navigator functionality
const active=["bg-violet-900","text-white"];
allBtn.classList.add(...active);
function navigator(){
  buttons.forEach((btnOuter)=>{
    btnOuter.addEventListener('click',()=>{
      buttons.forEach((btnInner)=>{
        btnInner.classList.remove(...active);
      });
      btnOuter.classList.add(...active);
    },false);
  });
}
navigator();