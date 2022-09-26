import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import AngelHospital from '../api/angel/hospital';


export default function ComboHospitals(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
      
    let active = true;
    if(props.hospital) {
        console.log(props.hospital, active)
        setValue(props.hospital);
    }
        
    if (!loading) {
      return undefined;
    }

    (async () => {
     // await sleep(1e2); 

      if (active) {
       // setOptions([...topFilms]);
        AngelHospital().list().then((results) => {
            console.log(results);
            setOptions(results.hospitals)
        });
      }
    })();

    return () => {
      active = false;
    };
  }, [loading,props.hospital]);

  React.useEffect(() => {

    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="hospitals-combo"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event, newValue) => {
        console.log(newValue,options);
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        if(newValue && newValue.id) {
            props.onSelect({id:newValue.id, name:newValue.name});
        }
      }}
      value={value}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.id+' '+option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Hospitals"
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
