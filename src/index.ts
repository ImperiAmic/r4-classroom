import { renderHeader } from "./components/header.js";
import {
  coursesStorage,
  gradesStorage,
  studentsStorage,
} from "./storage/Storage.js";
import { Course, Grade, Student } from "./types";
import { generateId } from "./utils.js";

export let students: Student[] = [];
export let courses: Course[] = [];
export let grades: Grade[] = [];

const fillInitialStudents = () => {
  students.push({
    id: generateId(students),
    name: "Luis",
    lastName: "Sánchez",
    age: 25,
    email: "lsanchez@email.com",
    phoneNumber: "627182727",
  });
  students.push({
    id: generateId(students),
    name: "Marta",
    lastName: "García",
    age: 31,
    email: "marta.garcia@gmail.com",
    phoneNumber: "611743829",
  });
  students.push({
    id: generateId(students),
    name: "Carlos",
    lastName: "Jiménez",
    age: 33,
    email: "carlangas@hotmail.com",
    phoneNumber: "610999287",
  });
  students.push({
    id: generateId(students),
    name: "Ana",
    lastName: "Martínez",
    age: 28,
    email: "anita_m@outlook.com",
    phoneNumber: "669223109",
  });
};
fillInitialStudents();

studentsStorage.fillWithInitialData(students);

students = studentsStorage.load();
courses = coursesStorage.load();
grades = gradesStorage.load();

renderHeader();

const currentUrl = new URL(window.location.href);

switch (currentUrl.pathname) {
  case "/estudiantes":
    import("./students/dom/studentsDom.js").then(({ renderStudentsTable }) => {
      renderStudentsTable();
    });

    break;
  case "/cursos":
    import("./courses/dom/coursesDom.js").then(({ renderCoursesTable }) => {
      renderCoursesTable();
    });

    break;
  case "/notas":
    import("./grades/dom/gradesDom.js").then(({ renderGradesTable }) => {
      renderGradesTable();
    });

    break;
  case "/estadisticas":
    import("./stats/dom/statsDom.js").then(({ renderStatsCards }) => {
      renderStatsCards(courses, students);
    });

    break;
}
