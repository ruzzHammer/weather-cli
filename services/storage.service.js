import { homedir } from "os";
import { join } from "path";
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";

const filePath = join(homedir(), "weather-data.json");

const STORAGE_DICTIONARY = {
  token: "token",
  city: "city",
};

const saveKeyValue = async (key, value) => {
  let data = {};

  if (existsSync(filePath)) {
    const file = await readFile(filePath);
    data = JSON.parse(file);
  }

  data[key] = value;
  await writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
  if (existsSync(filePath)) {
    const file = await readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
  return;
};

export { saveKeyValue, getKeyValue, STORAGE_DICTIONARY };
