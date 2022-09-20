import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

describe('Testa componente PokemonDetails', () => {
  test('Se renderiza informações detalhadas', () => {
    const { getByRole, getByText, queryByRole, history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/pokemons/25');
    });

    const nameDetails = getByRole('heading', { name: /pikachu details/i });
    expect(nameDetails).toBeInTheDocument();

    const linkDetails = queryByRole('link', { name: /more details/i });
    expect(linkDetails).toBeNull();

    const summary = getByRole('heading', {
      name: 'Summary',
      level: 2,
    });

    expect(summary).toBeInTheDocument();

    const summaryTagP = getByText(/This intelligent Pokémon roasts/i);

    expect(summaryTagP).toBeInTheDocument();
  });

  test('Se renderiza os mapas', () => {
    const { getByRole, getAllByRole, getByText, history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemons/25');
    });
    const titleLocation = getByRole('heading', { name: /locations/i });

    expect(titleLocation).toBeInTheDocument();

    const { foundAt } = data[0];
    foundAt.forEach((element) => {
      const nameLocation = getByText(element.location);
      expect(nameLocation).toBeInTheDocument();
    });

    const locationImages = getAllByRole('img', { name: /pikachu location/i });
    locationImages.forEach((element) => {
      const pathLocations = foundAt.some(({ map }) => map === element.src);

      expect(pathLocations).toBeTruthy();
    });

    const locationLength = locationImages.length;

    expect(locationLength).toBe(foundAt.length);
  });

  test('Se pode favoritar pokémon', () => {
    const { getByRole, getByLabelText } = renderWithRouter(<App />);
    const linkDetails = getByRole('link', { name: /more details/i });
    fireEvent.click(linkDetails);
    const labelFavorite = getByLabelText(/pokémon favoritado/i);

    expect(labelFavorite).toBeInTheDocument();
  });
});
