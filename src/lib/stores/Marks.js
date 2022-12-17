import {
  genericPost,
  genericGetAll,
  genericDelete,
  genericPut,
  genericGetById,
  genericDeleteWithAdditionalParam,
} from "$lib/js-lib/httpMethods.js";
import { handleError } from "../js-lib/errors";
const ROUTE = "/marks";
export async function createMark(markDto) {
  let response;
  try {
    response = await genericPost(ROUTE, markDto);
    return await response.json();
  } catch (err) {
    handleError(err, "dodawanie klasy");
    return err;
  }
}
export async function getAllMarks() {
  let response;
  try {
    response = await genericGetAll(ROUTE);
  } catch (err) {
    handleError(err, "pobieranie wszystkich ocen");
  }
  return await response.json();
}
export async function deleteMark(markId, moderatorId) {
  let response;
  let route = `/marks/${markId}/${moderatorId}`;
  try {
    response = await genericDeleteWithAdditionalParam(route);
  } catch (err) {
    handleError(err, "usuwanie wybranej oceny");
  }
  return await response.json();
}
export async function putMark(id, markDto) {
  let response;
  try {
    response = await genericPut(ROUTE, id, markDto);
    return await response.json();
  } catch (err) {
    handleError(err, "edycja oceny");
    return err;
  }
}
export async function getMarkById(id) {
  let response;
  try {
    response = await genericGetById(ROUTE, id);
  } catch (err) {
    handleError(err, "pobieranie oceny na podstawie ID");
  }
  let json = await response.json();
  return json.data;
}
export async function getClassMarksOfParticularSubjectDividedByStudents(
  classId,
  subjectId
) {
  let response;
  let route = `/marks/class/${classId}/subject/${subjectId}`;
  try {
    response = await genericGetAll(route);
  } catch (err) {
    handleError(err, "pobieranie ocen danej klasy z podziałem na uczniów");
  }
  if (response instanceof Error) {
    return null;
  } else {
    let json = await response.json();
    return json.data;
  }
}
