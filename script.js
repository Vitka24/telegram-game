document.addEventListener('DOMContentLoaded', () => {
    const pixelGrid = document.getElementById('pixel-grid');
    const pixelGridContainer = document.getElementById('pixel-grid-container');
    let availablePixels = 1000000;
    let userBalance = 100;
    let purchasedPixels = new Set();

    // Инициализация Panzoom с настройками
    const panzoomInstance = Panzoom(pixelGrid, {
        maxScale: 5, 
        minScale: 0.05, 
        contain: 'outside'
    });

    function setInitialScale() {
        const containerWidth = pixelGridContainer.offsetWidth;
        const containerHeight = pixelGridContainer.offsetHeight;
        const gridWidth = pixelGrid.offsetWidth;
        const gridHeight = pixelGrid.offsetHeight;

        const scaleX = containerWidth / gridWidth;
        const scaleY = containerHeight / gridHeight;
        const scale = Math.min(scaleX, scaleY);

        panzoomInstance.zoom(scale, { animate: true });
    }

    setInitialScale();
    pixelGridContainer.addEventListener('wheel', panzoomInstance.zoomWithWheel);

    // Создание сетки пикселей
    for (let i = 0; i < 1000000; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.dataset.index = i;
        pixel.addEventListener('click', () => handlePixelClick(i, pixel));
        pixelGrid.appendChild(pixel);
    }

    // Обработчик клика по пикселю
    function handlePixelClick(index, pixel) {
        if (purchasedPixels.has(index)) {
            alert("Этот пиксель уже куплен!");
            return;
        }

        const confirmPurchase = confirm("Купить этот пиксель за 1 TON?");
        if (confirmPurchase && userBalance >= 1) {
            userBalance -= 1;
            availablePixels -= 1;
            purchasedPixels.add(index);

            document.getElementById('user-balance').textContent = `Баланс: ${userBalance} TON`;
            document.getElementById('available-pixels').textContent = availablePixels;

            pixel.classList.add('selected');
            pixel.style.backgroundColor = prompt("Введите цвет пикселя в формате HEX (например, #FF0000):");

            const link = prompt("Введите ссылку для пикселя:");
            const imageUrl = prompt("Введите URL картинки для пикселя (необязательно):");

            if (link) {
                pixel.setAttribute("data-link", link);
            }

            if (imageUrl) {
                pixel.style.backgroundImage = `url(${imageUrl})`;
                pixel.style.backgroundSize = "cover";
            }

            pixel.addEventListener('click', () => {
                if (link) {
                    window.open(link, "_blank");
                }
            });
        } else {
            alert("Недостаточно средств для покупки пикселя!");
        }
    }

    window.addEventListener('resize', setInitialScale);
});
