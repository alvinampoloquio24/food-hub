import jsPDF from "jspdf";

async function generatePDF(recipe: any, title: string, imageUrl: string) {
  const doc = new jsPDF();
  let pageHeight = doc.internal.pageSize.height;
  let yOffset = 20;
  let pageNumber = 1;

  function addPageIfNeeded() {
    if (yOffset > pageHeight - 20) {
      doc.addPage();
      yOffset = 20;
      pageNumber++;
      doc.setFontSize(10);
      doc.text(`Page ${pageNumber}`, 190, 10, { align: "right" });
    }
  }

  // Add image
  if (imageUrl) {
    try {
      const img = await loadImage(imageUrl);
      const imgWidth = 100;
      const imgHeight = (img.height * imgWidth) / img.width;
      doc.addImage(img, "JPEG", 20, yOffset, imgWidth, imgHeight);
      yOffset += imgHeight + 10;
    } catch (error) {
      console.error("Error loading image:", error);
    }
  }

  // Title
  doc.setFontSize(18);
  doc.text(`Recipe (${title})`, 20, yOffset);
  yOffset += 15;

  // Ingredients
  addPageIfNeeded();
  doc.setFontSize(14);
  doc.text("Ingredients:", 20, yOffset);
  yOffset += 10;
  recipe.ingredients.forEach((ingredient: any) => {
    addPageIfNeeded();
    doc.setFontSize(12);
    const text = `${ingredient.name}: ${ingredient.quantity}`;
    const lines = doc.splitTextToSize(text, 170);
    doc.text(lines, 25, yOffset);
    yOffset += lines.length * 7;
  });

  // Directions
  yOffset += 10;
  addPageIfNeeded();
  doc.setFontSize(14);
  doc.text("Directions:", 20, yOffset);
  yOffset += 10;
  recipe.directions.forEach((direction: any, index: number) => {
    addPageIfNeeded();
    doc.setFontSize(12);
    doc.text(`${index + 1}. ${direction.title}`, 25, yOffset);
    yOffset += 7;
    const descriptionLines = doc.splitTextToSize(direction.description, 165);
    descriptionLines.forEach((line: string) => {
      addPageIfNeeded();
      doc.text(line, 30, yOffset);
      yOffset += 7;
    });
    yOffset += 5;
  });

  // Add page number to the first page
  doc.setPage(1);
  doc.setFontSize(10);
  doc.text(`Page 1`, 190, 10, { align: "right" });

  return doc;
}

// Helper function to load image
function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}
export default generatePDF;
