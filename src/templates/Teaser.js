import useMediaQuery from '@mui/material/useMediaQuery';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import firstImage from "../Assets/img/firstImage.png";
import third from "../Assets/img/third.png";
import second from "../Assets/img/second.png";
import { Typography } from '@mui/material';

export default function TeaserComponent() {
    const matches = useMediaQuery('(max-width:970px)');
    const itemData = [
      {
        img: firstImage,
        title: 'Breakfast',
      },
      {
        img: second,
        title: 'Burger',
      },
      {
        img: third,
        title: 'Camera',
      },]
    return (
        <Grid item xs={12}  sm={6} style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", height: "100%", borderRadius: "20px", margin: "20px 0px", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Grid  xs={12} >
          <ImageList sx={{ width:matches? 300:500, height: 350 }} style={{margin:"auto",marginBottom:"20px",overflow:"hidden"}} cols={3} rowHeight={350}>
            {itemData.map((item) => (
              <ImageListItem key={item.img} style={{width:matches?"100px":"auto"}}>
                <img
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  height="300px"
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
          <Typography  variant="h4"  style={{   margin: "auto", marginBlock: "40px", }} component="h4" color="primary">Track your side effects with <br/> My Nursing Angel</Typography>
          <Typography variant="h5" component="h5">We will change the way you interact with your <br/> doctors, nurses and your pharmacy...</Typography>
        </Grid>
      </Grid>
    );
}