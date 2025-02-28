import { showErrorModal } from "../../dom/index.js";
import { courses } from "../../index.js";
import { Course, Grade } from "../../types";
import { generateId } from "../../utils.js";

export const getCoursesTotal = (courses: Course[]): number => {
  return courses.length;
};

export const addCourse = (
  courses: Course[],
  newCourseName: string
): Course[] | undefined => {
  const toLowerCaseNewCourseName = newCourseName.toLowerCase();
  const isCourseFound = courses.some(
    (course) => course.name.toLowerCase() === toLowerCaseNewCourseName
  );

  if (/^\s/.test(newCourseName)) {
    showErrorModal("El curso no puede empezar con un espacio en blanco");
    return;
  }

  if (isCourseFound) {
    showErrorModal("Ya existe un curso con este nombre");
    return;
  }

  const newCourse: Course = {
    id: generateId(courses),
    name: newCourseName,
  };

  return courses.splice(getCoursesTotal(courses), 0, newCourse);
};

export const deleteCourse = (courses: Course[], id: number): void => {
  const toDeleteCourse = courses.find((course: Course) => id === course.id);

  const toDeleteCourseId = toDeleteCourse?.id;

  const courseToDeletePosition = courses.findIndex(
    (course) => course.id === toDeleteCourseId
  );

  courses.splice(courseToDeletePosition, 1);
};

// Crea una función para obtener las opciones de cursos para rellenar un select
// La función debe recibir un array de cursos
// La función debe devolver un array de objetos con dos propiedades: id y name
// La propiedad id debe ser el id del curso
// La propiedad name debe ser el nombre del curso
export const getCoursesOptions = (courses: Course[]): Course[] => {
  let coursesOptions: Course[] = [];

  courses.forEach((course) => {
    coursesOptions.push({
      id: course.id,
      name: course.name,
    });
  });

  return coursesOptions;
};
