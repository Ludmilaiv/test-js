"use strict"

class ServicesTree {
  constructor(apiUrl) {
    this.data = null;
    this.apiUrl = apiUrl;
    this.root = null;
  }

  async getData() {
    try {
      const res = await fetch(this.apiUrl);
      this.data = await res.json();
      console.log(this.data);
    }
    catch (err) {
      console.log(err);
    };
  }

  sortNode(node) {
    const nodeElements = [...node.children];
    const sortedNodeElements = nodeElements.sort((a, b) => (+a.dataset.sorthead) - (+b.dataset.sorthead));
    node.innerHTML = "";
    sortedNodeElements.forEach(el => {
      if (el.classList.contains("node")) this.sortNode(el.querySelector("ul"));
      node.appendChild(el);
    });
  }

  createDom() {
    if (!this.data || !this.data.services) return;
    this.root = document.createElement("ul");
    this.root.classList.add("root");
    this.root.classList.add("node");

    this.data.services.forEach(sItem => {
      const {id, head, name, node, price, sorthead} = sItem;
      const elem = document.createElement("li");
      elem.dataset.sorthead = sorthead;
      elem.id = `s${id}`;
      if (node === 0) {
        elem.classList.add("sheet");
        elem.innerHTML = `<b>${name}</b> - <span>${price} p.</span>`
      } else {
        elem.classList.add("node");
        elem.innerHTML = `<details><summary><b>${name}<p></summary><ul></ul></details>`;
      }
      if (!sItem.head) {
        this.root.append(elem);
      } else {
        const parent = this.root.querySelector(`#s${head}>details>ul`);
        parent.append(elem);
      }

    });
  }

  show() {
    if (!this.data || !this.data.services) return;
    if (!this.root) this.createDom();
    this.sortNode(this.root);
    console.log(this.root);
    document.body.append(this.root);
  }

}

document.addEventListener("DOMContentLoaded", async() => {
  const sTree = new ServicesTree("/get-data");
  await sTree.getData();
  if (!sTree.data) return;
  sTree.show();

})