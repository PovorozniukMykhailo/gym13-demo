const cursorGlow =
  document.querySelector(".cursor-glow");

const header =
  document.querySelector(".header");

const model =
  document.getElementById("gymModel");



// ==============================
// CURSOR LIGHT
// ==============================

window.addEventListener(
  "mousemove",
  (event) => {

    if (!cursorGlow) return;

    cursorGlow.style.left =
      `${event.clientX}px`;

    cursorGlow.style.top =
      `${event.clientY}px`;

  }
);



// ==============================
// HEADER
// ==============================

window.addEventListener(
  "scroll",
  () => {

    if (window.scrollY > 40) {

      header.classList.add(
        "scrolled"
      );

    } else {

      header.classList.remove(
        "scrolled"
      );

    }

  }
);



// ==============================
// REVEAL ANIMATION
// ==============================

const revealItems =
  document.querySelectorAll(
    ".reveal"
  );


const observer =
  new IntersectionObserver(

    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target
              .classList
              .add("visible");

            observer.unobserve(
              entry.target
            );

          }

        }
      );

    },

    {
      threshold: 0.12
    }

  );


revealItems.forEach(
  (item) => {

    observer.observe(item);

  }
);



// ==============================
// SMOOTH LINKS
// ==============================

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          const id =
            link.getAttribute(
              "href"
            );


          if (
            id === "#"
          ) {

            return;

          }


          const target =
            document.querySelector(
              id
            );


          if (!target) return;


          event.preventDefault();


          target.scrollIntoView({

            behavior:
              "smooth",

            block:
              "start"

          });

        }
      );

    }
  );



// ==============================
// MODEL MOUSE REACTION
// ==============================

if (model) {

  const modelArea =
    document.querySelector(
      ".hero-model-area"
    );


  modelArea.addEventListener(
    "mousemove",
    (event) => {

      const rect =
        modelArea
          .getBoundingClientRect();


      const x =
        (
          event.clientX -
          rect.left
        )
        /
        rect.width;


      const y =
        (
          event.clientY -
          rect.top
        )
        /
        rect.height;


      const horizontal =
        (x - 0.5) * 35;


      const vertical =
        72 +
        (y - 0.5) * 14;


      model.cameraOrbit =
        `${horizontal}deg ${vertical}deg 105%`;

    }
  );


  modelArea.addEventListener(
    "mouseleave",
    () => {

      model.cameraOrbit =
        "0deg 75deg 105%";

    }
  );

}



// ==============================
// HERO PARALLAX
// ==============================

window.addEventListener(
  "scroll",
  () => {

    const scroll =
      window.scrollY;


    const modelArea =
      document.querySelector(
        ".hero-model-area"
      );


    const content =
      document.querySelector(
        ".hero-content"
      );


    if (modelArea) {

      modelArea.style.transform =
        `translateY(${scroll * 0.045}px)`;

    }


    if (content) {

      content.style.transform =
        `translateY(${scroll * 0.018}px)`;

    }

  }
);



// ==============================
// MODEL LOADED
// ==============================

if (model) {

  model.addEventListener(
    "load",
    () => {

      model.style.opacity =
        "1";

    }
  );


  model.addEventListener(
    "error",
    () => {

      console.error(
        "GYM13 3D model could not be loaded."
      );

    }
  );

}