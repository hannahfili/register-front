// import { getSubjectAssignedToThisTeacher } from "../stores/Teacher";
// import { getClassAssignedToThisStudent } from "../stores/Student";
import { handleError } from "../js-lib/errors";
import { genericPost } from "./httpMethods.js";

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
export function addOptionalParameters(url, parametersDictionary) {
  let urlWithParameters = url + "?";
  if (parametersDictionary == null || isEmpty(parametersDictionary)) return url;
  for (var key in parametersDictionary) {
    urlWithParameters += `${key}=${parametersDictionary[key]}&`;
  }
  urlWithParameters = urlWithParameters.substring(
    0,
    urlWithParameters.length - 1
  );
  return urlWithParameters;
}
export function setRoleMode(userToken) {
  // TODO PRZY LOGOWANIU
  let roleMode = {
    teacherMode: false,
    studentMode: false,
    adminMode: true,
  };
  return roleMode;
}
export async function getTeacherId(userId) {
  //TODO PRZY LOGOWANIU
  return 1;
}
export async function getStudentId(userId) {
  //TODO przy logowaniu
  return 1;
}
export function extractToken(token) {
  let pipeIndex = token.indexOf("|");
  return token.substring(pipeIndex + 1, token.length);
}

export async function getUserAssignedToToken(tokenValue) {
  let response;
  let tokenDTO = {
    token: tokenValue,
  };
  try {
    response = await genericPost("/user_assigned_to_token", tokenDTO);
    return await response.json();
  } catch (err) {
    handleError(err, "pobieranie danych użytkownika na podstawie tokenu");
    return err;
  }
}
