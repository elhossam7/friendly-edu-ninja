import * as z from "zod";

export interface Resource {
  id: string;
  name: string;
  type: "document" | "video" | "link";
  url?: string;
  size?: number;
}

export interface Curriculum {
  syllabus: string;
  learningObjectives: string[];
  resources: Resource[];
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  teacherId: string;
  curriculum: Curriculum;
}

export const resourceSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Resource name is required"),
  type: z.enum(["document", "video", "link"]),
  url: z.string().optional(),
  size: z.number().optional(),
});

export const curriculumSchema = z.object({
  syllabus: z.string(),
  learningObjectives: z.array(z.string().min(1, "Learning objective is required")),
  resources: z.array(resourceSchema),
});

export const subjectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Subject name is required"),
  description: z.string(),
  teacherId: z.string(),
  curriculum: curriculumSchema,
});

export const formSchema = z.object({
  subjects: z.array(subjectSchema).min(1, "At least one subject is required"),
});

export type SubjectFormData = z.infer<typeof formSchema>;
