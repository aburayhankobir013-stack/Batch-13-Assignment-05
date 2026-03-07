const buttons=document.querySelectorAll('.button');


// Navigator functionality
const active=["bg-violet-900","text-white"];
buttons[0].classList.add(...active);
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