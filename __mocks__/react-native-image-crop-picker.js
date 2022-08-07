const ImagePicker = {
  openPicker: jest.fn(() =>
    Promise.resolve({
      mime: 'mime',
      data: 'data',
    }),
  ),
};
