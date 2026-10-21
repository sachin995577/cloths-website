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


document.addEventListener("DOMContentLoaded", function () {

    const section = document.querySelector(".bestseller-section");

    if (!section) {
        console.log("Error: .bestseller-section nahi mila");
        return;
    }

    const heading = section.querySelector(".bestseller-heading");
    const cards = section.querySelectorAll(".bestseller-card");

    const elements = [];

    if (heading) {
        elements.push(heading);
    }

    cards.forEach(function (card) {
        elements.push(card);
    });

    if (!elements.length) return;

    section.classList.add("reveal-enabled");

    if (!("IntersectionObserver" in window)) {
        elements.forEach(function (element) {
            element.classList.add("reveal-visible");
        });
        return;
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: "0px 0px -30px 0px"
    });

    elements.forEach(function (element, index) {
        element.style.transitionDelay = (index * 80) + "ms";
        observer.observe(element);
    });

});

// SCROLL REVEAL START


document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(
        ".bestseller-carousel .bestseller-card"
    );

    if (!cards.length) return;

    /* Phone par text ko hide nahi karna */
    if (window.matchMedia("(max-width: 767px)").matches) {
        return;
    }

    document.documentElement.classList.add("bestseller-reveal-ready");

    const observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("bestseller-revealed");
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(function (card) {
        const heading = card.querySelector("h3");
        const price = card.querySelector(".bestseller-price");

        if (heading) observer.observe(heading);
        if (price) observer.observe(price);
    });
});


// SCROLL REVEAL END

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


// 6 IMAGE WEDDING START ANIMATION


document.addEventListener("DOMContentLoaded", function () {
    const headings = document.querySelectorAll(".occasion-title");

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("occasion-reveal-active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    headings.forEach(function (heading) {
        observer.observe(heading);
    });
});

//  6 IMAGE WEDDING END ANIMATION



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

// animation start juxaofficial



document.addEventListener("DOMContentLoaded", function () {
    const text = document.querySelector("p.juxar-reveal-text");

    if (!text) return;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("juxar-reveal-active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    observer.observe(text);
});

// animation start juxaoffical end


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

   
    // VIDEO KE NICHE TEXT WALA ANIAMTION SCROLL REVEAL START

    (function () {

    function initWatchBuyReveal() {

        const items = document.querySelectorAll(".watch-buy-info");

        if (!items.length) {
            return;
        }

        // Purane observers ya classes ke bina initial state
        items.forEach(function (item) {
            item.classList.remove("wb-reveal-active");
        });

        if (!("IntersectionObserver" in window)) {
            items.forEach(function (item) {
                item.classList.add("wb-reveal-active");
            });
            return;
        }

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("wb-reveal-active");
                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0,
            rootMargin: "0px 0px -40px 0px"
        });

        items.forEach(function (item) {
            observer.observe(item);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initWatchBuyReveal
        );
    } else {
        initWatchBuyReveal();
    }

})();

document.addEventListener("DOMContentLoaded", function () {

    const elements = document.querySelectorAll(
        ".watch-buy-section img, .watch-buy-section .watch-buy-info"
    );

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("wb-reveal-active");

                // Har element sirf ek baar animate hoga
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.1
    });

    elements.forEach(function (element) {
        observer.observe(element);
    });

});


    // VIDEO KE NICHE TEXT WALA ANIAMTION SCROLL REVEAL END 

//  4 icon end


// FOUR SCROLL REVEAL START

(function () {

    function initStatsReveal() {

        const items = document.querySelectorAll(
            ".stats-container .stat-item"
        );

        if (!items.length) return;

        if (!("IntersectionObserver" in window)) {
            items.forEach(function (item) {
                item.classList.add("stats-show");
            });
            return;
        }

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("stats-show");
                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.1
        });

        items.forEach(function (item, index) {
            item.style.transitionDelay = (index * 100) + "ms";
            observer.observe(item);
        });

    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initStatsReveal);
    } else {
        initStatsReveal();
    }

})();

// FOUR SCROLL REVEAL END


