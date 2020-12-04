import {colors, images} from '../theme';

const startedScreen = [
  {
    imageUri: images.Onboarding.image1,
    heading: 'Pembelajaran Online',
    description: 'Akses module pelatihan kapan sana dan di mana saja.',
    key: 'first',
    color: colors.primary2 + 60,
  },
  {
    imageUri: images.Onboarding.image2,
    heading: 'Pembelajaran Kolaboratif',
    description:
      'Dapatkan pengalaman belajar secara kolaboratif dengan karyawan lainnya',
    key: 'second',
    color: colors.primary2 + 60,
  },
  {
    imageUri: images.Onboarding.image3,
    heading: 'Pembelajaran di Dalam Kelas',
    description:
      'Pelatihan bisa dilakukan di dalam kelas konvensional yang terdiri dari instruktur dan peserta',
    key: 'third',
    color: colors.primary + 60,
  },
];

export {startedScreen};
