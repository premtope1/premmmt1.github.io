// ===== Typing Effect =====

const text = [
    "IT Engineering Student",
    "Web Developer",
    "Future Software Engineer",
    "Tech Enthusiast",
    "Problem Solver"
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
        setTimeout(typeEffect, 2000);
    }
    else{
        setTimeout(typeEffect, 100);
    }
}

typeEffect();


// ===== Navbar Scroll Effect =====

window.addEventListener("scroll", () => {
    const header = document.querySelector("header");

    if(window.scrollY > 50){
        header.style.background = "#020617";
        header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.5)";
    }
    else{
        header.style.background = "#111827";
        header.style.boxShadow = "none";
    }
});


// ===== Smooth Scroll =====

document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", function(e){
        const target = document.querySelector(this.getAttribute("href"));

        if(target){
            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// ===== Scroll Reveal Animation for Cards =====

const cards = document.querySelectorAll(".card");

function revealCards(){
    cards.forEach(card => {
        const position = card.getBoundingClientRect().top;
        const screen = window.innerHeight;

        if(position < screen - 100){
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
}

// Initial Card Style
cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "0.6s ease";
});

window.addEventListener("scroll", revealCards);
window.addEventListener("load", revealCards);


// ===== Current Year Footer =====

const year = document.querySelector("#year");

if(year){
    year.innerHTML = new Date().getFullYear();
}


// ===== Active Navigation Link =====

window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if(pageYOffset >= sectionTop - 200){
            current = section.getAttribute("id");
        }
    });

    document.querySelectorAll("nav ul li a").forEach(link => {
        link.classList.remove("active");
        if(link.getAttribute("href").slice(1) === current){
            link.classList.add("active");
        }
    });
});


// ===== Fade In Animation on Load =====

window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});

document.body.style.opacity = "0";
document.body.style.transition = "0.5s ease";
