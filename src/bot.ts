import { Client } from "discord.js";
import config from "../config.json";
import mongoose from "mongoose";
import Deps from "./utils/deps";
import { EventEmitter } from "events";

export const bot = new Client(),
  emitter = new EventEmitter();

import EventsService from "./services/events.service";
import { API } from "./api/server";
import Log from "./utils/log";

bot.login(config.bot.token);

Deps.get<EventsService>(EventsService).init();
Deps.build(API);

mongoose.connect(
  config.mongoURL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  (error) =>
    error
      ? Log.error("Failed to connect to db", "bot")
      : Log.info("Connected to db", "bot")
);
