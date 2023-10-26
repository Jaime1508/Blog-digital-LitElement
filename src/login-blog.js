import { LitElement, css, html } from "lit";

class LoginBlog extends LitElement {
    static get styles(){
        return css`
        
            .container {
                width: 420px;
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
                color: #fff;
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

            .btn{
                margin-top: 10px;
            }

        `;
    }

    render(){
        return html`
            <div class="container">
                <h1>Login</h1>
                <div class="container-form">
                    <div class="input-box">
                        <label for="usuario">Usuario: </label>
                        <input id="usuario" type="text" required/><box-icon type='solid' name='user'></box-icon><br/>
                    </div>
                    <div class="input-box">
                        <label for="contra">Contraseña: </label>
                        <input id="contra" type="password" required/>
                    </div>
                    <button class="btn" @click=${this._login}>Ingresar</button>
                </div>
            </div>
        `;
    }

    _login(){
        const usuario = this.shadowRoot.getElementById("usuario").value;
        const contra = this.shadowRoot.getElementById("contra").value;

        if (usuario === "" || contra === "") {
            alert("Debes completar ambos campos"); 
        }

        if(usuario === "admin" && contra === "1234"){
            this.dispatchEvent(new CustomEvent('sign', {
                detail: {login: true}, bubbles: true, composed: true
            }));
        }
    }

}

customElements.define('login-blog', LoginBlog);