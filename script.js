
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const statusEl = document.getElementById("formStatus");

  // Your WhatsApp number (with country code, WITHOUT + or spaces)
  // Example: "919876543210"
  const whatsappNumber = "918320673087"; // ← replace with your number

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
