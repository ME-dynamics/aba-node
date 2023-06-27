## Secure Random Number

The `secureRandomNumber` function generates a random number securely and asynchronously within a specified range.

### Usage

To use the `secureRandomNumber` function, you need to import it into your code and call it with the desired parameters. Here's an example:

```typescript
import { secureRandomNumber } from "aba-node";

// Define the minimum and maximum values for the random number range
const args = {
  min: 0, // Specify the minimum value
  max: 100, // Specify the maximum value
};

async function generateRandomNumber() {
  try {
    // Generate a secure random number
    const randomNumber = await secureRandomNumber(args);
    console.log("Random Number:", randomNumber);
  } catch (error) {
    console.error("Error:", error);
  }
}

generateRandomNumber();
```

In this example, the `secureRandomNumber` function is called with `min` set to 0 and `max` set to 100. The function is awaited within an `async` function using the `await` keyword to ensure the asynchronous execution. The generated secure random number is then logged to the console.

### Error Handling

The `secureRandomNumber` function performs several checks on the input parameters and throws specific errors if any conditions are not met. You can handle these errors by using a `try/catch` block or by wrapping the function call in a `try/catch` when using `await`.

```javascript
try {
  const randomNumber = await secureRandomNumber(args);
  // Use the generated random number
} catch (error) {
  // Handle the error
}
```

When an error occurs, it will be caught in the `catch` block, allowing you to handle the error appropriately in your application.

### Security Considerations

The `secureRandomNumber` function utilizes the `cryptoRandom` function from a separate module to generate random bytes securely. It ensures that the generated random number falls within the specified range without introducing bias. The function follows best practices for generating secure random numbers in a safe and unbiased manner.

