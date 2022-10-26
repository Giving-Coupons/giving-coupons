// import React from 'react';
// import { jsPDF } from 'jspdf';
// import { toPng } from 'html-to-image';

// interface Props {
//   html?: React.MutableRefObject<HTMLDivElement>;
// }

// const GeneratePDF = ({ html }: Props) => {
//   const generateImage = async () => {
//     const image = await toPng(html.current, { quality: 0.95 });
//     const doc = new jsPDF();

//     doc.addImage(image, 'JPEG', 5, 22, 200, 160);
//     doc.save();
//   };

//   return (
//     <div className="button-container">
//       <button onClick={generateImage}>Get PDF</button>
//     </div>
//   );
// };

// export default GeneratePDF;

export {};
