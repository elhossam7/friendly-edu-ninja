import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";

const registrationSchema = z.object({
  institutionName: z.string().min(2, "Institution name must be at least 2 characters"),
  adminName: z.string().min(2, "Admin name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  country: z.string().optional(),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
];

const InstitutionRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = React.useState(false);

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      institutionName: localStorage.getItem('draft_institutionName') || "",
      adminName: localStorage.getItem('draft_adminName') || "",
      email: localStorage.getItem('draft_email') || "",
      password: "",
      country: localStorage.getItem('draft_country') || "",
    },
  });

  // Auto-save form data
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.institutionName) localStorage.setItem('draft_institutionName', value.institutionName);
      if (value.adminName) localStorage.setItem('draft_adminName', value.adminName);
      if (value.email) localStorage.setItem('draft_email', value.email);
      if (value.country) localStorage.setItem('draft_country', value.country);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const saveAndExit = async () => {
    setIsSaving(true);
    try {
      const formData = form.getValues();
      // Here you would typically make an API call to save the draft

      toast({
        title: "Progress saved!",
        description: "You can continue registration later.",
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Error saving progress",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const onSubmit = async (data: RegistrationForm) => {
    try {
      setIsSaving(true);
      // Your existing save logic here
      
      toast({
        title: "Registration Complete",
        description: "Your institution has been registered successfully.",
      });
      
      // Redirect to roles setup with correct path
      navigate('/setup/roles');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register institution. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9b87f5]/10 to-[#7E69AB]/10 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to EduManager!</h1>
          <p className="text-muted-foreground">Let's Get Your Institution Set Up</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Step 1 of 5: Institution Registration</span>
            <span>20% Complete</span>
          </div>
          <Progress value={20} />
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Institution Details</CardTitle>
              <Button
                variant="outline"
                onClick={saveAndExit}
                disabled={isSaving}
                aria-label="Save progress and exit"
              >
                {isSaving ? "Saving..." : "Save & Exit"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="institutionName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="institutionName">Institution Name</FormLabel>
                      <FormControl>
                        <Input
                          id="institutionName"
                          placeholder="Enter your institution name"
                          {...field}
                          aria-required="true"
                        />
                      </FormControl>
                      <FormMessage role="alert" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="adminName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="adminName">Admin Name</FormLabel>
                      <FormControl>
                        <Input
                          id="adminName"
                          placeholder="Enter admin name"
                          {...field}
                          aria-required="true"
                        />
                      </FormControl>
                      <FormMessage role="alert" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email Address</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                          aria-required="true"
                        />
                      </FormControl>
                      <FormMessage role="alert" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a password"
                          {...field}
                          aria-required="true"
                        />
                      </FormControl>
                      <FormMessage role="alert" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="country">Country/Region (Optional)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage role="alert" />
                    </FormItem>
                  )}
                />

                <div className="flex space-x-4">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isSaving}
                    aria-label="Complete registration"
                  >
                    <CheckCircle2 className="mr-2" />
                    Complete Registration
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstitutionRegistration;