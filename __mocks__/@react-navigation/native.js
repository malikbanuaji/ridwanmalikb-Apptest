export const useRoute = jest.fn(() => ({
  params: {},
}));
export const useNavigation = () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
});
