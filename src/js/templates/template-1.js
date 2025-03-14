/**
 * Modern CV Şablonu (Template 1)
 * 
 * Bu şablon, temiz ve profesyonel bir CV tasarımı için
 * HTML içeriği oluşturur.
 */

import { formatDate, formatDateRange } from '../utils/date-formatter.js';

export class Template1 {
  constructor() {
    // Şablon ayarları
    this.templateName = 'Modern Şablon';
  }
  
  /**
   * CV verilerini kullanarak HTML içeriği oluşturur
   * @param {Object} data - CV verileri
   * @returns {string} - HTML içeriği
   */
  generate(data) {
    const { personalInfo = {}, experiences = [], education = [], skills = { technical: [], soft: [], languages: [] }, certificates = [], projects = [], design = {} } = data;
    
    // Varsayılan değerler
    const defaultDesign = {
      primaryColor: '#3498db',
      secondaryColor: '#2c3e50',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px'
    };
    
    // Design değerlerini birleştir
    const finalDesign = { ...defaultDesign, ...design };
    
    return `
      <div class="cv-template-1" style="font-family: ${finalDesign.fontFamily}; font-size: ${finalDesign.fontSize}; color: ${finalDesign.secondaryColor}; max-width: 800px; margin: 0 auto; padding: 20px;">
        <div class="cv-header" style="text-align: center; margin-bottom: 15px;">
          <h1 style="color: ${finalDesign.primaryColor}; font-size: 26px; margin-bottom: 5px;">${personalInfo.fullName || 'Ad Soyad'}</h1>
          <p style="font-size: 16px; margin-top: 0;">${personalInfo.title || 'Pozisyon'}</p>
        </div>
        
        <div class="cv-contact" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; margin-bottom: 15px; font-size: 13px;">
          ${personalInfo.email ? `<div style="display: flex; align-items: center;"><i class="fas fa-envelope" style="color: ${finalDesign.primaryColor}; margin-right: 5px;"></i>${personalInfo.email}</div>` : '<div style="display: flex; align-items: center;"><i class="fas fa-envelope" style="color: ${finalDesign.primaryColor}; margin-right: 5px;"></i>E-posta ekleyin</div>'}
          ${personalInfo.phone ? `<div style="display: flex; align-items: center;"><i class="fas fa-phone" style="color: ${finalDesign.primaryColor}; margin-right: 5px;"></i>${personalInfo.phone}</div>` : '<div style="display: flex; align-items: center;"><i class="fas fa-phone" style="color: ${finalDesign.primaryColor}; margin-right: 5px;"></i>Telefon ekleyin</div>'}
          ${personalInfo.address ? `<div style="display: flex; align-items: center;"><i class="fas fa-map-marker-alt" style="color: ${finalDesign.primaryColor}; margin-right: 5px;"></i>${personalInfo.address}</div>` : ''}
          ${personalInfo.linkedin ? `<div style="display: flex; align-items: center;"><i class="fab fa-linkedin" style="color: ${finalDesign.primaryColor}; margin-right: 5px;"></i>${personalInfo.linkedin}</div>` : ''}
          ${personalInfo.website ? `<div style="display: flex; align-items: center;"><i class="fas fa-globe" style="color: ${finalDesign.primaryColor}; margin-right: 5px;"></i>${personalInfo.website}</div>` : ''}
        </div>
        
        <div class="cv-section" style="margin-bottom: 15px;">
          <h2 class="cv-section-title" style="font-size: 17px; color: ${finalDesign.primaryColor}; border-bottom: 1px solid ${finalDesign.primaryColor}; padding-bottom: 3px; margin-top: 0; margin-bottom: 8px;">Özet</h2>
          <p style="margin-top: 5px; font-size: 13px;">${personalInfo.summary || 'Özet bilgisi ekleyin. Kariyer hedeflerinizi, deneyimlerinizi ve becerilerinizi kısaca anlatın.'}</p>
        </div>
        
        <div class="cv-section" style="margin-bottom: 15px;">
          <h2 class="cv-section-title" style="font-size: 17px; color: ${finalDesign.primaryColor}; border-bottom: 1px solid ${finalDesign.primaryColor}; padding-bottom: 3px; margin-top: 0; margin-bottom: 8px;">İş Deneyimi</h2>
          ${this.generateExperienceHTML(experiences, finalDesign.primaryColor)}
        </div>
        
        <div class="cv-section" style="margin-bottom: 15px;">
          <h2 class="cv-section-title" style="font-size: 17px; color: ${finalDesign.primaryColor}; border-bottom: 1px solid ${finalDesign.primaryColor}; padding-bottom: 3px; margin-top: 0; margin-bottom: 8px;">Eğitim</h2>
          ${this.generateEducationHTML(education, finalDesign.primaryColor)}
        </div>
        
        <div class="cv-section" style="margin-bottom: 15px;">
          <h2 class="cv-section-title" style="font-size: 17px; color: ${finalDesign.primaryColor}; border-bottom: 1px solid ${finalDesign.primaryColor}; padding-bottom: 3px; margin-top: 0; margin-bottom: 8px;">Beceriler</h2>
          
          <div class="cv-sub-section" style="margin-bottom: 10px;">
            <h3 style="font-size: 15px; color: ${finalDesign.primaryColor}; margin-top: 5px; margin-bottom: 5px;">Teknik Beceriler</h3>
            ${this.generateTechnicalSkillsHTML(skills.technical, finalDesign.primaryColor)}
          </div>
          
          <div class="cv-sub-section" style="margin-bottom: 10px;">
            <h3 style="font-size: 15px; color: ${finalDesign.primaryColor}; margin-top: 5px; margin-bottom: 5px;">Kişisel Beceriler</h3>
            ${this.generateSoftSkillsHTML(skills.soft, finalDesign.primaryColor)}
          </div>
          
          <div class="cv-sub-section" style="margin-bottom: 10px;">
            <h3 style="font-size: 15px; color: ${finalDesign.primaryColor}; margin-top: 5px; margin-bottom: 5px;">Yabancı Diller</h3>
            ${this.generateLanguagesHTML(skills.languages, finalDesign.primaryColor)}
          </div>
        </div>
        
        <div class="cv-section" style="margin-bottom: 15px;">
          <h2 class="cv-section-title" style="font-size: 17px; color: ${finalDesign.primaryColor}; border-bottom: 1px solid ${finalDesign.primaryColor}; padding-bottom: 3px; margin-top: 0; margin-bottom: 8px;">Sertifikalar</h2>
          ${this.generateCertificatesHTML(certificates, finalDesign.primaryColor)}
        </div>
        
        <div class="cv-section" style="margin-bottom: 15px;">
          <h2 class="cv-section-title" style="font-size: 17px; color: ${finalDesign.primaryColor}; border-bottom: 1px solid ${finalDesign.primaryColor}; padding-bottom: 3px; margin-top: 0; margin-bottom: 8px;">Projeler</h2>
          ${this.generateProjectsHTML(projects, finalDesign.primaryColor)}
        </div>
      </div>
    `;
  }
  
