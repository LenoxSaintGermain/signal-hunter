import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface PropertyData {
  name: string;
  price: number;
  size: number;
  acres: number;
  distance: number;
  parkingSpaces: number;
  totalInvestment: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  year1Revenue: number;
  year1Expenses: number;
  year1NOI: number;
  annualDebtService: number;
  year1CashFlow: number;
  cashOnCashReturn: number;
  irr: number;
  exitValue: number;
  ozTaxSavings: number;
  fifaRevenue: number;
}

export interface PDFOptions {
  includeCharts?: boolean;
  includeMap?: boolean;
  includeRiskAnalysis?: boolean;
  userInputs?: Record<string, any>;
}

export class PropertyPDFGenerator {
  private doc: jsPDF;
  private currentY: number;
  private pageWidth: number;
  private pageHeight: number;
  private margin: number;

  constructor() {
    this.doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    this.currentY = 20;
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.margin = 20;
  }

  private checkPageBreak(height: number) {
    if (this.currentY + height > this.pageHeight - this.margin) {
      this.doc.addPage();
      this.currentY = this.margin;
    }
  }

  private addHeader(title: string) {
    this.doc.setFontSize(24);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(30, 58, 138); // Blue-900
    this.doc.text(title, this.margin, this.currentY);
    this.currentY += 12;

    // Add line
    this.doc.setDrawColor(59, 130, 246); // Blue-500
    this.doc.setLineWidth(0.5);
    this.doc.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);
    this.currentY += 8;
  }

  private addSection(title: string) {
    this.checkPageBreak(15);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(51, 65, 85); // Slate-700
    this.doc.text(title, this.margin, this.currentY);
    this.currentY += 8;
  }

  private addText(text: string, fontSize: number = 11, bold: boolean = false) {
    this.checkPageBreak(8);
    this.doc.setFontSize(fontSize);
    this.doc.setFont("helvetica", bold ? "bold" : "normal");
    this.doc.setTextColor(71, 85, 105); // Slate-600
    
    const lines = this.doc.splitTextToSize(text, this.pageWidth - 2 * this.margin);
    this.doc.text(lines, this.margin, this.currentY);
    this.currentY += lines.length * (fontSize * 0.4);
  }

  private addKeyValue(key: string, value: string, highlight: boolean = false) {
    this.checkPageBreak(8);
    this.doc.setFontSize(11);
    
    // Key
    this.doc.setFont("helvetica", "normal");
    this.doc.setTextColor(100, 116, 139); // Slate-500
    this.doc.text(key, this.margin, this.currentY);
    
    // Value
    this.doc.setFont("helvetica", "bold");
    if (highlight) {
      this.doc.setTextColor(59, 130, 246); // Blue-500
    } else {
      this.doc.setTextColor(30, 41, 59); // Slate-800
    }
    this.doc.text(value, this.pageWidth / 2, this.currentY);
    
    this.currentY += 6;
  }

  private addTable(headers: string[], rows: string[][]) {
    this.checkPageBreak(20);
    
    const colWidth = (this.pageWidth - 2 * this.margin) / headers.length;
    let tableY = this.currentY;

    // Header
    this.doc.setFillColor(59, 130, 246); // Blue-500
    this.doc.rect(this.margin, tableY, this.pageWidth - 2 * this.margin, 8, "F");
    
    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(255, 255, 255);
    
    headers.forEach((header, i) => {
      this.doc.text(header, this.margin + i * colWidth + 2, tableY + 5);
    });
    
    tableY += 8;

    // Rows
    this.doc.setFont("helvetica", "normal");
    this.doc.setTextColor(51, 65, 85);
    
    rows.forEach((row, rowIndex) => {
      if (rowIndex % 2 === 0) {
        this.doc.setFillColor(248, 250, 252); // Slate-50
        this.doc.rect(this.margin, tableY, this.pageWidth - 2 * this.margin, 7, "F");
      }
      
      row.forEach((cell, colIndex) => {
        this.doc.text(cell, this.margin + colIndex * colWidth + 2, tableY + 5);
      });
      
      tableY += 7;
    });

    this.currentY = tableY + 5;
  }

  async addChartImage(elementId: string) {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
      });
      
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = this.pageWidth - 2 * this.margin;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      this.checkPageBreak(imgHeight);
      this.doc.addImage(imgData, "PNG", this.margin, this.currentY, imgWidth, imgHeight);
      this.currentY += imgHeight + 5;
    } catch (error) {
      console.error("Error adding chart image:", error);
    }
  }

  generatePropertyReport(property: PropertyData, options: PDFOptions = {}) {
    // Cover Page
    this.addHeader(`Investment Analysis Report`);
    this.currentY += 10;
    
    this.doc.setFontSize(20);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(30, 58, 138);
    this.doc.text(property.name, this.margin, this.currentY);
    this.currentY += 15;

    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "normal");
    this.doc.setTextColor(100, 116, 139);
    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    this.doc.text(`Generated: ${date}`, this.margin, this.currentY);
    this.currentY += 30;

    // Executive Summary
    this.addSection("Executive Summary");
    this.addText(
      `This investment analysis provides a comprehensive evaluation of the ${property.name} opportunity, ` +
      `including financial projections, risk assessment, and strategic recommendations.`,
      11
    );
    this.currentY += 5;

    // Key Metrics
    this.addSection("Key Investment Metrics");
    this.addKeyValue("Purchase Price", `$${(property.price / 1000).toFixed(0)}K`);
    this.addKeyValue("Total Investment", `$${(property.totalInvestment / 1000000).toFixed(2)}M`);
    this.addKeyValue("Down Payment Required", `$${(property.downPayment / 1000).toFixed(0)}K`);
    this.addKeyValue("Loan Amount", `$${(property.loanAmount / 1000000).toFixed(2)}M`);
    this.addKeyValue("Interest Rate", `${property.interestRate}%`);
    this.currentY += 5;

    // Financial Performance
    this.addSection("Financial Performance");
    this.addKeyValue("Year 1 Revenue", `$${(property.year1Revenue / 1000).toFixed(0)}K`, true);
    this.addKeyValue("Year 1 Expenses", `$${(property.year1Expenses / 1000).toFixed(0)}K`);
    this.addKeyValue("Year 1 NOI", `$${(property.year1NOI / 1000).toFixed(0)}K`, true);
    this.addKeyValue("Annual Debt Service", `$${(property.annualDebtService / 1000).toFixed(0)}K`);
    this.addKeyValue("Year 1 Cash Flow", `$${(property.year1CashFlow / 1000).toFixed(0)}K`, true);
    this.currentY += 5;

    // Returns
    this.addSection("Investment Returns");
    this.addKeyValue("Cash-on-Cash Return", `${property.cashOnCashReturn.toFixed(1)}%`, true);
    this.addKeyValue("10-Year IRR", `${property.irr.toFixed(1)}%`, true);
    this.addKeyValue("Projected Exit Value", `$${(property.exitValue / 1000000).toFixed(2)}M`, true);
    this.currentY += 5;

    // Tax Benefits
    this.addSection("Opportunity Zone Tax Benefits");
    this.addText(
      `This property is located in a designated Opportunity Zone, providing significant tax advantages ` +
      `for long-term investors.`,
      11
    );
    this.currentY += 3;
    this.addKeyValue("Estimated OZ Tax Savings (10 years)", `$${(property.ozTaxSavings / 1000).toFixed(0)}K`, true);
    this.currentY += 5;

    // FIFA Revenue (if applicable)
    if (property.fifaRevenue > 0) {
      this.addSection("FIFA World Cup 2026 Revenue");
      this.addText(
        `The property is strategically positioned ${property.distance} mile(s) from Mercedes-Benz Stadium, ` +
        `providing exceptional revenue opportunities during the FIFA World Cup 2026.`,
        11
      );
      this.currentY += 3;
      this.addKeyValue("Estimated FIFA Revenue", `$${(property.fifaRevenue / 1000).toFixed(0)}K`, true);
      this.currentY += 5;
    }

    // Property Details
    this.addSection("Property Details");
    this.addKeyValue("Land Size", `${property.acres.toFixed(2)} acres (${property.size.toLocaleString()} sq ft)`);
    this.addKeyValue("Distance to Stadium", `${property.distance} mile(s)`);
    this.addKeyValue("Parking Capacity", `${property.parkingSpaces} spaces`);
    this.currentY += 5;

    // 10-Year Cash Flow Projection
    this.doc.addPage();
    this.currentY = this.margin;
    this.addSection("10-Year Cash Flow Projection");
    
    const cashFlowHeaders = ["Year", "Revenue", "Expenses", "NOI", "Debt Service", "Cash Flow"];
    const cashFlowRows: string[][] = [];
    
    for (let year = 1; year <= 10; year++) {
      const revenue = property.year1Revenue * Math.pow(1.03, year - 1);
      const expenses = property.year1Expenses * Math.pow(1.02, year - 1);
      const noi = revenue - expenses;
      const cashFlow = noi - property.annualDebtService;
      
      cashFlowRows.push([
        year.toString(),
        `$${(revenue / 1000).toFixed(0)}K`,
        `$${(expenses / 1000).toFixed(0)}K`,
        `$${(noi / 1000).toFixed(0)}K`,
        `$${(property.annualDebtService / 1000).toFixed(0)}K`,
        `$${(cashFlow / 1000).toFixed(0)}K`,
      ]);
    }
    
    this.addTable(cashFlowHeaders, cashFlowRows);
    this.currentY += 10;

    // Risk Analysis
    this.addSection("Risk Analysis");
    this.addText(
      "Every investment carries inherent risks. Below are the primary risk factors and mitigation strategies:",
      11
    );
    this.currentY += 3;

    const risks = [
      {
        risk: "Market Risk",
        mitigation: "Diversified revenue streams reduce dependence on single income source",
      },
      {
        risk: "Execution Risk",
        mitigation: "Experienced contractors and phased development approach",
      },
      {
        risk: "Financial Risk",
        mitigation: "Conservative underwriting with 3% revenue growth and 2% expense growth",
      },
      {
        risk: "Regulatory Risk",
        mitigation: "Pre-development zoning and permitting consultation",
      },
    ];

    risks.forEach((item) => {
      this.checkPageBreak(15);
      this.doc.setFontSize(11);
      this.doc.setFont("helvetica", "bold");
      this.doc.setTextColor(239, 68, 68); // Red-500
      this.doc.text(`• ${item.risk}`, this.margin + 5, this.currentY);
      this.currentY += 5;
      
      this.doc.setFont("helvetica", "normal");
      this.doc.setTextColor(71, 85, 105);
      const mitigationLines = this.doc.splitTextToSize(
        item.mitigation,
        this.pageWidth - 2 * this.margin - 10
      );
      this.doc.text(mitigationLines, this.margin + 10, this.currentY);
      this.currentY += mitigationLines.length * 4 + 3;
    });

    this.currentY += 10;

    // Disclaimer
    this.addSection("Disclaimer");
    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "normal");
    this.doc.setTextColor(100, 116, 139);
    const disclaimer = this.doc.splitTextToSize(
      "This investment analysis is provided for informational purposes only and does not constitute financial, " +
      "legal, or tax advice. All projections are estimates based on current market conditions and assumptions that " +
      "may change. Actual results may vary significantly. Investors should conduct their own due diligence and " +
      "consult with qualified professionals before making any investment decisions. Past performance does not " +
      "guarantee future results.",
      this.pageWidth - 2 * this.margin
    );
    this.doc.text(disclaimer, this.margin, this.currentY);

    return this.doc;
  }

  download(filename: string) {
    this.doc.save(filename);
  }

  getBlob(): Blob {
    return this.doc.output("blob");
  }

  getDataUri(): string {
    return this.doc.output("datauristring");
  }
}

