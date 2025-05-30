import * as React from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const classSchema = z.object({
  classes: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, "Class name is required"),
      teacherId: z.string().min(1, "Teacher is required"),
      sections: z.array(
        z.object({
          id: z.string(),
          name: z.string().min(1, "Section name is required"),
          capacity: z.number().optional(),
          order: z.number()
        })
      ).min(1, "Each class must have at least one section")
    })
  ).min(1, "You must add at least one class")
});

const ClassAndSectionSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(classSchema),
    defaultValues: {
      classes: []
    }
  });

  const addClass = () => {
    const classes = form.getValues("classes");
    form.setValue("classes", [
      ...classes,
      {
        id: crypto.randomUUID(),
        name: "",
        teacherId: "",
        sections: []
      }
    ]);
  };

  const addSection = (classIndex: number) => {
    const classes = form.getValues("classes");
    const sections = classes[classIndex].sections;
    
    form.setValue(`classes.${classIndex}.sections`, [
      ...sections,
      {
        id: crypto.randomUUID(),
        name: "",
        capacity: undefined,
        order: sections.length
      }
    ]);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const classIndex = parseInt(result.source.droppableId);
    const sections = form.getValues(`classes.${classIndex}.sections`);
    
    const items = Array.from(sections) as typeof sections;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    const updatedSections = items.map((item, index) => ({
      ...item as object,
      order: index
    }));

    form.setValue(`classes.${classIndex}.sections`, updatedSections);
  };

  const onSubmit = async (data: z.infer<typeof classSchema>) => {
    setIsLoading(true);
    try {
      // Validate that at least one class exists with at least one section
      if (data.classes.length === 0) {
        toast({
          title: "Validation Error",
          description: "You must add at least one class",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Additional validation for each class
      const invalidClasses = data.classes.filter(
        classItem => 
          !classItem.name.trim() || 
          !classItem.teacherId || 
          classItem.sections.length === 0
      );

      if (invalidClasses.length > 0) {
        toast({
          title: "Incomplete Setup",
          description: "Please ensure each class has a name, assigned teacher, and at least one section",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Save the data to localStorage for persistence
      localStorage.setItem('classSetupData', JSON.stringify(data));
      
      // API call simulation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Class and section setup completed successfully",
      });
      
      // Navigate to the subject setup page
      navigate("/setup/subject");
    } catch (error) {
      console.error('Error saving class setup:', error);
      toast({
        title: "Error",
        description: "Failed to save class setup",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9b87f5]/10 to-[#7E69AB]/10 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#7E69AB]">
            Class and Section Setup
          </h1>
          <p className="text-muted-foreground text-lg">
            Organize your institution's structure
            <span className="block text-sm text-red-500 mt-1">
              * At least one class with one section is required
            </span>
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Step 4 of 5: Class Organization</span>
            <span>80% Complete</span>
          </div>
          <Progress value={80} />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {form.watch("classes").length === 0 && (
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  You haven't added any classes yet. Get started by adding your first class!
                </p>
                <Button 
                  type="button" 
                  variant="default" 
                  onClick={addClass}
                  className="mx-auto"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Class
                </Button>
              </div>
            )}

            {form.watch("classes").map((classItem, classIndex) => (
              <Card key={classItem.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-xl">Class {classIndex + 1}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const classes = form.getValues("classes");
                      classes.splice(classIndex, 1);
                      form.setValue("classes", classes);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`classes.${classIndex}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Class Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Grade 1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`classes.${classIndex}.teacherId`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assign Teacher</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a teacher" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">Teacher 1</SelectItem>
                              <SelectItem value="2">Teacher 2</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Sections</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addSection(classIndex)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Section
                      </Button>
                    </div>

                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId={classIndex.toString()}>
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {classItem.sections.map((section, sectionIndex) => (
                              <Draggable
                                key={section.id}
                                draggableId={section.id}
                                index={sectionIndex}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className="mt-2"
                                  >
                                    <Card>
                                      <CardContent className="p-4">
                                        <div className="flex items-center gap-4">
                                          <div {...provided.dragHandleProps}>
                                            <GripVertical className="h-5 w-5 text-gray-400" />
                                          </div>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                                            <FormField
                                              control={form.control}
                                              name={`classes.${classIndex}.sections.${sectionIndex}.name`}
                                              render={({ field }) => (
                                                <FormItem>
                                                  <FormControl>
                                                    <Input placeholder="e.g., Section A" {...field} />
                                                  </FormControl>
                                                  <FormMessage />
                                                </FormItem>
                                              )}
                                            />
                                            <FormField
                                              control={form.control}
                                              name={`classes.${classIndex}.sections.${sectionIndex}.capacity`}
                                              render={({ field }) => (
                                                <FormItem>
                                                  <FormControl>
                                                    <Input
                                                      type="number"
                                                      placeholder="Capacity (optional)"
                                                      {...field}
                                                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                                    />
                                                  </FormControl>
                                                  <FormMessage />
                                                </FormItem>
                                              )}
                                            />
                                          </div>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                              const sections = form.getValues(`classes.${classIndex}.sections`);
                                              sections.splice(sectionIndex, 1);
                                              form.setValue(`classes.${classIndex}.sections`, sections);
                                            }}
                                            className="text-red-500 hover:text-red-700"
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </CardContent>
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
                </CardContent>
              </Card>
            ))}

            {form.watch("classes").length > 0 && (
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={addClass}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Class
                </Button>
                <Button type="submit">
                  Continue to Subject Setup
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ClassAndSectionSetup;
