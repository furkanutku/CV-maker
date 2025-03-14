/**
 * PDF Oluşturma Modülü
 * 
 * Bu sınıf, hazırlanan CV önizlemesini PDF formatına dönüştürüp
 * kullanıcının indirmesini sağlar.
 */

export class PDFGenerator {
  /**
   * @param {Object} options
   * @param {HTMLElement} options.previewContainer - Önizleme içeriğinin bulunduğu container
   * @param {HTMLElement} options.generateButton - PDF oluştur butonunun referansı
   */
  constructor(options = {}) {
    this.previewContainer = options.previewContainer;
    this.generateButton = options.generateButton;
    
    // PDF oluşturmak için jsPDF kütüphanesinin varlığını kontrol et
    if (typeof window.jspdf === 'undefined' || typeof window.html2canvas === 'undefined') {
      console.error('PDF oluşturmak için gerekli kütüphaneler yüklenemedi.');
      return;
    }
    
    this.initEventListeners();
  }
  
  /**
   * Event listener'ları başlat
   */
  initEventListeners() {
    if (this.generateButton) {
      this.generateButton.addEventListener('click', () => {
        this.generatePDF();
      });
    }
  }
  
  /**
   * CV önizlemesini PDF'e dönüştür ve indir
   */
  generatePDF() {
    if (!this.previewContainer) {
      console.error('Önizleme container\'ı bulunamadı.');
      return;
    }
    
    const { jsPDF } = window.jspdf;
    
    // PDF oluşturma mesajını göster
    this.showLoadingMessage("PDF oluşturuluyor, lütfen bekleyin...");
    
    // Önizleme boyutlarını PDF için ayarla ve orjinal değerleri sakla
    const originalStyles = {
      width: this.previewContainer.style.width,
      height: this.previewContainer.style.height,
      margin: this.previewContainer.style.margin,
      padding: this.previewContainer.style.padding,
      overflow: this.previewContainer.style.overflow
    };
    
    // A4 boyutu için ayarla (standart çözünürlükte)
    this.previewContainer.style.width = '790px';  // A4 genişlik
    this.previewContainer.style.margin = '0';
    this.previewContainer.style.padding = '0';
    this.previewContainer.style.overflow = 'hidden';
    
    // html2canvas ile önizlemeyi görüntü olarak çevir
    window.html2canvas(this.previewContainer, {
      scale: 2,               // Daha yüksek çözünürlük için
      useCORS: true,
      allowTaint: true,
      backgroundColor: null   // Şeffaf arka plan
    }).then(canvas => {
      try {
        // Canvas'ın boyutları
        const imgWidth = 210;  // A4 genişliği (mm)
        const pageHeight = 297; // A4 yüksekliği (mm)
        const imgHeight = canvas.height * imgWidth / canvas.width;
        
        // Yeni PDF dokümanı oluştur
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        // Canvas'ı PDF'e ekle
        pdf.addImage(canvas, 'PNG', 0, 0, imgWidth, imgHeight);
        
        // PDF'i indir
        const fullName = document.getElementById('fullName')?.value || 'CV';
        pdf.save(`${fullName.replace(/\s+/g, '_')}_CV.pdf`);
        
        console.log('PDF başarıyla oluşturuldu ve indirildi.');
      } catch (error) {
        console.error('PDF oluşturulurken bir hata oluştu:', error);
        alert('PDF oluşturulurken bir hata oluştu: ' + error.message);
      } finally {
        // Orijinal görünümü geri yükle
        this.previewContainer.style.width = originalStyles.width;
        this.previewContainer.style.height = originalStyles.height;
        this.previewContainer.style.margin = originalStyles.margin; 
        this.previewContainer.style.padding = originalStyles.padding;
        this.previewContainer.style.overflow = originalStyles.overflow;
        
        // Yükleme mesajını kaldır
        this.hideLoadingMessage();
      }
    }).catch(error => {
      console.error('HTML2Canvas ile görüntü oluşturulurken bir hata oluştu:', error);
      alert('HTML2Canvas hatası: ' + error.message);
      this.hideLoadingMessage();
    });
  }
  
  /**
   * Yükleme mesajı göster
   */
  showLoadingMessage(message) {
    const loadingEl = document.createElement('div');
    loadingEl.id = 'pdf-loading-message';
    loadingEl.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      font-size: 20px;
    `;
    
    loadingEl.innerHTML = `
      <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 15px rgba(0,0,0,0.2);">
        <div style="text-align: center; margin-bottom: 15px;">
          <i class="fas fa-spinner fa-spin" style="font-size: 30px; color: #3498db;"></i>
        </div>
        <div>${message}</div>
      </div>
    `;
    
    document.body.appendChild(loadingEl);
  }
  
  /**
   * Yükleme mesajını kaldır
   */
  hideLoadingMessage() {
    const loadingEl = document.getElementById('pdf-loading-message');
    if (loadingEl) {
      loadingEl.remove();
    }
  }
}