/**
 * Tarih Biçimlendirme Yardımcı Fonksiyonları
 * 
 * Bu modül, tarihlerin CV'de görüntülenmesi için biçimlendirilmesini sağlar.
 */

/**
 * ISO tarih formatını (YYYY-MM) okunabilir formata dönüştürür
 * @param {string} dateString - ISO tarih formatında string (YYYY-MM) veya 'current'
 * @returns {string} - Biçimlendirilmiş tarih (örn: "Ocak 2023")
 */
export function formatDate(dateString) {
    // Özel durum: Devam eden
    if (dateString === 'current' || dateString === 'Devam Ediyor') {
      return 'Devam Ediyor';
    }
    
    // Boş kontrol
    if (!dateString) {
      return '';
    }
    
    try {
      const date = new Date(dateString);
      // Tarih geçerli mi?
      if (isNaN(date.getTime())) {
        return dateString; // Geçersizse orijinal değeri döndür
      }
      
      const month = date.getMonth(); // 0-11
      const year = date.getFullYear();
      
      const monthNames = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
      ];
      
      return `${monthNames[month]} ${year}`;
    } catch (error) {
      console.error('Tarih biçimlendirme hatası:', error);
      return dateString; // Hata durumunda orijinal değeri döndür
    }
  }
  
  /**
   * ISO tarihinden yıl bilgisini çıkarır
   * @param {string} dateString - ISO tarih formatında string (YYYY-MM)
   * @returns {string} - Yıl (örn: "2023")
   */
  export function extractYear(dateString) {
    if (!dateString || dateString === 'current' || dateString === 'Devam Ediyor') {
      return dateString === 'current' || dateString === 'Devam Ediyor' ? 'Devam Ediyor' : '';
    }
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return '';
      }
      
      return date.getFullYear().toString();
    } catch (error) {
      console.error('Yıl çıkarma hatası:', error);
      return '';
    }
  }
  
  /**
   * Tarih aralığını biçimlendirir (başlangıç - bitiş)
   * @param {string} startDate - Başlangıç tarihi
   * @param {string} endDate - Bitiş tarihi
   * @returns {string} - Biçimlendirilmiş tarih aralığı
   */
  export function formatDateRange(startDate, endDate) {
    const start = formatDate(startDate);
    const end = endDate === 'current' ? 'Devam Ediyor' : formatDate(endDate);
    
    if (!start && !end) {
      return '';
    }
    
    if (!start) {
      return end;
    }
    
    if (!end) {
      return start;
    }
    
    return `${start} - ${end}`;
  }