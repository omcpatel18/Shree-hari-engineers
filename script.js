  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const statusEl = document.getElementById("formStatus");

  // Your WhatsApp number (with country code, WITHOUT + or spaces)
  const whatsappNumber = "918320673087"; // e.g. 91xxxxxxxxxx

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent normal form submission

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    statusEl.style.display = "none";
    statusEl.textContent = "";

    const formData = new FormData(form);

    try {
      // 1) Send data to Web3Forms → Email (Gmail)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // 2) Build WhatsApp message text
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const message = form.message.value;

        const whatsappText =
`📩 New Website Inquiry

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}
💬 Message:
${message}`;

        // 3) Open WhatsApp chat to your number
        const waURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;
        window.open(waURL, "_blank");

        // 4) Show success status
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
