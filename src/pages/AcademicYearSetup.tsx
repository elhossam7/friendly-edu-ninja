import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Calendar } from "@/components/ui/calendar";
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
import { Plus, GripVertical, AlertCircle, Trash2 } from "lucide-react";
import { Term, AcademicYear, AcademicYearFormData } from "../types/academic";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import styles from "@/styles/TermsTimeline.module.css";

const academicYearSchema = z.object({
  academicYear: z.object({
    name: z.string().min(1, "Academic year name is required")
      .regex(/^\d{4}-\d{4}$/, "Academic year must be in format YYYY-YYYY"),
    startDate: z.date({
      required_error: "Start date is required",
    }),
    endDate: z.date({
      required_error: "End date is required",
    }),
    terms: z.array(z.object({
      id: z.string(),
      name: z.string().min(1, "Term name is required"),
      startDate: z.date(),
      endDate: z.date(),
      order: z.number(),
    }))
  }).refine((data) => {
    // Validate academic year dates
    const startYear = data.startDate.getFullYear();
    const endYear = data.endDate.getFullYear();
    const yearDiff = endYear - startYear;
    
    if (yearDiff > 1 || yearDiff < 0) {
      return false;
    }
    
    if (data.startDate >= data.endDate) {
      return false;
    }
    
    // Check if terms are within academic year dates and properly ordered
    const termsValid = data.terms.every((term, index) => {
      const isWithinYear = term.startDate >= data.startDate && term.endDate <= data.endDate;
      const hasValidDates = term.startDate < term.endDate;
      
      // Check if term starts after previous term ends
      if (index > 0) {
        const prevTerm = data.terms[index - 1];
        if (term.startDate <= prevTerm.endDate) {
          return false;
        }
      }
      
      return isWithinYear && hasValidDates;
    });
    
    return termsValid;
  }, {
    message: "Invalid academic year setup. Please ensure:\n- Academic year spans 1 year or less\n- Terms are within the academic year\n- Terms don't overlap\n- Terms are in chronological order",
    path: ["terms"],
  }),
});

const AcademicYearSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof academicYearSchema>>({
    resolver: zodResolver(academicYearSchema),
    defaultValues: {
      academicYear: {
        name: "",
        startDate: new Date(),
        endDate: new Date(),
        terms: [],
      },
    },
  });

  const onSubmit = async (data: AcademicYearFormData) => {
    try {
      setIsLoading(true);
      // Save data logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Academic Year Setup Complete",
        description: "Your academic year configuration has been saved successfully.",
      });
      
      // Redirect to class setup with correct path
      navigate('/setup/class');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save academic year setup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addTerm = () => {
    const terms = form.getValues("academicYear.terms");
    form.setValue("academicYear.terms", [
      ...terms,
      {
        id: crypto.randomUUID(),
        name: `Term ${terms.length + 1}`,
        startDate: new Date(),
        endDate: new Date(),
        order: terms.length,
      },
    ]);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const terms = form.getValues("academicYear.terms");
    const [reorderedTerm] = terms.splice(result.source.index, 1);
    terms.splice(result.destination.index, 0, reorderedTerm);

    // Update order numbers
    const updatedTerms = terms.map((term, index) => ({
      ...term,
      order: index,
    }));

    form.setValue("academicYear.terms", updatedTerms);
  };

  const handleNext = async () => {
    setIsLoading(true);
    try {
      // API call simulation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Academic Year setup complete",
        description: "Moving to Class and Section setup..."
      });
      
      navigate("/setup/class"); // This should match the route defined in App.tsx
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save academic year setup",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeTerm = (index: number) => {
    const terms = form.getValues("academicYear.terms");
    const updatedTerms = terms.filter((_, i) => i !== index)
      .map((term, i) => ({ ...term, order: i }));
    form.setValue("academicYear.terms", updatedTerms);
  };

  // Calculate completion percentage
  const calculateProgress = () => {
    const values = form.getValues("academicYear");
    let progress = 0;
    
    if (values.name) progress += 20;
    if (values.startDate && values.endDate) progress += 20;
    if (values.terms.length > 0) {
      const validTerms = values.terms.filter(t => t.name && t.startDate && t.endDate);
      progress += (validTerms.length / values.terms.length) * 60;
    }
    
    return Math.round(progress);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowUp" && index > 0) {
      e.preventDefault();
      const terms = form.getValues("academicYear.terms");
      const newTerms = [...terms];
      [newTerms[index], newTerms[index - 1]] = [newTerms[index - 1], newTerms[index]];
      form.setValue("academicYear.terms", newTerms.map((term, i) => ({ ...term, order: i })));
    } else if (e.key === "ArrowDown" && index < form.getValues("academicYear.terms").length - 1) {
      e.preventDefault();
      const terms = form.getValues("academicYear.terms");
      const newTerms = [...terms];
      [newTerms[index], newTerms[index + 1]] = [newTerms[index + 1], newTerms[index]];
      form.setValue("academicYear.terms", newTerms.map((term, i) => ({ ...term, order: i })));
    }
  };

  const getTermDateValidation = (index: number) => {
    const term = form.getValues(`academicYear.terms.${index}`);
    const academicYear = form.getValues("academicYear");
    
    if (!term.startDate || !term.endDate) return null;
    
    if (term.startDate < academicYear.startDate) {
      return "Term starts before academic year";
    }
    if (term.endDate > academicYear.endDate) {
      return "Term ends after academic year";
    }
    if (term.startDate >= term.endDate) {
      return "Term end date must be after start date";
    }
    
    const prevTerm = index > 0 ? form.getValues(`academicYear.terms.${index - 1}`) : null;
    if (prevTerm && term.startDate <= prevTerm.endDate) {
      return "Term must start after previous term ends";
    }
    
    return null;
  };

  const getTermStyles = (term: Term) => {
    if (!term.startDate || !term.endDate) {
      return { left: "0%", width: "0%" };
    }

    const start = form.getValues("academicYear.startDate");
    const end = form.getValues("academicYear.endDate");
    
    if (!start || !end) {
      return { left: "0%", width: "0%" };
    }
    
    const totalDays = end.getTime() - start.getTime();
    
    if (totalDays <= 0) {
      return { left: "0%", width: "0%" };
    }
    
    const termStart = (term.startDate.getTime() - start.getTime()) / totalDays * 100;
    const termWidth = (term.endDate.getTime() - term.startDate.getTime()) / totalDays * 100;
    
    return {
      left: `${Math.max(0, Math.min(100, termStart))}%`,
      width: `${Math.max(0, Math.min(100 - termStart, termWidth))}%`
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9b87f5]/10 to-[#7E69AB]/10 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Academic Year Setup</h1>
          <p className="text-muted-foreground">Configure your academic year and terms</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Step 3 of 5: Academic Year Configuration</span>
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
            <Card className="p-6">
              <FormField
                control={form.control}
                name="academicYear.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Academic Year Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., 2025-2026" />
                    </FormControl>
                    <p className="text-sm text-muted-foreground">Format: YYYY-YYYY</p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="academicYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Academic Year Duration</FormLabel>
                      <DateRangePicker
                        from={field.value.startDate}
                        to={field.value.endDate}
                        onSelect={(range) => {
                          if (range?.from) form.setValue("academicYear.startDate", range.from);
                          if (range?.to) form.setValue("academicYear.endDate", range.to);
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>

            {/* Terms Timeline Preview */}
            {form.watch("academicYear.terms").length > 0 && (
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Terms Timeline</h3>
                <div className="relative h-16 bg-secondary/30 rounded-lg overflow-hidden">
                  {form.watch("academicYear.terms").map((term) => {
                    // Ensure the term has all required properties before rendering
                    if (!term.id || !term.name || !term.startDate || !term.endDate || term.order === undefined) {
                      return null;
                    }
                    const styles = getTermStyles(term as Term);
                    return (
                      <div
                        key={term.id}
                        className="absolute top-0 h-full bg-primary/20 hover:bg-primary/30 transition-colors rounded flex items-center justify-center text-sm font-medium"
                        style={styles}
                      >
                        <span className="px-2 truncate">{term.name}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Terms</h2>
                <Button
                  type="button"
                  onClick={addTerm}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Term
                </Button>
              </div>

              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="terms">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {form.watch("academicYear.terms").map((term, index) => (
                        <Draggable key={term.id} draggableId={term.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              onKeyDown={(e) => handleKeyDown(e, index)}
                              tabIndex={0}
                              role="listitem"
                              aria-label={`Term ${index + 1}`}
                              className="group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
                            >
                              <Card className="p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-4">
                                  <div 
                                    {...provided.dragHandleProps}
                                    className="mt-2 cursor-move"
                                    role="button"
                                    aria-label="Drag to reorder"
                                  >
                                    <GripVertical className="w-5 h-5 text-gray-400" />
                                  </div>
                                  <div className="flex-1 space-y-4">
                                    <FormField
                                      control={form.control}
                                      name={`academicYear.terms.${index}.name`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Term Name</FormLabel>
                                          <FormControl>
                                            <Input {...field} placeholder="e.g., Fall Semester" />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <FormField
                                        control={form.control}
                                        name={`academicYear.terms.${index}.startDate`}
                                        render={({ field }) => (
                                          <FormItem className="flex flex-col">
                                            <FormLabel>Start Date</FormLabel>
                                            <Calendar
                                              mode="single"
                                              selected={field.value}
                                              onSelect={field.onChange}
                                              disabled={(date) =>
                                                date < form.getValues("academicYear.startDate") ||
                                                date > form.getValues("academicYear.endDate")
                                              }
                                              className="rounded-md border"
                                            />
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name={`academicYear.terms.${index}.endDate`}
                                        render={({ field }) => (
                                          <FormItem className="flex flex-col">
                                            <FormLabel>End Date</FormLabel>
                                            <Calendar
                                              mode="single"
                                              selected={field.value}
                                              onSelect={field.onChange}
                                              disabled={(date) =>
                                                date < form.getValues(`academicYear.terms.${index}.startDate`) ||
                                                date > form.getValues("academicYear.endDate")
                                              }
                                              className="rounded-md border"
                                            />
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                    {/* Term date validation feedback */}
                                    {getTermDateValidation(index) && (
                                      <Alert variant="destructive" className="mt-2">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                          {getTermDateValidation(index)}
                                        </AlertDescription>
                                      </Alert>
                                    )}
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => removeTerm(index)}
                                    aria-label="Remove term"
                                  >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                  </Button>
                                </div>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            {/* Summary View */}
            {form.watch("academicYear.terms").length > 0 && (
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Academic Year Summary</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Academic Year:</span>{" "}
                    {form.watch("academicYear.name")}
                  </p>
                  <p>
                    <span className="font-medium">Duration:</span>{" "}
                    {form.watch("academicYear.startDate")?.toLocaleDateString()} to{" "}
                    {form.watch("academicYear.endDate")?.toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Number of Terms:</span>{" "}
                    {form.watch("academicYear.terms").length}
                  </p>
                </div>
              </Card>
            )}

            {/* Validation Errors */}
            {form.formState.errors.academicYear?.terms && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {form.formState.errors.academicYear.terms.message}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                disabled={isLoading}
              >
                Previous
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Next"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AcademicYearSetup;