// CLOTH VIDEO START

  
document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".watch-buy-carousel");
    if (!carousel) return;

    const viewport = carousel.querySelector(".watch-buy-viewport");
    const track = carousel.querySelector(".watch-buy-track");
    const cards = Array.from(track.querySelectorAll(".watch-buy-card"));
    const prev = carousel.querySelector(".watch-buy-prev");
    const next = carousel.querySelector(".watch-buy-next");

    if (!viewport || !cards.length || !prev || !next) return;

    let index = 0;
    let step = 0;
    let maxIndex = 0;
    let startX = 0;
    let currentX = 0;
    let dragging = false;
    let moved = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let resizeFrame;

    function measure() {
        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;

        step = cardWidth + gap;

        const maxScroll = Math.max(
            0,
            track.scrollWidth - viewport.clientWidth
        );

        maxIndex = step > 0 ? Math.ceil(maxScroll / step) : 0;
        index = Math.min(index, maxIndex);

        render(false);
    }

    function render(animate = true) {
        const maxScroll = Math.max(
            0,
            track.scrollWidth - viewport.clientWidth
        );

        const position = Math.min(index * step, maxScroll);

        track.style.transition = animate
            ? "transform 600ms cubic-bezier(.22,.75,.25,1)"
            : "none";

        track.style.transform =
            `translate3d(${-position}px, 0, 0)`;
    }

    function moveNext() {
        index = index >= maxIndex ? 0 : index + 1;
        render(true);
    }

    function movePrev() {
        index = index <= 0 ? maxIndex : index - 1;
        render(true);
    }

    next.addEventListener("click", moveNext);
    prev.addEventListener("click", movePrev);

    // Play and pause videos
    cards.forEach(card => {
        const video = card.querySelector("video");
        const button = card.querySelector(".watch-buy-play");
        const videoBox = card.querySelector(".watch-buy-video");

        if (!video || !button || !videoBox) return;

        video.muted = true;
        video.playsInline = true;
        video.loop = true;

        video.addEventListener("play", () => {
            videoBox.classList.remove("is-paused");
            card.classList.add("is-zoomed");
            button.innerHTML = '<i class="fa-solid fa-pause"></i>';
        });

        video.addEventListener("pause", () => {
            videoBox.classList.add("is-paused");
            card.classList.remove("is-zoomed");
            button.innerHTML = '<i class="fa-solid fa-play"></i>';
        });

        button.addEventListener("click", async event => {
            event.preventDefault();
            event.stopPropagation();

            if (video.paused) {
                cards.forEach(otherCard => {
                    const otherVideo = otherCard.querySelector("video");
                    if (otherVideo && otherVideo !== video) {
                        otherVideo.pause();
                    }
                });

                try {
                    await video.play();
                } catch (error) {
                    console.error("Video play error:", error);
                }
            } else {
                video.pause();
            }
        });
    });

    // Desktop mouse drag
    viewport.addEventListener("pointerdown", event => {
        if (event.pointerType !== "mouse") return;
        if (event.target.closest("button, video")) return;

        dragging = true;
        moved = false;
        startX = event.clientX;
        currentX = startX;

        track.style.transition = "none";
        viewport.setPointerCapture(event.pointerId);
    });

    viewport.addEventListener("pointermove", event => {
        if (!dragging) return;

        currentX = event.clientX;
        if (Math.abs(currentX - startX) > 6) moved = true;

        const maxScroll = Math.max(
            0,
            track.scrollWidth - viewport.clientWidth
        );

        const position = Math.max(
            0,
            Math.min(index * step - (startX - currentX), maxScroll)
        );

        track.style.transform =
            `translate3d(${-position}px, 0, 0)`;
    });

    function finishDrag() {
        if (!dragging) return;

        dragging = false;
        const distance = currentX - startX;

        if (moved && Math.abs(distance) > 40) {
            distance < 0 ? moveNext() : movePrev();
        } else {
            render(true);
        }
    }

    viewport.addEventListener("pointerup", finishDrag);
    viewport.addEventListener("pointercancel", finishDrag);

    // Touch swipe, including two-finger horizontal movement
    function center(touches, axis) {
        let total = 0;

        for (let i = 0; i < touches.length; i++) {
            total += axis === "x"
                ? touches[i].clientX
                : touches[i].clientY;
        }

        return total / touches.length;
    }

    viewport.addEventListener("touchstart", event => {
        if (!event.touches.length) return;

        touchStartX = center(event.touches, "x");
        touchStartY = center(event.touches, "y");
        currentX = touchStartX;
        moved = false;
    }, { passive: true });

    viewport.addEventListener("touchmove", event => {
        if (!event.touches.length) return;

        currentX = center(event.touches, "x");

        const deltaX = currentX - touchStartX;
        const deltaY = center(event.touches, "y") - touchStartY;

        if (
            Math.abs(deltaX) > 8 &&
            Math.abs(deltaX) > Math.abs(deltaY)
        ) {
            moved = true;
        }
    }, { passive: true });

    viewport.addEventListener("touchend", () => {
        const distance = currentX - touchStartX;

        if (moved && Math.abs(distance) > 40) {
            distance < 0 ? moveNext() : movePrev();
        }
    }, { passive: true });

    viewport.addEventListener("touchcancel", () => {
        render(true);
    }, { passive: true });

    // Recalculate for every screen size
    window.addEventListener("resize", () => {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(measure);
    });

    measure();
});


