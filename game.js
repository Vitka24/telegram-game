// game.js
document.addEventListener("DOMContentLoaded", function() {
    const gameContainer = document.getElementById("game-container");

    // Создаем сетку
    for (let i = 0; i < 10000; i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.addEventListener("click", () => {
            pixel.classList.toggle("active");
        });
        gameContainer.appendChild(pixel);
    }
});
