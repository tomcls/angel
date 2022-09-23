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

import AngelSideEffect from '../api/angel/mood';

import { Avatar, Button, Grid, List, ListItem, ListItemText } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import Modal from '@mui/material/Modal';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AngelSurvey from '../api/angel/survey';
import { MobileDatePicker } from '@mui/lab';

import SickIcon from '@mui/icons-material/Sick';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MoodIcon from '@mui/icons-material/Mood';

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
    label: 'Patient Id',
  },
  {
    id: 'moods',
    numeric: false,
    disablePadding: false,
    label: 'Moods',
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
            align={headCell.numeric ? 'left' : 'left'}
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

export default function SurveyMoods(props) {

  const { enqueueSnackbar } = useSnackbar();
  const [total, setTotal] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(30);
  const [moods, setMoods] = React.useState([]);

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
    console.log('useEffect Moods list')
    fetchData();
  }, []);

  const handleRequestSort = (event, property) => {
    console.log('handleRequestSort', property)
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const compare = (a, b) => {
    if (a.total < b.total) {
      return 1;
    }
    if (a.total > b.total) {
      return -1;
    }
    return 0;
  }
  const createData = (avatar, moodId, id, name, firstname, lastname, total_moods, date, score) => {
    console.log(total_moods)
    let effects = name.split(',');
    let effectString = '';
    let t = total_moods.split(',');
    let s = score.split(',');
    let effectList = [];
    for (let index = 0; index < effects.length; index++) {
      const element = effects[index];
      let o = {
        name: element,
        total: t[index],
        score: s[index]
      }
      effectList.push(o);
    }
    effectList.sort(compare);
    for (let index = 0; index < effectList.length; index++) {
      const element = effectList[index];
      effectString += element.name + ' (' + element.total + '), ';
    }
    effectString = effectString.slice(0, -2);
    return {
      avatar,
      moodId,
      id,
      effectString,
      firstname,
      lastname,
      total_moods,
      date,
      effectList
    }
  }
  const fetchData = async () => {
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
    if (props.moodId) {
      o.id = props.moodId;
    }
    r = await AngelSurvey().concatMoods(o);
    console.log(r)
    if (r.surveys && r.surveys.length) {
      for (let i = 0; i < r.surveys.length; i++) {
        u.push(createData(
          r.surveys[i].avatar ? process.env.REACT_APP_API_URL + '/public/uploads/' + r.surveys[i].avatar : defaultAvatar,
          r.surveys[i].survey_mood_id, r.surveys[i].patient_id,
          r.surveys[i].total_moods,
          r.surveys[i].firstname,
          r.surveys[i].lastname,
          r.surveys[i].mood_cnt,
          r.surveys[i].date,
          r.surveys[i].score));
      }
      setRows(u);
      setMoods(r.surveys);
      setTotal(r.count);
    } else {
      setRows([]);
      setMoods([]);
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const onDeleteItems = async () => {
    if (selected.length) {
      await AngelSideEffect().delete({ ids: selected.join(',') });
      handleClickVariant('success', 'Lab(s) well deleted');
      fetchData();
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
    fetchData();
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
  const getColor = (score) => {
    if (score == 5) {
      return "error";
    } else if (score == 4) {
      return "warning";
    } else if (score == 3) {
      return "primary";
    } else if (score == 2) {
      return "secondary";
    } else if (score == 1) {
      return "success";
    }
  }
  const getIcon = (score) => {
    if (score == 5) {
      return (<SickIcon color="error" />);
    } else if (score == 4) {
      return (<SentimentVeryDissatisfiedIcon  color="warning" />);
    } else if (score == 3) {
      return (<SentimentSatisfiedIcon color="primary"/>);
    } else if (score == 2) {
      return (<SentimentSatisfiedAltIcon color="success" />);
    } else if (score == 1) {
      return (<MoodIcon color="success" />);
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
            <MobileDatePicker
              key="fromdate"
              id="fromdate"
              label="From date"
              inputFormat="MM/dd/yyyy"
              value={fromDateFilter ? fromDateFilter : ''}
              onChange={(newValue) => { setFromDate(newValue); }}
              renderInput={(params) => <TextField {...params} />}
            />
            <MobileDatePicker
              key="todate"
              id="todate"
              label="To date"
              inputFormat="MM/dd/yyyy"
              value={toDateFilter ? toDateFilter : ''}
              onChange={(newValue) => { setToDate(newValue); }}
              renderInput={(params) => <TextField {...params} />}
            />
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
                        <Grid item xs={1} style={{ cursor: 'pointer' }} onClick={() => document.getElementById("newButton").clk(row.id, row.firstname + ' ' + row.lastname, 'patient_surveys', 'panel2')}>
                          <Grid container >
                            <Typography style={{ paddingLeft: '5px', paddingTop: "12px", position: 'relative' }} component={'div'}> {row.id}</Typography>
                            <Avatar src={row.avatar} textAlign={'start'} style={{ margin: "5px" }} />
                            <Typography style={{ paddingLeft: '5px', paddingTop: "12px", position: 'relative' }} component={'div'}> {row.firstname + ' ' + row.lastname}</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell
                        component='th'
                        id={labelId}
                        style={{ textAlign: 'left' }}
                        scope='row'
                        padding='none'>
                        <Box sx={{ flexGrow: 1 }}>
                          <Grid container spacing={2} >
                            {
                              row.effectList.map(
                                (e, index) => {
                                  return (<>
                                    <Grid item xs >
                                      <Typography> {e.name}</Typography>
                                      </Grid>
                                    <Grid item xs >
                                      {getIcon(e.score)}
                                      <Badge badgeContent={e.score} color={getColor(e.score)} style={{ position:'absolute'}} ></Badge>
                                  </Grid></>)
                                }
                              )
                            }
                          </Grid>
                        </Box>
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
