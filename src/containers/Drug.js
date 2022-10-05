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
import { Button, Modal } from '@mui/material';
import { useSnackbar } from 'notistack';
import ComboLaboratories from '../components/ComboLaboratories';
import Avatar from '@mui/material/Avatar';
import PosologyComponent from '../components/Posology';
import AngelDrug from '../api/angel/drugs';
import AngelPosology from '../api/angel/posologies';

export default function DrugContainer(props) {

    const { enqueueSnackbar } = useSnackbar();

    const [id, setId] = React.useState(null);
    const [drugId, setDrugId] = React.useState(null);
    const [drug, setDrug] = React.useState(null);
    const [descriptionId, setDescriptionId] = React.useState(null);
    const [name, setName] = React.useState('');
    const [code, setCode] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [langId, setLangId] = React.useState('en');
    const [laboratoryId, setLaboratoryId] = React.useState(() => '');
    const [laboratoryName, setLaboratoryName] = React.useState(() => '');
    const [openAssignPatientModal, setOpenAssignPatientModal] = React.useState(false);
    const defaultAvatar = 'https://dreamguys.co.in/preadmin/html/school/dark/assets/img/placeholder.jpg';//process.env.SENDGRID_APIKEY
    const [image, setImage] = React.useState(defaultAvatar);
    const [notice, setNotice] = React.useState('');
    const [file, setFile] = React.useState(null);
    const [document, setDocument] = React.useState(null);
    const uploadFileButton = useRef(null);
    const uploadNoticeButton = useRef(null);

    const [repetition, ] = React.useState(props.repetition);
    const [note, ] = React.useState(props.note);
    const [days, ] = React.useState(props.days);
    const [hours, ] = React.useState([12]);
    const [patientId, setPatientId] = React.useState(props.patientId);

    React.useEffect(() => {
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
                setNotice(drug.notice);
                setDrug({id:drug.drug_id,drug_id:drug.drug_id,name:drug.name,code:drug.code})
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
                if(a && a.code ) {
                    handleClickVariant('error', a.code);
                } else {
                    handleClickVariant('success', 'Patient well assigned');
                    handleCloseAssignPatientModal();
                }
            } catch (e) {
                handleClickVariant('error', JSON.stringify(e));
            }
        } else {
            handleClickVariant('error', 'Patient, hours and frequency are required');
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
    const onNoticeChange = async (e) => {
        setDocument({ file: e.target.files[0] });
        const u = await AngelDrug().notice(e.target.files[0], 'drug', descriptionId);
        setNotice(process.env.REACT_APP_API_URL + '/public/drugs/documents/' + u.filename);
        handleClickVariant('success', 'Document well uploaded');
    };
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
                drug={drug} />
            </Modal>
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
                                startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>
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
                <Grid container spacing={2} direction="row" style={{ textalign: 'center' }}>
                    <Grid item style={{ marginTop: '6px' }} >
                        <a href={process.env.REACT_APP_API_URL + '/public/drugs/documents/' + notice} target="_blank" style={{ color: '#0d99ff' }}>{notice}</a>
                    </Grid>
                    <Grid item  >
                        <Button id="noticeLabel" onClick={() => uploadNoticeButton.current.click()}>Upload notice</Button>
                        <input type="file" name="notice" onChange={onNoticeChange} ref={uploadNoticeButton} style={{ display: 'none' }} />
                    </Grid>
                </Grid>
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
