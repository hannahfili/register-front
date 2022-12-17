<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import {
    setRoleMode,
    getTeacherId,
    getStudentId,
  } from "../../lib/js-lib/helpers";
  import { getAllClasses } from "../../lib/stores/SchoolClass";
  import { getTeacherClasses } from "../../lib/stores/Teacher";
  import { getSubjectsAssignedToThisStudent } from "../../lib/stores/Student";
  import { user } from "../../lib/js-lib/user_info.js";
  import {
    showNameRelatedToCurrentYear,
    getSubjectsAssignedToThisClass,
  } from "../../lib/stores/SchoolClass";

  let roleMode = {
    teacherMode: false,
    studentMode: false,
    adminMode: false,
  };
  let token;
  let selectSchoolClasses = [];
  let chosenSchoolClassId;
  let chosenSubjectId;
  let selectSubjects = [];
  let studentId;
  onMount(async () => {
    let userReceived = localStorage.getItem("user");
    if (userReceived) {
      $user = JSON.parse(userReceived);
    } else {
      goto(`/`);
      return;
    }
    roleMode = setRoleMode($user);
    selectSchoolClasses = await getSchoolClassesForSelect(roleMode);
    selectSchoolClasses = prepareSchoolClassesNames(selectSchoolClasses);
    if (roleMode.studentMode) {
      await getSubjectsForSelect(roleMode);
    }
  });
  async function getSubjectsForSelect(roleModeType) {
    if (roleModeType.adminMode) {
      selectSubjects = await getSubjectsAssignedToThisClass(
        chosenSchoolClassId
      );
    } else if (roleModeType.studentMode) {
      studentId = await getStudentId($user.id);
      // console.log(studentId);
      selectSubjects = await getSubjectsAssignedToThisStudent(studentId);
    }
  }
  async function getSchoolClassesForSelect(roleModeType) {
    let schoolClasses = [];
    if (roleModeType.adminMode) {
      schoolClasses = await getAllClasses();
      schoolClasses = schoolClasses.data;
    } else if (roleModeType.teacherMode) {
      let teacherId = await getTeacherId(token);
      schoolClasses = await getTeacherClasses(teacherId);
    }
    return schoolClasses;
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
  function onSubmit() {
    console.log(chosenSubjectId);
    if (chosenSubjectId == "") {
      alert("Wybierz przedmiot");
      return;
    }
    if (roleMode.teacherMode) {
      chosenSubjectId = $user.subjectId;
    }
    if (roleMode.adminMode || roleMode.teacherMode) {
      goto(`marks/class/${chosenSchoolClassId}/subject/${chosenSubjectId}`);
    } else if (roleMode.studentMode) {
      goto(`marks/student/${studentId}/subject/${chosenSubjectId}`);
    }
  }
</script>

<div>
  <form on:submit|preventDefault={() => onSubmit()}>
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
          {#each selectSubjects as subject}
            <option value={subject.id}>{subject.name}</option>
          {/each}
        </select>
      </div>
    {/if}
    <button type="submit">Pokaż oceny</button>
  </form>
</div>
