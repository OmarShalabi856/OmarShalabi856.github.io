import React from "react";
export default function Question(props) {
  const [rand, setRand] = React.useState(Math.floor(Math.random() * 4));
  function mergeArrays(element, arr) {
    const newArr = arr[0].split('","');
    newArr.splice(rand, 0, element);
    return newArr;
  }
  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
  function removeChar(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].replace("[", " ");
      arr[i] = arr[i].replace("]", " ");
      arr[i] = arr[i].replace('"', " ");
      arr[i] = arr[i].replace('"', " ");
      arr[i] = decodeHtml(arr[i]);
    }
    return arr;
  }

  const qArray = mergeArrays(props.correctAnswer, [props.incorrectAnswers]);
  const finalArr = removeChar(qArray);

  function classes(data) {
    const prevStyles = {
      width: "auto",
      height: "auto",
      margin: "20px",
      padding: "7px",
      border: "1px solid #293294",
      borderRadius: "7px",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "17px",
      minWidth: "100px",
      minWidth: "70px",
      cursor: "pointer",
    };
    if (props.correctness === false) {
      if (props.check === data) {
        return { ...prevStyles, backgroundColor: "#293294", color: "#329d9c" };
      }
    } else {
      if (data === props.correctAnswer) {
        return {
          ...prevStyles,
          backgroundColor: "#25f761",
          color: "#293294",
          border: "none",
          color: "white",
        };
      } else if (props.check === data && data !== props.correctAnswer) {
        return {
          ...prevStyles,
          backgroundColor: "#ed0909",
          color: "#293294",
          border: "none",
          color: "white",
        };
      } else {
        return prevStyles;
      }
    }

    return prevStyles;
  }
  const choices = finalArr.map((data) => {
    return (
      <label style={classes(data)}>
        {data}
        <input
          type="radio"
          className="hideBox"
          name={props.questionNumber}
          value={data}
          onChange={props.handleChange}
          checked={props.check === data}
        />
      </label>
    );
  });
  return (
    <div>
      <h3>{props.quest}</h3>
      <div className="flex-choice">{choices}</div>
    </div>
  );
}
