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
          '@media(min-width: 375px)': {
            width: '100%',
            paddingX: 0
          }
        }}
      >
        <Box sx={{ pt: 0.5 }}>
          <Skeleton 
            sx={{
              fontSize: '2rem',
              marginX: 'auto',
              '@media(max-width: 767px)': {
                width: '100%'
              },
              width: '80%'
            }} 
            animation="wave" 
            variant='text' 
          />
          <Skeleton 
            animation="wave" 
            sx={{
              fontSize: '1.5rem',
              marginX: 'auto',
              '@media(max-width: 767px)': {
                width: '70%'
              },
              width: '60%'
            }} 
          />
          <Skeleton 
            animation="wave" 
            sx={{
              fontSize: '1.5rem',
              marginX: 'auto',
              '@media(max-width: 767px)': {
                width: '70%'
              },
              width: '60%'
            }} 
          />
        </Box>
        <Grid px={2} container wrap="wrap">
          {Array.from(new Array(3)).map((_, index) => (
            <Box 
              key={index} 
              sx={{  
                marginRight: 0.5, 
                my: 5,
                '@media(max-width: 767px)': {
                  width: '100%',
                  height: 200,
                  my: 6
                },
                '&:last-child': {
                  marginRight: 0
                },
                width: 210
              }}
            >
              <Skeleton variant="rectangular" className='img-size' />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
                <Skeleton width="60%" />
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </>
  );
}
 
export default HomeSkeleton;