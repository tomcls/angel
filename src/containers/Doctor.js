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

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Modal from '@mui/material/Modal';

import { useSnackbar } from 'notistack';
import AngelDoctor from '../api/angel/doctor';
import ComboUsers from '../components/ComboUsers';

export default function DoctorContainer(props) {

    const { enqueueSnackbar } = useSnackbar();

    const [id, setId] = React.useState(null);
    const [doctorId, setDoctorId] = React.useState(null);
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [sex, setSex] = React.useState('');
    const [lang, setLang] = React.useState('');
    const [dateOfBirth, setDateOfBirth] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [avatar, setAvatar] = React.useState('');

    const [address, setAddress] = React.useState('');
    const [streetNumber, setStreetNumber] = React.useState('');
    const [city, setCity] = React.useState('');
    const [zip, setZip] = React.useState('');
    const [country, setCountry] = React.useState('');

    const [setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    const [week, setWeek] = React.useState(() => []);
    const [hospitalId, setHospitalId] = React.useState(() => '');

    const [openAssignPatientModal, setOpenAssignModal] = React.useState(false);

    const [assignPatientId, setAssignPatientId] = React.useState(null);

    React.useEffect(() => {
        if (props.userId) {
            async function fetchData() {
                const user = await AngelDoctor().find({ user_id: props.userId });
                setId(user.user_id);
                setDoctorId(user.doctor_id);
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
                setHospitalId(user.hospital_id);
                if (user.daysin) {
                    setWeek(JSON.parse(user.daysin));
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
                avatar: avatar
            };
            if (id) {
                u.id = id;
                try {
                    const user = await AngelUser().update(u);
                    await setDoctor();
                    handleClickVariant('success', 'User well updated');
                } catch (e) {
                    handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
                }
            } else {
                u.type = 'doctor';
                u.role = 'V';
                try {
                    const user = await AngelUser().add(u);
                    setId(user.inserted_id)
                    await setDoctor(user.inserted_id);
                    handleClickVariant('success', 'User well added');
                } catch (e) {
                    handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
                }
            }
        }
    };
    const setDoctor = async (userId) => {

        const u = {
            user_id: userId ? userId : id,
            hospital_id: hospitalId ? hospitalId : null,
            daysin: week && week.length ? JSON.stringify(week) : null,
        };
        if (doctorId) {
            u.id = doctorId;
            try {
                await AngelDoctor().update(u);
            } catch (e) {
                handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
            }
        } else {
            try {
                const p = await AngelDoctor().add(u);
                setDoctorId(p.inserted_id);
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
    const onWeekDayClick = (event, newFormats) => {
        setWeek(newFormats);
    }
    const handleAssignPatientModal = () => setOpenAssignModal(true);
    const handleCloseAssignPatientModal = () => setOpenAssignModal(false);

    const onAssign = async e => {
        console.log(e);
        const u = {
            patient_id: assignPatientId,
            doctor_id: doctorId,
        };
        if (assignPatientId && doctorId) {
            try {
                await AngelDoctor().addPatient(u);
                handleClickVariant('success', 'Patient well assigned');
            } catch (e) {
                handleClickVariant('error', JSON.stringify(e));
            }
        } else {
            handleClickVariant('error', JSON.stringify(e));
        }
    }
    const onPatientSelect = (patientId) => {
        setAssignPatientId(patientId);
    }
    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div>
                <Modal
                    open={openAssignPatientModal}
                    onClose={handleCloseAssignPatientModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={styleModal}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Assign a patient
                        </Typography>
                        <ComboUsers type="patient" onSelect={onPatientSelect} />
                        <Button
                            style={{ borderRadius: '10px', marginTop: '20px' }}
                            variant="outlined" startIcon={<Save />}
                            onClick={onAssign}>
                            Assign
                        </Button>
                    </Box>
                </Modal>
            </div>
            <Button onClick={handleAssignPatientModal}>Assign patient</Button>
            <Grid container spacing={2}>
                <Grid item xs={6} style={{ paddingTop: '40px' }}>
                    <Typography variant="h6" gutterBottom component="div">
                        Days in.
                    </Typography>
                    <ToggleButtonGroup
                        value={week}
                        onChange={onWeekDayClick}
                        aria-label="Days in"
                        size="small"
                        color="info"
                    >
                        <ToggleButton value="mon" aria-label="mon" color="info">
                            Monday
                        </ToggleButton>
                        <ToggleButton value="tue" aria-label="tue">
                            Tuesday
                        </ToggleButton>
                        <ToggleButton value="wed" aria-label="wed">
                            Wednesday
                        </ToggleButton>
                        <ToggleButton value="thu" aria-label="thu" >
                            Thursday
                        </ToggleButton>
                        <ToggleButton value="fri" aria-label="fri" >
                            Friday
                        </ToggleButton>
                        <ToggleButton value="sat" aria-label="sat" >
                            Saterday
                        </ToggleButton>
                        <ToggleButton value="sun" aria-label="sun" >
                            Sunday
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={2} style={{ paddingTop: '25px' }}>
                    <Typography variant="h6" gutterBottom component="div">
                        &nbsp;
                    </Typography>
                    <FormControl fullWidth
                        style={{ display: 'flex', width: '100%', marginTop: '16px' }}
                    >
                        <InputLabel id="hospitalIdLabel">Hospital</InputLabel>
                        <Select
                            style={{ display: 'flex', width: '100%' }}
                            labelId="hospitalIdLabel"
                            id="hospitalId"
                            value={hospitalId ? hospitalId : ''}
                            onChange={onInputChange(setHospitalId)}
                            label="Hospital"
                        >
                            <MenuItem value={3}>Hospital A</MenuItem>
                            <MenuItem value={2}>Hospital B</MenuItem>
                            <MenuItem value={1}>Hospital C</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
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
