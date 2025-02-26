import { Course, Grade, Student } from "../types";

class Storage<Type> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  fillWithInitialData(initialData: Type[]): void {
    const data = localStorage.getItem(this.key);

    if (!data) {
      localStorage.setItem(this.key, JSON.stringify(initialData));
    }
  }

  load(): Type[] {
    const data = localStorage.getItem(this.key);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  }

  save(data: Type[]): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}

export const studentsStorage = new Storage<Student>("students");
export const coursesStorage = new Storage<Course>("courses");
export const gradesStorage = new Storage<Grade>("grades");
