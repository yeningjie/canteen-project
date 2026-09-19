let foodData = [];
let barChartObj = null;
let pieChartObj = null;

function renderFood(list){
    const box = document.querySelector("#foodList");
    box.innerHTML = "";
    if(list.length === 0){
        box.innerHTML = `<div class="text-muted">没有找到符合条件的菜品</div>`;
        return;
    }
    list.forEach(item=>{
        const div = document.createElement("div");
        div.className="col-md-4 mb-3";
        div.innerHTML=`
        <div class="card h-100">
            <div class="card-body">
                <h5>${item.name}</h5>
                <p>窗口：${item.window}号窗口</p >
                <p>类型：${item.type==="meat"?"荤菜":"素菜"}</p >
                <p>价格：${item.price}元</p >
            </div>
        </div>
        `;
        box.appendChild(div);
    })
}

function filterFood(){
    const winSel = document.querySelector("#windowSelect").value;
    const typeSel = document.querySelector("#typeSelect").value;
    let res = [...foodData];
    if(winSel !== "all"){
        res = res.filter(x=>x.window === Number(winSel));
    }
    if(typeSel !== "all"){
        res = res.filter(x=>x.type === typeSel);
    }
    renderFood(res);
}

async function loadCharts(){
    try{
        const resp = await fetch("data/foodData.json");
        if(!resp.ok) throw new Error("json加载失败");
        foodData = await resp.json();
        filterFood();

        const barCtx = document.querySelector("#barChart").getContext("2d");
        barChartObj = new Chart(barCtx,{
            type:"bar",
            data:{
                labels:["一号窗口","二号窗口","三号窗口"],
                datasets:[{label:"午间就餐人数",data:[120,95,140]}]
            },
            options:{plugins:{title:{display:true,text:"各窗口午间就餐客流"}}}
        })

        const meatCount = foodData.filter(d=>d.type==="meat").length;
        const vegCount = foodData.filter(d=>d.type==="veg").length;
        const pieCtx = document.querySelector("#pieChart").getContext("2d");
        pieChartObj = new Chart(pieCtx,{
            type:"pie",
            data:{
                labels:["荤菜","素菜"],
                datasets:[{data:[meatCount,vegCount]}]
            },
            options:{plugins:{title:{display:true,text:"荤素菜品占比"}}}
        })

        document.querySelector("#windowSelect").addEventListener("change",filterFood);
        document.querySelector("#typeSelect").addEventListener("change",filterFood);
    }catch(err){
        console.error(err);
        document.querySelector("#foodBox").insertAdjacentHTML("beforeend",`<div class="text-danger mt-2">数据加载异常，请检查网络与json文件</div>`);
    }
}

window.addEventListener("DOMContentLoaded",()=>{
    loadCharts();
})

document.querySelectorAll('.navbar-nav a').forEach(link=>{
  link.addEventListener('click', ()=>{
    const collapseDom = document.querySelector('#mainNav');
    if(collapseDom.classList.contains('show')){
      collapseDom.classList.remove('show');
    }
  })
})