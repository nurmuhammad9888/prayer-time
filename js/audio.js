const audioList = document.querySelector(".audios-list");
const viewAudioList = document.querySelector(".view-audio-list");
const audioTextTitle = document.querySelector(".audio-text-title");
const audiosWrapper = document.querySelector(".wrapper-fixsid");
const btnAudioClose = document.querySelector(".btn-audio-close");
const bodyHiddin = document.querySelector("body");
const elHeaderTime = document.querySelector(".header-time");
const btnTop = document.querySelector(".btn-top");
const btnAudio = document.querySelector(".audio-m");
const elLoder = document.querySelector(".loder");

const frag = document.createDocumentFragment();
const audioTemplate = document.querySelector(".audio-template").content;
const viewAudioTemplate = document.querySelector(".view-audio-template").content;

window.addEventListener("DOMContentLoaded", () =>{
    const loder = document.querySelector(".loder")
    setTimeout(() =>{
        loder.style.opacity = '0'
        setTimeout(() =>{
            loder.style.display = 'none'
        }, 50)
    }, 50)
})

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

async function viewAudioFunc(){
    try {
        const res = await fetch("https://api.quran.com/api/v4/chapters?language=en")
        const data = await res.json()
        rendrerAudioView(data.chapters)
    } catch (error) {
        console.log(error);
    }
}
viewAudioFunc();

function rendrerAudioView(arr){
    arr.forEach(el =>{
        const viewAudioClone = viewAudioTemplate.cloneNode(true);
        viewAudioClone.querySelector(".view-audio-title").textContent = el.name_simple;
        viewAudioClone.querySelector(".view-audio-ordinal-number").textContent = el.id;
        viewAudioClone.querySelector(".view-audio-text").textContent = el.revelation_place;
        viewAudioClone.querySelector(".view-audio-number").textContent = `Oyatlar soni : ${el.verses_count}`;
        viewAudioClone.querySelector(".btn-view-audio").dataset.id = el.id;
        frag.appendChild(viewAudioClone)
    })
    viewAudioList.appendChild(frag)
}

viewAudioList.addEventListener("click" , evt =>{
    audioList.innerHTML = '';
    btnTop.classList.add("d-none")
    if(evt.target.matches(".btn-view-audio")){
        const btnId = evt.target.dataset.id;
        audiosWrapper.classList.add("audios-wrapper-show");
        bodyHiddin.classList.add("body-show")
        console.log(btnId);
        const urlAudio = `https://api.alquran.cloud/v1/surah/${btnId}/editions/ar.alafasy,en.asad,ur.jalandhry?limit=`;
        audioFunc(urlAudio)
    }
    console.log();
})

btnAudioClose.addEventListener("click", () =>{
    audiosWrapper.classList.remove("audios-wrapper-show")
    bodyHiddin.classList.remove("body-show")
    btnTop.classList.remove("d-none")
})

async function audioFunc(url){
    try {
        const res = await fetch(url)
        const data = await res.json()
        rendrerAudio(data.data)
        
    } catch (error) {
        console.log(error);
    }
}

function rendrerAudio(arr){
    audioList.innerHTML = '';
    elLoder.innerHTML = "";
    audioTextTitle.textContent = `${arr[0].englishName} surasi`
    arr[0].ayahs.forEach(el =>{
        const audioClone = audioTemplate.cloneNode(true);
        audioClone.querySelector(".audio-m").src = el.audio;
        audioClone.querySelector(".audio-title").textContent = `${el.numberInSurah} oyat`;
        audioClone.querySelector(".audio-text").textContent = el.text;
        frag.appendChild(audioClone)
    })
    audioList.appendChild(frag)
}