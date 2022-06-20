import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Confirm from './Confirm';
import useVisualMode from '../../hooks/useVisualMode';
import Status from './Status';
import Error from './Error';

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const EDIT = 'EDIT';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING, true);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((err) => {
        console.log('error in save', err);
        transition(ERROR_SAVE, true);
      });
  };

  const confirmDelete = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => {
        console.log('error in delete', err);
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={'Saving'} />}
      {mode === DELETING && <Status message={'Deleting'} />}
      {mode === ERROR_SAVE && (
        <Error message="Error saving appointment" onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Error deleting appointment" onClose={back} />
      )}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={confirmDelete}
          onCancel={back}
          message={'Are you sure you want to delete this?'}
        />
      )}
      {mode === EDIT && (
        <Form
          onCancel={back}
          onConfirm={transition}
          onSave={save}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          student={props.interview.student}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          onCancel={back}
          onConfirm={transition}
          interviewers={props.interviewers}
          onSave={save}
        />
      )}
    </article>
  );
}
