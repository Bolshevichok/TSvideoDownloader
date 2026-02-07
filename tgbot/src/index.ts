import {Bot} from 'grammy';
import dotenv from 'dotenv';
import config from './config.js';
dotenv.config({path: './.env'})

const bot = new Bot(config.botToken);

bot.command("start", (ctx) => ctx.reply("Привет! Этот бот загружает ролики с YT/TT/VK. Отправь ссылку на ролик для загрузки." ));

bot.on('message::url');