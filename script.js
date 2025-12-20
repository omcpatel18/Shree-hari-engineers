
/* =========================================
   🍔 Mobile Navigation Toggle
   ========================================= */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const body = document.body;

if (hamburger && navLinks) {
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open');
  });

  // Close menu when clicking on a nav link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      body.classList.remove('menu-open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      body.classList.remove('menu-open');
    }
  });
}

/* =========================================
   ✨ Premium Scroll Reveal Animations
   ========================================= */

// Counter animation function
function animateCounter(element, target) {
  if (element.getAttribute('data-animated') === 'true') return;
  element.setAttribute('data-animated', 'true');
  
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Initialize scroll reveal animations
function initScrollReveal() {
  // Add scroll-reveal class to elements
  const revealElements = [
    { selector: '.about-content img', class: 'image-reveal', addRevealStart: true },
    { selector: '.about-content .about-text', class: 'scroll-reveal-right' },
    { selector: '.services h2', class: 'scroll-reveal' },
    { selector: '.services-description', class: 'scroll-reveal' },
    { selector: '.card', class: 'scroll-reveal-scale', stagger: true },
    { selector: '.portfolio h2', class: 'scroll-reveal' },
    { selector: '.portfolio-description', class: 'scroll-reveal' },
    { selector: '.portfolio-card', class: 'scroll-reveal-scale', stagger: true },
    { selector: '.equipment h2', class: 'scroll-reveal' },
    { selector: '.equipment-description', class: 'scroll-reveal' },
    { selector: '.equipment-card', class: 'scroll-reveal-scale', stagger: true },
    { selector: '.certifications h2', class: 'scroll-reveal' },
    { selector: '.cert-description', class: 'scroll-reveal' },
    { selector: '.cert-card', class: 'scroll-reveal-scale', stagger: true },
    { selector: '.contact-header', class: 'scroll-reveal' },
    { selector: '.contact-content', class: 'scroll-reveal' },
    { selector: '.badges-container .badge-card', class: 'scroll-reveal-scale', stagger: true },
  ];

  revealElements.forEach(item => {
    const elements = document.querySelectorAll(item.selector);
    elements.forEach((el, index) => {
      if (!el.classList.contains('scroll-reveal') && 
          !el.classList.contains('scroll-reveal-left') && 
          !el.classList.contains('scroll-reveal-right') && 
          !el.classList.contains('scroll-reveal-scale') &&
          !el.classList.contains('image-reveal')) {
        el.classList.add(item.class);
        if (item.addRevealStart) {
          el.classList.add('reveal-start');
        }
        if (item.stagger && index < 6) {
          el.classList.add(`scroll-reveal-delay-${index + 1}`);
        }
      }
    });
  });

  // Create Intersection Observer for smooth reveal
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Optional: unobserve after reveal for better performance
        // revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all scroll-reveal elements
  document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale').forEach(el => {
    revealObserver.observe(el);
  });
}

/* =========================================
   🌊 Smooth Scroll with Easing
   ========================================= */
function initSmoothScroll() {
  // Enhanced smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        // Smooth scroll with easing
        smoothScrollTo(targetPosition, 1000);
      }
    });
  });
}

// Custom smooth scroll function with easing
function smoothScrollTo(targetPosition, duration) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function easeInOutCubic(t) {
    return t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutCubic(progress);
    
    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

/* =========================================
   🎭 Parallax Effect for Header
   ========================================= */
function initParallax() {
  const header = document.querySelector('header');
  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    lastScroll = window.pageYOffset;
    
    if (!ticking) {
      requestAnimationFrame(() => {
        // Subtle header shadow on scroll
        if (header) {
          if (lastScroll > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
          } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* =========================================
   🚀 Initialize All Scroll Effects
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initSmoothScroll();
  initParallax();
});

  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const statusEl = document.getElementById("formStatus");

  // Your WhatsApp number (with country code, WITHOUT + or spaces)
  // Example: "919876543210"
  const whatsappNumber = "919426533653"; // ← replace with your number

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // prevent normal browser submit

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    statusEl.style.display = "none";
    statusEl.textContent = "";

    const formData = new FormData(form);

    try {
      // 1) Send data to Web3Forms → email (to your Gmail)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // 2) Minimal info for WhatsApp (no full message in URL)
        const name = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value;

        const whatsappText =
`New inquiry from website.

Name: ${name}
Phone: ${phone || "Not provided"}
Email: ${email}

Full details are in your Gmail inbox.`;

        const waURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          whatsappText
        )}`;

        // Open WhatsApp chat in new tab/window
        window.open(waURL, "_blank");

        // 3) Show success message on website
        statusEl.style.display = "block";
        statusEl.style.color = "green";
        statusEl.textContent = "Thanks — your request is received. We'll contact you shortly with next steps.";

        // Clear form
        form.reset();
      } else {
        throw new Error(result.message || "Form submission failed.");
      }
    } catch (error) {
      console.error(error);
      statusEl.style.display = "block";
      statusEl.style.color = "red";
      statusEl.textContent = "Error sending request. Please try again.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send for Quote";
    }
  });

  /* =========================================
     🎯 Portfolio Filter Functionality
     ========================================= */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioCards = document.querySelectorAll(".portfolio-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-filter");

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter cards
      portfolioCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (filterValue === "all" || cardCategory === filterValue) {
          card.classList.remove("hidden");
          // Trigger reflow for animation
          setTimeout(() => {
            card.style.animation = "fadeIn 0.3s ease-in";
          }, 10);
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
