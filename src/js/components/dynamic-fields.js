/**
 * Dinamik Form Alanları Yönetimi
 * 
 * Bu sınıf, CV formundaki dinamik olarak eklenip çıkarılabilen
 * alanların (iş deneyimi, eğitim, beceriler vb.) yönetimini sağlar.
 */

export class DynamicFields {
  /**
   * @param {Object} options
   * @param {Function} options.onChange - Değişiklik olduğunda çalışacak callback
   */
  constructor(options = {}) {
    // Değişiklik callback'i
    this.onChange = options.onChange || (() => {});
    
    // Event listener'ları başlat
    this.initEventListeners();

    // Etiket sistemini başlat
    this.initTagSystems();
    
    // İlk rating dot'larını aktifleştir
    this.addRatingEventListeners();
  }
  
  /**
   * Tüm dinamik alan işlemleri için event listener'ları başlat
   */
  initEventListeners() {
    // Not: "CV Oluşturmaya Başla" butonu için event listener app.js dosyasında tanımlanmıştır
    
    // İş Deneyimi Ekle
    const addExperienceBtn = document.getElementById('add-experience');
    if (addExperienceBtn) {
      addExperienceBtn.addEventListener('click', () => {
        this.addExperienceField();
      });
    }
    
    // Eğitim Ekle
    const addEducationBtn = document.getElementById('add-education');
    if (addEducationBtn) {
      addEducationBtn.addEventListener('click', () => {
        this.addEducationField();
      });
    }
    
    // Teknik Beceri Ekle
    const addTechnicalSkillBtn = document.getElementById('add-technical-skill');
    if (addTechnicalSkillBtn) {
      addTechnicalSkillBtn.addEventListener('click', () => {
        this.addTechnicalSkillField();
      });
    }
    
    // Yabancı Dil Ekle
    const addLanguageBtn = document.getElementById('add-language');
    if (addLanguageBtn) {
      addLanguageBtn.addEventListener('click', () => {
        this.addLanguageField();
      });
    }
    
    // Proje Ekle
    const addProjectBtn = document.getElementById('add-project');
    if (addProjectBtn) {
      addProjectBtn.addEventListener('click', () => {
        this.addProjectField();
      });
    }
    
    // Silme işlemleri için event listener'ları başlat
    this.addRemoveEventListeners();
  }

