import { Add, Save } from '@mui/icons-material';
import { MobileDatePicker, TimePicker } from '@mui/lab';
import { Box, Button, Fab, FormControl, Grid, InputLabel, MenuItem, Select, TextareaAutosize, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react';
import ComboUsers from './ComboUsers';
import ComboDrugs from '../components/ComboDrugs';

import dayjs from 'dayjs';
const style = {
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
export default function PosologyComponent(props) {
    const [id,] = React.useState(props.id);
    const [posologyId,] = React.useState(props.posologyId);
    const [drugId, setDrugId] = React.useState(props.drugId);
    const [patientId, setPatientId] = React.useState(props.patientId);
    const [hours, setHours] = React.useState(props.hours);
    const [repetition, setRepetition] = React.useState(props.repetition ? props.repetition : 'week');
    const [note, setNote] = React.useState(props.note);
    const [week, setWeek] = React.useState(props.week);
    const [startDate, setStartDate] = React.useState(props.startDate ? props.startDate : new Date());
    const [endDate, setEndDate] = React.useState(props.endDate);
    const [arrayUpdated, updateArray] = React.useState(props.refresh);

    const onAddHour = () => {
        setHours([...hours, 12]);
    };
    const onSetHour = (value, key) => {
        let h = hours;
        h[key] = value;
        setHours(h);
        updateArray(new Date().getMilliseconds());
    }
    const onWeekDayClick = (event, newFormats) => {
        console.log('newFormats', newFormats)
        setWeek(newFormats);
    }
    const onAssignPatient = () => {
        props.onSave({
            id: id,
            posology_id: posologyId,
            start_date: startDate,
            patient_id: patientId,
            drug_id: drugId,
            days: week,
            hours: hours,
            repetition: repetition,
            note: note ? note : null,
            end_date: endDate ? endDate : null,
        });
    }

    const onPatientSelect = (id) => {
        setPatientId(id);
    }
    const handleStartDateChange = (newValue) => {
        console.log(newValue)
        setStartDate(newValue);
    };
    const handleEndDateChange = (newValue) => {
        setEndDate(newValue);
    };
    const onDrugSelect = (drugId) => {
        setDrugId(drugId);
    }
    return (
        <Box sx={style} data={arrayUpdated} style={{ paddingTop: '5px' }} >
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ paddingTop: '0px', marginTop: '0px', textAlign: 'center', marginBottom: '15px' }}>
                {props.lg.get('Assign treatment to a patient')}
            </Typography>
            <ComboUsers lg={props.lg} type="patient" onSelect={onPatientSelect} patientId={patientId} patient={props.patient} />
            <ComboDrugs lg={props.lg} onSelect={onDrugSelect} drugId={drugId} drug={props.drug} />
            <Grid item xs={12} style={{ paddingTop: '0px', marginTop: '0px', marginBottom: '5px', marginRight: '0px', marginLeft: '0px' }}>
                <Typography variant="caption"  >{props.lg.get('When to start')}?</Typography>
            </Grid>
            <Grid item xs={12} style={{ paddingTop: '5px', marginBottom: '0px', paddingBottom: '0px' }}>
                <MobileDatePicker
                    key="datestart"
                    id="datestart"
                    label={props.lg.get('Start date')}
                    inputFormat="dd/MM/yyyy"
                    defaultValue={new Date()}
                    value={startDate ? startDate : new Date()}
                    onChange={handleStartDateChange}
                    renderInput={(params) => <TextField size="small" {...params} style={{ paddingTop: '0px', marginTop: '0px', marginBottom: '0px', marginRight: '0px', marginLeft: '0px' }} />}
                />
            </Grid>
            <Grid item xs={12} style={{ paddingTop: '0px', marginTop: '0px', marginBottom: '10px', marginRight: '0px', marginLeft: '0px' }}>
                <Typography variant="caption"  >{props.lg.get('Frequency')}</Typography>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} style={{ paddingTop: '10px', textAlign: 'center' }}>
                    <ToggleButtonGroup
                        value={week}
                        onChange={onWeekDayClick}
                        aria-label={props.lg.get('Days in')}
                        size="small"
                        color="primary">
                        <ToggleButton value="mon" key={1} aria-label="mon" sx={{ pl: '11px', pr: '11px' }}>
                            {props.lg.get('Mon')}
                        </ToggleButton>
                        <ToggleButton value="tue" key={2} aria-label="tue" sx={{ pl: '10px', pr: '10px' }}>
                            {props.lg.get('Tue')}
                        </ToggleButton>
                        <ToggleButton value="wed" key={3} aria-label="wed" sx={{ pl: '10px', pr: '10px' }}>
                            {props.lg.get('Wed')}
                        </ToggleButton>
                        <ToggleButton value="thu" key={4} aria-label="thu" sx={{ pl: '10px', pr: '10px' }}>
                            {props.lg.get('Thu')}
                        </ToggleButton>
                        <ToggleButton value="fri" key={5} aria-label="fri" sx={{ pl: '10px', pr: '10px' }}>
                            {props.lg.get('Fri')}
                        </ToggleButton>
                        <ToggleButton value="sat" key={6} aria-label="sat" sx={{ pl: '10px', pr: '10px' }}>
                            {props.lg.get('Sat')}
                        </ToggleButton>
                        <ToggleButton value="sun" key={7} aria-label="sun" sx={{ pl: '11px', pr: '10px' }}>
                            {props.lg.get('Sun')}
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: '0px', marginTop: '0px', marginBottom: '22px' }}>
                    <FormControl fullWidth>
                        <InputLabel id="repetition">{props.lg.get('Repeat')}</InputLabel>
                        <Select
                            labelId="repetition"
                            id="repetition"
                            value={repetition ? repetition : 'week'}
                            label={props.lg.get('Repeat')}
                            size="small"
                            defaultValue={'week'}
                            onChange={(v) => setRepetition(v.target.value)} >
                            <MenuItem key={1} value={'week'}>{props.lg.get('Weekly')}</MenuItem>
                            <MenuItem key={2} value={'month'}>{props.lg.get('Monthly')}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: '0px', marginTop: '0px', marginBottom: '10px', marginRight: '0px', marginLeft: '0px' }}>
                    <Typography variant="caption"  >{props.lg.get('Hours of taking medication')}</Typography>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: '0px', marginTop: '0px', marginBottom: '0px', marginRight: '0px', marginLeft: '0px' }}>
                    <Grid container style={{ paddingTop: '0px', marginTop: '0px', marginBottom: '0px', marginRight: '0px', marginLeft: '0px' }}>
                        {
                            hours.map((v, key) => (
                                <Grid item xs={4} style={{ paddingTop: '0px', marginTop: '0px', textAlign: 'center', marginBottom: '2px', marginRight: '0px' }}>
                                    <TimePicker
                                        key={key}
                                        ampm={false}
                                        openTo="hours"
                                        views={['hours']}
                                        inputFormat="HH"
                                        mask="__"
                                        label={props.lg.get('Hour')}
                                        value={dayjs().set('hour', v)}
                                        onChange={(newValue) => {
                                            onSetHour(new Date(newValue).getHours(), key);
                                        }}
                                        renderInput={(params) => <TextField key={key} {...params} sx={{ mt: '0px', mb: '0px', pr: '2px' }} size="small" />}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                    <Fab color="primary" aria-label="add" size="small" variant="extended" sx={{ mt: '5px', width: '100%' }} onClick={onAddHour}>
                        <Add sx={{ mr: 1 }} /> {props.lg.get('Add an hour')}
                    </Fab>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: '0px', marginTop: '15px', marginBottom: '0px', marginRight: '0px', marginLeft: '0px' }}>
                    <Typography variant="caption" gutterBottom >{props.lg.get('Practical informations')}</Typography>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: '0px', marginTop: '0px', marginBottom: '2px' }}>
                    <TextareaAutosize
                        maxRows={5}
                        minRows={5}
                        aria-label=""
                        placeholder=""
                        defaultValue={note}
                        onChange={(v) => setNote(v.target.value)}
                        style={{ width: '100%' }}
                    />
                </Grid>
                <Grid item xs={12} style={{ paddingTop: '0px', marginTop: '0px', marginBottom: '0px', marginRight: '0px', marginLeft: '0px' }}>
                    <Typography variant="caption"  >{props.lg.get('When to end (optional)')}</Typography>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: '0px', marginTop: '0px', marginBottom: '0px', marginRight: '0px', marginLeft: '0px' }}>
                    <MobileDatePicker
                        key="dateend"
                        id="dateend"
                        label={props.lg.get('End date')}
                        inputFormat="dd/MM/yyyy"
                        value={endDate ? endDate : null}
                        onChange={handleEndDateChange}
                        renderInput={(params) => <TextField size="small" {...params} style={{ paddingTop: '0px', marginTop: '0px', marginBottom: '0px', marginRight: '0px', marginLeft: '0px' }} />}
                    />
                </Grid>
            </Grid>
            <Button
                style={{ borderRadius: '10px', marginTop: '20px', width: '100%' }}
                variant="outlined" startIcon={<Save />}
                onClick={onAssignPatient}>
                {props.lg.get('Assign')}
            </Button>
        </Box >
    )
}