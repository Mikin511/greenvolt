/* ============================================================
   MIKIN SOLAR DESIGN - script.js
   Vanilla JavaScript - all site interactions.
   ============================================================ */

"use strict";

/* ============================================================
   ============================================================
   EMAILJS SETUP INSTRUCTIONS (REQUIRED for the forms to work)
   ============================================================

   The review form and contact form both send email to
   mikinvp4@gmail.com using EmailJS. Follow these steps once:

   Step 1: Create a free account at https://www.emailjs.com

   Step 2: Create an "Email Service"
     - Go to "Email Services" -> "Add New Service".
     - Connect your Gmail account (or another provider).
     - Note the SERVICE ID (looks like: service_xxxxxxx).

   Step 3: Create an Email Template
     - Go to "Email Templates" -> "Create New Template".
     - Add these template variables ({{variable}} syntax):
         {{from_name}}   - sender's name
         {{from_email}}  - sender's email (REVIEW form: sender's email,
                           CONTACT form: sender's email)
         {{company}}     - sender's company (used by review form)
         {{rating}}      - star rating (used by review form)
         {{subject}}     - selected service (used by contact form)
         {{message}}     - the message / review text
     - The template body can be something like:

         New contact message from: {{from_name}} ({{from_email}})
         Subject: {{subject}}
         Company: {{company}}
         Rating: {{rating}}/5
         Message:
         {{message}}

     - Note the TEMPLATE ID (looks like: template_xxxxxxx).

   Step 4: Get your Public Key
     - Go to "Account" -> "General" -> "API Keys".
     - Note your PUBLIC KEY (looks like: AbCdEfGhIjKl).

   Step 5: Replace the THREE placeholder values below with your
     real Service ID, Template IDs, and Public Key. Save and
     re-upload to GitHub Pages. The forms will then work.
   ============================================================
   ============================================================ */

/* REPLACE: paste your EmailJS Public Key here */
const EMAILJS_PUBLIC_KEY = "HX2QjwUkTcHrIuCjp";

/* REPLACE: paste your EmailJS Service ID here */
const EMAILJS_SERVICE_ID = "service_4dmnj3j";

/* REPLACE: paste your EmailJS Review Template ID here */
const EMAILJS_REVIEW_TEMPLATE_ID = "template_y2923ds";

/* REPLACE: paste your EmailJS Contact Template ID here */
const EMAILJS_CONTACT_TEMPLATE_ID = "template_g4edgcv";

const EMAILJS_CONFIGURED =
    EMAILJS_PUBLIC_KEY !== "" &&
    EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY" &&
    EMAILJS_SERVICE_ID !== "" &&
    EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID" &&
    EMAILJS_REVIEW_TEMPLATE_ID !== "" &&
    EMAILJS_REVIEW_TEMPLATE_ID !== "YOUR_REVIEW_TEMPLATE_ID" &&
    EMAILJS_CONTACT_TEMPLATE_ID !== "" &&
    EMAILJS_CONTACT_TEMPLATE_ID !== "YOUR_CONTACT_TEMPLATE_ID";

/* ============================================================
   APPROVED REVIEWS
   ------------------------------------------------------------
   HOW TO ADD AN APPROVED REVIEW:
   1. Add a new object below with this exact structure:
        {
          name: "Client Name",
          company: "Company Name",
          rating: 5,
          review: "Review text here...",
          date: "Month Year"
        }
   2. Save the file and push the update to GitHub.
   3. The review appears automatically in the carousel above.
   ------------------------------------------------------------
   These are SAMPLE placeholders - replace with real approved
   client reviews before going live.
   ============================================================ */
