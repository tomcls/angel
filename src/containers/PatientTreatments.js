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
import AngelTreatment from "../api/angel/treatments";
import { useSnackbar } from 'notistack';
import { Avatar, Grid } from '@mui/material';
import { Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Modal from '@mui/material/Modal';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AlarmAddIcon from '@mui/icons-material/AlarmAdd';
import AngelDrug from '../api/angel/drugs';
import PosologyComponent from '../components/Posology';
import AngelPatient from '../api/angel/patient';

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

const headCells = [
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'Id',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'code',
    numeric: false,
    disablePadding: false,
    label: 'Code',
  },
  {
    id: 'posology',
    numeric: false,
    disablePadding: false,
    label: 'Posology',
  },
  {
    id: 'start_date',
    numeric: false,
    disablePadding: false,
    label: 'Start date',
  },
  {
    id: 'end_date',
    numeric: false,
    disablePadding: false,
    label: 'End date',
  },
  {
    id: 'created',
    numeric: false,
    disablePadding: false,
    label: 'Created',
  }
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all Treatments' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
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
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
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
          {numSelected} selected
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
            label="Search"
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
const defaultAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkp0LF2WgeDkn_sQ1VuMnlnVGjkDvCN4jo2nLMt3b84ry328rg46eohB_JT3WTqOGJovY&usqp=CAU';//process.env.SENDGRID_APIKEY

export default function PatientTreatments(props) {

  const { enqueueSnackbar } = useSnackbar();
  const [treatments, setTreatments] = React.useState(null);

  const [total, setTotal] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(5);

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);

  const [openFilterModal, setOpenFilterModal] = React.useState(false);

  const [searchFilter, setSearchFilter] = React.useState('');
  const [codeFilter, setCodeFilter] = React.useState(true);
  const [nameFilter, setNameFilter] = React.useState(true);

  const [openAssignPatientModal, setOpenAssignPatientModal] = React.useState(false);
  const [repetition, setRepetition] = React.useState(props.repetition);
  const [note, setNote] = React.useState(props.note);
  const [days, setWeek] = React.useState(props.days);
  const [hours, setHours] = React.useState([12]);
  const [startDate, setStartDate] = React.useState(props.startDate);
  const [endDate, setEndDate] = React.useState(props.endDate);
  const [patientId, setPatientId] = React.useState(props.patientId);
  const [patient, setPatient] = React.useState(null);
  const [drug, setDrug] = React.useState(null);
  const [drugId, setDrugId] = React.useState(props.drugId);
  const stg = JSON.parse(window.appStorage.getItem('user'));

  React.useEffect(() => {
    console.log('useEffect Treatments list container')
    fetchData();
  }, []);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const createData = (id,
    name,
    code,
    created,
    posology,
    start_date,
    end_date,
    firstname,
    lastname,
    avatar,
    patient_id,
    drug_id,
    days,
    hours,
    note,
    repetition
  ) => {

    return {
      id,
      name,
      code,
      created,
      posology,
      start_date,
      end_date,
      firstname,
      lastname,
      avatar,
      patient_id,
      drug_id,
      days,
      hours,
      note,
      repetition
    }
  }
  const fetchData = async () => {
    const u = [];
    let r = null; //
    let o = { limit: limit, page: page, lang_id: 'en' };

    if (codeFilter) {
      o.code = searchFilter;
    } else {
      o.code = null;
    }
    if (nameFilter) {
      o.name = searchFilter;
    } else {
      o.name = null;
    }
    if (props.patientId) {
      o.patient_id = props.patientId;
    }
    if (stg.nurse_id) {
      o.nurse_id = stg.nurse_id;
    }
    if (stg.doctor_id) {
      o.doctor_id = stg.doctor_id;
    }
    r = await AngelDrug().getUserDrugs(o);
    if (r.treatments && r.treatments.length) {
      for (let i = 0; i < r.treatments.length; i++) {
        //createData('Cupcake', 305, 3.7, 67, 4.3, <BeachAccessIcon color='primary' style={{ marginInline: '10px' }} />, <GridViewIcon color='primary' style={{ marginInline: '10px' }} />, <TrendingUpIcon color='primary' style={{ marginInline: '10px' }} />, 'ahmed')
        u.push(createData(
          r.treatments[i].id,
          r.treatments[i].name,
          r.treatments[i].code,
          r.treatments[i].date_created,
          r.treatments[i].posology_id,
          r.treatments[i].start_date,
          r.treatments[i].end_date,
          r.treatments[i].firstname,
          r.treatments[i].lastname,
          r.treatments[i].avatar ? process.env.REACT_APP_API_URL + '/public/uploads/' + r.treatments[i].avatar : defaultAvatar,
          r.treatments[i].patient_id,
          r.treatments[i].drug_id,
          r.treatments[i].days,
          r.treatments[i].hours,
          r.treatments[i].note,
          r.treatments[i].repetition
        ));
      }
      setRows(u);
      setTreatments(r.treatments);
      setTotal(r.total);
    } else {
      setRows([]);
      setTreatments([]);
      setTotal(0);
    }
  }
  const handleFiltersModal = () => setOpenFilterModal(true);
  const handleCloseFilterModal = () => setOpenFilterModal(false);


  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
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
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const onDeleteItems = async () => {
    if (selected.length) {
      await AngelTreatment().delete({ ids: selected.join(',') });
      handleClickVariant('success', 'Treatment(s) well deleted');
      fetchData();
    }
  }
  const search = (variant, text) => {
    // variant could be success, error, warning, info, or default
    fetchData();
  };
  const handleCodeFilter = (event) => {
    setCodeFilter(event.target.checked);
  };
  const handleNameFilter = (event) => {
    setNameFilter(event.target.checked);
  };
  const handleSearchText = (txt) => {
    setSearchFilter(txt);
  };

  const handleClickVariant = (variant, text) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(text, { variant });
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const handleAssignPatientModal = async (row) => {
    setHours(JSON.parse(row.hours));
    setWeek(JSON.parse(row.days));
    setDrugId(row.drug_id);
    setPatientId(row.patient_id);
    setStartDate(row.start_date);
    setEndDate(row.end_date);
    setRepetition(row.repetition);
    setNote(row.note);
    const p = await AngelPatient().find({ patient_id: row.patient_id })
    const d = await AngelDrug().find({ drug_id: row.drug_id })
    setDrug(d);
    setPatient(p);
    setOpenAssignPatientModal(true);
  }
  const handleCloseAssignPatientModal = () => setOpenAssignPatientModal(false);
  const onAssignPatient = async e => {
    if (!e.patient_id || !e.drug_id || !e.startDate || !e.hours || !e.days) {
      try {
        const u = {
          patient_id: e.patient_id,
          drug_id: e.drug_id,
          start_date: formatDate(e.start_date),
          end_date: e.end_date ? formatDate(e.end_date) : null,
          days: JSON.stringify(e.days),
          hours: JSON.stringify(e.hours),
          repetition: e.repetition,
          type: e.type ? e.type : null,
          note: e.note ? e.note : null
        };
        const a = await AngelDrug().updatePatient(u);
        if (a && a.code) {
          handleClickVariant('error', a.code);
        } else {
          handleClickVariant('success', 'Patient well assigned');
          handleCloseAssignPatientModal();
        }
      } catch (e) {
        handleClickVariant('error', JSON.stringify(e));
      }
    } else {
      handleClickVariant('error', 'Patient, hours and frequency are required');
    }
  }

  const formatDate = (v) => {
    let d = new Date(v);
    var datestring = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":00";
    return datestring;
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Modal
        open={openAssignPatientModal}
        onClose={handleCloseAssignPatientModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <PosologyComponent onSave={onAssignPatient}
          days={days}
          repetition={repetition}
          hours={hours}
          note={note}
          patientId={patientId}
          drugId={drugId}
          week={days}
          startDate={startDate}
          endDate={endDate}
          patient={patient}
          drug={drug} />
      </Modal>
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
            <FormControlLabel control={<Checkbox checked={codeFilter} onChange={handleCodeFilter} />} label="Code" />
            <FormControlLabel control={<Checkbox checked={nameFilter} onChange={handleNameFilter} />} label="Name" />
          </FormGroup>
        </Box>
      </Modal>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 0 }}>
          <EnhancedTableToolbar numSelected={selected.length} onDeleteItems={onDeleteItems} onOpenFilterModal={handleFiltersModal} onSearch={search} setSearch={handleSearchText} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby='tableTitle'
              size={dense ? 'small' : 'medium'}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        onDoubleClick={() => document.getElementById("newButton").clk(row.id, row.name, 'treatment')}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none" align='left'>
                          {props.patientId ? row.id :
                            <Grid container spacing={2}>
                              <Grid item xs={1} textAlign={'start'} style={{ marginTop: '10px', fontWeight: 'bold' }}>
                                {row.id}
                              </Grid>
                              <Grid item xs={1} style={{ cursor: 'pointer' }}>
                                <Avatar src={row.avatar} textAlign={'start'} onClick={() => document.getElementById("newButton").clk(row.patient_id, row.firstname + ' ' + row.lastname, 'patient_surveys', 'panel3')} />
                              </Grid>
                              <Grid item style={{ cursor: 'pointer', marginLeft: '20px', paddingTop: '18px' }}>
                                {row.firstname + ' ' + row.lastname}
                              </Grid>
                            </Grid>}
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          style={{ textAlign: 'center' }}
                          padding='none'
                          onClick={() => document.getElementById("newButton").clk(row.drug_id, row.name, 'treatment')}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          style={{ textAlign: 'center' }}
                          padding='none'
                        >
                          {row.code}
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          style={{ textAlign: 'center', cursor: 'pointer' }}
                          scope='row'
                          padding='none'
                          onClick={() => handleAssignPatientModal(row)}>
                          <AlarmAddIcon />
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          style={{ textAlign: 'center' }}
                          scope='row'
                          padding='none'>
                          {row.start_date}
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          style={{ textAlign: 'center' }}
                          scope='row'
                          padding='none'>
                          {row.end_date}
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          style={{ textAlign: 'center' }}
                          scope='row'
                          padding='none'>
                          {row.created}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={total ? total : 0}
            rowsPerPage={limit}
            page={page}
            onPageChange={setPage}
            onRowsPerPageChange={(e) => { setLimit(e.target.value) }}
          />
        </Paper>
      </Box>
    </LocalizationProvider>);
}
