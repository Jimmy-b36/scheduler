import React, { useState } from 'react';
import Button from '../Button';
import InterviewerList from '../InterviewerList';

export default function Form(props) {
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [student, setStudent] = useState(props.student || '');
  const [error, setError] = useState('');

  const reset = () => {
    setStudent('');
    setInterviewer(null);
    return;
  };

  const cancel = () => {
    reset();
    props.onCancel();
    setError('');
    return;
  };

  const validate = () => {
    if (student === '') {
      setError('Student name cannot be blank');
      return;
    }
    if (!interviewer) {
      setError('Interviewer cannot be blank');
      return;
    }

    setError('');
    props.onConfirm();
    props.onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(evt) => evt.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={student}
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
            onChange={(evt) => {
              setStudent(evt.target.value);
            }}
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
          data-testid="interviewer-list"
        />
      </section>

      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
