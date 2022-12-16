import {
  genericPost,
  genericGetAll,
  genericDelete,
  genericPut,
  genericGetById,
  genericPostWithoutBody,
} from "$lib/js-lib/httpMethods.js";
import { handleError } from "../js-lib/errors";
const ROUTE = "/students";
export async function getAllStudents() {
  let response;
  let route = ROUTE + "/getAll";
  try {
    response = await genericGetAll(route);
  } catch (err) {
    handleError(err, "pobieranie wszystkich uczniów");
  }
  return await response.json();
}
export async function getNotAssignedStudents() {
  let response;
  let route = ROUTE + "/not_assigned";
  try {
    response = await genericGetAll(route);
  } catch (err) {
    handleError(err, "pobieranie wszystkich uczniów");
  }
  return await response.json();
}
export async function assignManyStudentsToClass(students, classId) {
  let error_occured = false;
  for (let student of students) {
    let studentAssignResponse = await assignOneStudentToClass(
      student.id,
      classId
    );
    console.log(studentAssignResponse);
    console.log(studentAssignResponse instanceof Error);
    if (studentAssignResponse instanceof Error) error_occured = true;
  }
  console.log(error_occured);
  return !error_occured;
}
export async function assignOneStudentToClass(studentId, classId) {
  let route = `/assign_student_to_class/${classId}/${studentId}`;
  let response;
  try {
    response = await genericPostWithoutBody(route);
  } catch (err) {
    handleError(err, "przypisywanie ucznia do klasy");
    return err;
  }
  return await response.json();
}
export async function getSubjectsAssignedToThisStudent(studentId) {}

export async function getClassAssignedToThisStudent(studentUserId) {
  let response;
  let route = `/student/${studentUserId}/get_class`;
  try {
    response = await genericGetAll(route);
    let json = await response.json();
    return json.data.id;
  } catch (err) {
    handleError(
      err,
      "pobieranie klasy, do której przypisany jest wybrany uczeń"
    );
    return null;
  }
}
