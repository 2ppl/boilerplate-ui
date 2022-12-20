import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';

export type CrudCreateProps = {
  title: string;
};

export const CrudCreate: React.FC<React.PropsWithChildren<CrudCreateProps>> = (props) => {
  const navigate = useNavigate();
  const handleBackClick = useCallback(() => navigate('..'), []);

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
