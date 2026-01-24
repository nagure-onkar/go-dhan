import AppText from '@/components/common/AppText';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import { useLanguage } from '@/constants/localization/useLanguage';
import { commonPageStyles } from '@/constants/styles/pageStyling';
import { View } from 'react-native';

export default function FeedScreen() {
  const { t, setLanguage, language } = useLanguage();
  return (
    <ScreenWrapper>
      <View style={commonPageStyles.container}>
      <AppText style={commonPageStyles.title}>{t.feed}</AppText>
      </View>
    </ScreenWrapper>
  );
}

