document.addEventListener("DOMContentLoaded", () => {
  const condensedNumbers = document.getElementsByClassName("condensed-number");
  Array.from(condensedNumbers).forEach((numberElement) => {
    let number = parseInt(numberElement.innerHTML);
    let suffix = "";
    if (number < 1000) { return number; }
    else if (number >= 1000 && number < 1000000) {
      number = number/1000;
      suffix = "K";
    }
    else if (number >= 1000000 && number < 1000000000) {
      number = number/1000000;
      suffix = "M";
    }
    else {
      number = number/1000000000;
      suffix = "B";
    }
    numberElement.innerHTML = Math.round(number) + suffix;
  });
});