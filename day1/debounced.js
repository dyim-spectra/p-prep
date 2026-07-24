const log = () => console.log('called!');



function debounced(func, delay) {

    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };

}