document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".watch-buy-carousel");
    if (!carousel) return;

    const viewport = carousel.querySelector(".watch-buy-viewport");
    const track = carousel.querySelector(".watch-buy-track");
    const prev = carousel.querySelector(".watch-buy-prev");
    const next = carousel.querySelector(".watch-buy-next");

    if (!viewport || !track || !prev || !next) return;

    const originalCards = Array.from(
        track.querySelectorAll(".watch-buy-card")
    );

    if (!originalCards.length) return;

    const originalCount = originalCards.length;
    const cloneCount = Math.min(6, originalCount);

    // Clone beginning cards for smooth looping after video 10
    originalCards.slice(0, cloneCount).forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add("watch-buy-clone");
        track.appendChild(clone);
    });

    let cards = Array.from(track.querySelectorAll(".watch-buy-card"));
    let index = 0;
    let step = 0;
    let maxIndex = originalCount;
    let isAnimating = false;
    let startX = 0;
    let currentX = 0;
    let dragging = false;
    let moved = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let resizeFrame;

    function getGap() {
        return parseFloat(getComputedStyle(track).columnGap) || 0;
    }

    function measure() {
        cards = Array.from(track.querySelectorAll(".watch-buy-card"));

        const firstCard = cards[0];
        if (!firstCard) return;

        step = firstCard.getBoundingClientRect().width + getGap();

        render(false);
    }

    function render(animate = true) {
        if (!step) return;

        const target = index * step;

        track.style.transition = animate
            ? "transform 600ms cubic-bezier(.22,.75,.25,1)"
            : "none";

        track.style.transform = `translate3d(${-target}px,0,0)`;
    }

    function moveNext() {
        if (isAnimating) return;

        isAnimating = true;
        index++;
        render(true);
    }

    function movePrev() {
        if (isAnimating) return;

        if (index === 0) {
            // Jump to equivalent cloned position without visible animation
            index = originalCount;
            render(false);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    index = originalCount - 1;
                    isAnimating = true;
                    render(true);
                });
            });

            return;
        }

        index--;
        isAnimating = true;
        render(true);
    }

    next.addEventListener("click", moveNext);
    prev.addEventListener("click", movePrev);

    // Seamlessly reset after reaching the first cloned video
    track.addEventListener("transitionend", function (event) {
        if (event.target !== track || event.propertyName !== "transform") {
            return;
        }

        if (index >= originalCount) {
            index = 0;
            render(false);
        }

        isAnimating = false;
    });

    // Keep videos playing continuously; center button pauses or resumes
    function setupVideo(card) {
        const video = card.querySelector("video");
        const button = card.querySelector(".watch-buy-play");
        const box = card.querySelector(".watch-buy-video");

        if (!video || !button || !box) return;

        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute("playsinline", "");
        video.setAttribute("muted", "");

        function syncState() {
            const paused = video.paused || video.ended;

            box.classList.toggle("is-paused", paused);
            card.classList.toggle("is-zoomed", !paused);

            button.innerHTML = paused
                ? '<i class="fa-solid fa-play"></i>'
                : '<i class="fa-solid fa-pause"></i>';

            button.setAttribute(
                "aria-label",
                paused ? "Play video" : "Pause video"
            );
        }

        video.addEventListener("play", syncState);
        video.addEventListener("pause", syncState);
        video.addEventListener("ended", syncState);

        button.addEventListener("click", async function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (video.paused) {
                try {
                    await video.play();
                } catch (error) {
                    console.error("Video play error:", error);
                }
            } else {
                video.pause();
            }

            syncState();
        });

        // Muted autoplay is generally allowed; browser policies may vary
        video.play().catch(() => {
            syncState();
        });

        syncState();
    }

    cards.forEach(setupVideo);

    // Desktop mouse drag
    viewport.addEventListener("pointerdown", function (event) {
        if (event.pointerType !== "mouse") return;
        if (event.target.closest("button, video")) return;

        dragging = true;
        moved = false;
        startX = event.clientX;
        currentX = startX;

        track.style.transition = "none";
        viewport.setPointerCapture(event.pointerId);
    });

    viewport.addEventListener("pointermove", function (event) {
        if (!dragging) return;

        currentX = event.clientX;
        if (Math.abs(currentX - startX) > 6) moved = true;

        const maxScroll = Math.max(
            0,
            (originalCount + cloneCount) * step - getGap()
                - viewport.clientWidth
        );

        const position = Math.max(
            0,
            Math.min(index * step - (startX - currentX), maxScroll)
        );

        track.style.transform = `translate3d(${-position}px,0,0)`;
    });

    function finishDrag() {
        if (!dragging) return;

        dragging = false;
        const distance = currentX - startX;

        if (moved && Math.abs(distance) > 40) {
            distance < 0 ? moveNext() : movePrev();
        } else {
            render(true);
        }
    }

    viewport.addEventListener("pointerup", finishDrag);
    viewport.addEventListener("pointercancel", finishDrag);

    // One-finger or two-finger horizontal touch swipe
    function center(touches, axis) {
        let total = 0;

        for (let i = 0; i < touches.length; i++) {
            total += axis === "x"
                ? touches[i].clientX
                : touches[i].clientY;
        }

        return total / touches.length;
    }

    viewport.addEventListener("touchstart", function (event) {
        if (!event.touches.length) return;

        touchStartX = center(event.touches, "x");
        touchStartY = center(event.touches, "y");
        currentX = touchStartX;
        moved = false;
    }, { passive: true });

    viewport.addEventListener("touchmove", function (event) {
        if (!event.touches.length) return;

        currentX = center(event.touches, "x");

        const dx = currentX - touchStartX;
        const dy = center(event.touches, "y") - touchStartY;

        if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
            moved = true;
        }
    }, { passive: true });

    viewport.addEventListener("touchend", function () {
        const distance = currentX - touchStartX;

        if (moved && Math.abs(distance) > 40) {
            distance < 0 ? moveNext() : movePrev();
        }
    }, { passive: true });

    viewport.addEventListener("touchcancel", function () {
        render(true);
    }, { passive: true });

    window.addEventListener("resize", function () {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(measure);
    });

    measure();
});



