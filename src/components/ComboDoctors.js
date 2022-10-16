import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import throttle from 'lodash/throttle';
import AngelDoctor from '../api/angel/doctor';

export default function ComboDoctors(props) {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
            AngelDoctor().list({ firstname: request.input, email: request.input, lastname: request.input }).then((results) => {
            callback(results.users);
        });
      }, 200),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      id="nurses-combo"
      sx={{ width: '100%' }}
      getOptionLabel={(option) => {
            return typeof option === 'string' ? option : option.doctor_id+ " "+option.firstname+ " "+option.lastname
        }
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        if(newValue && newValue.doctor_id) {
            props.onSelect(newValue.doctor_id);
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label={props.lg.get('Find a doctor')} fullWidth />
      )}
      renderOption={(props, option) => {

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={LocationOnIcon}
                  sx={{ color: 'text.secondary', mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                <Typography variant="body2" color="text.secondary">
                  {option.doctor_id+ " "+option.firstname+ " "+option.lastname}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
