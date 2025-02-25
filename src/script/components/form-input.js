class FormInput extends HTMLElement {
    _shadowRoot = null;
    _style = null;
    _submitEvent = 'submit'; 

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');
        this.render();
    }

    connectedCallback() {
        this._shadowRoot
            .querySelector('#noteForm')
            .addEventListener(this._submitEvent, (event) => this._handleSubmit(event));
        
        this._validation();
    }

    disconnectedCallback() {
        this._shadowRoot
            .querySelector('#noteForm')
            .removeEventListener(this._submitEvent, this._handleSubmit);
    }

    _handleSubmit(event) {
        event.preventDefault();
        const titleElement = this._shadowRoot.querySelector('#noteFormTitle');
        const bodyElement = this._shadowRoot.querySelector('#noteFormBody');

        if(!titleElement.validity.valid || !bodyElement.validity.valid) {
            return;
        }

        const noteData = {
            title: titleElement.value,
            body: bodyElement.value,
        }

        this.dispatchEvent(new CustomEvent('note-submitted', {
            detail: noteData,
            bubbles: true,
            composed: true,
        }));

        event.target.reset();
    }

    _validation() {
        const titleElement = this._shadowRoot.querySelector('#noteFormTitle');
        const bodyElement = this._shadowRoot.querySelector('#noteFormBody');
        const titleValidation = this._shadowRoot.querySelector('#titleValidation');
        const bodyValidation = this._shadowRoot.querySelector('#bodyValidation');

        const validateInput = (event) => {
            const input = event.target;
            let validationMessage = '';

            if (input.validity.valueMissing) {
                validationMessage = 'Wajib diisi bang.';
            } else if (input === titleElement && input.value.length < 6) {
                validationMessage = 'Minimal 6 karakter bang.';
            } else if (input === bodyElement && input.value.length < 10) {
                validationMessage = 'Minimal 10 karakter ya bang.';
            }

            if (input === titleElement) {
                titleValidation.textContent = validationMessage;
            } else if (input === bodyElement) {
                bodyValidation.textContent = validationMessage;
            }
        };

        titleElement.addEventListener('input', validateInput);
        bodyElement.addEventListener('input', validateInput);
        titleElement.addEventListener('invalid', validateInput);
        bodyElement.addEventListener('invalid', validateInput);
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }


    _updateStyle() {
        this._style.textContent = `
            :host {
                display: block;
            }

            h2 {
                text-align: center;
            }

            .input-section {
                width: 1024px;
                border-radius: 8px;
                margin: 16px;
                background: white;
                padding: 16px;
                flex-grow: 1;
                margin: auto;
                margin-top: 20px;
                height: fit-content;
            }

            #noteForm {
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

            input[type=text], textarea {
                border: 2px solid #9ACBD0;
                border-radius: 8px;
                padding: 10px;
                box-sizing: border-box;
                margin-bottom: 8px;
                font-size: 24px;
            }

            input[type=text] textarea #bookFormSubmit:focus {
                outline: none;
            }

            .titleValidation, .bodyValidation {
                margin-block-start: 0.5rem;
                color: red;
            }

            #noteFormSubmit {
                border-radius: 16px;
                padding: 12px 24px;
                border: 2px solid #9ACBD0;
                color: black;
                font-size: 24px;
                margin-top: auto;
                cursor: pointer;
            }

            #noteFormSubmit:hover {
                background-color: #48A6A7;
                color: #F2EFE7;
            }

            @media screen and (max-width: 768px) {
                .input-section {
                    max-width: 95%;
                    padding: 12px;
                }

                #noteFormSubmit {
                    font-size: 0.9rem;
                    padding: 10px 20px;
                }
            }

            @media screen and (max-width: 480px) {
                .input-section {
                    max-width: 100%;
                    margin: 10px auto;
                    padding: 10px;
                }

                input[type="text"], textarea {
                    font-size: 0.9rem;
                    padding: 8px;
                }

                .titleValidation, .bodyValidation {
                    font-size: 0.8rem;
                }

                #noteFormSubmit {
                    font-size: 0.8rem;
                    padding: 8px 16px;
                }
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
                <form id="noteForm">
                <div class="form-group">
                    <label for="noteFormTitle">Judul</label>
                    <input id="noteFormTitle" type="text" required minLength="6"/>
                    <p id="titleValidation" class="titleValidation"></p>
                </div>
                <div class="form-group">
                    <label for="noteFormBody">Isi Catatan</label>
                    <textarea id="noteFormBody" type="text" rows="3" required minLength="10"></textarea>
                    <p id="bodyValidation" class="bodyValidation"></p>
                </div>
                <button id="noteFormSubmit" type="submit">
                    Add Note
                </button>
                </form>
            </section>
        `;
    }
}

customElements.define('form-input', FormInput);