import { PDFDocument, StandardFonts, rgb, PDFPage } from 'pdf-lib';
import { getAccreditedParticipants } from './get'; 

export async function exportParticipantsToPDF() {
  const participants = await getAccreditedParticipants(); 

  participants.sort((a, b) => a.name.localeCompare(b.name));

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  let page = pdfDoc.addPage([600, 750]); 
  page.setFont(font);
  page.setFontSize(12);

  const headers = ['#', 'Nome', 'CPF', 'Institution', 'Email'];
  let yPosition = 670;

  page.drawText('Particioantes aptos ao certificado', { x: 50, y: 700, size: 18, color: rgb(0, 0, 0.8) });

  drawTableRow(page, headers, yPosition);
  yPosition -= 20;

  participants.forEach((participant, index) => {
    const { name, cpf, institution, email } = participant;

    const participantInfo = [
      index + 1, 
      name ?? 'Não informado', 
      cpf ?? 'Não informado',
      institution ?? 'Não informado',
      email ?? 'Não informado'
    ];

    if (yPosition < 50) {
      page = pdfDoc.addPage([600, 750]); 
      page.setFont(font);
      page.setFontSize(12);
      yPosition = 700; 
      drawTableRow(page, headers, yPosition); 
      yPosition -= 20;
    }

    drawTableRow(page, participantInfo, yPosition);
    yPosition -= 20; 
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

function drawTableRow(page: PDFPage, rowData: (string | number)[], yPosition: number): void {
  const headerWidth = 100;
  const columnSpacing = 10;

  rowData.forEach((data, index) => {
    page.drawText(String(data), { x: 50 + index * (headerWidth + columnSpacing), y: yPosition, size: 12, color: rgb(0, 0, 0) });
  });

  page.drawRectangle({
    x: 50,
    y: yPosition - 15,
    width: headerWidth * rowData.length + columnSpacing * (rowData.length - 1),
    height: 20,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1,
  });
}
