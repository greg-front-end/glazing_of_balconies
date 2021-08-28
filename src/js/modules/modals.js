import closeAllModals from "./closeAllModals";
import getScrollbarSize from "./getScrollbarSize";

const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, clickCloseOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            rightScroll = getScrollbarSize();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                // close all modal window
                closeAllModals('[data-modal]');
    
                modal.classList.add('show', 'fadeIn');
                modal.classList.remove('hide',);
                // document.body.style.overflow = 'hidden';
                document.body.classList.add('modal-open');

                document.body.style.marginRight = `${rightScroll}px`;
            });
        });

        close.addEventListener('click', () => {
            // close all modal window
            closeAllModals('[data-modal]');

            modal.classList.add('hide');
            modal.classList.remove('show', 'fadeIn');
            // document.body.style.overflow = '';
            document.body.classList.remove('modal-open');
            document.body.style.marginRight = `0px`;
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal && clickCloseOverlay) {
                // close all modal window
                closeAllModals('[data-modal]');
                modal.classList.add('hide');
                modal.classList.remove('show');
                // document.body.style.overflow = '';
                document.body.classList.remove('modal-open');
                document.body.style.marginRight = `0px`;
            }
        });
    }

    // open modal through 60sec
    function showModalByTime(selector, time) {
        setTimeout(function() {
            document.querySelector(selector).style.display = 'block';
            document.body.classList.add('modal-open');
        }, time);
    }
    
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close'); 
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    // showModalByTime('.popup', 60000);
};

export default modals;