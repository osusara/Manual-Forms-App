import React from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Image, Button } from "react-bootstrap";

import "./landing.css";
import logo from "../../../assets/images/allset.png";
import bdot from "../../../assets/images/dot.png";
import img1 from "../../../assets/images/landing_image1.svg";
import img2 from "../../../assets/images/landing_image2.svg";
import img3 from "../../../assets/images/landing_image3.svg";
import img4 from "../../../assets/images/landing_image4.svg";
import img5 from "../../../assets/images/landing_image5.svg";
import p1 from "../../../assets/images/PP1.png";
import p2 from "../../../assets/images/PP2.png";
import p3 from "../../../assets/images/PP3.png";
import p4 from "../../../assets/images/PP4.png";

const landing = ({ user: { isAuthenticated, loading } }) => {
  if (isAuthenticated)
    return <Redirect to="/documents" />;

  return loading ? ("") : (
    <Container fluid={true}>
      <div className="screen1">
        <div className="landingLogo">
          <Image src={logo} alt="logo" width="211.8px" height="54px" />
        </div>

        <div className="dots">
          <Image
            className="dot1"
            src={bdot}
            alt="dot"
            width="80px"
            height="80px"
          />
          <Image
            className="dot2"
            src={bdot}
            alt="dot"
            width="80px"
            height="80px"
          />
          <Image
            className="dot3"
            src={bdot}
            alt="dot"
            width="80px"
            height="80px"
          />
        </div>

        <div className="topics">
          <h1>Form Customization </h1>
          <h1>Form Scanning </h1>
          <h1>Statistic Generation </h1>
        </div>

        <Link to="/login">
          <Button className="signInbtn">SIGN IN</Button>
        </Link>
        <Link to="/register">
          <Button className="signUpbtn">SIGN UP</Button>
        </Link>

        <div>
          <Image
            className="image1"
            src={img1}
            alt="image1"
            width="600px"
            height="400px"
          />
        </div>
        <div className="pp1">
          <Image src={p1} alt="pp1" width="300px" height="350px" />
        </div>
      </div>
      <div className="screen2">
        <div className="topic1">
          <span className="t1">Manual Form </span>
          <span className="t1a" style={{ color: " #00b0ff" }}>
            Application
          </span>
        </div>
        <div>
          <Image
            className="image2"
            src={img2}
            alt="iamge2"
            width="480px"
            height="320px"
          />
        </div>
        <div className="para2">
          <p className="p2">
            Manual form application is a web-based system, devised to provide
            statistical feedback on manually filled forms. this is an
            unconventional project that fuses a wide range of components to
            bring form creation, scanning and statistical analysis into one
            application.{" "}
          </p>
        </div>
        <div className="pp2">
          <Image src={p2} alt="pp2" width="350px" height="400px" />
        </div>
        <div>
          <p className="ew1">
            {" "}
            Let's see <br /> how it is done{" "}
          </p>
        </div>
      </div>
      <div className="screen3">
        <div className="topic2">
          <span className="t2">Form </span>
          <span className="t2a" style={{ color: " #00b0ff" }}>
            Customization{" "}
          </span>
        </div>
        <div>
          <Image
            className="image3"
            src={img3}
            alt="iamge3"
            width="600px"
            height="400px"
          />
        </div>
        <div className="para3">
          <p className="p3">
            Design the form that you wish. Customize it get the fullest use of
            the survey you want to conduct.
          </p>
        </div>
        <div className="pp3">
          <Image src={p3} alt="pp3" width="400px" height="450px" />
        </div>
      </div>
      <div className="screen4">
        <div className="topic3">
          <span className="t3">Form </span>
          <span className="t3a" style={{ color: " #00b0ff" }}>
            Scanning{" "}
          </span>
        </div>
        <div>
          <Image
            className="image4"
            src={img4}
            alt="iamge4"
            width="600px"
            height="400px"
          />
        </div>
        <div className="para4">
          <p className="p4">Want to analyse the results?</p>
          <p className="p4">
            Scan and feed the completed results to the system with in a few
            seconds.{" "}
          </p>
        </div>
        <div className="pp5">
          <Image src={p1} alt="pp5" width="300px" height="350px" />
        </div>
      </div>
      <div className="screen5">
        <div className="topic4">
          <span className="t4">Statistics </span>
          <span className="t4a" style={{ color: " #00b0ff" }}>
            Generation{" "}
          </span>
        </div>
        <div>
          <Image
            className="image5"
            src={img5}
            alt="iamge5"
            width="600px"
            height="400px"
          />
        </div>
        <div className="para5">
          <p className="p5">Tired of analysing 1000 of results ?</p>
          <p className="p5" style={{ color: " #00b0ff" }}>
            <b>HERE IS THE CHANCE.</b>
          </p>
          <p className="p5">
            With just one click of a Button now you can get fully analysed
            results for all your survey data.
          </p>
        </div>
        <div className="pp4">
          <Image src={p4} alt="pp4" width="300px" height="350px" />
        </div>
      </div>
    </Container>
  );
};

landing.propTypes = {
  user: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, {})(landing);