// Helper function to generate PDF for a property
export async function generatePropertyPDF(
  property: PropertyData,
  options: PDFOptions = {}
): Promise<void> {
  const generator = new PropertyPDFGenerator();
  generator.generatePropertyReport(property, options);
  
  const filename = `${property.name.replace(/\s+/g, "_")}_Investment_Analysis_${
    new Date().toISOString().split("T")[0]
  }.pdf`;
  
  generator.download(filename);
}

// Helper function to generate comparison PDF
export async function generateComparisonPDF(
  property1: PropertyData,
  property2: PropertyData
): Promise<void> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  let currentY = 20;
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();

  // Title
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 58, 138);
  doc.text("Property Comparison Report", margin, currentY);
  currentY += 15;

  // Properties
  doc.setFontSize(14);
  doc.setTextColor(59, 130, 246);
  doc.text(`${property1.name} vs ${property2.name}`, margin, currentY);
  currentY += 10;

  // Date
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`Generated: ${date}`, margin, currentY);
  currentY += 20;

  // Comparison Table
  const headers = ["Metric", property1.name, property2.name];
  const rows = [
    ["Purchase Price", `$${(property1.price / 1000).toFixed(0)}K`, `$${(property2.price / 1000).toFixed(0)}K`],
    ["Total Investment", `$${(property1.totalInvestment / 1000000).toFixed(2)}M`, `$${(property2.totalInvestment / 1000000).toFixed(2)}M`],
    ["Down Payment", `$${(property1.downPayment / 1000).toFixed(0)}K`, `$${(property2.downPayment / 1000).toFixed(0)}K`],
    ["Year 1 Cash Flow", `$${(property1.year1CashFlow / 1000).toFixed(0)}K`, `$${(property2.year1CashFlow / 1000).toFixed(0)}K`],
    ["Cash-on-Cash %", `${property1.cashOnCashReturn.toFixed(1)}%`, `${property2.cashOnCashReturn.toFixed(1)}%`],
    ["10-Year IRR %", `${property1.irr.toFixed(1)}%`, `${property2.irr.toFixed(1)}%`],
    ["OZ Tax Savings", `$${(property1.ozTaxSavings / 1000).toFixed(0)}K`, `$${(property2.ozTaxSavings / 1000).toFixed(0)}K`],
    ["FIFA Revenue", `$${(property1.fifaRevenue / 1000).toFixed(0)}K`, `$${(property2.fifaRevenue / 1000).toFixed(0)}K`],
  ];

  const colWidth = (pageWidth - 2 * margin) / 3;

  // Header
  doc.setFillColor(59, 130, 246);
  doc.rect(margin, currentY, pageWidth - 2 * margin, 8, "F");
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  
  headers.forEach((header, i) => {
    doc.text(header, margin + i * colWidth + 2, currentY + 5);
  });
  
  currentY += 8;

  // Rows
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  
  rows.forEach((row, rowIndex) => {
    if (rowIndex % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, currentY, pageWidth - 2 * margin, 7, "F");
    }
    
    row.forEach((cell, colIndex) => {
      doc.text(cell, margin + colIndex * colWidth + 2, currentY + 5);
    });
    
    currentY += 7;
  });

  const filename = `Property_Comparison_${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(filename);
}
