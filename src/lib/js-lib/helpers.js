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
export async function getTeacherId(userToken) {
  //TODO PRZY LOGOWANIU
  return 1;
}
export async function getStudentId(userToken) {
  //TODO przy logowaniu
  return 1;
}
