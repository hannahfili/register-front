/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  // console.log(params);
  return {
    class_id: params.class_id,
    subject_id: params.subject_id,
  };
}
