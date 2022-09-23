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
import { Button, FormControl, InputLabel, MenuItem, Select, Modal } from '@mui/material';
import { useSnackbar } from 'notistack';
import AngelDrug from '../api/angel/drugs';
import ComboLaboratories from '../components/ComboLaboratories';
import ComboUsers from '../components/ComboUsers';
import { MobileDatePicker } from '@mui/lab';
import Avatar from '@mui/material/Avatar';

export default function DrugContainer(props) {

    const { enqueueSnackbar } = useSnackbar();

    const [id, setId] = React.useState(null);
    const [drugId, setDrugId] = React.useState(null);
    const [descriptionId, setDescriptionId] = React.useState(null);
    const [name, setName] = React.useState('');
    const [code, setCode] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [langId, setLangId] = React.useState('en');
    const [laboratoryId, setLaboratoryId] = React.useState(() => '');
    const [laboratoryName, setLaboratoryName] = React.useState(() => '');
    const [openAssignDrugModal, setOpenAssignDrugModal] = React.useState(false);
    const [openAssignPatientModal, setOpenAssignPatientModal] = React.useState(false);
    const [assignPatientId, setAssignPatientId] = React.useState(null);//posology
    const [assignDrugId, setAssignDrugId] = React.useState(null);
    const [posology, setPosology] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const defaultAvatar = 'https://dreamguys.co.in/preadmin/html/school/dark/assets/img/placeholder.jpg';//process.env.SENDGRID_APIKEY
    const [image, setImage] = React.useState(defaultAvatar);
    const [file, setFile] = React.useState(null);
    const uploadFileButton = useRef(null);

    React.useEffect(() => {
        console.log("Drug container effect")
        if (props.drugId) {
            async function fetchData() {
                const drug = await AngelDrug().find({ id: props.drugId });
                setId(drug.drug_id);
                setDrugId(drug.drug_id);
                setDescriptionId(drug.drug_description_id);
                setDescription(drug.description);
                setName(drug.name);
                setCode(drug.code);
                setLaboratoryId(drug.laboratory_id);
                setLaboratoryName(drug.laboratory_name);
                setImage(drug.image ? process.env.REACT_APP_API_URL + '/public/drugs/images/' + drug.image : defaultAvatar);
                console.log(process.env.REACT_APP_API_URL + '/public/drugs/images/' + drug.image)
            }
            fetchData();
        }
    }, []);

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
    const onEditorChange = (val) => {
        console.log('editor chaged', val)
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
            handleClickVariant('error', 'The name and code are required');
        } else {
            const u = {
                name: name,
                code: code,
                laboratory_id: laboratoryId
            };
            if (id) {
                u.id = id;
                try {
                    await AngelDrug().update(u);
                    await setDrugDescription();
                    handleClickVariant('success', 'Drug well updated');
                } catch (e) {
                    handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
                }
            } else {
                try {
                    const drug = await AngelDrug().add(u);
                    setId(drug.inserted_id)
                    await setDrugDescription(drug.inserted_id);
                    handleClickVariant('success', 'Drug well added');
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
    const handleAssignDrugModal = () => setOpenAssignDrugModal(true);
    const handleCloseAssignDrugModal = () => setOpenAssignDrugModal(false);
    const handleAssignPatientModal = () => setOpenAssignPatientModal(true);

    const onDrugSelect = (drugId) => {
        setAssignDrugId(drugId);
    }

    const handleCloseAssignPatientModal = () => setOpenAssignPatientModal(false);
    const onPatientSelect = (drugId) => {
        setAssignPatientId(drugId);
    }
    const handlePosology = (e) => {
        console.log(e)
        setPosology(e.target.value);
    };
    const handleStartDateChange = (newValue) => {
        setStartDate(newValue);
    };
    const handleEndDateChange = (newValue) => {
        setEndDate(newValue);
    };

    const onAssignPatient = async e => {
        console.log(e);
        const u = {
            patient_id: assignPatientId,
            drug_id: drugId,
            posology: posology,
            start_date: formatDate(startDate),
            end_date: endDate ? formatDate(endDate) : null,
        };
        console.log(assignPatientId, drugId, startDate, endDate)
        if (assignPatientId && drugId && startDate && posology) {
            try {
                await AngelDrug().addPatient(u);
                handleClickVariant('success', 'Patient well assigned');
            } catch (e) {
                handleClickVariant('error', JSON.stringify(e));
            }
        } else {
            handleClickVariant('error', 'Patient,Posology start date are required');
        }
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
                            Assign a patient
                        </Typography>
                        <ComboUsers type="patient" onSelect={onPatientSelect} />
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Posology</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={posology ? posology : ''}
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
                            <MobileDatePicker
                                key="datestart"
                                id="datestart"
                                label="Start date"
                                inputFormat="MM/dd/yyyy"
                                value={startDate ? startDate : ''}
                                onChange={handleStartDateChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Box>
                        <Box style={{ display: 'flex', width: '100%', paddingTop: '8px' }}>
                            <MobileDatePicker
                                key="dateend"
                                id="dateend"
                                label="End date"
                                inputFormat="MM/dd/yyyy"
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
            <Box sx={{ width: '100%' }}>
                <Typography variant="h6" gutterBottom component="div">
                    Drug Details
                </Typography>
                <Button variant="outlined" style={{ marginRight: '5px' }} onClick={handleAssignPatientModal}>Assign patient</Button>
                <Button variant="outlined" onClick={() => document.getElementById("newButton").clk(drugId, name, 'drug_patients')}>List of patients</Button>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} xl={2} style={{ paddingTop: '40px' }}>
                        <Grid item xs={12} style={{ width: '205px', height: '205px', textAlign: "center", border: '3px solid #ddd', borderRadius: '5px', margin: 'auto' }} >
                            <Avatar variant="rounded"
                                src={image}
                                style={{ width: '200px', height: '200px', textAlign: "center", borderColor: 'gray', margin: 'auto' }}
                            />
                            <Grid item xs={12} style={{ width: '100%', textAlign: "center" }}>
                                <Button id="avatarLabel" onClick={() => uploadFileButton.current.click()}>Upload image</Button>
                                <input type="file" name="avatar" onChange={onFileChange} ref={uploadFileButton} style={{ display: 'none' }} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item >
                        <TextField
                            style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                            label="Name"
                            id="name"

                            value={name ? name : ''}
                            onChange={onInputChange(setName)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                            }}
                        />
                        <TextField
                            style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                            label="code"
                            id="code"

                            value={code ? code : ''}
                            onChange={onInputChange(setCode)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item >
                    </Grid>
                    <Grid item >
                        <ComboLaboratories onSelect={onLaboratorySelect} laboratory={{ id: laboratoryId, name: laboratoryName }} />
                    </Grid>
                </Grid>
                <Typography variant="h6" gutterBottom component="div" style={{ marginTop: '40px' }}>
                    Drug descriptions
                </Typography>
                <ReactQuill theme="snow" value={description} onChange={setDescription} />
                <Button
                    style={{ borderRadius: '10px', marginTop: '20px' }}
                    variant="outlined" startIcon={<Save />}
                    onClick={onSubmit}>
                    Save
                </Button>
            </Box>
        </>
    );
}
