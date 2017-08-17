document.addEventListener("DOMContentLoaded", () => {
  let menu = document.getElementById("new-source-upload-menu");

  document.getElementById("new-source-upload-button").addEventListener("click", () => {
    menu.style.visibility = "visible";
    document.addEventListener("click", (event) => {
      event = event || window.event;
      target = event.target;
      if (target.id == "new-source-upload-menu") {
        menu.style.visibility = "hidden";
      }
    })
  });
});