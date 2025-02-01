export interface Subject {
  id: string;
  name: string;
  description: string;
  teacherId: string;
  curriculum: Curriculum;
}

export interface Curriculum {
  syllabus: string;
  learningObjectives: string[];
  resources: Resource[];
}

export interface Resource {
  id: string;
  name: string;
  type: "document" | "video" | "link";
  url: string;
  size?: number; // in bytes, for files
}

export interface SubjectFormData {
  subjects: Subject[];
}
