import { Button, Grid } from "@mui/material";

export interface OperationButton {
  operation: string;
  selectOperation: (operation: string) => void;
  selectedOperation: string;
}

export const OperationButton = ({
  operation,
  selectOperation,
}: OperationButton) => {
  return (
    <Grid item xs={3}>
      <Button
        fullWidth
        variant="outlined"
        onClick={() => selectOperation(operation)}
      >
        {operation}
      </Button>
    </Grid>
  );
};
