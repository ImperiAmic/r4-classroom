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
): Student[] | undefined => {
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
    return;
  }

  students.push({
    id: generateId(students),
    name: newStudentName,
    lastName: newStudentLastName,
    age: newStudentAge,
    email: newStudentEmail,
    phoneNumber: newStudentPhoneNumber,
  });

  return students;
};

export const deleteStudent = (students: Student[], id: number): void => {
  const toDeleteStudent = students.find((student) => id === student.id);

  const toDeleteStudentId = toDeleteStudent?.id;

  const studentToDeletePosition = students.findIndex(
    (student) => student.id === toDeleteStudentId
  );

  students.splice(studentToDeletePosition, 1);
};

export const getStudentsOptions = (students: Student[]): StudentOption[] => {
  const studentsOptions: StudentOption[] = students.map((student) => ({
    id: student.id,
    name: student.name,
    lastName: student.lastName,
  }));

  return studentsOptions;
};

export const getStudentNameById = (students: Student[], id: number): string => {
  const toFindStudent = students.find((student) => student.id === id);
  const toFindStudentName = toFindStudent?.name;
  const toFindStudentLastName = toFindStudent?.lastName;
  const toFindStudentFullName = `${toFindStudentName} ${toFindStudentLastName}`;
  return toFindStudentFullName;
};
