const buttons=document.querySelectorAll('.button');
const allBtn=buttons[0];
const openBtn=buttons[1];
const closeBtn=buttons[2];
const loader=document.getElementById('loader');
const cardContainer=document.getElementById('card-container');
const issueCounter=document.getElementById('issue-counter');
console.log(loader);



const allDataURL=`https://phi-lab-server.vercel.app/api/v1/lab/issues`;
let allData=[];
let openData=[];
let closedData=[];


async function getAPIData(url){
  loader.classList.remove('hidden');
  loader.classList.add('block');
  const response=await fetch(url);
  if(response.ok){
    const useableData=await response.json();
    allData=useableData.data;
    console.log(allData);
    getOpendData(useableData.data);
    getClosedData(useableData.data);
    issueCounter.textContent=`${allData.length} `;
    randerCard(allData);
  }
  loader.classList.remove('block');
  loader.classList.add('hidden');
}

getAPIData(allDataURL);

function randerCard(cards){
  cardContainer.innerHTML='';
  cardContainer.appendChild(loader);
  cards.forEach((card)=>{
    const cardWrapper=document.createElement('div');
    cardWrapper.classList.add('size-full');
    cardWrapper.innerHTML=`
    <div class="p-2 flex flex-col gap-2 rounded-md shadow-[0_0_0.625rem_rgba(0,0,0,0.5)] border-t-4 ${changeBorderColor(card.status)} size-full">
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

function addBatch(labels){
  let batch='';
  labels.forEach((label)=>{
    batch+=`<div class="px-2 py-1 bg-yellow-200 text-yellow-700 font-semibold rounded-sm shadow-sm line-clamp-1">${label.toUpperCase()}</div>`;
  });
  return batch;
}


function changePriority(priority){
  if(priority==='high'){
    return '<h1 class="bg-red-200 px-4 py-1 font-semibold text-red-700 rounded-sm shadow-sm">HIGH</h1>';
  }else if(priority==='medium'){
    return '<h1 class="bg-yellow-200 px-4 py-1 font-semibold text-yellow-700 rounded-sm shadow-sm">MEDIUM</h1>';
  }else{
    return '<h1 class="bg-gray-200 px-4 py-1 font-semibold text-gray-700 rounded-sm shadow-sm">LOW</h1>';
  }
}

function changeBorderColor(status){
  if(status==='open'){
    return 'border-green-700';
  }else{
    return 'border-violet-700';
  }
}

function changeImage(status){
  if(status==='open'){
    return '<figure><img src="../assets/Open-Status.png" alt="Open status image"></figure>';
  }else{
    return '<figure><img src="../assets/Closed- Status .png" alt="Close status image"></figure>'
  }
}

console.log(changeBorderColor('open'));

allBtn.addEventListener('click',()=>{
  getAPIData();
  issueCounter.textContent=`${allData.length} `;
  randerCard(allData);
});

openBtn.addEventListener('click',()=>{
  getAPIData();
  issueCounter.textContent=`${openData.length} `;
  randerCard(openData);
});

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