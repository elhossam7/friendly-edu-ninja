import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
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
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DateRangePicker } from "@/components/date-range-picker";
import { Plus, GripVertical, AlertCircle, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Term } from "@/types/academic";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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
    })).min(1, "At least one term is required"),
  }).refine((data) => {
    const startYear = data.startDate.getFullYear();
    const endYear = data.endDate.getFullYear();
    return endYear - startYear <= 1 && data.startDate < data.endDate;
  }, {
    message: "Academic year must span 1 year or less with valid dates",
  }),
});

export default function AcademicYearSetup() {
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

  const addTerm = () => {
    const terms = form.getValues("academicYear.terms");
    const newTerm = {
      id: crypto.randomUUID(),
      name: `Term ${terms.length + 1}`,
      startDate: form.getValues("academicYear.startDate"),
      endDate: new Date(form.getValues("academicYear.startDate").getTime() + (30 * 24 * 60 * 60 * 1000)),
      order: terms.length,
    };
    form.setValue("academicYear.terms", [...terms, newTerm]);
  };

  const removeTerm = (index: number) => {
    const terms = form.getValues("academicYear.terms");
    const updatedTerms = terms
      .filter((_, i) => i !== index)
      .map((term, i) => ({ ...term, order: i }));
    form.setValue("academicYear.terms", updatedTerms);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const terms = form.getValues("academicYear.terms");
    const [reorderedTerm] = terms.splice(result.source.index, 1);
    terms.splice(result.destination.index, 0, reorderedTerm);

    form.setValue("academicYear.terms", terms.map((term, index) => ({
      ...term,
      order: index,
    })));
  };

  const calculateProgress = () => {
    const values = form.getValues("academicYear");
    let progress = 0;
    
    if (values.name) progress += 20;
    if (values.startDate && values.endDate) progress += 20;
    if (values.terms.length > 0) {
      const validTerms = values.terms.filter(t => 
        t.name && t.startDate && t.endDate && 
        t.startDate >= values.startDate && 
        t.endDate <= values.endDate
      );
      progress += (validTerms.length / values.terms.length) * 60;
    }
    
    return Math.round(progress);
  };

  const onSubmit = async (data: z.infer<typeof academicYearSchema>) => {
    try {
      setIsLoading(true);
      
      // Validate term dates
      const hasOverlap = data.academicYear.terms.some((term, index) => {
        const nextTerm = data.academicYear.terms[index + 1];
        return nextTerm && term.endDate >= nextTerm.startDate;
      });

      if (hasOverlap) {
        toast({
          title: "Validation Error",
          description: "Terms cannot overlap. Please adjust the dates.",
          variant: "destructive",
        });
        return;
      }

      // Save to localStorage
      localStorage.setItem('academicYearData', JSON.stringify(data));
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Academic year setup completed successfully",
      });
      
      navigate("/setup/class");
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9b87f5]/10 to-[#7E69AB]/10 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#7E69AB]">
            Academic Year Setup
          </h1>
          <p className="text-muted-foreground">Configure your academic year and terms</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Step 3 of 5: Academic Year Configuration</span>
            <span>{calculateProgress()}% Complete</span>
          </div>
          <Progress 
            value={calculateProgress()} 
            className="transition-all duration-300"
          />
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="academicYear.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Academic Year Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., 2024-2025" />
                      </FormControl>
                      <p className="text-sm text-muted-foreground">Format: YYYY-YYYY</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Terms Configuration</CardTitle>
                <Button
                  type="button"
                  onClick={addTerm}
                  variant="outline"
                  className="group"
                >
                  <Plus className="w-4 h-4 mr-2 transition-transform group-hover:scale-125" />
                  Add Term
                </Button>
              </CardHeader>
              <CardContent>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="terms">
                    {(provided) => (
                      <div 
                        {...provided.droppableProps} 
                        ref={provided.innerRef}
                        className="space-y-4"
                      >
                        <AnimatePresence>
                          {form.watch("academicYear.terms").map((term, index) => (
                            <Draggable key={term.id} draggableId={term.id} index={index}>
                              {(provided) => (
                                <motion.div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 20 }}
                                  transition={{ duration: 0.2 }}
                                  className="group rounded-lg border bg-card p-4 transition-all duration-200 hover:shadow-md"
                                >
                                  <div className="flex items-center gap-4">
                                    <div 
                                      {...provided.dragHandleProps}
                                      className="cursor-move opacity-50 hover:opacity-100 transition-opacity"
                                    >
                                      <GripVertical className="h-5 w-5" />
                                    </div>
                                    
                                    <div className="flex-1 space-y-4">
                                      <FormField
                                        control={form.control}
                                        name={`academicYear.terms.${index}.name`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormControl>
                                              <Input {...field} placeholder={`Term ${index + 1}`} />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      
                                      <div className="grid gap-4 sm:grid-cols-2">
                                        <FormField
                                          control={form.control}
                                          name={`academicYear.terms.${index}.startDate`}
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Start Date</FormLabel>
                                              <FormControl>
                                                <Input 
                                                  type="date"
                                                  value={field.value?.toISOString().split('T')[0]}
                                                  onChange={(e) => field.onChange(new Date(e.target.value))}
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        
                                        <FormField
                                          control={form.control}
                                          name={`academicYear.terms.${index}.endDate`}
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>End Date</FormLabel>
                                              <FormControl>
                                                <Input 
                                                  type="date"
                                                  value={field.value?.toISOString().split('T')[0]}
                                                  onChange={(e) => field.onChange(new Date(e.target.value))}
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                      </div>
                                    </div>
                                    
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => removeTerm(index)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                  </div>
                                </motion.div>
                              )}
                            </Draggable>
                          ))}
                        </AnimatePresence>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                {form.watch("academicYear.terms").length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarIcon className="mx-auto h-12 w-12 opacity-50 mb-2" />
                    <p>No terms added yet. Click "Add Term" to get started.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-end gap-4"
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/setup/roles")}
                disabled={isLoading}
              >
                Previous
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Saving...
                  </>
                ) : "Next"}
              </Button>
            </motion.div>
          </form>
        </Form>
      </div>
    </div>
  );
};