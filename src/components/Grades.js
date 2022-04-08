import React, { Component } from "react";
import { getGrades, isAuthenticated } from "./Repository";
import { Navigate } from "react-router-dom";

export default class Grades extends Component {
  constructor() {
    super();
    this.state = { grades: [], auth: true };
  }

  componentDidMount() {
    if (isAuthenticated())
      getGrades()
        .then((grades) => {
          this.setState({ grades });
        })
        .catch((err) => {
          alert("User Not Authenticated");
          this.setState({ auth: false });
        });
    else {
      alert("User Not Authenticated");
      this.setState({ auth: false });
    }
  }

  render() {
    const data = this.state.grades[0];

    let allData = [];
    let sum = 0;

    //getting the data in an array
    for (let key in data) {
      allData.push(data[key]);
    }

    //console.log(allData);

    const totalCredit = allData.map((value) => value.credits);

    //Calculating Sum of Credits
    for (let i in totalCredit) {
      sum = +sum + +totalCredit[i];
    }

    //console.log(sum);

    //get all the grades
    let totalGrades = 0;
    let numberofCourse = 0;

    const grades = allData.map((value) => value.grade);

    for (let i in grades) {
      totalGrades = +totalGrades + +grades[i];
      numberofCourse++;
    }

    const averageGrade = totalGrades / numberofCourse;
    const rounded = Math.round(averageGrade * 10) / 10;

    return (
      <div>
        {this.state.auth ? "" : <Navigate to="/" />}
        <h3 className="text-center" style={{ color: "red" }}>
          Course Information
        </h3>
        <hr />

        {allData.map((grade) => (
          <div key={grade.id}>
            <div
              className="accordion accordion-flush"
              key={grade.id}
              id="accordionFlushExample"
            >
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                  <button
                    id="{grade.id}"
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                    style={{ fontSize: "1.1rem", color: "#800000" }}
                  >
                    {grade.name}
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body" style={{ color: "#000080" }}>
                    <li>Grade: {grade.grade}</li>
                    <li>Semester: {grade.semester}</li>
                    <li>Credits: {grade.credits}</li>
                    <li>Date: {grade.date}</li>
                    <li>Status: {grade.status}</li>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <br></br>

        <h5 className="p-3 mb-2 bg-info text-white">Total Credits: {sum}</h5>
        <h5 className="p-3 mb-2 bg-success text-white">
          Average Grade: {rounded}
        </h5>
      </div>
    );
  }
}
