import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Testa componente About.js', () => {
  test('Se renderiza a tag <h2> com subtítulo "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);
    const subtitle = getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(subtitle).toBeInTheDocument();
  });

  test('Se renderiza duas tags <p>', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstTagP = getByText(/This application simulates/i);
    const secondTagP = getByText(/One can filter Pokémons/i);

    expect(firstTagP).toBeInTheDocument();
    expect(secondTagP).toBeInTheDocument();
  });

  test('Se renderiza imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const pokedex = getByRole('img');

    expect(pokedex).toBeInTheDocument();
    expect(pokedex.src).toBe(
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
