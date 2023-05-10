export const fetchProduct = async (productID) => {
  if (!productID) throw new Error('ID não informado');

  const BASE_URL = 'https://api.mercadolibre.com/items/';
  const response = await fetch(`${BASE_URL}${productID}`);
  const data = await response.json();

  return data;
};

export const fetchProductsList = async (productName) => {
  if (!productName) throw new Error('Termo de busca não informado');

  const BASE_URL = 'https://api.mercadolibre.com/sites/MLB/search?q=';
  const response = await fetch(`${BASE_URL}${productName}`);
  const data = await response.json();

  return data.results;
};
