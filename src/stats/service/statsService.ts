import { courses, grades, students } from "../../index.js";
import { CourseStats } from "../../types";

export const getCourseStats = (courseId: number): CourseStats => {
  const minimumApprovedGradeValue = 5;

  const gradesStats = grades.filter((grade) => grade.courseId === courseId);

  const studentsCount = gradesStats.length;

  const studentsPassedCount = gradesStats.filter(
    (selectedGrade) => selectedGrade.value >= minimumApprovedGradeValue
  ).length;
  const studentPassedPercentage = (studentsPassedCount / studentsCount) * 100;

  const studentsFailedCount = gradesStats.filter(
    (selectedGrades) => selectedGrades.value < minimumApprovedGradeValue
  ).length;
  const studentsFailedPercentage = (studentsFailedCount / studentsCount) * 100;

  const selectedGradeValues = gradesStats.map((grade) => grade.value);

  const selectedGradeValuesSum = selectedGradeValues.reduce(
    (currentValue, nextValue) => currentValue + nextValue,
    0
  );
  const averageGrade = selectedGradeValuesSum / studentsCount;

  const highestGrade = Math.max(...selectedGradeValues);

  const studentAAA = gradesStats.find((grade) => grade.value === highestGrade);

  const highestGradeStudentId = Number(studentAAA?.studentId);

  const courseStats: CourseStats = {
    courseId: courseId,
    studentsCount: studentsCount,
    passedCount: studentsPassedCount,
    passedCountPercentage: studentPassedPercentage,
    failedCount: studentsFailedCount,
    failedCountPercentage: studentsFailedPercentage,
    averageGrade: averageGrade,
    highestGrade: highestGrade,
    highestGradeStudentId: highestGradeStudentId,
  };

  return courseStats;
};
