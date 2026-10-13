import { makeStyles } from '@material-ui/core';
import { LogoIcon } from './LogoIcon';

const useStyles = makeStyles(theme => ({
  root: { display: 'flex', alignItems: 'center', gap: theme.spacing(1.25) },
  text: {
    color: theme.palette.text.primary,
    fontWeight: 700,
    fontSize: 16,
    letterSpacing: '-0.01em',
    whiteSpace: 'nowrap',
  },
}));

export const LogoFull = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LogoIcon />
      <span className={classes.text}>Lab Portal</span>
    </div>
  );
};
