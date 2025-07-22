import {
  formatCurrency,
  formatPercentage,
  formatNumber,
  getChangeColor,
} from '@/lib/utils/format';

describe('Format utilities', () => {
  describe('formatCurrency', () => {
    it('formats large numbers with abbreviations', () => {
      expect(formatCurrency(1000000000)).toBe('$1.00B');
      expect(formatCurrency(1500000000)).toBe('$1.50B');
      expect(formatCurrency(1000000)).toBe('$1.00M');
      expect(formatCurrency(1500000)).toBe('$1.50M');
      expect(formatCurrency(1000)).toBe('$1.00K');
      expect(formatCurrency(1500)).toBe('$1.50K');
    });

    it('formats regular numbers', () => {
      expect(formatCurrency(100)).toBe('$100.00');
      expect(formatCurrency(50.99)).toBe('$50.99');
    });

    it('formats small numbers with more decimals', () => {
      expect(formatCurrency(0.000123)).toBe('$0.000123');
      expect(formatCurrency(0.001)).toBe('$0.001000');
    });

    it('handles zero', () => {
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('handles negative numbers', () => {
      expect(formatCurrency(-1000)).toBe('-$1.00K');
      expect(formatCurrency(-50.99)).toBe('-$50.99');
    });
  });

  describe('formatPercentage', () => {
    it('formats positive percentages with plus sign', () => {
      expect(formatPercentage(5.25)).toBe('+5.25%');
      expect(formatPercentage(0.01)).toBe('+0.01%');
    });

    it('formats negative percentages', () => {
      expect(formatPercentage(-3.75)).toBe('-3.75%');
    });

    it('handles zero', () => {
      expect(formatPercentage(0)).toBe('0.00%');
    });
  });

  describe('formatNumber', () => {
    it('formats large numbers with abbreviations', () => {
      expect(formatNumber(1000000000000)).toBe('1.00T');
      expect(formatNumber(1000000000)).toBe('1.00B');
      expect(formatNumber(1000000)).toBe('1.00M');
      expect(formatNumber(1000)).toBe('1.00K');
    });

    it('formats regular numbers', () => {
      expect(formatNumber(500)).toBe('500.00');
      expect(formatNumber(0)).toBe('0');
    });
  });

  describe('getChangeColor', () => {
    it('returns correct color classes', () => {
      expect(getChangeColor(5.5)).toBe('text-success');
      expect(getChangeColor(-2.3)).toBe('text-destructive');
      expect(getChangeColor(0)).toBe('text-muted-foreground');
    });
  });
});