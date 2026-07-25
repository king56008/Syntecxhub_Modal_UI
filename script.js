document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openModalBtn");
  const closeTopBtn = document.getElementById("closeModalTopBtn");
  const closeBottomBtn = document.getElementById("closeModalBottomBtn");
  const modalContainer = document.getElementById("modalContainer");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalBox = document.getElementById("modalBox");
  const contactForm = document.getElementById("contactForm");
  const successAlert = document.getElementById("successAlert");

  // Function to open modal with animations
  function openModal() {
    modalContainer.classList.remove("hidden");

    // Reset form states if previously sent
    successAlert.classList.add("hidden");
    contactForm.classList.remove("hidden");
    contactForm.reset();

    // Apply entry animations
    modalOverlay.classList.remove("animate-overlay-out");
    modalOverlay.classList.add("animate-overlay-in");

    modalBox.classList.remove("animate-modal-out");
    modalBox.classList.add("animate-modal-in");

    // Focus first input field after animation starts
    setTimeout(() => {
      const firstInput = document.getElementById("senderName");
      if (firstInput) firstInput.focus();
    }, 100);

    // Prevent body scrolling behind modal
    document.body.style.overflow = "hidden";
  }

  // Function to close modal with exit animations
  function closeModal() {
    // Apply exit animations
    modalOverlay.classList.remove("animate-overlay-in");
    modalOverlay.classList.add("animate-overlay-out");

    modalBox.classList.remove("animate-modal-in");
    modalBox.classList.add("animate-modal-out");

    // Hide container after exit animation finishes
    setTimeout(() => {
      modalContainer.classList.add("hidden");
      document.body.style.overflow = "";
    }, 200);
  }

  // Event Listeners for opening/closing
  openBtn.addEventListener("click", openModal);
  closeTopBtn.addEventListener("click", closeModal);
  closeBottomBtn.addEventListener("click", closeModal);

  // Close when clicking directly on overlay background
  modalOverlay.addEventListener("click", closeModal);

  // Prevent clicks inside modal box from bubbling up to overlay and closing
  modalBox.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Close on pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalContainer.classList.contains("hidden")) {
      closeModal();
    }
  });

  // Handle Form submission simulation inside modal
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Show success feedback state
    contactForm.classList.add("hidden");
    successAlert.classList.remove("hidden");

    // Automatically close modal after 2.5 seconds of success message
    setTimeout(() => {
      if (!modalContainer.classList.contains("hidden")) {
        closeModal();
      }
    }, 2500);
  });
});
