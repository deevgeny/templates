import { render, screen } from '@testing-library/react';
import AlertsList, { TAlert } from './AlertsList';

const alerts: TAlert[] = [
  {severity: 'success', message: 'success'},
  {severity: 'info', message: 'info'},
  {severity: 'warning', message: 'warning'},
  {severity: 'error', message: 'error'}
];

describe('<AlertsList /> component', () => {
  test('renders correctly', () => {
    render(<AlertsList alerts={alerts} />);
    const allAlerts = screen.queryAllByRole('alert');
    expect(allAlerts.length).toBe(4);

  });
  test('renders success alert correctly', () => {
    render(<AlertsList alerts={[{severity: 'success', message: 'success'}]} />);
    const icon = screen.getByTestId('SuccessOutlinedIcon');
    const text = screen.getByText(/success/i); 
    expect(icon).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
  test('renders info alert correctly', () => {
    render(<AlertsList alerts={[{severity: 'info', message: 'info'}]} />);
    const icon = screen.getByTestId('InfoOutlinedIcon');
    const text = screen.getByText(/info/i); 
    expect(icon).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
  test('renders warining alert correctly', () => {
    render(<AlertsList alerts={[{severity: 'warning', message: 'warning'}]} />);
    const icon = screen.getByTestId('ReportProblemOutlinedIcon');
    const text = screen.getByText(/warning/i); 
    expect(icon).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
  test('renders error alert correctly', () => {
    render(<AlertsList alerts={[{severity: 'error', message: 'error'}]} />);
    const icon = screen.getByTestId('ErrorOutlineIcon');
    const text = screen.getByText(/error/i); 
    expect(icon).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});