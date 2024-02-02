import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
export default function MainModal({
  disclosure,
  title,
  primaryBtn,
  secondaryBtn,
  children,
}) {
  return (
    <Modal
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      isCentered={true}
    >
      <ModalOverlay bg={"#0000002d"} />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter display={"flex"} justifyContent={"space-between"}>
          {primaryBtn && primaryBtn}
          {secondaryBtn && secondaryBtn}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
