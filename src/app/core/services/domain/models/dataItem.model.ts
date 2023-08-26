export interface DataItem {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string | Date;
  date_revision: string | Date;
  dropdownOpen: boolean;
  [key: string]: string | Date | boolean;
}