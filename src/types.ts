export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  oneTimePriceRange: string;
  oneTimePriceMin: number;
  oneTimePriceMax: number;
  monthlyPriceRange: string;
  monthlyPriceMin: number;
  monthlyPriceMax: number;
  badge?: string;
  isFlagship?: boolean;
  features: string[];
  roleConnection: ('guest' | 'kitchen' | 'owner')[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  type: string;
  description: string;
  url: string;
  tag: string;
  features: string[];
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface TerminalEvent {
  id: string;
  timestamp: string;
  type: 'order' | 'cost' | 'review' | 'digest' | 'stoplist' | 'bot';
  text: string;
  highlight?: string;
  details?: string;
}

export interface LiveMetric {
  id: string;
  label: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  prefix?: string;
  suffix?: string;
}

export interface KineticFlowStep {
  id: string;
  title: string;
  icon: string;
  guestAction: string;
  kitchenAction: string;
  ownerAction: string;
  dataPayload: string;
  speed: string;
}
