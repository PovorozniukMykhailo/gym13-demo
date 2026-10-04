import * as THREE from "three";

import {
  FontLoader
} from "three/addons/loaders/FontLoader.js";

import {
  TextGeometry
} from "three/addons/geometries/TextGeometry.js";

import {
  EffectComposer
} from "three/addons/postprocessing/EffectComposer.js";

import {
  RenderPass
} from "three/addons/postprocessing/RenderPass.js";

import {
  UnrealBloomPass
} from "three/addons/postprocessing/UnrealBloomPass.js";



// =========================================
// WEBSITE ELEMENTS
// =========================================

const header =
  document.querySelector(".header");

const cursorGlow =
  document.querySelector(".cursor-glow");

const menuButton =
  document.getElementById("menuButton");

const mobileMenu =
  document.getElementById("mobileMenu");



// =========================================
// HEADER
// =========================================

function updateHeader() {

  if (!header) {
    return;
  }


  if (
    window.scrollY > 40
  ) {

    header.classList.add(
      "scrolled"
    );

  } else {

    header.classList.remove(
      "scrolled"
    );

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



// =========================================
// CURSOR LIGHT
// =========================================

if (
  cursorGlow &&
  window.matchMedia(
    "(pointer: fine)"
  ).matches
) {

  window.addEventListener(
    "mousemove",
    event => {

      cursorGlow.style.left =
        `${event.clientX}px`;

      cursorGlow.style.top =
        `${event.clientY}px`;

    }
  );

}



// =========================================
// MOBILE MENU
// =========================================

function closeMenu() {

  if (
    !menuButton ||
    !mobileMenu
  ) {

    return;

  }


  menuButton.classList.remove(
    "active"
  );


  mobileMenu.classList.remove(
    "active"
  );


  document.body.classList.remove(
    "menu-open"
  );

}


if (
  menuButton &&
  mobileMenu
) {

  menuButton.addEventListener(
    "click",
    () => {

      const open =
        !mobileMenu.classList.contains(
          "active"
        );


      mobileMenu.classList.toggle(
        "active",
        open
      );


      menuButton.classList.toggle(
        "active",
        open
      );


      document.body.classList.toggle(
        "menu-open",
        open
      );

    }
  );


  mobileMenu
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        closeMenu
      );

    });


  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 1000
      ) {

        closeMenu();

      }

    }
  );

}



// =========================================
// SMOOTH LINKS
// =========================================

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const href =
          link.getAttribute(
            "href"
          );


        if (
          !href ||
          href === "#"
        ) {

          return;

        }


        const target =
          document.querySelector(
            href
          );


        if (!target) {
          return;
        }


        event.preventDefault();


        target.scrollIntoView({

          behavior:
            "smooth",

          block:
            "start"

        });

      }
    );

  });



// =========================================
// REVEAL
// =========================================

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


const revealObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(
        entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target
              .classList
              .add("visible");


            revealObserver.unobserve(
              entry.target
            );

          }

        }
      );

    },

    {

      threshold:
        .08,

      rootMargin:
        "0px 0px -20px 0px"

    }

  );


revealElements.forEach(
  element => {

    revealObserver.observe(
      element
    );

  }
);



// =========================================
// THREE.JS GYM13 LOGO
// =========================================

const container =
  document.getElementById(
    "gym3d"
  );

const loading =
  document.getElementById(
    "modelLoading"
  );


