import { Button, ButtonProps } from '@mantine/core';
import { FacebookIcon } from '../assets/Icons/FacebookIcon';
import { GoogleIcon } from '../assets/Icons/GoogleIcon';

export function GoogleButton(props: ButtonProps & { onClick: () => void }) {
  return <Button leftIcon={<GoogleIcon />} variant="default" color="gray" {...props} />;
}

export function FacebookButton(props: ButtonProps & { onClick: () => void }) {
  return (
    <Button
      leftIcon={<FacebookIcon />}
      sx={(theme) => ({
        backgroundColor: '#4267B2 !important',
        color: '#fff',
        '&:hover': {
          backgroundColor: `${theme.fn.darken('#4267B2', 0.1)} !important`
        }
      })}
      {...props}
    />
  );
}
