import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format, addYears, subYears } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Fetch classes and sections from local storage or API
const fetchClassesAndSections = () => {
  const classSetupData = localStorage.getItem('classSetupData');
  if (classSetupData) {
    const parsedData = JSON.parse(classSetupData);
    return parsedData.classes.map((classItem: any) => ({
      name: classItem.name,
      sections: classItem.sections.map((section: any) => section.name)
    }));
  }
  return [];
};

// Fetch Academic Years from local storage
const getAcademicYears = () => {
  const academicYearData = localStorage.getItem('academicYearSetupData');
  if (academicYearData) {
    try {
      const parsedData = JSON.parse(academicYearData);
      return parsedData.academicYears?.map((y: any) => y.year) || [];
    } catch (error) {
      console.error('Error parsing academic year data', error);
      return [];
    }
  }
  return [];
};

// Zod Schema for Validation
const studentSchema = z.object({
  // Personal Details
  firstName: z.string().min(1, "First name is required").max(50, "First name is too long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name is too long"),
  dob: z.date({
    required_error: "Date of birth is required",
    invalid_type_error: "Invalid date"
  }).refine(date => {
    const today = new Date();
    const minAgeForEnrollment = addYears(today, -3); // At least 3 years old
    return date <= minAgeForEnrollment;
  }, { message: "Student must be at least 3 years old" }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required"
  }),

  // Academic Details
  className: z.string().min(1, "Class is required"),
  section: z.string().min(1, "Section is required"),
  rollNumber: z.string()
    .min(1, "Roll number is required")
    .regex(/^[A-Z0-9]+$/, "Roll number must be alphanumeric"),
  academicYear: z.string().min(4, "Academic year must be 4 digits")
    .regex(/^\d{4}$/, "Academic year must be a 4-digit year"),

  // Contact Details
  guardianName: z.string().min(1, "Guardian name is required").max(100, "Guardian name is too long"),
  guardianPhone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^\+?[0-9]+$/, "Invalid phone number"),
  guardianEmail: z.string().email("Invalid email address"),
  address: z.string().optional()
});

type FormData = z.infer<typeof studentSchema>;

