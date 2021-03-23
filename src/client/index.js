import handleSubmit from './js/formHandler'
import './styles/resets.scss'
import './styles/_base.scss'
import './styles/_footer.scss'
import './styles/_form.scss'
import './styles/_header.scss'

window.addEventListener('DOMContentLoaded', () => {
    const buttonSubmission = document.getElementById('btn-submit');
    buttonSubmission.addEventListener('click', (event)=>{
        event.preventDefault();
        handleSubmit();
    })
})
export { handleSubmit }
