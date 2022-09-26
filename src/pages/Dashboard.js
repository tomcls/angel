import React from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Bar from "../templates/Bar";
import AngelDashboard from '../api/angel/dashboard';
import { SnackbarProvider } from 'notistack';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import Chart from 'react-apexcharts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AngelSurvey from "../api/angel/survey";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

export default function Dashboard(props) {

  const [open, setOpen] = React.useState(true);
  const [series, setSeries] = React.useState([{
    name: 'series-1',
    data: []
  }]);
  const [options, setOptions] = React.useState({
    chart: {
      id: 'apexchart-example'
    },
    xaxis: {
      categories: []
    }
  });
  const [seriesChartMoods, setSeriesChartMoods] = React.useState([
    {
      name: "health",
      type: "column",
      data: [2,2]
    },
    {
      name: "Life quality",
      type: "column",
      data: [2,2]
    },
    {
      name: "Concentration",
      type: "column",
      data: [2,2]
    },
    {
      name: "Appetite",
      type: "column",
      data: [2,2]
    },
    {
      name: "aaaa",
      type: "column",
      data: [2,2]
    }
  ]);
  const [optionsChartMoods, setOptionsChartMoods] = React.useState({
    chart: {
      id: "basic-bar",
      toolbar: {
        show: true
      }
    },
    xaxis: {
      categories: ["2022-06-10","2022-06-11"]
    },
    markers: {
      size: 6,
      strokeWidth: 3,
      fillOpacity: 0,
      strokeOpacity: 0,
      hover: {
        size: 8
      }
    },
    yaxis: {
      tickAmount: 5,
      min: 0,
      max: 5
    },
    plotOptions: {
      bar: {
        columnWidth: "20%"
      }
    }
  });
  React.useEffect(() => {
    async function fetchData() {
      const m = await getMoods();
      
      const s = [];
      const x = [];
      for (let i = 0; i < m.length; i++) {
        s.push(m[i].score)
        x.push(m[i].name)
      }
      setOptions({
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: x
        }
      })
      setSeries([{
        name: 'series-1',
        data: s
      }]);
     /* const a = seriesChartMoods;
      const xAxis = [];
      for (let i = 0; i < records.length; i++) {
        xAxis.push(records[i][0]);
      }
      
      o.xaxis.categories = xAxis;
      setOptionsChartMoods(o);*/
      
    }
    fetchData();
    getSurveyMoods();
    
  }, [optionsChartMoods]);
  const getSurveyMoods = async () => {
    const r = await AngelSurvey().moods({ lang_id: 'en', patient_id: 2 });
    const columns = ['date_created', 'patient'];
      //  Set HeadCells
      if (r.moods && r.moods.length) {
        for (let i = 0; i < r.moods.length; i++) {
          columns.push(r.moods[i].name);
          /*hc.push({
            id: r.moods[i].id,
            numeric: false,
            disablePadding: false,
            label: r.moods[i].name,
          });*/
        }
       // setColumns(columns);
       // setHeadCells(hc);
      }

      const records = [];
      for (let d = 0; d < r.dates.length; d++) {

        for (let u = 0; u < r.patients.length; u++) {
          const rec = addSurveyItem(r.dates[d].date, r.patients[u].patient_id, r.surveys, columns);
          records.push(rec);
        }
      }
      
    console.log(records)
    const o = optionsChartMoods;
    console.log(o)
    const xAxis = [];
    const series = [];
    for (let i = 0; i < records.length; i++) {
      xAxis.push(records[i][0]);
    }
    let itemsCount = records[0].length;
    for (let i = 2;i < itemsCount; i++ ){
      let b = {name: columns[i], type:'column',data:[]}
      for (let r = 0; r < records.length; r++) {
        b.data.push(records[r][i]);
      }
      series.push(b);
    }
   // setSeriesChartMoods(series);
    o.xaxis.categories = xAxis;
    console.log(series,o)
    console.log(o);
    setSeriesChartMoods(series)
    setOptionsChartMoods(o);
  }
  const getMoods = async () => {
    const r = await AngelDashboard().moods({});
    return r.moods;
  }
  const addSurveyItem = (date, patient_id, surveys, columns) => {
    const rec = [];
    for (let j = 0; j < surveys.length; j++) {

      if (surveys[j].date_created === date && surveys[j].patient_id === patient_id) {
        // add patient date and name if not yet added to record
        if (rec.length === 0) {
          rec.push(surveys[j].date_created);
          rec.push({name:surveys[j].firstname.substring(0,2) + '. ' + surveys[j].lastname, avatar:surveys[j].avatar});
          /*for (let i = 2; i < columns.length; i++) {
            rec.push(0);
            console.log("aaa")
          }*/
        }
        let moodPosition = columns.indexOf(surveys[j].name);
        if (moodPosition > rec.length - 1) {
          rec.push(surveys[j].score);
        } else {
          rec.splice(moodPosition, 0, surveys[j].score);
        }
      }
    }
    return rec;
  }
  return (
    <SnackbarProvider maxSnack={3}>
      <Box sx={{ display: 'flex' }}>
        <Bar open={setOpen} />
        <Main open={open} style={{ background: "rgb(229 229 229 / 41%)", marginBlock: "64px" }}>
          <Grid container spacing={2} mb={'0px'} >
            <Grid item xs={12} md={6} xl={6} >
              <Typography variant="h6" component="div" >
                Dashboard
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} xl={6} textAlign={'end'}  >

            </Grid>
          </Grid>
          <Grid container spacing={2} mb={'0px'} >
            <Grid item xs={12} md={3} xl={3} >
              <Card sx={{ display: 'flex' }}>
                <CardContent  sx={{ display: 'flex',flexDirection:'row', justifyContent:'space-around',paddingBottom:'0px',marginBottom:'0px' }}>
                <SupervisedUserCircleIcon color="primary" sx={{ fontSize: 50 }} />
                  <Typography   mt={2} sx={{ fontWeight: 'bold', justifyContent:'space-around' }}>
                    New users
                  </Typography>
                  <Typography   mt={2} sx={{ fontWeight: 'bold', justifyContent:'space-around',alignItems:'flex-end',alignContent:'end', marginLeft:'5px', fontSize:'40px',marginTop: '0px' }}>
                    5
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3} xl={3} >
              <Card sx={{ display: 'flex' }}>
                <CardContent  sx={{ display: 'flex',flexDirection:'row', justifyContent:'space-around',paddingBottom:'0px',marginBottom:'0px' }}>
                <QueryStatsIcon color="primary" sx={{ fontSize: 50 }} />
                  <Typography   mt={2} sx={{ fontWeight: 'bold', justifyContent:'space-around' }}>
                    Data of the week
                  </Typography>
                  <Typography   mt={2} sx={{ fontWeight: 'bold', justifyContent:'space-around',alignItems:'flex-end',alignContent:'end', marginLeft:'5px', fontSize:'40px',marginTop: '0px' }}>
                    5
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3} xl={3} >
              <Card sx={{ display: 'flex' }}>
                <CardContent  sx={{ display: 'flex',flexDirection:'row', justifyContent:'space-around',paddingBottom:'0px',marginBottom:'0px' }}>
                <CheckCircleIcon color="primary" sx={{ fontSize: 50 }} />
                  <Typography   mt={2} sx={{ fontWeight: 'bold', justifyContent:'space-around' }}>
                    Patients to check
                  </Typography>
                  <Typography   mt={2} sx={{ fontWeight: 'bold', justifyContent:'space-around',alignItems:'flex-end',alignContent:'end', marginLeft:'5px', fontSize:'40px',marginTop: '0px' }}>
                    5
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3} xl={3} >
              <Card sx={{ display: 'flex' }}>
                <CardContent  sx={{ display: 'flex',flexDirection:'row', justifyContent:'space-around',paddingBottom:'0px',marginBottom:'0px' }}>
                <CircleNotificationsIcon color="primary" sx={{ fontSize: 50 }} />
                  <Typography   mt={2} sx={{ fontWeight: 'bold', justifyContent:'space-around' }}>
                    New notifications
                  </Typography>
                  <Typography   mt={2} sx={{ fontWeight: 'bold', justifyContent:'space-around',alignItems:'flex-end',alignContent:'end', marginLeft:'5px', fontSize:'40px',marginTop: '0px' }}>
                    5
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Box sx={{ width: '100%' }} mt={2}>
            <Typography variant="h6" component="div" style={{ color: 'grey', fontSize: '14px' }} >
              Moods in general
            </Typography>
            <Chart options={options} series={series} type="bar" width={1000} height={320} />
            <Typography variant="h6" component="div" style={{ color: 'grey', fontSize: '14px' }} >
              Mila Claessens moods
            </Typography>
            <Chart
              options={optionsChartMoods}
              series={seriesChartMoods}
              type="bar"
              width="1000"
            />
          </Box>
        </Main>
      </Box>
    </SnackbarProvider>
  );
}
