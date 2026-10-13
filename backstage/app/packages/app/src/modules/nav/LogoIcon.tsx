import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  svg: { width: 28, height: 28, flexShrink: 0 },
  tile: { fill: theme.palette.primary.main },
  mark: { fill: theme.palette.primary.contrastText },
}));

// Rounded tile with an "L" mark; follows the theme's primary colour in light and dark.
export const LogoIcon = () => {
  const classes = useStyles();

  return (
    <svg className={classes.svg} viewBox="0 0 28 28" aria-hidden="true">
      <rect className={classes.tile} width="28" height="28" rx="8" />
      <path className={classes.mark} d="M9 7h3.2v11.2H19V21H9z" />
    </svg>
  );
};
