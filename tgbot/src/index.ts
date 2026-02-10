import {Bot, InputFile} from 'grammy';
import config from './config.js';
import { downloadVideo } from './api.js';

const bot = new Bot(config.botToken);

bot.command("start", (ctx) => ctx.reply("Привет! Этот бот загружает ролики с YT/TT/VK. Отправь ссылку на ролик для загрузки." ));

bot.on('message::url', async (ctx) => {
    try {
        const message = ctx.message.text;
        if (!message) return ctx.reply("ой, вей! у вас какое-то нехорошее сообщение.");

        const result = await downloadVideo(message); // Теперь возвращает объект
        if (result.stream) {
            // Отправить видео
            await ctx.replyWithVideo(new InputFile(result.stream));
        } else {
            // Отправить сообщение об ошибке
            await ctx.reply(result.error || "ой, вей! не то ты мне шлешь. нужна только ссылка для YT/TT/VK!");
        }
    } catch (e) {
        console.error(e);
        ctx.reply("кажется что-то не то...");
    }
});

bot.start()