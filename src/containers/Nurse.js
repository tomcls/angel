import React, { useRef } from 'react';
import AngelUser from '../api/angel/user';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import { Save } from '@mui/icons-material';
import { OutlinedInput, InputAdornment, Button, Card, CardContent, CardHeader, FormControl, IconButton, InputLabel, MenuItem, Modal, Select } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useSnackbar } from 'notistack';
import AngelNurse from '../api/angel/nurse';
import ComboUsers from '../components/ComboUsers';
import ComboHospitals from '../components/ComboHospitals';
import PlaceIcon from '@mui/icons-material/Place';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FaceIcon from '@mui/icons-material/Face';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useTranslation } from '../hooks/userTranslation';
import AppContext from '../contexts/AppContext';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

export default function NurseContainer(props) {

    const { enqueueSnackbar } = useSnackbar();

    const appContext = React.useContext(AppContext);
    const [userSession,] = React.useState(appContext.appState.user);
    const [lg] = useTranslation(userSession ? userSession.lang : 'en');

    const [id, setId] = React.useState();
    const [nurseId, setNurseId] = React.useState();
    const [firstname, setFirstname] = React.useState();
    const [lastname, setLastname] = React.useState();
    const [email, setEmail] = React.useState();
    const [sex, setSex] = React.useState();
    const [lang, setLang] = React.useState();
    const [dateOfBirth, setDateOfBirth] = React.useState();
    const [phone, setPhone] = React.useState();
    const defaultAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkp0LF2WgeDkn_sQ1VuMnlnVGjkDvCN4jo2nLMt3b84ry328rg46eohB_JT3WTqOGJovY&usqp=CAU';//process.env.SENDGRID_APIKEY
    const [avatar, setAvatar] = React.useState(defaultAvatar);
    const [address, setAddress] = React.useState();
    const [streetNumber, setStreetNumber] = React.useState();
    const [city, setCity] = React.useState();
    const [zip, setZip] = React.useState();
    const [country, setCountry] = React.useState();
    const [password, setPassword] = React.useState();
    const [showPassword, setShowPassword] = React.useState(false);
    const [week, setWeek] = React.useState(() => []);
    const [hospitalId, setHospitalId] = React.useState();
    const [hospitalName, setHospitalName] = React.useState();
    const [openAssignPatientModal, setOpenAssignModal] = React.useState(false);
    const [assignPatientId, setAssignPatientId] = React.useState();
    const [active, setActive] = React.useState('N');
    const [switchState, setSwitchState] = React.useState(false);
    const [, setFile] = React.useState();
    const uploadFileButton = useRef();

    const [hospitalAddress, setHospitalAddress] = React.useState();
    const [hospitalStreetNumber, setHospitalStreetNumber] = React.useState();
    const [hospitalZip, setHospitalZip] = React.useState();
    const [hospitalCity, setHospitalCity] = React.useState();
    const [hospitalCountry, setHospitalCountry] = React.useState();

    React.useEffect(() => {
        if (props.userId) {
            fetchData();
        }
    }, []);
    const fetchData = async () => {
        const user = await AngelNurse().find({ user_id: props.userId });
        console.log(user)
        setId(user.user_id);
        setNurseId(user.nurse_id);
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
        setHospitalName(user.hospital_name);
        setHospitalAddress(user.hospital_address);
        setHospitalStreetNumber(user.hospital_street_number);
        setHospitalZip(user.hospital_zip);
        setHospitalCountry(user.hospital_country);
        setHospitalCity(user.hospital_city);
        setAvatar(user.avatar ? process.env.REACT_APP_API_URL + '/public/uploads/' + user.avatar : defaultAvatar);
        if (user.daysin) {
            setWeek(JSON.parse(user.daysin));
        }
        setActive(user.active);
        if (user.active === 'N') {
            setSwitchState(false);
        } else {
            setSwitchState(true);
        }
    }
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
                birthday: dateOfBirth ? formatDate(dateOfBirth) : null,
                active: active
            };
            if (id) {
                u.id = id;
                try {
                    await AngelUser().update(u);
                    await setNurse();
                    handleClickVariant('success', lg.get('User well updated!'));
                } catch (e) {
                    handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
                }
            } else {
                try {
                    const user = await AngelUser().add(u);
                    setId(user.inserted_id)
                    await setNurse(user.inserted_id);
                    handleClickVariant('success', lg.get('User well added!'));
                } catch (e) {
                    handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
                }
            }
        }
    };
    const setNurse = async (userId) => {
        const u = {
            user_id: userId ? userId : id,
            hospital_id: hospitalId ? hospitalId : null,
            daysin: week && week.length ? JSON.stringify(week) : null,
        };
        if (nurseId) {
            u.id = nurseId;
            try {
                await AngelNurse().update(u);
            } catch (e) {
                handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
            }
        } else {
            try {
                const p = await AngelNurse().add(u);
                setNurseId(p.inserted_id);
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
    const onWeekDayClick = (event, newFormats) => {
        setWeek(newFormats);
    }
    const handleAssignPatientModal = () => setOpenAssignModal(true);
    const handleCloseAssignPatientModal = () => setOpenAssignModal(false);

    const onAssign = async e => {
        const u = {
            patient_id: assignPatientId,
            nurse_id: nurseId,
        };
        if (assignPatientId && nurseId) {
            try {
                await AngelNurse().addPatient(u);
                handleClickVariant('success', lg.get('Patient well assigned!'));
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
    const onHospitalSelect = (o) => {
        setHospitalId(o.id);
        setHospitalName(o.name);
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
        setAvatar(process.env.REACT_APP_API_URL + '/public/uploads/' + u.filename);
        handleClickVariant('success', lg.get('Image well uploaded'));
    };
    return (
        <>
            <div>
                <Modal
                    open={openAssignPatientModal}
                    onClose={handleCloseAssignPatientModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={styleModal}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {lg.get('Assign a patient')}
                        </Typography>
                        <ComboUsers lg={lg} type="patient" onSelect={onPatientSelect} />
                        <Button
                            style={{ borderRadius: '10px', marginTop: '20px' }}
                            variant="outlined" startIcon={<Save />}
                            onClick={onAssign}>
                            {lg.get('Assign')}
                        </Button>
                    </Box>
                </Modal>
            </div>


            <Box sx={{ width: '100%' }} mt={0}>
                <Card >
                    <CardHeader
                        avatar={
                            <EmojiPeopleIcon color={'primary'} />
                        }
                        sx={{ borderBottom: '1px solid #cecece' }}
                        title={nurseId ? ((firstname ? firstname : '') + ' ' + (lastname ? lastname : '')) : lg.get('Add nurse')}
                        subheader={
                            <Grid container spacing={0} >
                                <Grid item xs={12} sm={7} md={4} xl={3} mt={1} style={{ display: 'flex', flexDirection: 'row' }}>
                                    <EmailIcon fontSize={'small'} style={{ marginRight: '5px', display: email && nurseId ? 'block' : 'none' }} />
                                    <Typography style={{ display: email && nurseId ? 'block' : 'none' }}>{nurseId ? email : ''}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={5} md={3} xl={2} mt={1} style={{ display: 'flex', flexDirection: 'row' }}>
                                    <LocalPhoneIcon fontSize={'small'} style={{ marginRight: '5px', display: phone && nurseId ? 'block' : 'none' }} />
                                    <Typography style={{ display: phone && nurseId ? 'block' : 'none' }}>{ phone && nurseId ? phone : ''}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} xl={7} mt={1} style={{ display: 'flex', flexDirection: 'row' }}>
                                    <LocalHospitalIcon fontSize={'small'} style={{ marginRight: '5px', display: hospitalId ? 'block' : 'none' }} />
                                    <Typography >{hospitalName ? hospitalName : ''}</Typography>
                                    <Typography ml={1}>{hospitalAddress ? hospitalAddress : ''}</Typography>
                                    <Typography ml={1}>{hospitalStreetNumber ? hospitalStreetNumber : ''}</Typography>
                                    <Typography >{hospitalZip ? (', ' + hospitalZip) : ''}</Typography>
                                    <Typography ml={1}>{hospitalCity ? hospitalCity : ''}</Typography>
                                    <Typography ml={1}>{hospitalCountry ? hospitalCountry : ''}</Typography>
                                </Grid>
                            </Grid>}
                        action={<>
                            <IconButton aria-label={lg.get('Assign a patient')}>
                                <Button onClick={handleAssignPatientModal} variant="outlined" style={{ marginRight: '5px' }}>{lg.get('Assign a patient')}</Button>
                            </IconButton>
                            <IconButton aria-label={lg.get('List of patients')}>
                                <Button onClick={() => document.getElementById("newButton").clk(nurseId, firstname + " " + lastname, 'nurse_patients')} variant="outlined" >{lg.get('List of patients')}</Button>
                            </IconButton></>
                        }
                    />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4} xl={2} style={{ paddingTop: '15px' }}>
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
                                    label={lg.get("Firstname")}
                                    id="firstname"
                                    value={firstname ? firstname : ''}
                                    onChange={onInputChange(setFirstname)}
                                    InputProps={{
                                        startAdornment: <FaceIcon position="start" />,
                                    }}
                                />
                                <TextField
                                    label={lg.get("Lastname")}
                                    id="lastname"
                                    value={lastname ? lastname : ''}
                                    onChange={onInputChange(setLastname)}
                                    InputProps={{
                                        startAdornment: <FaceIcon position="start" />,
                                    }}
                                />
                                <Box >
                                    <MobileDatePicker
                                        key="birthday"
                                        id={lg.get('Birthday')}
                                        label={lg.get('Birthday')}
                                        value={dateOfBirth ? new Date(dateOfBirth) : null}
                                        onChange={handleDateOfBirthChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} xl={4}>
                                <TextField
                                    label={lg.get("Phone")}
                                    id="phone"
                                    value={phone ? phone : ''}
                                    onChange={onInputChange(setPhone)}
                                    InputProps={{
                                        startAdornment: <LocalPhoneIcon position="start" />,
                                    }}
                                />
                                <TextField
                                    label="Email"
                                    id="outlined-start-adornment"

                                    value={email ? email : ''}
                                    onChange={onInputChange(setEmail)}
                                    InputProps={{
                                        startAdornment: <EmailIcon position="start" />,
                                    }}
                                />
                                <Grid container spacing={1}>
                                    <Grid item xs={8}>
                                        <FormControl >
                                            <InputLabel id="langLabel">{lg.get("Lang")}</InputLabel>
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
                                            <InputLabel id="sexLabel">{lg.get("Sex")}</InputLabel>
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
                                    {lg.get("Address")}
                                </Typography>

                                <Grid container spacing={1}>
                                    <Grid item xs={8}>
                                        <TextField
                                            label={lg.get("Address")}
                                            id="address"

                                            value={address ? address : ''}
                                            onChange={onInputChange(setAddress)}
                                            InputProps={{
                                                startAdornment: <PlaceIcon position="start" />,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            label={lg.get("Number")}
                                            id="number"

                                            value={streetNumber ? streetNumber : ''}
                                            onChange={onInputChange(setStreetNumber)}

                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item xs={7}>
                                        <TextField
                                            label={lg.get("City")}
                                            id="city"

                                            value={city ? city : ''}
                                            onChange={onInputChange(setCity)}
                                            InputProps={{
                                                startAdornment: <PlaceIcon position="start" />,
                                            }} />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField
                                            label={lg.get("Zip")}
                                            id="zip"

                                            value={zip ? zip : ''}
                                            onChange={onInputChange(setZip)}
                                        />
                                    </Grid>
                                </Grid>
                                <FormControl fullWidth >
                                    <InputLabel id="langLabel">{lg.get("Country")}</InputLabel>
                                    <Select
                                        style={{ display: 'flex', width: '100%' }}
                                        labelId="countryLabel"
                                        id="country"
                                        value={country ? country : ''}
                                        onChange={onInputChange(setCountry)}
                                        label={lg.get("Country")}>
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
                                    {lg.get("Hospital")}
                                </Typography>
                                <ComboHospitals lg={lg} onSelect={onHospitalSelect} hospital={{ id: hospitalId, name: hospitalName }} />
                                <Typography variant="h6" mt={'0px'}>
                                    {lg.get("Password and activation")}
                                </Typography>
                                <FormControlLabel control={<Switch checked={switchState} onChange={setActif} value={active} />} label="Actif" size="large" />
                                <Grid container spacing={1}>
                                    <Grid item xs={8}>
                                        <FormControl fullWidth variant="outlined" style={{ marginTop: '12px' }}>
                                            <InputLabel htmlFor="outlined-adornment-password">{lg.get("Change password")}</InputLabel>
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
                                                label={lg.get("Change password")}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4} mt={'25px'}>
                                        <Button

                                            style={{ borderRadius: '10px', marginLeft: '10px' }}
                                            variant="outlined" startIcon={<Save />}
                                            onClick={savePassword}>
                                            {lg.get("Save")}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12} style={{ paddingTop: '40px' }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    {lg.get("Days in")}
                                </Typography>
                                <ToggleButtonGroup
                                    value={week}
                                    onChange={onWeekDayClick}
                                    aria-label="Days in"
                                    size="small"
                                    color="info"
                                >
                                    <ToggleButton value="mon" aria-label="mon" color="info">
                                        {lg.get("Mon")}
                                    </ToggleButton>
                                    <ToggleButton value="tue" aria-label="tue">
                                        {lg.get("Tue")}
                                    </ToggleButton>
                                    <ToggleButton value="wed" aria-label="wed">
                                        {lg.get("Wed")}
                                    </ToggleButton>
                                    <ToggleButton value="thu" aria-label="thu" >
                                        {lg.get("Thu")}
                                    </ToggleButton>
                                    <ToggleButton value="fri" aria-label="fri" >
                                        {lg.get("Fri")}
                                    </ToggleButton>
                                    <ToggleButton value="sat" aria-label="sat" >
                                        {lg.get("Sat")}
                                    </ToggleButton>
                                    <ToggleButton value="sun" aria-label="sun" >
                                        {lg.get("Sun")}
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            <Grid container>
                                <Typography variant="h6" gutterBottom component="div">
                                    &nbsp;
                                </Typography>
                                <Button
                                    style={{ borderRadius: '10px', marginTop: '10px' }}
                                    variant="outlined" startIcon={<Save />}
                                    onClick={onSubmit}>
                                    {lg.get("Save")}
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}
