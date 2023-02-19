export interface SettingData {
  clave: string;
  valor: any;
}

export interface SettingModel extends SettingData {
  idSetting: number;
}

export interface SettingRecord extends SettingModel {
  createdAt: Date;
  updatedAt: Date;
}
