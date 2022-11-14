import { Button, Text, Skeleton, Loader, Title, Table } from '@mantine/core';
import { ItemsSelect } from './ItemsSelect';

function Cart() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[max(92%,1400px)] ">
        <Title order={1} color="dark">
          My Cart
        </Title>
        <div className="mt-8 min-h-[600px] rounded flex gap-6 flex-col lg:flex-row">
          <div className="bg-white text-white flex-1 rounded-lg">
            <ItemsSelect data={data.data} />
          </div>
          <div className="bg-white text-white min-w-[300px] rounded-lg flex flex-col justify-between p-4">
            <div className="text-black w-full  min-h-[300px] ">
              <Table fontSize="lg">
                <tbody>
                  <tr>
                    <td className="text-left">Subtotal</td>
                    <td className="text-right">$0.00</td>
                  </tr>
                  <tr>
                    <td className="text-left">Shipping</td>
                    <td className="text-right font-medium">FREE</td>
                  </tr>
                  <tr>
                    <td className="text-left font-semibold">Total</td>
                    <td className="text-right font-semibold">$0</td>
                  </tr>
                </tbody>
              </Table>
            </div>

            <Button fullWidth radius="md" className="h-[45px] font-light text-lg">
              Proceed To Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

let data = {
  data: [
    {
      id: 'fsd1',
      avatar:
        'https://res.cloudinary.com/dv9wpbflv/image/upload/v1668320696/zavy/naqzoqkkf5ieby7pyros.png',
      title: 'Mesh Panel Ruched Glitter Top',
      price: '10.00'
    },
    {
      id: 'sdf2',
      avatar:
        'https://res.cloudinary.com/dv9wpbflv/image/upload/v1668320894/zavy/o7hzthnrnhlii05fhovy.png',
      title: 'Men Cut And Sew Tee',
      price: '32.22'
    },
    {
      id: '3sdf',
      avatar:
        'https://res.cloudinary.com/dv9wpbflv/image/upload/v1668321322/zavy/qvb75enduzln2mebfllx.png',
      title: 'Mesh Lantern Sleeve Scoop Neck Top',
      price: '8'
    },
    {
      id: '4sdf',
      avatar:
        'https://res.cloudinary.com/dv9wpbflv/image/upload/v1668322182/zavy/pynu2ewt24ghfrmuzaup.png',
      title: 'Neckline Flounce Sleeve Blouse',
      price: '10'
    },
    {
      id: '5sdf',
      avatar:
        'https://res.cloudinary.com/dv9wpbflv/image/upload/v1668322373/zavy/up6eyghujhgzoce9mfi8.png',
      title: 'N°5 Eau de Parfum Spray',
      price: '146'
    }
  ]
};

export default Cart;
