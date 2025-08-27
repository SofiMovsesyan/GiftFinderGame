let boxContainer = document.getElementById("boxContainer")
let boxes, box, num, win, time;

let giftDiv = document.createElement("div")
giftDiv.className = "giftDiv"

let giftImg = document.createElement("img")
giftImg.src = "img/gift.png"
giftDiv.appendChild(giftImg)

let btn = document.getElementById("btn")
let pTimer = document.getElementById("timer")
let pBest = document.getElementById("best")
let wins = document.getElementById("wins")

let min = 0
let s = 0
let ms = 0

let bestScore = 0
let curScore;

let winsCount = 0

btn.addEventListener("click", () => {
    gameStart()
})

function gameStart() {
    clearInterval(time)
    boxContainer.innerHTML = ""
    btn.innerHTML = "REFRESH"
    win = false
    min = 0
    s = 0
    ms = 0
    timer()
    createBoxes()
    boxSelect()
}

function timeToMs(timeStr) {
    let [min, time] = timeStr.split(":")

    let [sec, ms] = time.split(".")
    console.log(min, sec);
    let toMs = parseInt(min) * 60000 + parseInt(sec) * 1000 + parseInt(ms)
    return toMs
}

function timer() {
    time = setInterval(() => {
        if (win == true) {
            clearInterval(time)
            curScore = timeToMs(pTimer.innerHTML.replace("Time:", " "))
            winsCount++
            wins.innerHTML = `Total wins: ${winsCount}`
            if (bestScore == 0 || bestScore > curScore) {
                bestScore = curScore
                pBest.innerHTML = `Best: ${min}:${s.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`
            }
        }

        if (ms >= 100) {
            ms = 0
            s++
        }

        if (s >= 60) {
            s = 0
            min++
        }
        pTimer.innerHTML = `Time: ${min}:${s.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`

        ms++
    }, 10);
}


function createBoxes() {
    for (let i = 1; i <= 3; i++) {
        boxes = document.createElement("div")
        boxes.classList = `boxes boxes${i}`
        boxContainer.appendChild(boxes)
    }
    let index = 1
    for (let i = 0; i < 9; i++) {
        box = document.createElement("div")
        box.className = "box"
        box.id = `box${i}`
        if (i !== 0 && i % 3 == 0) {
            index += 1
        }
        document.getElementsByClassName(`boxes${index}`)[0].appendChild(box)
    }

    randomBox()
}

function randomBox() {
    num = Math.floor(Math.random() * 9)
    let box = document.querySelectorAll(".box")
    box.forEach(box => {
        if (box.id == `box${num}`) {
            giftDiv.style.opacity = 0
            box.appendChild(giftDiv)
        }
    })
}

function boxSelect() {
    let box = document.querySelectorAll(".box")
    box.forEach(box => {
        box.onclick =  () => {
            if (box.id == `box${num}`) {
                giftDiv.style.opacity = 1
                win = true
                setTimeout(() => {
                    gameStart()
                }, 400);
            }
            box.style.background = "none"
        }
    })
}



