import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress, Grid } from '@mui/material';

type TableColumn<D> = {
  title: string;
  key: keyof D;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transformValue?: (value: any) => React.ReactNode;
};

type Action<D> = {
  component: JSX.Element;
  onClick: (row: D) => void;
};

type Props<D> = {
  columns: TableColumn<D>[];
  rows: D[];
  actions?: Action<D>[];
  isLoading?: boolean;
  shouldUsePaper?: boolean;
};

export default function SimpleTable<D>({ columns, rows, actions = [], isLoading, shouldUsePaper = true }: Props<D>) {
  const hasActions = actions.length > 0;
  const numColumns = columns.length + (hasActions ? 1 : 0);

  return (
    <TableContainer component={shouldUsePaper ? Paper : 'div'}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(({ title }, index) => (
              <TableCell key={index}>{title}</TableCell>
            ))}
            {hasActions && <TableCell title="Actions">Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && (
            <TableCell colSpan={numColumns} align="center">
              <CircularProgress />
            </TableCell>
          )}
          {rows.length === 0 ? (
            <TableCell colSpan={numColumns} align="center" sx={{ color: 'lightgray' }}>
              No data to be displayed.
            </TableCell>
          ) : (
            rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map(({ key, transformValue = (value) => value }, index) => (
                  <TableCell key={index}>{transformValue(row[key])}</TableCell>
                ))}
                {hasActions && (
                  <TableCell>
                    <Grid container>
                      {actions?.map((action, index) => (
                        <Grid item key={index} xs={12} lg={3}>
                          {React.cloneElement(action.component, { onClick: () => action.onClick(row) })}
                        </Grid>
                      ))}
                    </Grid>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
