document.addEventListener('DOMContentLoaded', () => {
    const pixelGrid = document.getElementById('pixel-grid');
    const availablePixelsCounter = document.getElementById('available-pixels');
    const userBalanceDisplay = document.getElementById('user-balance');
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

    // Обновление интерфейса баланса
    userBalanceDisplay.textContent = `Баланс: ${userBalance} TON`;
    availablePixelsCounter.textContent = availablePixels;

    // Обработчик клика по пикселю
    function handlePixelClick(index) {
        const pixel = pixelGrid.children[index];

        if (purchasedPixels.has(index)) {
            alert("Этот пиксель уже куплен вами. Вы можете его редактировать.");
            editPixel(index);
            return;
        }

        const confirmPurchase = confirm(`Вы хотите купить этот пиксель за 1 TON?`);
        if (confirmPurchase && userBalance >= 1) {
            userBalance -= 1;
            availablePixels -= 1;
            purchasedPixels.add(index);

            // Обновляем интерфейс
            userBalanceDisplay.textContent = `Баланс: ${userBalance} TON`;
            availablePixelsCounter.textContent = availablePixels;

            // Изменяем цвет пикселя
            pixel.style.backgroundColor = '#000';

            alert("Вы успешно купили пиксель!");

            // Позволяем редактировать пиксель
            editPixel(index);
        } else if (confirmPurchase) {
            alert("Недостаточно средств для покупки пикселя.");
        }
    }

    // Функция редактирования пикселя
    function editPixel(index) {
        const pixel = pixelGrid.children[index];
        
        // Удаляем предыдущий контент, если он есть
        pixel.innerHTML = '';

        // Получаем данные для пикселя
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
            const linkElement = document.createElement('a');
            linkElement.href = link;
            linkElement.target = '_blank';
            linkElement.title = text || 'Пиксель';
            pixel.appendChild(linkElement);
            if (!imageUrl) {
                linkElement.textContent = text || 'Ссылка';
            }
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
