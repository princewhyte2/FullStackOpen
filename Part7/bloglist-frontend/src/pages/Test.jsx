/* eslint-disable no-console */
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';

const style = {
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

const TestPage = () => {
  const [rowData, setRowData] = React.useState([]);
  const [activeRow, setActiveRow] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (row) => {
    setActiveRow(row);
    setOpen(true);
  };
  const handleClose = () => {
    setActiveRow(null);
    setOpen(false);
  };

  React.useEffect(() => {
    axios.get('https://brand-central-server.herokuapp.com/api/products').then((response) => {
      setRowData(response.data.data);
    })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setActiveRow({ ...activeRow, [name]: value });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Item Code</TableCell>
              <TableCell align="right">BrandName</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Units</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Upc</TableCell>
              <TableCell align="right">Price Code 1</TableCell>
              <TableCell align="right">Price Code 2</TableCell>
              <TableCell align="right">Price Code 3</TableCell>
              <TableCell align="right">Has Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row) => (
              <TableRow
                onClick={() => handleOpen(row)}
                key={row.itemCode}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.productName}
                </TableCell>
                <TableCell align="right">{row.itemCode}</TableCell>
                <TableCell align="right">{row.brandName}</TableCell>
                <TableCell align="right">{row.productDescription}</TableCell>
                <TableCell align="right">{row.units }</TableCell>
                <TableCell align="right">{ row.productType }</TableCell>
                <TableCell align="right">{row.productStock }</TableCell>
                <TableCell align="right">{row.productUPC}</TableCell>
                <TableCell align="right">{row.priceCode1}</TableCell>
                <TableCell align="right">{row.priceCode2}</TableCell>
                <TableCell align="right">{row.priceCode3 }</TableCell>
                <TableCell align="right">{`${row.hasImage}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Products
          </Typography>
          {activeRow && (
          <div>
            <div>
              <input onChange={handleInputChange} name="productName" value={activeRow.productName} type="text" placeholder="Product Name" />
              <input onChange={handleInputChange} name="itemCode" value={activeRow.itemCode} type="text" placeholder="Item Code" />

              <input onChange={handleInputChange} name="brandName" value={activeRow.brandName} type="text" placeholder="Brand Name" />
              <input name="productDescription" value={activeRow.productDescription} type="text" placeholder="productDescription" />
            </div>
            <div>
              <input onChange={handleInputChange} name="units" value={activeRow.units} type="text" placeholder="Units" />
              <input onChange={handleInputChange} name="productType" value={activeRow.productType} type="text" placeholder="Type" />

              <input onChange={handleInputChange} name="productStock" value={activeRow.productStock} type="text" placeholder="Product Name" />
              <input onChange={handleInputChange} name="productUPC" value={activeRow.productUPC} type="text" placeholder="Item Code" />
            </div>
            <div>
              <input onChange={handleInputChange} name="priceCode1" value={activeRow.priceCode1} type="text" placeholder="Product Name" />
              <input onChange={handleInputChange} name="priceCode2" value={activeRow.priceCode2} type="text" placeholder="Item Code" />

              <input onChange={handleInputChange} name="priceCode3" value={activeRow.priceCode3} type="text" placeholder="Product Name" />
              {/* <input type="text" placeholder="Item Code" /> */ }
              <select onChange={handleInputChange} name="hasImage" value={activeRow.hasImage}>
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </div>
          </div>
          )}

        </Box>
      </Modal>

    </div>
  );
};

export default TestPage;
