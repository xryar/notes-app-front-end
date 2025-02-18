class FormInput extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');
        this.render();
    }

    _updateStyle() {
        this._style.textContent = `
             :host {
                display: block;
            }

            .input-section {
                width: 1024px;
                border-radius: 8px;
                margin: 16px;
                background: #F4D793;
                padding: 16px;
                flex-grow: 1;
                height: fit-content;
            }

            #bookForm {
                display: flex;
                padding: 16px;
                flex-direction: column;
                height: fit-content;
                border-radius: 16px;
            }

            .form-group {
                display: flex;
                flex-direction: column;
            }

            .form-group label {
                margin-bottom: 4px;
                font-size: 18px;
                font-weight: lighter;
            }

            input[type=text] {
                border: 2px solid #9475EA;
                border-radius: 8px;
                padding: 10px;
                box-sizing: border-box;
                margin-bottom: 8px;
                font-size: 24px;
            }

            input[type=text] #bookFormSubmit:focus {
                outline: none;
            }

            #noteFormSubmit {
                border-radius: 16px;
                padding: 12px 24px;
                border: 2px solid #9475EA;
                color: black;
                font-size: 24px;
                margin-top: auto;
                cursor: pointer;
            }

            #noteFormSubmit:hover {
                background-color: #5F30E2;
                color: white;
            }
        `;
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    render() {
        this._emptyContent();
        this._updateStyle();
        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
            <section class="input-section">
                <h2>Add New Note</h2>
                <form id="bookForm">
                <div class="form-group">
                    <label for="noteFormTitle">Judul</label>
                    <input id="noteFormTitle" type="text" required"/>
                </div>
                <div class="form-group">
                    <label for="noteFormBody">Isi Catatan</label>
                    <textarea id="noteFormBody" type="text" rows="4" required></textarea>
                </div>
                <button id="noteFormSubmit" type="submit">
                    Masukkan Catatan
                </button>
                </form>
            </section>
        `;
    }
}

customElements.define('form-input', FormInput);