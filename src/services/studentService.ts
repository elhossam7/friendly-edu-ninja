import { v4 as uuidv4 } from 'uuid';
import { app } from '@/lib/firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore(app);

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

class StudentService {
  private students: Student[] = [];

  constructor() {}

  // Create a new student
  async addStudent(firstName: string, lastName: string, email: string): Promise<Student> {
    const newStudent: Student = {
      id: uuidv4(),
      firstName,
      lastName,
      email,
    };

    this.students.push(newStudent);
    return newStudent;
  }

  // Get all students
  async getAllStudents(): Promise<Student[]> {
    return this.students;
  }

  // Get a student by ID
  async getStudentById(id: string): Promise<Student | undefined> {
    return this.students.find((student) => student.id === id);
  }

  // Update a student by ID
  async updateStudent(id: string, updatedFields: Partial<Omit<Student, 'id'>>): Promise<Student | null> {
    const index = this.students.findIndex((student) => student.id === id);
    if (index === -1) {
      return null;
    }

    this.students[index] = { ...this.students[index], ...updatedFields };
    return this.students[index];
  }

  // Remove a student by ID
  async removeStudent(id: string): Promise<boolean> {
    const index = this.students.findIndex((student) => student.id === id);
    if (index === -1) {
      return false;
    }

    this.students.splice(index, 1);
    return true;
  }
}

export default new StudentService();

export interface StudentData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  classId: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  createdAt: Date;
}

export async function addStudent(data: Omit<StudentData, 'createdAt'>) {
  try {
    const studentData = {
      ...data,
      createdAt: new Date(),
    };
    
    const docRef = await addDoc(collection(db, 'students'), studentData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
}