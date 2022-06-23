export const appendToLocalStorage = (newCity) => {
    const storage = JSON.parse(localStorage.getItem('cities'));
    const cityArray = [];
    if(storage) cityArray.push(storage);
    cityArray.push(newCity);
    localStorage.setItem('cities', JSON.stringify(cityArray.toString()));
}
export const removeFromLocalStorage = (cityToRemove) => {
    const storage = JSON.parse(localStorage.getItem('cities'));
    if(!storage) return;
    const cityArray = storage.toString().split(',');
    const filteredArray = cityArray.filter((city) => city !== cityToRemove);
    localStorage.setItem('cities', JSON.stringify(filteredArray.toString()));
}

export const getLocalStorageItems = () => {
    const storage = JSON.parse(localStorage.getItem('cities'));
    return storage ? storage.split(',') : [];
}

export const getLocalStorageItemCount = () => {
    const cityArray = JSON.parse(localStorage.getItem('cities')).split(',') || [];
    return cityArray.length;
}

export const isCityInLocalStorage = (city) => {
    const cityToCheck = city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const cityString = localStorage.getItem('cities').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    if(!cityString) return false;
    return cityString.toLowerCase().includes(cityToCheck) ? true : false;
}