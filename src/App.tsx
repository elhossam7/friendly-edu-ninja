import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import InstitutionRegistration from "./pages/InstitutionRegistration";
import RolesSetup from "./pages/RolesSetup";
import AcademicYearSetup from "./pages/AcademicYearSetup";
import ClassAndSectionSetup from "./pages/ClassAndSectionSetup";
import SubjectSetup from "./pages/SubjectSetup";
import SetupSuccess from "./pages/SetupSuccess";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import StudentEnrollment from '@/pages/student-enrollment';

const queryClient = new QueryClient();

function RequireAuth({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<InstitutionRegistration />} />
            <Route path="/setup/roles" element={<RolesSetup />} />
            <Route path="/setup/academic-year" element={<AcademicYearSetup />} />
            <Route path="/setup/class" element={<ClassAndSectionSetup />} />
            <Route path="/setup/subject" element={<SubjectSetup />} />
            <Route path="/setup/success" element={<SetupSuccess />} />
            <Route path="/student-enrollment" element={<StudentEnrollment />} />
            <Route 
              path="/dashboard" 
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

// Protection wrapper component
function RequireSetup({ children }: { children: React.ReactNode }) {
  const isSetupComplete = localStorage.getItem('classSetupData') && 
                         localStorage.getItem('rolesSetupData');

  if (!isSetupComplete) {
    return <Navigate to="/register" replace />;
  }

  return <>{children}</>;
}