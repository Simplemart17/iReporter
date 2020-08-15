export default {
  up: queryInterface => queryInterface.bulkInsert(
    'users',
    [
      {
        fullname: 'Admin',
        email: 'admin@admin.com',
        username: 'admin',
        password: '$2b$10$9mxpAymtBvieBOOigAis0.ZBCAMQsHPPavBRdXglPbRzjyvI5Gn/i',
        phonenumber: '08031561207',
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: 'Martins Aloba',
        email: 'martins@gmail.com',
        username: 'martinsaloba',
        password: '$2b$10$6U1PP1zAcokdjYJP2auEX.9quKU1hrWT4yiSfnSGaoyRsMrC3rC0G',
        phonenumber: '08030561207',
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),
  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
