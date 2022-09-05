import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import AngelLaboratory from '../api/angel/laboratory';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function ComboLaboratories(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
      
    let active = true;
    if(props.laboratory) {
        console.log(props.laboratory, active)
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
      id="laboratories-combo"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event, newValue) => {
        console.log("console",newValue,options);
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        if(newValue && newValue.id) {
          console.log("qqqqqq",newValue)
            console.log(newValue)
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
          {...params}
          label="Laboratories"
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
