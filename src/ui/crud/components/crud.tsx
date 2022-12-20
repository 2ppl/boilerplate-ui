import React from 'react';
import { Route, Routes } from 'react-router-dom';

export type CrudProps = {
  index: JSX.Element;
  edit: JSX.Element;
  create: JSX.Element;
};

export const Crud: React.FC<CrudProps> = (props) => (
  <Routes>
    <Route path={'/'} element={props.index}/>
    <Route path={'/create'} element={props.create}/>
    <Route path={'/:id'} element={props.edit}/>
  </Routes>
);
