import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computer');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computer');
    expect(fetch).toHaveBeenCalledWith();
  });

  it('retorna uma estrutura de dados igual ao objeto computadorSearch ao executar fetchProductsList', async () => {
    const data = await fetchProductsList('computer');
    await expect(data).toEqual(computadorSearch);
  });

  it('retorna erro com mensagem "Termo de busca não informado" ao executar fetchProductsList sem argumento', async () => {
    await expect(fetchProductsList()).rejects.toThrow(new Error('Termo de busca não informado'));
  });
});
