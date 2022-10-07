import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type TableColumn<D> = {
  title: string;
  key: keyof D;
  transformValue?: (value: any) => React.ReactNode;
};

type Props<D> = {
  columns: TableColumn<D>[];
  rows: D[];
};

export default function SimpleTable<D>({ columns, rows }: Props<D>) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(({ title }) => (
              <TableCell>{title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {columns.map(({ key, transformValue = (value) => value }) => (
                <TableCell>{transformValue(row[key])}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
