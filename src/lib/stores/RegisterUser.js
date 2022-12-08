import {
  genericPost,
  genericGetAll,
  genericDelete,
  genericPut,
  genericGetById,
} from "$lib/js-lib/httpMethods.js";
import { handleError } from "../js-lib/errors";

// let RegisterUserAdmin = {
//   name: "",
//   surname: "",
//   email: "",
//   password: "",
//   isAdmin: true,
// };
// let RegisterUserStudent = {
//   name: "",
//   surname: "",
//   email: "",
//   password: "",
//   isAdmin: false,
//   isStudent: true,
// };
// let RegisterUserTeacher = {
//   name: "",
//   surname: "",
//   email: "",
//   password: "",
//   isAdmin: false,
//   isTeacher: true,
// };
let UserDto = {
  name: "",
  surname: "",
  email: "",
  password: "",
  isAdmin: false,
  isStudent: false,
  isTeacher: false,
};
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
  console.log("putUser");
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
  let getUserByIdResult;
  try {
    getUserByIdResult = await genericGetById("/users", id);
  } catch (err) {
    handleError(err, "pobieranie Użytkownika na podstawie ID");
  }
  let json = await getUserByIdResult.json();
  // console.log(json);
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
