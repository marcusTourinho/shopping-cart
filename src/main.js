import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const products = document.querySelector('.products');
const cartProducts = document.querySelector('.cart__products');
const totalPriceS = document.querySelector('.total-price');

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

const sumPrice = async (price) => {
  let totalPrice = parseFloat(totalPriceS.innerHTML);
  totalPrice += price;
  totalPriceS.innerHTML = totalPrice.toFixed(2);
};

const addToCart = async (productID) => {
  const req = await fetchProduct(productID);
  const product = createCartProductElement(req);
  cartProducts.appendChild(product);
  sumPrice(req.price);
};

const getID = async (event) => {
  const productID = event.target.parentNode.firstChild.innerHTML;
  saveCartID(productID);
  addToCart(productID);
};

const showProducts = async (productName) => {
  try {
    const productList = await fetchProductsList(productName);
    productList.map((product) => products.appendChild(createProductElement(product)));
    document.querySelector('.loading').remove();
  } catch {
    document.querySelector('.loading').remove();
    addErrorMsg();
  } finally {
    const addButton = document.querySelectorAll('.product__add');
    addButton.forEach((button) => button.addEventListener('click', getID));
  }
};

const getCartFromLS = () => getSavedCartIDs().forEach((id) => addToCart(id));

window.onload = () => {
  addLoadMsg();
  showProducts('computador');
  getCartFromLS();
};
