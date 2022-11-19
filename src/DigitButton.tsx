import { Button, Grid } from "@mui/material";

export interface DigitButtonProps {
  digit: string;
  enterDigit: (digit: string) => void;
  xs?: number;
}

export const DigitButton = ({
  digit,
  enterDigit,
  xs = 3,
}: DigitButtonProps) => {
  return (
    <Grid item xs={xs}>
      <Button fullWidth variant="outlined" onClick={() => enterDigit(digit)}>
        {digit}
      </Button>
    </Grid>
  );
};
