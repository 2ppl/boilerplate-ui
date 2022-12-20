import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';

export type CrudEditPageProps = {
  title: string;
  asyncData: any;
};

export const CrudEditPage: React.FC<React.PropsWithChildren<CrudEditPageProps>> = (props) => {
  const navigate = useNavigate();
  const handleBackClick = useCallback(() => navigate('..'), []);

  if (props.asyncData.error) {
    throw props.asyncData.error;
  }

  return (
    <Box py={3}>
      <Stack spacing={3}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography
            fontSize={28}
            fontWeight={700}
          >
            {props.title}
          </Typography>
          <Button
            variant={'contained'}
            onClick={handleBackClick}
          >
            Back
          </Button>
        </Stack>
        {props.children}
      </Stack>
    </Box>
  );
};