  /**
   * Etiket (tag) sistemini başlat
   */
  initTagSystems() {
    // Kişisel becerileri için etiket sistemi
    const softSkillInput = document.getElementById('softSkillInput');
    if (softSkillInput) {
      softSkillInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && softSkillInput.value.trim() !== '') {
          e.preventDefault();
          this.addTag(softSkillInput.value.trim(), 'soft-skills', this.getSoftSkillId());
          softSkillInput.value = '';
          this.onChange();
        }
      });
    }

    // Sertifikalar için etiket sistemi
    const certificateInput = document.getElementById('certificateInput');
    if (certificateInput) {
      certificateInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && certificateInput.value.trim() !== '') {
          e.preventDefault();
          this.addTag(certificateInput.value.trim(), 'certificates', this.getCertificateId());
          certificateInput.value = '';
          this.onChange();
        }
      });
    }
  }

  /**
   * Yeni bir ID oluşturur (Mevcut en büyük ID + 1)
   * @param {string} prefix - ID ön eki (örn: jobTitle, degree, vb.)
   * @param {string} container - Container element ID'si
   * @returns {number} - Yeni ID
   */
  getNewId(prefix, container) {
    let maxId = 0;
    
    // Mevcut alanları kontrol et ve en büyük ID'yi bul
    const elements = document.querySelectorAll(`#${container} [id^="${prefix}"]`);
    elements.forEach(el => {
      const idStr = el.id.replace(prefix, '');
      const id = parseInt(idStr);
      if (!isNaN(id) && id > maxId) {
        maxId = id;
      }
    });
    
    return maxId + 1;
  }

  /**
   * İş Deneyimi için yeni ID oluştur
   */
  getExperienceId() {
    return this.getNewId('jobTitle', 'experience-container');
  }

  /**
   * Eğitim için yeni ID oluştur
   */
  getEducationId() {
    return this.getNewId('degree', 'education-container');
  }

  /**
   * Teknik Beceri için yeni ID oluştur
   */
  getTechnicalSkillId() {
    return this.getNewId('technicalSkill', 'technical-skills-container');
  }

  /**
   * Kişisel Beceri için yeni ID oluştur
   */
  getSoftSkillId() {
    // Mevcut tag sayısını al
    const tags = document.querySelectorAll('#soft-skills-container .tag');
    return tags.length + 1;
  }

  /**
   * Sertifika için yeni ID oluştur
   */
  getCertificateId() {
    // Mevcut tag sayısını al
    const tags = document.querySelectorAll('#certificates-container .tag');
    return tags.length + 1;
  }

  /**
   * Dil için yeni ID oluştur
   */
  getLanguageId() {
    return this.getNewId('language', 'languages-container');
  }

  /**
   * Proje için yeni ID oluştur
   */
  getProjectId() {
    return this.getNewId('projectTitle', 'projects-container');
  }

  /**
   * Etiket ekle
   * @param {string} text - Etiket metni
   * @param {string} type - Etiket türü (soft-skills veya certificates)
   * @param {number} id - Etiket ID'si
   */
  addTag(text, type, id) {
    const tagsList = document.querySelector(`#${type}-container .tags-list`);
    if (!tagsList) return;

    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.innerHTML = `
      <span id="${type}${id}">${text}</span>
      <span class="remove-tag" data-id="${id}" data-type="${type}">
        <i class="fas fa-times"></i>
      </span>
    `;

    tagsList.appendChild(tag);

    // Etiket silme işlemi
    const removeBtn = tag.querySelector('.remove-tag');
    removeBtn.addEventListener('click', () => {
      tag.remove();
      this.onChange();
    });
  }
  
  /**
   * Yeni bir iş deneyimi alanı ekle
   */
  addExperienceField() {
    const id = this.getExperienceId();
    const newExperience = document.createElement('div');
    newExperience.className = 'dynamic-field card-form';
    newExperience.innerHTML = `
      <div class="dynamic-field-header">
        <h3>İş Deneyimi #${id}</h3>
        <button class="btn-remove-item" title="Bu deneyimi kaldır">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="jobTitle${id}">Pozisyon</label>
          <input type="text" id="jobTitle${id}" placeholder="Örn: IT Elemanı">
        </div>
        <div class="form-group">
          <label for="company${id}">Şirket Adı</label>
          <input type="text" id="company${id}" placeholder="Örn: Erkunt Sanayi A.Ş.">
        </div>
      </div>
      <div class="form-group">
        <label for="location${id}">Lokasyon</label>
        <div class="input-with-icon">
          <i class="fas fa-map-marker-alt"></i>
          <input type="text" id="location${id}" placeholder="Örn: Ankara">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="startDate${id}">Başlangıç Tarihi</label>
          <div class="input-with-icon">
            <i class="fas fa-calendar"></i>
            <input type="month" id="startDate${id}">
          </div>
        </div>
        <div class="form-group">
          <label for="endDate${id}">Bitiş Tarihi</label>
          <div class="input-with-icon">
            <i class="fas fa-calendar"></i>
            <input type="month" id="endDate${id}">
          </div>
          <div class="checkbox-container">
            <input type="checkbox" id="currentJob${id}">
            <label for="currentJob${id}">Şu anda burada çalışıyorum</label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="jobDescription${id}">İş Tanımı ve Sorumluluklar</label>
        <textarea id="jobDescription${id}" rows="4" placeholder="Yaptığınız işleri ve sorumlulukları listeleyiniz"></textarea>
      </div>
    `;
    
    const container = document.getElementById('experience-container');
    if (container) {
      container.appendChild(newExperience);
    }
    
    // Kaldırma butonlarına event listener ekle
    this.addRemoveEventListeners();
    
    // Değişiklik bildir
    this.onChange();
  }
  
  /**
   * Yeni bir eğitim alanı ekle
   */
  addEducationField() {
    const id = this.getEducationId();
    const newEducation = document.createElement('div');
    newEducation.className = 'dynamic-field card-form';
    newEducation.innerHTML = `
      <div class="dynamic-field-header">
        <h3>Eğitim #${id}</h3>
        <button class="btn-remove-item" title="Bu eğitimi kaldır">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="degree${id}">Eğitim Seviyesi/Diploma</label>
          <input type="text" id="degree${id}" placeholder="Örn: Lisans">
        </div>
        <div class="form-group">
          <label for="school${id}">Okul/Üniversite Adı</label>
          <input type="text" id="school${id}" placeholder="Örn: Hacettepe Üniversitesi">
        </div>
      </div>
      <div class="form-group">
        <label for="fieldOfStudy${id}">Bölüm</label>
        <input type="text" id="fieldOfStudy${id}" placeholder="Örn: Bilgisayar ve Öğretim Teknolojileri Eğitimi">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="eduStartDate${id}">Başlangıç Tarihi</label>
          <div class="input-with-icon">
            <i class="fas fa-calendar"></i>
            <input type="month" id="eduStartDate${id}">
          </div>
        </div>
        <div class="form-group">
          <label for="eduEndDate${id}">Mezuniyet Tarihi</label>
          <div class="input-with-icon">
            <i class="fas fa-calendar"></i>
            <input type="month" id="eduEndDate${id}">
          </div>
          <div class="checkbox-container">
            <input type="checkbox" id="currentEdu${id}">
            <label for="currentEdu${id}">Şu anda öğrenciyim</label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="eduDescription${id}">Eğitim Sürecindeki Önemli Projeler/Başarılar</label>
        <textarea id="eduDescription${id}" rows="3" placeholder="Eğitim sürecinizde yaptığınız önemli çalışmaları belirtiniz"></textarea>
      </div>
    `;
    
    const container = document.getElementById('education-container');
    if (container) {
      container.appendChild(newEducation);
    }
    
    // Kaldırma butonlarına event listener ekle
    this.addRemoveEventListeners();
    
    // Değişiklik bildir
    this.onChange();
  }
  
  /**
   * Yeni bir teknik beceri alanı ekle
   */
  addTechnicalSkillField() {
    const id = this.getTechnicalSkillId();
    const newSkill = document.createElement('div');
    newSkill.className = 'skill-item';
    newSkill.innerHTML = `
      <input type="text" id="technicalSkill${id}" placeholder="Örn: JavaScript">
      <div class="rating" data-skill-id="${id}">
        <div class="rating-dot" data-rating="1" title="Başlangıç"></div>
        <div class="rating-dot" data-rating="2" title="Temel"></div>
        <div class="rating-dot" data-rating="3" title="Orta"></div>
        <div class="rating-dot" data-rating="4" title="İyi"></div>
        <div class="rating-dot" data-rating="5" title="Uzman"></div>
      </div>
      <button class="btn-remove-skill" title="Bu beceriyi kaldır">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    const container = document.getElementById('technical-skills-container');
    if (container) {
      const skillsArea = container.querySelector('.skills-input-area');
      if (skillsArea) {
        skillsArea.appendChild(newSkill);
      } else {
        container.appendChild(newSkill);
      }
    }
    
    // Yeni rating dots'larına event listener ekle
    this.addRatingEventListeners();
    this.addRemoveEventListeners();
    
    // Değişiklik bildir
    this.onChange();
  }
  
  /**
   * Yeni bir yabancı dil alanı ekle
   */
  addLanguageField() {
    const id = this.getLanguageId();
    const newLanguage = document.createElement('div');
    newLanguage.className = 'language-item';
    newLanguage.innerHTML = `
      <input type="text" id="language${id}" placeholder="Örn: İngilizce">
      <select id="languageLevel${id}">
        <option value="">Seviye Seçin</option>
        <option value="A1">A1 - Başlangıç</option>
        <option value="A2">A2 - Temel</option>
        <option value="B1">B1 - Orta Altı</option>
        <option value="B2">B2 - Orta</option>
        <option value="C1">C1 - İleri</option>
        <option value="C2">C2 - Anadil Seviyesi</option>
      </select>
      <button class="btn-remove-skill" title="Bu dili kaldır">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    const container = document.getElementById('languages-container');
    if (container) {
      container.appendChild(newLanguage);
    }
    
    this.addRemoveEventListeners();
    
    // Değişiklik bildir
    this.onChange();
  }
  
  /**
   * Yeni bir proje alanı ekle
   */
  addProjectField() {
    const id = this.getProjectId();
    const newProject = document.createElement('div');
    newProject.className = 'dynamic-field project-card';
    newProject.innerHTML = `
      <div class="dynamic-field-header">
        <h3>Proje #${id}</h3>
        <button class="btn-remove-item" title="Bu projeyi kaldır">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="form-group">
        <label for="projectTitle${id}">Proje Adı</label>
        <input type="text" id="projectTitle${id}" placeholder="Örn: E-Ticaret Web Sitesi">
      </div>
      <div class="form-group">
        <label for="projectDescription${id}">Proje Açıklaması</label>
        <textarea id="projectDescription${id}" rows="3" placeholder="Proje hakkında kısa bilgi"></textarea>
      </div>
      <div class="form-group">
        <label for="projectLink${id}">Proje Linki (Opsiyonel)</label>
        <div class="input-with-icon">
          <i class="fas fa-link"></i>
          <input type="text" id="projectLink${id}" placeholder="Örn: github.com/kullaniciadi/proje">
        </div>
      </div>
    `;
    
    const container = document.getElementById('projects-container');
    if (container) {
      container.appendChild(newProject);
    }
    
    this.addRemoveEventListeners();
    
    // Değişiklik bildir
    this.onChange();
  }
  
  /**
   * Rating dots için event listener'ları ekle
   */
  addRatingEventListeners() {
    document.querySelectorAll('.rating').forEach(ratingContainer => {
      const dots = ratingContainer.querySelectorAll('.rating-dot');
      
      dots.forEach(dot => {
        if (!dot.hasEventListener) {
          dot.hasEventListener = true;
          dot.addEventListener('click', () => {
            const rating = parseInt(dot.getAttribute('data-rating'));
            
            // Tüm noktaları temizle
            dots.forEach(d => d.classList.remove('filled'));
            
            // Seçilen rating ve öncesindeki noktaları doldur
            for (let i = 0; i < rating; i++) {
              dots[i].classList.add('filled');
            }
            
            // Değişiklik bildir
            this.onChange();
          });
        }
      });
    });
  }
  
  /**
   * Silme butonları için event listener'lar
   */
  addRemoveEventListeners() {
    // Genel öğe kaldırma butonu (İş deneyimi, eğitim, projeler)
    document.querySelectorAll('.btn-remove-item').forEach(button => {
      if (!button.hasEventListener) {
        button.hasEventListener = true;
        button.addEventListener('click', function() {
          let parent = this.closest('.dynamic-field');
          if (parent) {
            parent.remove();
          }
        });
      }
    });
    
    // Beceri kaldırma butonu (Teknik beceriler, diller)
    document.querySelectorAll('.btn-remove-skill').forEach(button => {
      if (!button.hasEventListener) {
        button.hasEventListener = true;
        button.addEventListener('click', function() {
          let parent = this.closest('.skill-item, .language-item');
          if (parent) {
            parent.remove();
          }
        });
      }
    });
  }
}