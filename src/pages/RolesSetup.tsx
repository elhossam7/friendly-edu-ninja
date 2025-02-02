import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2 } from "lucide-react";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: {
    [key: string]: boolean;
  };
  isCustom?: boolean;
}

const defaultRoles: Role[] = [
  {
    id: "admin",
    name: "Admin",
    description: "Full access to all features and settings",
    permissions: {
      manageUsers: true,
      manageRoles: true,
      manageClasses: true,
      manageSubjects: true,
      viewReports: true,
      editSettings: true,
    },
  },
  {
    id: "teacher",
    name: "Teacher",
    description: "Access to attendance, grades, and communication tools",
    permissions: {
      manageUsers: false,
      manageRoles: false,
      manageClasses: true,
      manageSubjects: true,
      viewReports: true,
      editSettings: false,
    },
  },
  {
    id: "student",
    name: "Student",
    description: "Access to assignments, grades, and schedules",
    permissions: {
      manageUsers: false,
      manageRoles: false,
      manageClasses: false,
      manageSubjects: false,
      viewReports: false,
      editSettings: false,
    },
  },
  {
    id: "parent",
    name: "Parent",
    description: "Access to student performance and attendance",
    permissions: {
      manageUsers: false,
      manageRoles: false,
      manageClasses: false,
      manageSubjects: false,
      viewReports: true,
      editSettings: false,
    },
  },
];

const permissionLabels = {
  manageUsers: "Manage Users",
  manageRoles: "Manage Roles",
  manageClasses: "Manage Classes",
  manageSubjects: "Manage Subjects",
  viewReports: "View Reports",
  editSettings: "Edit Settings",
};

const permissionDescriptions = {
  manageUsers: "Create, edit, and delete user accounts",
  manageRoles: "Modify role permissions and create custom roles",
  manageClasses: "Create and manage classes, assign teachers",
  manageSubjects: "Add and edit subjects, upload curriculum",
  viewReports: "Access performance and attendance reports",
  editSettings: "Modify system and institution settings",
};

const RolesSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [roles, setRoles] = React.useState<Role[]>(defaultRoles);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [newRoleName, setNewRoleName] = React.useState("");
  const [showCustomRoleForm, setShowCustomRoleForm] = React.useState(false);
  const [customRoleDescription, setCustomRoleDescription] = React.useState("");

  const handlePermissionChange = (roleId: string, permission: string) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === roleId
          ? {
              ...role,
              permissions: {
                ...role.permissions,
                [permission]: !role.permissions[permission],
              },
            }
          : role
      )
    );
  };

  const addCustomRole = () => {
    if (!newRoleName.trim()) {
      toast({
        title: "Error",
        description: "Role name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (!customRoleDescription.trim()) {
      toast({
        title: "Error",
        description: "Role description cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const newRole: Role = {
      id: `custom-${Date.now()}`,
      name: newRoleName,
      description: customRoleDescription,
      permissions: Object.keys(permissionLabels).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      ),
      isCustom: true,
    };

    setRoles([...roles, newRole]);
    setNewRoleName("");
    setCustomRoleDescription("");
    setShowCustomRoleForm(false);
    
    toast({
      title: "Custom role created",
      description: `${newRoleName} role has been added successfully.`,
    });
  };

  const deleteRole = (roleId: string) => {
    if (["admin", "teacher", "student", "parent"].includes(roleId)) {
      toast({
        title: "Cannot delete default role",
        description: "Default roles are required for system functionality",
        variant: "destructive",
      });
      return;
    }
    setRoles(roles.filter((role) => role.id !== roleId));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // Your existing save logic here
      
      toast({
        title: "Roles Setup Complete",
        description: "Your roles and permissions have been configured successfully.",
      });
      
      // Redirect to academic year setup with correct path
      navigate('/setup/academic-year');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save roles configuration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = async () => {
    // Validate that at least one role has admin permissions
    const hasAdminRole = roles.some((role) =>
      Object.values(role.permissions).every((enabled) => enabled)
    );

    if (!hasAdminRole) {
      toast({
        title: "Warning",
        description: "At least one role must have full administrative permissions",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Roles saved successfully!",
        description: "Moving to Academic Year setup...",
      });

      navigate("/setup/academic-year");
    } catch (error) {
      toast({
        title: "Error saving roles",
        description: "Please try again",
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
          <h1 className="text-3xl font-bold tracking-tight">Set Up User Roles</h1>
          <p className="text-muted-foreground">Define roles and permissions for your institution</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Step 2 of 5: User Roles and Permissions</span>
            <span>40% Complete</span>
          </div>
          <Progress value={40} />
        </div>

        <div className="grid gap-6">
          {showCustomRoleForm ? (
            <Card className="border-dashed border-2">
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Enter role name"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                  />
                  <Input
                    placeholder="Enter role description"
                    value={customRoleDescription}
                    onChange={(e) => setCustomRoleDescription(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={addCustomRole} variant="default">
                    Add Role
                  </Button>
                  <Button 
                    onClick={() => {
                      setShowCustomRoleForm(false);
                      setNewRoleName("");
                      setCustomRoleDescription("");
                    }} 
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Button
              onClick={() => setShowCustomRoleForm(true)}
              variant="outline"
              className="w-full border-dashed"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Custom Role
            </Button>
          )}
          
          {roles.map((role) => (
            <Card key={role.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">
                  {role.name}
                  {role.isCustom && (
                    <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      Custom
                    </span>
                  )}
                </CardTitle>
                {role.isCustom && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteRole(role.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {Object.entries(role.permissions).map(([permission, enabled]) => (
                    <TooltipProvider key={permission}>
                      <Tooltip>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <TooltipTrigger asChild>
                              <label
                                htmlFor={`${role.id}-${permission}`}
                                className="text-sm font-medium cursor-help"
                              >
                                {permissionLabels[permission]}
                              </label>
                            </TooltipTrigger>
                          </div>
                          <Switch
                            id={`${role.id}-${permission}`}
                            checked={enabled}
                            onCheckedChange={() =>
                              handlePermissionChange(role.id, permission)
                            }
                          />
                        </div>
                        <TooltipContent>
                          <p>{permissionDescriptions[permission]}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button onClick={handleNext} size="lg" disabled={isLoading}>
            {isLoading ? "Saving..." : "Next: Academic Year Setup"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RolesSetup;