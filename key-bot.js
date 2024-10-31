const { Bot, InlineKeyboard } = require('grammy');
const { emojiParser } = require('@grammyjs/emoji');

const bot = new Bot('7081370541:AAHbwRj2bPR2iYIYgc7OmyuvEHRGTU0TKwE');
const startBtn = new InlineKeyboard().text('start testing', 'start');
const questKeyboard = new InlineKeyboard().text('A', '1').text('B', '2').text('C', '3').text('D', '4');

bot.use(emojiParser());

bot.command('start', async (ctx) => {
	const username = ctx.update.message.from.first_name;
	const respond = ctx.emoji`Hello, ${username} ${'winking_face'}\nAnd wellcome to the Movie Test!\nPress underneath button to get started`;
	await ctx.reply(respond, {
		reply_markup: startBtn,
	});
});

bot.callbackQuery('start', async (ctx) => {
	await ctx.reply('First question...', {
		reply_markup: questKeyboard,
	});
});

bot.start();