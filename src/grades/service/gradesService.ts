import { courses, students } from "../../index.js";
import { showErrorModal } from "../../dom/index.js";
import { Grade, GradeFullData, Student } from "../../types";
import { generateId } from "../../utils.js";

export const getGradesTotal = (grades: Grade[]): number => {
  return grades.length;
};

export const getGradeFullData = (grade: Grade): GradeFullData => {
  const gradeStudent = students.find(
    (student) => student.id === grade.studentId
  );
  const gradeStudentName = gradeStudent?.name;
  const gradeStudentLastName = gradeStudent?.lastName;

  const gradeCourse = courses.find((course) => course.id === grade.courseId);
  const gradeCourseName = gradeCourse?.name;

  const gradeFullData: GradeFullData = {
    grade: grade,
    studentName: gradeStudentName,
    studentLastName: gradeStudentLastName,
    courseName: gradeCourseName,
  };

  return gradeFullData;
};

export const deleteGrade = (grades: Grade[], id: number): void => {
  const toDeleteGrade = grades.find((grade) => id === grade.id);
  const toDeleteGradeId = toDeleteGrade?.id;
  const toDeleteGradePosition = grades.findIndex(
    (grade) => grade.id === toDeleteGradeId
  );

  grades.splice(toDeleteGradePosition, 1);
};

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
    id: generateId(grades),
    studentId: addedStudentId,
    courseId: addedCourseId,
    value: addedGrade,
  });

  return grades;
};
