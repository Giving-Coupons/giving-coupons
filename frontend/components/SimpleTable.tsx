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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            {columns.map(({ title }, index) => (
              <TableCell key={index}>{title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {columns.map(({ key, transformValue = (value) => value }, index) => (
                <TableCell key={index}>{transformValue(row[key])}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
