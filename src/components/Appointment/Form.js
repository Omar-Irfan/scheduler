import React, { useState } from 'react'
import InterviewerList from 'components/InterviewerList'
import Button from "components/Button";

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = function() {
    setName("")
    setInterviewer(null)
  }

  const cancel = function() {
    reset()
    props.onCancel()
  }


  return(<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        value={name}
        onChange={(event) => setName(event.target.value)}
        type="text"
        placeholder="Enter Student Name"
      />
    </form>
    <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={cancel} danger>Cancel</Button>
      <Button disabled={!interviewer || !name || name === ""} onClick={() => props.onSave(name, interviewer)}confirm>Save</Button>
    </section>
  </section>
</main>)
}