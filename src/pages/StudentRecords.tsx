import React, { useState, useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { CalendarIcon, FileUpload, PlusCircle } from 'lucide-react';

// Fetch students from local storage or API
const fetchStudents = () => {
  const studentsData = localStorage.getItem('studentEnrollmentData');
  if (studentsData) {
    try {
      return JSON.parse(studentsData);
    } catch (error) {
      console.error('Error parsing students data', error);
      return [];
    }
  }
  return [];
};

// Fetch subjects from local storage or API
const fetchSubjects = () => {
  const subjectsData = localStorage.getItem('subjectSetupData');
  if (subjectsData) {
    try {
      const parsedData = JSON.parse(subjectsData);
      return parsedData.subjects.map((subject: any) => subject.name);
    } catch (error) {
      console.error('Error parsing subjects data', error);
      return [];
    }
  }
  return [];
};

// Zod Schemas for Validation
const attendanceSchema = z.object({
  date: z.date(),
  students: z.record(z.enum(['present', 'absent', 'late', 'excused']))
});

const gradeSchema = z.object({
  studentId: z.string(),
  subject: z.string(),
  grade: z.number().min(0).max(100)
});

const disciplinaryActionSchema = z.object({
  studentId: z.string(),
  date: z.date(),
  type: z.enum(['warning', 'detention', 'suspension', 'expulsion']),
  description: z.string().min(10, "Description must be at least 10 characters"),
  attachments: z.array(z.instanceof(File)).optional()
});

const StudentRecords: React.FC = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Attendance Form
  const attendanceForm = useForm<z.infer<typeof attendanceSchema>>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      date: new Date(),
      students: {}
    }
  });

  // Grades Form
  const gradesForm = useForm<z.infer<typeof gradeSchema>>({
    resolver: zodResolver(gradeSchema)
  });

  // Disciplinary Actions Form
  const disciplinaryForm = useForm<z.infer<typeof disciplinaryActionSchema>>({
    resolver: zodResolver(disciplinaryActionSchema),
    defaultValues: {
      date: new Date()
    }
  });

  // Load students and subjects on component mount
  useEffect(() => {
    const loadedStudents = fetchStudents();
    const loadedSubjects = fetchSubjects();
    
    setStudents(loadedStudents);
    setSubjects(loadedSubjects);
  }, []);

  // Attendance Tracking
  const handleAttendanceSubmit = (data: z.infer<typeof attendanceSchema>) => {
    try {
      // Save attendance data (would typically be an API call)
      localStorage.setItem('attendanceData', JSON.stringify(data));
      
      toast({
        title: "Attendance Recorded",
        description: `Attendance for ${format(data.date, 'PPP')} has been saved.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save attendance",
        variant: "destructive"
      });
    }
  };

  // Grades Entry
  const handleGradeSubmit = (data: z.infer<typeof gradeSchema>) => {
    try {
      // Save grade data (would typically be an API call)
      const existingGrades = JSON.parse(localStorage.getItem('gradesData') || '{}');
      const updatedGrades = {
        ...existingGrades,
        [`${data.studentId}-${data.subject}`]: data.grade
      };
      
      localStorage.setItem('gradesData', JSON.stringify(updatedGrades));
      
      toast({
        title: "Grade Recorded",
        description: `Grade for ${data.subject} has been saved.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save grade",
        variant: "destructive"
      });
    }
  };

  // Disciplinary Action Submission
  const handleDisciplinaryActionSubmit = (data: z.infer<typeof disciplinaryActionSchema>) => {
    try {
      // Save disciplinary action (would typically be an API call)
      const existingActions = JSON.parse(localStorage.getItem('disciplinaryActions') || '[]');
      const newAction = {
        ...data,
        id: `action-${Date.now()}`
      };
      
      const updatedActions = [...existingActions, newAction];
      localStorage.setItem('disciplinaryActions', JSON.stringify(updatedActions));
      
      toast({
        title: "Disciplinary Action Recorded",
        description: `${data.type} action for student recorded.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save disciplinary action",
        variant: "destructive"
      });
    }
  };

  // Render Attendance Tracking Tab
  const renderAttendanceTracking = () => (
    <Card>
      <CardHeader>
        <CardTitle>Daily Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={attendanceForm.handleSubmit(handleAttendanceSubmit)}>
          <div className="mb-4">
            <Controller
              control={attendanceForm.control}
              name="date"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Attendance Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                  <TableCell>
                    <Controller
                      control={attendanceForm.control}
                      name={`students.${student.id}`}
                      render={({ field }) => (
                        <Select 
                          onValueChange={field.onChange} 
                          value={field.value || 'present'}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="present">Present</SelectItem>
                            <SelectItem value="absent">Absent</SelectItem>
                            <SelectItem value="late">Late</SelectItem>
                            <SelectItem value="excused">Excused</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button type="submit" className="mt-4 w-full">
            Save Attendance
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  // Render Grades Entry Tab
  const renderGradesEntry = () => (
    <Card>
      <CardHeader>
        <CardTitle>Subject Grades Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={gradesForm.handleSubmit(handleGradeSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Student</label>
              <Controller
                control={gradesForm.control}
                name="studentId"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem 
                          key={student.id} 
                          value={student.id}
                        >
                          {`${student.firstName} ${student.lastName}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <Controller
                control={gradesForm.control}
                name="subject"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Grade (%)</label>
              <Controller
                control={gradesForm.control}
                name="grade"
                render={({ field }) => (
                  <Input 
                    type="number" 
                    min={0} 
                    max={100} 
                    placeholder="Enter grade" 
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </div>
          </div>

          <Button type="submit" className="mt-4 w-full">
            Save Grade
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  // Render Disciplinary Actions Tab
  const renderDisciplinaryActions = () => (
    <Card>
      <CardHeader>
        <CardTitle>Disciplinary Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={disciplinaryForm.handleSubmit(handleDisciplinaryActionSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Student</label>
              <Controller
                control={disciplinaryForm.control}
                name="studentId"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem 
                          key={student.id} 
                          value={student.id}
                        >
                          {`${student.firstName} ${student.lastName}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <Controller
                control={disciplinaryForm.control}
                name="date"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Action Type</label>
              <Controller
                control={disciplinaryForm.control}
                name="type"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select action type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="detention">Detention</SelectItem>
                      <SelectItem value="suspension">Suspension</SelectItem>
                      <SelectItem value="expulsion">Expulsion</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <Controller
                control={disciplinaryForm.control}
                name="description"
                render={({ field }) => (
                  <Input 
                    placeholder="Enter detailed description of the incident" 
                    {...field}
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Attachments</label>
              <Controller
                control={disciplinaryForm.control}
                name="attachments"
                render={({ field }) => (
                  <Input 
                    type="file" 
                    multiple
                    onChange={(e) => {
                      const files = e.target.files ? Array.from(e.target.files) : [];
                      field.onChange(files);
                    }}
                  />
                )}
              />
            </div>
          </div>

          <Button type="submit" className="mt-4 w-full">
            Record Disciplinary Action
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9b87f5]/10 to-[#7E69AB]/10 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Student Records</h1>
          <p className="text-muted-foreground">
            Manage attendance, grades, and disciplinary actions
          </p>
        </div>

        <Tabs defaultValue="attendance">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
            <TabsTrigger value="disciplinary">Disciplinary Actions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="attendance">
            {renderAttendanceTracking()}
          </TabsContent>
          
          <TabsContent value="grades">
            {renderGradesEntry()}
          </TabsContent>
          
          <TabsContent value="disciplinary">
            {renderDisciplinaryActions()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentRecords;
