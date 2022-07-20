import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Save } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import AngelDrug from '../api/angel/drugs';

export default function DrugContainer(props) {
    
    const { enqueueSnackbar } = useSnackbar();

    const [id, setId] = React.useState(null);
    const [drugId, setDrugId] = React.useState(null);
    const [descriptionId, setDescriptionId] = React.useState(null);
    const [name, setName] = React.useState('');
    const [code, setCode] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [langId, setLangId] = React.useState('en');
   
    
    React.useEffect(() => {
        console.log("Drug container effect")
        if (props.drugId) {
            async function fetchData() {
                const drug = await AngelDrug().find({ drug_id: props.drugId });
                setId(drug.drug_id);
                setDescriptionId(drug.drug_description_id);
                setDescription(drug.description);
                setName(drug.name);
                setCode(drug.code);
            }
            fetchData();
        }
    }, []);
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
                code: code
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
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ width: '100%' }}>
                <Typography variant="h6" gutterBottom component="div">
                    Drug Details
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
                    Drug descriptions
                </Typography>
                <ReactQuill theme="snow" value={description} onChange={setDescription}/>
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
