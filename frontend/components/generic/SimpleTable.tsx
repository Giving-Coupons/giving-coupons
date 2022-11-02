import {
  CircularProgress,
  Grid,
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import * as React from 'react';
import { simpleTableStyles } from '../../styles/components/SimpleTable/simpleTableStyles';
import { combineSxProps } from '../../utils/types';

type TableColumn<D, K> = K extends keyof D
  ? D[K] extends React.ReactNode
    ? TableColumnWithOptionalTransform<D, K>
    : TableColumnWithDefinedTransform<D, K>
  : never;

type Comparable = number | string | null | undefined;

// Treat null or undefined options as a specified Comparable value or always keep first or last.
// Default value is 'last'.
type NotPresentOptions = 'first' | 'last' | NonNullable<Comparable>;

type TableColumnWithOptionalTransform<D, K extends keyof D> = D[K] extends React.ReactNode
  ?
      | {
          title: string;
          key: K;
          getSortValue?: (arg: NonNullable<D[K]>) => Comparable;
          notPresentIs?: NotPresentOptions;
        }
      | {
          title: string;
          key: K;
          transformValue: (arg: D[K]) => React.ReactNode;
          getSortValue?: (arg: NonNullable<D[K]>) => Comparable;
          notPresentIs?: NotPresentOptions;
        }
  : never;

type TableColumnWithDefinedTransform<D, K extends keyof D> = {
  title: string;
  key: K;
  transformValue: (arg: D[K]) => React.ReactNode;
  getSortValue?: (arg: NonNullable<D[K]>) => Comparable;
  notPresentIs?: NotPresentOptions;
};

type Action<D> = {
  component: JSX.Element;
  onClick: (row: D) => void;
};

type Order = 'asc' | 'desc';

type OrderingData<D> = {
  order: 'asc' | 'desc';
  orderBy: keyof D;
  getSortValueFromRow?: (input: D) => Comparable;
  notPresentIs?: NotPresentOptions;
};

type Props<D> = {
  columns: TableColumn<D, keyof D>[];
  rows: D[];
  actions?: Action<D>[];
  isLoading?: boolean;
  shouldUsePaper?: boolean;
  initialOrder?: OrderingData<D>;
  sx?: SxProps | undefined;
  rowSxSelector?: (row: D) => SxProps;
};

export default function SimpleTable<D>({
  columns,
  rows,
  actions = [],
  isLoading,
  shouldUsePaper = true,
  initialOrder,
  sx = {},
  rowSxSelector = () => ({}),
}: Props<D>) {
  const hasActions = actions.length > 0;
  const numColumns = columns.length + (hasActions ? 1 : 0);
  const [orderingData, setOrderingData] = React.useState<OrderingData<D> | undefined>(initialOrder);
  const sorter = !orderingData
    ? (rows: D[]) => rows
    : (rows: D[]) =>
        rows.sort(
          getComparator<D, keyof D>(
            orderingData.order,
            orderingData.orderBy,
            orderingData.getSortValueFromRow,
            orderingData.notPresentIs,
          ),
        );

  const createSortHandler = (property: keyof D) => () => {
    const notPresentIs = columns.find((c) => c.key === property)?.notPresentIs;
    const getSortValue = columns.find((c) => c.key === property)?.getSortValue as
      | ((rowProperty: unknown) => Comparable)
      | undefined;
    const getSortValueFromRow = !getSortValue ? getSortValue : (row: D) => getSortValue(row[property]);
    if (!orderingData) {
      return setOrderingData({ order: 'asc', orderBy: property, getSortValueFromRow, notPresentIs });
    }
    const { order, orderBy } = orderingData;
    if (orderBy !== property) {
      return setOrderingData({ order: 'asc', orderBy: property, getSortValueFromRow, notPresentIs });
    } else {
      return setOrderingData({
        order: 'asc' === order ? 'desc' : 'asc',
        orderBy: property,
        getSortValueFromRow,
        notPresentIs,
      });
    }
  };

  return (
    <TableContainer component={shouldUsePaper ? Paper : 'div'} sx={combineSxProps(simpleTableStyles, sx)}>
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

              return (
                <TableRow key={index} sx={rowSxSelector(row)}>
                  {cells}
                </TableRow>
              );
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
  getSortValueFromRow: ((arg: D) => Comparable) | undefined,
  notPresentIs: NotPresentOptions = 'last',
): (a: { [key in K]: unknown }, b: { [key in K]: unknown }) => number {
  return (a, b) => {
    let aVal, bVal: Comparable;

    if (!getSortValueFromRow) {
      // If no sort fn is provided, assume the object can be sorted.
      aVal = a[orderBy] as Comparable;
      bVal = b[orderBy] as Comparable;
    } else {
      aVal = getSortValueFromRow(a as D);
      bVal = getSortValueFromRow(b as D);
    }

    // Both values are present.
    if (aVal !== null && aVal !== undefined && bVal !== null && bVal !== undefined) {
      return order === 'desc' ? descendingComparator(aVal, bVal) : -descendingComparator(aVal, bVal);
    }

    // A notPresentIs value is provided (not set to 'first' or 'last'), and at least one value is absent.
    if (notPresentIs !== 'first' && notPresentIs !== 'last') {
      return order === 'desc'
        ? descendingComparator(aVal ?? notPresentIs, bVal ?? notPresentIs)
        : -descendingComparator(aVal ?? notPresentIs, bVal ?? notPresentIs);
    }

    // A notPresentIs is 'first' or 'last', and at least one value is absent.
    if ((aVal === null || aVal === undefined) && (bVal === null || bVal === undefined)) {
      // Both values are absent.
      return 0;
    } else if (aVal === null || aVal === undefined) {
      // First value is absent.
      return notPresentIs === 'last' ? 1 : -1;
    } else {
      // Second value is absent.
      return notPresentIs === 'last' ? -1 : 1;
    }
  };
}

function descendingComparator(aVal: NonNullable<Comparable>, bVal: NonNullable<Comparable>) {
  if (bVal < aVal) {
    return -1;
  }
  if (bVal > aVal) {
    return 1;
  }
  return 0;
}
