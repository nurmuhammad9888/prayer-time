const elRamadanDay = document.querySelectorAll(".ramadan-day");
const elRamadanBgActive = document.querySelectorAll(".table-tr-wrap");
const elHeaderTime = document.querySelector(".header-time");
const elTime = document.querySelector(".time-prayer-morning");
// console.log(elRamadanBgActive);
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
    elHeaderTime.textContent = hourMinut;
}
timeFunc()

setInterval(() => {
    timeFunc()
}, 10000);

window.addEventListener("DOMContentLoaded", () =>{
    const loder = document.querySelector(".loder")
    setTimeout(() =>{
        loder.style.opacity = '0'
        setTimeout(() =>{
            loder.style.display = 'none'
        }, 50)
    }, 50)
})

//  NEW  DATA
let newdata = new Date();
let moths = ["Yanvar", "Fevral","Mart", "April", "May", "Iyun", "Iyul", "Avgust", "Sentabr ", "Oktabr", "Noyabr", "Dekabr"];
let days = ["Yakshanba","Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
let day = days[newdata.getDay() ];
let data = newdata.getDate();
let moth = moths[newdata.getMonth()];
let year = newdata.getFullYear();
let mon = newdata.getMonth()

if(mon < 9){
    mon = "0" + (mon + 1)
}else {
    mon = mon + 1
};

let presentTime = `${data}.${mon}.${year}`;
let monthTime = `${year}-${mon}-${data}`;
// console.log(presentTime);

elRamadanDay.forEach(item => {
    if(presentTime == item.textContent){
        item.parentElement.classList.add("ramadan-bg-active")
        item.parentElement.classList.add("text-light")
    }
    
})
console.log(elTime);