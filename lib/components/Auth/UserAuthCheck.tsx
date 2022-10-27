import { Text } from '@mantine/core';
import Link from 'next/link';

export function UserAuthCheck({
  message,
  action,
  link
}: {
  message: string;
  action: string;
  link: string;
}) {
  return (
    <Text align="center" mt="md">
      {message}{' '}
      <Link className="text-blue-700" href={link}>
        {action}
      </Link>
    </Text>
  );
}
