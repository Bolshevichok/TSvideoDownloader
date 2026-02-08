import {Bot, InputFile} from 'grammy';
import config from './config.js';
import { downloadVideo } from './api.js';

const bot = new Bot(config.botToken);

bot.command("start", (ctx) => ctx.reply("Привет! Этот бот загружает ролики с YT/TT/VK. Отправь ссылку на ролик для загрузки." ));

bot.on('message::url', async (ctx) => {
    try {
        const message = ctx.message.text;
        if (!message) return ctx.reply("ой, вей! у вас какое-то нехорошее сообщение.");
        const video = await downloadVideo(message);
        if (!video) return ctx.reply("ой, вей! не то ты мне шлешь. нужна только ссылка для YT/TT/VK!");
        ctx.replyWithVideo(new InputFile(video));
    } catch (e) {
        console.error(e);
        ctx.reply("кажется что-то не то...")
    }
});

bot.start()