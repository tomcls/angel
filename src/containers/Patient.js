import * as React from 'react';
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
    const [avatar, setAvatar] = React.useState('');

    const [address, setAddress] = React.useState('');
    const [streetNumber, setStreetNumber] = React.useState('');
    const [city, setCity] = React.useState('');
    const [zip, setZip] = React.useState('');
    const [country, setCountry] = React.useState('');

    const [ setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    React.useEffect(() => {
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
                setAvatar(user.avatar);
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
                avatar: avatar
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
                u.type = 'patient';
                u.role = 'V';
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
    const changePassword = () => {

    }
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>

            <Box sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography variant="h6" gutterBottom component="div">
                            Personal informations
                        </Typography>
                        <TextField
                            style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                            label="Firstname"
                            id="firstname"
                            sx={{ '& > :not(style)': { mt: 1 } }}
                            value={firstname ? firstname : ''}
                            onChange={onInputChange(setFirstname)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                            }}
                        />
                        <TextField
                            style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                            label="Phone number"
                            id="phone"
                            sx={{ '& > :not(style)': { mt: 1 } }}
                            value={phone ? phone : ''}
                            onChange={onInputChange(setPhone)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                            }}
                        />
                        <Box
                            style={{ display: 'flex', width: '100%', paddingTop: '8px' }}
                        >
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
                    <Grid item xs={4}>
                        <Typography variant="h6" gutterBottom component="div">
                            &nbsp;
                        </Typography>
                        <TextField
                            style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                            label="Lastname"
                            id="lastname"
                            sx={{ '& > :not(style)': { mt: 1 } }}
                            value={lastname ? lastname : ''}
                            onChange={onInputChange(setLastname)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                            }}
                        />
                        <TextField
                            style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                            label="Email"
                            id="outlined-start-adornment"
                            sx={{ '& > :not(style)': { mt: 1 } }}
                            value={email ? email : ''}
                            onChange={onInputChange(setEmail)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                            }}
                        />

                        <FormControl fullWidth
                            style={{ display: 'flex', width: '100%', marginTop: '16px' }}
                        >
                            <InputLabel id="sexLabel">Sex</InputLabel>
                            <Select
                                style={{ display: 'flex', width: '100%' }}
                                labelId="sexLabel"
                                id="sex"
                                value={sex ? sex : ''}
                                onChange={onInputChange(setSex)}
                                label="Sex"
                            >
                                <MenuItem value={'M'}>Male</MenuItem>
                                <MenuItem value={'F'}>Femal</MenuItem>
                                <MenuItem value={'B'}>Both</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} style={{ paddingTop: '40px' }}>
                        <Grid item xs={12} style={{ width: '100%', textAlign: "left", marginBottom: '10px' }}>
                            <InputLabel id="avatarLabel">Profile Photos</InputLabel>
                        </Grid>
                        <Grid item xs={12} style={{ width: '100%', textAlign: "center", border: '3px solid #ddd', borderRadius: '15px', margin: 'auto' }} >

                            <Avatar
                                alt="Remy Sharp"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkp0LF2WgeDkn_sQ1VuMnlnVGjkDvCN4jo2nLMt3b84ry328rg46eohB_JT3WTqOGJovY&usqp=CAU"
                                style={{ width: '150px', height: '150px', textAlign: "center", borderColor: 'gray', margin: 'auto' }}
                            />
                            <Grid item xs={12} style={{ width: '100%', textAlign: "center" }}>
                                <InputLabel id="avatarLabel">Upload photo</InputLabel>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6" gutterBottom component="div">
                            Address
                        </Typography>

                        <Grid container spacing={1}>

                            <Grid item xs={8}>
                                <TextField
                                    style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                                    label=" Address"
                                    id="address"
                                    sx={{ '& > :not(style)': { mt: 1 } }}
                                    value={address ? address : ''}
                                    onChange={onInputChange(setAddress)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                                    label="Number"
                                    id="number"
                                    sx={{ '& > :not(style)': { mt: 1 } }}
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
                                    style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                                    label="City"
                                    id="city"
                                    sx={{ '& > :not(style)': { mt: 1 } }}
                                    value={city ? city : ''}
                                    onChange={onInputChange(setCity)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                                    label="Code postal"
                                    id="zip"
                                    sx={{ '& > :not(style)': { mt: 1 } }}
                                    value={zip ? zip : ''}
                                    onChange={onInputChange(setZip)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <FormControl fullWidth style={{ display: 'flex', width: '100%', marginTop: '16px', marginLeft: '7px' }} >
                                <InputLabel id="langLabel">Pays</InputLabel>
                                <Select
                                    style={{ display: 'flex', width: '100%' }}
                                    labelId="countryLabel"
                                    id="country"
                                    value={country ? country : ''}
                                    onChange={onInputChange(setCountry)}
                                    label="Country"
                                >
                                    <MenuItem value={'belgium'}>Belgium</MenuItem>
                                    <MenuItem value={'luxembourg'}>Luxembourg</MenuItem>
                                    <MenuItem value={'espagne'}>Espagne</MenuItem>
                                    <MenuItem value={'hollande'}>Hollande</MenuItem>
                                    <MenuItem value={'italie'}>Italie</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom component="div">
                            Language
                        </Typography>

                        <FormControl fullWidth
                            style={{ display: 'flex', width: '100%', marginTop: '16px' }}
                        >
                            <InputLabel id="langLabel">Mother tong</InputLabel>
                            <Select
                                style={{ display: 'flex', width: '100%' }}
                                labelId="langLabel"
                                id="lang"
                                value={lang ? lang : ''}
                                onChange={onInputChange(setLang)}
                                label="Close monitoring?"
                            >
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
                        <Typography variant="h6" gutterBottom component="div" style={{ paddingTop: '40px' }}>
                            Password
                        </Typography>

                        <Grid container  >
                            <Grid item xs={8} >
                                <FormControl fullWidth variant="outlined">
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
                            <Grid item xs={4}>
                                <Button
                                    style={{ borderRadius: '10px', marginTop: '10px', marginLeft: '10px' }}
                                    variant="outlined" startIcon={<Save />}
                                    onClick={changePassword}>
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6" gutterBottom component="div">
                            Emergency info
                        </Typography>

                        <TextField
                            style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                            label="Emergency contact phone number"
                            id="emergencyPhone"
                            sx={{ '& > :not(style)': { mt: 1 } }}
                            value={emergencyContactPhone ? emergencyContactPhone : ''}
                            onChange={onInputChange(setEmergencyContactPhone)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                            }}
                        />
                        <TextField
                            style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                            label="Emergency contact name"
                            id="emergencyName"
                            sx={{ '& > :not(style)': { mt: 1 } }}
                            value={emergencyContactName ? emergencyContactName : ''}
                            onChange={onInputChange(setEmergencyContactName)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                            }}
                        />
                        <TextField
                            style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                            label="Emergency contact relationship"
                            id="emergencyRelationship"
                            sx={{ '& > :not(style)': { mt: 1 } }}
                            value={emergencyContactRelationship ? emergencyContactRelationship : ''}
                            onChange={onInputChange(setEmergencyContactRelationship)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>

                        <Typography variant="h6" gutterBottom component="div">
                            &nbsp;
                        </Typography>
                        <FormControl fullWidth
                            style={{ display: 'flex', width: '100%', marginTop: '16px' }}
                        >
                            <InputLabel id="moniLabel">Close monitoring?</InputLabel>
                            <Select
                                style={{ display: 'flex', width: '100%' }}
                                labelId="moniLabel"
                                id="closeMonitoring"
                                value={closeMonitoring ? closeMonitoring : ''}
                                onChange={onInputChange(setCloseMonitoring)}
                                label="Close monitoring?"
                            >
                                <MenuItem value={''}>Not set</MenuItem>
                                <MenuItem value={'Y'}>Yes</MenuItem>
                                <MenuItem value={'N'}>No</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            style={{ borderRadius: '10px', marginTop: '20px' }}
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
