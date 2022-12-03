const elHeaderTime = document.querySelector(".header-time");

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
