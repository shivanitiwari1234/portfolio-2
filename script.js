/* =====================================================
   PORTFOLIO JAVASCRIPT
===================================================== */


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.classList.toggle("active", isOpen);

  menuToggle.setAttribute("aria-expanded", isOpen);
});


/*
 * Close mobile menu after clicking a navigation link.
 */

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
  });
});


/* =====================================================
   TYPING ANIMATION
===================================================== */

const typingElement = document.getElementById("typingText");

const roles = [
  "Full Stack Developer",
  "Frontend Developer",
  "UI/UX Enthusiast",
  "Problem Solver"
];

let roleIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    // Add one character.
    typingElement.textContent =
      currentRole.substring(0, characterIndex + 1);

    characterIndex++;

    // Once the complete word is typed,
    // pause before deleting.
    if (characterIndex === currentRole.length) {
      isDeleting = true;

      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    // Remove one character.
    typingElement.textContent =
      currentRole.substring(0, characterIndex - 1);

    characterIndex--;

    // Once the word is completely deleted,
    // move to the next role.
    if (characterIndex === 0) {
      isDeleting = false;

      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const typingSpeed = isDeleting ? 45 : 85;

  setTimeout(typeEffect, typingSpeed);
}

typeEffect();


/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

const header = document.querySelector(".header");

function updateHeader() {
  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* =====================================================
   ACTIVE NAVIGATION LINK
===================================================== */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

function updateActiveNavigation() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navigationLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNavigation);


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Stop observing once animation has happened.
        observer.unobserve(entry.target);
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


/* =====================================================
   CONTACT FORM VALIDATION
===================================================== */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");


/*
 * Helper function for displaying
 * field-specific errors.
 */

function setError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const group = field.closest(".form-group");
  const errorElement = document.getElementById(`${fieldId}Error`);

  group.classList.add("error");
  errorElement.textContent = message;
}


/*
 * Helper function for clearing errors.
 */

function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const group = field.closest(".form-group");
  const errorElement = document.getElementById(`${fieldId}Error`);

  group.classList.remove("error");
  errorElement.textContent = "";
}


/*
 * Basic email validation.
 */

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


/*
 * Form submit handler.
 */

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get form values.
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  let isValid = true;


  // Clear old errors.
  ["name", "email", "subject", "message"].forEach(clearError);

  formStatus.textContent = "";
  formStatus.className = "form-status";


  // Name validation.
  if (name.length < 2) {
    setError("name", "Please enter your name.");
    isValid = false;
  }


  // Email validation.
  if (!isValidEmail(email)) {
    setError("email", "Please enter a valid email address.");
    isValid = false;
  }


  // Subject validation.
  if (subject.length < 3) {
    setError("subject", "Please enter a subject.");
    isValid = false;
  }


  // Message validation.
  if (message.length < 10) {
    setError(
      "message",
      "Message must contain at least 10 characters."
    );

    isValid = false;
  }


  // Stop if validation failed.
  if (!isValid) {
    formStatus.textContent =
      "Please fix the errors above.";

    formStatus.classList.add("error");

    return;
  }


  /*
   * This is a front-end-only form.
   *
   * A real production contact form needs a backend
   * or a form service/API to actually send messages.
   *
   * For now, we display a success message and reset
   * the form.
   */

  formStatus.textContent =
    "Thanks! Your message has been validated successfully.";

  formStatus.classList.add("success");

  contactForm.reset();
});


/* =====================================================
   CLEAR VALIDATION ERRORS WHILE TYPING
===================================================== */

["name", "email", "subject", "message"].forEach((fieldId) => {
  const field = document.getElementById(fieldId);

  field.addEventListener("input", () => {
    clearError(fieldId);
  });
});


/* =====================================================
   SCROLL TO TOP
===================================================== */

const scrollTopButton = document.getElementById("scrollTop");

scrollTopButton.addEventListener("click", (event) => {
  event.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


/* =====================================================
   CURRENT YEAR
===================================================== */

document.getElementById("currentYear").textContent =
  new Date().getFullYear();
