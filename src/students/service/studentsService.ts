import { showErrorModal } from "../../dom/index.js";
import { students } from "../../index.js";
import { Student, StudentOption } from "../../types.js";
import { generateId } from "../../utils.js";

export const getStudentsTotal = (students: Student[]): number => {
  return students.length;
};

export const addStudent = (
  students: Student[],
  newStudentName: string,
  newStudentLastName: string,
  newStudentAge: number,
  newStudentEmail: string,
  newStudentPhoneNumber: string
): Student[] => {
  const toLowerCaseNewStudentEmail = newStudentEmail.toLowerCase();
  const isEmailFound = students.some(
    (student) => student.email === toLowerCaseNewStudentEmail
  );
  const isPhoneNumberFound = students.some(
    (student) => student.phoneNumber === newStudentPhoneNumber
  );
  const isNewStudentFound = isEmailFound || isPhoneNumberFound;

  if (isNewStudentFound) {
    showErrorModal("Ya existe un estudiante con este email y/o teléfono");
    process.exit();
  }

  const newStudent: Student = {
    id: generateId(students),
    name: newStudentName,
    lastName: newStudentLastName,
    age: newStudentAge,
    email: newStudentEmail,
    phoneNumber: newStudentPhoneNumber,
  };

  return students.splice(getStudentsTotal(students), 0, newStudent);
};

export const deleteStudent = (students: Student[], id: number): void => {
  const toDeleteStudent = students.find(
    (student: Student) => id === student.id
  );

  const toDeleteStudentId = toDeleteStudent?.id;

  const studentToDeletePosition = students.findIndex(
    (student) => student.id === toDeleteStudentId
  );

  students.splice(studentToDeletePosition, 1);
};

export const getStudentsOptions = (students: Student[]): StudentOption[] => {
  let studentsOptions: StudentOption[] = [];

  students.forEach((student) => {
    studentsOptions.push({
      id: student.id,
      name: student.name,
      lastName: student.lastName,
    });
  });

  return studentsOptions;
};

// Crea una función para obtener el nombre completo de un estudiante por su id
// La función debe recibir un array de estudiantes y el id del estudiante
// export const getStudentNameById =
