import React, { useRef } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Save } from '@mui/icons-material';
import { Button } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import AngelUser from "../api/angel/user";
import { useSnackbar } from 'notistack';
import { MobileDatePicker } from "@mui/lab";
import MainBar from "../templates/MainBar";
import { useStore } from "../utils/store";
import Translation from "../utils/translation";

import FaceIcon from '@mui/icons-material/Face';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CelebrationIcon from '@mui/icons-material/Celebration';


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

export default function Settings(props) {

  const { session, } = useStore();
  const [userSession,] = React.useState(session.user ? session.user : null);
  const lg = new Translation(userSession ? userSession.lang : 'en');

  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(true);

  const [id, setId] = React.useState(null);
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [sex, setSex] = React.useState('');
  const [lang, setLang] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const defaultAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkp0LF2WgeDkn_sQ1VuMnlnVGjkDvCN4jo2nLMt3b84ry328rg46eohB_JT3WTqOGJovY&usqp=CAU';//process.env.SENDGRID_APIKEY
  const [avatar, setAvatar] = React.useState(defaultAvatar);

  const [address, setAddress] = React.useState('');
  const [streetNumber, setStreetNumber] = React.useState('');
  const [city, setCity] = React.useState('');
  const [zip, setZip] = React.useState('');
  const [country, setCountry] = React.useState('');

  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [active, setActive] = React.useState('N');
  const [switchState, setSwitchState] = React.useState(false);
  const [, setFile] = React.useState(null);
  const uploadFileButton = useRef(null);

  React.useEffect(() => {
    const u = JSON.parse(window.appStorage.getItem('user'));
    async function fetchData() {
      const user = await getUser({ id: u.id });
      setId(user.id);
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setLang(user.lang);
      setEmail(user.email);
      setPhone(user.phone);
      setSex(user.sex);
      setAddress(user.address);
      setStreetNumber(user.street_number);
      setZip(user.zip);
      setCity(user.city);
      setCountry(user.country);
      setDateOfBirth(user.birthday);
      setAvatar(user.avatar ? process.env.REACT_APP_API_URL + '/public/uploads/' + user.avatar : defaultAvatar);
      setActive(user.active);
      if (user.active === 'N') {
        setSwitchState(false);
      } else {
        setSwitchState(true);
      }
    }
    fetchData();
  }, []);
  const getUser = async (o) => {
    const r = await AngelUser().find(o);
    return r;
  }
  const onInputChange = setter => e => {
    setter(e.target.value);
  };
  const handleClickVariant = (variant, text) => {
    enqueueSnackbar(text, { variant });
  };
  const onSubmit = async e => {
    e.preventDefault();
    if (!firstname || !lastname || !email || !phone || !sex) {
      handleClickVariant('error', lg.get('The firstname, lastname, email, phone and sex are required'));
    } else {
      const u = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        sex: sex,
        lang: lang,
        address: address,
        street_number: streetNumber,
        zip: zip,
        city: city,
        country: country,
        birthday: formatDate(dateOfBirth),
        active: active
      };
      if (id) {
        u.id = id;
        try {
          await AngelUser().update(u);
          const ucooky = JSON.parse(window.appStorage.getItem('user'));
          ucooky.avatar = avatar;
          ucooky.firstname = firstname;
          ucooky.lastname = lastname;
          ucooky.email = email;
          ucooky.phone = phone;
          ucooky.sex = sex;
          ucooky.lang = lang;
          ucooky.address = address;
          ucooky.street_number = streetNumber;
          ucooky.zip = zip;
          ucooky.country = country;
          ucooky.birthday = formatDate(dateOfBirth);
          ucooky.active = active;
          window.appStorage.setItem('user', JSON.stringify(ucooky), 1200000);
          handleClickVariant('success', lg.get('User well updated!'));
        } catch (e) {
          handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
        }
      }
    }
  };
  const formatDate = (v) => {
    let d = new Date(v);
    var datestring = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":00";
    return datestring;
  }
  const handleDateOfBirthChange = (newValue) => {
    setDateOfBirth(newValue);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const savePassword = async () => {
    if (password !== null) {
      await AngelUser().resetPwd({ password: password, email: email });
      handleClickVariant('success', lg.get('Password well updated!'));
    }
  }
  const setActif = (e) => {
    setSwitchState(e.target.checked);
    if (e.target.checked) {
      setActive('Y');
    } else {
      setActive('N');
    }
  };
  const onFileChange = async (e) => {
    setFile({ file: e.target.files[0] });
    const u = await AngelUser().upload(e.target.files[0], 'avatar', id);
    handleClickVariant('success', lg.get('Image well uploaded'));
    setAvatar(process.env.REACT_APP_API_URL + '/public/uploads/' + u.filename);
    const user = JSON.parse(window.appStorage.getItem('user'));
    user.avatar = u.filename;
    window.appStorage.setItem('user', JSON.stringify(user), 1200000);
  };
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <MainBar open={setOpen} />
        <Main open={open}>
          <Grid container mb={'0px'} mt={6} >
            <Grid item xs={12} md={6} xl={6} >
              <Typography variant="h6" gutterBottom component="div">
                {lg.get('Personal informations')}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} xl={2} style={{ paddingTop: '42px' }}>
              <Grid item xs={12} style={{ width: '205px', height: '205px', textAlign: "center", border: '3px solid #ddd', borderRadius: '5px', margin: 'auto' }} >
                <Avatar variant="rounded"
                  src={avatar}
                  style={{ width: '200px', height: '200px', textAlign: "center", borderColor: 'gray', margin: 'auto' }}
                />
                <Grid item xs={12} style={{ width: '100%', textAlign: "center" }}>
                  <Button id="avatarLabel" onClick={() => uploadFileButton.current.click()}>{lg.get('Upload photo')}</Button>
                  <input type="file" name="avatar" onChange={onFileChange} ref={uploadFileButton} style={{ display: 'none' }} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={4} >
              <TextField
                label={lg.get('Firstname')}
                id="firstname"
                value={firstname ? firstname : ''}
                onChange={onInputChange(setFirstname)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><FaceIcon /></InputAdornment>,
                }}
              />
              <TextField
                label={lg.get('Lastname')}
                id="lastname"
                value={lastname ? lastname : ''}
                onChange={onInputChange(setLastname)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><FaceIcon /></InputAdornment>,
                }}
              />
              <Box>

                <MobileDatePicker
                  key="birthday"
                  id="birthday"
                  label={lg.get('Birthday')}
                  inputFormat="MM/dd/yyyy"
                  value={dateOfBirth ? dateOfBirth : null}
                  onChange={handleDateOfBirthChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={4}>
              <TextField
                label={lg.get('Phone')}
                id="phone"
                value={phone ? phone : ''}
                onChange={onInputChange(setPhone)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><PhoneIphoneIcon /></InputAdornment>,
                }}
              />
              <TextField
                label="Email"
                id="outlined-start-adornment"

                value={email ? email : ''}
                onChange={onInputChange(setEmail)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                }}
              />
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <FormControl >
                    <InputLabel id="langLabel">{lg.get('Lang')}</InputLabel>
                    <Select
                      style={{ display: 'flex', width: '100%' }}
                      labelId="langLabel"
                      id="lang"
                      value={lang ? lang : ''}
                      onChange={onInputChange(setLang)}
                      label={lg.get('Lang')}>
                      <MenuItem value={'fr'}>Francais</MenuItem>
                      <MenuItem value={'en'}>English</MenuItem>
                      <MenuItem value={'de'}>Dutch</MenuItem>
                      <MenuItem value={'ar'}>Arabic</MenuItem>
                      <MenuItem value={'nl'}>Nederlands</MenuItem>
                      <MenuItem value={'es'}>Spanish</MenuItem>
                      <MenuItem value={'pl'}>Polsky</MenuItem>
                      <MenuItem value={'it'}>Italian</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id="sexLabel">{lg.get('Sex')}</InputLabel>
                    <Select
                      style={{ display: 'flex', width: '100%' }}
                      labelId="sexLabel"
                      id="sex"
                      value={sex ? sex : ''}
                      onChange={onInputChange(setSex)}
                      label="Sex" >
                      <MenuItem value={'M'}>{lg.get("Male")}</MenuItem>
                      <MenuItem value={'F'}>{lg.get("Femal")}</MenuItem>
                      <MenuItem value={'B'}>{lg.get("Both")}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={4}  >
              <Typography variant="h6" gutterBottom component="div">
                {lg.get('Address')}
              </Typography>

              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <TextField
                    label={lg.get('Address')}
                    id="address"

                    value={address ? address : ''}
                    onChange={onInputChange(setAddress)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><FmdGoodIcon /></InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label={lg.get('Number')}
                    id="number"
                    value={streetNumber ? streetNumber : ''}
                    onChange={onInputChange(setStreetNumber)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><FmdGoodIcon /></InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={7}>
                  <TextField
                    label={lg.get('City')}
                    id="city"
                    value={city ? city : ''}
                    onChange={onInputChange(setCity)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><FmdGoodIcon /></InputAdornment>,
                    }} />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    label={lg.get('Zip')}
                    id="zip"
                    value={zip ? zip : ''}
                    onChange={onInputChange(setZip)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><FmdGoodIcon /></InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>
              <FormControl fullWidth >
                <InputLabel id="langLabel">{lg.get('Country')}</InputLabel>
                <Select
                  style={{ display: 'flex', width: '100%' }}
                  labelId="countryLabel"
                  id="country"
                  value={country ? country : ''}
                  onChange={onInputChange(setCountry)}
                  label={lg.get('Country')}>
                  <MenuItem value={'belgium'}>Belgium</MenuItem>
                  <MenuItem value={'luxembourg'}>Luxembourg</MenuItem>
                  <MenuItem value={'espagne'}>Espagne</MenuItem>
                  <MenuItem value={'hollande'}>Hollande</MenuItem>
                  <MenuItem value={'italie'}>Italie</MenuItem>
                  <MenuItem value={'france'}>France</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={4}>
              <Typography variant="h6" mt={'8px'}>
                {lg.get('Password and activation')}
              </Typography>
              <FormControlLabel style={{ marginTop: '18px' }} control={<Switch checked={switchState} onChange={setActif} value={active} />} label={lg.get('Actif')} size="large" />
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <FormControl fullWidth variant="outlined" style={{ marginTop: '19px' }}>
                    <InputLabel htmlFor="outlined-adornment-password">{lg.get('Change password')}</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      onChange={onInputChange(setPassword)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label={lg.get('Change password')}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4} mt={'25px'}>
                  <Button

                    style={{ borderRadius: '10px', marginLeft: '10px' }}
                    variant="outlined" startIcon={<Save />}
                    onClick={savePassword}>
                    {lg.get('Save')}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom component="div">
                &nbsp;
              </Typography>
              <Button
                style={{ borderRadius: '10px', marginTop: '10px' }}
                variant="outlined" startIcon={<Save />}
                onClick={onSubmit}>
                {lg.get('Save')}
              </Button>
            </Grid>
          </Grid>
        </Main>
      </Box>
    </>
  );
}
