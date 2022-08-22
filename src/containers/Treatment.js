import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Save } from '@mui/icons-material';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Modal from '@mui/material/Modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSnackbar } from 'notistack';
import AngelTreatment from '../api/angel/treatments';
import ComboDrugs from '../components/ComboDrugs';
import ComboUsers from '../components/ComboUsers';

export default function TreatmentContainer(props) {
    const editorConfig = {}
    const { enqueueSnackbar } = useSnackbar();

    const [id, setId] = React.useState(null);
    const [treatmentId, setTreatmentId] = React.useState(null);
    const [descriptionId, setDescriptionId] = React.useState(null);
    const [description, setDescription] = React.useState('');
    const [name, setName] = React.useState('');
    const [code, setCode] = React.useState('');
    const [langId, setLangId] = React.useState('en');
    const [posology, setPosology] = React.useState('');

    const [openAssignDrugModal, setOpenAssignDrugModal] = React.useState(false);
    const [assignDrugId, setAssignDrugId] = React.useState(null);

    const [openAssignPatientModal, setOpenAssignPatientModal] = React.useState(false);
    const [assignPatientId, setAssignPatientId] = React.useState(null);//posology


    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    React.useEffect(() => {
        console.log("Treatment container effect")
        if (props.treatmentId) {
            async function fetchData() {
                const treatment = await AngelTreatment().find({ treatment_id: props.treatmentId });
                setId(treatment.treatment_id);
                setTreatmentId(treatment.treatment_id);
                setDescriptionId(treatment.treatment_description_id);
                setDescription(treatment.description);
                setName(treatment.name);
                setCode(treatment.code);
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
        if (!name || !code) {
            handleClickVariant('error', 'The name and code are required');
        } else {
            const u = {
                name: name,
                code: code
            };
            if (id) {
                u.id = id;
                try {
                    await AngelTreatment().update(u);
                    await setTreatmentDescription();
                    handleClickVariant('success', 'Treatment well updated');
                } catch (e) {
                    handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
                }
            } else {
                try {
                    const treatment = await AngelTreatment().add(u);
                    setId(treatment.inserted_id)
                    await setTreatmentDescription(treatment.inserted_id);
                    handleClickVariant('success', 'Treatment well added');
                } catch (e) {
                    handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
                }
            }
        }
    };
    const setTreatmentDescription = async (treatmentId) => {
        const u = {
            id: descriptionId,
            treatment_id: treatmentId ? treatmentId : id,
            description: description,
            lang_id: langId
        };
        if (descriptionId) {
            try {
                await AngelTreatment().updateDescription(u);
            } catch (e) {
                handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
            }
        } else {
            try {
                const p = await AngelTreatment().addDescription(u);
                setDescriptionId(p.inserted_id);
            } catch (e) {
                handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
            }
        }
    }
    const handleAssignDrugModal = () => setOpenAssignDrugModal(true);
    const handleCloseAssignDrugModal = () => setOpenAssignDrugModal(false);

    const handleAssignPatientModal = () => setOpenAssignPatientModal(true);
    const handleCloseAssignPatientModal = () => setOpenAssignPatientModal(false);
    const onAssignDrug = async e => {
        console.log(e);
        const u = {
            drug_id: assignDrugId,
            treatment_id: treatmentId,
        };
        if (assignDrugId && treatmentId) {
            try {
                await AngelTreatment().addDrug(u);
                handleClickVariant('success', 'Drug well assigned');
            } catch (e) {
                handleClickVariant('error', JSON.stringify(e));
            }
        } else {
            handleClickVariant('error', JSON.stringify(e));
        }
    }
    const onAssignPatient = async e => {
        console.log(e);
        const u = {
            patient_id: assignPatientId,
            treatment_id: treatmentId,
            posology: posology,
            start_date: formatDate(startDate),
            end_date: endDate?formatDate(endDate):null,
        };
        console.log(assignPatientId, treatmentId, startDate, endDate)
        if (assignPatientId && treatmentId && startDate && posology) {
            try {
                await AngelTreatment().addPatient(u);
                handleClickVariant('success', 'Patient well assigned');
            } catch (e) {
                handleClickVariant('error', JSON.stringify(e));
            }
        } else {
            handleClickVariant('error', 'Patient,Posology start date are required');
        }
    }
    const onPatientSelect = (drugId) => {
        setAssignPatientId(drugId);
    }
    const onDrugSelect = (drugId) => {
        setAssignDrugId(drugId);
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

    const handleStartDateChange = (newValue) => {
        setStartDate(newValue);
    };

    const handlePosology = (e) => {
        console.log(e)
        setPosology(e.target.value);
    };
    const handleEndDateChange = (newValue) => {
        setEndDate(newValue);
    };

    const formatDate = (v) => {
        let d = new Date(v);
        var datestring = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":00";
        return datestring;
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div>
                <Modal
                    open={openAssignDrugModal}
                    onClose={handleCloseAssignDrugModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={styleModal}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Assign a drug
                        </Typography>
                        <ComboDrugs onSelect={onDrugSelect} />
                        <Button
                            style={{ borderRadius: '10px', marginTop: '20px' }}
                            variant="outlined" startIcon={<Save />}
                            onClick={onAssignDrug}>
                            Assign
                        </Button>
                    </Box>
                </Modal>
            </div>
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
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Posology</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={posology?posology:''}
                                    label="Posology"
                                    onChange={handlePosology}
                                >
                                    <MenuItem value={'daily'}>Daily</MenuItem>
                                    <MenuItem value={'morningnight'}>Morning/Night</MenuItem>
                                    <MenuItem value={'spontaneously'}>Spontaneously</MenuItem>
                                </Select>
                            </FormControl>

                        </Box>

                        <Box
                            style={{ display: 'flex', width: '100%', paddingTop: '8px' }}
                        >
                            <DateTimePicker
                                style={{ display: 'flex', width: '100%', minWidth: '100%' }}
                                id="datestart"
                                label="Start date"
                                value={startDate ? startDate : ''}
                                onChange={handleStartDateChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Box>
                        <Box style={{ display: 'flex', width: '100%', paddingTop: '8px' }}>
                            <DateTimePicker
                                style={{ display: 'flex', width: '100%', minWidth: '100%' }}
                                id="dateend"
                                label="End date"
                                value={endDate ? endDate : ''}
                                onChange={handleEndDateChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Box>
                        <Button
                            style={{ borderRadius: '10px', marginTop: '20px' }}
                            variant="outlined" startIcon={<Save />}
                            onClick={onAssignPatient}>
                            Assign
                        </Button>
                    </Box>
                </Modal>
            </div>
            <Button variant="outlined" style={{ marginRight: '5px' }} onClick={handleAssignDrugModal}>Assign drug</Button>
            <Button variant="outlined" style={{ marginRight: '5px' }} onClick={handleAssignPatientModal}>Assign patient</Button>
            <Button variant="outlined" style={{ marginRight: '5px' }} onClick={() => document.getElementById("newButton").clk(treatmentId, name, 'treatment_drugs')}>List of drugs</Button>
            <Button variant="outlined" onClick={() => document.getElementById("newButton").clk(treatmentId, name, 'treatment_patients')}>List of patients</Button>
            <Box sx={{ width: '100%' }}>
                <Typography variant="h6" gutterBottom component="div">
                    Treatment Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid item >
                        <TextField
                            style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                            label="Name"
                            id="name"
                            sx={{ '& > :not(style)': { mt: 1 } }}
                            value={name ? name : ''}
                            onChange={onInputChange(setName)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item >
                        <TextField
                            style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                            label="code"
                            id="code"
                            sx={{ '& > :not(style)': { mt: 1 } }}
                            value={code ? code : ''}
                            onChange={onInputChange(setCode)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item >
                    </Grid>
                </Grid>
                <Typography variant="h6" gutterBottom component="div" style={{ marginTop: '20px' }}>
                    Treatment descriptions
                </Typography>
                <ReactQuill theme="snow" value={description} onChange={setDescription} />
                <Button
                    style={{ borderRadius: '10px', marginTop: '20px' }}
                    variant="outlined" startIcon={<Save />}
                    onClick={onSubmit}>
                    Save
                </Button>
            </Box>
        </LocalizationProvider>
    );
}
