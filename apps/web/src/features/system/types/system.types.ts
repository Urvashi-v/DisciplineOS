export type ServiceState = 'up' | 'down';

export interface SystemHealth {
  status: 'ok' | 'degraded';
  uptime: number;
  timestamp: string;
  services: {
    database: ServiceState;
    redis: ServiceState;
  };
}
