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
import { useSnackbar } from 'notistack';
import Badge from '@mui/material/Badge';

import AngelSideEffect from '../api/angel/sideEffect';

import { Avatar, Button, Grid } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import Modal from '@mui/material/Modal';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AngelSurvey from '../api/angel/survey';
import { DatePicker } from "@material-ui/pickers";

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
  console.log(orderBy)
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
  console.log(comparator)
  let r = stabilizedThis.map((el) => el[0]);
  return r;
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
    id: 'score',
    numeric: false,
    disablePadding: false,
    label: 'Score',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date',
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
            inputProps={{ 'aria-label': 'select all Drugs' }}
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

export default function PatientSurveyEffects(props) {

  const { enqueueSnackbar } = useSnackbar();
  const [total, setTotal] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(30);
  const [sideEffects, setSideEffects] = React.useState([]);

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [rows, setRows] = React.useState([]);

  const [openFilterModal, setOpenFilterModal] = React.useState(false);

  const [searchFilter, setSearchFilter] = React.useState('');
  const [firstnameFilter, setFirstnameFilter] = React.useState(true);
  const [lastnameFilter, setLastnameFilter] = React.useState(true);
  const [nameFilter, setNameFilter] = React.useState(true);
  const [scoreFilter, setScoreFilter] = React.useState(true);
  const [fromDateFilter, setFromDateFilter] = React.useState(null);
  const [toDateFilter, setToDateFilter] = React.useState(null);

  React.useEffect(() => {
    console.log('useEffect SideEffects list', props.sideEffects)
    const sideEffects = props.sideEffects;
    fetchDataEffects();
  }, [props.sideEffects]);

  const handleRequestSort = (event, property) => {
    console.log('handleRequestSort', property)
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const createDataEffects = (avatar, sideEffectId, id, name, firstname, lastname, score, date) => {
    return {
      avatar,
      sideEffectId,
      id,
      name,
      firstname,
      lastname,
      score,
      date
    }
  }
  const fetchDataEffects = async () => {
    const u = [];
    let r = null;
    let o = {
      limit: limit,
      page: page
    };
    if (nameFilter) {
      o.name = searchFilter;
    } else {
      o.name = null;
    }
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
    if (scoreFilter) {
      o.score = searchFilter;
    } else {
      o.score = null;
    }
    if (fromDateFilter) {
      o.from_date = formatFromDate(fromDateFilter);;
    } else {
      o.from_date = null;
    }
    if (toDateFilter) {
      o.to_date = formatToDate(toDateFilter);
    } else {
      o.to_date = null;
    }
    o.lang_id = 'en';
    if (props.sideEffectId) {
      o.id = props.sideEffectId;
    }
    if (props.patientId) {
      o.patient_id = props.patientId;
    }
    console.log(o)
    r = await AngelSurvey().sideEffects(o);
    console.log(r)
    if (r.surveys && r.surveys.length) {
      for (let i = 0; i < r.surveys.length; i++) {
        u.push(createDataEffects(r.surveys[i].avatar ? process.env.REACT_APP_API_URL + '/public/uploads/' + r.surveys[i].avatar : defaultAvatar, r.surveys[i].survey_side_effect_id, r.surveys[i].id, r.surveys[i].name, r.surveys[i].firstname, r.surveys[i].lastname, r.surveys[i].score, r.surveys[i].date));
      }
      setRows(u);
      setSideEffects(r.surveys);
      setTotal(r.count);
    } else {
      setRows([]);
      setSideEffects([]);
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
      await AngelSideEffect().delete({ ids: selected.join(',') });
      handleClickVariant('success', 'Lab(s) well deleted');
      fetchDataEffects();
    }
  }

  const handleClickVariant = (variant, text) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(text, { variant });
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const search = (variant, text) => {
    // variant could be success, error, warning, info, or default
    fetchDataEffects();
  };
  const handleFirstnameFilter = (event) => {
    setFirstnameFilter(event.target.checked);
  };
  const handleLastnameFilter = (event) => {
    setLastnameFilter(event.target.checked);
  };
  const handleNameFilter = (event) => {
    setNameFilter(event.target.checked);
  };
  const handleEmailFilter = (event) => {
    //setEmailFilter(event.target.checked);
  };
  const handlePhoneFilter = (event) => {
    //setPhoneFilter(event.target.checked);
  };
  const handleSearchText = (txt) => {
    setSearchFilter(txt);
  };
  const formatFromDate = (v) => {
    let d = new Date(v);
    var datestring = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " 00:00:00";
    return datestring;
  }
  const formatToDate = (v) => {
    let d = new Date(v);
    var datestring = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " 23:59:59";
    return datestring;
  }
  const setFromDate = (newValue) => {
    console.log(newValue)
    setFromDateFilter(newValue);
  };
  const setToDate = (newValue) => {
    console.log(newValue)
    setToDateFilter(newValue);
  };
  const renderBatch = (score) => {
    if (score === 5) {
      return (<Badge badgeContent={score} color="error">
      </Badge>)
    } else if (score === 4) {
      return (<Badge badgeContent={score} color="warning">
      </Badge>)
    } else if (score === 3) {
      return (<Badge badgeContent={score} color="primary">
      </Badge>)
    } else if (score === 2) {
      return (<Badge badgeContent={score} color="secondary">
      </Badge>)
    } else if (score === 1) {
      return (<Badge badgeContent={score} color="success"  >
      </Badge>)
    }
  }
  return (<>
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
          <DatePicker
              autoOk
              key="fromdate"
              id="fromdate"
              label="From date"
              clearable
              disableFuture
              value={fromDateFilter}
              
              onChange={(newValue) => {
                setFromDate(newValue);
              }}
            />
            <DatePicker
            key="todate"
            id="todate"
              label="To date"
              value={toDateFilter}
              onChange={(newValue) => {
                setToDate(newValue);
              }}  />
            <FormControlLabel control={<Checkbox checked={firstnameFilter} onChange={handleFirstnameFilter} />} label="Firstname" />
            <FormControlLabel control={<Checkbox checked={lastnameFilter} onChange={handleLastnameFilter} />} label="Lastname" />
            <FormControlLabel control={<Checkbox checked={nameFilter} onChange={handleNameFilter} />} label="Name" />
            <FormControlLabel control={<Checkbox checked={scoreFilter} onChange={handleEmailFilter} />} label="Score" />
          </FormGroup>
        </Box>
      </Modal>
    </div>
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 0 }}>
        <EnhancedTableToolbar numSelected={selected.length} onDeleteItems={onDeleteItems} onOpenFilterModal={handleFiltersModal} onSearch={search} setSearch={handleSearchText} />
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
                      onDoubleClick={() => props.openUser(row.sideEffect_id, row.name)}
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
                        <Grid item xs={1} style={{ cursor: 'pointer' }}>
                          <Grid container >
                            <Typography style={{ paddingLeft: '5px', paddingTop: "12px", position: 'relative' }} component={'div'}> {row.id}</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell
                        component='th'
                        id={labelId}
                        style={{ textAlign: 'center' }}
                        scope='row'
                        padding='none'>
                        {row.name}
                      </TableCell>
                      <TableCell
                        component='th'
                        id={labelId}
                        style={{ textAlign: 'center' }}
                        scope='row'
                        padding='none'>
                        {renderBatch(row.score)}
                      </TableCell>
                      <TableCell
                        component='th'
                        id={labelId}
                        style={{ textAlign: 'center' }}
                        scope='row'
                        padding='none'>
                        {row.date}
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
          rowsPerPageOptions={[5, 10, 25, 30, 35]}
          component='div'
          count={total ? total : 0}
          rowsPerPage={limit}
          page={page}
          onPageChange={setPage}
          onRowsPerPageChange={(e) => { setLimit(e.target.value) }}
        />
      </Paper>
    </Box>
  </>);
}
