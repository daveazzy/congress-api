import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { getAccreditedParticipants } from './get';

export async function exportParticipantsToPDF() {
  const participants = await getAccreditedParticipants();

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  let page = pdfDoc.addPage([600, 750]); 
  page.setFont(font);
  page.setFontSize(12);

  page.drawText('Aptos ao certificado', { x: 50, y: 700, size: 18, color: rgb(0, 0, 0.8) });
  
  let yPosition = 670;

  participants.forEach((participant, index) => {
    const participantInfo = `${index + 1}. ${participant.name}; ${participant.cpf}`;
    
    if (yPosition < 50) {
      page = pdfDoc.addPage([600, 750]); 
      page.setFont(font);
      page.setFontSize(12);
      yPosition = 700; 
    }

    page.drawText(participantInfo, { x: 50, y: yPosition });
    yPosition -= 20; 
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}