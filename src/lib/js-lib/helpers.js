import {
  user_token,
  user_role,
  subject_id,
  school_class_id,
  user_id,
} from "../stores";

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
async function setGlobalVars(userToken) {
  let user = await getUserAssignedToToken(userToken);
  $user_token = userToken;
  $user_id = user.id;
  $user_isAdmin = user.isAdmin;
  $user_isTeacher = user.isTeacher;
  $user_isStudent = user.isStudent;
  if (user.isAdmin) {
    $subject_id = await getSubjectAssid;
  }
}
async function getUserAssignedToToken(tokenValue) {
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
