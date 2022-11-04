import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import throttle from 'lodash/throttle';
import AngelSideEffect from '../api/angel/sideEffect';
import AppContext from '../contexts/AppContext';

export default function ComboEffects(props) {
  const appContext = React.useContext(AppContext);
  const [userSession,] = React.useState(appContext.appState.user);
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        AngelSideEffect().search({ name: request.input,lang_id:userSession ? userSession.lang : 'en' }).then((results) => {
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
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      size='small'
      id="users-combo"
      sx={{ width: '100%' }}
      getOptionLabel={(option) => {
        return typeof option === 'string' ? option : option.side_effect_id + " " + option.name 
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
        console.log(newValue)
        if (newValue && newValue.side_effect_id) {
          props.onSelect(newValue.side_effect_id);
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label={props.lg.get('Find side effects')} fullWidth sx={{ mt: 0 }} />
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
                  {option.side_effect_id + " " + option.name }
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
