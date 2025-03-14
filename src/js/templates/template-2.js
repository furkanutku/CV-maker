/**
 * İki Sütunlu CV Şablonu (Template 2)
 * 
 * Bu şablon, yan panelde kişisel bilgiler ve beceriler,
 * ana alanda ise iş/eğitim bilgileri bulunan iki sütunlu bir tasarım sunar.
 */

import { formatDate, formatDateRange } from '../utils/date-formatter.js';

export class Template2 {
  constructor() {
    // Şablon ayarları
    this.templateName = 'İki Sütunlu Şablon';
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
      <div class="cv-template-2" style="font-family: ${finalDesign.fontFamily}; font-size: ${finalDesign.fontSize}; color: ${finalDesign.secondaryColor}; display: grid; grid-template-columns: 1fr 2fr; gap: 20px; max-width: 800px; margin: 0 auto;">
        <div class="cv-sidebar" style="background-color: ${this.getLighterColor(finalDesign.primaryColor, 0.9)}; padding: 20px; border-radius: 5px;">
          <div class="cv-header">
            <h1 style="color: ${finalDesign.primaryColor}; font-size: 22px; margin-bottom: 5px;">${personalInfo.fullName || 'Ad Soyad'}</h1>
            <p style="margin-top: 0; font-size: 15px;">${personalInfo.title || 'Pozisyon'}</p>
          </div>
          
          <div class="cv-section">
            <h2 class="cv-section-title" style="color: ${finalDesign.primaryColor}; font-size: 16px; border-bottom: 2px solid ${finalDesign.primaryColor}; padding-bottom: 3px; margin-top: 15px; margin-bottom: 8px;">İletişim</h2>
            ${personalInfo.email ? `<div style="margin-bottom: 5px; font-size: 13px;"><i class="fas fa-envelope" style="color: ${finalDesign.primaryColor}; margin-right: 8px;"></i>${personalInfo.email}</div>` : `<div style="margin-bottom: 5px; font-size: 13px;"><i class="fas fa-envelope" style="color: ${finalDesign.primaryColor}; margin-right: 8px;"></i>E-posta ekleyin</div>`}
            ${personalInfo.phone ? `<div style="margin-bottom: 5px; font-size: 13px;"><i class="fas fa-phone" style="color: ${finalDesign.primaryColor}; margin-right: 8px;"></i>${personalInfo.phone}</div>` : `<div style="margin-bottom: 5px; font-size: 13px;"><i class="fas fa-phone" style="color: ${finalDesign.primaryColor}; margin-right: 8px;"></i>Telefon ekleyin</div>`}
            ${personalInfo.address ? `<div style="margin-bottom: 5px; font-size: 13px;"><i class="fas fa-map-marker-alt" style="color: ${finalDesign.primaryColor}; margin-right: 8px;"></i>${personalInfo.address}</div>` : ''}
            ${personalInfo.linkedin ? `<div style="margin-bottom: 5px; font-size: 13px;"><i class="fab fa-linkedin" style="color: ${finalDesign.primaryColor}; margin-right: 8px;"></i>${personalInfo.linkedin}</div>` : ''}
            ${personalInfo.website ? `<div style="margin-bottom: 5px; font-size: 13px;"><i class="fas fa-globe" style="color: ${finalDesign.primaryColor}; margin-right: 8px;"></i>${personalInfo.website}</div>` : ''}
          </div>
          
          <div class="cv-section">
            <h2 class="cv-section-title" style="color: ${finalDesign.primaryColor}; font-size: 16px; border-bottom: 2px solid ${finalDesign.primaryColor}; padding-bottom: 3px; margin-top: 15px; margin-bottom: 8px;">Beceriler</h2>
            
            <div class="cv-sub-section" style="margin-bottom: 12px;">
              <h3 style="color: ${finalDesign.primaryColor}; font-size: 14px; margin-bottom: 5px; margin-top: 8px;">Teknik Beceriler</h3>
              ${this.generateTechnicalSkillsHTML(skills.technical, finalDesign.primaryColor)}
            </div>
            
            <div class="cv-sub-section" style="margin-bottom: 12px;">
              <h3 style="color: ${finalDesign.primaryColor}; font-size: 14px; margin-bottom: 5px; margin-top: 8px;">Kişisel Beceriler</h3>
              ${this.generateSoftSkillsHTML(skills.soft, finalDesign.primaryColor)}
            </div>
            
            <div class="cv-sub-section" style="margin-bottom: 12px;">
              <h3 style="color: ${finalDesign.primaryColor}; font-size: 14px; margin-bottom: 5px; margin-top: 8px;">Yabancı Diller</h3>
              ${this.generateLanguagesHTML(skills.languages, finalDesign.primaryColor)}
            </div>
          </div>
          
          <div class="cv-section">
            <h2 class="cv-section-title" style="color: ${finalDesign.primaryColor}; font-size: 16px; border-bottom: 2px solid ${finalDesign.primaryColor}; padding-bottom: 3px; margin-top: 15px; margin-bottom: 8px;">Sertifikalar</h2>
            ${this.generateCertificatesHTML(certificates, finalDesign.primaryColor)}
          </div>
        </div>
        
        <div class="cv-main" style="padding: 20px 10px;">
          <div class="cv-section">
            <h2 class="cv-section-title" style="color: ${finalDesign.primaryColor}; font-size: 16px; border-bottom: 2px solid ${finalDesign.primaryColor}; padding-bottom: 3px; margin-top: 0; margin-bottom: 8px;">Özet</h2>
            <p style="font-size: 13px; margin-top: 5px;">${personalInfo.summary || 'Özet bilgisi ekleyin. Kariyer hedeflerinizi, deneyimlerinizi ve becerilerinizi kısaca anlatın.'}</p>
          </div>
          
          <div class="cv-section">
            <h2 class="cv-section-title" style="color: ${finalDesign.primaryColor}; font-size: 16px; border-bottom: 2px solid ${finalDesign.primaryColor}; padding-bottom: 3px; margin-top: 15px; margin-bottom: 8px;">İş Deneyimi</h2>
            ${this.generateExperienceHTML(experiences, finalDesign.primaryColor)}
          </div>
          
          <div class="cv-section">
            <h2 class="cv-section-title" style="color: ${finalDesign.primaryColor}; font-size: 16px; border-bottom: 2px solid ${finalDesign.primaryColor}; padding-bottom: 3px; margin-top: 15px; margin-bottom: 8px;">Eğitim</h2>
            ${this.generateEducationHTML(education, finalDesign.primaryColor)}
          </div>
          
          <div class="cv-section">
            <h2 class="cv-section-title" style="color: ${finalDesign.primaryColor}; font-size: 16px; border-bottom: 2px solid ${finalDesign.primaryColor}; padding-bottom: 3px; margin-top: 15px; margin-bottom: 8px;">Projeler</h2>
            ${this.generateProjectsHTML(projects, finalDesign.primaryColor)}
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Ana renkten daha açık bir renk üretir (sidebar arka planı için)
   * @param {string} color - Renk kodu (#RRGGBB formatında)
   * @param {number} factor - Açıklık faktörü (0-1 arası, 1'e yaklaştıkça daha açık)
   * @returns {string} - Yeni renk kodu
   */
  getLighterColor(color, factor) {
    // Renk kodunu RGB formatına çevir
    const hex = color.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    
    // Rengi açıklaştırma faktörünü uygula
    r = Math.min(255, r + Math.round((255 - r) * factor));
    g = Math.min(255, g + Math.round((255 - g) * factor));
    b = Math.min(255, b + Math.round((255 - b) * factor));
    
    // RGB değerlerini hex formatına çevir
    const rHex = r.toString(16).padStart(2, '0');
    const gHex = g.toString(16).padStart(2, '0');
    const bHex = b.toString(16).padStart(2, '0');
    
    return `#${rHex}${gHex}${bHex}`;
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
      <div class="cv-experience-item" style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px dotted #eee;">
        <div class="cv-item-header" style="display: flex; justify-content: space-between; margin-bottom: 3px;">
          <span class="cv-item-title" style="color: ${primaryColor}; font-weight: bold; font-size: 14px;">${exp.jobTitle || 'Pozisyon'}${exp.company ? ` - ${exp.company}` : ''}</span>
          <span class="cv-item-date" style="color: #666; font-size: 12px;">${formatDateRange(exp.startDate, exp.endDate) || 'Tarih bilgisi'}</span>
        </div>
        ${exp.location ? `<div style="font-size: 13px;"><i class="fas fa-map-marker-alt" style="color: ${primaryColor}; margin-right: 5px; font-size: 11px;"></i>${exp.location}</div>` : ''}
        ${exp.description ? `<p style="margin-top: 3px; font-size: 13px; line-height: 1.4;">${exp.description.replace(/\n/g, '<br>')}</p>` : '<p style="margin-top: 3px; font-size: 13px; line-height: 1.4;">İş tanımı ekleyin</p>'}
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
      <div class="cv-education-item" style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px dotted #eee;">
        <div class="cv-item-header" style="display: flex; justify-content: space-between; margin-bottom: 3px;">
          <span class="cv-item-title" style="color: ${primaryColor}; font-weight: bold; font-size: 14px;">${edu.degree || 'Derece'}${edu.fieldOfStudy ? ` - ${edu.fieldOfStudy}` : ''}</span>
          <span class="cv-item-date" style="color: #666; font-size: 12px;">${formatDateRange(edu.startDate, edu.endDate) || 'Tarih bilgisi'}</span>
        </div>
        ${edu.school ? `<div style="font-size: 13px;"><i class="fas fa-university" style="color: ${primaryColor}; margin-right: 5px; font-size: 11px;"></i>${edu.school}</div>` : ''}
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
      return '<p style="font-size: 12px;">Henüz teknik beceri eklenmedi. CV\'nize teknik becerilerinizi eklemek için "Beceriler" sekmesini kullanın.</p>';
    }
    
    let html = '<ul style="list-style-type: none; padding-left: 0; margin-top: 5px; margin-bottom: 5px;">';
    
    technicalSkills.forEach(skill => {
      html += `
        <li style="margin-bottom: 6px; font-size: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 500;">${skill.name || 'Beceri'}</span>
            <span>${this.generateRatingDotsHTML(skill.rating || 0, primaryColor)}</span>
          </div>
        </li>
      `;
    });
    
    html += '</ul>';
    return html;
  }
  
  /**
   * Beceri seviyesi için rating noktaları oluşturur
   * @param {number} rating - Beceri seviyesi (1-5)
   * @param {string} primaryColor - Ana renk
   * @returns {string} - HTML içeriği
   */
  generateRatingDotsHTML(rating, primaryColor) {
    let html = '<span style="display: inline-flex; align-items: center;">';
    
    for (let i = 1; i <= 5; i++) {
      const filled = i <= rating;
      html += `<span style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background-color: ${filled ? primaryColor : '#ddd'}; margin-right: 2px;"></span>`;
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
      return '<p style="font-size: 12px;">Henüz kişisel beceri eklenmedi. CV\'nize kişisel becerilerinizi eklemek için "Beceriler" sekmesini kullanın.</p>';
    }
    
    let html = '<ul style="list-style-type: none; padding-left: 0; margin-top: 5px; margin-bottom: 5px;">';
    
    softSkills.forEach(skill => {
      html += `<li style="margin-bottom: 4px; font-size: 12px;"><i class="fas fa-check-circle" style="color: ${primaryColor}; margin-right: 5px; font-size: 11px;"></i>${skill.name || 'Beceri'}</li>`;
    });
    
    html += '</ul>';
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
      return '<p style="font-size: 12px;">Henüz yabancı dil eklenmedi. CV\'nize yabancı dil bilgilerinizi eklemek için "Beceriler" sekmesini kullanın.</p>';
    }
    
    let html = '<ul style="list-style-type: none; padding-left: 0; margin-top: 5px; margin-bottom: 5px;">';
    
    languages.forEach(lang => {
      html += `<li style="margin-bottom: 4px; font-size: 12px;"><i class="fas fa-language" style="color: ${primaryColor}; margin-right: 5px; font-size: 11px;"></i>${lang.name || 'Dil'}${lang.level ? ` - ${lang.level}` : ''}</li>`;
    });
    
    html += '</ul>';
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
      return '<p style="font-size: 12px;">Henüz sertifika eklenmedi. CV\'nize sertifikalarınızı eklemek için "Beceriler" sekmesini kullanın.</p>';
    }
    
    let html = '<ul style="list-style-type: none; padding-left: 0; margin-top: 5px; margin-bottom: 5px;">';
    
    certificates.forEach(cert => {
      html += `<li style="margin-bottom: 4px; font-size: 12px;"><i class="fas fa-certificate" style="color: ${primaryColor}; margin-right: 5px; font-size: 11px;"></i>${cert.name || 'Sertifika'}</li>`;
    });
    
    html += '</ul>';
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
      return '<p style="font-size: 13px;">Henüz proje eklenmedi. CV\'nize projelerinizi eklemek için "Beceriler" sekmesini kullanın.</p>';
    }
    
    return projects.map(project => `
      <div class="cv-project-item" style="margin-bottom: 8px; padding-bottom: 5px; border-bottom: 1px dotted #eee;">
        <h3 style="color: ${primaryColor}; font-size: 14px; margin-top: 3px; margin-bottom: 3px; font-weight: bold;">${project.title || 'Proje Adı'}</h3>
        ${project.description ? `<p style="margin-top: 3px; font-size: 13px; line-height: 1.4;">${project.description.replace(/\n/g, '<br>')}</p>` : '<p style="margin-top: 3px; font-size: 13px; line-height: 1.4;">Proje açıklaması ekleyin</p>'}
        ${project.link ? `<div style="font-size: 12px;"><i class="fas fa-link" style="color: ${primaryColor}; margin-right: 5px; font-size: 11px;"></i><a href="${project.link}" style="color: ${primaryColor}; text-decoration: none;">${project.link}</a></div>` : ''}
      </div>
    `).join('');
  }
}