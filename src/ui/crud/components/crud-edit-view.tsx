import React, { FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { pageApi } from '~/page/redux';

export const CrudEditView: FC = () => {
  const { id, ...otherParams } = useParams();

  console.log('CrudEditView params:', id);

  const kekw = pageApi.useFindOneQuery({ key: { id } });

  console.log('Fetching', kekw.isFetching);

  const data: any = kekw?.data;

  return (
    <div>
      <ul>
        <li>
          CRUD EDIT VVVVV {JSON.stringify(kekw?.data)}
        </li>
        <li>ID: {data?.id}</li>
        <li>Name: {data?.name}</li>
        <li>Title: {data?.title}</li>
        <li>Content: {data?.content}</li>
      </ul>
    </div>
  );
};
