import { Box, CardActionArea, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { buttonCard } from '../styles/indexStyles';

interface Props {
  title: string;
  content: string;
  onClick: () => void;
}

const ButtonCard = ({ title, content, onClick }: Props) => {
  return (
    <Card sx={buttonCard} onClick={onClick}>
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
  );
};

export default ButtonCard;
