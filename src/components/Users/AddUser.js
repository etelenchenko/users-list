import React from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import {useState, useRef} from "react";
import ErrorModal from "../UI/ErrorModal";

function AddUser(props) {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    if (enteredName.trim().length > 0 && enteredUserAge.trim().length > 0) {
      if (+enteredUserAge > 0) {
        props.onAddUser(enteredName, enteredUserAge);
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
      } else {
        setError({
          title: "Invalid input",
          message: "Please enter a valid age (> 0)"
        });
      }
    } else {
      setError({
        title: "Invalid age",
        message: "Please enter a valid name and age (non-empty values)"
      });
    }
  }

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef}/>
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={ageInputRef}/>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </React.Fragment>
  )
}

export default AddUser;