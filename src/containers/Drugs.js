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
import AngelDrug from "../api/angel/drugs";
import AngelTreatment from '../api/angel/treatments';
import { useSnackbar } from 'notistack';
import { Avatar, Button, Grid } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import BiotechIcon from '@mui/icons-material/Biotech';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Modal from '@mui/material/Modal';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import LinkIcon from '@mui/icons-material/Link';
import AppContext from '../contexts/AppContext';
import { useTranslation } from '../hooks/userTranslation';
const defaultAvatar = 'https://dreamguys.co.in/preadmin/html/school/dark/assets/img/placeholder.jpg';

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
  console.log('stableSort', array)
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
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: props.lg.get('Name'),
    },
    {
      id: 'code',
      numeric: false,
      disablePadding: false,
      label: 'Code',
    },
    {
      id: 'created',
      numeric: false,
      disablePadding: false,
      label: props.lg.get('Created'),
    }, {
      id: 'patients',
      numeric: false,
      disablePadding: false,
      label: props.lg.get('Patients'),
    },
    {
      id: 'laboratory',
      numeric: false,
      disablePadding: false,
      label: props.lg.get('Laboratory'),
    },
    {
      id: 'notice',
      numeric: false,
      disablePadding: false,
      label: props.lg.get('Notice'),
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
            inputProps={{ 'aria-label': props.lg.get('Select all drugs') }}
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
      {numSelected > 0 ? (<>
        <Tooltip title={props.lg.get('Delete')}>
          <IconButton onClick={props.onDeleteItems}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={props.lg.get('Duplicate')}>
          <IconButton onClick={props.onDuplicate}>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip></>
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
  onDuplicate: PropTypes.func,
  onSearch: PropTypes.func,
  onOpenFilterModal: PropTypes.func,
  setSearch: PropTypes.func,
};
export default function Drugs(props) {

  const appContext = React.useContext(AppContext);
  const [userSession,] = React.useState(appContext.appState.user);
  const [lg] = useTranslation(userSession ? userSession.lang : 'en');


  const [total, setTotal] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(25);

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [dense,] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const [openFilterModal, setOpenFilterModal] = React.useState(false);

  const [searchFilter, setSearchFilter] = React.useState('');
  const [codeFilter, setCodeFilter] = React.useState(true);
  const [nameFilter, setNameFilter] = React.useState(true);

  React.useEffect(() => {
    fetchData();
  }, [page, limit,selected]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createData = (id, name, code, created, image, notice) => {
    return {
      id,
      name,
      code,
      created,
      image,
      notice
    }
  }
  const fetchData = async (newPage) => {
    const u = [];
    let r = null; //
    let o = { limit: limit, page: newPage?newPage:page, lang_id: 'en' };

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
    if (props.treatmentId) {
      o.treatment_id = props.treatmentId;
      r = await AngelTreatment().drugs(o);
    } else {
      r = await AngelDrug().list(o);
    }
    
    if (r.drugs && r.drugs.length > 0) {
      for (let i = 0; i < r.drugs.length; i++) {
        u.push(createData(
          r.drugs[i].drug_id,
          r.drugs[i].drug_name,
          r.drugs[i].drug_code,
          formatDate(r.drugs[i].date_created),
          r.drugs[i].image ? process.env.REACT_APP_API_URL + '/public/drugs/images/' + r.drugs[i].image : defaultAvatar,
          r.drugs[i].notice ? process.env.REACT_APP_API_URL + '/public/drugs/documents/' + r.drugs[i].notice : null)
        );
      }
      setRows(u);
      setTotal(r.total);
    
    } else {
      setRows([]);
      setTotal(0);
    }
  }
  const handleFiltersModal = () => setOpenFilterModal(true);
  const handleCloseFilterModal = () => setOpenFilterModal(false);

  const formatDate = (v) => {
    let d = new Date(v);
    var datestring = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    return datestring;
  }
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
      await AngelDrug().delete({ ids: selected.join(',') });
      handleClickVariant('success', lg.get('Treatment(s) well deleted'));
      setSelected([]);
    }
  }
  const onDuplicate = async () => {
    if (selected.length) {
      await AngelDrug().duplicate({ ids: selected });
      handleClickVariant('success', lg.get('Treatment(s) well duplicated'));
      setSelected([]);
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
              {lg.get('Filters')}
            </Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={codeFilter} onChange={handleCodeFilter} />} label="Code" />
              <FormControlLabel control={<Checkbox checked={nameFilter} onChange={handleNameFilter} />} label={lg.get('Name')} />
            </FormGroup>
          </Box>
        </Modal>
      </div>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 0 }}>
          <EnhancedTableToolbar lg={lg} numSelected={selected.length} onDeleteItems={onDeleteItems} onDuplicate={onDuplicate} onOpenFilterModal={handleFiltersModal} onSearch={search} setSearch={handleSearchText} />
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
                {
                stableSort(rows, getComparator(order, orderBy))
               //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
               .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${row.id}`;
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        onDoubleClick={() => document.getElementById("newButton").clk(row.id, row.code + ' ' + row.name, 'drug')}
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
                          <Grid container spacing={2}>
                            <Grid item xs={1} textAlign={'start'} style={{ marginTop: '10px', fontWeight: 'bold' }}>
                              {row.id}
                            </Grid>
                            <Grid item xs={1} style={{ cursor: 'pointer' }}>
                              <Avatar variant="rounded" src={row.image} textAlign={'start'} onClick={() => document.getElementById("newButton").clk(row.id, row.code + ' ' + row.name, 'drug')} />
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          style={{ textAlign: 'left' }}
                          padding='none'
                          onClick={() => document.getElementById("newButton").clk(row.id, row.code + ' ' + row.name, 'drug')}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          style={{ textAlign: 'left' }}
                          padding='none'
                        >
                          {row.code}
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          style={{ textAlign: 'left' }}
                          scope='row'
                          padding='none'>
                          {row.created}
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          style={{ textAlign: 'left' }}
                          scope='row'
                          padding='none'>
                          <FamilyRestroomIcon color={'primary'} style={{ cursor: 'pointer' }} onClick={() => document.getElementById("newButton").clk(row.id, row.code + ' ' + row.name, 'drug_patients')} />
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          style={{ textAlign: 'left' }}
                          scope='row'
                          padding='none'>
                          <BiotechIcon color={'primary'} style={{ cursor: 'pointer' }} onClick={() => document.getElementById("newButton").clk(row.id, row.code + ' ' + row.name, 'drug_laboratories')} />
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          style={{ textAlign: 'left' }}
                          scope='row'
                          padding='none'>
                          {row.notice ? <a href={row.notice} target="blank"> <LinkIcon color={'primary'}  style={{ cursor: 'pointer' }} /></a> : ' - '}
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
    </>);
}
