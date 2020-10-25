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

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const deleteFileHandler = () => {
    deleteFile(file._id);
    setShow(false);
  };

  const filePath = `${process.env.PUBLIC_URL}/uploads/${file._id}.pdf`;

  return (
    <Modal size="lg" show={show} onHide={() => setShow(false)}>
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
          onClick={() => deleteFileHandler()}
        >
          <h5 className="my-auto">Remove File</h5>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

PDFView.protoType = {
  deleteFile: PropTypes.func.isRequired,
};

export default connect(null, { deleteFile })(PDFView);
