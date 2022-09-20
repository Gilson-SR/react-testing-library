import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';

describe('Testa componente FavoritePokemons.js', () => {
  test('Se renderiza "No favorite pokemon found", caso tenha pokémons favoritos;', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavoriteFound = getByText(/no favorite pokemon found/i);

    expect(noFavoriteFound).toBeInTheDocument();
  });

  test('Se renderiza todos cards de pokémons favoritados', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemons/10');
    });
    const favoritePin = getByRole('checkbox', { name: /pokémon favoritado/i });
    fireEvent.click(favoritePin);
    act(() => {
      history.push('/favorites');
    });
    const noFavoriteFound = screen.queryByText(/no favorite pokemon found/i);
    expect(noFavoriteFound).toBeNull();
  });
});
