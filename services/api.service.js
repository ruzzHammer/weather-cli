import axios from "axios";
import { getKeyValue, STORAGE_DICTIONARY } from "./storage.service.js";

const getExistingToken = async () => {
  const token =
    process.env.TOKEN ?? (await getKeyValue(STORAGE_DICTIONARY.token));
  if (!token) {
    throw new Error(
      "Не задан ключ API. Задайте его через команду -t [API_KEY]"
    );
  }
  return token;
};

const getLocation = async (city) => {
  const { data, status } = await axios.get(
    "https://api.openweathermap.org/geo/1.0/direct",
    {
      params: {
        q: city,
        appid: await getExistingToken(),
      },
    }
  );

  if (!data || status !== 200) {
    throw new Error("Не найден город");
  }

  return {
    lat: data[0].lat,
    lon: data[0].lon,
  };
};

const getWeather = async () => {
  const { lat, lon } = await getLocation(
    await getKeyValue(STORAGE_DICTIONARY.token)
  );
  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        lat,
        lon,
        appid: await getExistingToken(),
        lang: "ru",
        units: "metric",
      },
    }
  );
  return data;
};

export { getWeather };
