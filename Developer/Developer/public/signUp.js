userOption.onclick = () => {
  userOption.classList.add("active");
  landlordOption.classList.remove("active");
  switchIndicator.style.transform = "translateX(0%)";
  userForm.classList.remove("hidden");
  landlordForm.classList.add("hidden");
};

landlordOption.onclick = () => {
  landlordOption.classList.add("active");
  userOption.classList.remove("active");
  switchIndicator.style.transform = "translateX(100%)";
  landlordForm.classList.remove("hidden");
  userForm.classList.add("hidden");
};
