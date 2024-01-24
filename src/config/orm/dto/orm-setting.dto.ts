export interface OrmSetting {
  type: string;
  host: string;
  port: number;
  database: string;
  entities: Array<string>;
}
