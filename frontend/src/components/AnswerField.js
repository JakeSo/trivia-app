import React, { useState } from 'react';

const AnswerField = ({ onSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    onSubmit(answer);
    setAnswer('');
  };

  return (
    <div>
      <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AnswerField;
