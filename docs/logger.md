## Logger

The `buildLogger` function is a utility function that helps create a logger with specific options. It is designed to work with the `pino` logging library. [Pino js documents](https://getpino.io/)

### Usage

To use the `buildLogger` function, you need to import it into your code and call it with the desired options.

```typescript
import { buildLogger } from "aba-node";

// Define your logger options
const loggerOptions = {
  // Specify your logger options here
};

// Build the logger
const logger = buildLogger(loggerOptions);

// Use the logger to log messages
const log = logger.init();
log.info("Log message");
```

The `buildLogger` function takes an object `options` as a parameter, which should contain the desired logger options. The available options depend on the specific requirements of your application. Please refer to the documentation of the `pino` library for more details on the available options.

### Logger Methods

The logger returned by the `buildLogger` function provides the following methods:

#### `init(data?: Record<string, unknown>): tPinoLogger`

This method initializes the logger and returns a child logger instance. It accepts an optional `data` parameter, which can be an object containing additional metadata to include in the log entries. If `data` is provided, the child logger will include the metadata and the logger options (`details`) in its log entries. If `data` is not provided, only the logger options will be included.

The `init` method also generates a unique ID for the logger instance within the scope of the `logger` function. This ID helps identify log entries associated with this specific logger instance.

#### `metadata(data: Record<string, unknown>)`

This method is a helper function that returns an object with an `init` method. The `init` method can be called to initialize the logger with the provided `data` as metadata. This method is useful when you want to initialize the logger with metadata but defer the actual initialization until later in your code.

The `metadata` method allows you to add one-time data to the logger over the course of the function. It provides a convenient way to include additional metadata specific to certain log entries.

### Example

Here's an example of how you can use the `buildLogger` function:

```typescript
import { buildLogger } from "aba-node";

// Define your logger options
const loggerOptions = {
  // Specify your logger options here
};

// Build the logger
const logger = buildLogger(loggerOptions);

// Initialize the logger with metadata
const log = logger.metadata({ userId: 123 }).init();

// Perform some actions

// Initialize the logger with the metadata and log a message
log.info("User logged in");
```

In this example, the `metadata` object is created using the `logger.metadata` method, which returns an object with an `init` method. The `init` method is then called to initialize the logger with the provided metadata (`{ userId: 123 }`). Finally, the `info` method is called on the initialized logger to log a message indicating that a user has logged in.
