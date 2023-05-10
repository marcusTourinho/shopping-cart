import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('fetch é chamado ao executar fetchProduct', () => {
    fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProduct', () => {
    fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  it('retorna uma estrutura de dados igual ao objeto product ao executar fetchProduct', async () => {
    const data = await fetchProduct('MLB1405519561');
    expect(data).toStrictEqual(product);
  });

  it('retorna erro com mensagem "ID não informado" ao executar fetchProduct sem argumento', async () => {
    await expect(fetchProduct()).rejects.toThrow('ID não informado');
  });
});
