/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  console.log(params);
  return {
    class_id: params.slug,
    subject_id: params.id,
  };
}
