import { LitElement, html, css } from 'lit';
import './login-blog';
import './edicion-blog';

class BlogDigital extends LitElement {
  static get styles(){
    return css`
      :host{
          color: white;
      }

      .container-art{
        width: 800px;
      }

      p{
        width: 800px;
        overflow-wrap: break-word;
      }

      .title{
        text-align: center;
      }

      .articulos{
        width: 420px;
        background: transparent;
        border: 2px solid rgb(255, 255, 255, .2);
        backdrop-filter: blur(20px);
        box-shadow: 0 0 10px rgb(0, 0, 0, .2);
        color: #fff;
        border-radius: 10px;
        padding: 30px 40px;
        margin-bottom: 10px;
      }
    `;
  }

  static get properties(){
    return {
      success: {type: Boolean},
      registros: {type: Array}
    }
  }

  constructor(){
    super();

    this.success = false;
    this.registros = [{
      id: 1,
      titulo: "prueba",
      autor: "Jaime Vega",
      articulo: "Este es un texto de pruba",
      fecha: new Date()
    }]
  }

  render(){
    return html`
      ${this.success
        ? html`
          <div class="container-art">
            <h1 class="title">BLOG DIGITAL</h1>
            ${this.dateTemplate}
          </div>
          <edicion-blog @regis=${this.agregarReg} @actua=${this.actualizarReg}></edicion-blog>
        `
        : html`
          <login-blog @sign=${this._hiddenLogin}></login-blog>
        `}
    `;
  }

  get dateTemplate(){
    return html`
      ${this.registros.map(registro => html`
      <div class="articulos">
        <h1>${registro.titulo}</h1>
        <h3>Autor: ${registro.autor}</h3>
        <p>${registro.articulo}</p>
        <h5>${`${registro.fecha.getDate()} / ${registro.fecha.getMonth()} / ${registro.fecha.getFullYear()}
         --- ${registro.fecha.getHours()}:${registro.fecha.getMinutes()} --- Id: ${registro.id}`}</h5><br/>
      </div>
      `)}
    `;
  }

  _hiddenLogin(){
    this.success = true;
  }

  agregarReg(e){
    const registroNuevo = e.detail;
    
    this.registros.push({
      id: registroNuevo.id,
      titulo: registroNuevo.titulo,
      autor: registroNuevo.autor,
      articulo: registroNuevo.articulo,
      fecha: registroNuevo.fecha
    });
    this.registros = [...this.registros];
    this.guardarLocalStorage();
  }

  actualizarReg(e){
    const registroAct = e.detail.registro;

    this.registros.map((registro, index) => {
      if(registroAct.id -1 === index){
        this.registros[index] = {
          id: registroAct.id,
          titulo: registroAct.titulo,
          autor: registroAct.autor,
          articulo: registroAct.articulo,
          fecha: new Date()
        }
      }
    });
    this.registros.sort((a, b) => a.fecha > b.fecha);
    this.registros = [...this.registros];
    this.guardarLocalStorage();
  }

  guardarLocalStorage(){
    this.registros.map(registro =>{
      localStorage.setItem(`id: ${registro.id}`, JSON.stringify(registro));
    });
  }
  
}

customElements.define('blog-digital', BlogDigital);