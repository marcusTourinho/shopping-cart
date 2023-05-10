export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (productName) => {
  if (!productName) throw new Error('Termo de busca não informado');

  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${productName}`);
  const data = await response.json();

  return data.results;
};
