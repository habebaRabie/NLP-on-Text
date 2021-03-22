import handleSubmit from './js/formHandler'
import './styles/resets.scss'
import './styles/_base.scss'
import './styles/_footer.scss'
import './styles/_form.scss'
import './styles/_header.scss'
// TODO include your scss file here

window.addEventListener('DOMContentLoaded', () => {
    // TODO: get the button for submit
    // TODO: add event listener to it when the click to call handleSubmit function
    const buttonSubmission = document.getElementById('btn-submit');
    buttonSubmission.addEventListener('click', ()=>{
        handleSubmit();
    })
})
export { handleSubmit }
