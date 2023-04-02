import "@material/web/button/outlined-button";
import { Router } from "@lit-labs/router";
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "./my-element";

@customElement("lit-app")
export class App extends LitElement {
  private router = new Router(this, [
    {
      path: "/",
      render: () => html`<h1>Home</h1>
        <md-outlined-button>点击一下</md-outlined-button> `,
    },
    {
      path: "/projects",
      render: () => html`<h1>Projects</h1> `,
    },
    {
      path: "/about",
      render: () => html`<h1>About</h1>
        <my-element></my-element> `,
    },
  ]);

  render() {
    return html`
      <header>--头--</header>
      <main>
        <nav>--nav--</nav>
        ${this.router.outlet()}
      </main>
      <footer>--尾--</footer>
    `;
  }
}
