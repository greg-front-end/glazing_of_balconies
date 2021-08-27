import checkNumInputs from "./checkNumInputs";
import closeAllModals from "./closeAllModals";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');
    
    // module for check inputs with value of number
    checkNumInputs('input[name="user_phone"]');

    // Object from message for statusDiv
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с Вами свяжимся',
        failure: 'Что-то пошло не так...'
    };

    // create request to url, then show status on div(status), then if status 200 post data
    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    };

    // clear all inputs after form sends
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            // create html div for show status after form sends
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);
            
            // if dataAttribute has prop(end) we append the key and value to formData
            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            // in the end step of the quiz clear modalState
            const clearModalState = (obj) => {
                for (let prop of Object.getOwnPropertyNames(obj)) {
                    delete obj[prop];
                }
            };

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    clearModalState(state);
                    closeAllModals('[data-modal');
                    setTimeout(function() {
                        statusMessage.remove();
                    }, 5000);
                });

        });
    });
};

export default forms;