// CLOTH VIDEO END


// NEWSLETTER PART START

const clothNewsletterForm = document.getElementById("clothNewsletterForm");
const clothNewsletterMessage = document.getElementById("clothNewsletterMessage");

if (clothNewsletterForm && clothNewsletterMessage) {
    clothNewsletterForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const emailInput = clothNewsletterForm.querySelector(
            ".cloth-newsletter-email"
        );

        if (!emailInput.checkValidity()) {
            emailInput.reportValidity();
            return;
        }

        clothNewsletterMessage.textContent =
            "Thank you for subscribing!";

        clothNewsletterForm.reset();
    });
}

// NEWSLETTER PART END



// OUR BRAND ANIMATION SCROLL REVEAL IMG START

(function () {

    function initBrandImages() {
        const images = document.querySelectorAll(
            ".clothing-brand-card img"
        );

        if (!images.length) return;

        if (!("IntersectionObserver" in window)) {
            images.forEach(function (img) {
                img.classList.add("brand-img-show");
            });
            return;
        }

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("brand-img-show");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05
        });

        images.forEach(function (img) {
            observer.observe(img);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initBrandImages);
    } else {
        initBrandImages();
    }

})();

// OUR BRAND ANIAMTION SCROLL REVEAL IMG END

 
 
// FOOTER START


