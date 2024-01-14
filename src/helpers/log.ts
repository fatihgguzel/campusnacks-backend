import e from 'express';
import AuditLog from '../database/models/AuditLog';
import { AuditLogTypes } from '../types/enums';

interface ILogOptions {
  service: string;
  function: string;
  message: string;
  data?: object;
}

async function log(options: ILogOptions) {
  await insert({
    data: {},
    type: AuditLogTypes.LOG,
    ...options,
  });
}

async function error(options: ILogOptions) {
  await insert({
    data: {},
    type: AuditLogTypes.ERROR,
    ...options,
  });
}

interface IInsertOptions extends ILogOptions {
  type: AuditLogTypes;
}

async function insert(options: IInsertOptions) {
  try {
    const auditLogBody = {
      logType: options.type,
      service: options.service,
      function: options.function,
      message: options.message,
      data: {
        ...options.data,
      },
    };

    await AuditLog.create(auditLogBody);

    //TODO alertWorkspace
  } catch (err) {
    console.error('Logger error', options, e);
  }
}

export const Logger = {
  log,
  error,
};
