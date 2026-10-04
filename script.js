const cursorGlow = document.querySelector(".cursor-glow");
const header = document.querySelector(".header");

const logoScene = document.getElementById("logoScene");
const logoCard = document.getElementById("logoCard");


// -----------------------------
// CURSOR GLOW
// -----------------------------

window.addEventListener("mousemove", (event) => {

  if (!cursorGlow) return;

  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;

});


// -----------------------------
// HEADER SCROLL
// -----------------------------

window.addEventListener("scroll", () => {

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

});


// -----------------------------
// LOGO 3D TILT
// -----------------------------

if (logoScene && logoCard) {

  logoScene.addEventListener("mousemove", (event) => {

    const rect = logoScene.getBoundingClientRect();

    const mouseX =
      event.clientX - rect.left;

    const mouseY =
      event.clientY - rect.top;

    const centerX =
      rect.width / 2;

    const centerY =
      rect.height / 2;

    const rotateY =
      ((mouseX - centerX) / centerX) * 12;

    const rotateX =
      ((centerY - mouseY) / centerY) * 12;

    logoCard.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(30px)
      scale(1.04)
    `;

  });


  logoScene.addEventListener("mouseleave", () => {

    logoCard.style.transform = `
      rotateX(0deg)
      rotateY(0deg)
      translateZ(0px)
      scale(1)
    `;

  });

}


// -----------------------------
// SCROLL REVEAL
// -----------------------------

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.12
    }

  );


revealElements.forEach((element) => {
  revealObserver.observe(element);
});


// -----------------------------
// PARALLAX
// -----------------------------

window.addEventListener("scroll", () => {

  const scroll =
    window.scrollY;

  const visual =
    document.querySelector(".hero-visual");

  if (visual) {

    visual.style.transform =
      `translateY(${scroll * 0.07}px)`;

  }

});


// -----------------------------
// SMOOTH NAVIGATION
// -----------------------------

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const target =
          document.querySelector(
            link.getAttribute("href")
          );

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth"
        });

      }
    );

  });