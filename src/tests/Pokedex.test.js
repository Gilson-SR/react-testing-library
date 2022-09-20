import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const nextBtnTestId = 'next-pokemon';

describe('Testa componente Pokedex.js', () => {
  test('Se renderiza <h2> com o título "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const title = getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });

    expect(title).toBeInTheDocument();
  });

  test('Se botão de filtrar tipos possui "data-testid=pokemon-type-button"', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const btnFilter = getAllByTestId('pokemon-type-button');
    const pokemonTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    expect(btnFilter.length).toBe(pokemonTypes.length);
  });

  test('Se renderiza botão "Próximo pokémon"', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const btnNext = getByTestId(nextBtnTestId);

    expect(btnNext).toBeInTheDocument();
    expect(btnNext.innerHTML).toBe('Próximo pokémon');
  });

  test('Se ao clicar no botão "Próximo pokémon", é renderizado outros pokemons', () => {
    const { getByTestId, getByRole, getByAltText } = renderWithRouter(<App />);
    const btnAll = getByRole('button', { name: /all/i });
    fireEvent.click(btnAll);
    const btnNext = getByTestId(nextBtnTestId);
    fireEvent.click(btnNext);
    const altImage = getByAltText(/charmander sprite/i);

    expect(altImage).toBeInTheDocument();
    expect(altImage.src).toBe(
      'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    );
  });

  test('Funcionamento dos botões de filtro por tipo', () => {
    const { getByRole } = renderWithRouter(<App />);
    const pokemonType = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    pokemonType.forEach((type) => {
      const btnType = getByRole('button', { name: type });

      expect(btnType).toBeInTheDocument();
    });
  });

  test('Se botão "Próximo pokémon" se desabilita', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const pokemonType = [
      'Electric',
      'Bug',
      'Poison',
      'Normal',
      'Dragon',
    ];
    const btnNext = getByTestId(nextBtnTestId);
    pokemonType.forEach((type) => {
      const btnType = getByRole('button', { name: type });
      fireEvent.click(btnType);

      expect(btnNext).toBeDisabled();
    });
  });

  test('Botão para resetar filtros', () => {
    const { getByRole } = renderWithRouter(<App />);
    const btnAll = getByRole('button', { name: /all/i });

    expect(btnAll).toBeInTheDocument();
  });
});
