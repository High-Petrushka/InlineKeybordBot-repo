const { Bot, InlineKeyboard } = require('grammy');
const { emojiParser } = require('@grammyjs/emoji');

const bot = new Bot('');

const startBtn = new InlineKeyboard().text('start testing', 'start');

const firstQuest = new InlineKeyboard()
	.text(`by Hicox's fingers gesture`, '-1').row()
	.text(`by Stiglitz's appearance` , '-1').row()
	.text(`by playing "Who an I?"`, '-1').row()
	.text(`by all mentioned factors`, '1');

const secondQuest = new InlineKeyboard()
	.text(`Le Big Mac`, '-2').row()
	.text(`Royale with Cheese`, '2').row()
	.text(`Whopper`, '-2').row()
	.text(`McCrispy`, '-2');

const thirdQuest = new InlineKeyboard()
	.text('Spagetti Westerns', '3').row()
	.text('Pizza Westerns', '-3').row()
	.text('Rizotto Westerns', '-3').row()
	.text('Wine Westerns', '-3');

const forthQuest = new InlineKeyboard()
	.text('M41A Pluse Rifle', '-4').row()
	.text('Podbyrin 9.2 mm Pistol', '-4').row()
	.text('Adams Revolver', '-4').row()
	.text('Star Model B', '4');

bot.use(emojiParser());

bot.command('start', async (ctx) => {
	const username = ctx.update.message.from.first_name;
	const respond = ctx.emoji`Hello, ${username} ${'winking_face'}\nAnd wellcome to the Movie Test!\nPress underneath button to get started`;
	await ctx.reply(respond, {
		reply_markup: startBtn,
	});
});

bot.command('help', async (ctx) => {
	const answer = ctx.emoji`/start - begin messaging\n/help - see all available options\nAlso you can use buttons, that the bot offers ${'melting_face'}`;
	await ctx.reply(answer);
});

let totalResult = new Array;

bot.callbackQuery('start', async (ctx) => {
	await ctx.reply(`How did Dieter Hellstrom figure out\nBustard's plan in the bar scene?`, {
		reply_markup: firstQuest,
	});
});

bot.callbackQuery('1', async (ctx) => {
	const answer = ctx.update.callback_query.data;
	console.log(answer);

	totalResult.push(Number(answer));

	await ctx.reply('How do people in Francec call the\n"Quarter Pounder with Chees"?', {
		reply_markup: secondQuest,
	});
});

bot.callbackQuery('-1', async (ctx) => {
	const answer = ctx.update.callback_query.data;
	console.log(answer);

	totalResult.push(Number(answer));

	await ctx.reply('How do people in Francec call the\n"Quarter Pounder with Chees"?', {
		reply_markup: secondQuest,
	});
});

bot.callbackQuery('2', async (ctx) => {
	const answer = ctx.update.callback_query.data;
	console.log(answer);

	totalResult.push(Number(answer));

	await ctx.reply('How did Rick Dalton call Westerns that\nwere made in Itally?', {
		reply_markup: thirdQuest,
	});
});

bot.callbackQuery('-2', async (ctx) => {
	const answer = ctx.update.callback_query.data;
	console.log(answer);

	totalResult.push(answer);

	await ctx.reply('How did Rick Dalton call Westerns that\nwere made in Itally?', {
		reply_markup: thirdQuest,
	});
});

bot.callbackQuery('3', async (ctx) => {
	const answer = ctx.update.callback_query.data;
	console.log(answer);

	totalResult.push(Number(answer));

	await ctx.reply('What kind of gun used Jules in "Pulp\nFiction"?', {
		reply_markup: forthQuest,
	});
});

bot.callbackQuery('-3', async (ctx) => {
	const answer = ctx.update.callback_query.data;
	console.log(answer);

	totalResult.push(answer);

	await ctx.reply('What kind of gun used Jules in "Pulp\nFiction"?', {
		reply_markup: forthQuest,
	});
});

bot.on('callback_query:data', async (ctx) => {
	console.log('Unknown button event with payload', ctx.callbackQuery.data);
	await ctx.answerCallbackQuery(); // remove loading animation
});

bot.on('message', async (ctx) => {
	await ctx.reply('Please, use /help command to see all\navailable options in terms of interaction with the bot', {
		reply_parameters: {message_id: ctx.update.message.message_id},
	});
});

bot.start();