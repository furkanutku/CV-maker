/**
 * CV Oluşturucu Uygulaması Ana Modülü
 * 
 * Bu dosya uygulamanın tüm modüllerini birleştirir ve 
 * iş akışını başlatır ve yönetir.
 */

import { FormController } from './components/form-controller.js';
import { CVPreview } from './components/cv-preview.js';
import { PDFGenerator } from './components/pdf-generator.js';
import { DynamicFields } from './components/dynamic-fields.js';
import { CVData } from './models/cv-data.js';

// Uygulama başlatma
document.addEventListener('DOMContentLoaded', () => {
  // Karşılama sayfası ve CV sayfası arasında geçiş için
  const startButton = document.getElementById('start-cv-btn');
  if (startButton) {
    startButton.addEventListener('click', () => {
      document.getElementById('welcome-page').classList.add('hidden');
      document.getElementById('app-container').classList.remove('hidden');
    });
  }
  // Logo tıklandığında ana sayfaya dönme özelliği
const logoElement = document.getElementById('go-to-home');
if (logoElement) {
  logoElement.addEventListener('click', () => {
    document.getElementById('app-container').classList.add('hidden');
    document.getElementById('welcome-page').classList.remove('hidden');
  });
}

  // CV veri modelini başlat
  const cvData = new CVData();
  
  // Form kontrolcüsünü başlat
  const formController = new FormController({
    onStepChange: (currentStep) => {
      // Önizleme adımına geçildiğinde önizlemeyi güncelle
      if (currentStep === 'preview') {
        cvPreview.updatePreview(cvData.getAllData());
      }
    }
  });
  
  // Dinamik form alanları yöneticisini başlat
  const dynamicFields = new DynamicFields({
    onChange: () => {
      // Dinamik alanlar değiştiğinde verileri güncelle
      cvData.updateFromDOM();
    }
  });
  
  // CV önizleme modülünü başlat
  const cvPreview = new CVPreview({
    previewContainer: document.getElementById('preview-container')
  });
  
  // PDF oluşturma modülünü başlat
  const pdfGenerator = new PDFGenerator({
    previewContainer: document.getElementById('preview-container'),
    generateButton: document.getElementById('generate-pdf'),
  });
  
  // Form değişikliklerini dinle
  document.querySelectorAll('input, textarea, select').forEach(element => {
    element.addEventListener('change', () => {
      cvData.updateFromDOM();
    });
    
    element.addEventListener('input', () => {
      // Bazı tasarım değişikliklerinin anlık güncellenmesi için
      if (['primaryColor', 'secondaryColor', 'fontFamily', 'fontSize'].includes(element.id)) {
        cvData.updateDesignSettings();
      }
    });
  });
  
  // "Şu anda çalışıyorum" checkbox'ları için özel işlem
  document.querySelectorAll('input[id^="currentJob"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const endDateId = this.id.replace('currentJob', 'endDate');
      const endDateInput = document.getElementById(endDateId);
      
      if (endDateInput) {
        endDateInput.disabled = this.checked;
        if (this.checked) {
          endDateInput.dataset.previousValue = endDateInput.value;
          endDateInput.value = '';
        } else if (endDateInput.dataset.previousValue) {
          endDateInput.value = endDateInput.dataset.previousValue;
        }
      }
    });
  });
  
  // "Şu anda öğrenciyim" checkbox'ları için özel işlem
  document.querySelectorAll('input[id^="currentEdu"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const endDateId = this.id.replace('currentEdu', 'eduEndDate');
      const endDateInput = document.getElementById(endDateId);
      
      if (endDateInput) {
        endDateInput.disabled = this.checked;
        if (this.checked) {
          endDateInput.dataset.previousValue = endDateInput.value;
          endDateInput.value = '';
        } else if (endDateInput.dataset.previousValue) {
          endDateInput.value = endDateInput.dataset.previousValue;
        }
      }
    });
  });
  
  // Şablon seçimi
  document.querySelectorAll('.template-preview').forEach(template => {
    template.addEventListener('click', () => {
      // UI güncelleme
      document.querySelectorAll('.template-preview').forEach(t => t.classList.remove('selected'));
      template.classList.add('selected');
      
      // Veri modeli güncelleme
      cvData.updateTemplateSelection(template.getAttribute('data-template'));
    });
  });
  
  // Renk önizlemeleri
  document.getElementById('primaryColor')?.addEventListener('input', function() {
    if (document.getElementById('primaryColorPreview')) {
      document.getElementById('primaryColorPreview').style.backgroundColor = this.value;
    }
  });
  
  document.getElementById('secondaryColor')?.addEventListener('input', function() {
    if (document.getElementById('secondaryColorPreview')) {
      document.getElementById('secondaryColorPreview').style.backgroundColor = this.value;
    }
  });
  
  // Başlangıç renk önizlemeleri
  if (document.getElementById('primaryColorPreview') && document.getElementById('primaryColor')) {
    document.getElementById('primaryColorPreview').style.backgroundColor = document.getElementById('primaryColor').value;
  }
  
  if (document.getElementById('secondaryColorPreview') && document.getElementById('secondaryColor')) {
    document.getElementById('secondaryColorPreview').style.backgroundColor = document.getElementById('secondaryColor').value;
  }
  
  // Uygulamayı başlat
  console.log('CV Oluşturucu uygulaması başlatıldı.');
});