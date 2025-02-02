import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const SetupSuccess = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    // Start progress animation
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 2;
        if (newProgress === 100) {
          clearInterval(timer);
          // Redirect to dashboard when progress reaches 100%
          setTimeout(() => navigate('/dashboard'), 500);
        }
        return Math.min(newProgress, 100);
      });
    }, 50);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Setup Complete!</h1>
          <p className="text-muted-foreground mb-6">
            Your institution has been successfully configured. You'll be redirected to your dashboard shortly.
          </p>
          <Progress value={progress} className="mb-6" />
          <Button 
            variant="outline" 
            onClick={handleSkip}
            className="w-full"
          >
            Go to Dashboard Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupSuccess;
