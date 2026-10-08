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




// SHOP BY CATEGORY START

/* ==================================================
   SHOP BY CATEGORY CAROUSEL
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const sections = document.querySelectorAll(".bestseller-section");


    sections.forEach(function (section) {

        const track = section.querySelector(".bestseller-track");
        const cards = section.querySelectorAll(".bestseller-card");
        const prevButton = section.querySelector(".bestseller-prev");
        const nextButton = section.querySelector(".bestseller-next");


        if (!track || !cards.length || !prevButton || !nextButton) {
            return;
        }


        let currentIndex = 0;


        /* ==============================================
           VISIBLE CARDS
        ============================================== */

        function getVisibleCards() {

            const width = window.innerWidth;

            if (width <= 767) {
                return 1;
            }

            if (width <= 1024) {
                return 3;
            }

            return 4;
        }


        /* ==============================================
           UPDATE CAROUSEL
        ============================================== */

        function updateCarousel() {

            const visibleCards = getVisibleCards();

            const totalCards = cards.length;

            const maxIndex = Math.max(
                0,
                totalCards - visibleCards
            );


            /* INDEX LIMIT */

            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }

            if (currentIndex < 0) {
                currentIndex = 0;
            }


            /* ==========================================
               CARD WIDTH
            ========================================== */

            const cardWidth = 100 / visibleCards;


            /* ==========================================
               MOVE TRACK
            ========================================== */

            const moveX = currentIndex * cardWidth;


            track.style.transform =
                "translate3d(-" + moveX + "%, 0, 0)";


            /* ==========================================
               PREVIOUS BUTTON
            ========================================== */

            if (currentIndex === 0) {

                prevButton.disabled = true;
                prevButton.style.opacity = "0.35";
                prevButton.style.cursor = "default";

            } else {

                prevButton.disabled = false;
                prevButton.style.opacity = "1";
                prevButton.style.cursor = "pointer";
            }


            /* ==========================================
               NEXT BUTTON
            ========================================== */

            if (currentIndex >= maxIndex) {

                nextButton.disabled = true;
                nextButton.style.opacity = "0.35";
                nextButton.style.cursor = "default";

            } else {

                nextButton.disabled = false;
                nextButton.style.opacity = "1";
                nextButton.style.cursor = "pointer";
            }

        }


        /* ==============================================
           NEXT
        ============================================== */

        nextButton.addEventListener("click", function (event) {

            event.preventDefault();

            const visibleCards = getVisibleCards();

            const maxIndex = Math.max(
                0,
                cards.length - visibleCards
            );


            if (currentIndex < maxIndex) {

                currentIndex++;

                updateCarousel();
            }

        });


        /* ==============================================
           PREVIOUS
        ============================================== */

        prevButton.addEventListener("click", function (event) {

            event.preventDefault();


            if (currentIndex > 0) {

                currentIndex--;

                updateCarousel();
            }

        });


        /* ==============================================
           RESIZE
        ============================================== */

        window.addEventListener("resize", function () {

            updateCarousel();

        });


        /* ==============================================
           INITIAL
        ============================================== */

        updateCarousel();

    });

});


// SHOP BY CATEGORY END



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


// INSTAGRAM SECTION START

document.addEventListener("DOMContentLoaded", function () {

    const track = document.querySelector(".jx-instagram-track");
    const cards = document.querySelectorAll(".jx-instagram-card");

    const nextBtn = document.querySelector(".jx-instagram-next");
    const prevBtn = document.querySelector(".jx-instagram-prev");

    let currentIndex = 0;
    let autoSlide;

    /* ================= VISIBLE ITEMS ================= */

    function getVisibleItems() {

        /* 320 - 400 = 2 IMAGES */
        if (window.innerWidth >= 320 && window.innerWidth <= 400) {
            return 2;
        }

        /* 401 - 767 = 1 IMAGE */
        if (window.innerWidth >= 401 && window.innerWidth <= 767) {
            return 1;
        }

        /* 768 - 1024 = 3 IMAGES */
        if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
            return 3;
        }

        /* 1025 - 2560 = 5 IMAGES */
        return 5;
    }

    /* ================= MAX INDEX ================= */

    function getMaxIndex() {

        const visibleItems = getVisibleItems();

        return Math.max(0, cards.length - visibleItems);
    }

    /* ================= UPDATE SLIDER ================= */

    function updateSlider() {

        const gap = 5;

        if (!cards.length) {
            return;
        }

        const cardWidth = cards[0].getBoundingClientRect().width;

        const moveAmount = cardWidth + gap;

        track.style.transform =
            `translateX(-${currentIndex * moveAmount}px)`;
    }

    /* ================= NEXT ================= */

    function nextSlide() {

        const maxIndex = getMaxIndex();

        /*
        Last image/group par pahunchne ke baad
        blank area me nahi jayega.
        Pehle last position par rukega.
        Agli movement par first slide par aa jayega.
        */

        if (currentIndex < maxIndex) {

            currentIndex++;

        } else {

            currentIndex = 0;

        }

        updateSlider();
    }

    /* ================= PREVIOUS ================= */

    function previousSlide() {

        const maxIndex = getMaxIndex();

        if (currentIndex > 0) {

            currentIndex--;

        } else {

            currentIndex = maxIndex;

        }

        updateSlider();
    }

    /* ================= NEXT BUTTON ================= */

    nextBtn.addEventListener("click", function () {

        nextSlide();

        restartAutoSlide();

    });

    /* ================= PREVIOUS BUTTON ================= */

    prevBtn.addEventListener("click", function () {

        previousSlide();

        restartAutoSlide();

    });

    /* ================= AUTO SLIDE ================= */

    function startAutoSlide() {

        autoSlide = setInterval(function () {

            nextSlide();

        }, 3500);

    }

    /* ================= RESTART AUTO SLIDE ================= */

    function restartAutoSlide() {

        clearInterval(autoSlide);

        startAutoSlide();

    }

    /* ================= RESIZE ================= */

    window.addEventListener("resize", function () {

        const maxIndex = getMaxIndex();

        if (currentIndex > maxIndex) {

            currentIndex = maxIndex;

        }

        updateSlider();

    });

    /* ================= START ================= */

    updateSlider();

    startAutoSlide();

});


