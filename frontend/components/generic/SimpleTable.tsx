import { simpleTableStyles } from '../../styles/components/SimpleTable/simpleTableStyles';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress, Grid } from '@mui/material';

type TableColumn<D, K> = K extends keyof D
  ? D[K] extends React.ReactNode
    ? TableColumnWithOptionalTransform<D, K>
    : TableColumnWithDefinedTransform<D, K>
  : never;

type TableColumnWithOptionalTransform<D, K extends keyof D> = D[K] extends React.ReactNode
  ?
      | {
          title: string;
          key: K;
        }
      | {
          title: string;
          key: K;
          transformValue: (arg: D[K]) => React.ReactNode;
        }
  : never;

type TableColumnWithDefinedTransform<D, K extends keyof D> = {
  title: string;
  key: K;
  transformValue: (arg: D[K]) => React.ReactNode;
};

type Action<D> = {
  component: JSX.Element;
  onClick: (row: D) => void;
};

type Props<D> = {
  columns: TableColumn<D, keyof D>[];
  rows: D[];
  actions?: Action<D>[];
  isLoading?: boolean;
  shouldUsePaper?: boolean;
};

export default function SimpleTable<D>({ columns, rows, actions = [], isLoading, shouldUsePaper = true }: Props<D>) {
  const hasActions = actions.length > 0;
  const numColumns = columns.length + (hasActions ? 1 : 0);

  return (
    <TableContainer component={shouldUsePaper ? Paper : 'div'} sx={simpleTableStyles}>
      <Table stickyHeader>
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
            <TableRow>
              <TableCell colSpan={numColumns} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}

          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={numColumns} align="center" sx={{ color: 'lightgray' }}>
                No data to be displayed.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, index) => {
              const definiteColumns = columns.map(defineTransformOnTableColumn);
              const dataCells = definiteColumns.map(({ key, transformValue }, index) => (
                <TableCell key={index}>{transformValue(row[key])}</TableCell>
              ));
              const actionCells = actions.map((action, index) => (
                <Grid item key={index} xs={12} lg={3}>
                  {React.cloneElement(action.component, { onClick: () => action.onClick(row) })}
                </Grid>
              ));
              const cells = [...dataCells, ...actionCells];

              return <TableRow key={index}>{cells}</TableRow>;
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function defineTransformOnTableColumn<D, K extends keyof D>(
  column: TableColumn<D, K>,
): TableColumnWithDefinedTransform<D, K> {
  const { title, key } = column;
  return {
    title,
    key: key as K,
    transformValue: ('transformValue' in column ? column.transformValue : (arg) => arg) as (
      arg: D[K],
    ) => React.ReactNode,
  };
}
