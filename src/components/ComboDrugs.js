import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import throttle from 'lodash/throttle';
import AngelDrugs from '../api/angel/drugs';

export default function ComboDrugs(props) {
  const [value, setValue] = React.useState(props.drug ? props.drug : null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        AngelDrugs().search({ name: request.input, code: request.input }).then((results) => {
          callback(results);
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
  }, [value, inputValue, fetch, props.drug]);

  return (
    <Autocomplete
      size='small'
      id="users-combo"
      sx={{ width: '100%' }}
      getOptionLabel={(option) => {
        return typeof option === 'string' ? option : option.drug_id + " " + option.name + " " + option.code
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
        if (newValue && newValue.drug_id) {
          props.onSelect(newValue.drug_id);
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Find drugs" fullWidth sx={{ mt: 0 }} />
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
                  {option.drug_id + " " + option.name + " " + option.code}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
