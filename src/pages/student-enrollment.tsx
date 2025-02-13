import * as React from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { AddStudentForm } from "@/components/forms/AddStudentForm";
import { addStudent } from "@/services/studentService";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { StudentData } from "@/services/studentService";

const StudentEnrollment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [enrollmentProgress, setEnrollmentProgress] = React.useState(0);

  React.useEffect(() => {
    let timer: any;
    if (isLoading) {
      setEnrollmentProgress(0);
      timer = setInterval(() => {
        setEnrollmentProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isLoading, setEnrollmentProgress]);

  const handleAddStudent = async (formData: StudentData) => {
    try {
      setIsLoading(true);
      setEnrollmentProgress(30); // Show initial progress
      
      // Process the form data
      const studentData: StudentData = {
        ...formData,
        status: formData.status || 'active'
      };

      const studentId = await addStudent(studentData);
      setEnrollmentProgress(100);
      
      toast({
        title: "Success",
        description: `Student ${formData.firstName} ${formData.lastName} enrolled successfully`,
        variant: "default",
      });

      // Delay navigation to show success state
      setTimeout(() => {
        navigate('/students-list');
      }, 1500);

    } catch (error) {
      console.error('Enrollment error:', error);
      toast({
        title: "Error",
        description: "Failed to enroll student. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9b87f5]/10 to-[#7E69AB]/10 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#7E69AB]">
            Student Enrollment
          </h1>
          <p className="text-muted-foreground">
            Add new students to your institution
          </p>
        </motion.div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Enrollment Progress</span>
            <span>{enrollmentProgress}%</span>
          </div>
          <Progress value={enrollmentProgress} />
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>New Student Registration</span>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search enrolled students..."
                  className="pl-9 w-[250px]"
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AddStudentForm 
              onSubmit={handleAddStudent}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentEnrollment;
