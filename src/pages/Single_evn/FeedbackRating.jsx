import React, { useState } from 'react';
import './feedback.css';
import axios from 'axios';
import { feedbackapi } from '../../apiroutes';

const FeedbackRating = ({organized_by}) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleRatingClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = () => {
    if (feedback && rating) {
        axios.put(`${feedbackapi}/${organized_by}`, { incrementValue: rating }) // Sending incrementValue in request body
            .then(response => {
                console.log(response.data);
                setFeedback('');
                setRating(0);
            })
            .catch(error => {
                console.error("There was an error updating the feedback!", error);
            });
    } else {
        alert('Please provide feedback and a rating.');
    }
};


  return (
    <div className="feedback-container">
      <h2>Feedback & Rating</h2>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Write a feedback"
        className="feedback-input"
      />
      <div className="star-rating">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={index < rating ? 'star filled' : 'star'}
            onClick={() => handleRatingClick(index)}
          >
            ★
          </span>
        ))}
      </div>
      <button onClick={handleSubmit} className="submit-button">Submit</button>
    </div>
  );
};

export default FeedbackRating;
