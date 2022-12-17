import { writable } from "svelte/store";
// export const user_token = writable(null);
// export const user_isAdmin = writable(null);
// export const user_isTeacher = writable(null);
// export const user_isStudent = writable(null);
// export const subject_id = writable(null);
// export const school_class_id = writable(null);
// export const user_id = writable(null);

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