  /**
   * İş deneyimleri için HTML oluşturur
   * @param {Array} experiences - İş deneyimleri dizisi
   * @param {string} primaryColor - Ana renk
   * @returns {string} - HTML içeriği
   */
  generateExperienceHTML(experiences, primaryColor) {
    if (!experiences || experiences.length === 0) {
      return '<p style="font-size: 13px;">Henüz iş deneyimi eklenmedi. CV\'nize iş deneyimlerinizi eklemek için "İş Deneyimi" sekmesini kullanın.</p>';
    }
    
    return experiences.map(exp => `
      <div class="cv-experience-item" style="margin-bottom: 10px; padding-bottom: 8px;">
        <div class="cv-item-header" style="display: flex; justify-content: space-between; margin-bottom: 3px;">
          <span class="cv-item-title" style="color: ${primaryColor}; font-weight: bold; font-size: 14px;">${exp.jobTitle || 'Pozisyon'}${exp.company ? ` - ${exp.company}` : ''}</span>
          <span class="cv-item-date" style="color: #666; font-size: 13px;">${formatDateRange(exp.startDate, exp.endDate) || 'Tarih bilgisi'}</span>
        </div>
        ${exp.location ? `<div style="font-size: 13px;"><i class="fas fa-map-marker-alt" style="color: ${primaryColor}; margin-right: 5px; font-size: 12px;"></i>${exp.location}</div>` : ''}
        ${exp.description ? `<p style="margin-top: 3px; font-size: 13px; line-height: 1.4;">${exp.description.replace(/\n/g, '<br>')}</p>` : '<p style="margin-top: 3px; font-size: 13px; line-height: 1.4;">İş tanımı ve sorumluluklarınızı ekleyin.</p>'}
      </div>
    `).join('');
  }
  
