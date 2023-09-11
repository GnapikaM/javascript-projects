

/* playing piano on mouse clicks */

var numberOfKeys = document.querySelectorAll(".key").length;

for(var i=0; i<numberOfKeys; i++) {
    
    document.querySelectorAll(".key")[i].addEventListener("click", function() {

        var buttonInnerHTML = this.querySelector(".key span").innerHTML;
        playSound(buttonInnerHTML);

    })

}

/* keys check box */


const pianoKeys = document.querySelectorAll(".key");

const keysCheckbox = document.querySelector(".checkbox input");

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

keysCheckbox.addEventListener("click", showHideKeys);


/* Playing piano on keyboard key press and creating animations on key press */

document.addEventListener("keypress", function(event) {
    playSound(event.key);

    if(isWhiteKey(event.key)) {
        skewAnimationWhite(event.key);
    }
    else if(isBlackKey(event.key)) {
        skewAnimationBlack(event.key);
    }
})

function isWhiteKey(key) {
    return ["a", "s", "d", "f", "g", "h", "j", "k", "x", "c", "v", "b", "n"].includes(key);
}

function isBlackKey(key) {
    return ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].includes(key);
}

function skewAnimationWhite(currentKey) {
    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("animation-white");

    setTimeout(function() {
        activeButton.classList.remove("animation-white");
    }, 100);
}

function skewAnimationBlack(currentKey) {
    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("animation-black");

    setTimeout(function() {
        activeButton.classList.remove("animation-black");
    }, 100);
}

// playing sounds for different keys

function playSound(key) {
    if (audioSources[key]) {
        var audio = new Audio(audioSources[key]);
        audio.play();
    } else {
        console.log("Unhandled key:", key);
    }
}

const audioSources = {
    "a": "sounds/key01.mp3",
    "s": "sounds/key02.mp3",
    "d": "sounds/key03.mp3",
    "f": "sounds/key04.mp3",
    "g": "sounds/key05.mp3",
    "h": "sounds/key06.mp3",
    "j": "sounds/key07.mp3",
    "k": "sounds/key08.mp3",
    "l": "sounds/key09.mp3",
    "x": "sounds/key10.mp3",
    "c": "sounds/key11.mp3",
    "v": "sounds/key12.mp3",
    "b": "sounds/key13.mp3",
    "n": "sounds/key14.mp3",
    "q": "sounds/key15.mp3",
    "w": "sounds/key16.mp3",
    "e": "sounds/key17.mp3",
    "r": "sounds/key18.mp3",
    "t": "sounds/key19.mp3",
    "y": "sounds/key20.mp3",
    "u": "sounds/key21.mp3",
    "i": "sounds/key22.mp3",
    "o": "sounds/key23.mp3",
    "p": "sounds/key24.mp3"
};