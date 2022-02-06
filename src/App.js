import React, { useEffect } from "react";
import Question from "./Question.js";
import Confetti from "react-confetti";
export default function App() {
  const [answers, setAnswers] = React.useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
  });
  const [Quiz, setQuiz] = React.useState([]);
  const [result, setResult] = React.useState(0);
  const [reveal, setReveal] = React.useState(false);
  const [grade, setGrade] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  const [Home, setHome] = React.useState(true);
  const [User, setUser] = React.useState({
    FirstName: "",
    LastName: "",
    Category: "",
    Difficulty: "",
  });
  const correctArray = [];
  const [correcting, setCorrecting] = React.useState(false);
  const [helper, setHelper] = React.useState(0);
  const [initialState, setInitialState] = React.useState({
    answers: {
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
      9: "",
    },
    Quiz: [],
    result: 0,
    reveal: false,
    grade: false,
    disable: false,
    Home: true,
    correcting: false,
    helper: 0,
    User: {
      FirstName: "",
      LastName: "",
      Category: "",
      Difficulty: "",
    },
  });
  console.log(User.Category);
  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
  const link = `https://opentdb.com/api.php?amount=10&category=${User.Category}&difficulty=${User.Difficulty}&type=multiple`;
  React.useEffect(() => {
    fetch(link)
      .then((res) => res.json())
      .then((data) => setQuiz(data.results));
  }, [User]);
  function handlechange(event) {
    const { name, value } = event.target;
    setAnswers((prevState) => {
      return { ...prevState, [name]: value };
    });
  }
  function formHome(event) {
    const { name, value } = event.target;
    setUser((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  const questions = Quiz.map((data) => {
    correctArray.push(decodeHtml(data.correct_answer));
    return (
      <Question
        className="Question"
        quest={decodeHtml(data.question)}
        correctAnswer={decodeHtml(data.correct_answer)}
        incorrectAnswers={JSON.stringify(data.incorrect_answers)}
        handleChange={handlechange}
        questionNumber={Quiz.indexOf(data)}
        check={answers[Quiz.indexOf(data)]}
        correctness={correcting}
      />
    );
  });

  function refreshPage() {
    window.location.reload(false);
  }

  function submit() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    let i = 0;
    for (const ans in answers) {
      if (correctArray[i] === answers[i]) {
        setHelper((prevState) => prevState + 1);
      }
      i++;
    }
    setCorrecting(true);
    setReveal(true);
    setDisable(true);
  }
  function clearState() {
    setAnswers(initialState.answers);
    setQuiz(initialState.Quiz);
    setResult(initialState.result);
    setReveal(initialState.reveal);
    setGrade(initialState.grade);
    setDisable(initialState.disable);
    setHome(initialState.Home);
    setCorrecting(initialState.correcting);
    setHelper(initialState.helper);
    setUser(initialState.User);
  }
  function GradeNote() {
    const note = "";
    if (helper < 7) {
      note = "There is always next time," + User.FirstName;
    } else {
      note = "Amazing job! " + User.FirstName;
    }
    return note;
  }
  return (
    <div>
      {reveal && (
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEX///8EAAAAAAD29vY/Pj50c3PR0dH7+/vy8vLc29ubmppYV1f39/eioaFvbm4gHR3m5uY7OTm5uLh6eXlJSEiQj4+trKyHhYVmZWXDwsI1MzPj4+MtLCwdGhonJSWop6dRUFDS0tIX/rzIAAACvElEQVR4nO3dgVbaMBiG4V+qUBRYh8pgypT7v8nJDgpI0qY7h9Pk+9/nCniPW5u0SWoGAAAAAAAAAAAAAAAAAAAAAICIaugfcG3Lx6F/wXU1d6O7oX/DVY2fRtKF1fNodKNcOF1/BAoXTlajfaBuYbP416dbuPl9CBQtrH999okWTh+OgYqFs/lJn2Jhsz4L1Ctc/jgPVCusH7/1qRXuh6E3woXV/WWfVGHzEArUKfwchsoW1otwn0zh5mcsUKOwfo72aRRO31sCBQpnb5FLjEphvW7tK7/wYhgqVng605UsDA1DlQqrefslpvjCOjwMlSmMDkNVCgMzXa3C49NQzcLwTDdauLBqSP8R+JJyjzgp3N4O6XXXt2/SMQwNJA5r3DOwis50M9W3cLktLLBnYdU2081Ur8Jd/FFFvnoUTtKGoblJL0wdhuYmuXBV3CXmILGwSpjpZiqtcPOn2MCkwkmvYWhuEgqb25IDEwrfSr3EHHQV9pjpZqqjcNP5NDR7rYVlX2IO2gqnBd8jjloK51uBvpbC7+t+ihUrXEr8C90LF87KHYZeCBbuCr/JnwkV3mtcYg4uC19aX8qX56Kw7ve4N38O/4YO/h/ur6Xlj7ePIvfDAp/8xkTHNK8qjX7HpaY/tzAH80MHc3zTf05jDp61mf7zUnPwzLv0C07au6dxwfcN3h9+WZV63+A9/gn5tRimv57GHKyJMv11beZgbaKD9aWmv0bYHKzzNv21+uZgv8UH9T0zpr/vyRzsXTP9/YfmYA+p6e8DNgd7uR3sxzf9MxWsY2YsUah/tok5OJ/GwRlDpn9OlDk468v0z2szB2fumf65iebg7EsH55ea/hm05uAcYTsdqKoW6p/n7eBMdtM/V98cfBvB9L9vYQ6+UWL635kxB98KAgAAAAAAAAAAAAAAAAAAAAAg5C9NIUXQYD6oGAAAAABJRU5ErkJggg=="
          className="returnButton"
          alt="Return To Menu"
          onClick={(clearState, refreshPage)}
        />
      )}
      <div className="Home">
        <div className="flex-Home">
          {Home && (
            <h1
              style={{
                color: "#293294",
                textAlign: "center",
                backgroundColor: "white",
                fontSize: "40px",
              }}
            >
              Quizzy
            </h1>
          )}
          {Home && (
            <input type="text" className="firstName" placeholder="First Name" />
          )}
          {Home && (
            <input type="text" className="lastName" placeholder="Last Name" />
          )}
          {Home && (
            <select
              id="form"
              value={User.Category}
              onChange={formHome}
              name="Category"
              className="SelectCategory"
            >
              <option value="any">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals &amp; Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science &amp; Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">
                Entertainment: Japanese Anime &amp; Manga
              </option>
              <option value="32">
                Entertainment: Cartoon &amp; Animations
              </option>
            </select>
          )}
          {Home && (
            <select
              value={User.Difficulty}
              onChange={formHome}
              name="Difficulty"
              className="SelectDifficulty"
              onChange={formHome}
              value={User.Difficulty}
            >
              <option value="any">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          )}
        </div>
      </div>
      {Home && (
        <button
          className="HomeButt"
          onClick={() => {
            setHome((prevState) => !prevState);
          }}
        >
          Start Quiz!
        </button>
      )}

      <div className="Quiz">
        {reveal && (
          <div>
            <h1 style={{ textAlign: "center", marginTop: "-50px" }}>
              Your Grade is: {helper}/10{" "}
            </h1>
            <br></br>
          </div>
        )}
        <form>{!Home && questions}</form>
      </div>
      {!Home && (
        <button className="submit" disabled={disable} onClick={submit}>
          Submit
        </button>
      )}
    </div>
  );
}
