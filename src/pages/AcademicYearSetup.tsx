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
import { Plus, GripVertical } from "lucide-react";
import { Term, AcademicYear, AcademicYearFormData } from "../types/academic";

const academicYearSchema = z.object({
  academicYear: z.object({
    name: z.string().min(1, "Academic year name is required"),
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
    // Validate that start date is before end date
    if (data.startDate >= data.endDate) {
      return false;
    }
    // Validate that all terms are within academic year dates
    return data.terms.every(term => 
      term.startDate >= data.startDate && 
      term.endDate <= data.endDate &&
      term.startDate < term.endDate
    );
  }, {
    message: "Invalid date range. Please check academic year and term dates.",
    path: ["endDate"],
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

  const onSubmit = async (data: z.infer<typeof academicYearSchema>) => {
    setIsLoading(true);
    try {
      // Save data logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Success",
        description: "Academic year setup completed successfully",
      });
      navigate("/setup/step4"); // Navigate to next step
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save academic year setup",
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
            <span>60% Complete</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full">
            <div
              className="h-2 bg-[#9b87f5] rounded-full"
              style={{ width: "60%" }}
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="academicYear.startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
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
                  name="academicYear.endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < form.getValues("academicYear.startDate")
                        }
                        className="rounded-md border"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>

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
                              {...provided.dragHandleProps}
                            >
                              <Card className="p-4">
                                <div className="flex items-start gap-4">
                                  <div className="mt-2 cursor-move">
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
                                  </div>
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