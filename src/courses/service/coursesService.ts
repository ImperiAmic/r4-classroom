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

  courses.push({
    id: generateId(courses),
    name: newCourseName,
  });

  return courses;
};

export const deleteCourse = (courses: Course[], id: number): void => {
  const toDeleteCourse = courses.find((course: Course) => id === course.id);

  const toDeleteCourseId = toDeleteCourse?.id;

  const courseToDeletePosition = courses.findIndex(
    (course) => course.id === toDeleteCourseId
  );

  courses.splice(courseToDeletePosition, 1);
};

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
