import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';

type TableColumn<D> = {
  title: string;
  key: keyof D;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transformValue?: (value: any) => React.ReactNode;
};

type Props<D> = {
  columns: TableColumn<D>[];
  rows: D[];
  actions?: React.ReactNode[];
};

export default function SimpleTable<D>({ columns, rows, actions }: Props<D>) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(({ title }, index) => (
              <TableCell key={index}>{title}</TableCell>
            ))}
            {actions && <TableCell title="Actions">Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {columns.map(({ key, transformValue = (value) => value }, index) => (
                <TableCell key={index}>{transformValue(row[key])}</TableCell>
              ))}
              <TableCell>
                <Grid container>
                  {actions?.map((action, index) => (
                    <Grid item key={index} xs={12} lg={3}>
                      {action}
                    </Grid>
                  ))}
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
