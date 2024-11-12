import { PDFDocument, StandardFonts, rgb, PDFPage } from 'pdf-lib';
import { getAccreditedParticipants } from './get'; 

export async function exportParticipantsToPDF() {
  const participants = await getAccreditedParticipants(); 

  // Ordena os participantes por nome
  participants.sort((a, b) => a.name.localeCompare(b.name));

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  let page = pdfDoc.addPage([600, 750]);
  page.setFont(font);
  page.setFontSize(12);

  const headers = ['#', 'Nome', 'CPF', 'Institution'];
  let yPosition = 670;

  // Título da página
  page.drawText('Participantes aptos ao certificado', { x: 50, y: 700, size: 18, color: rgb(0, 0, 0.8) });

  // Desenha os cabeçalhos
  drawTableRow(page, headers, yPosition);
  yPosition -= 20;

  let globalIndex = 1; // Variável para controlar a numeração global

  // Itera sobre os participantes
  participants.forEach((participant) => {
    const { name, cpf, institution } = participant;

    const participantInfo = [
      globalIndex++, // Utiliza globalIndex para a numeração global
      name ?? 'Não informado',
      cpf ?? 'Não informado',
      institution ?? 'Não informado',
    ];

    // Se a posição Y estiver muito baixa, cria uma nova página
    if (yPosition < 50) {
      page = pdfDoc.addPage([600, 750]);
      page.setFont(font);
      page.setFontSize(12);
      yPosition = 700;
      drawTableRow(page, headers, yPosition); // Redesenha os cabeçalhos
      yPosition -= 20;
    }

    // Desenha a linha com os dados do participante
    drawTableRow(page, participantInfo, yPosition);
    yPosition -= 20; // Ajusta a posição para a próxima linha
  });

  // Salva o PDF e retorna o conteúdo em bytes
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

// Função para desenhar uma linha da tabela
function drawTableRow(page: PDFPage, rowData: (string | number)[], yPosition: number): void {
  const headerWidth = 100;
  const columnSpacing = 10;

  // Desenha os dados na linha
  rowData.forEach((data, index) => {
    page.drawText(String(data), { x: 50 + index * (headerWidth + columnSpacing), y: yPosition, size: 12, color: rgb(0, 0, 0) });
  });

  // Desenha a borda ao redor da linha
  page.drawRectangle({
    x: 50,
    y: yPosition - 15,
    width: headerWidth * rowData.length + columnSpacing * (rowData.length - 1),
    height: 20,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1,
  });
}
