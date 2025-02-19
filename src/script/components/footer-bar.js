class FooterBar extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');
    }

    _updateStyle() {
        this._style.textContent = `
            :host {
                display: block;
            }

            div {
                padding: 24px 20px;
                text-align: center;
                font-size: 1.3rem;
            }

            @media screen and (max-width: 768px) {
                div {
                    padding: 12px 16px;
                    font-size: 1.3rem;
                    text-align: center;
                }
            }

            @media screen and (max-width: 480px) {
                div {
                    padding: 10px 12px;
                    text-align: center;
                    font-size: 1.2em;
                }
            }
        `;
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
            <div>
                Submission Dicoding, Fundamental Web Development.
            </div>
        `;
    }
}

customElements.define('footer-bar', FooterBar);