const approvedReviews = [
    {
        name: "Sample Client",
        company: "Rooftop Installer Co.",
        rating: 5,
        review: "The layout drawing and shadow analysis were spot on. Saved us from a placement mistake before installation even started.",
        date: "January 2026"
    },
    {
        name: "Sample Client",
        company: "Solar EPC Private Ltd.",
        rating: 5,
        review: "Clear communication and a detailed PVsyst report. Exactly what our funding team needed to approve the project.",
        date: "March 2026"
    },
    {
        name: "Sample Client",
        company: "Contractor / Installer",
        rating: 4,
        review: "Good turnaround time on the CAD drawings and very responsive on WhatsApp for revisions.",
        date: "May 2026"
    }
        {
        name: "Rihanna Smith",
        company: "rihannasolar.com",
        rating: 3,
        review: "Reviews checking is a great feature.",
        date: "12 Aug 2026"
    }
];

/* ============================================================
   PAGE LOADER
   Fades the loader out once the page (and fonts/images) are ready.
   ============================================================ */
window.addEventListener("load", function () {
    var loader = document.getElementById("page-loader");
    if (loader) {
        setTimeout(function () {
            loader.classList.add("hidden");
        }, 400);
    }
});

/* ============================================================
   INITIALISE THIRD-PARTY LIBRARIES
   (All libraries are loaded with defer, so they exist here.)
   ============================================================ */
function initLibraries() {
    /* AOS.js - fade-in on scroll for all sections */
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
            offset: 80
        });
    }

    /* GLightbox - portfolio lightbox */
    if (typeof GLightbox !== "undefined") {
        GLightbox({
            selector: ".glightbox",
            touchNavigation: true,
            loop: true,
            descPosition: "bottom",
            closeButton: true
        });
    }

    /* SwiperJS - reviews carousel */
    if (typeof Swiper !== "undefined" && document.querySelector(".reviews-swiper")) {
        new Swiper(".reviews-swiper", {
            slidesPerView: 1,
            spaceBetween: 28,
            loop: true,
            grabCursor: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: ".reviews-swiper .swiper-pagination",
                clickable: true
            },
            navigation: {
                nextEl: ".reviews-swiper .swiper-button-next",
                prevEl: ".reviews-swiper .swiper-button-prev"
            },
            breakpoints: {
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 }
            }
        });
    }
}

/* ============================================================
   RENDER APPROVED REVIEWS into the carousel
   ============================================================ */
function renderReviews() {
    var wrapper = document.getElementById("reviews-wrapper");
    if (!wrapper) return;

    wrapper.innerHTML = approvedReviews.map(function (r) {
        var stars = "";
        for (var i = 1; i <= 5; i++) {
            stars += i <= r.rating ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
        }
        /* Avatar initials circle (first letters of name) */
        var initials = r.name.trim().split(/\s+/).map(function (w) {
            return w.charAt(0).toUpperCase();
        }).join("").slice(0, 2);

        return (
            '<div class="swiper-slide">' +
                '<div class="review-card">' +
                    '<div class="review-stars">' + stars + '</div>' +
                    '<p class="review-text"><i class="fa-solid fa-quote-left"></i>' + r.review + '</p>' +
                    '<div class="review-author">' +
                        '<div class="avatar-circle">' + initials + '</div>' +
                        '<div class="review-author-info">' +
                            '<h5>' + r.name + '</h5>' +
                            '<p>' + r.company + ' <span class="review-date">' + r.date + '</span></p>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    }).join("");
}

/* ============================================================
   MOBILE MENU (hamburger + full-screen overlay)
   ============================================================ */
function initMobileMenu() {
    var hamburger = document.getElementById("hamburger");
    var overlay = document.getElementById("mobile-overlay");

    if (!hamburger || !overlay) return;

    hamburger.addEventListener("click", function () {
        var open = overlay.classList.toggle("open");
        hamburger.classList.toggle("open", open);
        hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    });

    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
            closeMenu();
        }
    });

    function closeMenu() {
        overlay.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
    }

    /* Close menu when a link inside it is clicked, then smooth scroll */
    overlay.querySelectorAll("a.nav-link").forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            closeMenu();
            var target = document.querySelector(link.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    /* Close menu on Escape key */
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeMenu();
    });
}

/* ============================================================
   SCROLL SPY - highlights the active section in both menus
   ============================================================ */
