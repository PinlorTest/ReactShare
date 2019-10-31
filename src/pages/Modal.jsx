import React from "react"
import { Button } from "antd"
import { ModalContainer, ModalChildren, DeleteModal } from "../components/modal"

class Modal extends React.Component {
  // 显示Modal事件
  handleShowModal = cb => {
    // do sth
    cb()
  }

  // modal上取消按钮事件
  handleHide = cb => {
    // do sth
    cb()
  }

  // modal上确定按钮事件
  handleSure = cb => {
    // do sth
    cb()
  }

  render() {
    return (
      <div className="App" style={{ marginTop: "200px" }}>
        <ModalContainer>
          {modal => (
            <React.Fragment>
              <ModalChildren
                title="modal"
                visible={modal.visible}
                handleHide={() => this.handleHide(modal.handleHide)}
                handleOk={() => this.handleSure(modal.handleHide)}
                children="这是显示的Modal" //这里可以写 标签
              />
              <Button
                type="primary"
                onClick={() => this.handleShowModal(modal.handleShow)}
              >
                content modal
              </Button>
            </React.Fragment>
          )}
        </ModalContainer>

        {/* 统一样式的 deleteModal */}
        <div style={{ marginTop: "200px" }}>
          <ModalContainer>
            {modal => (
              <React.Fragment>
                <DeleteModal
                  visible={modal.visible}
                  handleHide={modal.handleHide}
                />
                <Button type="primary" onClick={modal.handleShow}>
                  delete modal
                </Button>
              </React.Fragment>
            )}
          </ModalContainer>
        </div>
      </div>
    )
  }
}

export default Modal
