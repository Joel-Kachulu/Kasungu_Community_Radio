// utils.js
export const stripHtml = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };
  
  export const handleFileChange = (e, setFormData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: e.target.files[0],
    }));
  };
  