function initScrollSpy() {
    var sections = document.querySelectorAll("main section[id]");
    var navLinks = document.querySelectorAll(".nav-link");
    if (!sections.length) return;

    function setActive(id) {
        navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("data-target") === id);
        });
    }

    /* Offset accounts for mobile fixed header space */
    var scrollOffset = 120;

    function onScroll() {
        var pos = window.scrollY + scrollOffset;
        var current = sections[0].id;

        sections.forEach(function (sec) {
            if (sec.offsetTop <= pos) {
                current = sec.id;
            }
        });

        /* If scrolled past the last section's bottom, highlight it */
        var pageBottom = document.body.offsetHeight - window.innerHeight;
        if (window.scrollY >= pageBottom - 4) {
            current = sections[sections.length - 1].id;
        }

        setActive(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
}

/* ============================================================
   HERO STATS COUNT-UP ANIMATION
   (REPLACE: update the data-count and data-suffix attributes
   on the numbers in index.html to change these stats.)
   ============================================================ */
function initCountUp() {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    function animateCounter(el) {
        var target = parseInt(el.getAttribute("data-count"), 10);
        var suffix = el.getAttribute("data-suffix") || "";
        var duration = 1600;
        var start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            var progress = Math.min((timestamp - start) / duration, 1);
            /* ease-out */
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    /* Count up once the element is visible on screen */
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    counters.forEach(function (c) { io.observe(c); });
}

/* ============================================================
   PORTFOLIO FILTER with smooth transition
   ============================================================ */
function initPortfolioFilter() {
    var buttons = document.querySelectorAll(".filter-btn");
    var items = document.querySelectorAll(".portfolio-item");
    if (!buttons.length || !items.length) return;

    buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            buttons.forEach(function (b) { b.classList.remove("active"); });
            btn.classList.add("active");

            var filter = btn.getAttribute("data-filter");

            items.forEach(function (item) {
                var show = filter === "all" || item.getAttribute("data-category") === filter;

                if (show) {
                    /* Reveal: unhide, then fade in */
                    item.classList.remove("hidden");
                    item.classList.add("hiding");
                    requestAnimationFrame(function () {
                        item.classList.remove("hiding");
                        item.classList.add("appearing");
                        setTimeout(function () {
                            item.classList.remove("appearing");
                        }, 420);
                    });
                } else {
                    /* Hide: fade out, then display none */
                    item.classList.add("hiding");
                    setTimeout(function () {
                        item.classList.add("hidden");
                        item.classList.remove("hiding");
                    }, 300);
                }
            });
        });
    });
}

/* ============================================================
   STAR RATING SELECTOR (review form)
   ============================================================ */
function initStarRating() {
    var container = document.getElementById("star-rating");
    if (!container) return;

    var stars = container.querySelectorAll("i");
    var hiddenInput = document.getElementById("rv-rating");
    var current = 0;

    function paint(level) {
        stars.forEach(function (s) {
            s.classList.toggle("active", parseInt(s.getAttribute("data-value"), 10) <= level);
        });
    }

    stars.forEach(function (star) {
        star.addEventListener("mouseenter", function () {
            paint(parseInt(star.getAttribute("data-value"), 10));
        });

        star.addEventListener("click", function () {
            current = parseInt(star.getAttribute("data-value"), 10);
            hiddenInput.value = current;
            paint(current);
        });
    });

    container.addEventListener("mouseleave", function () {
        paint(current);
    });
}

/* ============================================================
   EMAILJS HELPERS
   ============================================================ */
function initEmailJS() {
    if (!EMAILJS_CONFIGURED) {
        console.warn(
            "[Mikin Solar] EmailJS is not configured yet. " +
            "Set EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_REVIEW_TEMPLATE_ID " +
            "and EMAILJS_CONTACT_TEMPLATE_ID in js/script.js (see setup comments at the top)."
        );
        return false;
    }
    if (typeof emailjs === "undefined") return false;
    emailjs.init(EMAILJS_PUBLIC_KEY);
    return true;
}

