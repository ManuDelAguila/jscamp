class DevJobsAvatar extends HTMLElement {
  constructor() {
    super(); // llamar al constructor de HTMLElement

    this.attachShadow({ mode: 'open' })
  }

  createUrl(username) {
    return `https://github.com/${username}.png`
  }

  render() {
    //const service = this.getAttribute('service') ?? 'github'
    const username = this.getAttribute('username') ?? ''
    const size = this.getAttribute('size') ?? '40'

    const url = this.createUrl(username)

    this.shadowRoot.innerHTML = `
    <style>
      img {
        width: ${size}px;
        height: ${size}px;
        border-radius: 9999px;
      }
    </style>

      <img 
        src="${url}" 
        alt="Avatar de ${username}" 
        class="avatar"
      />
    `
  }

  connectedCallback() {
    this.render()
  }
}

customElements.define('devjobs-avatar', DevJobsAvatar)