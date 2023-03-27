import { faker } from "@faker-js/faker";

const User = () => ({
  id:faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  website: faker.internet.url(),
  address:
    faker.address.streetAddress() +
    faker.address.city() +
    faker.address.country(),
  bio: faker.lorem.sentences(),
  image: faker.image.avatar(),
});

const UserList = (l: number) => {
  let res = [];
  for (let i = 0; i < l; i++) {
    res.push(User());
  }
  return res;
};
export { User, UserList };
