/**
 * CV Veri Modeli
 * 
 * Bu sınıf, CV oluşturma uygulamasındaki tüm verilerin 
 * merkezileştirilmiş yönetimini sağlar.
 */

export class CVData {
  constructor() {
    // Kişisel bilgiler
    this.personalInfo = {
      fullName: '',
      title: '',
      email: '',
      phone: '',
      address: '',
      birthDate: '',
      linkedin: '',
      website: '',
      summary: ''
    };
    
    // İş deneyimleri
    this.experiences = [];
    
    // Eğitim bilgileri
    this.education = [];
    
    // Beceriler
    this.skills = {
      technical: [], // { name: '', rating: 0 }
      soft: [],      // { name: '' }
      languages: [], // { name: '', level: '' }
    };
    
    // Sertifikalar
    this.certificates = [];
    
    // Projeler
    this.projects = [];
    
    // Tasarım ayarları
    this.design = {
      template: 'template-1',
      primaryColor: '#3498db',
      secondaryColor: '#2c3e50',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px'
    };
    
    // İlk veri yüklemesi
    this.updateFromDOM();
  }
  
  /**
   * DOM'dan tüm verileri al ve veri modelini güncelle
   */
  updateFromDOM() {
    this.updatePersonalInfo();
    this.updateExperiences();
    this.updateEducation();
    this.updateSkills();
    this.updateCertificates();
    this.updateProjects();
    this.updateDesignSettings();
  }
  
  /**
   * Kişisel bilgileri DOM'dan al
   */
  updatePersonalInfo() {
    this.personalInfo = {
      fullName: document.getElementById('fullName')?.value || '',
      title: document.getElementById('title')?.value || '',
      email: document.getElementById('email')?.value || '',
      phone: document.getElementById('phone')?.value || '',
      address: document.getElementById('address')?.value || '',
      birthDate: document.getElementById('birthDate')?.value || '',
      linkedin: document.getElementById('linkedin')?.value || '',
      website: document.getElementById('website')?.value || '',
      summary: document.getElementById('summary')?.value || ''
    };
  }
  
  /**
   * İş deneyimlerini DOM'dan al
   */
  updateExperiences() {
    this.experiences = [];
    const expContainer = document.getElementById('experience-container');
    if (!expContainer) return;
    
    const expFields = expContainer.querySelectorAll('.dynamic-field');
    
    expFields.forEach((field, index) => {
      const i = index + 1;
      const jobTitle = document.getElementById(`jobTitle${i}`)?.value || '';
      const company = document.getElementById(`company${i}`)?.value || '';
      
      // Eğer gerekli alanlar doluysa deneyimi ekle
      if (jobTitle || company) {
        const isCurrentJob = document.getElementById(`currentJob${i}`)?.checked || false;
        this.experiences.push({
          jobTitle,
          company,
          location: document.getElementById(`location${i}`)?.value || '',
          startDate: document.getElementById(`startDate${i}`)?.value || '',
          endDate: isCurrentJob ? 'current' : (document.getElementById(`endDate${i}`)?.value || ''),
          isCurrentJob,
          description: document.getElementById(`jobDescription${i}`)?.value || ''
        });
      }
    });
  }
  
  /**
   * Eğitim bilgilerini DOM'dan al
   */
  updateEducation() {
    this.education = [];
    const eduContainer = document.getElementById('education-container');
    if (!eduContainer) return;
    
    const eduFields = eduContainer.querySelectorAll('.dynamic-field');
    
    eduFields.forEach((field, index) => {
      const i = index + 1;
      const degree = document.getElementById(`degree${i}`)?.value || '';
      const school = document.getElementById(`school${i}`)?.value || '';
      
      // Eğer gerekli alanlar doluysa eğitimi ekle
      if (degree || school) {
        const isCurrentStudent = document.getElementById(`currentEdu${i}`)?.checked || false;
        this.education.push({
          degree,
          school,
          fieldOfStudy: document.getElementById(`fieldOfStudy${i}`)?.value || '',
          startDate: document.getElementById(`eduStartDate${i}`)?.value || '',
          endDate: isCurrentStudent ? 'current' : (document.getElementById(`eduEndDate${i}`)?.value || ''),
          isCurrentStudent,
          description: document.getElementById(`eduDescription${i}`)?.value || ''
        });
      }
    });
  }
  
