const templatePrayer = document.querySelector(".template-prayer").content;
const templatePrayerTebl = document.querySelector(".template-tebl").content;
const frag = document.createDocumentFragment();
const elList = document.querySelector(".list");
const elListTebl = document.querySelector(".tebl-list");
const elListTeblWrap = document.querySelector(".tebl-wrap");
const elbg = document.querySelector(".bg-juma");
const elHeaderTime = document.querySelector(".header-time");

const elPrayerTitle = document.querySelector(".title-region");
const elPrayerTime = document.querySelector(".time-date");
const elPrayerWeekday = document.querySelector(".weekday");

// BTN 
const elBtnWeek = document.querySelectorAll(".btn-prayer");
const elBtnCity = document.querySelectorAll(".btn-city");

let region = "Qarshi";
let con = "day";

//  NEW  DATA
let newdata = new Date();
let moths = ["Yanvar", "Fevral","Mart", "April", "May", "Iyun", "Iyul", "Avgust", "Sentabr ", "Oktabr", "Noyabr", "Dekabr"];
let days = ["Yakshanba","Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
let day = days[newdata.getDay() ];
let data = newdata.getDate();
let moth = moths[newdata.getMonth()];
let year = newdata.getFullYear();
let mon = newdata.getMonth()
if(data < 10){
    data = data ? "0" + data : data
}
if(mon < 10){
    mon = mon ? "0" + mon : mon
}
let presentTime = `${data}.${mon + 1}.${year}`
let monthTime = `${year}-${mon + 1}-${data}`

console.log(presentTime);
function timeFunc() {
    let mns = new Date();
    let hours = mns.getHours();
    let menut = mns.getMinutes();
    if(hours < 10){
        hours = "0" + hours 
    }
    if(menut < 10){
        menut = "0" + menut 
    }
    let hourMinut = `${hours}:${menut}`
    // console.log(hourMinut);
    elHeaderTime.textContent = hourMinut;
}
timeFunc()

setInterval(() => {
    timeFunc()
}, 10000);

console.log("hello");
// elHeaderTime.textContent = newdata.toLocaleTimeString()


elBtnWeek.forEach(item =>{
    item.addEventListener("click", ()=>{
        if(item.dataset.id == "day"){
            elList.style.display = "block";
            elListTeblWrap.style.display = "none";
            con = "day";
            mainFuncDay(`https://islomapi.uz/api/present/day?region=${region}`);
        }
        if(item.dataset.id == "week"){
            elList.style.display = "none"
            elListTeblWrap.style.display = "block";
            con = "week";
            mainFuncWeekMonth(`https://islomapi.uz/api/present/week?region=${region}`);
        }
        if(item.dataset.id == "monthly"){
            elListTeblWrap.style.display = "block";
            elList.style.display = "none"
            con = "monthly";
            mainFuncWeekMonth(` https://islomapi.uz/api/monthly?region=${region}&month=${newdata.getMonth() + 1}`);
        }
    })
})
mainFuncDay(`https://islomapi.uz/api/present/day?region=${region}`);

elBtnCity.forEach(ite =>{
    ite.addEventListener("click", () =>{
        region =  ite.dataset.id;
        if(con == "day") {
            mainFuncDay(`https://islomapi.uz/api/present/day?region=${region}`);
        } else if( con == "week") {
            mainFuncWeekMonth(`https://islomapi.uz/api/present/week?region=${region}`);
        } else {
            mainFuncWeekMonth(` https://islomapi.uz/api/monthly?region=${region}&month=${newdata.getMonth() + 1}`)
        }
    });
})

async function mainFuncDay(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        renderFuncDay(data);
    } catch (error) {
        console.log(error);
    }
}

let mns = new Date()
let hours = mns.getHours();
let menut = mns.getMinutes();
if(hours < 10){
    hours = "0" + hours
}
if(menut < 10){
    menut = "0" + menut
}
hourMinut  = `${hours}:${menut}`
// console.log(hourMinut);


