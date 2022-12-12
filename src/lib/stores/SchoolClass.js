import {
  genericPost,
  genericGetAll,
  genericDelete,
  genericPut,
  genericGetById,
  genericPostWithoutBody,
} from "$lib/js-lib/httpMethods.js";
import { handleError } from "../js-lib/errors";

let ClassDTO = {
  name: "A",
  class_start: "1900-09-01",
  class_end: "1903-08-31",
};
const ROUTE = "/school_classes";

export function showNameRelatedToCurrentYear(class_start, class_name) {
  let ageDifMs = Date.now() - new Date(class_start);
  if (ageDifMs < 0) {
    return "0 " + class_name;
  }
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  let years = Math.abs(ageDate.getUTCFullYear() - 1970);

  // console.log(years);
  return years + 1 + " " + class_name;
}
export async function dischargeStudentFromClass(studentId) {
  let response;
  let route = "/discharge_student_from_class/" + studentId;
  try {
    response = await genericPostWithoutBody(route);
  } catch (err) {
    handleError(err, "usuwanie ucznia z klasy");
    return err;
  }
  return await response.json();
}

export async function createClass(classDTO) {
  let response;
  try {
    response = await genericPost(ROUTE, classDTO);
    return await response.json();
  } catch (err) {
    handleError(err, "dodawanie klasy");
    return err;
  }
  return await response.json();
}
export async function getAllClasses() {
  let response;
  try {
    response = await genericGetAll(ROUTE);
  } catch (err) {
    handleError(err, "pobieranie wszystkich klas");
  }
  return await response.json();
}
export async function deleteClass(id) {
  let response;
  try {
    response = await genericDelete(ROUTE, id);
  } catch (err) {
    handleError(err, "usuwanie wybranej klasy");
  }
  return await response.json();
}
export async function putClass(id, classDTO) {
  let response;
  try {
    response = await genericPut(ROUTE, id, classDTO);
    return await response.json();
  } catch (err) {
    handleError(err, "edycja klasy");
    return err;
  }
}
export async function getClassById(id) {
  let response;
  try {
    response = await genericGetById(ROUTE, id);
  } catch (err) {
    handleError(err, "pobieranie klasy na podstawie ID");
  }
  let json = await response.json();
  return json.data;
}
export async function getSubjectsAssignedToThisClass(classId) {
  let route = `/display_subjects_assigned_to_class/${classId}`;
  let response;
  try {
    response = await genericGetAll(route);
  } catch (err) {
    handleError(err, "pobieranie przedmiotów przypisanych do wybranej klasy");
    return err;
  }
  let json = await response.json();
  return json.data;
}
