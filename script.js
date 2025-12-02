
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const statusEl = document.getElementById("formStatus");

  // Your WhatsApp number (WITHOUT +)
  const whatsappNumber = "918320673087";  // ← Replace with your number

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Stop page reload

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // Prepare form data
    const formData = new FormData(form);

    try {
      // 1) Send to Web3Forms (EMAIL)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // 2) Create WhatsApp message
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const message = form.message.value;

        const whatsappText = 
`📩 New Website Inquiry:

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}
💬 Message:
${message}`;

        const waURL = `https://wa.me/${918320673087}?text=${encodeURIComponent(whatsappText)}`;

        window.open(waURL, "_blank");

        // 3) Show success
        statusEl.style.display = "block";
        statusEl.style.color = "green";
        statusEl.textContent = "Thank you! Your message has been sent.";

        form.reset();
      } else {
        throw new Error(result.message || "Form submission failed.");
      }
    } catch (error) {
      console.error(error);

      statusEl.style.display = "block";
      statusEl.style.color = "red";
      statusEl.textContent = "Error sending message. Please try again.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  });
