import React from 'react';
import {
  Crud,
  CrudCreate,
  CrudEdit,
  CrudEditView,
  CrudIndex,
  CrudIndexList,
} from '~/ui/crud/components';

export const PageCrud: React.FC = () => (
  <Crud
    index={(
      <CrudIndex
        title={'Hello lol'}
        afterTitle={'asd'}
        filters={(
          <div style={{ border: '10px solid red' }}>
            FILTERS
          </div>
        )}
      >
        {/*<div style={{ border: '10px solid green' }}>*/}
          <CrudIndexList
            columns={[
              {
                field: 'name',
                flex: 1,
              },
              {
                field: 'title',
                flex: 1,
              },
            ]}
          />
        {/*</div>*/}
      </CrudIndex>
    )}
    edit={(
      <CrudEdit title={'Edit'} asyncData={1}>
        <div style={{ border: '10px solid black' }}>
          <CrudEditView/>
        </div>
      </CrudEdit>
    )}
    create={(
      <CrudCreate title={'Create kek'}>
        <div style={{ border: '10px solid blue' }}>
          CREATOR
        </div>
      </CrudCreate>
    )}
  />
);
