import React, { useEffect, useCallback, useContext } from 'react';
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
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import AngelUser from '../api/angel/user';
import AngelPatient from '../api/angel/patient';
import AngelDoctor from '../api/angel/doctor';
import { Avatar, Badge } from '@mui/material';
import { Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import SickIcon from '@mui/icons-material/Sick';
import { Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import HealingIcon from '@mui/icons-material/Healing';
import HailIcon from '@mui/icons-material/Hail';
import AngelNurse from '../api/angel/nurse';
import AngelDrug from '../api/angel/drugs';
import Transfer from '../components/Transfer';
import ComboNurses from '../components/ComboNurses';
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
    }
  ];
  const headCellsAmin = [
    {
      id: 'nurse',
      numeric: false,
      disablePadding: false,
      label: props.lg.get('Nurses'),
    }, {
      id: 'doctor',
      numeric: false,
      disablePadding: false,
      label: props.lg.get('Doctors'),
    }, {
      id: 'treatments',
      numeric: false,
      disablePadding: false,
      label: props.lg.get('Treatments'),
    },
  ];
  const headCellsNurse = [
    {
      id: 'surveys',
      numeric: false,
      disablePadding: false,
      label: props.lg.get('Survey'),
    }, {
      id: 'doctor',
      numeric: false,
      disablePadding: false,
      label: props.lg.get('Doctors'),
    }, {
      id: 'treatments',
      numeric: false,
      disablePadding: false,
      label: props.lg.get('Treatments'),
    }
  ];
  const headCellsDoctor = [
    {
      id: 'surveys',
      numeric: false,
      disablePadding: false,
      label: props.lg.get('Survey'),
    }, {
      id: 'nurse',
      numeric: false,
      disablePadding: false,
      label: props.lg.get('Nurses'),
    }, {
      id: 'treatments',
      numeric: false,
      disablePadding: false,
      label: props.lg.get('Treatments'),
    }
  ];
  if (props.user && props.user.nurse_id) {
    headCells = [...headCells, ...headCellsNurse]
  } else if (props.user && props.user.doctor_id) {
    headCells = [...headCells, ...headCellsDoctor]
  } else {
    headCells = [...headCells, ...headCellsAmin];
  }
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': props.lg.get('Select all patients') }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'none'}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
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
const defaultAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkp0LF2WgeDkn_sQ1VuMnlnVGjkDvCN4jo2nLMt3b84ry328rg46eohB_JT3WTqOGJovY&usqp=CAU';//process.env.SENDGRID_APIKEY

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
      {numSelected > 0 ? (<>
        <Tooltip title='Delete'>
          <IconButton onClick={props.onDeleteItems} >
            <DeleteIcon color={'error'} />
          </IconButton>
        </Tooltip>
        <Tooltip title='transfer' style={{ display: (props.nurseId || props.nurse_id || props.doctor_id) ? 'inline-flex' : 'none' }}>
          <IconButton onClick={props.onTransferItems}>
            <TransferWithinAStationIcon color={'primary'} />
          </IconButton>
        </Tooltip>
      </>) : (<Grid container >
        <Grid item md={12}>
          <TextField
            id="input-with-icon-textfield"
            value={props.searchText}
            onChange={(e) => props.setSearch(e.target.value)}
            label={props.lg.get('Search')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button id="search" onClick={() => props.onSearch()} variant="outlined" style={{ marginBottom: '9px', marginRight: '5px' }}><SearchIcon /></Button>
                  <Button id="openfilterModal" onClick={() => props.onOpenFilterModal()} variant="outlined" style={{ marginBottom: '9px' }}><FilterListIcon /></Button>
                  <Button id="opentransferModal" onClick={() => props.onOpenTransferModal()} variant="outlined" style={{ marginLeft: '5px', marginBottom: '9px', display: (props.nurseId || props.nurse_id || props.doctor_id) ? 'inline-flex' : 'none' }}>
                    <Badge badgeContent={props.totalTransfers} color="error">
                      <TransferWithinAStationIcon />
                    </Badge>
                  </Button>
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
  onTransferItems: PropTypes.func,
  onSearch: PropTypes.func,
  onOpenFilterModal: PropTypes.func,
  setSearch: PropTypes.func,
};


export default function Patients(props) {
  const { enqueueSnackbar } = useSnackbar();

  const appContext = useContext(AppContext);
  const [lg] = useTranslation(appContext.appState.lang);
  const [filter] = useFilter('patients', appContext);

  const [total, setTotal] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(25);
  const [, setPatients] = React.useState([]);
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState(null);
  const [selected, setSelected] = React.useState([]);
  const [dense,] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [openFilterModal, setOpenFilterModal] = React.useState(false);
  const [openTransferModal, setOpenTransferModal] = React.useState(false);
  const [searchFilter, setSearchFilter] = React.useState(filter.get('search', props));//filter.get('search', props)
  const [firstnameFilter, setFirstnameFilter] = React.useState(true);
  const [lastnameFilter, setLastnameFilter] = React.useState(true);
  const [emailFilter, setEmailFilter] = React.useState(true);
  const [phoneFilter, setPhoneFilter] = React.useState(false);
  const [transferNurseId, setTransferNurseId] = React.useState();
  const [totalTransfers, setTotalTransfers] = React.useState();


  const fetchData = useCallback(async () => {
    const userSession = appContext.appState.user;
    const u = [];
    let r = null;
    let o = {
      limit: limit,
      page: page
    };
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
    if (props.drugId && userSession && userSession.doctor_id) {
      o.drug_id = props.drugId;
      o.doctor_id = userSession.doctor_id;
      r = await AngelDoctor().patients(o);
    } else if (props.drugId && userSession && userSession.nurse_id) {
      o.drug_id = props.drugId;
      o.nurse_id = userSession.nurse_id;
      r = await AngelDrug().patients(o);
    } else if (userSession && userSession.nurse_id) {
      o.nurse_id = userSession.nurse_id;
      r = await AngelNurse().patients(o);
    } else if (userSession && userSession.doctor_id) {
      o.doctor_id = userSession.doctor_id;
      r = await AngelDoctor().patients(o);
    } else if (props.nurseId) {
      o.nurse_id = props.nurseId;
      r = await AngelNurse().patients(o);
    } else if (props.doctorId) {
      o.doctor_id = props.doctorId;
      r = await AngelDoctor().patients(o);
    } else if (props.drugId) {
      o.drug_id = props.drugId;
      r = await AngelDrug().patients(o);
    } else {
      r = await AngelPatient().list(o);
    }
    if (r.users && r.users.length) {
      for (let i = 0; i < r.users.length; i++) {
        u.push(createData(r.users[i].user_id, r.users[i].id, r.users[i].firstname, r.users[i].lastname, r.users[i].email, r.users[i].phone, r.users[i].lang, r.users[i].role, r.users[i].active, r.users[i].avatar ? process.env.REACT_APP_API_URL + '/public/uploads/' + r.users[i].avatar : defaultAvatar, r.users[i].patient_id, r.users[i].close_monitoring));
      }
      setRows(u);
      setPatients(r.users);
      setTotal(r.total);
    } else {
      setRows([]);
      setPatients([]);
      setTotal(0);
    }
  }, [emailFilter, firstnameFilter, lastnameFilter, limit, page, phoneFilter, props.doctorId, props.drugId, props.nurseId, searchFilter]);

  useEffect(() => {
    console.log('PatientsContainer.useEffects')
    if (appContext.appState.user && appContext.appState.user.nurse_id) {
      countTransfers(appContext.appState.user.nurse_id);
    }

    fetchData();
  }, [fetchData, appContext, page, limit]);

  const countTransfers = (id) => {
    AngelNurse().countTransfers({ nurse_id: id }).then(function (totalTransfers) {
      setTotalTransfers(totalTransfers);
    });
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const createData = (user_id, id, firstname, lastname, email, phone, lang, role, active, avatar, patient_id, close_monitoring) => {
    return {
      user_id,
      id,
      firstname,
      lastname,
      email,
      phone,
      lang,
      role,
      active,
      avatar,
      patient_id,
      close_monitoring
    }
  }
  const handleFiltersModal = () => setOpenFilterModal(true);
  const handleCloseFilterModal = () => setOpenFilterModal(false);


  const handleTransferModal = () => setOpenTransferModal(true);
  const handleCloseTransferModal = () => setOpenTransferModal(false);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.patient_id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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
      if (appContext.appState.user && appContext.appState.user.nurse_id) {
        await AngelPatient().delete({ ids: selected.join(','), nurse_id: appContext.appState.user.nurse_id })
      } else if (appContext.appState.user && appContext.appState.user.doctor_id) {
        AngelPatient().delete({ ids: selected.join(','), doctor_id: appContext.appState.user.doctor_id })
      } else {
       // await AngelUser().delete({ ids: selected.join(',') });
       AngelPatient().delete({ ids: selected.join(','), doctor_id: appContext.appState.user.doctor_id })
      }
      handleClickVariant('success', 'Patient(s) well deleted');
      await fetchData();
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
  const handlePhoneFilter = (event) => {
    setPhoneFilter(event.target.checked);
  };
  const handleSearchText = (txt) => {
    setSearchFilter(txt);
    filter.set('search', props, txt);
  };
  const onNurseSelect = (nurseId) => {
    setTransferNurseId(nurseId);
  }
  const transferPatients = async () => {
    let nId = props.nurseId
    if (!nId) {
      nId = appContext.appState.user.nurse_id;
    }
    if (selected.length && transferNurseId && nId) {
      let o = {
        patients: selected,
        nurse_from: nId,
        nurse_to: transferNurseId
      }
      await AngelNurse().addTransfers(o);
      handleCloseTransferModal();
      handleClickVariant('success', 'Patient well transfered');
      setSelected([]);
      setTimeout(function () {
        fetchData();
        if (appContext.appState.user.nurse_id) {
          countTransfers(appContext.appState.user.nurse_id);
        }
      }, 500);
    } else { //
      handleClickVariant('error', 'Please select some patients');
    }
  }
  const onPatientRecovered = () => {
    handleClickVariant('success', 'Patient well recovered');
    setTimeout(function () {
      fetchData();
      if (appContext.appState.user.nurse_id) {
        countTransfers(appContext.appState.user.nurse_id);
      }
    }, 500);
  }
  const onPageChange = (event, newPage) => {
    setPage(newPage);
  }
  return (
    <>
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
            </FormGroup>
          </Box>
        </Modal>
      </div>
      <div>
        <Modal
          open={openTransferModal}
          onClose={handleCloseTransferModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {lg.get('Transfer')}
            </Typography>
            <ComboNurses onSelect={onNurseSelect} lg={lg} />
            <Button id="transfer" onClick={transferPatients} variant="outlined" style={{ width: '100%' }}> {lg.get('Validate')} {selected.length} {lg.get('Patients')}</Button>
            <Transfer nurseId={props.nurseId} onPatientRecovered={onPatientRecovered} />
          </Box>
        </Modal>
      </div>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 0 }}>
          <EnhancedTableToolbar
            lg={lg}
            nurseId={props.nurseId}
            nurse_id={(appContext.appState.user && appContext.appState.user.nurse_id) ? appContext.appState.user.nurse_id : null}
            doctor_id={(appContext.appState.user && appContext.appState.user.doctor_id) ? appContext.appState.user.doctor_id : null}
            numSelected={selected.length} onDeleteItems={onDeleteItems}
            onTransferItems={handleTransferModal}
            onOpenFilterModal={handleFiltersModal}
            onSearch={search}
            setSearch={handleSearchText}
            onOpenTransferModal={handleTransferModal}
            searchText={searchFilter}
            totalTransfers={totalTransfers} />
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
                user={appContext.appState.user}
                lg={lg}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .map((row) => {
                    const isItemSelected = isSelected(row.patient_id);
                    const labelId = `enhanced-table-checkbox-${row.patient_id}`;
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.patient_id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.patient_id}
                        selected={isItemSelected}
                        style={{ backgroundColor: row.close_monitoring === 'Y' ? 'rgba(0,27,138,0.4)' : '#fff' }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none" align='left' >
                          <Grid container spacing={2}>
                            <Grid item xs={1} textAlign={'start'} style={{ marginTop: '10px', fontWeight: 'bold' }}>
                              {row.patient_id}
                            </Grid>
                            <Grid item xs={1} style={{ cursor: 'pointer' }}>
                              <Avatar src={row.avatar} textAlign={'start'} onClick={() => document.getElementById("newButton").clk(row.patient_id, row.firstname + ' ' + row.lastname, 'patient')} />
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          style={{ textAlign: 'left', cursor: 'pointer' }}
                          padding='none'
                          onClick={() => document.getElementById("newButton").clk(row.patient_id, row.firstname + ' ' + row.lastname, 'patient')}
                        >
                          <b> {row.firstname}</b>
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
                          {
                            (appContext.appState.user && (appContext.appState.user.nurse_id || appContext.appState.user.doctor_id)) ?
                              <SickIcon color={'primary'} style={{ cursor: 'pointer' }} onClick={() => document.getElementById("newButton").clk(row.patient_id, row.firstname + ' ' + row.lastname, 'patient_surveys', 'panel1')} /> :
                              <EmojiPeopleIcon color={'primary'} style={{ cursor: 'pointer' }} onClick={() => document.getElementById("newButton").clk(row.patient_id, row.firstname + ' ' + row.lastname, 'patient_nurses')} />
                          }
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          style={{ textAlign: 'left' }}
                          padding='none' >
                          {
                            (appContext.appState.user && appContext.appState.user.doctor_id) ?
                              <EmojiPeopleIcon color={'primary'} style={{ cursor: 'pointer' }} onClick={() => document.getElementById("newButton").clk(row.patient_id, row.firstname + ' ' + row.lastname, 'patient_doctors')} /> :
                              <HailIcon color={'primary'} style={{ cursor: 'pointer' }} onClick={() => document.getElementById("newButton").clk(row.patient_id, row.firstname + ' ' + row.lastname, 'patient_doctors')} />
                          }
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          style={{ textAlign: 'left' }}
                          padding='none' >
                          <HealingIcon color={'primary'} style={{ cursor: 'pointer' }} onClick={() => document.getElementById("newButton").clk(row.patient_id, row.firstname + ' ' + row.lastname, 'patient_treatments')} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[2, 5, 10, 25]}
            component='div'
            count={total ? total : 0}
            rowsPerPage={limit}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={(e) => { setLimit(e.target.value); setPage(0); }}
          />
        </Paper>
      </Box>
    </>
  );
}
