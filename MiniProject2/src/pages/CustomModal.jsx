import React, { useEffect } from 'react';

const modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    minWidth: '300px',
    maxWidth: '90%',
    maxHeight: '80%',
    overflowY: 'auto',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  },
};

function CustomModal({ data, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    //cleanup
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const isPDF = data?.fileName?.endsWith(".pdf");   // using optional chaining
  const isImage = data?.fileName?.match(/\.(jpg|jpeg|png)$/i);

  return (
    <div style={modalStyle.overlay}>
      <div style={modalStyle.modal}>
        <h2>Form Data Preview</h2>

        <div style={{ lineHeight: '1.8' }}>
          <p><strong>Full Name:</strong> {data.fullName}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Phone Number:</strong> {data.PhoneNumber}</p>
          <p><strong>Date of Birth:</strong> {data.Date}</p>
          <p><strong>Document Type:</strong> {data.documentType}</p>
          <p><strong>Uploaded File:</strong> {data.fileName}</p>
        </div>

        {data.fileData && (
          <>
            <h3>Uploaded File Preview:</h3>
            {isPDF ? (
              <iframe
                src={data.fileData}
                title="PDF Preview"
                width="100%"
                height="400px"
              ></iframe>
            ) : isImage ? (
              <img src={data.fileData} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '10px' }} />
            ) : (
              <p>Unsupported file format for preview.</p>
            )}
          </>
        )}

        <button style={{ marginTop: '20px' }} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default CustomModal;
