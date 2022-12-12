<script>
  import { onMount } from "svelte";
  import {
    setRoleMode,
    getTeacherId,
    getStudentId,
  } from "../../lib/js-lib/helpers";
  import { getAllClasses } from "../../lib/stores/SchoolClass";
  import { getTeacherClasses } from "../../lib/stores/Teacher";
  import { showNameRelatedToCurrentYear } from "../../lib/stores/SchoolClass";

  let roleMode = {
    teacherMode: false,
    studentMode: false,
    adminMode: false,
  };
  let adminMode;
  let studentMode;
  let teacherMode;
  let token;
  let selectSchoolClasses = [];
  let chosenSchoolClassId;
  let chosenSubjectId;
  let selectSubjects = [];
  onMount(async () => {
    token = "123"; //TO DO == POBIERZ TOKEN Z LOCALSTORAGE
    roleMode = setRoleMode(token);
    await getSchoolClassesForSelect(roleMode);
    selectSchoolClasses = prepareSchoolClassesNames(selectSchoolClasses);
  });
  async function getSubjectsForSelect(roleMode) {
    if (roleMode.adminMode) {
      selectSubjects = await getSubjectsAssignedToThisClass(
        chosenSchoolClassId
      );
    } else if (roleMode.studentMode) {
      let studentId = await getStudentId(token);
      selectSubjects = await getSubjectsAssignedToThisStudent(studentId);
    }
  }
  async function getSchoolClassesForSelect(roleMode) {
    if (roleMode.adminMode) {
      selectSchoolClasses = await getAllClasses();
      selectSchoolClasses = selectSchoolClasses.data;
    } else if (roleMode.teacherMode) {
      let teacherId = await getTeacherId(token);
      selectSchoolClasses = await getTeacherClasses(teacherId);
    }
  }
  function prepareSchoolClassesNames(classesArray) {
    for (let schoolClass of classesArray) {
      schoolClass.name = showNameRelatedToCurrentYear(
        schoolClass.class_start,
        schoolClass.name
      );
    }
    return classesArray;
  }
</script>

<div>
  {#if roleMode.adminMode || roleMode.teacherMode}
    <div>
      Wybierz klasę:
      <select
        bind:value={chosenSchoolClassId}
        on:change={async () => getSubjectsForSelect(roleMode)}
      >
        <option value="" selected disabled hidden>Wybierz</option>
        {#each selectSchoolClasses as schoolClass}
          <option value={schoolClass.id}>{schoolClass.name}</option>
        {/each}
      </select>
    </div>
  {/if}
  {#if roleMode.adminMode || roleMode.studentMode}
    <div>
      Wybierz przedmiot:
      <select bind:value={chosenSubjectId}>
        <option value="" selected disabled hidden>Wybierz</option>
        {#each selectSchoolClasses as schoolClass}
          <option value={schoolClass.id}>{schoolClass.name}</option>
        {/each}
      </select>
    </div>
  {/if}
</div>
<!-- <div>ELO</div> -->
