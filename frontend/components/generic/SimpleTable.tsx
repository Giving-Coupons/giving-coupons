import { simpleTableStyles } from '../../styles/components/SimpleTable/simpleTableStyles';
import * as React from 'react';
import {
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';

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

type Order = 'asc' | 'desc';

type OrderingData<D> = {
  order: 'asc' | 'desc';
  orderBy: keyof D;
};

type Props<D> = {
  columns: TableColumn<D, keyof D>[];
  rows: D[];
  actions?: Action<D>[];
  isLoading?: boolean;
  shouldUsePaper?: boolean;
  initialOrder?: OrderingData<D>;
};

export default function SimpleTable<D>({
  columns,
  rows,
  actions = [],
  isLoading,
  shouldUsePaper = true,
  initialOrder,
}: Props<D>) {
  const hasActions = actions.length > 0;
  const numColumns = columns.length + (hasActions ? 1 : 0);
  const [orderingData, setOrderingData] = React.useState<OrderingData<D> | undefined>(initialOrder);
  const sorter = !orderingData
    ? (rows: D[]) => rows
    : (rows: D[]) => rows.sort(getComparator<D, keyof D>(orderingData.order, orderingData.orderBy));

  const createSortHandler = (property: keyof D) => () => {
    if (!orderingData) {
      return setOrderingData({ order: 'asc', orderBy: property });
    }
    const { order, orderBy } = orderingData;
    if (orderBy !== property) {
      return setOrderingData({ order: 'asc', orderBy: property });
    } else {
      return setOrderingData({ order: 'asc' === order ? 'desc' : 'asc', orderBy: property });
    }
  };

  return (
    <TableContainer component={shouldUsePaper ? Paper : 'div'} sx={simpleTableStyles}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map(({ title, key }, index) => (
              <TableCell key={index} sortDirection={orderingData?.orderBy === key ? orderingData?.order : false}>
                <TableSortLabel
                  active={orderingData?.orderBy === key}
                  direction={orderingData?.orderBy === key ? orderingData?.order : 'asc'}
                  onClick={createSortHandler(key)}
                >
                  {title}
                </TableSortLabel>
              </TableCell>
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
            sorter(rows).map((row, index) => {
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

function getComparator<D, K extends keyof D>(
  order: Order,
  orderBy: K,
): (a: { [key in K]: unknown }, b: { [key in K]: unknown }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator<D, K>(a, b, orderBy)
    : (a, b) => -descendingComparator<D, K>(a, b, orderBy);
}

function descendingComparator<D, K extends keyof D>(
  a: { [key in K]: unknown },
  b: { [key in K]: unknown },
  orderBy: K,
) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
