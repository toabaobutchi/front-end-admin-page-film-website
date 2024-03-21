import { useEffect, useRef } from 'react';
import './Toast.scss'

/**
 * 
 * @param configs {Object} contains `delay`, `removeAfterDelay`, `floatDuration`, `fadeOutDuration`
 * @returns 
 */
function Toast({ open = false, icon = '', closeIcon = '', title = '', content = '', type = 'success', options = {}, onRemove = () => { } }) {

  const { delay = 3000, floatDuration = 300, fadeOutDuration = 300, removeAfterDelay = 500 } = options
  const toast = useRef()

  useEffect(() => {
    const timeOutId = setTimeout(function () {
      if (toast.current) {
        onRemove()
      }
    }, delay + removeAfterDelay)

    if (toast.current) {
      toast.current.addEventListener('click', (e) => {
        if (e.target.closest('.toast-close')) {
          toast.current.style.opacity = '0';
          toast.current.style.transform = 'translateX(100%)'

          clearTimeout(timeOutId)

          setTimeout(() => {
            if (toast.current) {
              onRemove()
            }
          }, removeAfterDelay)
        }
      })
    }
    return () => {
      clearTimeout(timeOutId)
    }
  })

  return (
    <>
      {open && <div ref={toast} className={`toast toast-${type}`} style={{
        animation: `floatInto ${floatDuration / 1000}s cubic-bezier(0.175, 0.885, 0.32, 1.275), fadeOut ${fadeOutDuration / 1000}s ${delay / 1000}s ease-in-out forwards`
      }}>
        <div className="toast-icon">
          {icon}
        </div>
        <div className="toast-body">
          <h3 className="toast-body-header">{title}</h3>
          <p className="toast-body-content">{content}</p>
        </div>
        <div className="toast-close">
          {closeIcon}
        </div>
      </div>}
    </>
  );
}
export default Toast;