import {
  genericPost,
  genericGetAll,
  genericDelete,
  genericPut,
  genericGetById,
  genericPostWithoutBody,
} from "$lib/js-lib/httpMethods.js";
import { handleError } from "../js-lib/errors";

let ActivityDTO = {
  name: "praca klasowa",
  conversion_factor: "0.5",
};
const ROUTE = "/activities";

export async function createActivity(activityDTO) {
  let response;
  try {
    response = await genericPost(ROUTE, activityDTO);
  } catch (err) {
    handleError(err, "dodawanie aktywności");
    return err;
  }
  return await response.json();
}
export async function getAllActivities() {
  let response;
  try {
    response = await genericGetAll(ROUTE);
  } catch (err) {
    handleError(err, "pobieranie wszystkich aktywności");
  }
  let json = await response.json();
  return json.data;
}
export async function deleteActivity(id) {
  let response;
  try {
    response = await genericDelete(ROUTE, id);
  } catch (err) {
    handleError(err, "usuwanie wybranej aktywności");
  }
  return await response.json();
}
// export async function putClass(id, classDTO) {
//   let response;
//   try {
//     response = await genericPut(ROUTE, id, classDTO);
//     return await response.json();
//   } catch (err) {
//     handleError(err, "edycja klasy");
//     return err;
//   }
// }
// export async function getClassById(id) {
//   let response;
//   try {
//     response = await genericGetById(ROUTE, id);
//   } catch (err) {
//     handleError(err, "pobieranie klasy na podstawie ID");
//   }
//   let json = await response.json();
//   return json.data;
// }
// export async function getSubjectsAssignedToThisClass(classId) {
//   let route = `/display_subjects_assigned_to_class/${classId}`;
//   let response;
//   try {
//     response = await genericGetAll(route);
//   } catch (err) {
//     handleError(err, "pobieranie przedmiotów przypisanych do wybranej klasy");
//     return err;
//   }
//   let json = await response.json();
//   return json.data;
// }
