const errorModal = document.querySelector(".modal-error");

if (!errorModal) {
  throw new Error("Missing elements");
}

export const showErrorModal = (message: string): void => {
  errorModal.classList.add("open");
  errorModal.textContent = message;

  setTimeout(() => {
    errorModal.classList.remove("open");
  }, 2000);
};