  /**
   * Beceri bilgilerini DOM'dan al
   */
  updateSkills() {
    // Teknik beceriler
    this.skills.technical = [];
    const techContainer = document.getElementById('technical-skills-container');
    if (techContainer) {
      const skillItems = techContainer.querySelectorAll('.skill-item');
      
      skillItems.forEach((item, index) => {
        const i = index + 1;
        const skillInput = item.querySelector(`#technicalSkill${i}`);
        if (!skillInput) return;
        
        const skillName = skillInput.value;
        if (skillName) {
          const ratingContainer = item.querySelector('.rating');
          const rating = ratingContainer 
            ? ratingContainer.querySelectorAll('.rating-dot.filled').length 
            : 0;
          
          this.skills.technical.push({
            name: skillName,
            rating: rating
          });
        }
      });
    }
    
    // Kişisel beceriler
    this.skills.soft = [];
    const softTagsList = document.querySelector('#soft-skills-container .tags-list');
    if (softTagsList) {
      const tags = softTagsList.querySelectorAll('.tag');
      tags.forEach(tag => {
        const skillName = tag.querySelector('span:first-child').textContent;
        if (skillName) {
          this.skills.soft.push({ name: skillName });
        }
      });
    }
    
    // Dil becerileri
    this.skills.languages = [];
    const langContainer = document.getElementById('languages-container');
    if (langContainer) {
      const langItems = langContainer.querySelectorAll('.language-item');
      
      langItems.forEach((item, index) => {
        const i = index + 1;
        const langInput = item.querySelector(`#language${i}`);
        const levelSelect = item.querySelector(`#languageLevel${i}`);
        
        if (!langInput) return;
        
        const langName = langInput.value;
        if (langName) {
          this.skills.languages.push({
            name: langName,
            level: levelSelect ? levelSelect.value : ''
          });
        }
      });
    }
  }
  
  /**
   * Sertifika bilgilerini DOM'dan al
   */
  updateCertificates() {
    this.certificates = [];
    const certTagsList = document.querySelector('#certificates-container .tags-list');
    if (certTagsList) {
      const tags = certTagsList.querySelectorAll('.tag');
      tags.forEach(tag => {
        const certName = tag.querySelector('span:first-child').textContent;
        if (certName) {
          this.certificates.push({ name: certName });
        }
      });
    }
  }
  
  /**
   * Proje bilgilerini DOM'dan al
   */
  updateProjects() {
    this.projects = [];
    const projContainer = document.getElementById('projects-container');
    if (!projContainer) return;
    
    const projCards = projContainer.querySelectorAll('.project-card');
    
    projCards.forEach((card, index) => {
      const i = index + 1;
      const titleInput = card.querySelector(`#projectTitle${i}`);
      if (!titleInput) return;
      
      const title = titleInput.value;
      if (title) {
        const descInput = card.querySelector(`#projectDescription${i}`);
        const linkInput = card.querySelector(`#projectLink${i}`);
        
        this.projects.push({
          title,
          description: descInput ? descInput.value : '',
          link: linkInput ? linkInput.value : ''
        });
      }
    });
  }
  
  /**
   * Tasarım ayarlarını DOM'dan al
   */
  updateDesignSettings() {
    const selectedTemplate = document.querySelector('.template-preview.selected');
    
    this.design = {
      template: selectedTemplate ? selectedTemplate.getAttribute('data-template') : 'template-1',
      primaryColor: document.getElementById('primaryColor')?.value || '#3498db',
      secondaryColor: document.getElementById('secondaryColor')?.value || '#2c3e50',
      fontFamily: document.getElementById('fontFamily')?.value || 'Arial, sans-serif',
      fontSize: document.getElementById('fontSize')?.value || '14px'
    };
    
    // CSS değişkenlerini güncelle (sadece CV için, uygulama header'ı için değil)
    document.documentElement.style.setProperty('--cv-primary-color', this.design.primaryColor);
    document.documentElement.style.setProperty('--cv-secondary-color', this.design.secondaryColor);
  }
  
  /**
   * Şablon seçimini güncelle
   */
  updateTemplateSelection(templateId) {
    this.design.template = templateId;
  }
  
  /**
   * Tüm CV verilerini döndür
   */
  getAllData() {
    return {
      personalInfo: this.personalInfo,
      experiences: this.experiences,
      education: this.education,
      skills: this.skills,
      certificates: this.certificates,
      projects: this.projects,
      design: this.design
    };
  }
}