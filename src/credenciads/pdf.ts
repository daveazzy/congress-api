import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { getAccreditedParticipants } from './get';

export async function exportParticipantsToPDF() {
  const participants = await getAccreditedParticipants(); // Busca os participantes credenciados

  // Cria o documento PDF
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  let page = pdfDoc.addPage([600, 750]); // Adiciona a primeira página
  page.setFont(font);
  page.setFontSize(12);

  // Configura o título na primeira página
  page.drawText('Lista de Participantes Credenciados', { x: 50, y: 700, size: 18, color: rgb(0, 0, 0.8) });
  
  let yPosition = 670;

  // Itera sobre os participantes e os adiciona ao PDF
  participants.forEach((participant, index) => {
    const participantInfo = `${index + 1}. Nome: ${participant.name}, Email: ${participant.email}`;
    
    // Se a posição Y estiver abaixo do limite, cria uma nova página e reinicia a posição
    if (yPosition < 50) {
      page = pdfDoc.addPage([600, 750]); // Cria uma nova página
      page.setFont(font);
      page.setFontSize(12);
      yPosition = 700; // Reinicia a posição para o topo da nova página
    }

    // Adiciona o texto do participante na posição atual
    page.drawText(participantInfo, { x: 50, y: yPosition });
    yPosition -= 20; // Ajusta a posição Y para o próximo participante
  });

  // Salva o PDF e retorna o conteúdo em bytes
  const pdfBytes = await pdfDoc.save();
  return pdfBytes; // Retorna o buffer para download
}
