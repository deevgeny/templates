import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

describe('<NotFound /> page', () => {
  test('renders correctly', () => {
    render(<NotFound />);
    expect(screen.getByRole('img', {  name: /page not found/i}))
    .toBeInTheDocument();
    expect(screen.getByText(/страница не найдена/i)).toBeInTheDocument();
  });
});