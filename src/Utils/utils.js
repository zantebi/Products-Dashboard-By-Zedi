const isNameFieldValid = (name) => name.trim() !== '' && name.length < 30;

const isDescFieldValid = (description) => description.length < 200;

const isPriceFieldValid = (price) => {
    const reg = new RegExp('^[0-9]+$');
    return reg.test(price) && price > 0;
}

const chunckedArray = (array, size) => Array.from({ length: Math.ceil(array.length / size) }, (v, i) => {
    return array.slice(i * size, i * size + size);
});

const actionsObject = {
    isNameFieldValid,
    isDescFieldValid,
    isPriceFieldValid,
    chunckedArray
}

export default actionsObject;
