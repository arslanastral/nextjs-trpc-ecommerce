import { Table } from '@mantine/core';

type PricePreviewProps = {
  price?: string;
  shippingPrice?: string;
};

function PricePreview({ price, shippingPrice = 'FREE' }: PricePreviewProps) {
  return (
    <Table fontSize="lg">
      <tbody>
        <tr>
          <td className="text-left">Subtotal</td>
          <td className="text-right">${price}</td>
        </tr>
        <tr>
          <td className="text-left">Shipping</td>
          <td className="text-right font-medium">{shippingPrice}</td>
        </tr>
        <tr>
          <td className="text-left font-semibold">Total</td>

          <td className="text-right font-semibold">${price}</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default PricePreview;
