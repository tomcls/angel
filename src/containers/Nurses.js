import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import AngelUser from '../api/angel/user';
import AngelNurse from "../api/angel/nurse";
import { Avatar, Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import SickIcon from '@mui/icons-material/Sick';
import { Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Modal from '@mui/material/Modal';

import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AppContext from '../contexts/AppContext';
import { useTranslation } from '../hooks/userTranslation';
import { useFilter } from '../hooks/useFilter';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
const defaultAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkp0LF2WgeDkn_sQ1VuMnlnVGjkDvCN4jo2nLMt3b84ry328rg46eohB_JT3WTqOGJovY&usqp=CAU';//process.env.SENDGRID_APIKEY

const styleModal = {
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



function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  let headCells = [
    {
      id: 'id',
      numeric: true,
      disablePadding: true,
      label: 'Id',
    },
    {
      id: 'firstname',
      numeric: false,
      disablePadding: false,
      label: props.lg.get('Firstname'),
    },
    {
      id: 'lastname',
      numeric: false,
      disablePadding: false,
      label: props.lg.get('Lastname'),
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: false,
      label: 'Email',
    },
    {
      id: 'phone',
      numeric: false,
      disablePadding: false,
      label: props.lg.get('Phone'),
    }, {
      id: 'hospital',
      numeric: false,
      disablePadding: false,
      label: props.lg.get('Hospitals'),
    }, {
      id: 'patients',
      numeric: false,
      disablePadding: false,
      label: (props.user && (props.user.nurse_id || props.user.doctor_id)) ? props.lg.get('Surveys') : props.lg.get('Patients'),
    }, {
      id: 'active',
      numeric: false,
      disablePadding: false,
      label: props.lg.get('Actif'),
    },
  ];
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': props.lg.get('Select all nurses') }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'none'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span style={{ border: 0, clip: 'rect(0 0 0 0)', height: '1px', margin: -1, overflow: 'hidden', padding: 0, whiteSpace: "nowrap", width: "1px", position: "absolute" }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div' >
          {numSelected} {props.lg.get('selected')}
        </Typography>
      ) : (<></>
      )}
      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton onClick={props.onDeleteItems}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (<Grid container >
        <Grid item md={12}>
          <TextField
            id="input-with-icon-textfield"
            onChange={(e) => props.setSearch(e.target.value)}
            value={props.searchText}
            label={props.lg.get('Search')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button id="search" onClick={() => props.onSearch()} variant="outlined" style={{ marginBottom: '9px', marginRight: '5px' }}><SearchIcon /></Button>
                  <Button id="openfilterModal" onClick={() => props.onOpenFilterModal()} variant="outlined" style={{ marginBottom: '9px' }}><FilterListIcon /></Button>
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </Grid>
      </Grid>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onDeleteItems: PropTypes.func,
  onSearch: PropTypes.func,
  onOpenFilterModal: PropTypes.func,
  setSearch: PropTypes.func,
};


export default function Nurses(props) {

  const { enqueueSnackbar } = useSnackbar();

  const appContext = React.useContext(AppContext);
  const [userSession,] = React.useState(appContext.appState.user);
  const [lg] = useTranslation(userSession ? userSession.lang : 'en');
  const [filter] = useFilter('nurses',appContext);

  const [, setNurses] = React.useState(null);

  const [total, setTotal] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(25);

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState(null);
  const [selected, setSelected] = React.useState([]);
  const [dense,] = React.useState(false);
  const [rowsPerPage,] = React.useState(5);
  const [rows, setRows] = React.useState([]);

  const [openFilterModal, setOpenFilterModal] = React.useState(false);

  const [searchFilter, setSearchFilter] = React.useState(filter.get('search', props));
  const [firstnameFilter, setFirstnameFilter] = React.useState(true);
  const [lastnameFilter, setLastnameFilter] = React.useState(true);
  const [emailFilter, setEmailFilter] = React.useState(true);
  const [phoneFilter, setPhoneFilter] = React.useState(false);
  const [hospitalNameFilter, setHospitalNameFilter] = React.useState(false);

  React.useEffect(() => {
    fetchData(props.userId);
  }, []);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const fetchData = async (userId) => {
    const u = [];
    let r = null;
    let o = { limit: limit, page: page };
    if (firstnameFilter) {
      o.firstname = searchFilter;
    } else {
      o.firstname = null;
    }
    if (lastnameFilter) {
      o.lastname = searchFilter;
    } else {
      o.lastname = null;
    }
    if (emailFilter) {
      o.email = searchFilter;
    } else {
      o.email = null;
    }
    if (phoneFilter) {
      o.phone = searchFilter;
    } else {
      o.phone = null;
    }
    if (hospitalNameFilter) {
      o.hospital_name = searchFilter;
    } else {
      o.hospital_name = null;
    }
    if (props.patientId) {
      o.patient_id = props.patientId;
      r = await AngelNurse().getNurses(o);
    } else if (userId) {
      o.user_id = userId;
    } else {
      r = await AngelNurse().list(o);
    }

    if (r.users && r.users.length) {
      for (let i = 0; i < r.users.length; i++) {
        u.push(createData(r.users[i].user_id, r.users[i].id, r.users[i].nurse_id, r.users[i].firstname, r.users[i].lastname, r.users[i].email, r.users[i].phone, r.users[i].hospital_name, r.users[i].role, r.users[i].active, r.users[i].avatar ? process.env.REACT_APP_API_URL + '/public/uploads/' + r.users[i].avatar : defaultAvatar));
      }
      setRows(u);
      setNurses(r.users);
      setTotal(r.total);
    } else {
      setRows([]);
      setNurses([]);
      setTotal(0);
    }
  }
  const createData = (user_id, id, nurse_id, firstname, lastname, email, phone, hospital_name, role, active, avatar) => {
    return {
      user_id,
      id,
      nurse_id,
      firstname,
      lastname,
      email,
      phone,
      hospital_name,
      role,
      active,
      avatar
    }
  }
  const handleFiltersModal = () => setOpenFilterModal(true);
  const handleCloseFilterModal = () => setOpenFilterModal(false);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.user_id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(parseInt(id, 10));
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, parseInt(id, 10));
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const onDeleteItems = async () => {
    if (selected.length) {
      await AngelUser().delete({ ids: selected.join(',') });
      handleClickVariant('success', 'Nurse(s) well deleted');
      fetchData();
    }
  }

  const handleClickVariant = (variant, text) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(text, { variant });
  };
  const isSelected = (id) => selected.indexOf(id) !== -1;


  const search = (variant, text) => {
    // variant could be success, error, warning, info, or default
    fetchData();
  };
  const handleFirstnameFilter = (event) => {
    setFirstnameFilter(event.target.checked);
  };
  const handleLastnameFilter = (event) => {
    setLastnameFilter(event.target.checked);
  };
  const handleEmailFilter = (event) => {
    setEmailFilter(event.target.checked);
  };
  const handleHospialFilter = (event) => {
    setHospitalNameFilter(event.target.checked);
  };
  const handlePhoneFilter = (event) => {
    setPhoneFilter(event.target.checked);
  };
  const handleSearchText = (txt) => {
    setSearchFilter(txt);
    filter.set('search', props, txt);
  };
  const onPageChange = (event, newPage) => {
    setPage(newPage);
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <Modal
          open={openFilterModal}
          onClose={handleCloseFilterModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Filters
            </Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={firstnameFilter} onChange={handleFirstnameFilter} />} label="Firstname" />
              <FormControlLabel control={<Checkbox checked={lastnameFilter} onChange={handleLastnameFilter} />} label="Lastname" />
              <FormControlLabel control={<Checkbox checked={emailFilter} onChange={handleEmailFilter} />} label="Email" />
              <FormControlLabel control={<Checkbox checked={phoneFilter} onChange={handlePhoneFilter} />} label="Phone" />
              <FormControlLabel control={<Checkbox checked={hospitalNameFilter} onChange={handleHospialFilter} />} label="Hospital" />
            </FormGroup>
          </Box>
        </Modal>
      </div>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 0 }}>
          <EnhancedTableToolbar 
            lg={lg}
          numSelected={selected.length} 
          onDeleteItems={onDeleteItems} 
          onOpenFilterModal={handleFiltersModal} 
          onSearch={search} 
          setSearch={handleSearchText}
          searchText={searchFilter}  />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby='tableTitle'
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                user={userSession}
                lg={lg}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.user_id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.user_id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none" align='left'>
                          <Grid container spacing={2}>
                            <Grid item xs={1} textAlign={'start'} style={{ marginTop: '10px', fontWeight: 'bold' }}>
                              {row.id}
                            </Grid>
                            <Grid item xs={1} style={{ cursor: 'pointer' }}>
                              <Avatar src={row.avatar} textAlign={'start'} onClick={() => document.getElementById("newButton").clk(row.user_id, row.firstname + ' ' + row.lastname, 'nurse')} />
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell
                          onClick={() => document.getElementById("newButton").clk(row.user_id, row.firstname + ' ' + row.lastname, 'nurse')}
                          component='th'
                          id={labelId}
                          scope='row'
                          style={{ textAlign: 'center', cursor: 'pointer' }}
                          padding='none'
                        >
                          <b>{row.firstname}</b>
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          style={{ textAlign: 'left' }}
                          padding='none'
                        >
                          {row.lastname}
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          style={{ textAlign: 'left' }}
                          scope='row'
                          padding='none'>
                          {row.email}
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          style={{ textAlign: 'left' }}
                          scope='row'
                          padding='none'>
                          {row.phone}
                        </TableCell>

                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          style={{ textAlign: 'left' }}
                          padding='none' >
                          {row.hospital_name}
                        </TableCell>

                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          style={{ textAlign: 'left' }}
                          padding='none' >
                          {
                            (userSession.nurse_id || userSession.doctor_id) ?
                              <SickIcon color={'primary'} style={{ cursor: 'pointer' }} onClick={() => document.getElementById("newButton").clk(props.patientId, props.text, 'patient_surveys', 'panel1')} /> :
                              <FamilyRestroomIcon color={'primary'} style={{ cursor: 'pointer' }} onClick={() => props.openPatients(row.nurse_id, row.firstname + ' ' + row.lastname, 'nurse_patients')} />
                          }

                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          style={{ textAlign: 'left' }}
                          padding='none' >
                          {row.active}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={total ? total : 0}
            rowsPerPage={limit}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={(e) => { setLimit(e.target.value); setPage(0); }}
          />
        </Paper>
      </Box>
    </LocalizationProvider>
  );
}
