import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Save } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import AngelMood from '../api/angel/mood';

export default function MoodContainer(props) {

    const { enqueueSnackbar } = useSnackbar();

    const [id, setId] = React.useState(null);
    const [moodDescriptionId, setMoodDescriptionId] = React.useState(null);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [langId, setLangId] = React.useState(props.langId);


    React.useEffect(() => {
        console.log("Mood container effect")
        if (props.moodId) {
            setId(props.moodId);
            fetchData(props.moodId, langId);
        }
    }, []);
    async function fetchData(id, lang_id) {

        const mood = await AngelMood().find({ mood_id: id, lang_id: lang_id });
        if (mood && mood.mood_id != null) {
            setId(mood.mood_id);
        }
        setMoodDescriptionId((mood && mood.mood_description_id) ? mood.mood_description_id : null);
        setName((mood && mood.name) ? mood.name : '');
        setDescription((mood && mood.description) ? mood.description : '');
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
        if (!name) {
            handleClickVariant('error', 'The name is required');
        } else {
            const u = {};
            if (id) {
                u.id = id;
                try {
                    await AngelMood().update(u);
                    await setMoodDescription();
                    handleClickVariant('success', 'Mood well updated');
                } catch (e) {
                    handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
                }
            } else {
                try {
                    const mood = await AngelMood().add(u);
                    setId(mood.inserted_id)
                    await setMoodDescription(mood.inserted_id);
                    handleClickVariant('success', 'Mood well added');
                } catch (e) {
                    handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
                }
            }
        }
    };
    const setMoodDescription = async (moodId) => {

        const u = {
            id: moodDescriptionId,
            mood_id: moodId ? moodId : id,
            name: name,
            description: description,
            lang_id: langId
        };
        if (moodDescriptionId) {
            try {
                await AngelMood().updateDescription(u);
            } catch (e) {
                handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
            }
        } else {
            try {
                const p = await AngelMood().addDescription(u);
                setMoodDescriptionId(p.inserted_id);
            } catch (e) {
                handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
            }
        }
    }
    const handleLangChange = (event) => {
        setLangId(event.target.value);
        if(id && id != null) {
            fetchData(id, event.target.value);
        }
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={2} mb={'20px'}>
                    <Grid item xs={11}>
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
                    <Grid item>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Lang</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={langId}
                                onChange={handleLangChange}
                                autoWidth
                                label="Lang"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'fr'}>FR</MenuItem>
                                <MenuItem value={'nl'}>NL</MenuItem>
                                <MenuItem value={'en'}>EN</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
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
