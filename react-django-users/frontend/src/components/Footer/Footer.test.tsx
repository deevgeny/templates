import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('<Footer /> component', () => {
  test('renders correctly', () => {
    render(<Footer />);
    const text = screen.getByText(/react django users/i);
    expect(text).toBeInTheDocument();
  });

});