import { useEffect, useState } from "react";
import appOwner from "./App-Owner.jpg";

const About = (props) => {
  const [mainTitle] = useState("ABOUT - TooFan");
  const technologies = [
    "JsonplaceHolder Api",
    "Unsplash Api",
    "React App",
    "Router",
    "Loading",
    "Progress",
    "Infinite Scroll",
    "Single Page",
    "React Hooks",
    "React Icons",
  ];
  props.setProgress(100);
  useEffect(() => {
    document.title = mainTitle;
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="fw-bold text-center" style={{ margin: "90px 0px 30px" }}>
          TOOFAN APP PROJECT
        </h1>
        <div className="d-flex justify-content-center">
          <div className="card col-lg-5">
            <img
              src={appOwner}
              className="card-img-top"
              alt="Shihabun Mobin Jisan"
            />
            <div className="card-body">
              <h5 className="card-title">Copyright:</h5>
              <p className="card-text">Shihabun Mobin Jisan</p>
              <h5 className="card-title">Technologies:</h5>

              {technologies.map((tech) => {
                return (
                  <span
                    className="badge bg-success mx-1 my-1 text-center"
                    style={{ height: "25px" }}
                    key={Math.random()}
                  >
                    {tech}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
