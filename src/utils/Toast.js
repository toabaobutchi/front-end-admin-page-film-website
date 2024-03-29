import React from "react"

class Toast {
  constructor() {
    this.open = false
    this.icon = ''
    this.closeIcon = ''
    this.title = ''
    this.content = ''
    this.type = ''
    this.options = {}
  }
  static successToast(currentToast = {}, { title = 'Success', content = 'Success' }) {
    return {
      ...currentToast,
      title,
      content,
      type: 'success',
      closeIcon: React.createElement('i', { className: 'fas fa-times' }),
      icon: React.createElement('i', { className: 'fas fa-check-circle' }),
      open: true
    }
  }
  static errorToast(currentToast = {}, { title = 'Error', content = 'Error' }) {
    return {
      ...currentToast,
      title,
      content,
      type: 'error',
      closeIcon: React.createElement('i', { className: 'fas fa-times' }),
      icon: React.createElement('i', { className: 'fas fa-bug' }), // <i className='fas fa-bug'></i>,
      open: true
    }
  }
  static warningToast(currentToast = {}, { title = 'Warning', content = 'Warning' }) {
    return {
      ...currentToast,
      title,
      content,
      type: 'warning',
      closeIcon: React.createElement('i', { className: 'fas fa-times' }),
      icon: React.createElement('i', { className: 'fas fa-exclamation-triangle' }),
      open: true
    }
  }
  static loadingToast(currentToast = {}, { title = 'Loading ...', content = 'The action is analysing ...' }) {
    return {
      ...currentToast,
      title,
      content,
      type: 'info',
      closeIcon: React.createElement('i', { className: 'fas fa-times' }),
      icon: React.createElement('i', { className: 'fas fa-spinner fa-spin' }),
      open: true
    }
  }
}

export default Toast
