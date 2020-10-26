import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import FormEditor from "../editForm/FormEditor";
import PDFView from "./PDFView";

const FormsViewer = ({ forms, files }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});

  const [pdfShow, setPdfShow] = useState(false);
  const [file, setFile] = useState(false);

  const editHandler = (item) => {
    setFormData(item);
    setShow(!show);
  };

  const pdfViewHandler = (item) => {
    setFile(item);
    setPdfShow(!show);
  };

  return (
    <Container fluid={true}>
      {show ? <FormEditor show={show} setShow={setShow} form={formData} /> : ""}
      {pdfShow ? <PDFView show={pdfShow} setShow={setPdfShow} file={file} /> : ""}
      <h2 className="text-dark">
        My <b>Documents</b>
      </h2>
      <Row>
        <Col sm={6}>
          <Card className="my-3 shadow-sm">
            <Card.Body>
              <Card.Title className="text-center">
                Customized <b>Forms</b>
              </Card.Title>
              <Row>
                {forms.map((item) => (
                  <Col key={item._id} md={4} className="text-center my-3">
                    <div
                      className="m-auto py-3 document-icon-div"
                      onClick={() => editHandler(item)}
                    >
                      <h1>
                        <i className="fas fa-file-pdf"></i>
                      </h1>
                      <span>{item.title}</span>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6}>
          <Card className="my-3 shadow-sm">
            <Card.Body>
              <Card.Title className="text-center">
                Completed <b>Forms</b>
              </Card.Title>
              <Row>
                {files.map((item) => (
                  <Col key={item._id} md={4} className="text-center my-3">
                    <div
                      className="m-auto py-3 document-icon-div"
                      onClick={() => pdfViewHandler(item)}
                    >
                      <h1>
                        <i className="fas fa-file-pdf"></i>
                      </h1>
                      <span>{item.name}</span>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormsViewer;
