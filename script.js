// ===== Typing Effect =====

const text = [
    "IT Engineering Student",
    "Web Developer",
    "Future Software Engineer",
    "Tech Enthusiast"
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

function typeEffect(){

    if(count === text.length){
        count = 0;
    }

    currentText = text[count];
    letter = currentText.slice(0, ++index);

    const typingElement = document.querySelector(".typing");

    if(typingElement){
        typingElement.textContent = letter;
    }

    if(letter.length === currentText.length){
        count++;
        index = 0;

        setTimeout(typeEffect,1000);
    }
    else{
        setTimeout(typeEffect,100);
    }
}

typeEffect();


// ===== Navbar Scroll Effect =====

window.addEventListener("scroll",()=>{

    const nav = document.querySelector("nav");

    if(window.scrollY > 50){
        nav.style.background = "#020617";
    }
    else{
        nav.style.background = "#111827";
    }

});


// ===== Smooth Scroll =====

document.querySelectorAll("a").forEach(link=>{

    link.addEventListener("click",function(e){

        const target = document.querySelector(this.getAttribute("href"));

        if(target){
            e.preventDefault();

            target.scrollIntoView({
                behavior:"smooth"
            });
        }

    });

});


// ===== Scroll Reveal Animation =====

const cards = document.querySelectorAll(".card");

window.addEventListener("scroll",()=>{

    cards.forEach(card=>{

        const position = card.getBoundingClientRect().top;
        const screen = window.innerHeight;

        if(position < screen - 100){

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }

    });

});


// Initial Card Style

cards.forEach(card=>{

    card.style.opacity="0";
    card.style.transform="translateY(50px)";
    card.style.transition="0.6s";

});


// ===== Current Year Footer =====

const year = document.querySelector("#year");

if(year){
    year.innerHTML = new Date().getFullYear();
}
