export const appendToLocalStorage = (newCity) => {
    const storage = JSON.parse(localStorage.getItem('cities'));
    const cityArray = [];
    if(storage) cityArray.push(storage);
    cityArray.push(newCity);
    localStorage.setItem('cities', JSON.stringify(cityArray.toString()));
}

export const removeFromLocalStorage = (cityToRemove) => {
    const cityArray = JSON.parse(localStorage.getItem('cities'));
    localStorage.setItem('cities', cityArray.filter((city) => city !== cityToRemove))
}

export const getLocalStorageItems = () => {
    const storage = JSON.parse(localStorage.getItem('cities'));
    return storage ? storage.split(',') : [];
}

export const getLocalStorageItemCount = () => {
    const cityArray = [];
    const storage = JSON.parse(localStorage.getItem('cities'));
    if(storage) cityArray.push(storage);
    return cityArray.length;
}

export const isCityInLocalStorage = (city) => {
    const cityArray = localStorage.getItem('cities');
    if(!cityArray) return false;
    return cityArray.includes(city) ? true : false;
}