let boxContainer = document.getElementById("boxContainer")
let boxes, box;
let giftDiv = document.createElement("div")
giftDiv.className = "giftDiv"
let giftImg = document.createElement("img")
giftImg.src = "img/gift.png"
giftDiv.appendChild(giftImg) 


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
        box.id =`box${i}`
        if (i !== 0 && i % 3 == 0) {
            index+=1
        }
        document.getElementsByClassName(`boxes${index}`)[0].appendChild(box)
    }
}

function randomBox() {
    let num = Math.floor(Math.random()*9)
    let box = document.querySelectorAll(".box")
    box.forEach(box => {
        if (box.id == `box${num}`) {
            box.appendChild(giftDiv)
        }
    })
}

createBoxes()
randomBox()



