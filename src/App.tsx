import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import CompletionPage from "./pages/CompletionPage";
import StudentEnrollment from "./pages/StudentEnrollment";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<InstitutionRegistration />} />
            <Route path="/setup/roles" element={<RolesSetup />} />
            <Route path="/setup/academic-year" element={<AcademicYearSetup />} />
            <Route path="/setup/class" element={<ClassAndSectionSetup />} />
            <Route path="/setup/subject" element={<SubjectSetup />} />
            <Route path="/setup/completion" element={<CompletionPage />} />
            <Route path="/setup/student-enrollment" element={<StudentEnrollment />} />
            <Route path="/students/enroll" element={<StudentEnrollment />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}