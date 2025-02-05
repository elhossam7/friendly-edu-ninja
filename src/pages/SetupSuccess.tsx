import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, ArrowRight } from 'lucide-react';

const SetupSuccess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    // Check if setup was actually completed
    const setupCompleted = localStorage.getItem('setupCompleted');
    if (!setupCompleted) {
      navigate('/setup/roles');
      return;
    }

    // Show welcome toast
    toast({
      title: "Setup Complete!",
      description: "Your institution is now ready to use EduManager.",
    });

    // Animate progress bar
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        const newProgress = oldProgress + 2;
        if (newProgress === 100) {
          clearInterval(timer);
          // Auto-redirect after progress completes
          setTimeout(() => navigate('/dashboard'), 500);
        }
        return Math.min(newProgress, 100);
      });
    }, 50);

    return () => clearInterval(timer);
  }, [navigate, toast]);

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9b87f5]/10 to-[#7E69AB]/10 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1 
              }}
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
            </motion.div>
            
            <CardTitle className="text-2xl font-bold">
              Setup Complete!
            </CardTitle>
            
            <p className="text-muted-foreground">
              Congratulations! Your institution has been successfully configured.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Setup Summary */}
            <div className="space-y-4 p-4 bg-secondary/20 rounded-lg">
              <h3 className="font-semibold">Completed Setup Steps:</h3>
              <motion.ul 
                className="space-y-2"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                {[
                  'Institution Registration',
                  'User Roles and Permissions',
                  'Academic Year Configuration',
                  'Class and Section Organization',
                  'Subject and Curriculum Setup'
                ].map((step, index) => (
                  <motion.li
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      show: { opacity: 1, x: 0 }
                    }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {step}
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Setting up your dashboard</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Action Button */}
            <Button
              onClick={handleGoToDashboard}
              className="w-full group"
              size="lg"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SetupSuccess;
