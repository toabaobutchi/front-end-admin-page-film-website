import './FormInfo.scss'

function FormInfo({id = '', children = '', onSubmit = () => {}, enctype = 'application/x-www-form-urlencoded'}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  }
  
  return (
    <form encType={enctype} className='form-info' id={id} onSubmit={handleSubmit}>
      {children}
    </form>
  )
}

export default FormInfo;