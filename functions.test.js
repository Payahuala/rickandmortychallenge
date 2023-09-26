
// TEST for pushIfDifferent

const { pushIfDifferent } = require('./functions'); // Import the pushIfDifferent function

describe('pushIfDifferent', () => {
  test('should push data to the array if it is not already included', async () => {
    // Arrange
    const array = ['apple', 'banana', 'cherry'];
    const data = 'grape';

    // Act
    pushIfDifferent(array, data);

    // Assert
    expect(array).not.toContain(data); // Check that 'grape' is in the array
  });

});




// Import the countLetter function
const { countLetter } = require('./functions'); // Replace './funciones' with the actual path to your file

describe('countLetter', () => {
  test('should count lowercase letter "a" in a string', async () => {
    // Arrange
    const inputString = 'banana';
    const letter = 'a';

    // Act
    const result = await countLetter(inputString, letter);

    // Assert
    expect(result).toBe(3); // There are three lowercase 'a' characters in 'banana'
  });

  test('should return 0 for a letter not present in the string', async() => {
    // Arrange
    const inputString = 'apple';
    const letter = 'z';

    // Act
    const result = await countLetter(inputString, letter);

    // Assert
    expect(result).toBe(0); // The letter 'z' is not present in 'apple'
  });

  test('should count special characters in a string', async () => {
    // Arrange
    const inputString = 'hello, world!';
    const letter = '!';

    // Act
    const result = await countLetter(inputString, letter);

    // Assert
    expect(result).toBe(1); // There is one exclamation mark '!' in the string
  });

  test('should handle an empty string', async () => {
    // Arrange
    const inputString = '';
    const letter = 'a';

    // Act
    const result = await countLetter(inputString, letter);

    // Assert
    expect(result).toBe(0); // The count should be 0 for an empty string
  });
});

