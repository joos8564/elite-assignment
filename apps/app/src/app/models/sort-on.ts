import { Employee } from './employee';

export interface SortOption {
  text: string;
  value: keyof Employee;
}
