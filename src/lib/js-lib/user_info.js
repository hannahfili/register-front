import { writable } from "svelte/store";

export const user = writable({
  id: null,
  token: null,
  isAdmin: false,
  isTeacher: false,
  isStudent: false,
  subjectId: null,
  schoolClassId: null,
  email: null,
});
