import {observable, decorate, action} from "mobx";
import React from "react";

class ModalStore {
    constructor() {
        this.isOpen = false;
        this.content = <></>;
    }

    toggle = (open) => {
        this.isOpen = open;
    }

    openModal = (modalContent) => {
        this.content = modalContent;
    }
}

decorate(ModalStore, {
    isOpen: observable,
    content: observable,
    toggle: action,
    openModal: action,
});
export default new ModalStore();