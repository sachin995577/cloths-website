// NAVBAR START

/* ==================================================
   ELEMENTS
================================================== */

const openMenu = document.getElementById("openMenu");

const closeMenu = document.getElementById("closeMenu");

const mobileMenu = document.getElementById("mobileMenu");

const popupOverlay = document.getElementById("popupOverlay");

const popupTriggers =
    document.querySelectorAll("[data-popup]");

const popupBoxes =
    document.querySelectorAll(".popup-box");

const popupCloseButtons =
    document.querySelectorAll(".popup-close");

const mobileLinks =
    document.querySelectorAll(".mobile-nav a");

const searchInputs =
    document.querySelectorAll(
        ".search-box input, .mobile-search-box input"
    );


/* ==================================================
   CHECK MOBILE / TABLET
   ONLY 320 - 768
================================================== */

function isMobileTablet() {

    return window.innerWidth <= 768;

}


/* ==================================================
   OPEN MOBILE MENU
================================================== */

if (openMenu) {

    openMenu.addEventListener("click", function (event) {

        event.stopPropagation();


        if (!isMobileTablet()) {

            return;

        }


        if (mobileMenu) {

            mobileMenu.classList.add("active");

        }

    });

}


/* ==================================================
   CLOSE MOBILE MENU
================================================== */

function closeMobileMenu() {

    if (mobileMenu) {

        mobileMenu.classList.remove("active");

    }

}


if (closeMenu) {

    closeMenu.addEventListener("click", function () {

        closeMobileMenu();

    });

}


/* ==================================================
   OPEN POPUP
================================================== */

function openPopup(popupId) {


    /* Close mobile menu */

    closeMobileMenu();


    /* Close other popups */

    popupBoxes.forEach(function (popup) {

        popup.classList.remove("active");

    });


    /* Find popup */

    const selectedPopup =
        document.getElementById(popupId);


    if (!selectedPopup) {

        return;

    }


    /* Open popup */

    selectedPopup.classList.add("active");


    if (popupOverlay) {

        popupOverlay.classList.add("active");

    }

}


/* ==================================================
   CLOSE POPUP
================================================== */

function closePopup() {


    popupBoxes.forEach(function (popup) {

        popup.classList.remove("active");

    });


    if (popupOverlay) {

        popupOverlay.classList.remove("active");

    }

}


/* ==================================================
   POPUP TRIGGERS
================================================== */

popupTriggers.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();


        const popupId =
            button.getAttribute("data-popup");


        if (!popupId) {

            return;

        }


        openPopup(popupId);

    });

});


/* ==================================================
   POPUP CLOSE BUTTON
================================================== */

popupCloseButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        closePopup();

    });

});


/* ==================================================
   OVERLAY CLICK
================================================== */

if (popupOverlay) {

    popupOverlay.addEventListener("click", function () {

        closePopup();

    });

}


/* ==================================================
   ESC KEY
================================================== */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closePopup();

        closeMobileMenu();

    }

});


/* ==================================================
   MOBILE LINKS
================================================== */

mobileLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        closeMobileMenu();

    });

});


/* ==================================================
   CLICK OUTSIDE MOBILE MENU
================================================== */

document.addEventListener("click", function (event) {


    if (!mobileMenu) {

        return;

    }


    if (!mobileMenu.classList.contains("active")) {

        return;

    }


    const clickedInsideMenu =
        mobileMenu.contains(event.target);


    const clickedHamburger =
        openMenu &&
        openMenu.contains(event.target);


    if (
        !clickedInsideMenu &&
        !clickedHamburger
    ) {

        closeMobileMenu();

    }

});


/* ==================================================
   SEARCH
   NO POPUP
================================================== */

searchInputs.forEach(function (input) {


    input.addEventListener("focus", function () {

        const box = input.parentElement;


        if (box) {

            box.classList.add("active");

        }

    });


    input.addEventListener("blur", function () {

        const box = input.parentElement;


        if (box) {

            box.classList.remove("active");

        }

    });


    /* ENTER SEARCH */

    input.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();


            const value =
                input.value.trim();


            if (value !== "") {

                console.log(
                    "Search:",
                    value
                );

            }

        }

    });

});


/* ==================================================
   RESIZE
   769px+ PAR MOBILE MENU CLOSE
================================================== */

window.addEventListener("resize", function () {


    if (!isMobileTablet()) {

        closeMobileMenu();

    }

});


/* ==================================================
   INITIAL CHECK
================================================== */

if (!isMobileTablet()) {

    closeMobileMenu();

}



// NAVBAR END



// CAROUSEL BANNER START



const fashionSlides = document.querySelectorAll(
    ".fashion-banner-slide"
);

const fashionDots = document.querySelectorAll(
    ".fashion-banner-dot"
);

let fashionCurrentSlide = 0;

let fashionSlideTimer;


/* ==================================================
   SHOW SLIDE
================================================== */

function showFashionSlide(index) {

    fashionSlides.forEach((slide) => {
        slide.classList.remove("active");
    });


    fashionDots.forEach((dot) => {
        dot.classList.remove("active");
    });


    fashionSlides[index].classList.add("active");

    fashionDots[index].classList.add("active");


    fashionCurrentSlide = index;
}


/* ==================================================
   NEXT SLIDE
================================================== */

function nextFashionSlide() {

    fashionCurrentSlide++;

    if (fashionCurrentSlide >= fashionSlides.length) {
        fashionCurrentSlide = 0;
    }

    showFashionSlide(fashionCurrentSlide);
}


/* ==================================================
   AUTOMATIC SLIDE
================================================== */

function startFashionSlider() {

    clearInterval(fashionSlideTimer);

    fashionSlideTimer = setInterval(
        nextFashionSlide,
        2800
    );
}


