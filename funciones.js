const fs = require('fs');

let myFilePath = './response/output.json';
const characters = "https://rickandmortyapi.com/api/character"; //Characters data
const locations = "https://rickandmortyapi.com/api/location"; // locations data
const episodes = "https://rickandmortyapi.com/api/episode"; // episodes data

async function getData(URL) {
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//function to count letters by 'letter' from a string 'inputString'
async function countLetter(inputString, letter) {
  let count = 0;
  const lowerCaseInput = inputString.toLowerCase();
  const lowerCaseLetter = letter.toLowerCase();

  for (let i = 0; i < lowerCaseInput.length; i++) {
    if (lowerCaseInput[i] === lowerCaseLetter) {
      count++;
    }
  }

  return count;
}

//function for counting a letter from an array of data
async function countChar(name, letter) {
  const data = {
    episode: episodes,
    character: characters,
    location: locations,
  };
  const rawData = await getData(data[name]);
  const resp = rawData.results;
  let suma = 0;

  for (let i = 0; i < resp.length; i++) {
    suma += await countLetter(resp[i].name, letter);
  }
  return suma;
}

function pushIfDifferent(array, data) {
  if (!array.includes(data)) {
    array.push(data);
  }
}

//fetch data concurrently
async function getLocationByCharacter() {
  try {
    const episodeData = (await getData(episodes))?.results;

    if (!episodeData || !Array.isArray(episodeData)) {
      throw new Error('No episode data or invalid data.');
    }

    const results = []; // Use an array to store results for each episode

    await Promise.all(
      episodeData.map(async (episode) => {
        const location = []; // Use an array to store location data for this episode
        const episodeInfo = {
          name: episode.name,
          episode: episode.episode,
          location: location, // Store the location data in this episodeInfo object
        };
        console.log(`Working on: ${episode.name} ...`);

        // Fetch character data concurrently using Promise.all
        const characterPromises = episode.characters.map(async (characterURL) => {
          const character = await getData(characterURL);
          pushIfDifferent(location, character?.origin?.name);
        });

        await Promise.all(characterPromises);

        results.push(episodeInfo); // Store the episodeInfo object in the results array
      })
    );

    return results; // Return an array of episodeInfo objects, each containing location data for an episode
  } catch (error) {
    console.error('Error in getLocationByCharacter:', error);
    return []; // Handle the error by returning an empty array or another appropriate value.
  }
}


function exportToJson(data) {
  try {
    // Convert the data to JSON format
    const jsonData = JSON.stringify(data, null, 2); // The second argument adds indentation for readability (optional).

    // Write the JSON data to the specified file
    fs.writeFileSync(myFilePath, jsonData);

    console.log(`Data exported to ${myFilePath}`);
  } catch (error) {
    console.error("Error exporting data:", error);
  }
}

//return time execution
async function measureExecutionTime(func, timerName) {
  console.time(timerName); // Start the timer

  // Execute the provided function
  const respFunc = await func();

  console.timeEnd(timerName); // End the timer and log the elapsed time

  // Calculate and return the elapsed time in milliseconds
  const respTime = console.timeLog(timerName);

  return [respFunc, respTime];
}

module.exports = {
  countChar,
  getLocationByCharacter,
  exportToJson,
  measureExecutionTime,
};
