const btn = document.getElementById("btn");
const colorBoxes = document.querySelectorAll(".color-box");
const color = document.querySelectorAll(".color");

btn.addEventListener("click", () => {
  const selectedColor = document.getElementById("color-picker").value.slice(1);
  const selectedStyle = document.getElementById("color-styles").value;

  const url = `https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${selectedStyle}&count=5`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const colors = data.colors.map((c) => c.hex.value);

      colorBoxes.forEach((box, index) => {
        box.style.backgroundColor = colors[index];

        color.forEach((p, index) => {
          p.textContent = colors[index];
        });
      });
    });
});