function renderFuncDay(arrs ) {
    
    elList.innerHTML = "";
    const tempClone = templatePrayer.cloneNode(true);
    elPrayerTitle.textContent = arrs.region;
    elPrayerTime.textContent = `${data} ${moth} ${year}  yil`;
    elPrayerWeekday.textContent = `${day}`;
    
    // Bomdod 
    tempClone.querySelector(".time-prayer-morning").textContent = arrs.times.tong_saharlik;
    if(arrs.times.tong_saharlik <= hourMinut){
        tempClone.querySelector(".item-night").style.backgroundColor = "#fff";
        tempClone.querySelector(".item-morning").style.backgroundColor = "#00d451";
    }
    // Quyosh
    tempClone.querySelector(".time-prayer-sunrise").textContent = arrs.times.quyosh;
    if(arrs.times.quyosh <= hourMinut){
        tempClone.querySelector(".item-morning").style.backgroundColor = "#fff";
        tempClone.querySelector(".item-sunrise").style.backgroundColor = "#00d451";
    }
    // Peshin 
    tempClone.querySelector(".time-prayer-noon").textContent = arrs.times.peshin;
    if(arrs.times.peshin <= hourMinut){
        tempClone.querySelector(".item-sunrise").style.backgroundColor = "#fff";
        tempClone.querySelector(".item-noon").style.backgroundColor = "#00d451";
    }
    // Asr 
    tempClone.querySelector(".time-prayer-century").textContent = arrs.times.asr;
    if(arrs.times.asr <= hourMinut){
        tempClone.querySelector(".item-noon").style.backgroundColor = "#fff";
        tempClone.querySelector(".item-century").style.backgroundColor = "#00d451";
    }
    // Shom 
    tempClone.querySelector(".time-prayer-evening").textContent = arrs.times.shom_iftor;
    if(arrs.times.shom_iftor <= hourMinut){
        tempClone.querySelector(".item-century").style.backgroundColor = "#fff";
        tempClone.querySelector(".item-evening").style.backgroundColor = "#00d451";
    }
    // Xufton
    tempClone.querySelector(".time-prayer-night").textContent = arrs.times.hufton;
    if(arrs.times.hufton <= hourMinut){
        tempClone.querySelector(".item-evening").style.backgroundColor = "#fff";
        tempClone.querySelector(".item-night").style.backgroundColor = "#00d451";
    }
    
    frag.appendChild(tempClone);
    elList.appendChild(frag);
};

async function mainFuncWeekMonth(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        renderFuncWeek(data)
    } catch (error) {
        console.log(error);
    }
}


function renderFuncWeek(arr) {
    elList.innerHTML = "";
    elListTebl.innerHTML = "";
    elPrayerTitle.textContent = region;
    arr.forEach(el => {
        const tempClone = templatePrayerTebl.cloneNode(true);
        let dat =  tempClone.querySelector(".week-time-text").textContent = el.date.slice(0, 10).split("/").join(".");
        tempClone.querySelector(".week-t-text").textContent = el.weekday;
        if(el.weekday == "Juma"){
            tempClone.querySelector(".table-tr").style.backgroundColor = "#14dd2f";
            tempClone.querySelector(".table-tr").style.color = "#fff";
        }
        if(dat == presentTime){
            tempClone.querySelector(".table-tr").style.backgroundColor = "#bcdfe3";
        }
        if(dat == monthTime){
            tempClone.querySelector(".table-tr").style.backgroundColor = "#bcdfe3";
        }
        tempClone.querySelector(".time-prayer-morning").textContent = el.times.tong_saharlik;
        tempClone.querySelector(".time-prayer-sunrise").textContent = el.times.quyosh;
        tempClone.querySelector(".time-prayer-noon").textContent = el.times.peshin;
        tempClone.querySelector(".time-prayer-century").textContent = el.times.asr;
        tempClone.querySelector(".time-prayer-evening").textContent = el.times.shom_iftor;
        tempClone.querySelector(".time-prayer-night").textContent = el.times.hufton;
        frag.appendChild(tempClone);
    });
    elListTebl.appendChild(frag);
}

