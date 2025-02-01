import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CompletionPage: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement feedback submission logic
    console.log('Feedback submitted:', { rating, feedback });
    // Optional: Show a thank you message or send to backend
  };

  return (
    <div className="completion-page flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md text-center">
        {/* Success Message */}
        <div className="success-message mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Congratulations!</h1>
          <p className="text-lg text-gray-600">
            Your institution is now set up on EduManager. You can start managing your school right away.
          </p>
          <div className="celebration-icon text-6xl mt-4" role="img" aria-label="Celebration">
            🎉
          </div>
        </div>

        {/* Call-to-Actions */}
        <div className="cta-buttons grid grid-cols-1 gap-4 mb-8">
          <Link 
            to="/dashboard" 
            className="btn bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Go to Dashboard
          </Link>
          <Link 
            to="/students/enroll" 
            className="btn bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add Students
          </Link>
          <Link 
            to="/features" 
            className="btn bg-purple-900 hover:bg-purple-950 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Explore Features
          </Link>
        </div>

        {/* Optional Feedback Form */}
        <div className="feedback-form bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">How was your setup experience?</h3>
          <form onSubmit={handleSubmitFeedback}>
            <div className="rating flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  role="button" 
                  aria-label={`${star} star rating`}
                  onClick={() => handleRatingClick(star)}
                  className={`text-3xl cursor-pointer mx-1 transition duration-200 ${
                    rating && rating >= star ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ⭐
                </span>
              ))}
            </div>
            <textarea 
              placeholder="Any additional feedback?" 
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button 
              type="submit" 
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompletionPage;
