import { Course } from "./course.model";
import { Student } from "./student.model";


export interface Enrollment {
  id?: number;
  student: Student;
  course: Course;
  enrollmentDate?: Date;
}
