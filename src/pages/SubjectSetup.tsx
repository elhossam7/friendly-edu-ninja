import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Upload, FileText, Video, Link as LinkIcon, AlertCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Subject, Resource } from "@/types/subject";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const resourceSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Resource name is required"),
  type: z.enum(["document", "video", "link"]),
  url: z.string().url("Please enter a valid URL"),
  size: z.number().optional(),
});

const curriculumSchema = z.object({
  syllabus: z.string().min(1, "Syllabus is required"),
  learningObjectives: z.array(z.string()),
  resources: z.array(resourceSchema),
});

const subjectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Subject name is required"),
  description: z.string().min(1, "Description is required"),
  teacherId: z.string().min(1, "Teacher is required"),
  curriculum: curriculumSchema,
});

const formSchema = z.object({
  subjects: z.array(subjectSchema).min(1, "At least one subject is required"),
});

export const SubjectSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subjects: [
        {
          id: crypto.randomUUID(),
          name: "",
          description: "",
          teacherId: "",
          curriculum: {
            syllabus: "",
            learningObjectives: [""],
            resources: [],
          },
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subjects",
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // API call simulation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Subject and curriculum setup completed successfully",
      });
      
      navigate("/setup/complete");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save subject setup",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    subjectIndex: number
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "Error",
        description: "File size should be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      toast({
        title: "Error",
        description: "Please upload a valid document file (PDF, DOC, DOCX)",
        variant: "destructive",
      });
      return;
    }

    const resource: Resource = {
      id: crypto.randomUUID(),
      name: file.name,
      type: "document",
      url: URL.createObjectURL(file),
      size: file.size,
    };

    const currentResources = form.getValues(`subjects.${subjectIndex}.curriculum.resources`);
    form.setValue(`subjects.${subjectIndex}.curriculum.resources`, [
      ...currentResources,
      resource,
    ]);
  };

  const addLearningObjective = (subjectIndex: number) => {
    const objectives = form.getValues(`subjects.${subjectIndex}.curriculum.learningObjectives`);
    form.setValue(`subjects.${subjectIndex}.curriculum.learningObjectives`, [
      ...objectives,
      "",
    ]);
  };

  const removeLearningObjective = (subjectIndex: number, objectiveIndex: number) => {
    const objectives = form.getValues(`subjects.${subjectIndex}.curriculum.learningObjectives`);
    objectives.splice(objectiveIndex, 1);
    form.setValue(`subjects.${subjectIndex}.curriculum.learningObjectives`, objectives);
  };

  const calculateProgress = () => {
    const values = form.getValues();
    let totalFields = 0;
    let filledFields = 0;

    values.subjects.forEach(subject => {
      // Count required fields
      totalFields += 3; // name, description, teacherId
      filledFields += subject.name ? 1 : 0;
      filledFields += subject.description ? 1 : 0;
      filledFields += subject.teacherId ? 1 : 0;

      // Count curriculum fields
      totalFields += 2; // syllabus and at least one objective
      filledFields += subject.curriculum.syllabus ? 1 : 0;
      filledFields += subject.curriculum.learningObjectives.length > 0 ? 1 : 0;
    });

    return Math.round((filledFields / totalFields) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9b87f5]/10 to-[#7E69AB]/10 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Subject and Curriculum Setup</h1>
          <p className="text-muted-foreground">Configure subjects and their curriculum details</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Step 5 of 5: Subject Configuration</span>
            <span>{calculateProgress()}% Complete</span>
          </div>
          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-300 ease-in-out"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {fields.map((field, index) => (
                <Card key={field.id} className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-lg font-semibold">Subject {index + 1}</h3>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    )}
                  </div>

                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name={`subjects.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., Mathematics" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`subjects.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Brief description of the subject"
                              className="resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`subjects.${index}.teacherId`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assigned Teacher</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Select teacher" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="curriculum">
                        <AccordionTrigger>Curriculum Details</AccordionTrigger>
                        <AccordionContent className="space-y-6">
                          <FormField
                            control={form.control}
                            name={`subjects.${index}.curriculum.syllabus`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Syllabus</FormLabel>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    placeholder="Detailed syllabus for the subject"
                                    className="resize-none"
                                    rows={4}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <FormLabel>Learning Objectives</FormLabel>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addLearningObjective(index)}
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Objective
                              </Button>
                            </div>
                            {form.watch(`subjects.${index}.curriculum.learningObjectives`).map(
                              (_, objectiveIndex) => (
                                <div key={objectiveIndex} className="flex gap-2">
                                  <FormField
                                    control={form.control}
                                    name={`subjects.${index}.curriculum.learningObjectives.${objectiveIndex}`}
                                    render={({ field }) => (
                                      <FormItem className="flex-1">
                                        <FormControl>
                                          <Input
                                            {...field}
                                            placeholder={`Objective ${objectiveIndex + 1}`}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeLearningObjective(index, objectiveIndex)}
                                  >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                  </Button>
                                </div>
                              )
                            )}
                          </div>

                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <FormLabel>Resources</FormLabel>
                              <div className="flex gap-2">
                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  className="hidden"
                                  accept={ACCEPTED_FILE_TYPES.join(",")}
                                  onChange={(e) => handleFileUpload(e, index)}
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => fileInputRef.current?.click()}
                                >
                                  <Upload className="w-4 h-4 mr-2" />
                                  Upload File
                                </Button>
                              </div>
                            </div>

                            <div className="grid gap-2">
                              {form.watch(`subjects.${index}.curriculum.resources`).map(
                                (resource, resourceIndex) => (
                                  <div
                                    key={resource.id}
                                    className="flex items-center justify-between p-2 rounded-lg border"
                                  >
                                    <div className="flex items-center gap-2">
                                      {resource.type === "document" && (
                                        <FileText className="w-4 h-4 text-blue-500" />
                                      )}
                                      {resource.type === "video" && (
                                        <Video className="w-4 h-4 text-red-500" />
                                      )}
                                      {resource.type === "link" && (
                                        <LinkIcon className="w-4 h-4 text-green-500" />
                                      )}
                                      <span className="text-sm font-medium">
                                        {resource.name}
                                      </span>
                                      {resource.size && (
                                        <Badge variant="secondary" className="ml-2">
                                          {(resource.size / 1024 / 1024).toFixed(2)} MB
                                        </Badge>
                                      )}
                                    </div>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => {
                                        const resources = form.getValues(
                                          `subjects.${index}.curriculum.resources`
                                        );
                                        resources.splice(resourceIndex, 1);
                                        form.setValue(
                                          `subjects.${index}.curriculum.resources`,
                                          resources
                                        );
                                      }}
                                    >
                                      <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </Card>
              ))}

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() =>
                  append({
                    id: crypto.randomUUID(),
                    name: "",
                    description: "",
                    teacherId: "",
                    curriculum: {
                      syllabus: "",
                      learningObjectives: [""],
                      resources: [],
                    },
                  })
                }
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Subject
              </Button>
            </div>

            {form.formState.errors.subjects && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {form.formState.errors.subjects.message}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/setup/class")}
                disabled={isLoading}
              >
                Previous
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Complete Setup"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
