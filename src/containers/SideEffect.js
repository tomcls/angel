import * as React from 'react';
import Box from '@mui/material/Box';
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
import AngelSideEffect from '../api/angel/sideEffect';
import { useStore } from '../utils/store';
import Translation from '../utils/translation';

export default function SideEffectContainer(props) {

    const { enqueueSnackbar } = useSnackbar();

    const { session, } = useStore();
    const [userSession,] = React.useState(session.user ? session.user : null);
    const lg = new Translation(userSession ? userSession.lang : 'en');

    const [id, setId] = React.useState(null);
    const [sideEffectDescriptionId, setSideEffectDescriptionId] = React.useState(null);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [langId, setLangId] = React.useState(props.langId);

    React.useEffect(() => {
        if (props.sideEffectId) {
            setId(props.sideEffectId);
            fetchData(props.sideEffectId, langId);
        }
    }, []);
    async function fetchData(id, lang_id) {
        const sideEffect = await AngelSideEffect().find({ side_effect_id: id, lang_id: lang_id });
        if (sideEffect && sideEffect.side_effect_id != null) {
            setId(sideEffect.side_effect_id);
        }
        setSideEffectDescriptionId((sideEffect && sideEffect.side_effect_id) ? sideEffect.side_effect_id : null);
        setName((sideEffect && sideEffect.name) ? sideEffect.name : '');
        setDescription((sideEffect && sideEffect.description) ? sideEffect.description : '');
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
            handleClickVariant('error', lg.get('The name is required'));
        } else {
            const u = {};
            if (id) {
                u.id = id;
                try {
                    await AngelSideEffect().update(u);
                    await setSideEffectDescription();
                    handleClickVariant('success', lg.get('SideEffect well updated'));
                } catch (e) {
                    handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
                }
            } else {
                try {
                    const sideEffect = await AngelSideEffect().add(u);
                    setId(sideEffect.inserted_id)
                    await setSideEffectDescription(sideEffect.inserted_id);
                    handleClickVariant('success', lg.get('SideEffect well added'));
                } catch (e) {
                    handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
                }
            }
        }
    };
    const setSideEffectDescription = async (sideEffectId) => {

        const u = {
            id: sideEffectDescriptionId,
            side_effect_id: sideEffectId ? sideEffectId : id,
            name: name,
            description: description,
            lang_id: langId
        };
        if (sideEffectDescriptionId) {
            try {
                await AngelSideEffect().updateDescription(u);
            } catch (e) {
                handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
            }
        } else {
            try {
                const p = await AngelSideEffect().addDescription(u);
                setSideEffectDescriptionId(p.inserted_id);
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
                            label={lg.get('Name')}
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
                            <InputLabel id="demo-simple-select-autowidth-label">{lg.get('Lang')}</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={langId}
                                onChange={handleLangChange}
                                autoWidth
                                label={lg.get('Lang')}
                            >
                                <MenuItem value="">
                                    <em>{lg.get('None')}</em>
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
                    {lg.get('Save')}
                </Button>
            </Box>
        </LocalizationProvider>
    );
}
