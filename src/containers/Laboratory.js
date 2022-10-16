import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Save } from '@mui/icons-material';
import { Button, Card, CardContent, CardHeader, IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';
import AngelLaboratory from '../api/angel/laboratory';
import Translation from '../utils/translation';
import { useStore } from '../utils/store';
import BiotechIcon from '@mui/icons-material/Biotech';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

export default function LaboratoryContainer(props) {

    const { enqueueSnackbar } = useSnackbar();

    const { session, } = useStore();
    const [userSession,] = React.useState(session.user ? session.user : null);
    const lg = new Translation(userSession ? userSession.lang : 'en');

    const [id, setId] = React.useState(null);
    const [, setLaboratoryId] = React.useState(null);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [streetNumber, setStreetNumber] = React.useState('');
    const [city, setCity] = React.useState('');
    const [zip, setZip] = React.useState('');
    const [country, setCountry] = React.useState('');


    React.useEffect(() => {
        if (props.laboratoryId) {
            async function fetchData() {
                const laboratory = await AngelLaboratory().find({ laboratory_id: props.laboratoryId });
                setId(laboratory.laboratory_id);
                setLaboratoryId(laboratory.laboratory_id);
                setName(laboratory.laboratory_name);
                setEmail(laboratory.email);
                setPhone(laboratory.phone);
                setAddress(laboratory.address);
                setStreetNumber(laboratory.street_number);
                setZip(laboratory.zip);
                setCity(laboratory.city);
                setCountry(laboratory.country);
            }
            fetchData();
        }
    }, []);

    const onInputChange = setter => e => {
        setter(e.target.value);
    };
    const handleClickVariant = (variant, text) => {
        // Variant could be success, error, warning, info, or default
        enqueueSnackbar(text, { variant });
    };
    const onSubmit = async e => {
        e.preventDefault();
        if (!name) {
            handleClickVariant('error', lg.get('The name are required'));
        } else {
            const u = {
                name: name,
                email: email,
                phone: phone,
                address: address,
                street_number: streetNumber,
                zip: zip,
                city: city,
                country: country
            };
            if (id) {
                u.id = id;
                try {
                    await AngelLaboratory().update(u);
                    handleClickVariant('success', lg.get('Laboratory well updated'));
                } catch (e) {
                    handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
                }
            } else {
                try {
                    const laboratory = await AngelLaboratory().add(u);
                    setId(laboratory.inserted_id);
                    handleClickVariant('success', lg.get('Laboratory well added'));
                } catch (e) {
                    handleClickVariant('error', e.error.statusText + ' ' + e.error.message);
                }
            }
        }
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box >
                <Card >
                    <CardHeader
                        avatar={
                            <BiotechIcon color={'primary'} />
                        }
                        sx={{ borderBottom: '1px solid #cecece' }}
                        title={name ? name : lg.get('Informations')}
                        subheader={email + ', ' + phone }
                        action={<>
                            <IconButton aria-label="assign patient">
                                <Button
                                    size={'small'}
                                    style={{ borderRadius: '10px', marginTop: '20px' }}
                                    variant="outlined" startIcon={<Save />}
                                    onClick={onSubmit}>
                                    {lg.get('Save')}
                                </Button>
                            </IconButton></>
                        }
                    />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={4}>
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
                            <Grid item xs={6} md={4}>
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

                            </Grid>
                            <Grid item xs={6} md={4}>
                                <TextField
                                    style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                                    label={lg.get('Phone')}
                                    id="phone"
                                    sx={{ '& > :not(style)': { mt: 1 } }}
                                    value={phone ? phone : ''}
                                    onChange={onInputChange(setPhone)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Card sx={{mt: '20px'}}>
                    <CardHeader
                        avatar={
                            <FmdGoodIcon color={'primary'} />
                        }
                        sx={{ borderBottom: '1px solid #cecece' }}
                        title={address ? address + ' ' + streetNumber : lg.get('Address')}
                        subheader={zip + ', ' + city}
                        action={<>
                            <IconButton aria-label="assign patient">
                               
                            </IconButton></>
                        }
                    />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                                    label={lg.get('Address')}
                                    id="address"
                                    sx={{ '& > :not(style)': { mt: 1 } }}
                                    value={address ? address : ''}
                                    onChange={onInputChange(setAddress)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                                    label={lg.get('Number')}
                                    id="number"
                                    sx={{ '& > :not(style)': { mt: 1 } }}
                                    value={streetNumber ? streetNumber : ''}
                                    onChange={onInputChange(setStreetNumber)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                                    label={lg.get('City')}
                                    id="city"
                                    sx={{ '& > :not(style)': { mt: 1 } }}
                                    value={city ? city : ''}
                                    onChange={onInputChange(setCity)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}
                                    label={lg.get('Zip')}
                                    id="zip"
                                    sx={{ '& > :not(style)': { mt: 1 } }}
                                    value={zip ? zip : ''}
                                    onChange={onInputChange(setZip)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} style={{paddingTop:'23px'}}>
                                <FormControl fullWidth style={{ display: 'flex', width: '100%', marginLeft: '7px' }} >
                                    <InputLabel id="langLabel">Pays</InputLabel>
                                    <Select
                                        style={{ display: 'flex', width: '100%' }}
                                        labelId="countryLabel"
                                        id="country"
                                        value={country ? country : ''}
                                        onChange={onInputChange(setCountry)}
                                        label={lg.get('Country')} >
                                        <MenuItem value={'belgium'}>Belgium</MenuItem>
                                        <MenuItem value={'luxembourg'}>Luxembourg</MenuItem>
                                        <MenuItem value={'espagne'}>Espagne</MenuItem>
                                        <MenuItem value={'hollande'}>Hollande</MenuItem>
                                        <MenuItem value={'italie'}>Italie</MenuItem>
                                        <MenuItem value={'france'}>France</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </LocalizationProvider>
    );
}
