import  React, { useContext, useRef } from 'react';
import AngelUser from '../api/angel/user';
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
import { useSnackbar } from 'notistack';
import PlaceIcon from '@mui/icons-material/Place';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FaceIcon from '@mui/icons-material/Face';
import { MobileDatePicker } from '@mui/lab';
import { useTranslation } from '../hooks/userTranslation';
import AppContext from '../contexts/AppContext';

export default function CoordinatorContainer(props) {

    const { enqueueSnackbar } = useSnackbar();

    const appContext = useContext(AppContext);
    const [userSession,] = React.useState(appContext.appState.user);
    const [lg] = useTranslation(userSession ? userSession.lang : 'en');

    const [id, setId] = React.useState(null);
    const [coordinatorId, setCoordinatorId] = React.useState(null);
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

    const [laboratoryId, setLaboratoryId] = React.useState(() => '');
    const [, setLaboratoryName] = React.useState(() => '');


    const [active, setActive] = React.useState('N');
    const [role, setRole] = React.useState('V');
    const [switchState, setSwitchState] = React.useState(false);
    const [switchAdmin, setSwitchAdmin] = React.useState(false);
    
    const [, setFile] = React.useState(null);
    const uploadFileButton = useRef(null);


    React.useEffect(() => {
        if (props.userId) {
            async function fetchData() {
                const user = await AngelUser().find({ user_id: props.userId });
                setId(user.id);
                setCoordinatorId(user.coordinator_id);
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
                setAvatar(user.avatar);
                setLaboratoryId(user.laboratory_id);
                setLaboratoryName(user.name);
                setAvatar(user.avatar?process.env.REACT_APP_API_URL+'/public/uploads/'+user.avatar:defaultAvatar);
                setActive(user.active);
                setRole(user.role)
                if (user.role === 'V') {
                    setSwitchAdmin(false);
                } else {
                    setSwitchAdmin(true);
                }
                if (user.active === 'N') {
                    setSwitchState(false);
                } else {
                    setSwitchState(true);
                }
            }
            fetchData();
        }
    }, []);

    const onInputChange = setter => e => {
        setter(e.target.value);
    };
    const handleClickVariant = (variant, text) => {
        // variant could be success, error, warning, info, or default
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
                birthday: dateOfBirth ? formatDate(dateOfBirth): null,
                active: active,
                role: role
            };
            if (id) {
                u.id = id;
                try {
                    await AngelUser().update(u);
                    await setCoordinator();
                    handleClickVariant('success', lg.get('User well updated!'));
                } catch (e) {
                    handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
                }
            } else {
                try {
                    const user = await AngelUser().add(u);
                    setId(user.inserted_id)
                    await setCoordinator(user.inserted_id);
                    handleClickVariant('success', lg.get('User well added!'));
                } catch (e) {
                    handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
                }
            }
        }
    };
    const setCoordinator = async (userId) => {

        const u = {
            user_id: userId ? userId : id,
            laboratory_id: laboratoryId ? laboratoryId : null
        };
        if (coordinatorId) {
            u.id = coordinatorId;
            try {
                await AngelUser().update(u);
            } catch (e) {
                handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
            }
        } else {
            try {
                const p = await AngelUser().add(u);
                setCoordinatorId(p.inserted_id);
            } catch (e) {
                handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
            }
        }
    }
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
    const setAdministrator = (e) => {
        setSwitchAdmin(e.target.checked);
        if (e.target.checked) {
            setRole('A');
        } else {
            setRole('V');
        }
    };
    const setActif = (e) => {
        setSwitchState(e.target.checked);
        if (e.target.checked) {
            setActive('Y');
        } else {
            setActive('N');
        }
    };

    const onFileChange = async (e) => {
        setFile({file:e.target.files[0]});
        const u = await AngelUser().upload(e.target.files[0], 'avatar',id);
        setAvatar(process.env.REACT_APP_API_URL+'/public/uploads/'+u.filename);
        handleClickVariant('success', lg.get('Image well uploaded'));
    };
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} xl={2} style={{ paddingTop: '15px' }}>
                       <Grid item xs={12} style={{  width: '205px', height: '205px', textAlign: "center", border: '3px solid #ddd', borderRadius: '5px', margin: 'auto' }} >

                            <Avatar variant="rounded"
                                src={avatar}
                                style={{ width: '200px', height: '200px', textAlign: "center", borderColor: 'gray', margin: 'auto' }}
                            />
                            <Grid item xs={12} style={{ width: '100%', textAlign: "center" }}>
                                <Button id="avatarLabel" onClick={() => uploadFileButton.current.click()}>{lg.get('Upload photo')}</Button>
                                <input type="file" name="avatar" onChange={onFileChange} ref={uploadFileButton} style={{display: 'none'}}/>
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
                                startAdornment: <FaceIcon position="start"><Visibility /></FaceIcon>,
                            }}
                        />
                        <TextField
                            label={lg.get('Lastname')}
                            id="lastname"
                            value={lastname ? lastname : ''}
                            onChange={onInputChange(setLastname)}
                            InputProps={{
                                startAdornment: <FaceIcon position="start"><Visibility /></FaceIcon>,
                            }}
                        />
                        <Box >
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
                            label="Phone number"
                            id={lg.get('Phone')}
                            value={phone ? phone : ''}
                            onChange={onInputChange(setPhone)}
                            InputProps={{
                                startAdornment: <LocalPhoneIcon position="start"><Visibility /></LocalPhoneIcon>,
                            }}
                        />
                        <TextField
                            label="Email"
                            id="outlined-start-adornment"
                            value={email ? email : ''}
                            onChange={onInputChange(setEmail)}
                            InputProps={{
                                startAdornment: <EmailIcon position="start"><Visibility /></EmailIcon>,
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
                                        startAdornment: <PlaceIcon position="start"><Visibility /></PlaceIcon>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label={lg.get('Number')}
                                    id="number"

                                    value={streetNumber ? streetNumber : ''}
                                    onChange={onInputChange(setStreetNumber)}
                                   
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
                                        startAdornment: <PlaceIcon position="start"><Visibility /></PlaceIcon>,
                                    }} />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    label={lg.get('Zip')}
                                    id="zip"

                                    value={zip ? zip : ''}
                                    onChange={onInputChange(setZip)}
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
                        <Typography variant="h6" mt={'20px'}>
                        {lg.get('Is administrator ?')}
                        </Typography>
                        <FormControlLabel control={<Switch checked={switchAdmin} onChange={setAdministrator} value={active} />} label="Administrator" size="large" />
                        <Typography variant="h6" mt={'20px'}>
                        {lg.get('Password and activation')}
                        </Typography>
                        <FormControlLabel control={<Switch checked={switchState} onChange={setActif} value={active} />} label="Actif" size="large" />
                        <Grid container spacing={1}>
                            <Grid item xs={8}>
                                <FormControl fullWidth variant="outlined" style={{ marginTop: '12px' }}>
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
                                        label="Change password"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4} mt={'20px'}>
                                <Button

                                    style={{ borderRadius: '10px', marginLeft: '10px' }}
                                    variant="outlined" startIcon={<Save />}
                                    onClick={savePassword}>
                                    {lg.get('Save')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            <Grid container spacing={2}>
                <Grid container mt={'25px'}>
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
            </Box>
        </>
    );
}
