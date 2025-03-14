/**
 * CV Önizleme Modülü
 * 
 * Bu sınıf, CV verilerini alıp seçilen şablona göre 
 * HTML önizlemesi oluşturur.
 */

import { formatDate } from '../utils/date-formatter.js';
import { Template1 } from '../templates/template-1.js';
import { Template2 } from '../templates/template-2.js';

export class CVPreview {
  /**
   * @param {Object} options
   * @param {HTMLElement} options.previewContainer - Önizleme içeriğinin yerleştirileceği container
   */
  constructor(options = {}) {
    this.previewContainer = options.previewContainer;
    
    // Şablon oluşturucular
    this.templates = {
      'template-1': new Template1(),
      'template-2': new Template2()
    };
  }
  
  /**
   * CV verilerini alıp seçilen şablona göre HTML önizlemesi oluşturur
   * @param {Object} data - CV verileri
   */
  updatePreview(data) {
    if (!this.previewContainer) {
      console.error('Önizleme container\'ı bulunamadı.');
      return;
    }
    
    const selectedTemplate = data.design.template || 'template-1';
    
    // Şablon oluşturucuyu seç
    const templateGenerator = this.templates[selectedTemplate];
    
    if (!templateGenerator) {
      console.error(`${selectedTemplate} şablonu için oluşturucu bulunamadı.`);
      return;
    }
    
    // Şablonu oluştur
    const html = templateGenerator.generate(data);
    
    // Önizleme alanını güncelle
    this.previewContainer.innerHTML = html;
    
    console.log('CV önizlemesi güncellendi.');
  }
  
  /**
   * Belirli bir veri kümesi için HTML önizlemesi oluşturur
   * @param {string} templateId - Şablon ID'si
   * @param {Object} data - CV verileri
   * @returns {string} - HTML içeriği
   */
  generatePreviewHTML(templateId, data) {
    const templateGenerator = this.templates[templateId];
    
    if (!templateGenerator) {
      console.error(`${templateId} şablonu için oluşturucu bulunamadı.`);
      return '';
    }
    
    return templateGenerator.generate(data);
  }
}