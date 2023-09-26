const functions = require("./functions.js");

async function returnCharCount(params) {
  const result = [];

  try {
    await Promise.all(
      params.map(async (element) => {
        const c = await functions.countChar(element.location, element.char);
        result.push({
          char: element.char,
          count: c,
          resource: element.location,
        });
      })
    );

    return result;
  } catch (error) {
    console.error("returnCharCount Error:", error);

    throw error;
  }
}

async function returnLocation() {
  const result = [];

  try {
    const locationData = await functions.getLocationByCharacter();
    result.push(locationData);

    return result;
  } catch (error) {
    console.error("returnLocation Error:", error);

    throw error;
  }
}

async function solver(exerciseName, func) {
  try {
    const [resp, time] = await functions.measureExecutionTime(
      func,
      exerciseName
    );

    const result = {
      exercise_name: exerciseName,
      time: time || "problem with measureTime",
      in_time: time <= 3,
      results: resp,
    };

    console.log(result);

    return result;
  } catch (error) {
    console.error("Error:", error);

    // You can handle the error here, such as returning an error object or message.
    // For example:
    return {
      exercise_name: exerciseName,
      error: error.message || "An error occurred in solver function",
    };
  }
}

/*
### Usa la API de Rick and Morty para probar tus habilidades 🥼

Tienes que consultar todos los `character`, `locations` y `episodes` de https://rickandmortyapi.com/ e indicar:

1. Char counter:
    - cuántas veces aparece la letra **"l"** (case insensitive) en los nombres de todos los `location`
    - cuántas veces aparece la letra **"e"** (case insensitive) en los nombres de todos los `episode`
    - cuántas veces aparece la letra **"c"** (case insensitive) en los nombres de todos los `character`
    - cuánto tardó el programa 👆 en total (desde inicio ejecución hasta entrega de resultados)
2. Episode locations:
    - para cada `episode`, indicar la cantidad y un listado con las `location` (`origin`) de todos los `character` que aparecieron en ese `episode` (sin repetir)
    - cuánto tardó el programa 👆 en total (desde inicio ejecución hasta entrega de resultados)

*/

//Parametros para prueba
const params = [
  { location: "location", char: "l" },
  { location: "episode", char: "e" },
  { location: "character", char: "c" },
];

async function runResponse() {
  const charCounterResult = await solver("Char counter", () =>
    returnCharCount(params)
  );
  const episodeLocationsResult = await solver("Episode locations", () =>
    returnLocation()
  );

  const results = [charCounterResult, episodeLocationsResult];

  functions.exportToJson(results, "output.json");
}

runResponse();
