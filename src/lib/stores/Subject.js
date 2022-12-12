import {
  genericPost,
  genericGetAll,
  genericDelete,
  genericPut,
  genericGetById,
  genericPostWithoutBody,
} from "$lib/js-lib/httpMethods.js";
import { handleError } from "../js-lib/errors";

const ROUTE = "/subjects";

export async function createSubject(subjectDTO) {
  if (subjectDTO.description == "") {
    delete subjectDTO.description;
  }
  let response;
  //   console.log(subjectDTO);
  try {
    response = await genericPost(ROUTE, subjectDTO);
  } catch (err) {
    handleError(err, "dodawanie przedmiotu szkolnego");
    return err;
  }
  return await response.json();
}
export async function assignSubjectToTeacher(teacherId, subjectId) {
  let route = `/assign_subject_to_teacher/${subjectId}/${teacherId}`;
  let response;
  try {
    response = await genericPostWithoutBody(route);
  } catch (err) {
    handleError(err, "dodawanie przedmiotu szkolnego");
    return err;
  }
  return await response.json();
}
export async function getAllSubjects() {
  let response;
  try {
    response = await genericGetAll(ROUTE);
  } catch (err) {
    handleError(err, "pobieranie wszystkich przedmiotów szkolnych");
    return err;
  }
  return await response.json();
}
export async function getSubjectById(id) {
  let response;
  try {
    response = await genericGetById(ROUTE, id);
  } catch (err) {
    handleError(err, "pobieranie przedmiotu szkolnego na podstawie ID");
    return err;
  }
  let json = await response.json();
  return json.data;
}
export async function deleteSubject(id) {
  let response;
  try {
    response = await genericDelete(ROUTE, id);
  } catch (err) {
    handleError(err, "usuwanie wybranej klasy");
  }
  return await response.json();
}
export async function getClassesAssignedToThisSubject(subjectId) {
  let route = `/subject/${subjectId}/classes`;
  let response;
  try {
    response = await genericGetAll(route);
  } catch (err) {
    handleError(err, "pobieranie klas przypisanych do wybranego przedmiotu");
    return err;
  }
  let json = await response.json();
  return json.data;
}

export async function getTeacherAssignedToThisSubject(subjectId) {
  let route = `/subject/${subjectId}/assigned_teacher`;
  let response;
  try {
    response = await genericGetAll(route);
  } catch (err) {
    handleError(
      err,
      "pobieranie nauczyciela przypisanego do wybranego przedmiotu"
    );
    return err;
  }
  let json = await response.json();
  return json.data;
}

export async function dischargeClassFromSubject(subjectId, classId) {
  let response;
  let route = `/subject/${subjectId}/discharge_class/${classId}`;
  try {
    response = await genericPostWithoutBody(route);
  } catch (err) {
    handleError(err, "usuwanie klasy z realizacji przedmiotu");
    return err;
  }
  return await response.json();
}
export async function getClassesNOTAssignedToThisSubject(subjectId) {
  let route = `/subject/${subjectId}/not_assigned_classes`;
  let response;
  try {
    response = await genericGetAll(route);
  } catch (err) {
    handleError(
      err,
      "pobieranie klas, które nie są przypisane do wybranego przedmiotu"
    );
    return err;
  }
  let json = await response.json();
  return json.data;
}
export async function assignClassToSubject(subjectId, classId) {
  let route = `/assign_class/${classId}/to_subject/${subjectId}`;
  let response;
  try {
    response = await genericPostWithoutBody(route);
  } catch (err) {
    handleError(err, "przypisywanie klasy do przedmiotu");
    return err;
  }
  let json = await response.json();
  return json.data;
}
