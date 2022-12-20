import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';

export type CrudIndexProps = {
  title: string;
  afterTitle?: React.ReactNode;
  filters?: JSX.Element;
  list?: JSX.Element;
};

export const CrudIndex: React.FC<CrudIndexProps> = (props) => {
  const navigate = useNavigate();
  const handleCreateClick = useCallback(() => navigate('create'), []);

  return (
    <Box py={3}>
      <Stack spacing={3}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Stack
            direction={'row'}
            alignItems={'center'}
            spacing={2}
          >
            <Typography
              fontSize={28}
              fontWeight={700}
            >
              {props.title}
            </Typography>
            {props.afterTitle && (
              <div>
                {props.afterTitle}
              </div>
            )}
          </Stack>
          <Button
            variant={'contained'}
            onClick={handleCreateClick}
          >
            Add
          </Button>
        </Stack>
        {props.filters && (
          <div>
            {props.filters}
          </div>
        )}
        {props.list && (
          <div>
            {props.list}
          </div>
        )}
      </Stack>
    </Box>
  );
};
