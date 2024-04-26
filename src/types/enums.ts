export enum AuditLogTypes {
  LOG = '0',
  ERROR = '1',
}

export enum UserProviders {
  CAMPUSNACKS = '0',
  GOOGLE = '1',
}

export enum UserRoleTypes {
  DEFAULT = '0',
  STUDENT = '1',
  ADMIN = '2',
  SUPERADMIN = '3',
}

export enum DaysOfWeek {
  MONDAY = '0',
  TUESDAY = '1',
  WEDNESDAY = '2',
  THURSDAY = '3',
  FRIDAY = '4',
  SATURDAY = '5',
  SUNDAY = '6',
}

export enum CuisineTypes {
  ITALIAN = '0',
  MEXICAN = '1',
  CHINESE = '2',
  JAPANESE = '3',
  INDIAN = '4',
  AMERICAN = '5',
  FRENCH = '6',
  SPANISH = '7',
  KOREAN = '8',
  TURKISH = '9',
}

export enum ProductTypes {
  PIZZA = '0',
  BURGER = '1',
  SANDWICH = '2',
  PASTA = '3',
  SALAD = '4',
  SUSHI = '5',
}

export enum OrderStatusTypes {
  PENDING = '0',
  CONFIRMED = '1',
  DELIVERED = '2',
  CANCELLED = '3',
  COMPLETED = '4',
}

export enum DeliveryTypes {
  PICKUP = '0',
  DELIVERY = '1',
  TAKEOUT = '2',
}

export enum OptionsTypes {
  DEFAULT = '0',
  //todo: fill here
}

export enum OrderLogTypes {
  PURCHASE = '0',
}

export enum PasswordResetRequestStates {
  PENDING = '0',
  COMPLETED = '1',
  EXPIRED = '2',
}

export enum AdminStates {
  ADMIN = '0',
  SUPERADMIN = '1',
}

export enum Campuses {
  IYTE = '0',
}
