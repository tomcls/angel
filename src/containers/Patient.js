import React, { useRef } from 'react';
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
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Save } from '@mui/icons-material';
import { Button, Modal } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSnackbar } from 'notistack';
import AngelPatient from '../api/angel/patient';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import AngelNurse from '../api/angel/nurse';
import FaceIcon from '@mui/icons-material/Face';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ComboNurses from '../components/ComboNurses';
import AngelDoctor from '../api/angel/doctor';
import ComboDoctors from '../components/ComboDoctors';
import { useTranslation } from '../hooks/userTranslation';
import AppContext from '../contexts/AppContext';
import AngelDrug from '../api/angel/drugs';
import PosologyComponent from '../components/Posology';

export default function PatientContainer(props) {

    const { enqueueSnackbar } = useSnackbar();

    const appContext = React.useContext(AppContext);
    const [userSession,] = React.useState(appContext.appState.user);
    const [lg] = useTranslation(userSession ? userSession.lang : 'en');

    const [id, setId] = React.useState(null);
    const [patientId, setPatientId] = React.useState(null);
    const [patient, setPatient] = React.useState(null);
    const [firstname, setFirstname] = React.useState();
    const [lastname, setLastname] = React.useState();
    const [email, setEmail] = React.useState();
    const [sex, setSex] = React.useState();
    const [lang, setLang] = React.useState();
    const [closeMonitoring, setCloseMonitoring] = React.useState();
    const [dateOfBirth, setDateOfBirth] = React.useState();
    const [emergencyContactName, setEmergencyContactName] = React.useState();
    const [emergencyContactRelationship, setEmergencyContactRelationship] = React.useState();
    const [phone, setPhone] = React.useState();
    const [emergencyContactPhone, setEmergencyContactPhone] = React.useState();
    const defaultAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkp0LF2WgeDkn_sQ1VuMnlnVGjkDvCN4jo2nLMt3b84ry328rg46eohB_JT3WTqOGJovY&usqp=CAU';//process.env.SENDGRID_APIKEY
    const [avatar, setAvatar] = React.useState(defaultAvatar);

    const [address, setAddress] = React.useState();
    const [streetNumber, setStreetNumber] = React.useState();
    const [city, setCity] = React.useState('');
    const [zip, setZip] = React.useState();
    const [country, setCountry] = React.useState();

    const [password, setPassword] = React.useState();
    const [showPassword, setShowPassword] = React.useState(false);
    const [active, setActive] = React.useState('N');
    const [switchState, setSwitchState] = React.useState(false);
    const [openAssignNurseModal, setOpenAssignNurseModal] = React.useState(null);
    const [, setFile] = React.useState(null);
    const uploadFileButton = useRef(null);
    const [assignNurseId, setAssignNurseId] = React.useState(null);
    const [assignDoctorId, setAssignDoctorId] = React.useState(null);
    const [openAssignDoctorModal, setOpenAssignDoctorModal] = React.useState(null);
    const [openAssignPatientModal, setOpenAssignPatientModal] = React.useState(false);

    const [drugId, ] = React.useState(null);
    const [drug, ] = React.useState(null);
    const [repetition,] = React.useState(props.repetition);
    const [note,] = React.useState(props.note);
    const [days,] = React.useState(props.days);
    const [hours,] = React.useState([12]);

    React.useEffect(() => {
        console.log("React.useEffect.patient",props.userId)
        if (props.userId) {
            fetchData();
        }
    },[props.userId]);

    const fetchData = async () => {
        if (props.userId) {
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
            setAvatar(user.avatar ? process.env.REACT_APP_API_URL + '/public/uploads/' + user.avatar : defaultAvatar);
            setActive(user.active);
            if (user.active === 'N') {
                setSwitchState(false);
            } else {
                setSwitchState(true);
            }
            setPatient({ id: user.patient_id, patient_id: user.patient_id, firstname: user.firstname, lastname: user.lastname });
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
                close_monitoring: closeMonitoring,
                emergency_contact_name: emergencyContactName,
                emergency_contact_phone: emergencyContactPhone,
                emergency_contact_relationship: emergencyContactRelationship,
                active: active
            };
            if (id) {
                u.id = id;
                try {
                    await AngelUser().update(u);
                    await savePatient();
                    handleClickVariant('success', lg.get('User well updated!'));
                } catch (e) {
                    handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
                }
            } else {
                try {
                    const user = await AngelUser().add(u);
                    if (user.inserted_id) {
                        setId(user.inserted_id)
                        await savePatient(user.inserted_id);
                        handleClickVariant('success', lg.get('User well added!'));
                    } else {
                        if (user.error && user.error === "user_exists") {
                            handleClickVariant('error', lg.get("The user already exists for this email address"));
                        } else {
                            handleClickVariant('error', lg.get("An error has occurred"));
                        }
                    }
                } catch (e) {
                    handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
                }
            }
        }
    };
    const savePatient = async (userId) => {

        const p = {
            user_id: userId ? userId : id,
            close_monitoring: closeMonitoring,
            emergency_contact_name: emergencyContactName,
            emergency_contact_phone: emergencyContactPhone,
            emergency_contact_relationship: emergencyContactRelationship
        };
        if (patientId) {
            p.id = patientId;
            try {
                await AngelPatient().update(p);
            } catch (e) {
                handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
            }
        } else {
            try {
                const pa = await AngelPatient().add(p);
                setPatientId(pa.inserted_id);
                if (userSession.nurse_id) {
                    try {
                        const u = {
                            patient_id: pa.inserted_id,
                            nurse_id: userSession.nurse_id,
                        };
                        await AngelNurse().addPatient(u);
                        handleClickVariant('success', lg.get('Patient well assigned!'));
                    } catch (e) {
                        handleClickVariant('error', JSON.stringify(e));
                    }
                }
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
    const setActif = (e) => {
        setSwitchState(e.target.checked);
        if (e.target.checked) {
            setActive('Y');
        } else {
            setActive('N');
        }
    };
    const onFileChange = async (e) => {
        if (id) {
            setFile({ file: e.target.files[0] });
            const u = await AngelUser().upload(e.target.files[0], 'avatar', id);
            setAvatar(process.env.REACT_APP_API_URL + '/public/uploads/' + u.filename);
            handleClickVariant('success', lg.get('Image well uploaded'));
        } else {
            handleClickVariant('error', lg.get('Save the patient before upload the image please'));
        }
    };
    const handleAssignNurseModal = () => setOpenAssignNurseModal(true);
    const handleCloseAssignNurseModal = () => setOpenAssignNurseModal(false);
    const handleAssignDoctorModal = () => setOpenAssignDoctorModal(true);
    const handleCloseAssignDoctorModal = () => setOpenAssignDoctorModal(false);

    const onNurseSelect = (id) => {
        setAssignNurseId(id)
    }
    const onDoctorSelect = (id) => {
        setAssignDoctorId(id)
    }
    const onAssignDoctor = async () => {
        const u = {
            patient_id: patientId,
            doctor_id: assignDoctorId,
        };
        if (assignDoctorId && patientId) {
            try {
                await AngelDoctor().addPatient(u);
                handleClickVariant('success', lg.get('Patient well assigned!'));
            } catch (e) {
                handleClickVariant('error', lg.get("Une erreur est survenue lors de l'assignation d'un patient "));
            }
        } else {
            handleClickVariant('error', lg.get("Le docteur et patient sont requis"));
        }
    }
    const onAssignNurse = async () => {
        const u = {
            patient_id: patientId,
            nurse_id: assignNurseId,
        };
        if (assignNurseId && patientId) {
            try {
                await AngelNurse().addPatient(u);
                handleClickVariant('success', lg.get('Patient well assigned!'));
            } catch (e) {
                handleClickVariant('error', lg.get("An error occurred in the assignment of a nurse "));
            }
        } else {
            handleClickVariant('error', lg.get("The nurse and patient are required"));
        }
    }
    const handleAssignPatientModal = async () => {
        setOpenAssignPatientModal(true);
    }
    const handleCloseAssignPatientModal = () => setOpenAssignPatientModal(false);
    const onAssignTreatment = async e => {
        if (!e.patient_id || !e.drug_id || !e.startDate || !e.hours || !e.days) {
            try {
                const u = {
                    patient_id: e.patient_id,
                    drug_id: e.drug_id,
                    start_date: formatDate(e.start_date),
                    end_date: e.end_date ? formatDate(e.end_date) : null,
                    days: JSON.stringify(e.days),
                    hours: JSON.stringify(e.hours),
                    repetition: e.repetition,
                    type: e.type ? e.type : null,
                    note: e.note ? e.note : null
                };
                const a = await AngelDrug().addPatient(u);
                if (a && a.code) {
                    handleClickVariant('error', a.code);
                } else {
                    handleClickVariant('success', lg.get('Patient well assigned!'));
                    handleCloseAssignPatientModal();
                }
            } catch (e) {
                handleClickVariant('error', JSON.stringify(e));
            }
        } else {
            handleClickVariant('error', lg.get('Patient, hours and frequency are required'));
        }
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
        <>
            <div>
                <Modal
                    open={openAssignPatientModal}
                    onClose={handleCloseAssignPatientModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <PosologyComponent
                        onSave={onAssignTreatment}
                        days={days}
                        repetition={repetition}
                        hours={hours}
                        note={note}
                        patientId={patientId}
                        drugId={drugId}
                        drug={drug}
                        patient={patient}
                        lg={lg} />
                </Modal>
                <Modal
                    open={openAssignDoctorModal}
                    onClose={handleCloseAssignDoctorModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={styleModal}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {lg.get('Assign a doctor')}
                        </Typography>
                        <ComboDoctors lg={lg} onSelect={onDoctorSelect} />
                        <Button
                            style={{ borderRadius: '10px', marginTop: '20px' }}
                            variant="outlined" startIcon={<Save />}
                            onClick={onAssignDoctor}>
                            {lg.get('Assign')}
                        </Button>
                    </Box>
                </Modal>
                <Modal
                    open={openAssignNurseModal}
                    onClose={handleCloseAssignNurseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={styleModal}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {lg.get('Assign a nurse')}
                        </Typography>
                        <ComboNurses lg={lg} onSelect={onNurseSelect} />
                        <Button
                            style={{ borderRadius: '10px', marginTop: '20px' }}
                            variant="outlined" startIcon={<Save />}
                            onClick={onAssignNurse}>
                            {lg.get('Assign')}
                        </Button>
                    </Box>
                </Modal>
            </div>
            <Box sx={{ width: '100%' }}>
                <Typography variant="h6" gutterBottom component="div">
                    {lg.get('Personal informations')}
                </Typography>
                <Button onClick={handleAssignNurseModal} variant="outlined" style={{ marginRight: '5px' }}>{lg.get('Assign a nurse')}</Button>
                <Button onClick={handleAssignDoctorModal} variant="outlined" style={{ marginRight: '5px' }}>{lg.get('Assign a doctor')}</Button>
                <Button variant="outlined" style={{ marginRight: '5px' }} onClick={handleAssignPatientModal}>{lg.get('Assign a treatment')}</Button>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} xl={2} style={{ paddingTop: '40px' }}>
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
                    <Grid item xs={12} sm={6} md={4} xl={4}  >
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
                        <Box >
                            <MobileDatePicker
                                key="birthday"
                                id={lg.get('Birthday')}
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
                            id={lg.get('Phone')}
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
                                        <MenuItem value={'tk'}>Turque</MenuItem>
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
                                        label={lg.get('Sex')} >
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
                                        startAdornment: <InputAdornment position="start"><LocationCityIcon /></InputAdornment>,
                                    }} />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    label={lg.get('Zip')}
                                    id="zip"

                                    value={zip ? zip : ''}
                                    onChange={onInputChange(setZip)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><LocationCityIcon /></InputAdornment>,
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
                        <Typography variant="h6" gutterBottom component="div">
                            {lg.get('Emergency info')}
                        </Typography>

                        <TextField
                            label={lg.get('Emergency contact phone number')}
                            id="emergencyPhone"

                            value={emergencyContactPhone ? emergencyContactPhone : ''}
                            onChange={onInputChange(setEmergencyContactPhone)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><PhoneIphoneIcon /></InputAdornment>,
                            }}
                        />
                        <TextField
                            label={lg.get('Emergency contact name')}
                            id="emergencyName"

                            value={emergencyContactName ? emergencyContactName : ''}
                            onChange={onInputChange(setEmergencyContactName)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><FaceIcon /></InputAdornment>,
                            }}
                        />
                        <TextField
                            label={lg.get('Emergency contact relationship')}
                            id="emergencyRelationship"

                            value={emergencyContactRelationship ? emergencyContactRelationship : ''}
                            onChange={onInputChange(setEmergencyContactRelationship)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><FaceIcon /></InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} xl={4}>
                        <Typography variant="h6" gutterBottom component="div">
                            {lg.get('Close monitoring')}
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel id="moniLabel">{lg.get('Close monitoring')}?</InputLabel>
                            <Select
                                style={{ display: 'flex', width: '100%' }}
                                labelId="moniLabel"
                                id="closeMonitoring"
                                value={closeMonitoring ? closeMonitoring : ''}
                                onChange={onInputChange(setCloseMonitoring)}
                                label="Close monitoring?">
                                <MenuItem value={''}>{lg.get('Not set')}</MenuItem>
                                <MenuItem value={'Y'}>{lg.get('Yes')}</MenuItem>
                                <MenuItem value={'N'}>{lg.get('No')}</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography variant="h6" mt={'4px'}>
                            {lg.get('Password and activation')}
                        </Typography>
                        <FormControlLabel control={<Switch checked={switchState} onChange={setActif} value={active} />} label="Actif" size="large" />
                        <Grid container spacing={1}>
                            <Grid item xs={8}>
                                <FormControl fullWidth variant="outlined" style={{ marginTop: '18px' }}>
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
            </Box >
        </>
    );
}
