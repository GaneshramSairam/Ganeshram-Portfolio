import { jsPDF } from 'jspdf';

/**
 * Generates a professional resume PDF from portfolio data
 * @param {Object} data - The portfolio data object
 * @returns {jsPDF} - The generated PDF document
 */
export const generateResumePDF = (data) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    let yPos = 20;

    // Colors
    const primaryColor = [30, 58, 138]; // Navy Blue #1E3A8A
    const accentColor = [245, 158, 11]; // Gold #F59E0B
    const textColor = [55, 65, 81]; // Gray-700
    const lightGray = [156, 163, 175]; // Gray-400

    // Helper functions
    const addSectionHeader = (title) => {
        if (yPos > 260) {
            doc.addPage();
            yPos = 20;
        }
        doc.setFillColor(...accentColor);
        doc.rect(margin, yPos, contentWidth, 0.5, 'F');
        yPos += 6;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(...primaryColor);
        doc.text(title.toUpperCase(), margin, yPos);
        yPos += 8;
    };

    const addText = (text, options = {}) => {
        const { bold = false, size = 10, color = textColor, indent = 0 } = options;
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }
        doc.setFont('helvetica', bold ? 'bold' : 'normal');
        doc.setFontSize(size);
        doc.setTextColor(...color);
        const lines = doc.splitTextToSize(text, contentWidth - indent);
        doc.text(lines, margin + indent, yPos);
        yPos += lines.length * (size * 0.4) + 2;
    };

    const addBulletPoint = (text) => {
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(...textColor);
        doc.text('•', margin + 5, yPos);
        const lines = doc.splitTextToSize(text, contentWidth - 15);
        doc.text(lines, margin + 12, yPos);
        yPos += lines.length * 4 + 2;
    };

    // ===== HEADER =====
    // Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(...primaryColor);
    doc.text(data.profile.name, pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;

    // Title
    if (data.profile.title) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.setTextColor(...accentColor);
        doc.text(data.profile.title, pageWidth / 2, yPos, { align: 'center' });
        yPos += 7;
    }

    // Contact Info
    const contactInfo = [];
    if (data.socialLinks.email) contactInfo.push(data.socialLinks.email);
    if (data.socialLinks.linkedin) contactInfo.push(data.socialLinks.linkedin);
    if (data.socialLinks.github) contactInfo.push(data.socialLinks.github);

    if (contactInfo.length > 0) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...lightGray);
        doc.text(contactInfo.join(' | '), pageWidth / 2, yPos, { align: 'center' });
        yPos += 5;
    }

    // Divider
    doc.setFillColor(...primaryColor);
    doc.rect(margin, yPos, contentWidth, 1, 'F');
    yPos += 10;

    // ===== PROFESSIONAL SUMMARY =====
    if (data.profile.subtitle) {
        addSectionHeader('Professional Summary');
        addText(data.profile.subtitle);
        yPos += 5;
    }

    // ===== PROFESSIONAL EXPERIENCE =====
    if (data.projects && data.projects.length > 0) {
        addSectionHeader('Professional Experience');

        data.projects.forEach((project) => {
            addText(project.title, { bold: true, size: 11 });
            addText(`${project.industry} | ${project.solution}`, { size: 9, color: lightGray });
            yPos += 2;

            if (project.deliverables) {
                project.deliverables.forEach((del) => {
                    addBulletPoint(del);
                });
            }

            if (project.technicalScope) {
                addText(`Technical Scope: ${project.technicalScope}`, { size: 9, color: lightGray, indent: 5 });
            }
            yPos += 5;
        });
    }

    // ===== CERTIFICATIONS =====
    if (data.certifications && data.certifications.length > 0) {
        addSectionHeader('Certifications');
        data.certifications.forEach((cert) => {
            addBulletPoint(cert.name);
        });
        yPos += 5;
    }

    // ===== TECHNICAL SKILLS =====
    if ((data.sapProducts && data.sapProducts.length > 0) ||
        (data.technicalExpertise && data.technicalExpertise.length > 0)) {
        addSectionHeader('Technical Skills');

        if (data.sapProducts && data.sapProducts.length > 0) {
            addText('Products & Technologies:', { bold: true, size: 10 });
            addText(data.sapProducts.join(', '), { indent: 5 });
            yPos += 3;
        }

        if (data.technicalExpertise && data.technicalExpertise.length > 0) {
            addText('Core Competencies:', { bold: true, size: 10 });
            addText(data.technicalExpertise.join(', '), { indent: 5 });
        }
        yPos += 5;
    }

    // ===== AWARDS =====
    if (data.awards && data.awards.length > 0) {
        addSectionHeader('Awards & Recognition');
        data.awards.forEach((award) => {
            addText(award.title, { bold: true, size: 11 });
            if (award.date || award.issuedBy) {
                addText(`${award.date}${award.issuedBy ? ' | ' + award.issuedBy : ''}`, { size: 9, color: lightGray });
            }
            if (award.description) {
                addText(award.description, { indent: 5 });
            }
            yPos += 3;
        });
    }

    return doc;
};

/**
 * Downloads the resume PDF
 * @param {Object} data - The portfolio data object
 * @param {string} filename - The filename for the PDF
 */
export const downloadResumePDF = (data, filename = 'resume.pdf') => {
    const doc = generateResumePDF(data);

    // Ensure filename ends with .pdf
    const pdfFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;

    // Use jsPDF's native save method  
    doc.save(pdfFilename);
};
