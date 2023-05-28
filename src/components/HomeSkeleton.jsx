import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const HomeSkeleton = () => {
  return (  
    <>
      <Box 
        sx={{ 
          width: '100%',
          paddingX: 2,
          marginRight: 0.5,
          '@media(min-width: 375px)': {
            width: 300,
            paddingX: 0
          }
        }}
      >
        <Box sx={{ pt: 0.5 }}>
          <Skeleton width='100%' animation="wave" sx={{ fontSize: '2rem' }} variant='text' />
          <Skeleton animation="wave" sx={{ margin: 'auto', fontSize: '1.5rem' }} width="70%" />
        </Box>
        <Box sx={{ mt: 4 }}>
          <Skeleton animation="wave" width={150} sx={{ fontSize: '2rem', margin: 'auto' }} variant='rounded' />
        </Box>
      </Box>
    </>
  );
}
 
export default HomeSkeleton;