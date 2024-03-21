import './ToastContainer.scss'

function ToastContainer({children =  ''}) {
  return (
    <div id='toast-container'>
      {children}
    </div>
  );
}

export default ToastContainer;