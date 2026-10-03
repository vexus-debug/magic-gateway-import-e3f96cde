import { jsPDF } from "jspdf";

export interface ConsentPdfInput {
  clinic: { name: string; address?: string | null; phone?: string | null; email?: string | null; logoDataUrl?: string | null };
  title: string;
  content: string;
  patientName: string;
  signerName: string;
  signatureDataUrl: string;
  date: string;
}

/** Builds a signed consent PDF with clinic letterhead and the patient's signature. */
export function buildConsentPdf(d: ConsentPdfInput): Blob {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 48;
  let y = M;

  if (d.clinic.logoDataUrl) {
    try { doc.addImage(d.clinic.logoDataUrl, M, y, 48, 48); } catch { /* ignore bad logo */ }
  }
  const tx = d.clinic.logoDataUrl ? M + 60 : M;
  doc.setFont("helvetica", "bold").setFontSize(16).text(d.clinic.name, tx, y + 16);
  doc.setFont("helvetica", "normal").setFontSize(9).setTextColor(90);
  const contact = [d.clinic.address, d.clinic.phone, d.clinic.email].filter(Boolean).join("  ·  ");
  if (contact) doc.text(doc.splitTextToSize(contact, W - tx - M), tx, y + 32);
  y += 62;
  doc.setDrawColor(200).line(M, y, W - M, y);
  y += 28;

  doc.setTextColor(17).setFont("helvetica", "bold").setFontSize(14).text(d.title, M, y);
  y += 18;
  doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(70);
  doc.text(`Patient: ${d.patientName}     Date: ${d.date}`, M, y);
  y += 22;

  doc.setTextColor(17).setFontSize(10.5);
  const lines = doc.splitTextToSize(d.content || "", W - M * 2);
  for (const line of lines) {
    if (y > H - 170) { doc.addPage(); y = M; }
    doc.text(line, M, y);
    y += 14;
  }

  if (y > H - 170) { doc.addPage(); y = M; }
  y += 24;
  doc.addImage(d.signatureDataUrl, "PNG", M, y, 180, 60);
  y += 66;
  doc.setDrawColor(60).line(M, y, M + 220, y);
  doc.setFontSize(10).text(`Signed by: ${d.signerName}`, M, y + 14);
  doc.text(`Date: ${d.date}`, M, y + 28);

  return doc.output("blob");
}

export async function urlToDataUrl(url?: string | null): Promise<string | null> {
  if (!url) return null;
  try {
    const blob = await (await fetch(url)).blob();
    return await new Promise((res) => {
      const r = new FileReader();
      r.onload = () => res(String(r.result));
      r.onerror = () => res(null);
      r.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}
