import React, { useEffect, useState } from "react";
import "./Feedback.css";
import axios from "axios";
export const Feedback = () => {
  const [feedBack, setFeedBack] = useState(false);
  const feedArray = [
    "Very Disatisfied",
    "Disatisfied",
    "Neither agree nor disagree",
    "Satisfied",
    "Very Satisfied",
  ];
  useEffect(() => {
    if (localStorage.getItem("feedBack") === null) {
      setFeedBack(false);
    } else {
      setFeedBack(true);
    }
  }, []);
  const handleFeedback = async (item, index) => {
    console.log(item, index);
    const res = await axios.post(
      "https://backendonspot.herokuapp.com/api/addfeedback",
      {
        comment: item,
        number: index,
      }
    );
    console.log(res);
    localStorage.setItem("feedBack", item);
    alert("Your feedback has been submitted successfully!");
    window.location.reload();
  };
  return (
    <React.Fragment>
      {feedBack ? null : (
        <div className="main-feedback">
          <div className="inner-feedback">
            <h2 className="heading">Feedback</h2>
            <h6 style={{ textAlign: "center" }}>
              How would rate your experience with our website?
            </h6>
            {feedArray.map((item, index) => (
              <div
                className="options"
                onClick={() => handleFeedback(item, index)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
