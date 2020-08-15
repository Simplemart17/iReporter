export default {
  up: queryInterface => queryInterface.bulkInsert(
    'records',
    [
      {
        createdBy: '2',
        title: 'New Policy Making',
        type: 'Intervention',
        imageUrl: '',
        videoUrl: '',
        status: 'Draft',
        comment: 'New comment',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        createdBy: '2',
        title: 'Africa on the rise',
        type: 'Intervention',
        imageUrl: '',
        videoUrl: '',
        status: 'Draft',
        comment: 'Making it big',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        createdBy: '1',
        title: 'A new dawn',
        type: 'Redflag',
        imageUrl: '',
        videoUrl: '',
        status: 'Draft',
        comment: 'Reporting new redflag',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        createdBy: '2',
        title: 'Testing the water',
        type: 'Redflag',
        imageUrl: '',
        videoUrl: '',
        status: 'Draft',
        comment: 'Real report',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),
  down: queryInterface => queryInterface.bulkDelete('records', null, {}),
};