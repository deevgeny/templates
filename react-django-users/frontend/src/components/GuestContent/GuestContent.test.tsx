import { render, screen } from '@testing-library/react';
import GuestContent from './GuestContent';

describe('<GuestContent /> component', () => {
  test('renders correctly', () => {
    render(<GuestContent />);
    const headers = screen.queryAllByRole('heading');
    const images = screen.queryAllByRole('img');
    const p1 = screen.getByText(/всегда под рукой/i);
    const p2 = screen.getByText(/легко использовать/i);
    const p3 = screen.getByText(/анализ и статистика/i);
    expect(headers.length).toBe(2);
    expect(images.length).toBe(3);
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
    expect(p3).toBeInTheDocument();
  })

});