  /**
   * Eğitim bilgileri için HTML oluşturur
   * @param {Array} education - Eğitim bilgileri dizisi
   * @param {string} primaryColor - Ana renk
   * @returns {string} - HTML içeriği
   */
  generateEducationHTML(education, primaryColor) {
    if (!education || education.length === 0) {
      return '<p style="font-size: 13px;">Henüz eğitim bilgisi eklenmedi. CV\'nize eğitim bilgilerinizi eklemek için "Eğitim" sekmesini kullanın.</p>';
    }
    
    return education.map(edu => `
      <div class="cv-education-item" style="margin-bottom: 10px; padding-bottom: 8px;">
        <div class="cv-item-header" style="display: flex; justify-content: space-between; margin-bottom: 3px;">
          <span class="cv-item-title" style="color: ${primaryColor}; font-weight: bold; font-size: 14px;">${edu.degree || 'Derece'}${edu.fieldOfStudy ? ` - ${edu.fieldOfStudy}` : ''}</span>
          <span class="cv-item-date" style="color: #666; font-size: 13px;">${formatDateRange(edu.startDate, edu.endDate) || 'Tarih bilgisi'}</span>
        </div>
        ${edu.school ? `<div style="font-size: 13px;"><i class="fas fa-university" style="color: ${primaryColor}; margin-right: 5px; font-size: 12px;"></i>${edu.school}</div>` : '<div style="font-size: 13px;"><i class="fas fa-university" style="color: ${primaryColor}; margin-right: 5px; font-size: 12px;"></i>Okul/Üniversite adını ekleyin</div>'}
        ${edu.description ? `<p style="margin-top: 3px; font-size: 13px; line-height: 1.4;">${edu.description.replace(/\n/g, '<br>')}</p>` : ''}
      </div>
    `).join('');
  }
  
  /**
   * Teknik beceriler için HTML oluşturur
   * @param {Array} technicalSkills - Teknik beceriler dizisi
   * @param {string} primaryColor - Ana renk
   * @returns {string} - HTML içeriği
   */
  generateTechnicalSkillsHTML(technicalSkills, primaryColor) {
    if (!technicalSkills || technicalSkills.length === 0) {
      return '<p style="font-size: 13px;">Henüz teknik beceri eklenmedi. CV\'nize teknik becerilerinizi eklemek için "Beceriler" sekmesini kullanın.</p>';
    }
    
    let html = '<div style="display: flex; flex-wrap: wrap; gap: 10px; font-size: 13px;">';
    
    technicalSkills.forEach(skill => {
      html += `
        <div style="display: flex; align-items: center; margin-bottom: 4px; width: 48%;">
          <span style="font-weight: 600;">${skill.name || 'Beceri'}</span> ${this.generateRatingDotsHTML(skill.rating || 0, primaryColor)}
        </div>
      `;
    });
    
    html += '</div>';
    return html;
  }
  
  /**
   * Beceri seviyesi için rating noktaları oluşturur
   * @param {number} rating - Beceri seviyesi (1-5)
   * @param {string} primaryColor - Ana renk
   * @returns {string} - HTML içeriği
   */
  generateRatingDotsHTML(rating, primaryColor) {
    let html = '<span style="margin-left: 5px; display: inline-flex; align-items: center;">';
    
    for (let i = 1; i <= 5; i++) {
      const filled = i <= rating;
      html += `<span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: ${filled ? primaryColor : '#eee'}; margin-right: 2px;"></span>`;
    }
    
    html += '</span>';
    return html;
  }
  
  /**
   * Kişisel beceriler için HTML oluşturur
   * @param {Array} softSkills - Kişisel beceriler dizisi
   * @param {string} primaryColor - Ana renk
   * @returns {string} - HTML içeriği
   */
  generateSoftSkillsHTML(softSkills, primaryColor) {
    if (!softSkills || softSkills.length === 0) {
      return '<p style="font-size: 13px;">Henüz kişisel beceri eklenmedi. CV\'nize kişisel becerilerinizi eklemek için "Beceriler" sekmesini kullanın. İletişim becerileri, takım çalışması, problem çözme gibi becerilerinizi burada gösterebilirsiniz.</p>';
    }
    
    let html = '<div style="display: flex; flex-wrap: wrap; gap: 5px; font-size: 13px;">';
    
    softSkills.forEach(skill => {
      html += `<div style="display: flex; align-items: center; margin-bottom: 3px; width: 48%;"><i class="fas fa-check-circle" style="color: ${primaryColor}; margin-right: 5px; font-size: 11px;"></i>${skill.name || 'Beceri'}</div>`;
    });
    
    html += '</div>';
    return html;
  }
  