/* ==================================================
   DOT CLICK
================================================== */

fashionDots.forEach((dot) => {

    dot.addEventListener("click", function () {

        const selectedSlide = Number(
            this.getAttribute("data-slide")
        );

        showFashionSlide(selectedSlide);

        startFashionSlider();

    });

});


/* ==================================================
   START SLIDER
================================================== */

showFashionSlide(0);

startFashionSlider();



// CAROUSEL BANNER END


// BESTSELLER ON SALE START


document.addEventListener("DOMContentLoaded", function () {

    const track = document.querySelector(".bestseller-track");
    const cards = document.querySelectorAll(".bestseller-card");

    const prevButton = document.querySelector(".bestseller-prev");
    const nextButton = document.querySelector(".bestseller-next");

    let currentIndex = 0;


    /* ==============================================
       VISIBLE CARDS
    ============================================== */

    function getVisibleCards() {

        if (window.innerWidth <= 767) {
            return 1;
        }

        if (window.innerWidth <= 1024) {
            return 3;
        }

        return 4;
    }


    /* ==============================================
       UPDATE SLIDER
    ============================================== */

    function updateSlider() {

        const visibleCards = getVisibleCards();

        const maxIndex = cards.length - visibleCards;

        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }

        if (currentIndex < 0) {
            currentIndex = 0;
        }

        const movePercentage = 100 / visibleCards;

        track.style.transform =
            "translateX(-" + (currentIndex * movePercentage) + "%)";


        /* DISABLE PREVIOUS */

        if (currentIndex === 0) {
            prevButton.style.opacity = "0.4";
            prevButton.style.pointerEvents = "none";
        } else {
            prevButton.style.opacity = "1";
            prevButton.style.pointerEvents = "auto";
        }


        /* DISABLE NEXT */

        if (currentIndex >= maxIndex) {
            nextButton.style.opacity = "0.4";
            nextButton.style.pointerEvents = "none";
        } else {
            nextButton.style.opacity = "1";
            nextButton.style.pointerEvents = "auto";
        }

    }


    /* ==============================================
       NEXT
    ============================================== */

    nextButton.addEventListener("click", function () {

        const visibleCards = getVisibleCards();

        const maxIndex = cards.length - visibleCards;

        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }

    });


    /* ==============================================
       PREVIOUS
    ============================================== */

    prevButton.addEventListener("click", function () {

        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }

    });


    /* ==============================================
       RESIZE
    ============================================== */

    window.addEventListener("resize", function () {
        updateSlider();
    });


    /* ==============================================
       INITIAL
    ============================================== */

    updateSlider();

});

// BESTSELLER ON SALE END



/* ==================================================
    // DESIGNER SPORTLIGHT CAROUSEL START
================================================== */

const designerTrack = document.querySelector(".designer-track");
const designerCards = document.querySelectorAll(".designer-card");
const designerPrev = document.querySelector(".designer-prev");
const designerNext = document.querySelector(".designer-next");

let designerIndex = 0;


/* GET VISIBLE CARD COUNT */

function getDesignerVisibleCount() {

    if (window.innerWidth <= 767) {
        return 1;
    }

    if (window.innerWidth <= 1024) {
        return 3;
    }

    return 5;
}


/* UPDATE CAROUSEL */

function updateDesignerCarousel() {

    const visibleCount = getDesignerVisibleCount();

    const maxIndex = designerCards.length - visibleCount;

    if (designerIndex > maxIndex) {
        designerIndex = maxIndex;
    }

    if (designerIndex < 0) {
        designerIndex = 0;
    }

    const cardWidth = designerCards[0].getBoundingClientRect().width;

    const trackStyle = window.getComputedStyle(designerTrack);

    const gap = parseFloat(trackStyle.columnGap) || 0;

    const moveAmount = cardWidth + gap;

    designerTrack.style.transform =
        `translateX(-${designerIndex * moveAmount}px)`;
}


/* NEXT */

designerNext.addEventListener("click", function () {

    const visibleCount = getDesignerVisibleCount();

    const maxIndex = designerCards.length - visibleCount;

    if (designerIndex < maxIndex) {
        designerIndex++;
        updateDesignerCarousel();
    }

});


/* PREVIOUS */

designerPrev.addEventListener("click", function () {

    if (designerIndex > 0) {
        designerIndex--;
        updateDesignerCarousel();
    }

});


/* RESIZE */

window.addEventListener("resize", function () {
    updateDesignerCarousel();
});


/* INITIAL */

window.addEventListener("load", function () {
    updateDesignerCarousel();
});




// DESIGNER SPORTLIGHT END CAROUSEL



// FOOTER START

/* ==================================================
   FOOTER SOCIAL ICON INTERACTION
================================================== */

const socialIcons = document.querySelectorAll(".social-icon");

socialIcons.forEach((icon) => {

    icon.addEventListener("mouseenter", () => {

        icon.style.setProperty("--hover-state", "1");

    });


    icon.addEventListener("mouseleave", () => {

        icon.style.setProperty("--hover-state", "0");

    });

});


/* ==================================================
   FOOTER MENU ACTIVE EFFECT
================================================== */

const footerLinks = document.querySelectorAll(".footer-menu a");

footerLinks.forEach((link) => {

    link.addEventListener("click", function () {

        footerLinks.forEach((item) => {
            item.classList.remove("footer-active");
        });

        this.classList.add("footer-active");

    });

});


/* ==================================================
   FOOTER REVEAL ON SCROLL
================================================== */

const footer = document.querySelector(".main-footer");

const footerObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                footer.classList.add("footer-visible");

            }

        });

    },

    {
        threshold: 0.15
    }

);


if (footer) {
    footerObserver.observe(footer);
}

// FOOTER END