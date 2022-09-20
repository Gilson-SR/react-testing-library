import React from 'react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa componente NotFound.js', () => {
  test('Se renderiza um heading <h2> com texto "Page requested not found"', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    act(() => {
      history.push('/not-valid-url');
    });
    const pageNotFound = getByRole('heading', { name: /Page requested not found/i });

    expect(pageNotFound).toBeInTheDocument();
  });

  test('Se renderiza um gif', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    act(() => {
      history.push('/not-valid-url');
    });
    const image = getByRole('img', { name: /Pikachu crying because/i });
    const urlGif = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(image).toBeInTheDocument();
    expect(image.src).toBe(urlGif);
  });
});
