import { LitElement, html } from 'lit';
import bubbleStyle from './BubbleStyle.js';

class BubbleComponent extends LitElement {
    static properties = {
        isVisible: { type: Boolean, required: true },
        imageUrl: { type: String },
        title: { type: String },
        description: { type: String },
    };

    static styles = [bubbleStyle];

    constructor() {
        super();
        this.isVisible = false;
        this.imageUrl = '';
        this.title = '';
        this.description = '';
    }

    updated(changedProperties) {
        if (changedProperties.has('isVisible') && this.isVisible) {
            setTimeout(() => {
                this.isVisible = false;
            }, 3000);
        }
    }

    render() {
        return this.isVisible
            ? html`
                  <div class="bubble">
                      <slot></slot>
                  </div>
              `
            : null;
    }
}

customElements.define('c-bubble', BubbleComponent);
