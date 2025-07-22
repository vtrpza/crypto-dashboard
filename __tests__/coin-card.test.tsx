import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CoinCard from '@/components/features/coin-card';
import type { CoinData } from '@/lib/types/crypto';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill, ...otherProps } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...otherProps} alt={props.alt} />;
  },
}));

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockCoin: CoinData = {
  id: 'bitcoin',
  symbol: 'BTC',
  name: 'Bitcoin',
  image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  current_price: 50000,
  market_cap: 950000000000,
  market_cap_rank: 1,
  fully_diluted_valuation: null,
  total_volume: 25000000000,
  high_24h: 52000,
  low_24h: 48000,
  price_change_24h: 1000,
  price_change_percentage_24h: 2.5,
  market_cap_change_24h: 18000000000,
  market_cap_change_percentage_24h: 1.9,
  circulating_supply: 19000000,
  total_supply: 21000000,
  max_supply: 21000000,
  ath: 69000,
  ath_change_percentage: -27.5,
  ath_date: '2021-11-10T14:24:11.849Z',
  atl: 67.81,
  atl_change_percentage: 73650.3,
  atl_date: '2013-07-06T00:00:00.000Z',
  roi: null,
  last_updated: '2023-07-01T12:00:00.000Z',
};

describe('CoinCard', () => {
  it('renders coin information correctly in list variant', () => {
    render(<CoinCard coin={mockCoin} variant="list" />);

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('$50.00K')).toBeInTheDocument();
    expect(screen.getByText('+2.50%')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders coin information correctly in grid variant', () => {
    render(<CoinCard coin={mockCoin} variant="grid" />);

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('$50.00K')).toBeInTheDocument();
    expect(screen.getByText('+2.50%')).toBeInTheDocument();
    expect(screen.getByText('$950.00B')).toBeInTheDocument();
    expect(screen.getByText('$25.00B')).toBeInTheDocument();
  });

  it('displays negative price change correctly', () => {
    const coinWithNegativeChange: CoinData = {
      ...mockCoin,
      price_change_percentage_24h: -5.2,
    };

    render(<CoinCard coin={coinWithNegativeChange} variant="list" />);

    expect(screen.getByText('-5.20%')).toBeInTheDocument();
  });

  it('creates correct link to coin detail page', () => {
    render(<CoinCard coin={mockCoin} variant="list" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/coin/bitcoin');
  });

  it('displays coin image with correct alt text', () => {
    render(<CoinCard coin={mockCoin} variant="list" />);

    const image = screen.getByAltText('Bitcoin logo');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('bitcoin.png'));
  });
});