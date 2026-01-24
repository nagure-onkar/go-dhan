import { StyleSheet } from 'react-native';

export const commonPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 12,
    alignItems: 'center',
  },
});
