import { LitElement, css, html } from "lit";

class EdicionBlog extends LitElement {
    static get styles(){
        return css`
            .container{
                width: 600px;
                background: transparent;
                border: 2px solid rgb(255, 255, 255, .2);
                backdrop-filter: blur(20px);
                box-shadow: 0 0 10px rgb(0, 0, 0, .2);
                color: #fff;
                border-radius: 10px;
                padding: 30px 40px;
            }

            .container h1{
                font-size: 36px;
                text-align: center;
            }

            .container .input-box{
                width: 100%;
                height: 50px;
                margin:30px 0;
            }

            .input-box input{
                width: 100%;
                height: 100%;
                background: transparent;
                border: none;
                outline: none;
                border: 2px solid rgb(255, 255, 255, .2);
                border-radius: 40px;
                font-size: 16px;
                color: #fff;
            }

            .input-box input::placeholder{
                color: #7b7a7a7b;
            }

            .container .btn{
                width: 100%;
                height: 45px;
                background: #fff;
                border: none;
                outline: none;
                border-radius: 40px;
                box-shadow: 0 0 10px rgb(0, 0, 0, .1);
                cursor: pointer;
                font-size: 16px;
            }

            .textarea-box{
                width: 1000px;
                margin-left: 35px;
                margin-bottom: 10px;
            }

            label{
                color: #7b7a7a7b;
            }

        `;
    }

    static get properties(){
        return {
            resgistros: {type: Object},
            id: {type: Number}
        }
    }

    constructor(){
        super();
        this.registros = {};
        this.id = 2;
    }

    render(){
        return html`
            <div class="container">
                <h1>Agregar o editar artículo</h1>
                <div class="input-box">
                    <input id="id" type="text" placeholder="Ingresar id del articulo a editar"/>
                </div>
                <div class="input-box">
                    <input id="titulo" type="text" placeholder="Ingresar titulo" required/>
                </div>
                <div class="input-box">
                    <input id="autor" type="text" placeholder="Ingresar autor" required/>
                </div>
                <label>Ingresar artículo:</label><br><br>
                <div class="textarea-box">
                    <textarea id="articulo" cols="70" rows="10" required></textarea>
              </div>
                <button class="btn" @click=${this.guardarRegistro}>Guardar artículo</button>
            </div>
        `;
    }

    guardarRegistro(){
        const idInput = this.shadowRoot.getElementById("id").value;
        const titulo = this.shadowRoot.getElementById("titulo").value;
        const autor = this.shadowRoot.getElementById("autor").value;
        const articulo = this.shadowRoot.getElementById("articulo").value;

        if (titulo === "" || autor === "" || articulo === "") {
            alert("Debes completar los campos título, autor y artículo"); 
        }else{
            this.registros = {
                id: idInput,
                titulo: titulo,
                autor: autor,
                articulo: articulo
            };
    
            if(idInput != ''){
                this.dispatchEvent(new CustomEvent('actua', {
                    detail: {registro: this.registros}, bubbles: true, composed: true
                }));
            }else{
                this.id +=1;
                this.dispatchEvent(new CustomEvent('regis', {
                    detail: {id:this.id, titulo: titulo, autor: autor, articulo: articulo, fecha: new Date()}, bubbles: true, composed: true
                }));
            }
        }
        this.limpiarDato();
    }

    limpiarDato(){
        let inp1 = this.shadowRoot.getElementById("titulo");
        let inp2 = this.shadowRoot.getElementById("autor");
        let inp3 = this.shadowRoot.getElementById("articulo");
        let inp4 = this.shadowRoot.getElementById("id");

        inp1.value = "";
        inp2.value = "";
        inp3.value = "";
        inp4.value = "";

    }
}

customElements.define('edicion-blog', EdicionBlog);