// INSTAGRAM SECTION END

  

// 4 icon start

document.addEventListener("DOMContentLoaded", () => {
      const counters = document.querySelectorAll('.counter');
      const speed = 200; // Counter speed lower is faster

      const animateCounters = () => {
        counters.forEach(counter => {
          const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = Math.max(1, Math.ceil(target / speed));

            if (count < target) {
              counter.innerText = Math.min(count + inc, target);
              setTimeout(updateCount, 25);
            } else {
              counter.innerText = target;
            }
          };
          updateCount();
        });
      };

      // Intersection Observer so animation starts when scrolled into view
      let observerOptions = {
        threshold: 0.4
      };

      let hasAnimated = false;

      let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            animateCounters();
            hasAnimated = true; // Run only once
          }
        });
      }, observerOptions);

      const targetSection = document.querySelector('.stats-container');
      if (targetSection) {
        observer.observe(targetSection);
      }
    });

//  4 icon end


// CLOTH VIDEO START

document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".cloth-video-slider");

    if (!slider) {
        return;
    }

    const videos = slider.querySelectorAll("video");

    videos.forEach(function (video) {

        video.muted = true;
        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");

        video.play().catch(function () {});

        video.addEventListener("loadeddata", function () {
            video.play().catch(function () {});
        });

    });

});


// CLOTH VIDEO END

 
 
// FOOTER START



document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop = document.getElementById("jxBackTop");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 250) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }

    });


    backTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================================
       NEWSLETTER
    ===================================================== */

    const newsletterForm =
        document.getElementById("jxNewsletterForm");

    const emailInput =
        document.getElementById("jxEmailInput");


    /* Placeholder automatically disappears on focus */

    emailInput.addEventListener("focus", function () {
        this.setAttribute("placeholder", "");
    });


    emailInput.addEventListener("blur", function () {

        if (this.value.trim() === "") {
            this.setAttribute(
                "placeholder",
                "Your email address"
            );
        }

    });


    /* =====================================================
       SUBSCRIBE
    ===================================================== */

    newsletterForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (emailInput.value.trim() === "") {
            emailInput.focus();
            return;
        }

        alert("Thank you for subscribing!");

        emailInput.value = "";

        emailInput.setAttribute(
            "placeholder",
            "Your email address"
        );

    });

});




//  FOOTER END


/* =========================================
   SCROLL IMAGE ANIMATION SCROLL KARNE PE START
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const scrollImages = document.querySelectorAll(
        ".bestseller-image-box img, " +
        ".designer-card img, " +
        ".occasion-card img, " +
        ".jx-instagram-card img, " +
        ".clothing-brand-card img"
    );

    if (!scrollImages.length) {
        return;
    }

    const imageObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("scroll-image-show");
                } else {
                    entry.target.classList.remove("scroll-image-show");
                }

            });

        },
        {
            threshold: 0.20,
            rootMargin: "0px 0px -8% 0px"
        }
    );

    scrollImages.forEach(function (image) {
        imageObserver.observe(image);
    });

});

// SCROLL KARNE PE START ANIMATION IMAGE END




// SCROLL REVEAL SECTION ALL HEADING START

/* =========================================================
   HEADING SCROLL REVEAL
   ONLY SECTION HEADINGS
   PRODUCT / CLOTH NAMES EXCLUDED
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const headingElements = document.querySelectorAll(
        ".fashion-banner-content h1, " +
        ".bestseller-heading, " +
        ".designer-heading, " +
        ".occasion-heading, " +
        ".jx-instagram-heading h2, " +
        ".clothing-brands-title, " +
        ".cloth-video-title, " +
        ".jx-footer-column h3"
    );

    if (!headingElements.length) {
        return;
    }

    headingElements.forEach(function (heading) {
        heading.classList.add("heading-scroll-reveal");
    });


    /* =====================================================
       INTERSECTION OBSERVER
       ===================================================== */

    if ("IntersectionObserver" in window) {

        const headingObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "heading-scroll-show"
                        );

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        headingElements.forEach(function (heading) {
            headingObserver.observe(heading);
        });

    } else {

        headingElements.forEach(function (heading) {
            heading.classList.add("heading-scroll-show");
        });

    }

});

// SCROLL REVEAL SECTION ALL HEADING SECTION END'



// FINAL FIRST PAGE COMPLETE




// SECOND PAGE START


// WOMEN PAGE ALL CODE

const productBoxes = document.querySelectorAll(".tshirt-image-box");


productBoxes.forEach((box) => {

    box.addEventListener("click", function (event) {

        /* Quick shop buttons par click karne par image toggle nahi hoga */
        if (
            event.target.closest(".quick-shop") ||
            event.target.closest(".icon-btn") ||
            event.target.closest(".quick-shop-link")
        ) {
            return;
        }


        /* Baaki cards se active remove */
        productBoxes.forEach((item) => {

            if (item !== box) {
                item.classList.remove("touch-active");
            }

        });


        /* Current card toggle */
        box.classList.toggle("touch-active");

    });

});


// WOMEN PAGE ALL CODE END


