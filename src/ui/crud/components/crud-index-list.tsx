import React, { FC, useCallback } from 'react';
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowParams,
  GridSortModel,
} from '@mui/x-data-grid';
import { Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { pageApi } from '~/page/redux';
import { CrudFindAllQuery } from '@2ppl/core/crud';

const defaultRowsPerPageOptions = [2, 10, 20, 50];
const defaultResult = { list: [], total: 0 };

export type CrudIndexListProps = {
  columns: GridColumns;
};

type SearchData = {
  page?: string;
  size?: string;
  sort?: string;
  direction?: 'asc' | 'desc';
};

export const CrudIndexList: FC<CrudIndexListProps> = (props) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchData: SearchData = {};

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line no-restricted-syntax
  for (const a of searchParams.keys()) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    searchData[a] = searchParams.get(a);
  }

  const {
    page = 1,
    size = defaultRowsPerPageOptions[0],
    sort,
    direction,
    ...otherData
  } = searchData;

  const query: CrudFindAllQuery = {
    limit: Number(size),
    offset: (Number(page) - 1) * Number(size),
  };

  if (sort && direction) {
    query.order = {
      field: String(sort),
      direction: direction === 'asc' ? 'asc' : 'desc',
    };
  }

  console.log('CrudIndexList query:', query);

  const kekw = pageApi.useFindAllQuery({ query });

  console.log('kekw', kekw);

  const setPage = (newPage: number) => setSearchParams({
    ...searchData,
    page: String(newPage + 1),
  });

  const setPageSize = (newPageSize: number) => setSearchParams({
    ...searchData,
    size: String(newPageSize),
  });

  const setSortModel = (newSortModel: GridSortModel) => {
    if (newSortModel.length) {
      setSearchParams({
        ...searchData,
        page: '1',
        sort: String(newSortModel[0].field),
        direction: String(newSortModel[0].sort),
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { sort: _sort, direction: _direction, ...other } = searchData;
      setSearchParams({ ...other, page: '1' });
    }
  };

  const sortModel = sort ? [{ field: sort, sort: direction }] : [];

  const getActions = useCallback((params: GridRowParams) => [
    <GridActionsCellItem
      icon={<EditIcon/>}
      onClick={() => navigate(`${params.id}`)}
      label={'Edit'}
      showInMenu={false}
    />,
  ], [navigate]);

  const columns = [
    ...props.columns,
    {
      field: 'actions',
      type: 'actions',
      width: 50,
      getActions,
    },
  ];

  const result: any = kekw?.data ?? defaultResult;

  const loading = kekw.isFetching;

  return (
    <Box
      sx={(theme) => ({
        background: theme.palette.background.paper,
        borderRadius: 1,
      })}
    >
      <DataGrid
        autoHeight
        disableColumnMenu
        disableDensitySelector
        disableColumnSelector
        disableSelectionOnClick
        paginationMode={'server'}
        sortingMode={'server'}
        columns={columns}
        loading={loading}
        rowsPerPageOptions={defaultRowsPerPageOptions}
        rows={result.list}
        rowCount={result.total}
        page={Number(page) - 1}
        pageSize={Number(size)}
        sortModel={sortModel}
        onPageChange={(a) => !loading && setPage(a)}
        onPageSizeChange={(a) => !loading && setPageSize(a)}
        onSortModelChange={(a) => !loading && setSortModel(a)}
      />
    </Box>
  );
};
