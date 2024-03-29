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
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import GridViewIcon from '@mui/icons-material/GridView';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


function createData(name, calories, fat, carbs, protein,icon1,icon2,icon3,Doctor) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    icon1,
    icon2,
    icon3,
    Doctor

  };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3,<BeachAccessIcon color="primary" style={{marginInline:"10px"}}/>,
  <GridViewIcon color="primary" style={{marginInline:"10px"}}/>,<TrendingUpIcon color="primary" style={{marginInline:"10px"}}/>,"ahmed"),
  createData('Cupcake', 305, 3.7, 67, 4.3,<BeachAccessIcon color="primary" style={{marginInline:"10px"}}/>,
  <GridViewIcon color="primary" style={{marginInline:"10px"}}/>,<TrendingUpIcon color="primary" style={{marginInline:"10px"}}/>,"ahmed"),
  createData('Cupcake', 305, 3.7, 67, 4.3,<BeachAccessIcon color="primary" style={{marginInline:"10px"}}/>,
  <GridViewIcon color="primary" style={{marginInline:"10px"}}/>,<TrendingUpIcon color="primary" style={{marginInline:"10px"}}/>,"ahmed"),
  createData('Cupcake', 305, 3.7, 67, 4.3,<BeachAccessIcon color="primary" style={{marginInline:"10px"}}/>,
  <GridViewIcon color="primary" style={{marginInline:"10px"}}/>,<TrendingUpIcon color="primary" style={{marginInline:"10px"}}/>,"ahmed"),
  createData('Cupcake', 305, 3.7, 67, 4.3,<BeachAccessIcon color="primary" style={{marginInline:"10px"}}/>,
  <GridViewIcon color="primary" style={{marginInline:"10px"}}/>,<TrendingUpIcon color="primary" style={{marginInline:"10px"}}/>,"ahmed"),
  createData('Cupcake', 305, 3.7, 67, 4.3,<BeachAccessIcon color="primary" style={{marginInline:"10px"}}/>,
  <GridViewIcon color="primary" style={{marginInline:"10px"}}/>,<TrendingUpIcon color="primary" style={{marginInline:"10px"}}/>,"ahmed"),
  createData('Cupcake', 305, 3.7, 67, 4.3,<BeachAccessIcon color="primary" style={{marginInline:"10px"}}/>,
  <GridViewIcon color="primary" style={{marginInline:"10px"}}/>,<TrendingUpIcon color="primary" style={{marginInline:"10px"}}/>,"ahmed"),
  createData('Cupcake', 305, 3.7, 67, 4.3,<BeachAccessIcon color="primary" style={{marginInline:"10px"}}/>,
  <GridViewIcon color="primary" style={{marginInline:"10px"}}/>,<TrendingUpIcon color="primary" style={{marginInline:"10px"}}/>,"ahmed"),
  createData('Cupcake', 305, 3.7, 67, 4.3,<BeachAccessIcon color="primary" style={{marginInline:"10px"}}/>,
  <GridViewIcon color="primary" style={{marginInline:"10px"}}/>,<TrendingUpIcon color="primary" style={{marginInline:"10px"}}/>,"ahmed"),
  createData('Cupcake', 305, 3.7, 67, 4.3,<BeachAccessIcon color="primary" style={{marginInline:"10px"}}/>,
  <GridViewIcon color="primary" style={{marginInline:"10px"}}/>,<TrendingUpIcon color="primary" style={{marginInline:"10px"}}/>,"ahmed"),
  createData('Cupcake', 305, 3.7, 67, 4.3,<BeachAccessIcon color="primary" style={{marginInline:"10px"}}/>,
  <GridViewIcon color="primary" style={{marginInline:"10px"}}/>,<TrendingUpIcon color="primary" style={{marginInline:"10px"}}/>,"ahmed"),

 
];

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

const headCells = [
  {
    id: 'Nom',
    numeric: true,
    disablePadding: false,
    label: 'Nom',
  },
  {
    id: 'Prénom',
    numeric: true,
    disablePadding: false,
    label: 'Prénom',
  },
  {
    id: 'Téléphone',
    numeric: true,
    disablePadding: false,
    label: 'Téléphone',
  },
  {
    id: 'Email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'Doctor',
    numeric: true,
    disablePadding: false,
    label: 'Doctor',
  },
  {
    id: 'Coordinator',
    numeric: true,
    disablePadding: false,
    label: 'Coordinator',
  }, {
    id: 'Treatment',
    numeric: true,
    disablePadding: false,
    label: 'Treatment',
  }, {
    id: 'Survey',
    numeric: true,
    disablePadding: false,
    label: 'Survey',
  },
  {
    id: 'Data',
    numeric: true,
    disablePadding: false,
    label: 'Data',
  },
  
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
     
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{textAlign:"center"}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              style={{color:"black"}}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span"  >
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
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
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
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

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
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
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                     
                      selected={isItemSelected}
                    >
                        <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        style={{textAlign:"center"}}
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        style={{textAlign:"center"}}
                        padding="none"
                      >
                        {row.fat}
                      </TableCell>   <TableCell
                        component="th"
                        id={labelId}
                        style={{textAlign:"center"}}
                        scope="row"
                        padding="none"
                      >
                        {row.carbs}
                      </TableCell>   <TableCell
                        component="th"
                        id={labelId}
                        style={{textAlign:"center"}}
                        scope="row"
                        padding="none"
                      >
                        {row.protein}
                      </TableCell>

                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        style={{textAlign:"center"}}

                        padding="none"
                      >
                        {row.Doctor}
                      </TableCell>
                      <TableCell  style={{textAlign:"center"}} align="right">{row.calories}</TableCell>
                      <TableCell style={{textAlign:"center"}} align="right">{row.icon1}</TableCell>
                      <TableCell style={{textAlign:"center"}} align="right">{row.icon2}</TableCell>
                      <TableCell style={{textAlign:"center"}} align="right">{row.icon3}</TableCell>
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
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    
    </Box>
  );
}
