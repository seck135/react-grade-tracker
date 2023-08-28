import React, { useState } from "react";
import "./App.css";

function App() {
  const [subjects, setSubjects] = useState([
    {
      subject: "Math",
      description: "Short description about Math.",
      grades: [],
      newGrade: "",
      isDetailsOpen: false,
    },
    {
      subject: "English",
      description: "Short description about English.",
      grades: [],
      newGrade: "",
      isDetailsOpen: false,
    },
    {
      subject: "Language",
      description: "Short description about Language.",
      grades: [],
      newGrade: "",
      isDetailsOpen: false,
    },
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({
    subject: "",
    description: "",
    grades: [],
    newGrade: "",
    isDetailsOpen: false,
  });

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewSubject((prevSubject) => ({
      ...prevSubject,
      [name]: value,
    }));
  };

  const addSubject = () => {
    if (newSubject.subject && newSubject.description) {
      setSubjects([
        ...subjects,
        { ...newSubject, grades: [], newGrade: "", isDetailsOpen: false },
      ]);
      setNewSubject({
        subject: "",
        description: "",
        grades: [],
        newGrade: "",
        isDetailsOpen: false,
        // isFormOpen,
      });
      toggleForm();
    }
  };

  const handleGradeInputChange = (event, subjectIndex) => {
    const { value } = event.target;
    const isValidGrade = !isNaN(value) && value >= 0 && value <= 100;

    setSubjects((prevSubjects) => {
      const updatedSubjects = [...prevSubjects];
      updatedSubjects[subjectIndex] = {
        ...updatedSubjects[subjectIndex],
        newGrade: value,
        inputError: isValidGrade ? "" : "Invalid grade",
      };
      return updatedSubjects;
    });
  };

  const addGrade = (subjectIndex) => {
    if (subjects[subjectIndex].newGrade !== "") {
      setSubjects((prevSubjects) => {
        const updatedSubjects = [...prevSubjects];
        updatedSubjects[subjectIndex].grades.push(
          subjects[subjectIndex].newGrade
        );
        updatedSubjects[subjectIndex].newGrade = "";
        return updatedSubjects;
      });
    }
  };

  const [areAllDetailsOpen, setAreAllDetailsOpen] = useState(false);

  const toggleAllDetails = () => {
    setAreAllDetailsOpen(!areAllDetailsOpen);
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) => ({
        ...subject,
        isDetailsOpen: !areAllDetailsOpen,
      }))
    );
  };

  const toggleDetails = (subjectIndex) => {
    setSubjects((prevSubjects) => {
      const updatedSubjects = [...prevSubjects];
      updatedSubjects[subjectIndex].isDetailsOpen =
        !updatedSubjects[subjectIndex].isDetailsOpen;
      return updatedSubjects;
    });
  };

  const [isloggedin, setIslogginingin] = useState(false);

  // const togglelogginingin = () => {
  //   setIslogginingin(!isloggedin);
  // };

  // // console.log(event)
  const handleLogin = (event) => {
    event.preventDefault();
    // console.log(event.target.username.value);
    const enteredUsername = event.target.username.value;
    const enteredPassword = event.target.password.value;

    const correctUsername = "liamking";
    const correctPassword = "itaygreen";

    if (
      enteredUsername === correctUsername &&
      enteredPassword === correctPassword
    ) {
      setIslogginingin(true);
    } else {
      alert("there is an error with the username or the password");
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const professionDivs = document.querySelectorAll(".profession");
  const gpaframes = document.querySelectorAll(".gpa-frame");
  if (isDarkMode) {
    document.body.classList.add("dark-background");
    professionDivs.forEach((div) => {
      div.classList.add("dark-background");
    });
    gpaframes.forEach((frame) => {
      frame.classList.add("dark-background");
    });
  } else {
    document.body.classList.remove("dark-background");
    professionDivs.forEach((div) => {
      div.classList.remove("dark-background");
    });
    gpaframes.forEach((frame) => {
      frame.classList.remove("dark-background");
    });
  }

  return (
    <div className="App">
      {!isloggedin ? (
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                placeholder="Enter Username"
                id="username"
                name="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                placeholder="Enter Password"
                id="password"
                name="password"
              />
            </div>
            <button
              // onClick={handleLogin}
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="nav_bar">
            <div className="add-subject-container">
              {isFormOpen ? (
                <div className="profession">
                  <div className="profession-details">
                    <button onClick={toggleForm}>
                      {isFormOpen ? "Hide Add Subject" : "Add Subject"}
                    </button>
                    <input
                      type="text"
                      placeholder="Enter Profession Name"
                      name="subject"
                      value={newSubject.subject}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      placeholder="Enter Profession Description"
                      name="description"
                      value={newSubject.description}
                      onChange={handleInputChange}
                    />
                    <button onClick={addSubject}>Add</button>
                  </div>
                </div>
              ) : (
                <button onClick={toggleForm}>Add Subject</button>
              )}
            </div>
            <div className="two_components_flex">
              <div className="hide_show_all_grades">
                <button onClick={toggleAllDetails}>
                  {areAllDetailsOpen ? "Hide All Grades" : "Show All Grades"}
                </button>
              </div>
              <div className="dark-light-mode">
                <button onClick={toggleDarkMode}>
                  {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </button>
              </div>
            </div>
          </div>
          <div className="professions-container">
            {subjects.map((subject, index) => (
              <ProfessionDiv
                key={index}
                subject={subject.subject}
                description={subject.description}
                grades={subject.grades}
                onAddGrade={() => addGrade(index)}
                newGrade={subject.newGrade}
                handleGradeInputChange={(event) =>
                  handleGradeInputChange(event, index)
                }
                isDetailsOpen={subject.isDetailsOpen}
                toggleDetails={() => toggleDetails(index)}
                inputError={subject.inputError}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProfessionDiv({
  subject,
  description,
  grades,
  onAddGrade,
  newGrade,
  handleGradeInputChange,
  isDetailsOpen,
  toggleDetails,
  inputError,
  handleAddGrade,
  areAllDetailsOpen, // Add the new prop
}) {
  const calculateGPA = (grades) => {
    if (grades.length === 0) return 0;

    const total = grades.reduce((acc, grade) => acc + parseInt(grade), 0);
    return (total / grades.length).toFixed(2);
  };

  return (
    <div className={`profession ${subject.toLowerCase()}-div`}>
      <div className="profession-details">
        <h2>{subject}</h2>
        <p>{description}</p>
        <button onClick={toggleDetails}>
          {isDetailsOpen ? "Hide Grades" : "Show Grades"}
        </button>
      </div>
      {(isDetailsOpen || areAllDetailsOpen) && ( // Use logical OR operator
        <div className="gpa-frame">
          <p className="gpa-title">GPA</p>
          <p className="gpa-value">{calculateGPA(grades)}</p>
        </div>
      )}
      {(isDetailsOpen || areAllDetailsOpen) && ( // Use logical OR operator
        <div className="grade-form">
          <h3>Add Grade</h3>
          <input
            type="text"
            placeholder="Enter Grade (0-100)"
            value={newGrade}
            onChange={handleGradeInputChange}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                console.log(inputError);

                // onAddGrade();

                if (!inputError) {
                  onAddGrade();
                } else {
                  alert("Please Enter A Valid Number !");
                }
              }
            }}
          />
          {inputError && (
            <p style={{ color: "red", fontSize: "12px" }}>{inputError}</p>
          )}
          <button
            onClick={(event) => {
              event.preventDefault(); // Prevent page refresh
              // onAddGrade();
              if (!inputError) {
                onAddGrade();
              } else {
                alert("Please Enter A Valid Number !");
              }
            }}
          >
            Add
          </button>

          <GradeList grades={grades} />
        </div>
      )}
    </div>
  );
}

function GradeList({ grades }) {
  return (
    <div className="grade-list">
      <h4>Grades List:</h4>
      <ul>
        {grades.map((grade, index) => (
          <li key={index}>
            Grade: {grade} | Date: {new Date().toLocaleDateString("en-GB")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
