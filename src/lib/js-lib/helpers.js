import { handleError } from "../js-lib/errors";
import {
  genericPost,
  genericGetUserByToken,
  genericGetAll,
} from "./httpMethods.js";

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
export function setRoleMode(user) {
  let roleMode = {
    teacherMode: user.isTeacher,
    studentMode: user.isStudent,
    adminMode: user.isAdmin,
  };
  return roleMode;
}
export async function getTeacherId(userId) {
  let response;
  let route = `/user/${userId}/get_teacher_id`;
  try {
    response = await genericGetAll(route);
    let json = await response.json();
    return json.data;
  } catch (err) {
    handleError(err, "pobieranie ID nauczyciela, którym jest użytkownik");
    return null;
  }
}
export async function getStudentId(userId) {
  let response;
  let route = `/user/${userId}/get_student_id`;
  try {
    response = await genericGetAll(route);
    let json = await response.json();
    return json.data;
  } catch (err) {
    handleError(err, "pobieranie ID ucznia, którym jest użytkownik");
    return null;
  }
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
    response = await genericGetUserByToken("/user_assigned_to_token", tokenDTO);
    return await response.json();
  } catch (err) {
    handleError(err, "pobieranie danych użytkownika na podstawie tokenu");
    return err;
  }
}
