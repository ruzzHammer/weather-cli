import chalk from "chalk";
import dedent from "dedent-js";
import { declOfPrepositionalCase } from "../helpers/decl.js";
import { showEmojiFromIcon } from "../helpers/emoji.js";

const printError = (error) => {
  console.log(`${chalk.bgRed(" ERROR ")} ${error}`);
};

const printSuccess = (message) => {
  console.log(`${chalk.bgGreen(" SUCCESS ")} ${message}`);
};

const printHelp = () => {
  console.log(dedent` 
        ${chalk.bgCyan(" HELP ")}
        Без параметров - вывод погоды 
        -s [CITY] для установки города
        -h для вывода помощи
        -t [API_KEY] для сохранения токена
    `);
};

const printWeather = (weatherData) => {
  console.log(dedent`
        Погода в ${declOfPrepositionalCase(weatherData.name)}: ${Number(weatherData.main.temp) >= 0 ? "+" : ""}${Number(weatherData.main.temp).toFixed(1)}
        Ощущается как ${Number(weatherData.main.feels_like) >= 0 ? "+" : ""}${Number(weatherData.main.feels_like).toFixed(1)}
        ${showEmojiFromIcon(weatherData.weather[0].icon)}  ${weatherData.weather[0].description}
        Влажность: ${weatherData.main.humidity}%
    `);
};

export { printError, printSuccess, printHelp, printWeather };
