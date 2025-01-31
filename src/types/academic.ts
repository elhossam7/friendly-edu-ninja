// src/types/academic.ts

export interface Term {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  order: number;
}

export interface AcademicYear {
  name: string;
  startDate: Date;
  endDate: Date;
  terms: Term[];
}

export interface AcademicYearFormData {
  academicYear: AcademicYear;
}