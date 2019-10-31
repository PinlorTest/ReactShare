import React, { Component } from "react"
import { Modal } from "antd"

// 删除列表的条目
export const DeleteModal = ({ visible, handleOk, handleHide }) => (
  <Modal
    width="400px"
    cancelText="取消"
    title="提示"
    okText="删除"
    onOk={handleOk}
    onCancel={handleHide}
    visible={visible}
  >
    是否确定删除该条数据？
  </Modal>
)

// 最简单的通用Modal
export const ModalChildren = ({
  visible,
  title,
  cancelText,
  okText,
  handleOk,
  handleHide,
  children
}) => (
  <Modal
    width="400px"
    title={title ? title : "提示"}
    cancelText={cancelText ? cancelText : "取消"}
    okText={okText ? okText : "确定"}
    onOk={handleOk}
    onCancel={handleHide}
    visible={visible}
  >
    {children}
  </Modal>
)

export class ModalContainer extends Component {
  state = {
    visible: false
  }

  handleHide = async () => {
    this.setState({ visible: false })
  }

  handleShow = () => {
    this.setState({ visible: true })
  }

  render() {
    const { visible } = this.state
    const { children } = this.props
    const modal = {
      visible: visible,
      handleOk: this.handleHide,
      handleHide: this.handleHide,
      handleShow: this.handleShow
    }
    return children(modal)
  }
}
