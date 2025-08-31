import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('home-page')
export class HomePage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    const departmentOptions = [
      { value: 'hr', label: 'İnsan Kaynakları' },
      { value: 'finance', label: 'Muhasebe' },
    ];
 
   
   

    return html`
      <div class="home-page">
        <h1 class="home-page__greeting">Selam! </h1>
        
        <div class="home-page__form">
          <input-component 
            label="Ad" 
            placeholder="Adınızı girin"
            required
          ></input-component>

          <select-component
            label="Departman"
            placeholder="Departman seçiniz"
            .options="${departmentOptions}"
            required
          ></select-component>

          <button-component 
            variant="primary" 
            text="Kaydet">
          </button-component>
              
          <button-component 
            variant="secondary" 
            text="İptal">
          </button-component>
        </div>

        
      </div>
    `;
  }
}
