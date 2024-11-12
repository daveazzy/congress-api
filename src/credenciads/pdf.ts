import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { getAccreditedParticipants } from './get';

export async function exportParticipantsToPDF() {
  const participants = await getAccreditedParticipants(); // Busca os participantes credenciados

  // Cria o documento PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 750]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Configurações iniciais de fonte e título
  page.setFont(font);
  page.setFontSize(12);
  page.drawText('Lista de Participantes Credenciados', { x: 50, y: 700, size: 18, color: rgb(0, 0, 0.8) });

  let yPosition = 670;

  // Adiciona cada participante ao PDF
  participants.forEach((participant, index) => {
    const participantInfo = `${index + 1}. Nome: ${participant.name}, Email: ${participant.email}`;
    page.drawText(participantInfo, { x: 50, y: yPosition });
    yPosition -= 20;

    // Se o espaço na página acabar, adiciona uma nova página
    if (yPosition < 50) {
      yPosition = 700;
      pdfDoc.addPage();
    }
  });

  // Salva o PDF e retorna o conteúdo em bytes
  const pdfBytes = await pdfDoc.save();
  return pdfBytes; // Retorna o buffer para download
}
