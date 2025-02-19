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

        const noteData = {
            id: +new Date(),
            title: titleElement.value,
            body: bodyElement.value,
            createdAt: new Date().toLocaleString(),
            archived: false,
        }

        this.dispatchEvent(new CustomEvent('note-submitted', {
            detail: noteData,
            bubbles: true,
            composed: true,
        }));

        event.target.reset();
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
                background: #F4D793;
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
                border: 2px solid #9475EA;
                border-radius: 8px;
                padding: 10px;
                box-sizing: border-box;
                margin-bottom: 8px;
                font-size: 24px;
            }

            input[type=text] textarea #bookFormSubmit:focus {
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
                <form id="noteForm">
                <div class="form-group">
                    <label for="noteFormTitle">Judul</label>
                    <input id="noteFormTitle" type="text" required"/>
                </div>
                <div class="form-group">
                    <label for="noteFormBody">Isi Catatan</label>
                    <textarea id="noteFormBody" type="text" rows="3" required></textarea>
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