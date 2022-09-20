import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa componente Pokemon.js', () => {
  test('Se card de pokémon selecionado é renderizado', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName.innerHTML).toBe('Pikachu');

    const pokemonType = getByTestId('pokemon-type');

    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe('Electric');

    const pokemonWeight = getByTestId('pokemon-weight');

    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');

    const pokemonSprite = getByRole('img', { name: /pikachu sprite/i });

    expect(pokemonSprite.src).toBe(
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  test(
    'Se ao clicar o link redireciona para detalhes de pokémon e se URL é "/pokemon/id"',
    () => {
      const { getByRole, history } = renderWithRouter(<App />);
      const pokemonDetails = getByRole('link', { name: /more details/i });
      fireEvent.click(pokemonDetails);
      const pathPokemon = history.location.pathname;

      expect(pathPokemon).toBe('/pokemons/25');
    },
  );

  test('Se renderiza ícone de estrela nos pokémons favoritados', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemons/25');
    });
    const starCheckBox = getByRole('checkbox', { name: /pokémon favoritado/i });
    fireEvent.click(starCheckBox);
    const starIcon = getByRole('img', { name: /pikachu is marked as favorite/i });

    expect(starIcon).toBeInTheDocument();
    expect(starIcon.alt).toBe('Pikachu is marked as favorite');
    expect(starIcon.src.endsWith('/star-icon.svg')).toBeTruthy();
  });
});
