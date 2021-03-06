import  React , { useRef } from 'react';
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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Save } from '@mui/icons-material';
import { Button } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSnackbar } from 'notistack';
import AngelPatient from '../api/angel/patient';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function PatientContainer(props) {

    const { enqueueSnackbar } = useSnackbar();

    const [id, setId] = React.useState(null);
    const [patientId, setPatientId] = React.useState(null);
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [sex, setSex] = React.useState('');
    const [lang, setLang] = React.useState('');
    const [closeMonitoring, setCloseMonitoring] = React.useState('');
    const [dateOfBirth, setDateOfBirth] = React.useState('');
    const [emergencyContactName, setEmergencyContactName] = React.useState('');
    const [emergencyContactRelationship, setEmergencyContactRelationship] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [emergencyContactPhone, setEmergencyContactPhone] = React.useState('');
    const defaultAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkp0LF2WgeDkn_sQ1VuMnlnVGjkDvCN4jo2nLMt3b84ry328rg46eohB_JT3WTqOGJovY&usqp=CAU';//process.env.SENDGRID_APIKEY
    const [avatar, setAvatar] = React.useState(defaultAvatar);

    const [address, setAddress] = React.useState('');
    const [streetNumber, setStreetNumber] = React.useState('');
    const [city, setCity] = React.useState('');
    const [zip, setZip] = React.useState('');
    const [country, setCountry] = React.useState('');

    const [password,setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [active, setActive] = React.useState('N');
    const [switchState, setSwitchState] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const uploadFileButton = useRef(null);

    React.useEffect(() => {
        console.log('Patient page')
        if (props.userId) {
            async function fetchData() {
                const user = await AngelPatient().find({ user_id: props.userId });
                setId(user.user_id);
                setPatientId(user.patient_id);
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
                setCloseMonitoring(user.close_monitoring);
                setEmergencyContactName(user.emergency_contact_name);
                setEmergencyContactPhone(user.emergency_contact_phone);
                setEmergencyContactRelationship(user.emergency_contact_relationship);
                setAvatar(user.avatar?process.env.REACT_APP_API_URL+'/public/uploads/'+user.avatar:defaultAvatar);
                setActive(user.active);
                if(user.active === 'N') {
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
            handleClickVariant('error', 'The firstname, lastname, email, phone and sex are required');
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
                close_monitoring: closeMonitoring,
                emergency_contact_name: emergencyContactName,
                emergency_contact_phone: emergencyContactPhone,
                emergency_contact_relationship: emergencyContactRelationship,
                active: active
            };
            if (id) {
                u.id = id;
                try {
                    const user = await AngelUser().update(u);
                    await setPatient();
                    handleClickVariant('success', 'User well updated');
                } catch (e) {
                    handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
                }
            } else {
                try {
                    const user = await AngelUser().add(u);
                    setId(user.inserted_id)
                    await setPatient(user.inserted_id);
                    handleClickVariant('success', 'User well added');
                } catch (e) {
                    handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
                }
            }
        }
    };
    const setPatient = async (userId) => {

        const u = {
            user_id: userId ? userId : id,
            close_monitoring: closeMonitoring,
            emergency_contact_name: emergencyContactName,
            emergency_contact_phone: emergencyContactPhone,
            emergency_contact_relationship: emergencyContactRelationship
        };
        if (patientId) {
            u.id = patientId;
            try {
                await AngelPatient().update(u);
            } catch (e) {
                handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
            }
        } else {
            try {
                const p = await AngelPatient().add(u);
                setPatientId(p.inserted_id);
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
        console.log(newValue)
        setDateOfBirth(newValue);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const savePassword = async () => {
        if(password !== null) {
            const r = await AngelUser().resetPwd({password: password, email: email});
            handleClickVariant('success', 'Password well updated!');
        }
    }
    const setActif = (e) => {
       setSwitchState(e.target.checked);
       if(e.target.checked) {
           setActive('Y');
       } else {
            setActive('N');
       }
    };
    const onFileChange = async (e) => {
        setFile({file:e.target.files[0]});
        const u = await AngelUser().upload(e.target.files[0], 'avatar',id);
        setAvatar(process.env.REACT_APP_API_URL+'/public/uploads/'+u.filename);
        handleClickVariant('success', 'Image well uploaded');
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>

            <Box sx={{ width: '100%' }}>
                <Typography variant="h6" gutterBottom component="div">
                    Personal informations
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} xl={2} style={{ paddingTop: '40px' }}>
                        <Grid item xs={12} style={{ width: '205px', height: '205px', textAlign: "center", border: '3px solid #ddd', borderRadius: '5px', margin: 'auto' }} >
                            <Avatar variant="rounded"
                                src={avatar}
                                style={{ width: '200px', height: '200px', textAlign: "center", borderColor: 'gray', margin: 'auto' }}
                            />
                            <Grid item xs={12} style={{ width: '100%', textAlign: "center" }}>
                                <Button id="avatarLabel" onClick={() => uploadFileButton.current.click()}>Upload photo</Button>
                                <input type="file" name="avatar" onChange={onFileChange} ref={uploadFileButton} style={{display: 'none'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} xl={4} >
                        <TextField
                            label="Firstname"
                            id="firstname"
                            value={firstname ? firstname : ''}
                            onChange={onInputChange(setFirstname)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                            }}
                        />
                        <TextField
                            label="Lastname"
                            id="lastname"
                            value={lastname ? lastname : ''}
                            onChange={onInputChange(setLastname)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                            }}
                        />
                        <Box>
                            <DateTimePicker
                                style={{ display: 'flex', width: '100%', minWidth: '100%' }}
                                id="birthday"
                                label="Date of birth"
                                value={dateOfBirth ? dateOfBirth : ''}
                                onChange={handleDateOfBirthChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} xl={4}>
                        <TextField
                            label="Phone number"
                            id="phone"
                            value={phone ? phone : ''}
                            onChange={onInputChange(setPhone)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                            }}
                        />
                        <TextField
                            label="Email"
                            id="outlined-start-adornment"

                            value={email ? email : ''}
                            onChange={onInputChange(setEmail)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                            }}
                        />
                        <Grid container spacing={1}>
                            <Grid item xs={8}>
                                <FormControl >
                                    <InputLabel id="langLabel">Mother tong</InputLabel>
                                    <Select
                                        style={{ display: 'flex', width: '100%' }}
                                        labelId="langLabel"
                                        id="lang"
                                        value={lang ? lang : ''}
                                        onChange={onInputChange(setLang)}
                                        label="Close monitoring?">
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
                                    <InputLabel id="sexLabel">Sex</InputLabel>
                                    <Select
                                        style={{ display: 'flex', width: '100%' }}
                                        labelId="sexLabel"
                                        id="sex"
                                        value={sex ? sex : ''}
                                        onChange={onInputChange(setSex)}
                                        label="Sex" >
                                        <MenuItem value={'M'}>Male</MenuItem>
                                        <MenuItem value={'F'}>Femal</MenuItem>
                                        <MenuItem value={'B'}>Both</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} xl={4}  >
                        <Typography variant="h6" gutterBottom component="div">
                            Address
                        </Typography>

                        <Grid container spacing={1}>
                            <Grid item xs={8}>
                                <TextField
                                    label=" Address"
                                    id="address"

                                    value={address ? address : ''}
                                    onChange={onInputChange(setAddress)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Number"
                                    id="number"

                                    value={streetNumber ? streetNumber : ''}
                                    onChange={onInputChange(setStreetNumber)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={7}>
                                <TextField
                                    label="City"
                                    id="city"

                                    value={city ? city : ''}
                                    onChange={onInputChange(setCity)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                                    }} />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    label="Code postal"
                                    id="zip"

                                    value={zip ? zip : ''}
                                    onChange={onInputChange(setZip)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <FormControl fullWidth >
                            <InputLabel id="langLabel">Pays</InputLabel>
                            <Select
                                style={{ display: 'flex', width: '100%' }}
                                labelId="countryLabel"
                                id="country"
                                value={country ? country : ''}
                                onChange={onInputChange(setCountry)}
                                label="Country">
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
                        <Typography variant="h6" gutterBottom component="div">
                            Emergency info
                        </Typography>

                        <TextField
                            label="Emergency contact phone number"
                            id="emergencyPhone"

                            value={emergencyContactPhone ? emergencyContactPhone : ''}
                            onChange={onInputChange(setEmergencyContactPhone)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                            }}
                        />
                        <TextField
                            label="Emergency contact name"
                            id="emergencyName"

                            value={emergencyContactName ? emergencyContactName : ''}
                            onChange={onInputChange(setEmergencyContactName)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                            }}
                        />
                        <TextField
                            label="Emergency contact relationship"
                            id="emergencyRelationship"

                            value={emergencyContactRelationship ? emergencyContactRelationship : ''}
                            onChange={onInputChange(setEmergencyContactRelationship)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} xl={4}>
                        <Typography variant="h6" gutterBottom component="div">
                            Close monitoring
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel id="moniLabel">Close monitoring?</InputLabel>
                            <Select
                                style={{ display: 'flex', width: '100%' }}
                                labelId="moniLabel"
                                id="closeMonitoring"
                                value={closeMonitoring ? closeMonitoring : ''}
                                onChange={onInputChange(setCloseMonitoring)}
                                label="Close monitoring?">
                                <MenuItem value={''}>Not set</MenuItem>
                                <MenuItem value={'Y'}>Yes</MenuItem>
                                <MenuItem value={'N'}>No</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography variant="h6" mt={'20px'}>
                            Password and activation
                        </Typography>
                        <FormControlLabel control={<Switch checked={switchState} onChange={setActif} value={active}   />} label="Actif" size="large"/>
                        <Grid container spacing={1}>
                            <Grid item xs={8}>
                                <FormControl fullWidth variant="outlined" style={{marginTop: '18px'}}>
                                    <InputLabel htmlFor="outlined-adornment-password">Change password</InputLabel>
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
                            <Grid item xs={4}  mt={'25px'}>
                                <Button
                               
                                    style={{ borderRadius: '10px',  marginLeft: '10px' }}
                                    variant="outlined" startIcon={<Save />}
                                    onClick={savePassword}>
                                    Save
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
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </LocalizationProvider>
    );
}
