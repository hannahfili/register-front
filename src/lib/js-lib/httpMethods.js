import { addOptionalParameters } from "./helpers";
import { HttpMethodError } from "./errors";
import { json } from "@sveltejs/kit";

const apiAddress = "http://localhost:8000/api";

function getUserToken() {
  let userReceived = localStorage.getItem("user");
  let user = null;
  if (userReceived) {
    user = JSON.parse(userReceived);
  }
  return user.token;
}
export async function genericLogIn(
  route,
  bodyToJsonize,
  optionalParameters = null
) {
  let response;
  let url = apiAddress.concat(route);
  url = addOptionalParameters(url, optionalParameters);

  let fetchData = {
    method: "POST",
    body: JSON.stringify(bodyToJsonize),
    headers: new Headers({
      "content-type": "application/json",
    }),
  };

  response = await fetch(url, fetchData);
  if (!response.ok) {
    await handleNotOkResponse(response);
  }

  return response;
}
export async function genericPost(
  route,
  bodyToJsonize,
  optionalParameters = null
) {
  let token = getUserToken();
  let response;
  let url = apiAddress.concat(route);
  url = addOptionalParameters(url, optionalParameters);

  let fetchData = {
    method: "POST",
    body: JSON.stringify(bodyToJsonize),
    headers: new Headers({
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    }),
  };

  response = await fetch(url, fetchData);
  if (!response.ok) {
    await handleNotOkResponse(response);
  }

  return response;
}
export async function genericGetUserByToken(
  route,
  bodyToJsonize,
  optionalParameters = null
) {
  let response;
  let url = apiAddress.concat(route);
  url = addOptionalParameters(url, optionalParameters);

  let fetchData = {
    method: "POST",
    body: JSON.stringify(bodyToJsonize),
    headers: new Headers({
      "content-type": "application/json",
    }),
  };

  response = await fetch(url, fetchData);
  if (!response.ok) {
    await handleNotOkResponse(response);
  }

  return response;
}
export async function genericPostWithoutBody(route) {
  let token = getUserToken();
  let response;
  let url = apiAddress.concat(route);
  // url = addOptionalParameters(url, optionalParameters);

  let fetchData = {
    method: "POST",
    // body: JSON.stringify(bodyToJsonize),
    headers: new Headers({
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    }),
  };

  response = await fetch(url, fetchData);
  if (!response.ok) {
    await handleNotOkResponse(response);
  }

  return response;
}

export async function genericGetAll(route) {
  let token = getUserToken();
  let url = apiAddress.concat(route);
  let response;

  let fetchData = {
    method: "GET",
    headers: new Headers({
      // "content-type": "application/json",
      authorization: `Bearer ${token}`,
    }),
  };

  response = await fetch(url, fetchData);
  if (!response.ok) {
    await handleNotOkResponse(response);
  }
  return response;
}
export async function genericGetById(route, id) {
  let token = getUserToken();
  let halfUrl = route + "/" + id;
  let url = apiAddress.concat(halfUrl);
  let response;
  let fetchData = {
    method: "GET",
    headers: new Headers({
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    }),
  };

  response = await fetch(url, fetchData);

  if (!response.ok) {
    await handleNotOkResponse(response);
  }
  return response;
}
export async function genericDeleteWithAdditionalParam(route) {
  let token = getUserToken();
  let url = apiAddress.concat(route);
  let response;
  let fetchData = {
    method: "DELETE",
    headers: new Headers({
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    }),
  };

  response = await fetch(url, fetchData);

  if (!response.ok) {
    await handleNotOkResponse(response);
  }
  return response;
}
export async function genericDelete(route, id) {
  let token = getUserToken();
  let halfUrl = route + "/" + id;
  let url = apiAddress.concat(halfUrl);
  let response;
  let fetchData = {
    method: "DELETE",
    headers: new Headers({
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    }),
  };

  response = await fetch(url, fetchData);

  if (!response.ok) {
    await handleNotOkResponse(response);
  }
  return response;
}
export async function genericPut(
  route,
  id,
  bodyToJsonize,
  optionalParameters = null
) {
  let token = getUserToken();
  let response;
  let halfUrl = route + "/" + id;
  let url = apiAddress.concat(halfUrl);
  url = addOptionalParameters(url, optionalParameters);
  console.log(bodyToJsonize);
  let fetchData = {
    method: "PUT",
    body: JSON.stringify(bodyToJsonize),
    headers: new Headers({
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    }),
  };

  response = await fetch(url, fetchData);
  if (!response.ok) {
    await handleNotOkResponse(response);
  }

  return response;
}

async function handleNotOkResponse(response) {
  console.log(response);
  console.log(response.status);
  let json = await response.clone().json();
  console.log(json);

  let info = "";
  if (json.name) {
    info = "Nazwa już istnieje";
  } else if (json.status) {
    info = json.status + " " + json.data;
  }

  let message = `Kod błędu: ${response.status} | Szczegóły: ${info}`;
  throw new HttpMethodError(message);
}
