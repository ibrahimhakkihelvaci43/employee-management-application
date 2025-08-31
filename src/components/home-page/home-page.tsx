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

    const mockEmployees = [
      {
        id: 1,
        items: [
          { label: 'Ad Soyad', value: 'İbrahim Helvacı' },
          { label: 'Departman', value: 'ISD' },
          { label: 'Pozisyon', value: 'Frontend Developer' },
          { label: 'Telefon', value: '+90 538 985 0101' }
        ]
      },     
    ];

    const cardActions = [
      {
        label: 'Düzenle',
        variant: 'secondary' as const,
        onClick: (id?: number) => console.log('Düzenle tıklandı, ID:', id)
      },
      {
        label: 'Sil',
        variant: 'link' as const,
        onClick: (id?: number) => console.log('Sil tıklandı, ID:', id)
      }
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

        <div class="home-page__cards-grid">
            ${mockEmployees.map(employee => html`
              <employee-card
                .items="${employee.items}"
                .actions="${cardActions}"
                .employeeId="${employee.id}"
              ></employee-card>
            `)}
          </div>
      </div>
    `;
  }
}
