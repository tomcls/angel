import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import AngelLaboratory from '../api/angel/laboratory';

export default function ComboLaboratories(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState('');

  const loading = open && options.length === 0;
  
  React.useEffect(() => {
      
    let active = true;
    if(props.laboratory) {
        setValue(props.laboratory);
    }
    if (!loading) {
      return undefined;
    }
    (async () => {
      if (active) {
       AngelLaboratory().list().then((results) => {
            setOptions(results.laboratories)
        });
      }
    })();

    return () => {
      active = false;
    };
  }, [loading,props.laboratory]);

  React.useEffect(() => {

    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      fullWidth
      id="laboratories-combo"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        if(newValue && newValue.id) {
            props.onSelect({id:newValue.id, name:newValue.laboratory_name});
        }
      }}
      value={value}
      isOptionEqualToValue={(option, value) => option.laboratory_name === value.name}
      getOptionLabel={(option) => option.id+' '+option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          sx={{width: '100%'}}
          fullWidth
          {...params}
          label={props.lg.get('Laboratories')}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
