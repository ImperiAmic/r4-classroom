import { courses, students } from "../../index.js";
import { showErrorModal } from "../../dom/index.js";
import { Grade } from "../../types";
import { generateId } from "../../utils.js";

export const getGradesTotal = (grades: Grade[]): number => {
  return grades.length;
};

// Crea una función para obtener los datos completos de una nota
// La función debe recibir una nota
// La función debe devolver un objeto con las mismas propiedades de la nota
// más las propiedades studentName, studentLastName y courseName
// export const getGradeFullData =

// Crea una función para eliminar una nota de la lista de notas
// La función debe recibir un array de notas y el id de la nota a eliminar
// export const deleteGrade =

// Crea una función para crear una nueva nota
// La función debe recibir un array de notas, el id del estudiante, el id del curso y el valor de la nota
// Si la nota ya existe, muestra un error con showErrorModal

export const addGrade = (
  grades: Grade[],
  addedStudentId: number,
  addedCourseId: number,
  addedGrade: number
): Grade[] | undefined => {
  const isAddedStudentIdFound = grades.some(
    (grade) => grade.studentId === addedStudentId
  );
  const isAddedCourseIdFound = grades.some(
    (grade) => grade.courseId === addedCourseId
  );
  const isAddedGradeFound = grades.some((grade) => grade.value === addedGrade);
  const isNewGradeFound =
    isAddedStudentIdFound && isAddedCourseIdFound && isAddedGradeFound;

  if (isNewGradeFound) {
    showErrorModal("Nota ya añadida para este curso y estudiante");
    return;
  }

  grades.push({
    id: generateId(courses),
    studentId: addedStudentId,
    courseId: addedCourseId,
    value: addedGrade,
  });

  return grades;
};
