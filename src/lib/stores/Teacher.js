import {
  genericPost,
  genericGetAll,
  genericDelete,
  genericPut,
  genericGetById,
  genericPostWithoutBody,
} from "$lib/js-lib/httpMethods.js";
import { handleError } from "../js-lib/errors";
const ROUTE = "/teachers";
export async function getAllTeachers() {
  let response;
  let route = ROUTE + "/getAll";
  try {
    response = await genericGetAll(route);
  } catch (err) {
    handleError(err, "pobieranie wszystkich nauczycieli");
  }
  return await response.json();
}
export async function getTeachersNotAssignedToAnySubject() {
  let response;
  let route = ROUTE + "/not_assigned_to_any_subject";
  try {
    response = await genericGetAll(route);
  } catch (err) {
    handleError(err, "pobieranie wszystkich nauczycieli");
  }
  return await response.json();
}
export async function getTeacherClasses(teacherId) {
  let response;
  let route = `/teacher/${teacherId}/get_subject_assigned`;
  try {
    response = await genericGetAll(route);
  } catch (err) {
    handleError(err, "pobieranie przedmiotu przypisanego do nauczyciela");
  }
  if (response instanceof Error) {
    return null;
  } else {
    let json = await response.json();
    return json.data.sclasses;
  }
}
