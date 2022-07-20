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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import AngelSurvey from '../api/angel/survey';

import Badge from '@mui/material/Badge';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Avatar, Grid } from '@mui/material';

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
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {props.headCells().map((headCell) => (
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
  headCells: PropTypes.func,
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
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant='h6'
          id='tableTitle'
          component='div'
        >
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
export default function SurveyMoods(props) {
  // eslint-disable-next-line
  const [columns, setColumns] = React.useState(null);
  const [headCells, setHeadCells] = React.useState([]);
  const [total, setTotal] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(10);

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [dense] = React.useState(false);
  // eslint-disable-next-line
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  const defaultAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkp0LF2WgeDkn_sQ1VuMnlnVGjkDvCN4jo2nLMt3b84ry328rg46eohB_JT3WTqOGJovY&usqp=CAU';//process.env.SENDGRID_APIKEY
  
  React.useEffect(() => {
    console.log('useEffect Survey Moods list container')
    const columns = ['date_created', 'patient'];
    const hc = [{
      id: 'date_created',
      numeric: false,
      disablePadding: false,
      label: 'Date',
    },
    {
      id: 'patient',
      numeric: false,
      disablePadding: false,
      label: 'Patient',
    }];
    async function fetchData() {
      const r = await AngelSurvey().moods({ lang_id: 'en' });
      //  Set HeadCells
      if (r.moods && r.moods.length) {
        for (let i = 0; i < r.moods.length; i++) {
          columns.push(r.moods[i].name);
          hc.push({
            id: r.moods[i].id,
            numeric: false,
            disablePadding: false,
            label: r.moods[i].name,
          });
        }
        setColumns(columns);
        setHeadCells(hc);
      }

      const records = [];
      for (let d = 0; d < r.dates.length; d++) {

        for (let u = 0; u < r.patients.length; u++) {
          const rec = addSurveyItem(r.dates[d].date, r.patients[u].patient_id, r.surveys, columns);
          records.push(rec);
        }
      }
      console.log(records);
      setRows(records);
      setTotal(records.length);
    }
    fetchData();
  }, []);
  const handleRequestSort = (event, property, surveys) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const addSurveyItem = (date, patient_id, surveys, columns) => {
    const rec = [];
    for (let j = 0; j < surveys.length; j++) {

      if (surveys[j].date_created === date && surveys[j].patient_id === patient_id) {
        // add patient date and name if not yet added to record
        if (rec.length === 0) {
          rec.push(surveys[j].date_created);
          rec.push({name:surveys[j].firstname.substring(0,2) + '. ' + surveys[j].lastname, avatar:surveys[j].avatar});
          /*for (let i = 2; i < columns.length; i++) {
            rec.push(0);
            console.log("aaa")
          }*/
        }
        let moodPosition = columns.indexOf(surveys[j].name);
        if (moodPosition > rec.length - 1) {
          rec.push(surveys[j].score);
        } else {
          rec.splice(moodPosition, 0, surveys[j].score);
        }
      }
    }
    return rec;
  }
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const renderIcon = (r, idx) => {
    if (idx < 2) {
      if(r && r.name) {
        console.log(r)
        return (<Grid container >
          <Avatar src={r.avatar ? process.env.REACT_APP_API_URL + '/public/uploads/' + r.avatar : defaultAvatar} style={{   margin: "5px"  }}/>
          <Typography style={{  paddingLeft: '5px', paddingTop: "12px", position: 'relative'  }} component={'div'}> {r.name}</Typography>
          </Grid>)
      }
      return r;
    } else if (r === 5) {
      return (<Badge badgeContent={r} color="success">
        <TagFacesIcon />
      </Badge>)
    } else if (r === 4) {
      return (<Badge badgeContent={r} color="warning">
        <SentimentSatisfiedAltIcon />
      </Badge>)
    } else if (r === 3) {
      return (<Badge badgeContent={r} color="primary">
        <SentimentSatisfiedIcon />
      </Badge>)
    } else if (r === 2) {
      return (<Badge badgeContent={r} color="secondary">
        <SentimentDissatisfiedIcon />
      </Badge>)
    } else if (r === 1) {
      return (<Badge badgeContent={r} color="error"  >
        <SentimentVeryDissatisfiedIcon />
      </Badge>)
    }
  }
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const getHeadCells = () => headCells;
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 0 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              headCells={getHeadCells}
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
                  return (
                    <TableRow
                      hover                      
                      tabIndex={-1}
                      key={index}
                    >
                      {
                        row.map((r, idx) => {
                          return (
                            <TableCell
                              component='th'
                              id={idx}
                              key={idx}
                              scope='row'
                              style={{ textAlign: 'center' }}
                              padding='none'
                            >
                              {renderIcon(r, idx)}
                            </TableCell>
                          )
                        })
                      }
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
  );
}