if (container) {

  // =====================================
  // SCENE
  // =====================================

  const scene =
    new THREE.Scene();


  const camera =
    new THREE.PerspectiveCamera(

      32,

      1,

      .1,

      100

    );


  camera.position.set(

    0,

    0,

    7.4

  );



  // =====================================
  // RENDERER
  // =====================================

  const renderer =
    new THREE.WebGLRenderer({

      antialias:
        true,

      alpha:
        true,

      powerPreference:
        "high-performance"

    });


  renderer.setClearColor(
    0x000000,
    0
  );


  renderer.outputColorSpace =
    THREE.SRGBColorSpace;


  renderer.toneMapping =
    THREE.ACESFilmicToneMapping;


  renderer.toneMappingExposure =
    1.15;


  renderer.setPixelRatio(

    Math.min(

      window.devicePixelRatio,

      window.innerWidth < 600
        ? 1.5
        : 2

    )

  );


  container.appendChild(
    renderer.domElement
  );



  // =====================================
  // POST PROCESSING
  // =====================================

  const composer =
    new EffectComposer(
      renderer
    );


  composer.addPass(

    new RenderPass(
      scene,
      camera
    )

  );


  const bloom =
    new UnrealBloomPass(

      new THREE.Vector2(
        800,
        800
      ),

      1.45,

      .55,

      .15

    );


  composer.addPass(
    bloom
  );



  // =====================================
  // LIGHTS
  // =====================================

  const ambientLight =
    new THREE.AmbientLight(

      0xffffff,

      .28

    );


  scene.add(
    ambientLight
  );



  const frontOrange =
    new THREE.PointLight(

      0xff5200,

      13,

      15

    );


  frontOrange.position.set(

    -3.2,

    2.5,

    4.5

  );


  scene.add(
    frontOrange
  );



  const sideOrange =
    new THREE.PointLight(

      0xff8a22,

      9,

      12

    );


  sideOrange.position.set(

    3,

    -1,

    4

  );


  scene.add(
    sideOrange
  );



  const backRed =
    new THREE.PointLight(

      0xff2400,

      12,

      10

    );


  backRed.position.set(

    0,

    1,

    -3

  );


  scene.add(
    backRed
  );



  // =====================================
  // LOGO GROUP
  // =====================================

  const logo =
    new THREE.Group();


  scene.add(
    logo
  );


  logo.rotation.x =
    -.08;


  logo.rotation.y =
    -.20;



  // =====================================
  // MATERIALS
  // =====================================

  const darkMaterial =
    new THREE.MeshPhysicalMaterial({

      color:
        0x070201,

      roughness:
        .42,

      metalness:
        .34,

      clearcoat:
        .55,

      clearcoatRoughness:
        .22,

      emissive:
        0x120200,

      emissiveIntensity:
        .5

    });



  const sideMaterial =
    new THREE.MeshPhysicalMaterial({

      color:
        0x5c1200,

      roughness:
        .38,

      metalness:
        .2,

      emissive:
        0xbb2400,

      emissiveIntensity:
        .7

    });



  const neonMaterial =
    new THREE.LineBasicMaterial({

      color:
        new THREE.Color(
          0xff7a00
        ),

      transparent:
        true,

      opacity:
        1

    });


  neonMaterial.toneMapped =
    false;



  const redGlowMaterial =
    new THREE.LineBasicMaterial({

      color:
        new THREE.Color(
          0xff2500
        ),

      transparent:
        true,

      opacity:
        .55,

      blending:
        THREE.AdditiveBlending

    });


  redGlowMaterial.toneMapped =
    false;



  // =====================================
  // CREATE TEXT
  // =====================================

  function create3DText(
    value,
    font,
    size,
    y,
    scaleX
  ) {

    const geometry =
      new TextGeometry(

        value,

        {

          font,

          size,

          depth:
            .40,

          curveSegments:
            16,

          bevelEnabled:
            true,

          bevelThickness:
            .045,

          bevelSize:
            .028,

          bevelOffset:
            0,

          bevelSegments:
            5

        }

      );


    geometry.computeBoundingBox();


    const bounds =
      geometry.boundingBox;


    const width =
      bounds.max.x -
      bounds.min.x;


    const height =
      bounds.max.y -
      bounds.min.y;


    geometry.translate(

      -(
        bounds.min.x +
        width / 2
      ),

      -(
        bounds.min.y +
        height / 2
      ),

      0

    );



    const group =
      new THREE.Group();


    group.position.y =
      y;


    group.scale.x =
      scaleX;



    // MAIN MESH

    const mesh =
      new THREE.Mesh(

        geometry,

        [
          darkMaterial,
          sideMaterial
        ]

      );


    group.add(
      mesh
    );



    // ORANGE OUTLINE

    const edgesGeometry =
      new THREE.EdgesGeometry(

        geometry,

        17

      );


    const neon =
      new THREE.LineSegments(

        edgesGeometry,

        neonMaterial

      );


    neon.position.z =
      .008;


    group.add(
      neon
    );



    // RED GLOW OUTLINE

    const glow =
      new THREE.LineSegments(

        edgesGeometry,

        redGlowMaterial

      );


    glow.scale.setScalar(
      1.012
    );


    glow.position.z =
      -.025;


    group.add(
      glow
    );



    logo.add(
      group
    );


    return group;

  }



  // =====================================
  // FONT
  // =====================================

  const fontLoader =
    new FontLoader();


  fontLoader.load(

    "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/fonts/helvetiker_bold.typeface.json",

    font => {

      create3DText(

        "GYM",

        font,

        1.24,

        .80,

        .98

      );


      create3DText(

        "13",

        font,

        1.58,

        -.85,

        .96

      );


      logo.scale.setScalar(
        1.14
      );


      if (loading) {

        loading.classList.add(
          "hidden"
        );

      }

    },


    undefined,


    error => {

      console.error(
        "3D font loading error:",
        error
      );

    }

  );



  // =====================================
  // ROTATION
  // =====================================

  let targetRotationX =
    -.08;


  let targetRotationY =
    -.20;


  let currentRotationX =
    -.08;


  let currentRotationY =
    -.20;


  let dragging =
    false;


  let dragStartX =
    0;


  let dragStartY =
    0;



  container.addEventListener(

    "pointerdown",

    event => {

      dragging =
        true;


      dragStartX =
        event.clientX;


      dragStartY =
        event.clientY;


      if (
        event.pointerType === "mouse"
      ) {

        container.setPointerCapture(
          event.pointerId
        );

      }

    }

  );



  container.addEventListener(

    "pointermove",

    event => {

      if (!dragging) {
        return;
      }


      const deltaX =
        event.clientX -
        dragStartX;


      const deltaY =
        event.clientY -
        dragStartY;


      dragStartX =
        event.clientX;


      dragStartY =
        event.clientY;


      targetRotationY +=

        deltaX *
        .009;


      targetRotationX +=

        deltaY *
        .006;


      targetRotationX =
        THREE.MathUtils.clamp(

          targetRotationX,

          -.42,

          .42

        );

    }

  );



  function stopDragging() {

    dragging =
      false;

  }


  container.addEventListener(
    "pointerup",
    stopDragging
  );


  container.addEventListener(
    "pointercancel",
    stopDragging
  );


  container.addEventListener(
    "pointerleave",
    () => {

      if (
        !window.matchMedia(
          "(pointer: coarse)"
        ).matches
      ) {

        stopDragging();

      }

    }
  );



  // =====================================
  // MOUSE PARALLAX
  // =====================================

  let mouseX =
    0;


  let mouseY =
    0;


  if (
    window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {

    container.addEventListener(

      "mousemove",

      event => {

        if (dragging) {
          return;
        }


        const rect =
          container
            .getBoundingClientRect();


        mouseX =
          (
            event.clientX -
            rect.left -
            rect.width / 2
          ) /
          rect.width;


        mouseY =
          (
            event.clientY -
            rect.top -
            rect.height / 2
          ) /
          rect.height;

      }

    );


    container.addEventListener(

      "mouseleave",

      () => {

        mouseX =
          0;


        mouseY =
          0;

      }

    );

  }



  // =====================================
  // RESIZE
  // =====================================

  function resizeRenderer() {

    const rect =
      container
        .getBoundingClientRect();


    const width =
      Math.max(
        rect.width,
        1
      );


    const height =
      Math.max(
        rect.height,
        1
      );


    renderer.setSize(

      width,

      height,

      false

    );


    composer.setSize(

      width,

      height

    );


    camera.aspect =
      width / height;


    camera.updateProjectionMatrix();



    if (
      width < 500
    ) {

      camera.position.z =
        7.8;


      logo.scale.setScalar(
        1.0
      );

    } else {

      camera.position.z =
        7.4;


      logo.scale.setScalar(
        1.14
      );

    }

  }


  resizeRenderer();


  const resizeObserver =
    new ResizeObserver(
      resizeRenderer
    );


  resizeObserver.observe(
    container
  );



  // =====================================
  // ANIMATION LOOP
  // =====================================

  const clock =
    new THREE.Clock();


  function animate() {

    requestAnimationFrame(
      animate
    );


    const delta =
      Math.min(
        clock.getDelta(),
        .05
      );



    // AUTO ROTATION

    if (!dragging) {

      targetRotationY +=
        delta * .12;

    }



    currentRotationX +=

      (
        targetRotationX -
        currentRotationX
      ) *
      .065;



    currentRotationY +=

      (
        targetRotationY -
        currentRotationY
      ) *
      .065;



    logo.rotation.x =

      currentRotationX +

      mouseY * .10;



    logo.rotation.y =

      currentRotationY +

      mouseX * .12;



    // FLOAT

    logo.position.y =

      Math.sin(

        performance.now() *
        .00115

      ) * .045;



    composer.render();

  }


  animate();

}