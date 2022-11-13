import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Health & Beauty' },
      { name: `Women's Fashion` },
      { name: `Men's Fashion` },
      { name: 'Luxury' },
      { name: 'Electronics' },
      { name: 'Sports' },
      { name: 'Other' }
    ]
  });

  const zavy = await prisma.user.upsert({
    where: { username: 'zavy' },

    update: {},

    create: {
      username: 'zavy',
      name: 'Zavy',
      password:
        '$argon2id$v=19$m=65536,t=3,p=4$uVDjpuMv7g3wC6CNgDBy+Q$6HD+S6GGRI3Dp1YQlwwEGuMFWmwuPMMEtiC44YlDzHA',
      seller: {
        create: {
          storeEmail: '',
          storeName: `Zavy's Store`,
          products: {
            create: [
              {
                priceInCents: '1000',
                title: 'Mesh Panel Ruched Glitter Top',
                image: '1668320696/zavy/naqzoqkkf5ieby7pyros',
                description: 'Slim fit regular sleeve mesh panel',
                category: {
                  connect: {
                    id: 2
                  }
                }
              },
              {
                priceInCents: '1100',
                title: 'Men Cut And Sew Tee ',
                image: '1668320894/zavy/o7hzthnrnhlii05fhovy',
                description: 'Round neck with long sleeve',
                category: {
                  connect: {
                    id: 3
                  }
                }
              },
              {
                priceInCents: '2700',
                title: 'Men Flap Pocket Corduroy Shirt',
                image: '1668321025/zavy/bjkdsslmwepvhja6z7sz',
                description: 'Regular fit fabric with slight stretch',
                category: {
                  connect: {
                    id: 3
                  }
                }
              },
              {
                priceInCents: '2500',
                title: 'Men V Neck Cable Knit Sweater',
                image: '1668321156/zavy/xl0zacr9slumjeodzzjj',
                description: 'Cable-knit and regular fit',
                category: {
                  connect: {
                    id: 3
                  }
                }
              },
              {
                priceInCents: '800',
                title: 'Mesh Lantern Sleeve Scoop Neck Top',
                image: '1668321322/zavy/qvb75enduzln2mebfllx',
                description: 'Contrast mesh lantern with high stretch',
                category: {
                  connect: {
                    id: 2
                  }
                }
              },
              {
                priceInCents: '1000',
                title: 'Mesh Panel Flounce Sleeve Blouse',
                image: '1668321426/zavy/ep2hndwshdyd8vwns0kn',
                description: 'Ruffle contrast mesh with flounce sleeves',
                category: {
                  connect: {
                    id: 2
                  }
                }
              },
              {
                priceInCents: '1100',
                title: 'Neckline Flounce Sleeve Blouse',
                image: '1668322182/zavy/pynu2ewt24ghfrmuzaup',
                description: 'Notched neckline and non-stretch',
                category: {
                  connect: {
                    id: 2
                  }
                }
              },
              {
                priceInCents: '14600',
                title: 'N°5 Eau de Parfum Spray',
                image: '1668322373/zavy/up6eyghujhgzoce9mfi8',
                description:
                  'Since its creation in 1921, N°5 has exuded the very essence of femininity. The abstract, mysterious scent—alive with countless subtle facets—radiates an extravagant floral richness.',
                category: {
                  connect: {
                    id: 4
                  }
                }
              }
            ]
          }
        }
      },
      buyer: {
        create: {
          addresses: {
            create: {
              addressLine1: '76 North Road',
              city: 'London',
              country: 'United Kingdom',
              region: 'England',
              isDefault: true,
              postalCode: 'NW1'
            }
          }
        }
      }
    }
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
