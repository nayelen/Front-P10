import './FieldForm.css'

export const FieldForm = (labelText, type = 'text', enctype = '') => {
  return `
  <div class="FieldForm">
    <label>${labelText}</label>
    <input type="${type === 'file' ? 'file' : 'text'}" ${
    type === 'file' ? 'enctype="multipart/form-data"' : ''
  }/>
  </div>
  `
}
