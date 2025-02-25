import { animate } from "motion";

class NoteItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _click = "click";
  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
    archived: false,
  };

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this.render();
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this._shadowRoot
      .querySelector(".btn-delete")
      .addEventListener(this._click, (event) => this._handleDelete(event));
  }

  disconnectedCallback() {
    this._shadowRoot
      .querySelector(".btn-delete")
      .removeEventListener(this._click, this._handleDelete);
  }

  _handleDelete(event) {
    event.preventDefault();

    animate(
      this, 
      { opacity: [1, 0], scale: [1, 0.8] }, 
      { duration: 0.3 }
      ).finished.then(() => {
          this.dispatchEvent(new CustomEvent('note-deleted', {
              detail: this.note.id,
              bubbles: true,
              composed: true,
          }));
      });
  }

  set note(value) {
    this._note = value;
    this.render();
  }

  get note() {
    return this._note;
  }

  _updateStyle() {
    this._style.textContent = `
            :host {
                display:block;
                border-radius: 8px;
                box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
                overflow: hidden;
                background-color: white;
                max-width: 100%;
            }

            .note-info {
                padding: 16px 24px;
            }

            .note-info__title {
                background-color: #48A6A7;
                width: 100%;
                padding: 12px 0;
                text-align: center;
                box-sizing: border-box;
            }

            .btn-delete {
                display: block;
                width: 90px;
                height: 40px;
                margin: 16px auto;
                font-weight: bold;
                border-radius: 12px;
                cursor: pointer;
                color: white;
                background: lightcoral;
                border: none;
            }
            
            .btn-delete:hover {
                background-color: red;
                color: white;
            }

            .note-info__title h2 {
                font-weight: lighter;
                color: #F2EFE7;
                margin: 0;
                padding: 0;
            }

            .note-info__description p {
                display: -webkit-box;
                margin-top: 10px;
                overflow:hidden;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 5;
            }
        `;
  }

  formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  render() {
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
            <div class="card">
                <div class="note-info">
                    <div class="note-info__title">
                        <h2>${this.note.title}</h2>
                    </div>
                    <div class="note-info__body">
                        <p>${this.note.body}</p>
                    </div>
                    <div class="note-info__createdAt">
                        <p>${this.formatDate(this.note.createdAt)}</p>
                    </div>
                </div>
                <button class="btn-delete">Delete</button>
            </div>
        `;
  }
}

customElements.define("note-item", NoteItem);
