import React from "react";
import 'components/Appointment/styles.scss'
import Header from 'components/Appointment/Header'
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty'
import Form from 'components/Appointment/Form'
import useVisualMode from 'hooks/useVisualMode'
import Status from 'components/Appointment/Status'
import Confirm from "./Confirm";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const CONFIRM = "CONFIRM"
  const DELETING = "DELETING"
  const EDIT = "EDIT"

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview).then((res) => transition(SHOW))

  }

  function deleteStep1() {
    transition(CONFIRM)
  }
  function deleteStep2(id) {
    transition(DELETING)
    props.cancelInterview(id).
    then((res) => transition(EMPTY))
  }

  function edit() {
    
    transition(EDIT)

  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return(<article className="appointment">
    <Header
    time={props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === CREATE && <Form onCancel = {() => back() }interviewers={props.interviewers} onSave ={save} />}
    {mode === EDIT && <Form onCancel = {() => back() } interviewers={props.interviewers}
    name={props.interview.student} interviewer={props.interview.interviewer.id} onSave ={save} />}
    {mode === SAVING && <Status message={"Saving"}/>}
    {mode === DELETING && <Status message={"Deleting"}/>}
{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    id={props.id}
    onDelete={deleteStep1}
    onEdit={edit}
  />
)}
{mode === CONFIRM && <Confirm
message={'Are you sure you would like to delete?'}
onConfirm={() => {deleteStep2(props.id)}}
onCancel={() => back()}
/> }
  </article>)
}