import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Card } from "react-bootstrap";

import "./style.css";
import { getForms } from "../../../actions/form";
import { getFilesByUser } from "../../../actions/file";
import Spinner from "../../layout/Spinner";
import FormBuilder from "./createForm/FormBuilder";
import FormsViewer from "./viewForm/FormsViewer";
import FormUploader from "./uploadForm/FormUploader";
import FormStatistics from "./statistics/FormStatistics";

const DocHome = ({ form, file, getForms, getFilesByUser, isAuthenticated }) => {
  useEffect(() => {
    getForms();
    getFilesByUser();
  }, [getForms, getFilesByUser]);

  if (!isAuthenticated)
    return <Redirect to="/login" />;

  return (
    <Container fluid={true}>
      <Card className="bg-secondary">
        <Card.Body>
          {form.loading || file.loading ? (
            <Spinner />
          ) : (
            <>
              <Route exact path="/documents">
                <FormsViewer forms={form.list} files={file.list} />
              </Route>
              <Route exact path="/documents/create" component={FormBuilder} />
              <Route exact path="/documents/upload">
                <FormUploader list={form.list} />
              </Route>
              <Route exact path="/documents/stats">
                <FormStatistics list={form.list} />
              </Route>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

DocHome.propTypes = {
  isAuthenticated: PropTypes.bool,
  getForms: PropTypes.func.isRequired,
  getFilesByUser: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  file: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  form: state.form,
  file: state.file,
});

export default connect(mapStateToProps, { getForms, getFilesByUser })(DocHome);
