import React from 'react';
import { Crud, CrudCreate, CrudEditPage, CrudIndex } from '~/ui/crud';

export const PageCrud: React.FC = () => (
  <Crud
    index={(
      <CrudIndex
        title={'Hello lol'}
        afterTitle={'asd'}
        filters={(
          <div>
            FILTERS
          </div>
        )}
        list={(
          <div>
            LIST
          </div>
        )}
      />
    )}
    edit={(
      <CrudEditPage title={'Edit jke'} asyncData={1}>
        <div>
          EEEEEDIT
        </div>
      </CrudEditPage>
    )}
    create={(
      <CrudCreate title={'Create kek'}>
        <div>
          CREATOR
        </div>
      </CrudCreate>
    )}
  />
);
