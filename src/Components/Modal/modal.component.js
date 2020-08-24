import Modal from "@material-ui/core/Modal";
import React from "react";
import {inject, observer} from "mobx-react";

export const CustomModal = inject("ModalStore")(
    observer(({ModalStore}) => {
        const {isOpen, toggle, content} = ModalStore;

            return (
                <Modal
                    open={isOpen}
                    onClose={()=>toggle(false)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {content}
                </Modal>
            )
        }
    ));