  /**
   * Yabancı diller için HTML oluşturur
   * @param {Array} languages - Yabancı diller dizisi
   * @param {string} primaryColor - Ana renk
   * @returns {string} - HTML içeriği
   */
  generateLanguagesHTML(languages, primaryColor) {
    if (!languages || languages.length === 0) {
      return '<p style="font-size: 13px;">Henüz yabancı dil eklenmedi. CV\'nize bildiğiniz yabancı dilleri ve seviyelerini eklemek için "Beceriler" sekmesini kullanın.</p>';
    }
    
    let html = '<div style="display: flex; flex-wrap: wrap; gap: 5px; font-size: 13px;">';
    
    languages.forEach(lang => {
      html += `<div style="display: flex; align-items: center; margin-bottom: 3px; width: 48%;"><i class="fas fa-language" style="color: ${primaryColor}; margin-right: 5px; font-size: 11px;"></i>${lang.name || 'Dil'}${lang.level ? ` - ${lang.level}` : ''}</div>`;
    });
    
    html += '</div>';
    return html;
  }
  
  /**
   * Sertifikalar için HTML oluşturur
   * @param {Array} certificates - Sertifikalar dizisi
   * @param {string} primaryColor - Ana renk
   * @returns {string} - HTML içeriği
   */
  generateCertificatesHTML(certificates, primaryColor) {
    if (!certificates || certificates.length === 0) {
      return '<p style="font-size: 13px;">Henüz sertifika eklenmedi. CV\'nize mesleki sertifikalarınızı ve aldığınız eğitimleri eklemek için "Beceriler" sekmesini kullanın.</p>';
    }
    
    let html = '<div style="display: flex; flex-wrap: wrap; gap: 5px; font-size: 13px;">';
    
    certificates.forEach(cert => {
      html += `<div style="display: flex; align-items: center; margin-bottom: 3px; width: 48%;"><i class="fas fa-certificate" style="color: ${primaryColor}; margin-right: 5px; font-size: 11px;"></i>${cert.name || 'Sertifika'}</div>`;
    });
    
    html += '</div>';
    return html;
  }
  
  /**
   * Projeler için HTML oluşturur
   * @param {Array} projects - Projeler dizisi
   * @param {string} primaryColor - Ana renk
   * @returns {string} - HTML içeriği
   */
  generateProjectsHTML(projects, primaryColor) {
    if (!projects || projects.length === 0) {
      return '<p style="font-size: 13px;">Henüz proje eklenmedi. CV\'nize gerçekleştirdiğiniz önemli projeleri eklemek için "Beceriler" sekmesini kullanın. İş hayatınızda veya eğitim sürecinizde tamamladığınız projeleri burada gösterebilirsiniz.</p>';
    }
    
    return projects.map(project => `
      <div class="cv-project-item" style="margin-bottom: 8px; padding-bottom: 5px;">
        <h3 style="color: ${primaryColor}; font-size: 14px; margin-top: 3px; margin-bottom: 3px; font-weight: bold;">${project.title || 'Proje Adı'}</h3>
        ${project.description ? `<p style="margin-top: 3px; font-size: 13px; line-height: 1.4;">${project.description.replace(/\n/g, '<br>')}</p>` : '<p style="margin-top: 3px; font-size: 13px; line-height: 1.4;">Proje açıklaması ekleyin. Projenin amacı, kullanılan teknolojiler ve katkılarınız hakkında bilgi verin.</p>'}
        ${project.link ? `<div style="font-size: 12px;"><i class="fas fa-link" style="color: ${primaryColor}; margin-right: 5px; font-size: 11px;"></i><a href="${project.link}" style="color: ${primaryColor}; text-decoration: none;">${project.link}</a></div>` : ''}
      </div>
    `).join('');
  }
}