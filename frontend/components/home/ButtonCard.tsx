import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Stack } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { buttonCard } from '../../styles/indexStyles';
import Link from 'next/link';

interface Props {
  title: string;
  content: string;
  link: string;
}

const ButtonCard = ({ title, content, link }: Props) => {
  return (
    <Link href={link}>
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
              <Box height="30px" width="30px" component="img" src="/right-arrow.png" />
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default ButtonCard;
