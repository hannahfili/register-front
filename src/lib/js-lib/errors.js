export class HttpMethodError extends Error {
  // @ts-ignore
  constructor(message, errors = null) {
    super(message);
    this.name = "HttpMethodError";
    this.message = message;
    // @ts-ignore
    this.errorsList = errors;
  }
}
// @ts-ignore
export function handleError(error, actionName) {
  let alert_message = "";
  if (error instanceof HttpMethodError) {
    let displayErrors = "";
    if (error.errorsList != null) {
      for (let key in error.errorsList) {
        displayErrors += error.errorsList[key];
        displayErrors += " ";
      }
    }
    alert_message = `Błąd HTTP przy wysyłaniu danych!\nWykonywana akcja: [${actionName}]\nInformacje o błędzie:\n${error.message}\n${displayErrors}`;
  } else if (error instanceof Error) {
    alert_message = `Wystąpił inny błąd: ${error.message}\n${error.stack}\nWykonywana akcja: [${actionName}]`;
  }
  alert(alert_message);
}
