import fetch from 'node-fetch';
const API = 'https://api.escuelajs.co/api/v1';

async function* fetchData(urlApi) {
    const response = await fetch(urlApi);
    yield await response.json();
}

fetchData(`${API}/products`).next()
    .then(({ value: products, done }) => {
        console.log(products);
        return fetchData(`${API}/products/${products[0].id}`).next();
    })
    .then(({ value: product, done }) => {
        console.log(product.title);
        return fetchData(`${API}/categories/${product.category.id}`).next();
    })
    .then(({ value: category, done }) => {
        console.log(category.name);
    })
    .catch((error) => console.error(error));

const asyncfunction = async (urlApi) => {
    try {
        const { value: products, done: productsDone } = await fetchData(`${urlApi}/products`).next();
        const { value: product, done: productDone } = await fetchData(`${urlApi}/products/${products[0].id}`).next();
        const { value: category, done: categoryDone } = await fetchData(`${urlApi}/categories/${product.category.id}`).next();

        console.log(products);
        console.log(product.title);
        console.log(category.name);
    } catch (error) {
        console.error(error);
    }
}

asyncfunction(API);