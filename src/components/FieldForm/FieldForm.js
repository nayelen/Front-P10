import "./FieldForm.css"

export const FieldForm = (labelText, type = "text") => {
  return `
  <div>
    <label>${labelText}</label>
    <input type="${type}"/>
  </div>
  `
}