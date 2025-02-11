import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const studentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"]),
  classId: z.string().min(1, "Class is required"),
  guardianName: z.string().min(1, "Guardian name is required"),
  guardianPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  guardianEmail: z.string().email("Invalid email"),
  section: z.string().min(1, "Section is required"),
  rollNumber: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  guardianRelationship: z.enum(["mother", "father", "guardian"]),
  emergencyContactName: z.string().min(1, "Emergency contact name is required"),
  emergencyContactPhone: z.string().min(10, "Emergency contact phone is required"),
  medicalInfo: z.string().optional(),
  previousSchool: z.string().optional(),
});

type FormData = z.infer<typeof studentSchema>;

interface AddStudentFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  isLoading?: boolean;
}

export function AddStudentForm({ onSubmit, isLoading }: AddStudentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(studentSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...register('firstName')} />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" {...register('lastName')} />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input type="date" id="dateOfBirth" {...register('dateOfBirth')} />
              {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={(value) => register('gender').onChange({ target: { value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Academic Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="classId">Class</Label>
              <Input id="classId" {...register('classId')} />
              {errors.classId && <p className="text-red-500 text-sm">{errors.classId.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <Input id="section" {...register('section')} />
              {errors.section && <p className="text-red-500 text-sm">{errors.section.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rollNumber">Roll Number</Label>
              <Input id="rollNumber" {...register('rollNumber')} />
              {errors.rollNumber && <p className="text-red-500 text-sm">{errors.rollNumber.message}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Guardian Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guardianName">Guardian Name</Label>
                <Input id="guardianName" {...register('guardianName')} />
                {errors.guardianName && <p className="text-red-500 text-sm">{errors.guardianName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="guardianPhone">Guardian Phone</Label>
                <Input id="guardianPhone" {...register('guardianPhone')} />
                {errors.guardianPhone && <p className="text-red-500 text-sm">{errors.guardianPhone.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="guardianEmail">Guardian Email</Label>
              <Input id="guardianEmail" type="email" {...register('guardianEmail')} />
              {errors.guardianEmail && <p className="text-red-500 text-sm">{errors.guardianEmail.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="guardianRelationship">Relationship</Label>
              <Select onValueChange={(value) => register('guardianRelationship').onChange({ target: { value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mother">Mother</SelectItem>
                  <SelectItem value="father">Father</SelectItem>
                  <SelectItem value="guardian">Guardian</SelectItem>
                </SelectContent>
              </Select>
              {errors.guardianRelationship && <p className="text-red-500 text-sm">{errors.guardianRelationship.message}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="medicalInfo">Medical Information</Label>
            <Input id="medicalInfo" {...register('medicalInfo')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="previousSchool">Previous School</Label>
            <Input id="previousSchool" {...register('previousSchool')} />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding Student...
          </>
        ) : (
          'Add Student'
        )}
      </Button>
    </form>
  );
}
