import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('<Dashboard /> page', () => {
  test('renders correctly', () => {
    render(<Dashboard />);
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});