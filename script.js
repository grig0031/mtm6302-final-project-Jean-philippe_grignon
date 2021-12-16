let $theme;
const $head = document.querySelector('head') 
if (window.localStorage.getItem('$theme')){

 $theme = window.localStorage.getItem('$theme')
}
else { $theme = "cyberstyle"}
document.getElementById('ref').setAttribute('href', $theme + ".css")


// switch btn cyberstyle

const $cyber = document.getElementById('cyber')

$cyber.addEventListener('click', () => getStyle("cyberstyle")) ;
// switch btn space
const $space = document.getElementById('space')

$space.addEventListener('click', () => getStyle("spacestyle"));
// switch btn matrix
const $matrix = document.getElementById('matrix')

$matrix.addEventListener('click', () => getStyle("matrixstyle"));





// header

let acontainer = document.getElementById("ass")
acontainer.addEventListener("click", function(){


let x = document.getElementById("myLinks");
if(x.style.display === "block"){
    x.style.display = "none";
}
else{
    x.style.display = "block";
}



})

function getStyle (styleName){
     
    window.localStorage.setItem('$theme', styleName )
    document.getElementById('ref').href= styleName + '.css'
   
}
// time
let today = new Date();
 console.log(today)


let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
fetch('https://api.nasa.gov/planetary/apod?api_key=0aR5ZvLSNKKk4R3qg9WbHbxKX7xZtHVz4Dq1otzb&thumbs=True',{
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
header: JSON.stringify({
    date: "today"
})

})
.then(function (response) {
    return response.json()
})
.then(function (imageData){
    console.log(imageData)
    if(imageData.media_type === 'video'){
        document.querySelector('p').textContent='APOD is a video'
    } else {
        document.querySelector('img').setAttribute
        ('src', imageData.hdurl)
    }
})
//HTML references
const $clocks = document.getElementById('clocks')
const $clockDisplay = document.getElementById('clock-display')

//Internal letiables
const offsets = {
    ottawa: -5,
    london: 0,
    tokyo: 9
}

//Functions
function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1)
}

function getLocalTime(city) {
    let UTCTime = new Date()
    UTCTime = UTCTime.toUTCString().split(' ')[4]
    const offset = offsets[city]

    
    let hours = parseInt(UTCTime.slice(0, 2)) + offset



    const localTime = hours + UTCTime.slice(2)

    return localTime
}
    function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time-display').innerHTML =  h + ":" + m + ":" + s;
    setTimeout(startTime, 1001);
  }
   // https://www.w3schools.com/js/js_timing.asp
  function checkTime(i) {
    if (i < 10) {i = "0" + i}; 
    return i;
  }



// settimout






function createClock(city) {
    

    $clockDisplay.innerHTML = `
    <h2>Local time in ${capitalize(city)}</h2>
    <p id='time-display'>${getLocalTime(city)}</p>
   
    <button id='close'>Close</button>
    `
    
    document.getElementById('close').addEventListener('click', function () {
        $clockDisplay.innerHTML = ''
    })

    localStorage.setItem('timeZoneCity', city)
}

function initialize() {


    const storedCity = localStorage.getItem('timeZoneCity')

    if (storedCity) {
        createClock(storedCity)
    } else {
        createClock($clocks.value)
    }
    startTime()
}

//Event listeners
$clocks.addEventListener('change', function () {
    createClock($clocks.value)
})

//Initialization
initialize()