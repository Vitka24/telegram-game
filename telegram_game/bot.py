# bot.py
from aiogram import Bot, Dispatcher, types
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
import asyncio

API_TOKEN = '7919708433:AAFy4DXcHZJlfHi7jzAXzA1UCYDkzsb-vRs'
WEBAPP_URL = "https://yourserver.com/game.html"  # Замените на URL, где размещена ваша игра

bot = Bot(token=API_TOKEN)
dp = Dispatcher()

@dp.message_handler(commands=["start"])
async def start_command(message: types.Message):
    keyboard = InlineKeyboardMarkup()
    webapp_button = InlineKeyboardButton(
        text="Играть в Pixel Game",
        web_app=WebAppInfo(url=WEBAPP_URL)
    )
    keyboard.add(webapp_button)
    await message.answer("Нажмите кнопку, чтобы начать игру:", reply_markup=keyboard)

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())


