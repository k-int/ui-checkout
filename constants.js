export const errorTypes = {
  INVALID_SCHEDULE: 1,
  INVALID_ITEM: 2,
  SCAN_FAILED: 3,
  ITEM_CHECKED_OUT: 4,
};

export const intervalPeriodsMap = {
  MINUTE: 'minutes',
  HOUR: 'hours',
  DAY: 'days',
  WEEK: 'weeks',
  MONTH: 'months',
};

export const intervalIdsMap = {
  'Minutes': 'minutes',
  'Hours': 'hours',
  'Days': 'days',
  'Weeks': 'weeks',
  'Months': 'months',
};

export const patronIdentifierMap = {
  BARCODE: 'barcode',
  EXTERNAL: 'externalSystemId',
  FOLIO: 'id',
  USER: 'username',
};

export const patronLabelMap = {
  BARCODE: 'barcode',
  EXTERNAL: 'externalSystemId',
  FOLIO: 'folioRecordNumber',
  USER: 'username',
};

export const renewFromMap = {
  CURRENT_DUE_DATE: '1',
  SYSTEM_DATE: '2',
};

export const defaultPatronIdentifier = 'BARCODE';

export const loanProfileTypesMap = {
  FIXED: 'Fixed',
  ROLLING: 'Rolling',
  INDEFINITE: 'Indefinite',
};

export default '';
