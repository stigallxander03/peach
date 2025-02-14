const yesButton = document.querySelector("#yesButton");
const noButton = document.querySelector("#noButton");
const dispImg = document.querySelector("#displayImg");

let noHover = 0;
let goodIndex = 0;
let badIndex = 0;

let goodImages = ['play-fight.gif', 'kiss.gif', 'excited-retsuko.gif'];
let badImages = ['fight.gif', 'slap.gif', 'spin.gif', 'eat.gif', 'screaming-retsuko.gif'];


const numImages = 5; // Number of bouncing images
const images = []; // Store image objects

function moveElemRandom(elem) {
    elem.style.position = "absolute";
    elem.style.top = `${Math.floor(Math.random() * 90 + 5)}%`;
    elem.style.left = `${Math.floor(Math.random() * 90 + 5)}%`;

    if (noHover > 2) {
        noButton.textContent = 'Wrong Button!';
    }
    if (noHover > 4) {
        noButton.textContent = 'Stop';
    }
    if (noHover > 5) {
        noButton.textContent = 'Stop Please';
        changeImage('bad');
    }
    if (noHover > 6) {
        noButton.textContent = 'STOP';
    }
    if (noHover > 7) {
        noButton.textContent = 'STOP';
        noButton.classList.add("particletext", "fire")
        fire();
    }

    noHover += 1;
    console.log(noHover)
}



function changeImage(type) {
    path = 'images/';
    if (type == 'good') {
        path += 'good/';
        // index = Math.floor(Math.random() * goodImages.length);
        path += goodImages[goodIndex];
        goodIndex += 1;
        if (goodIndex >= goodImages.length) {
            goodIndex = 0;
        }
    } else {
        path += 'bad/';
        index = Math.floor(Math.random() * badImages.length);
        path += badImages[badIndex];
        badIndex += 1;
        if (badIndex >= badImages.length) {
            badIndex = 0;
        }
    }
    dispImg.src = path;
}

noButton.addEventListener("mouseenter", function (e) {
    moveElemRandom(e.target);
})

yesButton.addEventListener("click", function (e) {
    changeImage("good");
    hearts();
    const img = document.createElement("img");
    img.src = "images/red-heart-bumping.gif"; // Change to your image
    img.classList.add("bouncingImg");
    document.body.appendChild(img);
    // Random initial position
    let x = 30 + Math.random() * window.innerWidth - 240;
    let y = 30 + Math.random() * window.innerHeight - 240;
    
    // Random speed (-5 to 5 range)
    let dx = (Math.random() - 0.5) * 60;
    let dy = (Math.random() - 0.5) * 60;

    images.push({ img, x, y, dx, dy });
})

function moveImages() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    images.forEach(obj => {
        obj.x += obj.dx;
        obj.y += obj.dy;

        // Bounce off walls
        if (obj.x + 220 > windowWidth || obj.x < 5) obj.dx = -obj.dx;
        if (obj.y + 220 > windowHeight || obj.y < 5) obj.dy = -obj.dy;

        obj.img.style.left = obj.x + "px";
        obj.img.style.top = obj.y + "px";
    });
}

setInterval(moveImages, 20); // Adjust speed of animation






/*The measurements are ... whack (so to say), for more general text usage I would generate different sized particles for the size of text; consider this pen a POC*/

function hearts() {
    $.each($(".particletext.hearts"), function () {
        var heartcount = ($(this).width() / 50) * 5;
        for (var i = 0; i <= heartcount; i++) {
            var size = ($.rnd(60, 120) / 10);
            $(this).append('<span class="particle" style="top:' + $.rnd(20, 80) + '%; left:' + $.rnd(0, 95) + '%;width:' + size + 'px; height:' + size + 'px;animation-delay: ' + ($.rnd(0, 30) / 10) + 's;"></span>');
        }
    });
}

function fire() {
    $.each($(".particletext.fire"), function () {
        var firecount = ($(this).width() / 50) * 20;
        for (var i = 0; i <= firecount; i++) {
            var size = $.rnd(8, 12);
            $(this).append('<span class="particle" style="top:' + $.rnd(40, 70) + '%; left:' + $.rnd(-10, 100) + '%;width:' + size + 'px; height:' + size + 'px;animation-delay: ' + ($.rnd(0, 20) / 10) + 's;"></span>');
        }
    });
}

jQuery.rnd = function (m, n) {
    m = parseInt(m);
    n = parseInt(n);
    return Math.floor(Math.random() * (n - m + 1)) + m;
}