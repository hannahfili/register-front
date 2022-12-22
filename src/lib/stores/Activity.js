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
