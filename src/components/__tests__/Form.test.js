import React from 'react';

import { render, cleanup, fireEvent } from '@testing-library/react';

import Form from 'components/Appointment/Form';
import propTypes from 'prop-types';

afterEach(cleanup);

const interviewers = [
  {
    id: 1,
    student: 'Sylvia Palmer',
    avatar: 'https://i.imgur.com/LpaY82x.png',
  },
];

describe('Form', () => {
  it('renders without student name if not provided', () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
  });

  it('render with the initial student name', () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />
    );
    expect(getByTestId('student-name-input')).toHaveValue('Lydia Miller-Jones');
  });

  it('validates that the student name is not blank', () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
    const onConfirm = jest.fn();

    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} onConfirm={onConfirm} />
    );

    /* 3. Click the save button */
    fireEvent.click(getByText('Save'));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it('validates that the interviewer cannot be null', () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
    const onConfirm = jest.fn();

    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the interviewer prop should be null */
    const { getByText } = render(
      <Form
        interviewers={interviewers}
        student="Lydia Miller-Jones"
        onSave={onSave}
        onConfirm={onConfirm}
      />
    );

    /* 3. Click the save button */
    fireEvent.click(getByText('Save'));

    expect(getByText(/interviewer cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it('can successfully save after initially trying to submit an empty student name', () => {
    const onSave = jest.fn();
    const onConfirm = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        onSave={onSave}
        onConfirm={onConfirm}
        interviewer={interviewers[0].id}
      />
    );

    fireEvent.click(getByText('Save'));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    fireEvent.change(getByPlaceholderText('Enter Student Name'), {
      target: { value: 'Lydia Miller-Jones' },
    });

    fireEvent.click(getByText('Save'));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(interviewers[0].id);
    expect(onSave).toHaveBeenCalledWith(
      'Lydia Miller-Jones',
      interviewers[0].id
    );
  });

  it('calls onCancel and resets the input field', () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={onSave}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    fireEvent.click(getByText('Save'));

    fireEvent.change(getByPlaceholderText('Enter Student Name'), {
      target: { value: 'Lydia Miller-Jones' },
    });

    fireEvent.click(getByText('Cancel'));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
