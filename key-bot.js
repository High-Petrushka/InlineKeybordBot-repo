const { Bot, InlineKeyboard } = require('grammy');
const { emojiParser } = require('@grammyjs/emoji');

const bot = new Bot('7081370541:AAHbwRj2bPR2iYIYgc7OmyuvEHRGTU0TKwE');

bot.use(emojiParser());

bot.command('start', async (ctx) => {
	const username = ctx.update.message.from.first_name;
	await ctx.replyWithEmoji`Hello, ${username} ${'winking_face'}\nAnd wellcome to the Movie Test!\nPress underneath button to get started`;
});

bot.start();