const header =
  document.querySelector(".header");

const cursorGlow =
  document.querySelector(".cursor-glow");

const menuButton =
  document.getElementById("menuButton");

const mobileMenu =
  document.getElementById("mobileMenu");

const model =
  document.getElementById("gymModel");

const fallbackLogo =
  document.getElementById("fallbackLogo");

const modelStage =
  document.querySelector(".model-stage");



// ==============================
// HEADER
// ==============================

function updateHeader() {

  if (window.scrollY > 40) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");

  }

}


window.addEventListener(
  "scroll",
  updateHeader,
  {
    passive: true
  }
);


updateHeader();



// ==============================
// CURSOR GLOW
// ==============================

if (
  cursorGlow &&
  window.matchMedia("(pointer: fine)").matches
) {

  window.addEventListener(
    "mousemove",
    (event) => {

      cursorGlow.style.left =
        `${event.clientX}px`;

      cursorGlow.style.top =
        `${event.clientY}px`;

    }
  );

}



// ==============================
// MOBILE MENU
// ==============================

function closeMobileMenu() {

  menuButton.classList.remove("active");

  mobileMenu.classList.remove("active");

  document.body.classList.remove(
    "menu-open"
  );

}


function toggleMobileMenu() {

  const opening =
    !mobileMenu.classList.contains(
      "active"
    );


  menuButton.classList.toggle(
    "active",
    opening
  );


  mobileMenu.classList.toggle(
    "active",
    opening
  );


  document.body.classList.toggle(
    "menu-open",
    opening
  );

}


menuButton.addEventListener(
  "click",
  toggleMobileMenu
);


mobileMenu
  .querySelectorAll("a")
  .forEach((link) => {

    link.addEventListener(
      "click",
      closeMobileMenu
    );

  });



window.addEventListener(
  "resize",
  () => {

    if (window.innerWidth > 1000) {

      closeMobileMenu();

    }

  }
);



// ==============================
// SCROLL REVEAL
// ==============================

const revealItems =
  document.querySelectorAll(".reveal");


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
      threshold: 0.10,

      rootMargin:
        "0px 0px -30px 0px"
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
  .forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {

          return;

        }


        const target =
          document.querySelector(
            targetId
          );


        if (!target) {

          return;

        }


        event.preventDefault();


        target.scrollIntoView({

          behavior: "smooth",

          block: "start"

        });

      }
    );

  });



// ==============================
// 3D MODEL
// ==============================

if (
  model &&
  fallbackLogo
) {

  // Default:
  // show fallback until GLB actually loads

  fallbackLogo.classList.remove(
    "hidden"
  );


  model.addEventListener(
    "load",
    () => {

      console.log(
        "GYM13 3D model loaded"
      );


      model.classList.add(
        "loaded"
      );


      fallbackLogo.classList.add(
        "hidden"
      );

    }
  );


  model.addEventListener(
    "error",
    () => {

      console.warn(
        "GLB model not found. Showing fallback logo."
      );


      model.classList.remove(
        "loaded"
      );


      fallbackLogo.classList.remove(
        "hidden"
      );

    }
  );

}



// ==============================
// 3D MOUSE REACTION
// ==============================

if (
  model &&
  modelStage &&
  window.matchMedia("(pointer: fine)").matches
) {

  modelStage.addEventListener(
    "mousemove",
    (event) => {

      if (
        !model.classList.contains(
          "loaded"
        )
      ) {

        return;

      }


      const rect =
        modelStage
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
        (x - 0.5) * 25;


      const vertical =
        75 +
        (y - 0.5) * 12;


      model.cameraOrbit =
        `${horizontal}deg ${vertical}deg 110%`;

    }
  );


  modelStage.addEventListener(
    "mouseleave",
    () => {

      model.cameraOrbit =
        "0deg 75deg 110%";

    }
  );

}



// ==============================
// FALLBACK MOUSE EFFECT
// ==============================

if (
  fallbackLogo &&
  modelStage &&
  window.matchMedia("(pointer: fine)").matches
) {

  modelStage.addEventListener(
    "mousemove",
    (event) => {

      if (
        fallbackLogo.classList.contains(
          "hidden"
        )
      ) {

        return;

      }


      const rect =
        modelStage
          .getBoundingClientRect();


      const x =
        event.clientX -
        rect.left;


      const y =
        event.clientY -
        rect.top;


      const rotateY =
        (
          x / rect.width -
          .5
        ) * 16;


      const rotateX =
        (
          .5 -
          y / rect.height
        ) * 12;


      fallbackLogo.style.transform =
        `
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateZ(20px)
        `;

    }
  );


  modelStage.addEventListener(
    "mouseleave",
    () => {

      fallbackLogo.style.transform = "";

    }
  );

}



// ==============================
// LIGHT PARALLAX
// ==============================

let ticking = false;


window.addEventListener(
  "scroll",
  () => {

    if (
      ticking ||
      window.innerWidth <= 700
    ) {

      return;

    }


    ticking = true;


    requestAnimationFrame(
      () => {

        const scroll =
          window.scrollY;


        const heroModel =
          document.querySelector(
            ".hero-model"
          );


        if (heroModel) {

          heroModel.style.transform =
            `translateY(${scroll * .035}px)`;

        }


        ticking = false;

      }
    );

  },
  {
    passive: true
  }
);