/**
 * Form Adımları Kontrol Modülü
 * 
 * Bu sınıf CV formundaki adımlar arasında gezinmenin 
 * ve form bölümlerinin görüntülenmesinin kontrolünü sağlar.
 */

export class FormController {
    /**
     * @param {Object} options
     * @param {Function} options.onStepChange - Adım değiştiğinde çalışacak callback
     */
    constructor(options = {}) {
      this.steps = document.querySelectorAll('.step');
      this.sections = document.querySelectorAll('.form-section');
      this.nextButtons = document.querySelectorAll('.btn-next');
      this.prevButtons = document.querySelectorAll('.btn-prev');
      this.currentStep = 'personal-info'; // Başlangıç adımı
      
      this.onStepChange = options.onStepChange || (() => {});
      
      this.initEventListeners();
    }
    
    /**
     * Event Listener'ları başlat
     */
    initEventListeners() {
      // Adım başlıklarına tıklamak için event listener'lar
      this.steps.forEach(step => {
        step.addEventListener('click', () => {
          const targetSection = step.getAttribute('data-section');
          this.navigateToStep(targetSection);
        });
      });
      
      // İleri butonları için event listener'lar
      this.nextButtons.forEach(button => {
        button.addEventListener('click', () => {
          const nextSection = button.getAttribute('data-next');
          if (nextSection) {
            this.navigateToStep(nextSection);
          }
        });
      });
      
      // Geri butonları için event listener'lar
      this.prevButtons.forEach(button => {
        button.addEventListener('click', () => {
          const prevSection = button.getAttribute('data-prev');
          if (prevSection) {
            this.navigateToStep(prevSection);
          }
        });
      });
    }
    
    /**
     * Belirtilen adıma git
     * @param {string} stepId - Gidilecek adımın ID'si
     */
    navigateToStep(stepId) {
      // Tüm adımları ve bölümleri deaktif et
      this.steps.forEach(s => s.classList.remove('active'));
      this.sections.forEach(s => s.classList.remove('active'));
      
      // Hedef adımı ve bölümü aktifleştir
      document.querySelector(`[data-section="${stepId}"]`).classList.add('active');
      document.getElementById(stepId).classList.add('active');
      
      // Güncel adımı güncelle
      this.currentStep = stepId;
      
      // Callback fonksiyonunu çağır
      this.onStepChange(stepId);
    }
    
    /**
     * Geçerli adımı döndür
     * @returns {string} Geçerli adım ID'si
     */
    getCurrentStep() {
      return this.currentStep;
    }
    
    /**
     * Bir sonraki adıma git
     */
    nextStep() {
      const currentStepElement = document.querySelector(`[data-section="${this.currentStep}"]`);
      const nextButton = document.querySelector(`#${this.currentStep} .btn-next`);
      
      if (nextButton) {
        const nextStep = nextButton.getAttribute('data-next');
        if (nextStep) {
          this.navigateToStep(nextStep);
        }
      }
    }
    
    /**
     * Bir önceki adıma git
     */
    prevStep() {
      const currentStepElement = document.querySelector(`[data-section="${this.currentStep}"]`);
      const prevButton = document.querySelector(`#${this.currentStep} .btn-prev`);
      
      if (prevButton) {
        const prevStep = prevButton.getAttribute('data-prev');
        if (prevStep) {
          this.navigateToStep(prevStep);
        }
      }
    }
  }