import './Modal.scss'

function Modal({
  handleToggleModal = () => { },
  header = '',
  modalType = 'primary',
  children = {},
  closeIcon = '',
  footerButtons = [],
  // open = false,
  id = ''
}) {
  const Component = <div className='modal' id={id}>
  <div className='modal-overlay' onClick={handleToggleModal}></div>
  <div className='modal-box'>
    <div className='modal-header'>
      <h3 className={`modal-header-text ${modalType}`}>{header}</h3>
      <div className='modal-header-close-button' onClick={handleToggleModal}>{closeIcon}</div>
    </div>
    <div className='modal-body'>
      {children}
    </div>
    <div className='modal-footer'>
      {
        footerButtons.map((btn, index) => {
          const { closeButton, ...attrs } = btn.props
          if (!closeButton) {
            return (
              <button key={index} {...attrs}>{btn.title}</button>
            )
          }
          else return (
            <button key={index} {...attrs} onClick={handleToggleModal}>{btn.title}</button>
          )
        })
      }
    </div>
  </div>
</div>
  return Component;
}

export default Modal;