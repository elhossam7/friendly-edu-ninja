import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

const CompletionPage: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const [institutionName, setInstitutionName] = useState<string>('Your Institution');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if setup was completed
    const setupCompleted = localStorage.getItem('setupCompleted');
    const storedInstitutionName = localStorage.getItem('institutionName');
    
    if (storedInstitutionName) {
      setInstitutionName(storedInstitutionName);
    }
    
    if (!setupCompleted) {
      toast({
        title: "Setup Incomplete",
        description: "Please complete the institution setup first.",
        variant: "destructive",
      });
      navigate('/setup/roles');
      return;
    }
  }, [navigate, toast]);

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate feedback length
    if (feedback.length > 500) {
      toast({
        title: "Feedback Too Long",
        description: "Feedback must be 500 characters or less.",
        variant: "destructive",
      });
      return;
    }

    try {
      // TODO: Implement actual feedback submission logic
      console.log('Feedback submitted:', { 
        rating, 
        feedback, 
        isAnonymous 
      });
      
      toast({
        title: "Feedback Received",
        description: "Thank you for helping us improve EduManager!",
        variant: "default",
      });

      // Show thank you message
      setShowThankYou(true);

      // Reset form after submission
      setRating(null);
      setFeedback('');
      setIsAnonymous(false);

      // Hide thank you message after 3 seconds
      setTimeout(() => setShowThankYou(false), 3000);
    } catch (error) {
      toast({
        title: "Feedback Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  // Setup steps completed
  const setupSteps = [
    'Institution Registration',
    'User Roles and Permissions',
    'Academic Year Setup',
    'Class and Section Creation',
    'Subject and Curriculum Configuration'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-6 border border-purple-100">
        {/* Success Message with Personalization */}
        <div className="text-center">
          <div 
            className="text-6xl mb-4 transition-transform duration-300 hover:scale-110 inline-block cursor-pointer" 
            role="img" 
            aria-label="Celebration"
          >
            🎉
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Congratulations!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            {institutionName} is now set up on EduManager. You can start managing your school right away.
          </p>

          {/* Progress Summary */}
          <Accordion type="single" collapsible className="w-full mb-6">
            <AccordionItem value="setup-steps">
              <AccordionTrigger className="text-purple-700 hover:text-purple-900">
                View Setup Steps Completed
              </AccordionTrigger>
              <AccordionContent>
                <ul className="text-left text-sm text-gray-600 space-y-2 p-4 bg-purple-50 rounded-lg">
                  {setupSteps.map((step, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2 text-green-500">✓</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Call-to-Actions with Tooltips */}
        <div className="space-y-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/dashboard" className="block">
                  <Button 
                    variant="default" 
                    className="w-full bg-purple-500 hover:bg-purple-600 text-lg py-3"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Access your institution's main control center</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/students/enroll" className="block">
                  <Button 
                    variant="secondary" 
                    className="w-full bg-purple-700 hover:bg-purple-800 text-lg py-3"
                  >
                    Add Students
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Start enrolling students into your institution</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/guided-tour" className="block">
                  <Button 
                    variant="outline" 
                    className="w-full border-purple-900 text-purple-900 hover:bg-purple-100 text-lg py-3"
                  >
                    Start Guided Tour
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Take a quick tour of EduManager's key features</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Feedback Form with Enhancements */}
        <form onSubmit={handleSubmitFeedback} className="space-y-4">
          <h3 className="text-xl font-semibold text-center text-gray-700">
            How was your setup experience?
          </h3>
          
          {/* Star Rating */}
          <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span 
                key={star} 
                role="button" 
                aria-label={`${star} star rating`}
                onClick={() => handleRatingClick(star)}
                className={`text-4xl cursor-pointer transition-transform duration-200 ${
                  rating && rating >= star 
                    ? 'text-yellow-400 scale-110' 
                    : 'text-gray-300 hover:text-yellow-200'
                }`}
              >
                ⭐
              </span>
            ))}
          </div>

          {/* Feedback Textarea */}
          <textarea 
            placeholder="Share your additional feedback (optional, max 500 characters)" 
            value={feedback}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setFeedback(e.target.value);
              }
            }}
            className="w-full p-3 border border-gray-300 rounded-lg min-h-[100px] focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            maxLength={500}
          />

          {/* Character Count */}
          <div className="text-right text-sm text-gray-500">
            {feedback.length}/500 characters
          </div>

          {/* Anonymous Feedback Option */}
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="anonymous-feedback"
              checked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
              className="text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="anonymous-feedback" className="text-gray-700">
              Submit feedback anonymously
            </label>
          </div>

          {/* Thank You Message */}
          {showThankYou && (
            <div className="text-center text-green-600 animate-bounce">
              Thank you for your feedback! 🌟
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={!rating}
            className="w-full bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-lg py-3"
          >
            Submit Feedback
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompletionPage;
