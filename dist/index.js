"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const telegraf_1 = require("telegraf");
const node_fetch_1 = __importDefault(require("node-fetch"));
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
async function getUsesrData() {
    const resp = await (0, node_fetch_1.default)(process.env.API_KEY);
    const data = await resp.json();
    return data;
}
getUsesrData();
bot.telegram.setMyCommands([
    { command: "/start", description: 'start bot' },
    { command: "/help", description: 'help command' },
    { command: '/about', description: 'about bot' },
    { command: '/team', description: 'about bot team' }
]);
bot.start(async (ctx) => ctx.reply(process.env.START_MESSAGE));
bot.hears('/birthdaysList', async (ctx) => {
    const users = await getUsesrData();
    let str = '';
    users.forEach((element) => {
        str += `${element.username} - ${element.birthday}\n`;
    });
    ctx.telegram.sendMessage(ctx.message.chat.id, str);
});
bot.command('about', async (ctx) => ctx.reply(process.env.ABOUT_MESSAGE));
bot.command('team', async (ctx) => ctx.reply(process.env.TEAM_MESSAGE));
bot.help(async (ctx) => ctx.reply(process.env.HELP_MESSAGE));
bot.launch();
//# sourceMappingURL=index.js.map