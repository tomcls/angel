import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Save } from '@mui/icons-material';
import { Button, Card, CardContent, CardHeader, FormControl, IconButton, InputLabel, MenuItem, Modal, Select } from '@mui/material';
import { useSnackbar } from 'notistack';
import ComboLaboratories from '../components/ComboLaboratories';
import Avatar from '@mui/material/Avatar';
import PosologyComponent from '../components/Posology';
import AngelDrug from '../api/angel/drugs';
import ComboEffects from '../components/ComboEffects';
import SideEffects from '../components/SideEffects';
import { useStore } from '../utils/store';
import Translation from '../utils/translation';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import SickIcon from '@mui/icons-material/Sick';
import DescriptionIcon from '@mui/icons-material/Description';
export default function DrugContainer(props) {

    const { enqueueSnackbar } = useSnackbar();

    const { session, } = useStore();
    const [userSession,] = React.useState(session.user ? session.user : null);
    const lg = new Translation(userSession ? userSession.lang : 'en');

    const [id, setId] = React.useState(null);
    const [drugId, setDrugId] = React.useState(null);
    const [drug, setDrug] = React.useState(null);
    const [langId, setLangId] = React.useState(userSession ? userSession.lang : 'en');
    const [descriptionId, setDescriptionId] = React.useState(null);
    const [name, setName] = React.useState('');
    const [code, setCode] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [laboratoryId, setLaboratoryId] = React.useState(() => '');
    const [laboratoryName, setLaboratoryName] = React.useState(() => '');
    const [openAssignEffectModal, setOpenAssignEffectModal] = React.useState(false);
    const [openAssignPatientModal, setOpenAssignPatientModal] = React.useState(false);
    const defaultAvatar = 'https://dreamguys.co.in/preadmin/html/school/dark/assets/img/placeholder.jpg';//process.env.SENDGRID_APIKEY
    const [image, setImage] = React.useState(defaultAvatar);
    const [notice, setNotice] = React.useState('');
    const [, setFile] = React.useState(null);
    const [, setDocument] = React.useState(null);
    const [effectId, setEffectId] = React.useState(null);
    const uploadFileButton = useRef(null);
    const uploadNoticeButton = useRef(null);
    const [moleculeName, setMoleculeName] = React.useState(null);
    const [repetition,] = React.useState(props.repetition);
    const [note,] = React.useState(props.note);
    const [days,] = React.useState(props.days);
    const [hours,] = React.useState([12]);
    const [sideEffectUpdated,setSideEffectUpdated] = React.useState(null);
    const [patientId,] = React.useState(props.patientId);

    React.useEffect(() => {
        if (props.drugId) {
            fetchData();
        }
    }, []);
    const fetchData = async (lang) => {
        const drug = await AngelDrug().find({ id: props.drugId, lang_id: lang ? lang : langId });
        console.log(drug, langId)
        setId(drug.drug_id);
        setDrugId(drug.drug_id);
        setDescriptionId(drug.drug_description_id);
        setDescription(drug.description);
        setName(drug.name);
        setCode(drug.code);
        setLaboratoryId(drug.laboratory_id);
        setLaboratoryName(drug.laboratory_name);
        setImage(drug.image ? process.env.REACT_APP_API_URL + '/public/drugs/images/' + drug.image : defaultAvatar);
        setNotice(drug.notice);
        setDrug({ id: drug.drug_id, drug_id: drug.drug_id, name: drug.name, code: drug.code });
        setMoleculeName(drug.molecule_name)
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
        if (!name || !code) {
            handleClickVariant('error', lg.get('The name and code are required'));
        } else {
            const u = {
                name: name,
                code: code,
                molecule_name: moleculeName,
                laboratory_id: laboratoryId
            };
            if (id) {
                u.id = id;
                try {
                    await AngelDrug().update(u);
                    await setDrugDescription();
                    handleClickVariant('success', lg.get('Drug well updated!'));
                } catch (e) {
                    handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
                }
            } else {
                try {
                    const drug = await AngelDrug().add(u);
                    setId(drug.inserted_id)
                    await setDrugDescription(drug.inserted_id);
                    handleClickVariant('success', lg.get('Drug well added!'));
                } catch (e) {
                    handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
                }
            }
        }
    };
    const setDrugDescription = async (drugId) => {

        const u = {
            id: descriptionId,
            drug_id: drugId ? drugId : id,
            description: description,
            lang_id: langId
        };
        if (descriptionId) {
            try {
                await AngelDrug().updateDescription(u);
            } catch (e) {
                handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
            }
        } else {
            try {
                const p = await AngelDrug().addDescription(u);
                setDescriptionId(p.inserted_id);
            } catch (e) {
                handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
            }
        }
    }

    const onLaboratorySelect = (o) => {
        setLaboratoryId(o.id);
        setLaboratoryName(o.name);
    }
    const handleAssignEffectModal = async () => {
        setOpenAssignEffectModal(true);
    }
    const handleAssignPatientModal = async () => {
        setOpenAssignPatientModal(true);
    }
    const handleCloseAssignPatientModal = () => setOpenAssignPatientModal(false);
    const onAssignPatient = async e => {
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
    const onAssignEffect = async e => {

        const u = {
            side_effect_id: effectId,
            drug_id: drugId,
        };
        if (drugId && effectId) {
            try {
                await AngelDrug().addEffect(u);
                setSideEffectUpdated(new Date().getTime())
                handleClickVariant('success', lg.get('Side effect well assigned'));
            } catch (e) {
                handleClickVariant('error', JSON.stringify(e));
            }
        } else {
            handleClickVariant('error', lg.get('Side effect and drug are required'));
        }
    }
    const onEffectSelect = async id => {
        setEffectId(id)
    }
    const formatDate = (v) => {
        let d = new Date(v);
        var datestring = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":00";
        return datestring;
    }
    const onFileChange = async (e) => {
        setFile({ file: e.target.files[0] });
        const u = await AngelDrug().upload(e.target.files[0], 'drug', id);
        setImage(process.env.REACT_APP_API_URL + '/public/drugs/images/' + u.filename);
        handleClickVariant('success', 'Image well uploaded');
    };
    const onNoticeChange = async (e) => {
        setDocument({ file: e.target.files[0] });
        const u = await AngelDrug().notice(e.target.files[0], 'drug', descriptionId);
        setNotice(process.env.REACT_APP_API_URL + '/public/drugs/documents/' + u.filename);
        handleClickVariant('success', 'Document well uploaded');
    };
    const handleCloseAssignEffectModal = () => setOpenAssignEffectModal(false);

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
    const handleLangChange = (event) => {
        setLangId(event.target.value);
        if (id && id != null) {
            fetchData(event.target.value);
        }
    };
    const onDeleteSideEffect = (id) => {
        handleClickVariant('success', 'Side effect well removed');
        setSideEffectUpdated(new Date().getTime())
    }
    return (
        <>
            <Modal
                open={openAssignPatientModal}
                onClose={handleCloseAssignPatientModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <PosologyComponent
                    onSave={onAssignPatient}
                    days={days}
                    repetition={repetition}
                    hours={hours}
                    note={note}
                    patientId={patientId}
                    drugId={drugId}
                    drug={drug}
                    lg={lg} />
            </Modal>
            <Modal
                open={openAssignEffectModal}
                onClose={handleCloseAssignEffectModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={styleModal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {lg.get('Assign a side effect')}
                    </Typography>
                    <ComboEffects lg={lg} onSelect={onEffectSelect} />
                    <Button
                        style={{ borderRadius: '10px', marginTop: '20px' }}
                        variant="outlined" startIcon={<Save />}
                        onClick={onAssignEffect}>
                        {lg.get('Assign')}
                    </Button>
                </Box>
            </Modal>
            <Box sx={{ width: '100%' }}>
                
                <Grid container spacing={1}>
                    <Grid item xs={12} lg={9} >
                        <Card >
                            <CardHeader
                                avatar={
                                    <VaccinesIcon color={'primary'} />
                                }
                                sx={{ borderBottom: '1px solid #cecece' }}
                                title={lg.get('Treatment details')}
                                subheader={name}
                                action={<>
                                    <IconButton aria-label="assign patient">
                                        <Button variant="outlined" style={{ marginRight: '5px' }} onClick={handleAssignPatientModal}>{lg.get('Assign a patient')}</Button>
                                    </IconButton>
                                    <IconButton aria-label="assign patient">
                                        <Button variant="outlined" onClick={() => document.getElementById("newButton").clk(drugId, name, 'drug_patients')}>{lg.get('List of patients')}</Button>
                                    </IconButton></>
                                }
                            />
                            <CardContent>
                                <Grid container spacing={1} sx={{ pt: '30px' }}>
                                    <Grid item style={{ width: '205px', height: '205px', textAlign: "center", border: '3px solid #ddd', borderRadius: '5px', margin: 'auto', paddingLeft: '0px', paddingTop: '0px' }}>
                                        <Avatar variant="rounded"
                                            src={image}
                                            style={{ width: '200px', height: '200px', textAlign: "center", borderColor: 'gray', margin: 'auto' }}
                                        />
                                        <Grid item xs={12} style={{ width: '100%', textAlign: "center" }}>
                                            <Button id="avatarLabel" onClick={() => uploadFileButton.current.click()}>{lg.get('Upload photo')}</Button>
                                            <input type="file" name="avatar" onChange={onFileChange} ref={uploadFileButton} style={{ display: 'none' }} />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={9} >
                                        <Grid container spacing={1}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                                                    label={lg.get('Name')}
                                                    id="name"

                                                    value={name ? name : ''}
                                                    onChange={onInputChange(setName)}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={6} >
                                                <TextField
                                                    style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                                                    label={lg.get('Molecule name')}
                                                    id="code"
                                                    value={moleculeName ? moleculeName : ''}
                                                    onChange={onInputChange(setMoleculeName)}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={6} >
                                                <TextField
                                                    style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                                                    label="code"
                                                    id="code"

                                                    value={code ? code : ''}
                                                    onChange={onInputChange(setCode)}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={6} >
                                                <ComboLaboratories lg={lg} onSelect={onLaboratorySelect} laboratory={{ id: laboratoryId, name: laboratoryName }} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        <Grid item xs={12} sx={{ mt: '30px' }} >
                            <Card >
                                <CardHeader
                                    sx={{ borderBottom: '1px solid #cecece' }}
                                    avatar={
                                        <DescriptionIcon color={'primary'}/>
                                    }
                                    action={
                                        <FormControl sx={{ mt: '3px' }}>
                                            <InputLabel id="demo-simple-select-autowidth-label">{lg.get('Lang')}</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth"
                                                value={langId}
                                                onChange={handleLangChange}
                                                autoWidth
                                                label={lg.get('Lang')}
                                                size={'small'}>
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={'fr'}>FR</MenuItem>
                                                <MenuItem value={'nl'}>NL</MenuItem>
                                                <MenuItem value={'en'}>EN</MenuItem>
                                            </Select>
                                        </FormControl>
                                    }
                                    title={lg.get('Description')}
                                    subheader={lg.get('Add your description or upload a doc with the link here under')}
                                />
                                <CardContent>
                                    <ReactQuill theme="snow" value={description} onChange={setDescription} />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={3} style={{ paddingLeft: '20px' }}>
                        <Card >
                            <CardHeader
                                avatar={
                                    <SickIcon color={'error'} />
                                }
                                sx={{ borderBottom: '1px solid #cecece' }}
                                title={lg.get('Side effects')}
                                subheader={lg.get('Due to')+' '+name}
                                action={
                                    <IconButton aria-label="assign patient">
                                        <AddCircleOutlineIcon onClick={handleAssignEffectModal} color={'success'} />
                                    </IconButton>
                                }
                            />
                            <CardContent>
                                <SideEffects drugId={drugId} lg={lg} update={sideEffectUpdated} onDeleted={onDeleteSideEffect}/>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container spacing={2} direction="row" style={{ textalign: 'center' }}>
                    <Grid item style={{ marginTop: '6px' }} >
                        <a href={process.env.REACT_APP_API_URL + '/public/drugs/documents/' + notice} target="_blank" style={{ color: '#0d99ff' }}>{notice}</a>
                    </Grid>
                    <Grid item  >
                        <Button id="noticeLabel" onClick={() => uploadNoticeButton.current.click()}>{lg.get('Upload notice')}</Button>
                        <input type="file" name="notice" onChange={onNoticeChange} ref={uploadNoticeButton} style={{ display: 'none' }} />
                    </Grid>
                </Grid>
                <Button
                    style={{ borderRadius: '10px', marginTop: '20px' }}
                    variant="outlined" startIcon={<Save />}
                    onClick={onSubmit}>
                    {lg.get('Save')}
                </Button>
            </Box>
        </>
    );
}
