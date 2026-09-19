const foodData = [];
function renderFood(list){
    const box = document.querySelector("#foodList");
    box.innerHTML = "";
}
function filterFood(){
}
async function loadCharts(){
}
window.addEventListener("DOMContentLoaded",()=>{
    renderFood(foodData);
})
document.querySelectorAll('.navbar-nav .nav-link').forEach(link=>{
  link.addEventListener('click', ()=>{
    const collapseDom = document.querySelector('#mainNav');
    if(collapseDom.classList.contains('show')){
      collapseDom.classList.remove('show');
    }
  })
})