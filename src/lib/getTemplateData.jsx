

import template1 from './template1';

export default function getTemplateData(data) {
  switch (data.selectedTemplate) {
    case 1:
      return {
        texDoc: template1(data),
        opts: {
          cmd: 'pdflatex'
        }
      };

    default:
      return {
        texDoc: template1(data),
        opts: {
          cmd: 'pdflatex'
        }
      };
  }
}