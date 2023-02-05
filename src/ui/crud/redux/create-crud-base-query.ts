import { CrudService } from '@2ppl/core/crud';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react';

export const createCrudBaseQuery = (crudService: CrudService<any>): BaseQueryFn => (args) => {
  console.log('CUSTOM BPAPI ARGS:', args);

  if (args?.type === 'CREATE') {
    return new Promise((resolve, reject) => {
      crudService.create(args.data)
        .then((data) => {
          resolve({
            data,
          });
        })
        .catch((error) => {
          reject({
            error,
          });
        });
    });
  }

  if (args?.type === 'UPDATE') {
    return new Promise((resolve, reject) => {
      crudService.update(args.data, args.key)
        .then((data) => {
          resolve({
            data,
          });
        })
        .catch((error) => {
          reject({
            error,
          });
        });
    });
  }

  if (args?.type === 'REMOVE') {
    return new Promise((resolve, reject) => {
      crudService.findAll(args.key)
        .then((data) => {
          resolve({
            data,
          });
        })
        .catch((error) => {
          reject({
            error,
          });
        });
    });
  }

  if (args?.type === 'FIND_ALL') {
    return new Promise((resolve, reject) => {
      crudService.findAll(args.query)
        .then((data) => {
          resolve({
            data,
          });
        })
        .catch((error) => {
          reject({
            error,
          });
        });
    });
  }

  if (args?.type === 'FIND_ONE') {
    return new Promise((resolve, reject) => {
      crudService.findOne(args.key)
        .then((data) => {
          resolve({
            data,
          });
        })
        .catch((error) => {
          reject({
            error,
          });
        });
    });
  }

  return Promise.reject({ error: 'Kek' });
};
