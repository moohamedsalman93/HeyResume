import React, { useState, useEffect } from 'react';

import getTemplateData from './getTemplateData';
import latex from './latext';

const LaTeXRenderer = ({ data }) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const generatePDF = async () => {
      const { texDoc, opts } = getTemplateData(data);
      const pdfUrl = await latex(texDoc, opts);
    
      setPdfUrl(pdfUrl);
      console.log(pdfUrl)
    };

    generatePDF();
  }, [data]);

  return (
    <div className="latex-renderer">
      {pdfUrl ? (
        <iframe src={pdfUrl} width="100%" height="600px" title="PDF Viewer" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LaTeXRenderer;