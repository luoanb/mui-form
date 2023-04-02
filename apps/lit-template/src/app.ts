import "@material/web/button/outlined-button";
import "./my-element";
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("lit-app")
export class App extends LitElement {
  render() {
    return html`
      <my-element></my-element>
      <md-outlined-button>点击一下</md-outlined-button>
    `;
  }
}