document.addEventListener("DOMContentLoaded", function () {

    const footerElements = document.querySelectorAll(
        ".jx-footer a, .jx-footer p"
    );

    if (!("IntersectionObserver" in window)) {
        footerElements.forEach(function (element) {
            element.classList.add("jx-reveal-active");
        });
        return;
    }

    const footerObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("jx-reveal-active");
                } else {
                    entry.target.classList.remove("jx-reveal-active");
                }

            });

        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    footerElements.forEach(function (element) {
        footerObserver.observe(element);
    });

});


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



// JEWELERY PAGE START


// Extraordinary Gifts for Every Occasion start



document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector("#occasionSlider");

    if (!slider) {
        return;
    }

    const viewport = slider.querySelector(".occasion-viewport");
    const track = slider.querySelector(".occasion-track");
    const nextBtn = slider.querySelector(".occasion-next");
    const prevBtn = slider.querySelector(".occasion-prev");

    if (!viewport || !track || !nextBtn || !prevBtn) {
        return;
    }

    let index = 0;

    function getCards() {
        return Array.from(track.querySelectorAll(".occasion-card"));
    }

    function getVisibleCards() {
        if (window.innerWidth <= 767) return 1;
        if (window.innerWidth <= 1024) return 3;
        return 4;
    }

    function getStep() {
        const card = getCards()[0];
        if (!card) return 0;

        const trackStyle = window.getComputedStyle(track);
        const gap = parseFloat(trackStyle.columnGap) ||
                    parseFloat(trackStyle.gap) || 0;

        return card.getBoundingClientRect().width + gap;
    }

    function updateSlider() {
        const cards = getCards();
        if (!cards.length) return;

        const maxIndex = Math.max(
            0,
            cards.length - getVisibleCards()
        );

        index = Math.max(0, Math.min(index, maxIndex));

        track.style.transform = `translateX(-${index * getStep()}px)`;
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", function (event) {
            event.preventDefault();
            const cards = getCards();
            const maxIndex = Math.max(
                0,
                cards.length - getVisibleCards()
            );

            index = index >= maxIndex ? 0 : index + 1;
            updateSlider();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", function (event) {
            event.preventDefault();
            const cards = getCards();
            const maxIndex = Math.max(
                0,
                cards.length - getVisibleCards()
            );

            index = index <= 0 ? maxIndex : index - 1;
            updateSlider();
        });
    }

    window.addEventListener("resize", updateSlider);

    track.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";

    updateSlider();
});


// Extraordinary Gifts for Every Occasion end




/* =========================================
   CATEGORY IMAGE FLIP
========================================= */




/* =========================================
   CATEGORY IMAGE FLIP
========================================= */

document.querySelectorAll(".match-category-card").forEach((card) => {

    card.addEventListener("click", function (event) {

        const isTouchDevice =
            window.matchMedia("(hover: none)").matches;

        if (isTouchDevice) {
            event.preventDefault();

            this.classList.toggle("is-flipped");
        }

    });

});

document.querySelectorAll(".match-category-card").forEach((card) => {

    card.addEventListener("click", function (event) {

        if (window.matchMedia("(hover: none)").matches) {
            event.preventDefault();

            this.classList.toggle("is-flipped");
        }

    });

});



/* =========================================
   LUXURY BANNER ANIMATION CONTROL
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const banner = document.querySelector(".luxury-hero-banner");
    const bannerImage = document.querySelector(".luxury-banner-img");

    if (!banner || !bannerImage) {
        return;
    }

    /* Pause animation when banner is off-screen */

    const bannerObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    bannerImage.style.animationPlayState = "running";
                } else {
                    bannerImage.style.animationPlayState = "paused";
                }

            });

        },
        {
            threshold: 0.01
        }
    );

    bannerObserver.observe(banner);

});









