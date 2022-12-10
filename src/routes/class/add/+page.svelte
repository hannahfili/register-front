<script>
  import { goto } from "$app/navigation";
  import ClassForm from "../../../lib/components/ClassForm.svelte";
  import { createClass } from "../../../lib/stores/SchoolClass";
  let ClassDTO;
  async function createClassAndRedirect() {
    let addClassResult = await createClass(ClassDTO);
    if (!(addClassResult instanceof Error)) {
      alert("Pomyślnie dodano nową klasę");
      goto(`/class/showAll`);
    }
  }
</script>

<ClassForm bind:ClassDTO onSubmit={async () => createClassAndRedirect()} />
