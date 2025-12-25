
export interface Student {
  id: string;
  name: string;
  class: string;
  roll: number;
  guardianName: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
  dues: number;
}

export interface Teacher {
  id: string;
  name: string;
  designation: string;
  subject: string;
  phone: string;
  joiningDate: string;
}

export interface Jamat {
  id: string;
  name: string;
}

export interface Subject {
  id: string;
  name: string;
  jamatId: string;
}

export interface Exam {
  id: string;
  name: string;
}

export interface Mark {
  subjectId: string;
  obtainedMarks: number;
}

export interface ResultRecord {
  id: string;
  studentId: string;
  examId: string;
  marks: Mark[];
}

export interface TransactionCategory {
  id: string;
  name: string;
  type: 'income' | 'expense';
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  categoryId: string;
  amount: number;
  date: string;
  note: string;
}

export interface MadrasaProfile {
  name: string;
  address: string;
  phone: string;
  email: string;
  established: string;
  logo: string; // Base64 string
}

export type View = 'dashboard' | 'students' | 'teachers' | 'fees' | 'results' | 'accounts' | 'ai-assistant' | 'settings' | 'profile';
