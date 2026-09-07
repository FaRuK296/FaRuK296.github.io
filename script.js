

const heroKicker = document.querySelector(".hero-kicker");

if (heroKicker) {
    const text = heroKicker.textContent.trim();

    heroKicker.textContent = "";

    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            heroKicker.textContent += text.charAt(index);
            index++;

            setTimeout(typeWriter, 50);
        }
    }

    setTimeout(typeWriter, 300);
}





const revealElements = document.querySelectorAll(
    "section, .about-box, .project-card, .cv-card, .contact-card"
);

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";
});


const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    },
    {
        threshold: 0.15
    }
);


revealElements.forEach(element => {
    observer.observe(element);
});





const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 120}ms`;
});




projectCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        if (window.innerWidth < 800) {
            return;
        }

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX =
            (centerY - y) / 20;

        const rotateY =
            (x - centerX) / 20;

        card.style.transform =
            `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)
            `;
    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            `
            perspective(900px)
            rotateX(0deg)
            rotateY(0deg)
            translateY(0)
            `;

    });

});




const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");


function updateNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 200;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {
            currentSection =
                section.getAttribute("id");
        }

    });


    navLinks.forEach(link => {

        link.style.color = "";

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {
            link.style.color = "#60a5fa";
        }

    });

}


window.addEventListener(
    "scroll",
    updateNavigation
);





const progressBar =
    document.createElement("div");


progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "4px";
progressBar.style.width = "0%";
progressBar.style.zIndex = "9999";
progressBar.style.background =
    "linear-gradient(90deg, #2563eb, #60a5fa, #38bdf8)";


document.body.appendChild(progressBar);


window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        (scrollTop / pageHeight) * 100;

    progressBar.style.width =
        progress + "%";

});





const glow =
    document.createElement("div");


glow.style.position = "fixed";
glow.style.width = "300px";
glow.style.height = "300px";
glow.style.borderRadius = "50%";
glow.style.pointerEvents = "none";
glow.style.zIndex = "0";
glow.style.transform =
    "translate(-50%, -50%)";

glow.style.background =
    `
    radial-gradient(
        circle,
        rgba(37, 99, 235, 0.12),
        transparent 70%
    )
    `;


document.body.appendChild(glow);


let mouseX = 0;
let mouseY = 0;

let glowX = 0;
let glowY = 0;


document.addEventListener(
    "mousemove",
    event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

    }
);


function animateGlow() {

    glowX +=
        (mouseX - glowX) * 0.1;

    glowY +=
        (mouseY - glowY) * 0.1;


    glow.style.left =
        glowX + "px";

    glow.style.top =
        glowY + "px";


    requestAnimationFrame(
        animateGlow
    );

}


animateGlow();




const buttons = document.querySelectorAll(
    ".hero-button, .project-button, .contact-button"
);


buttons.forEach(button => {

    button.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth < 768) {
                return;
            }

            const rect =
                button.getBoundingClientRect();

            const centerX =
                rect.left +
                rect.width / 2;

            const centerY =
                rect.top +
                rect.height / 2;

            const x =
                (
                    event.clientX -
                    centerX
                ) * 0.12;

            const y =
                (
                    event.clientY -
                    centerY
                ) * 0.12;

            button.style.transform =
                `translate(${x}px, ${y}px)`;

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform =
                "translate(0, 0)";

        }
    );

});





buttons.forEach(button => {

    button.style.position = "relative";
    button.style.overflow = "hidden";


    button.addEventListener(
        "click",
        event => {

            const rect =
                button.getBoundingClientRect();

            const circle =
                document.createElement("span");


            const size =
                Math.max(
                    rect.width,
                    rect.height
                );


            circle.style.position =
                "absolute";

            circle.style.width =
                size + "px";

            circle.style.height =
                size + "px";

            circle.style.borderRadius =
                "50%";

            circle.style.background =
                "rgba(255,255,255,0.35)";

            circle.style.pointerEvents =
                "none";

            circle.style.left =
                event.clientX -
                rect.left -
                size / 2 +
                "px";

            circle.style.top =
                event.clientY -
                rect.top -
                size / 2 +
                "px";

            circle.style.transform =
                "scale(0)";

            circle.style.opacity = "1";

            circle.style.transition =
                "transform 0.5s ease, opacity 0.5s ease";


            button.appendChild(circle);


            requestAnimationFrame(() => {

                circle.style.transform =
                    "scale(2)";

                circle.style.opacity = "0";

            });


            setTimeout(
                () => {
                    circle.remove();
                },
                500
            );

        }
    );

});





const hero =
    document.querySelector(".hero");


window.addEventListener(
    "scroll",
    () => {

        if (!hero) {
            return;
        }

        const scrollY =
            window.scrollY;

        if (
            scrollY <
            window.innerHeight
        ) {
            hero.style.transform =
                `translateY(${scrollY * 0.08}px)`;
        }

    }
);




const projectImages =
    document.querySelectorAll(
        ".project-image"
    );


projectImages.forEach(image => {

    image.style.transition =
        "transform 0.5s ease";


    image.parentElement.addEventListener(
        "mouseenter",
        () => {

            image.style.transform =
                "scale(1.06)";

        }
    );


    image.parentElement.addEventListener(
        "mouseleave",
        () => {

            image.style.transform =
                "scale(1)";

        }
    );

});





const aboutBoxes =
    document.querySelectorAll(
        ".about-box"
    );


aboutBoxes.forEach(box => {

    box.style.transition =
        "transform 0.3s ease, box-shadow 0.3s ease";


    box.addEventListener(
        "mouseenter",
        () => {

            box.style.transform =
                "translateY(-8px)";

            box.style.boxShadow =
                "0 15px 30px rgba(37, 99, 235, 0.12)";

        }
    );


    box.addEventListener(
        "mouseleave",
        () => {

            box.style.transform =
                "translateY(0)";

            box.style.boxShadow =
                "none";

        }
    );

});





const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");

            const target =
                document.querySelector(
                    targetId
                );


            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

});