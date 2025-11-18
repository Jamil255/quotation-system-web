import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle,
} from "docx";

import { saveAs } from "file-saver";

export async function generateInvoiceDOCX(invoiceData) {
  const {
    customer,
    products,
    issueDate,
    dueDate,
    terms,
    subtotal,
    discountTotal,
    taxTotal,
    grandTotal,
  } = invoiceData;

  // ------------------ Helper Cell -------------------
  const cell = (text, bold = false) =>
    new TableCell({
      width: { size: 1500, type: WidthType.DXA },
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: text?.toString() || "",
              bold,
              size: 22,
            }),
          ],
        }),
      ],
    });

  // ------------------ Header Row -------------------
  const headerRow = new TableRow({
    children: [
      cell("S.No", true),
      cell("Product Name", true),
      cell("Qty", true),
      cell("Unit Price", true),
      cell("Discount %", true),
      cell("Tax %", true),
    ],
    tableHeader: true,
  });

  // ------------------ Product Rows -------------------
  const productRows = products.map((p, index) =>
    new TableRow({
      children: [
        cell(index + 1),
        cell(p.productName || "â€”"),
        cell(p.quantity || 0),
        cell(`$${p.unitPrice || 0}`),
        cell(`${p.discount || 0}%`),
        cell(`${p.taxRate || 0}%`),
      ],
    })
  );

  // ------------------ Full Table -------------------
  const productTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...productRows],
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1 },
      bottom: { style: BorderStyle.SINGLE, size: 1 },
      left: { style: BorderStyle.SINGLE, size: 1 },
      right: { style: BorderStyle.SINGLE, size: 1 },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
      insideVertical: { style: BorderStyle.SINGLE, size: 1 },
    },
  });

  // ------------------ Document Body -------------------
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "QUOTATION",
                bold: true,
                size: 40,
              }),
            ],
            alignment: "center",
            spacing: { after: 300 },
          }),

          new Paragraph(`Invoice To: ${customer.customerName}`),
          new Paragraph(`Address: ${customer.deliveryAddress}`),
          new Paragraph(""),

          new Paragraph(`Order Date: ${issueDate || "Not Provided"}`),
          new Paragraph(`Due Date: ${dueDate || "Not Provided"}`),
          new Paragraph(""),

          productTable,

          new Paragraph(""),

          new Paragraph({
            children: [
              new TextRun({
                text: `Subtotal: $${subtotal || 0}`,
                bold: true,
              }),
            ],
          }),
          new Paragraph(`Discount Applied: $${discountTotal || 0}`),
          new Paragraph(`Tax Applied: $${taxTotal || 0}`),
          new Paragraph({
            children: [
              new TextRun({
                text: `Grand Total: $${grandTotal || 0}`,
                bold: true,
              }),
            ],
          }),

          new Paragraph(" "),
          new Paragraph("Terms & Conditions"),
          new Paragraph(terms || "No terms added."),

          new Paragraph(" "),
          new Paragraph(
            "_______________________      _______________________"
          ),
          new Paragraph("Signature                        Date"),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "Invoice.docx");
}