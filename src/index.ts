/**
 * An simple logging function that logs a message to the console.
 * @param message Message to being logged
 * @returns {T} Typed return
 */
function log<T = string>(message: T): void | T {
  console.log(message);
  return message;
}

export default log;
