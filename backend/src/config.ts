import dotenv from 'dotenv';
dotenv.config({path: '../.env'});

interface Config {
  port_tg: number;
  port_backend: number;
  host_tg: string;
  host_backend: string;
  botToken: string;
}

const config: Config = {
  port_tg: parseInt(process.env.PORT_TGBOT || '3001', 10),
  host_tg: process.env.HOST_TG || 'localhost',
  botToken: process.env.BOT_TOKEN || '',
  host_backend: process.env.HOST_BACKEND || 'localhost',
  port_backend: parseInt(process.env.PORT_BACKEND || '3000', 10),
};

export default config;