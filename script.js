document.addEventListener('DOMContentLoaded', () => {
    const pixelGrid = document.getElementById('pixel-grid');
    const availablePixelsCounter = document.getElementById('available-pixels');
    let availablePixels = 1000000;
    let userBalance = 100;
    let purchasedPixels = new Set();

    // Создание сетки пикселей
    for (let i = 0; i < 1000000; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.dataset.index = i;
        pixel.addEventListener('click', () => handlePixelClick(i));
        pixelGrid.appendChild(pixel);
    }

    // Обработчик клика по пикселю
    function handlePixelClick(index) {
        if (purchasedPixels.has(index)) {
            alert("Вы уже купили этот пиксель!");
            return;
        }

        const confirmPurchase = confirm(`Вы хотите купить этот пиксель за 1 TON?`);
        if (confirmPurchase && userBalance >= 1) {
            userBalance -= 1;
            availablePixels -= 1;
            purchasedPixels.add(index);

            // Обновляем интерфейс
            document.getElementById('user-balance').textContent = `Баланс: ${userBalance} TON`;
            availablePixelsCounter.textContent = availablePixels;

            // Изменяем цвет пикселя
            const pixel = pixelGrid.children[index];
            pixel.style.backgroundColor = '#000';

            alert("Вы успешно купили пиксель!");

            // Позволяем редактировать пиксель
            editPixel(index);
        } else {
            alert("Недостаточно средств!");
        }
    }

    // Функция редактирования пикселя
    function editPixel(index) {
        const pixel = pixelGrid.children[index];
        const imageUrl = prompt("Введите URL картинки для пикселя");
        const link = prompt("Введите ссылку для пикселя");
        const text = prompt("Введите название пикселя");

        if (imageUrl) {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = text;
            img.style.width = '100%';
            img.style.height = '100%';
            pixel.appendChild(img);
        }

        if (link) {
            const a = document.createElement('a');
            a.href = link;
            a.textContent = text;
            pixel.appendChild(a);
        }
    }

    // Кнопка покупки пикселя
    document.getElementById('buy-pixel-btn').addEventListener('click', () => {
        if (userBalance >= 1) {
            alert("Вы можете купить пиксель!");
        } else {
            alert("Недостаточно средств для покупки пикселя!");
        }
    });
});
