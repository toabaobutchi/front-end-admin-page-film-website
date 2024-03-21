import './FileDialog.scss'
import '../Input.scss'
import { useRef, useState } from 'react';

function FileDialog({inputAttributes = {}, label = '', title = ''}) {
  const [preview, setPreview] = useState(0)

  if(inputAttributes.type) delete inputAttributes.type
  if(inputAttributes.onClick) delete inputAttributes.onClick

  const handlePreviewFile = (e) => {
      setPreview(e.target.files.length)
  }
  return (
    <div className={`input-group file-dialog ${preview > 0 ? 'chosen' : ''}`}>
      <input {...inputAttributes} type='file' onChange={handlePreviewFile} />
      <label htmlFor={inputAttributes.id}>{label}</label>
      <div className='file-preview'>{preview} chosen file(s)</div>
      <p className='file-dialog-title'>{title}</p>
    </div>
  );
}

export default FileDialog;