const balanceElement = document.getElementById('balance');
let balance = 100; // Начальный баланс

const colorPicker = document.getElementById('colorPicker');
const pixelGrid = document.getElementById('pixel-grid');

// Генерация сетки пикселей 1000x1000
for (let i = 0; i < 1000 * 1000; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.addEventListener('click', () => selectPixel(pixel));
    pixelGrid.appendChild(pixel);
}

function selectPixel(pixel) {
    if (balance > 0) {
        pixel.style.backgroundColor = colorPicker.value;
        balance--;
        balanceElement.textContent = balance;
    } else {
        alert("Недостаточно баланса для покупки пикселя.");
    }
}

// Масштабирование сетки
let scale = 1;
document.addEventListener('keydown', (event) => {
    if (event.key === '+' && scale < 3) { // Увеличить
        scale += 0.1;
    } else if (event.key === '-' && scale > 0.1) { // Уменьшить
        scale -= 0.1;
    }
    pixelGrid.style.transform = `scale(${scale})`;
});
