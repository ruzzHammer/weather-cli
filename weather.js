#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from "./services/log.service.js";
import {
  saveKeyValue,
  STORAGE_DICTIONARY,
} from "./services/storage.service.js";
import { getWeather } from "./services/api.service.js";

const saveToken = async (token) => {
  if (!token) {
    printError("Не передан токен");
    return;
  }
  try {
    await saveKeyValue(STORAGE_DICTIONARY.token, token);
    printSuccess("Токен сохранён");
  } catch (e) {
    printError(e.message);
  }
};

const saveCity = async (city) => {
  if (!city) {
    printError("Не передан город");
    return;
  }
  try {
    await saveKeyValue(STORAGE_DICTIONARY.city, city);
    printSuccess("Город сохранён");
  } catch (e) {
    printError(e.message);
  }
};

const getForecast = async () => {
  try {
    const weatherData = await getWeather();
    printWeather(weatherData);
  } catch (e) {
    if (e?.response?.status === 401) {
      printError("Неверно указан город");
    } else if (e?.response?.status === 404) {
      printError("Неверно указан API ключ");
    } else {
      printError(e.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }

  if (args.s) {
    return saveCity(args.s);
  }

  if (args.t) {
    return saveToken(args.t);
  }

  getForecast();
};

initCLI();
