export const getAddress = async (cep) => {
  const BR_URL = 'https://brasilapi.com.br/api/cep/v2/';
  const AWS_URL = 'https://cep.awesomeapi.com.br/json/';

  try {
    const cepArr = [
      fetch(`${BR_URL}${cep}`),
      fetch(`${AWS_URL}${cep}`),
    ];

    const response = await Promise.any(cepArr);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const searchCep = async () => {
  const cepInput = document.querySelector('.cep-input').value;
  const cepAddress = document.querySelector('.cart__address');
  const cep = await getAddress(cepInput);

  const promise1 = `${cep.address} - ${cep.district} - ${cep.city} - ${cep.state}`;
  const promise2 = `${cep.street} - ${cep.neighborhood} - ${cep.city} - ${cep.state}`;

  if (cep.address) {
    cepAddress.innerHTML = promise1;
  } else
  if (cep.street) {
    cepAddress.innerHTML = promise2;
  } else {
    cepAddress.innerHTML = 'CEP não encontrado';
  }
};