function showFormStatus(el, message, type) {
    if (!el) return;
    el.textContent = message;
    el.className = "form-status show " + (type || "");
}

/* ============================================================
   REVIEW FORM (Part B) - sends via EmailJS to mikinvp4@gmail.com
   Email includes: from_name, from_email, company, rating, message
   ============================================================ */
function initReviewForm() {
    var form = document.getElementById("review-form");
    if (!form) return;
    var status = document.getElementById("review-form-status");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        var name = document.getElementById("rv-name").value.trim();
        var email = document.getElementById("rv-email").value.trim();
        var message = document.getElementById("rv-message").value.trim();
        var rating = document.getElementById("rv-rating").value;

        if (!name || !email || !message) {
            showFormStatus(status, "Please fill in your name, email, and review.", "error");
            return;
        }
        if (rating === "0") {
            showFormStatus(status, "Please select a star rating.", "error");
            return;
        }

        if (!initEmailJS()) {
            showFormStatus(status, "Email service not configured yet. Please contact me directly at mikinvp4@gmail.com.", "error");
            return;
        }

        /* All form fields are sent to EmailJS */
        var payload = {
            from_name: name,
            from_email: email,
            company: document.getElementById("rv-company").value.trim() || "Not provided",
            rating: rating + " / 5",
            subject: "New Client Review",
            message: message,
            to_email: "mikinvp4@gmail.com"
        };

        showFormStatus(status, "Sending your review...", "");

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_REVIEW_TEMPLATE_ID, payload)
            .then(function () {
                showFormStatus(status, "Thank you! Your review has been sent.", "success");
                form.reset();
                document.querySelectorAll("#star-rating i").forEach(function (s) {
                    s.classList.remove("active");
                });
                document.getElementById("rv-rating").value = "0";
            })
            .catch(function () {
                showFormStatus(status, "Sorry, something went wrong. Please try again or email me directly.", "error");
            });
    });
}

/* ============================================================
   CONTACT FORM - sends via EmailJS to mikinvp4@gmail.com
   ============================================================ */
function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var status = document.getElementById("contact-form-status");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        var name = document.getElementById("ct-name").value.trim();
        var email = document.getElementById("ct-email").value.trim();
        var message = document.getElementById("ct-message").value.trim();

        if (!name || !email || !message) {
            showFormStatus(status, "Please fill in your name, email, and message.", "error");
            return;
        }

        if (!initEmailJS()) {
            showFormStatus(status, "Email service not configured yet. Please contact me directly at mikinvp4@gmail.com.", "error");
            return;
        }

        /* All form fields are sent to EmailJS */
        var payload = {
            from_name: name,
            from_email: email,
            company: "N/A",
            rating: "N/A",
            subject: document.getElementById("ct-subject").value || "General Enquiry",
            message: message,
            to_email: "mikinvp4@gmail.com"
        };

        showFormStatus(status, "Sending your message...", "");

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CONTACT_TEMPLATE_ID, payload)
            .then(function () {
                showFormStatus(status, "Message sent successfully! I'll get back to you soon.", "success");
                form.reset();
            })
            .catch(function () {
                showFormStatus(status, "Sorry, something went wrong. Please try again or email me directly.", "error");
            });
    });
}

/* ============================================================
   BACK TO TOP BUTTON
   ============================================================ */
function initBackToTop() {
    var btn = document.getElementById("back-to-top");
    if (!btn) return;

    window.addEventListener("scroll", function () {
        btn.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ============================================================
   FOOTER YEAR
   ============================================================ */
function initYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
}

/* ============================================================
   BOOTSTRAP - run everything once the DOM is ready
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
    renderReviews();
    initLibraries();
    initMobileMenu();
    initScrollSpy();
    initCountUp();
    initPortfolioFilter();
    initStarRating();
    initReviewForm();
    initContactForm();
    initBackToTop();
    initYear();
});
