'use client';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { formatCurrency, formatChartDate } from '@/lib/utils/format';
import type { ChartData } from '@/lib/types/crypto';

interface PriceChartProps {
  data: ChartData[];
  height?: number;
  showTooltip?: boolean;
  className?: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: number;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg p-3 shadow-lg">
        <p className="text-muted-foreground text-sm">
          {formatChartDate(label)}
        </p>
        <p className="font-semibold text-foreground">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }

  return null;
}

export default function PriceChart({
  data,
  height = 300,
  showTooltip = true,
  className = '',
}: PriceChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={`flex items-center justify-center bg-muted/30 rounded-lg ${className}`} style={{ height }}>
        <p className="text-muted-foreground">No chart data available</p>
      </div>
    );
  }

  // Determine if the trend is positive or negative
  const firstPrice = data[0]?.price || 0;
  const lastPrice = data[data.length - 1]?.price || 0;
  const isPositiveTrend = lastPrice >= firstPrice;

  return (
    <div className={className} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <XAxis
            dataKey="timestamp"
            tick={false}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={['dataMin', 'dataMax']}
            tick={false}
            axisLine={false}
            tickLine={false}
          />
          {showTooltip && <Tooltip content={<CustomTooltip />} />}
          <Line
            type="monotone"
            dataKey="price"
            stroke={isPositiveTrend ? 'hsl(var(--success))' : 'hsl(var(--destructive))'}
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              fill: isPositiveTrend ? 'hsl(var(--success))' : 'hsl(var(--destructive))',
              stroke: 'hsl(var(--background))',
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}