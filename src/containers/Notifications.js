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
import AngelNotification from "../api/angel/notifications";
import { Grid } from '@mui/material';
import { useSnackbar } from 'notistack';

import { Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Modal from '@mui/material/Modal';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AppContext from '../contexts/AppContext';
import { useTranslation } from '../hooks/userTranslation';


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

  const headCells = [
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
      id: 'object',
      numeric: false,
      disablePadding: false,
      label: props.lg.get('Object'),
    }, {
      id: 'date',
      numeric: false,
      disablePadding: false,
      label: props.lg.get('Date'),
    }
  ];
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': props.lg.get('select all Notifications') }}
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
        <Tooltip title={props.lg.get('Delete')}>
          <IconButton onClick={props.onDeleteItems}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (<Grid container >
        <Grid item md={12}>
          <TextField
            id="input-with-icon-textfield"
            onChange={(e) => props.setSearch(e.target.value)}
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
export default function Notifications(props) {

  const { enqueueSnackbar } = useSnackbar();

  const appContext = React.useContext(AppContext);
  const [userSession,] = React.useState(appContext.appState.user);
  const [lg] = useTranslation(userSession ? userSession.lang : 'en');

  const [, setNotifications] = React.useState(null);

  const [total, setTotal] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(25);

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [dense,] = React.useState(false);
  const [rows, setRows] = React.useState([]);

  const [openFilterModal, setOpenFilterModal] = React.useState(false);
  const [openDetailModal, setOpenDetailModal] = React.useState(false);

  const [searchFilter, setSearchFilter] = React.useState('');
  const [firstnameFilter, setFirstnameFilter] = React.useState(true);
  const [lastnameFilter, setLastnameFilter] = React.useState(true);
  const [emailFilter, setEmailFilter] = React.useState(true);
  const [phoneFilter, setPhoneFilter] = React.useState(false);

  const [object, setObject] = React.useState(null);
  const [content, setContent] = React.useState(null);
  const [fromEmail, setEmailFrom] = React.useState(null);
  const [date, setDate] = React.useState(null);


  React.useEffect(() => {
    fetchData();
  }, [page, limit]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const createData = (id, user_from, user_to, firstname_from, lastname_from, email_from, object, content, date, readed) => {
    return {
      id,
      user_from,
      user_to,
      firstname_from,
      lastname_from,
      email_from,
      object,
      content,
      date,
      readed
    }
  }
  const fetchData = async () => {
    const u = [];
    let r = null;
    let o = {
      limit: limit,
      page: page,
      user_to: userSession.id
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
    r = await AngelNotification().list(o);
    if (r.users && r.users.length) {
      for (let i = 0; i < r.users.length; i++) {
        u.push(createData(
          r.users[i].id,
          r.users[i].user_from,
          r.users[i].user_to,
          r.users[i].firstname_from,
          r.users[i].lastname_from,
          r.users[i].email_from,
          r.users[i].object,
          r.users[i].content,
          formatDate(r.users[i].date_created),
          r.users[i].readed
        ));
      }
      setRows(u);
      setNotifications(r.users);
      setTotal(r.total);
    } else {
      setRows([]);
      setNotifications([]);
      setTotal(0);
    }
  }
  const formatDate = (v) => {
    let d = new Date(v);
    var datestring = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    return datestring;
  }
  const handleFiltersModal = () => setOpenFilterModal(true);
  const handleCloseFilterModal = () => setOpenFilterModal(false);
  const handleDetailModal = () => setOpenDetailModal(true);
  const handleCloseDetailModal = () => setOpenDetailModal(false);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.user_id);
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
      await AngelNotification().delete({ ids: selected.join(',') });
      handleClickVariant('success', lg.get('Notification(s) well deleted'));
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
  const handlePhoneFilter = (event) => {
    setPhoneFilter(event.target.checked);
  };
  const handleSearchText = (txt) => {
    setSearchFilter(txt);
  };
  const onOpenDetailModal = async (record) => {
    console.log(record);
    await AngelNotification().update({ id: record.id, readed: 1 });
    setContent(record.content);
    setDate(record.date);
    setObject(record.object);
    setEmailFrom(record.firstname_from + ' ' + record.lastname_from + ' <' + record.email_from + '>');
    handleDetailModal();
  }
  const onPageChange = (event, newPage) => {
    setPage(newPage);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <Modal
          open={openDetailModal}
          onClose={handleCloseDetailModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {object}
            </Typography>
            <div><b>{lg.get('From')}:</b> {fromEmail}</div>
            <div><b>{lg.get('When')}:</b> {date}</div>
            <p>
              {content}
            </p>
          </Box>
        </Modal>
      </div>
      <div>
        <Modal
          open={openFilterModal}
          onClose={handleCloseFilterModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {lg.get('Filters')}
            </Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={firstnameFilter} onChange={handleFirstnameFilter} />} label={lg.get('Firstname')} />
              <FormControlLabel control={<Checkbox checked={lastnameFilter} onChange={handleLastnameFilter} />} label={lg.get('Lastname')} />
              <FormControlLabel control={<Checkbox checked={emailFilter} onChange={handleEmailFilter} />} label="Email" />
              <FormControlLabel control={<Checkbox checked={phoneFilter} onChange={handlePhoneFilter} />} label={lg.get('Phone')} />
            </FormGroup>
          </Box>
        </Modal>
      </div>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 0 }}>
          <EnhancedTableToolbar lg={lg} numSelected={selected.length} onDeleteItems={onDeleteItems} onOpenFilterModal={handleFiltersModal} onSearch={search} setSearch={handleSearchText} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby='tableTitle'
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                lg={lg}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
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
                          </Grid>
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          style={{ textAlign: 'left', cursor: 'pointer' }}
                          padding='none'
                          onClick={() => onOpenDetailModal(row)}
                        >
                          <b> {row.firstname_from}</b>
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          style={{ textAlign: 'left', fontWeight: row.readed ? 'normal' : 'bold' }}
                          padding='none'
                        >
                          {row.lastname_from}
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          style={{ textAlign: 'left', fontWeight: row.readed ? 'normal' : 'bold' }}
                          scope='row'
                          padding='none'>
                          {row.email_from}
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          style={{ textAlign: 'left', fontWeight: row.readed ? 'normal' : 'bold' }}
                          scope='row'
                          padding='none'>
                          {row.object}
                        </TableCell>

                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          style={{ textAlign: 'left', fontWeight: row.readed ? 'normal' : 'bold' }}
                          padding='none' >
                          {row.date}
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