const StudentEnrollment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [classOptions, setClassOptions] = useState<{ name: string, sections: string[] }[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [academicYearOptions, setAcademicYearOptions] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    control,
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(studentSchema),
    mode: 'onChange'
  });

  // Utility functions for date selection
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from(
      { length: currentYear - 1900 + 1 }, 
      (_, i) => currentYear - i
    ).filter(year => year <= currentYear - 3);
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const generateDays = (year: number, month: number) => {
    return Array.from(
      { length: new Date(year, month + 1, 0).getDate() }, 
      (_, i) => i + 1
    );
  };

  // State for date selection
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Update form value when date changes
  useEffect(() => {
    if (selectedYear && selectedMonth !== null && selectedDay) {
      const newDate = new Date(selectedYear, selectedMonth, selectedDay);
      setValue('dob', newDate);
    }
  }, [selectedYear, selectedMonth, selectedDay, setValue]);

  // Load classes and sections on component mount
  useEffect(() => {
    const classes = fetchClassesAndSections();
    setClassOptions(classes);
  }, []);

  // Load academic years on component mount
  useEffect(() => {
    const academicYears = getAcademicYears();
    setAcademicYearOptions(academicYears);
  }, []);

  // Handle step navigation with validation
  const nextStep = async () => {
    let isStepValid = false;

    switch (currentStep) {
      case 1:
        isStepValid = await trigger(['firstName', 'lastName', 'dob', 'gender']);
        break;
      case 2:
        isStepValid = await trigger(['className', 'section', 'rollNumber', 'academicYear']);
        break;
    }

    if (isStepValid) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Save student data (in a real app, this would be an API call)
      localStorage.setItem('studentEnrollmentData', JSON.stringify(data));

      toast({
        title: "Student Enrolled Successfully",
        description: `${data.firstName} ${data.lastName} has been added to ${data.className} - ${data.section}`,
      });

      // Navigate to student list or dashboard
      navigate('/students');
    } catch (error) {
      toast({
        title: "Enrollment Failed",
        description: "There was an error enrolling the student. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Render personal details step
  const renderPersonalDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <Input 
          {...register('firstName')} 
          placeholder="Enter first name" 
          className={errors.firstName ? 'border-red-500' : ''}
        />
        {errors.firstName && (
          <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <Input 
          {...register('lastName')} 
          placeholder="Enter last name" 
          className={errors.lastName ? 'border-red-500' : ''}
        />
        {errors.lastName && (
          <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <div className="grid grid-cols-3 gap-4">
          {/* Day Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Day</label>
            <Select 
              onValueChange={(value) => {
                setSelectedDay(parseInt(value));
              }}
              value={selectedDay?.toString() || ''}
            >
              <SelectTrigger className={errors.dob ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select Day" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 31 }, (_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Month Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Month</label>
            <Select 
              onValueChange={(value) => {
                const month = parseInt(value);
                setSelectedMonth(month);
              }}
              value={selectedMonth !== null ? selectedMonth.toString() : ''}
            >
              <SelectTrigger className={errors.dob ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month, index) => (
                  <SelectItem key={month} value={index.toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <Select 
              onValueChange={(value) => {
                const year = parseInt(value);
                setSelectedYear(year);
              }}
              value={selectedYear?.toString() || ''}
            >
              <SelectTrigger className={errors.dob ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {generateYears().map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Error Message */}
          {errors.dob && (
            <div className="col-span-3 text-red-500 text-xs mt-1">
              {errors.dob.message}
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.gender && (
          <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
        )}
      </div>
    </div>
  );

  // Render academic details step
  const renderAcademicDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Class</label>
        <Controller
          control={control}
          name="className"
          render={({ field }) => (
            <Select 
              onValueChange={(value) => {
                field.onChange(value);
                setSelectedClass(value);
                setValue('section', ''); // Reset section when class changes
              }} 
              value={field.value}
            >
              <SelectTrigger className={errors.className ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {classOptions.map((classItem) => (
                  <SelectItem key={classItem.name} value={classItem.name}>
                    {classItem.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.className && (
          <p className="text-red-500 text-xs mt-1">{errors.className.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Section</label>
        <Controller
          control={control}
          name="section"
          render={({ field }) => (
            <Select 
              onValueChange={field.onChange} 
              value={field.value} 
              disabled={!selectedClass}
            >
              <SelectTrigger className={errors.section ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                {classOptions
                  .find(c => c.name === selectedClass)
                  ?.sections.map((section) => (
                    <SelectItem key={section} value={section}>
                      {section}
                    </SelectItem>
                  )) || []
                }
              </SelectContent>
            </Select>
          )}
        />
        {errors.section && (
          <p className="text-red-500 text-xs mt-1">{errors.section.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Roll Number</label>
        <Input 
          {...register('rollNumber')} 
          placeholder="Enter roll number" 
          className={errors.rollNumber ? 'border-red-500' : ''}
        />
        {errors.rollNumber && (
          <p className="text-red-500 text-xs mt-1">{errors.rollNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Academic Year</label>
        <Input 
          {...register('academicYear')} 
          placeholder={`Enter academic year (e.g., ${getAcademicYears().length > 0 ? getAcademicYears().join(', ') : '2024'})`} 
          className={errors.academicYear ? 'border-red-500' : ''}
        />
        {errors.academicYear && (
          <p className="text-red-500 text-xs mt-1">{errors.academicYear.message}</p>
        )}
        {getAcademicYears().length > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            Available years: {getAcademicYears().join(', ')}
          </p>
        )}
      </div>
    </div>
  );

  // Render contact details step
  const renderContactDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Guardian Name</label>
        <Input 
          {...register('guardianName')} 
          placeholder="Enter guardian name" 
          className={errors.guardianName ? 'border-red-500' : ''}
        />
        {errors.guardianName && (
          <p className="text-red-500 text-xs mt-1">{errors.guardianName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Guardian Phone</label>
        <Input 
          {...register('guardianPhone')} 
          placeholder="Enter phone number" 
          className={errors.guardianPhone ? 'border-red-500' : ''}
        />
        {errors.guardianPhone && (
          <p className="text-red-500 text-xs mt-1">{errors.guardianPhone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Guardian Email</label>
        <Input 
          {...register('guardianEmail')} 
          placeholder="Enter email address" 
          className={errors.guardianEmail ? 'border-red-500' : ''}
        />
        {errors.guardianEmail && (
          <p className="text-red-500 text-xs mt-1">{errors.guardianEmail.message}</p>
        )}
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700">Address (Optional)</label>
        <Input 
          {...register('address')} 
          placeholder="Enter full address" 
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9b87f5]/10 to-[#7E69AB]/10 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Student Enrollment</h1>
          <p className="text-muted-foreground">
            Complete the enrollment process by providing student details
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Step {currentStep} of 3: {
              currentStep === 1 ? 'Personal Details' : 
              currentStep === 2 ? 'Academic Details' : 
              'Contact Details'
            }</span>
            <span>{Math.round((currentStep / 3) * 100)}% Complete</span>
          </div>
          <Progress value={(currentStep / 3) * 100} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Personal Information"}
              {currentStep === 2 && "Academic Details"}
              {currentStep === 3 && "Contact Information"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === 1 && renderPersonalDetails()}
              {currentStep === 2 && renderAcademicDetails()}
              {currentStep === 3 && renderContactDetails()}

              <div className="flex justify-between mt-6">
                {currentStep > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setCurrentStep(prev => prev - 1)}
                  >
                    Previous
                  </Button>
                )}

                {currentStep < 3 && (
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    className="ml-auto"
                  >
                    Next
                  </Button>
                )}

                {currentStep === 3 && (
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="ml-auto"
                  >
                    {isSubmitting ? 'Enrolling...' : 'Enroll Student'}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentEnrollment;
