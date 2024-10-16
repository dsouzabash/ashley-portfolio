class TooltipComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    fetch('./styles/styles.css')
      .then(response => response.text())
      .then(css => {
        this.shadowRoot.innerHTML = `
          <style>${css}</style>
          <div class="tooltip-container">
            <button class="tooltip-trigger" aria-label="Show tooltip">
              <slot name="trigger">Click me</slot>
            </button>
            <div class="tooltip-content" aria-hidden="true">
              <button class="tooltip-close" aria-label="Close tooltip">&times;</button>
              <slot name="content">Tooltip content goes here</slot>
            </div>
          </div>
        `;
        this.trigger = this.shadowRoot.querySelector('.tooltip-trigger');
        this.content = this.shadowRoot.querySelector('.tooltip-content');
        this.closeButton = this.shadowRoot.querySelector('.tooltip-close');
        this.trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          this.content.classList.toggle('show');
          console.log("Popover Clicked");
        });
        this.closeButton.addEventListener('click', () => {
          this.content.classList.remove('show');
          console.log("Popover Closed");
        });
        document.addEventListener('click', (e) => {
          if (!this.shadowRoot.contains(e.target)) {
            this.content.classList.remove('show');
            console.log("Popover Closed outside " + JSON.stringify(this.shadowRoot) + " e.target" + JSON.stringify(e.target));
          }
        });
      });
  }
}

window.customElements.define('tooltip-component', TooltipComponent);