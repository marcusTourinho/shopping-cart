import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const products = document.querySelector('.products');

const addLoadMsg = () => {
  const loadMsg = document.createElement('p');
  loadMsg.classList = 'loading';
  loadMsg.innerHTML = 'carregando...';
  products.appendChild(loadMsg);
};

const addErrorMsg = () => {
  const errorMsg = document.createElement('p');
  errorMsg.classList = 'error';
  errorMsg.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  products.appendChild(errorMsg);
};

const showProducts = async (productName) => {
  try {
    const productList = await fetchProductsList(productName);
    productList.map((product) => products.appendChild(createProductElement(product)));
    document.querySelector('.loading').remove();
  } catch {
    document.querySelector('.loading').remove();
    addErrorMsg();
  }
};

window.onload = () => {
  addLoadMsg();
  showProducts('computador');
};
