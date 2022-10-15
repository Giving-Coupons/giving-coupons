import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Stack } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { buttonCard } from '../styles/indexStyles';
import Image from 'next/image';

const ButtonCard = ({ title, content }: Props) => {
  return (
    <Card sx={buttonCard}>
      <CardActionArea>
        <CardContent>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Box>
              <Typography gutterBottom variant="h2" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight="500">
                {content}
              </Typography>
            </Box>
            <Box height="30px" width="30px">
              <Image src="/right-arrow.png" layout="responsive" height="30px" width="30px" />
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ButtonCard;
