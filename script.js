// script.js

document.addEventListener('DOMContentLoaded', () => {
    const pixelGrid = document.getElementById('pixel-grid');
    let availablePixels = 1000000;
    
    // Создание пикселей в сетке
    for (let i = 0; i < 1000000; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.addEventListener('click', () => handlePixelClick(pixel));
        pixelGrid.appendChild(pixel);
    }

    // Обработчик клика по пикселю
    function handlePixelClick(pixel) {
        if (pixel.classList.contains('selected')) {
            alert("Этот пиксель уже куплен!");
            return;
        }

        const confirmPurchase = confirm("Купить этот пиксель за 1 TON?");
        if (confirmPurchase) {
            pixel.classList.add('selected');
            availablePixels -= 1;
            document.getElementById('available-pixels').textContent = availablePixels;
            alert("Вы успешно купили пиксель!");
        }
    }

    // Инициализация Panzoom для масштабирования и перемещения
    const panzoomInstance = Panzoom(pixelGrid, {
        maxScale: 4, // Максимальное увеличение
        minScale: 1, // Минимальное увеличение
        contain: 'inside'
    });

    // Настраиваем зумирование с помощью колеса мыши
    pixelGrid.parentElement.addEventListener('wheel', panzoomInstance.zoomWithWheel);
});
