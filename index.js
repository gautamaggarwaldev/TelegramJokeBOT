const telegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const bot = new telegramBot(process.env.TELEGRAM_TOKEN, {polling:true});

bot.onText(/\/start/, (option) => {
    console.log("Message received on bot",option);

    bot.sendMessage(option.chat.id, `🎉 Welcome to the Joke Bot! 🎉I am here to deliver laughs, puns, and some serious giggles! 😄Type '/joke' to get started or just sit back and enjoy the humor train 🚂—I'm ready to crack you up!`)
});

bot.onText(/\/joke/, async (option) => {
    const response = await axios.get('http://www.official-joke-api.appspot.com/random_joke');

    console.log(response.data);

    const setup = response.data.setup;
    const punchLine = response.data.punchline;

    bot.sendMessage(option.chat.id, setup + ' , ' + punchLine);
})
