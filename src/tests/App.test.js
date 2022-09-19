import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa componente App.js', () => {
  test('Se existe o texto "Home" na tela principal', () => {
    const { getByText } = renderWithRouter(<App />);
    const homePage = getByText(/home/i);

    expect(homePage).toBeInTheDocument();
  });

  test('Se ao clicar em "Home" acessa a página Home.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homePage = getByText(/home/i);
    fireEvent.click(homePage);
    const pathHome = history.location.pathname;

    expect(pathHome).toBe('/');
  });

  test('Se existe o texto "About" na tela principal', () => {
    const { getByText } = renderWithRouter(<App />);
    const aboutPage = getByText(/about/i);

    expect(aboutPage).toBeInTheDocument();
  });

  test('Se ao clicar em "About" acessa a página About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutPage = getByText(/about/i);
    fireEvent.click(aboutPage);
    const pathAbout = history.location.pathname;

    expect(pathAbout).toBe('/about');
  });

  test('Se existe o texto "Favorite Pokémons" na tela principal', () => {
    const { getByText } = renderWithRouter(<App />);
    const favoritePage = getByText(/favorite pokémons/i);

    expect(favoritePage).toBeInTheDocument();
  });

  test(
    'Se ao clicar em "Favorite Pokémons" acessa a página dos pokémons favoritos',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const favoritePage = getByText(/favorite pokémons/i);
      fireEvent.click(favoritePage);
      const pathFavorite = history.location.pathname;

      expect(pathFavorite).toBe('/favorites');
    },
  );

  test('Se url for inválida, redireciona para a página "Not Found"', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/not-valid-url');
    });

    const pageNotFound = screen.getByRole(
      'heading',
      { name: /page requested not found/i },
    );

    expect(pageNotFound).toBeInTheDocument();
  });
});
