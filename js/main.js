const templatePrayer = document.querySelector(".template-prayer").content;
const templatePrayerTebl = document.querySelector(".template-tebl").content;
const frag = document.createDocumentFragment();
const elList = document.querySelector(".list");
const elListTebl = document.querySelector(".tebl-list");
const elListTeblWrap = document.querySelector(".tebl-wrap");

const elPrayerTitle = document.querySelector(".title-region");
const elPrayerTime = document.querySelector(".time-date");
const elPrayerWeekday = document.querySelector(".weekday");

// BTN 
const elBtnWeek = document.querySelectorAll(".btn-prayer");
const elBtnCity = document.querySelectorAll(".btn-city");

let region = "Toshkent";
let con = "day";

//  NEW  DATA
let newdata = new Date();
let moths = ["Yanvar", "Fevral","Mart", "April", "May", "Iyun", "Iyul", "Avgust", "Sentabr ", "Oktabr", "Noyabr", "Dekabr"];
let days = ["Yakshanba","Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
let day = days[newdata.getDay() ];
let data = newdata.getDate();
let moth = moths[newdata.getMonth()];
let year = newdata.getFullYear();

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

function renderFuncDay(arrs) {
    elList.innerHTML = "";
    const tempClone = templatePrayer.cloneNode(true);
    elPrayerTitle.textContent = arrs.region;
    elPrayerTime.textContent = `${data} ${moth} ${year}  yil`;
    elPrayerWeekday.textContent = `${day}`;
    tempClone.querySelector(".time-prayer-morning").textContent = arrs.times.tong_saharlik;
    tempClone.querySelector(".time-prayer-sunrise").textContent = arrs.times.quyosh;
    tempClone.querySelector(".time-prayer-noon").textContent = arrs.times.peshin;
    tempClone.querySelector(".time-prayer-century").textContent = arrs.times.asr;
    tempClone.querySelector(".time-prayer-evening").textContent = arrs.times.shom_iftor;
    tempClone.querySelector(".time-prayer-night").textContent = arrs.times.hufton;
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
        tempClone.querySelector(".week-time-text").textContent = el.date.slice(0, 10);
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