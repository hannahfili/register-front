import {
  genericPost,
  genericGetAll,
  genericDelete,
  genericPut,
  genericGetById,
} from "$lib/js-lib/httpMethods.js";
import { handleError } from "../js-lib/errors";
import { genericLogIn } from "../js-lib/httpMethods";

// let UserDto = {
//   id: 0,
//   name: "",
//   surname: "",
//   email: "",
//   password: "",
//   isAdmin: false,
//   isStudent: false,
//   isTeacher: false,
// };
export async function logIn(userDto) {
  let response;
  try {
    response = await genericLogIn("/login", userDto);
    return await response.json();
  } catch (err) {
    handleError(err, "logowanie użytkownika");
    return err;
  }
}
export function usersAreEqual(user1, user2) {
  if (
    user1.id == user2.id &&
    user1.name.toUpperCase() == user2.name.toUpperCase() &&
    user1.surname.toUpperCase() == user2.surname.toUpperCase() &&
    user1.email.toUpperCase() == user2.email.toUpperCase() &&
    user1.password == user2.password &&
    user1.isAdmin == user2.isAdmin &&
    user1.isTeacher == user2.isTeacher &&
    user1.isStudent == user2.isStudent
  ) {
    return true;
  }
  return false;
}
export function prepareUserDtoForUpdate(oldUser, newUser) {
  oldUser.password = undefined;

  if (usersAreEqual(oldUser, newUser)) {
    throw new Error("Nowe dane powinny różnić się od starych");
  }
  if (typeof newUser.password == "undefined") {
    delete newUser.password;
  }
  if (
    newUser.name == "" ||
    newUser.name.toUpperCase() == oldUser.name.toUpperCase()
  ) {
    delete newUser.name;
  }
  if (
    newUser.surname == "" ||
    newUser.surname.toUpperCase() == oldUser.surname.toUpperCase()
  ) {
    delete newUser.surname;
  }
  if (
    newUser.email == "" ||
    newUser.email.toUpperCase() == oldUser.email.toUpperCase()
  ) {
    delete newUser.email;
  }
  if (userDtoContainsOnlyId(newUser)) {
    throw new Error("Brak danych do edycji, nie wpisano nowych danych");
  }
  return newUser;
}
export function userDtoContainsOnlyId(userDto) {
  let propertyNames = [
    "name",
    "surname",
    "email",
    "password",
    "isAdmin",
    "isStudent",
    "isTeacher",
  ];
  let userDtoContainsAtLeastOnePropertyOtherThanId = false;
  for (let propName of propertyNames) {
    if (objectHasProperty(userDto, propName)) {
      userDtoContainsAtLeastOnePropertyOtherThanId = true;
      break;
    }
  }
  return !userDtoContainsAtLeastOnePropertyOtherThanId;
}
function objectHasProperty(objectInstance, propertyName) {
  if (propertyName in objectInstance) return true;
  return false;
}
export function setAllRolesToFalse(userDto) {
  userDto.isAdmin = false;
  userDto.isTeacher = false;
  userDto.isStudent = false;
  return userDto;
}
export async function createUser(userDto) {
  let response;
  try {
    response = await genericPost("/users", userDto);
    return await response.json();
  } catch (err) {
    handleError(err, "dodawanie użytkownika");
    return err;
  }
}
export async function getAllUsers() {
  let response;
  try {
    response = await genericGetAll("/users");
  } catch (err) {
    handleError(err, "pobieranie wszystkich Użytkowników");
  }
  return await response.json();
}
export async function deleteUser(userId) {
  let response;
  try {
    response = await genericDelete("/users", userId);
  } catch (err) {
    handleError(err, "usuwanie wybranego Użytkownika");
  }
  return await response.json();
}
export async function putUser(id, userDto) {
  let response;
  try {
    response = await genericPut("/users", id, userDto);
    return await response.json();
  } catch (err) {
    handleError(err, "edycja Użytkownika");
    return err;
  }
}
export async function getUserById(id) {
  let route = `/get_user_by_id/${id}`;
  let getUserByIdResult;
  try {
    getUserByIdResult = await genericGetAll(route);
  } catch (err) {
    handleError(err, "pobieranie Użytkownika na podstawie ID");
  }
  let json = await getUserByIdResult.json();
  return json.data;
}
// export async function putBuildingAddress(
//   id,
//   buldingAddressDTO,
//   optionalParameters = null
// ) {
//   let response;
//   try {
//     response = await genericPut(
//       "/BuildingAddress",
//       id,
//       buldingAddressDTO,
//       optionalParameters
//     );
//     return response;
//   } catch (err) {
//     handleError(err, "edycja Adresu Budynku");
//     return err;
//   }
// }
