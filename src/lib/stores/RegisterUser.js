import { genericPost } from "$lib/js-lib/httpMethods.js";
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
    return response;
  } catch (err) {
    handleError(err, "dodawanie użytkownika");
    return err;
  }
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
