import type {
  CreateMissionInput,
  Mission,
  MissionFilter,
  MissionTransition,
  Paginated,
  UpdateMissionInput,
} from '@disciplineos/types';

import { http } from '@/lib/http';

function buildQuery(filter?: Partial<MissionFilter>): string {
  const params = new URLSearchParams();
  if (filter?.status) params.set('status', filter.status);
  if (filter?.priority) params.set('priority', filter.priority);
  if (filter?.page) params.set('page', String(filter.page));
  if (filter?.pageSize) params.set('pageSize', String(filter.pageSize));
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

/**
 * Mission service — the only place that knows how missions are fetched. UI and
 * hooks depend on this contract, never on the HTTP client directly.
 */
export const missionService = {
  list(filter?: Partial<MissionFilter>): Promise<Paginated<Mission>> {
    return http.get<Paginated<Mission>>(`missions${buildQuery(filter)}`);
  },
  today(): Promise<Mission[]> {
    return http.get<Mission[]>('missions/today');
  },
  upcoming(): Promise<Mission[]> {
    return http.get<Mission[]>('missions/upcoming');
  },
  get(id: string): Promise<Mission> {
    return http.get<Mission>(`missions/${id}`);
  },
  create(input: CreateMissionInput): Promise<Mission> {
    return http.post<Mission>('missions', input);
  },
  update(id: string, input: UpdateMissionInput): Promise<Mission> {
    return http.patch<Mission>(`missions/${id}`, input);
  },
  remove(id: string): Promise<{ id: string }> {
    return http.delete<{ id: string }>(`missions/${id}`);
  },
  transition(id: string, transition: MissionTransition): Promise<Mission> {
    return http.post<Mission>(`missions/${id}/${transition}`);
  },
};
