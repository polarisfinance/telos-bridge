import * as React from 'react';

import {Box, styled} from '@/core/ui/system';

enum HEIGHT {
  xs = 26,
  sm = 32,
  md = 40,
  lg = 52,
}

enum FONT_SIZE {
  xs = 12,
  sm = 12,
  md = 14,
  lg = 16,
}

type size = 'xs' | 'sm' | 'md' | 'lg';

const DEFAULT_SIZE = 'lg';

export type BaseButtonProps = {
  size?: size;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'incognito';
};

export type ButtonProps = React.ComponentProps<typeof Button>;

export const Button = styled('button', {name: 'LzButton', label: 'LzButton'})<BaseButtonProps>(
  ({theme, size = DEFAULT_SIZE, variant = 'secondary'}) => ({
    borderRadius: 16,
    border: '0',
    height: HEIGHT[size],
    fontSize: FONT_SIZE[size],
    cursor: 'pointer',
    padding: '0px 16px',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    textTransform: (theme.typography as any).button?.textTransform,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:disabled': {
      bgcolor: 'frame.light',
      '&:hover': {
        cursor: 'default',
      },
    },
    ...(variant === 'primary' && {
      background: theme.palette.primary.mainButton,
      fontWeight: 700,
      color: theme.palette.primary.contrastText,
      '&:disabled': {
        background: theme.palette.frame.light,
        bgcolor: theme.palette.frame.light,
      },
      '&:hover:not(:disabled)': {
        background: theme.palette.primary.mainButton,
      },
      '&:focus': {
        outline: 0,
        background: theme.palette.primary.mainButton,
      },
    }),
    ...(variant === 'secondary' && {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      '&:hover:not(:disabled)': {
        backgroundColor: theme.palette.secondary.light,
      },
      '&:focus': {
        backgroundColor: theme.palette.secondary.light,
        outline: 0,
      },
    }),
    ...(variant === 'tertiary' && {
      minHeight: 24,
      padding: '4px 9px',
      fontSize: 12,
      // not sure why that size ?
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      '&:hover:not(:disabled)': {
        backgroundColor: theme.palette.secondary.light,
      },
      '&:focus': {
        backgroundColor: theme.palette.secondary.light,
        outline: 0,
      },
    }),
    ...(variant == 'incognito' && {
      background: 'transparent',
      padding: 0,
      color: theme.palette.text.primary,
      height: 'auto',
      textTransform: 'none',
      '&:hover:not(:disabled)': {
        opacity: 0.7,
      },
    }),
  }),
);

export const ButtonGroup = styled(Box, {name: 'ButtonGroup'})(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  '& > [class*=LzButton]:not(:first-of-type), & > *:first-of-type': {
    marginLeft: 1,
  },

  // Reset radii and only apply to first and last item
  '& > [class*=LzButton], & > *': {
    borderRadius: 0,
  },
  '& > [class*=LzButton]:first-of-type, & > *:first-of-type': {
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
  },
  '& > [class*=LzButton]:last-of-type, & > *:last-of-type': {
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
  },
}));
