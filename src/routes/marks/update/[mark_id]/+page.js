/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  // console.log(params);
  return {
    mark_id: params.mark_id,
  };
}
