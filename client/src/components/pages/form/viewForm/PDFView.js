import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { pdfjs, Document, Page } from "react-pdf";
import { deleteFile } from "../../../../actions/file";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFView = ({ file, show, setShow, deleteFile }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [removeConfirm, setRemoveConfirm] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const deleteFileHandler = () => {
    deleteFile(file._id);
    setRemoveConfirm(false);
    setShow(false);
  };

  const filePath = `https://forms-bucket.s3-ap-southeast-1.amazonaws.com/${file._id}.pdf`;

  return (
    <Modal size="lg" show={show} onHide={() => setShow(false)}>
      {removeConfirm ? (
        <RemoveConfirm
          removeConfirm={removeConfirm}
          setRemoveConfirm={setRemoveConfirm}
          deleteFormHandler={deleteFileHandler}
        />
      ) : (
        ""
      )}
      <Document
        className="mx-auto"
        file={filePath}
        onLoadSuccess={onDocumentLoadSuccess}
        options={{ workerSrc: "pdf.worker.js" }}
      >
        <Page pageNumber={pageNumber} />
        <div className="mx-auto text-center mb-3">
          <Button
            type="button"
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}
            className="btn-light btn-sm"
          >
            <i className="fas fa-arrow-left"></i>
          </Button>
          <span className="mx-2">
            Page {pageNumber} of {numPages}
          </span>
          <Button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(pageNumber + 1)}
            className="btn-light btn-sm"
          >
            <i className="fas fa-arrow-right"></i>
          </Button>
        </div>
      </Document>
      <Modal.Footer>
        <Button
          className="btn-danger ml-auto text-right px-4 py-3"
          onClick={() => setRemoveConfirm(!removeConfirm)}
        >
          <h5 className="my-auto">Remove File</h5>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const RemoveConfirm = ({
  removeConfirm,
  setRemoveConfirm,
  deleteFormHandler,
}) => (
  <Modal
    show={removeConfirm}
    onHide={() => setRemoveConfirm(false)}
    style={{ border: "none" }}
  >
    <Modal.Body>
      <h4 className="text-primary mt-2 text-center">
        Are you sure to delete this form?
      </h4>
      <div className="mb-3 text-center mx-auto">
        <Button
          className="btn btn-secondary shadow-sm px-3 mr-2 py-2"
          onClick={() => setRemoveConfirm(false)}
        >
          Cancel
        </Button>
        <Button
          className="btn btn-primary shadow-sm px-3 py-2"
          onClick={() => deleteFormHandler()}
        >
          Delete
        </Button>
      </div>
    </Modal.Body>
  </Modal>
);

PDFView.protoType = {
  deleteFile: PropTypes.func.isRequired,
};

export default connect(null, { deleteFile })(PDFView);
