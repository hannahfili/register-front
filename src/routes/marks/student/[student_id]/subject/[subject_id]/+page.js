/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  return {
    student_id: params.student_id,
    subject_id: params.subject_id,
  };
}
