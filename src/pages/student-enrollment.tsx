import React from "react";
import { AddStudentForm } from "@/components/forms/AddStudentForm";
import { addStudent } from "@/services/studentService";
import { useToast } from "@/components/ui/use-toast";

const StudentEnrollment = () => {
  const { toast } = useToast();

  const handleAddStudent = async (data: any) => {
    try {
      await addStudent(data);
      toast({
        title: "Student Added",
        description: "Student enrollment successful.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error enrolling student.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Enrollment</h1>
      <AddStudentForm onSubmit={handleAddStudent} />
    </div>
  );
};

export default StudentEnrollment;
