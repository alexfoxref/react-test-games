export const config = {
  screenTypes: [
    {
      name: 'mobile',
      minWidth: 0,
      maxWidth: 767,
    },
    {
      name: 'tablet',
      minWidth: 768,
      maxWidth: 1199,
    },
    {
      name: 'desktop',
      minWidth: 1200,
      maxWidth: 1999,
    },
    {
      name: 'laptop',
      minWidth: 2000,
      maxWidth: Infinity,
    },
    {
      name: 'default',
      minWidth: 0,
      maxWidth: Infinity,
    },
  ],
}
