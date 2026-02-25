import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AppText from '../../src/components/common/AppText';
import ScreenWrapper from '../../src/components/common/ScreenWrapper';
import { useLanguage } from '../../src/constants/localization/useLanguage';
import spacing from '../../src/constants/spacing';
import { useTheme } from '../../src/theme/useTheme';


// @ts-ignore
import DateTimePicker from '@react-native-community/datetimepicker';




// Preset values used as initial defaults — displayed faintly until edited
const PRESET_VALUES = {
  animalId: 'C-001', 
  doctorId: 'V4',
  doctorName: 'Dr.Shreya Desai',
};

const BASE_URL = "https://astrabytte-ai.onrender.com";

const getStoredToken = async () => {
  const token = await AsyncStorage.getItem("access_token");
  return token;
};
export default function HeatOnHeatScreen({ navigation }: any = {}) {
  
  const [animalId, setAnimalId] = useState('C-001');
  const [recommendInsemination, setRecommendInsemination] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // New fields for extended heat form
  const symptomOptions = [
    'mounting',
    'standing to be mounted',
    'slimy mucus',
    'frequent bellowing',
    'frequent urination',
    'reduced feed intake',
    'drop in milk',
    'restlessness',
    'vulva swelling',
    'tail holding',
  ];

  // Symptoms stored as a map so each symptom has its own select value (e.g. 'Yes' / 'No')
  const [symptomsMap, setSymptomsMap] = useState<Record<string, string>>(() => {
    const m: Record<string, string> = {};
    symptomOptions.forEach((s) => (m[s] = ''));
    return m;
  });

  // Modal selector state (re-used for symptoms and other selects)
  const [selectModalVisible, setSelectModalVisible] = useState(false);
  const [selectModalTarget, setSelectModalTarget] = useState('');
  const [selectModalOptions, setSelectModalOptions] = useState<string[]>([]);

  const methodOptions = ['Select', 'Manual Exam', 'Vaginal discharge check ', 'Rectal Exam','Ultrasound'];
  const finalResultOptions = ['Select', 'Confirmed Heat', 'No Heat', 'Treatment required'];

  const openSelect = (target: string, options: string[]) => {
    setSelectModalTarget(target);
    setSelectModalOptions(options);
    setSelectModalVisible(true);
  };

  const onSelectOption = (opt: string) => {
    if (selectModalTarget.startsWith('symptom:')) {
      const key = selectModalTarget.replace('symptom:', '');
      setSymptomsMap((prev) => ({ ...prev, [key]: opt === 'Select' ? '' : opt }));
    } else if (selectModalTarget === 'isLactating') {
      setIsLactating(opt === 'Yes' ? 'yes' : opt === 'No' ? 'no' : '');
    } else if (selectModalTarget === 'methodConfirmation') {
      setMethodConfirmation(opt === 'Select' ? '' : opt);
    } else if (selectModalTarget === 'finalResult') {
      setFinalResult(opt === 'Select' ? '' : opt);
    }

    setSelectModalVisible(false);
  };

  const [dateReported, setDateReported] = useState('');
  const [isLactating, setIsLactating] = useState<'yes' | 'no' | ''>('');
  const [doctorId, setDoctorId] = useState('V4');
  const [doctorName, setDoctorName] = useState('Dr.Shreya Desai');
  const [methodConfirmation, setMethodConfirmation] = useState('');
  const [finalResult, setFinalResult] = useState('');
  const [recommendedAI, setRecommendedAI] = useState('');
  const [diagnosisSummary, setDiagnosisSummary] = useState('');
  const [doctorFees, setDoctorFees] = useState('');
  const [treatmentExpenses, setTreatmentExpenses] = useState('');
  const [otherExpenses, setOtherExpenses] = useState('');

  const { colors } = useTheme();
  const { t } = useLanguage();
  const styles = createStyles(colors);


  // Date picker states
  const [dateReportedDate, setDateReportedDate] = useState<Date | null>(null);
  const [showDateReportedPicker, setShowDateReportedPicker] = useState(false);

  const [recommendedDateTime, setRecommendedDateTime] = useState<Date | null>(null);
  const [showRecommendedPicker, setShowRecommendedPicker] = useState(false);
  const [recommendedPickerMode, setRecommendedPickerMode] = useState<'date' | 'time'>('date');

  const formatDate = (d: Date) => {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const formatDateTime = (d: Date) => {
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${formatDate(d)} ${hh}:${min}`;
  };

  const validate = () => {
    if (!animalId.trim()) {
      Alert.alert('Validation', 'Please enter Animal ID.');
      return false;
    }
    // Require each symptom to have a selection
    for (const s of symptomOptions) {
      if (!symptomsMap[s]) {
        Alert.alert('Validation', `Please select an option for "${s}".`);
        return false;
      }
    }
    if (!dateReportedDate) {
      Alert.alert('Validation', 'Please select Date of Symptoms Reported.');
      return false;
    }
    if (!isLactating) {
      Alert.alert('Validation', 'Please indicate if the cattle is lactating.');
      return false;
    }
    if (!methodConfirmation.trim()) {
      Alert.alert('Validation', 'Please select Method of Confirmation.');
      return false;
    }
    if (!finalResult.trim()) {
      Alert.alert('Validation', 'Please select Final Result.');
      return false;
    }
    if (!doctorFees.trim() || isNaN(parseFloat(doctorFees))) {
      Alert.alert('Validation', 'Please enter valid Doctor Fees.');
      return false;
    }
    if (!treatmentExpenses.trim() || isNaN(parseFloat(treatmentExpenses))) {
      Alert.alert('Validation', 'Please enter valid Treatment Expenses.');
      return false;
    }
    if (!otherExpenses.trim() || isNaN(parseFloat(otherExpenses))) {
      Alert.alert('Validation', 'Please enter valid Other Expenses.');
      return false;
    }
    return true;
  }; 

 

  const onSubmit = async () => {
  if (!validate()) return;

  setSubmitting(true);

  try {
    const token = await getStoredToken();

    console.log("Retrieved Token:", token);

    if (!token) {
      Alert.alert("Error", "User not authenticated");
      return;
    }

    const payload = {

  animalId: animalId.trim(), 
  isCattleLactating: isLactating === "yes",
  symptomsReportedDate: dateReportedDate
    ? dateReportedDate.toISOString().split("T")[0]
    : null,
  methodOfConfirmation: methodConfirmation,
  finalResult: finalResult,
  recommendedAiDate: recommendedDateTime
    ? recommendedDateTime.toISOString().split("T")[0]
    : null,

  diagnosisSummary: diagnosisSummary.trim() || "",
  doctorFees: Number(doctorFees),
  treatmentExpenses: Number(treatmentExpenses),
  otherExpenses: Number(otherExpenses),
};
    console.log("Sending Heat Payload:", payload); 
    console.log("API URL:", `${BASE_URL}/heat-/api/v1/heat-confirmation/`);

    const response = await fetch(`${BASE_URL}/heat-/api/v1/heat-confirmation/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    console.log("API Response Status:", response.status);

    const data = await response.json();

    console.log("Heat API Response Data:", data);

    if (!response.ok) {
  Alert.alert("Error", JSON.stringify(data.detail || data.message));
  return;
}

    Alert.alert("Success", "Heat record saved successfully!");
    navigation?.goBack?.();

  } catch (error: any) {
    console.log("API Error:", error);
    Alert.alert("Error", error.message || "Submission failed");
  } finally {
    setSubmitting(false);
  }
};
  return (
    <ScreenWrapper>
      <View style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.iconWrap}>
              <MaterialCommunityIcons name="fire" size={24} color={colors.card} />
            </View>
            <View>
              <AppText style={styles.title}>Heat Life Cycle</AppText>
              <AppText style={styles.subtitle}>State: On Heat</AppText>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <AppText style={styles.label}>{"Animal ID"}</AppText>
          <TextInput
            style={[styles.input, animalId === PRESET_VALUES.animalId && styles.inputPrefilled]}
            placeholder="e.g. C-001"
            value={animalId}
            onChangeText={setAnimalId}
            onFocus={() => animalId === PRESET_VALUES.animalId && setAnimalId('')}
            onBlur={() => animalId.trim() === '' && setAnimalId(PRESET_VALUES.animalId)}
            returnKeyType="next"
          />

         <View style={styles.sectionCard}>

  <View style={styles.sectionTitleContainer}>
    <AppText style={styles.sectionTitle}>{"Current Heat Symptoms"}</AppText>
    <View style={styles.sectionDivider} />
  </View>

  <View style={styles.symptomGrid2}>

    {symptomOptions.map((s) => (
      <View key={s} style={styles.symptomField}>
        <AppText style={styles.symptomLabelSmall}>{s} *</AppText>
        <TouchableOpacity
          style={styles.selectInput}
          onPress={() => openSelect(`symptom:${s}`, ['Select', 'Yes', 'No'])}
        >
          <Text
            style={[
              styles.selectText,
              !symptomsMap[s] && styles.selectPlaceholder
            ]}
          >
            {symptomsMap[s] || 'Select'}
          </Text>
          <MaterialCommunityIcons
            name="chevron-down"
            size={spacing.md}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>
    ))}
  </View>
</View>


          <AppText style={styles.label}>Date of Symptoms Reported *</AppText>
          <TouchableOpacity style={styles.selectInput} onPress={() => setShowDateReportedPicker(true)}>
            <AppText style={[styles.selectText, !dateReportedDate && styles.selectPlaceholder]}>{dateReportedDate ? formatDate(dateReportedDate) : 'dd-mm-yyyy'}</AppText>
            <MaterialCommunityIcons name="calendar" size={spacing.md} color={colors.text} />
          </TouchableOpacity>

          {showDateReportedPicker && (
            <DateTimePicker
              value={dateReportedDate || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(e, selectedDate) => {
                setShowDateReportedPicker(Platform.OS === 'ios');
                if (selectedDate) {
                  setDateReportedDate(selectedDate);
                  setDateReported(formatDate(selectedDate));
                }
              }}
            />
          )}

          <AppText style={styles.label}>Is Cattle Lactating *</AppText>
          <TouchableOpacity style={styles.selectInput} onPress={() => openSelect('isLactating', ['Select', 'Yes', 'No'])}>
            <AppText style={[styles.selectText, !isLactating && styles.selectPlaceholder]}>{isLactating ? (isLactating === 'yes' ? 'Yes' : 'No') : 'Select Answer'}</AppText>
            <MaterialCommunityIcons name="chevron-down" size={spacing.md} color={colors.text} />
          </TouchableOpacity>

         <View style={styles.sectionCard}>

  <View style={styles.sectionTitleContainer}>
    <AppText style={styles.sectionTitle}>Vet Confirmation</AppText>
    <View style={styles.sectionDivider} />
  </View>

          <AppText style={styles.small}>Doctor ID</AppText>
          <TextInput
            style={[styles.input, doctorId === PRESET_VALUES.doctorId && styles.inputPrefilled]}
            value={doctorId}
            onChangeText={setDoctorId}
            onFocus={() => doctorId === PRESET_VALUES.doctorId && setDoctorId('')}
            onBlur={() => doctorId.trim() === '' && setDoctorId(PRESET_VALUES.doctorId)}
          />
          <AppText style={styles.small}>Doctor Name</AppText>
          <TextInput
            style={[styles.input, doctorName === PRESET_VALUES.doctorName && styles.inputPrefilled]}
            value={doctorName}
            onChangeText={setDoctorName}
            onFocus={() => doctorName === PRESET_VALUES.doctorName && setDoctorName('')}
            onBlur={() => doctorName.trim() === '' && setDoctorName(PRESET_VALUES.doctorName)}
          />

          <AppText style={styles.label}>Method of Confirmation *</AppText>
          <TouchableOpacity style={styles.selectInput} onPress={() => openSelect('methodConfirmation', methodOptions)}>
            <AppText style={[styles.selectText, !methodConfirmation && styles.selectPlaceholder]}>{methodConfirmation || 'Select'}</AppText>
            <MaterialCommunityIcons name="chevron-down" size={spacing.md} color={colors.text} />
          </TouchableOpacity>

          <AppText style={styles.label}>Final Result *</AppText>
          <TouchableOpacity style={styles.selectInput} onPress={() => openSelect('finalResult', finalResultOptions)}>
            <AppText style={[styles.selectText, !finalResult && styles.selectPlaceholder]}>{finalResult || 'Select'}</AppText>
            <MaterialCommunityIcons name="chevron-down" size={spacing.md} color={colors.text} />
          </TouchableOpacity>
          </View>

          <AppText style={styles.label}>Recommended Date & Time for AI</AppText>
          <TouchableOpacity style={styles.selectInput} onPress={() => { setRecommendedPickerMode('date'); setShowRecommendedPicker(true); }}>
            <AppText style={[styles.selectText, !recommendedDateTime && styles.selectPlaceholder]}>{recommendedDateTime ? formatDateTime(recommendedDateTime) : 'dd-mm-yyyy --:--'}</AppText>
            <View style={styles.datetimeIcons}>
              <MaterialCommunityIcons name="calendar" size={spacing.md} color={colors.text} />
              <MaterialCommunityIcons name="clock" size={spacing.md} color={colors.text} style={{ marginLeft: 8 }} />
            </View>
          </TouchableOpacity>

          {showRecommendedPicker && (
            <DateTimePicker
              value={recommendedDateTime || new Date()}
              mode={recommendedPickerMode}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={(e, selected) => {
                if (!selected) {
                  setShowRecommendedPicker(Platform.OS === 'ios');
                  setRecommendedPickerMode('date');
                  return;
                }

                if (recommendedPickerMode === 'date') {
                  const base = new Date(selected);
                  if (recommendedDateTime) {
                    base.setHours(recommendedDateTime.getHours(), recommendedDateTime.getMinutes());
                  }
                  setRecommendedDateTime(base);
                  setRecommendedAI(formatDateTime(base));

                  if (Platform.OS !== 'ios') {
                    setRecommendedPickerMode('time');
                    setShowRecommendedPicker(true);
                  }
                } else {
                  const dt = recommendedDateTime ? new Date(recommendedDateTime) : new Date();
                  dt.setHours((selected as Date).getHours(), (selected as Date).getMinutes());
                  setRecommendedDateTime(dt);
                  setRecommendedAI(formatDateTime(dt));
                  setRecommendedPickerMode('date');
                  setShowRecommendedPicker(Platform.OS === 'ios');
                }
              }}
            />
          )}

          <AppText style={styles.label}>Diagnosis Summary</AppText>
          <TextInput style={[styles.input, styles.multiline]} placeholder="Diagnosis summary..." value={diagnosisSummary} onChangeText={setDiagnosisSummary} multiline numberOfLines={3} />



          <View style={styles.sectionCard}>

  <View style={styles.sectionTitleContainer}>
    <AppText style={styles.sectionTitle}>Expenses</AppText>
    <View style={styles.sectionDivider} />
  </View>

          <AppText style={styles.small}>Doctor Fees *</AppText>
          <TextInput style={styles.inputNumeric} value={doctorFees} onChangeText={setDoctorFees} keyboardType="numeric" />
          <AppText style={styles.small}>Treatment Expenses *</AppText>
          <TextInput style={styles.inputNumeric} value={treatmentExpenses} onChangeText={setTreatmentExpenses} keyboardType="numeric" />
          <AppText style={styles.small}>Other Expenses *</AppText>
          <TextInput style={styles.inputNumeric} value={otherExpenses} onChangeText={setOtherExpenses} keyboardType="numeric" />

          </View>

          <Modal visible={selectModalVisible} transparent animationType="fade" onRequestClose={() => setSelectModalVisible(false)}>
            <Pressable style={styles.modalOverlay} onPress={() => setSelectModalVisible(false)}>
              <View style={styles.modalContent}>
                {selectModalOptions.map((opt) => (
                  <TouchableOpacity key={opt} style={styles.modalOption} onPress={() => onSelectOption(opt)}>
                    <AppText style={styles.modalOptionText}>{opt}</AppText>
                  </TouchableOpacity>
                ))}
              </View>
            </Pressable>
          </Modal>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => navigation?.goBack?.()}
              disabled={submitting}
            >
              <AppText style={styles.cancelText}>Cancel</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={onSubmit}
              disabled={submitting}
            >
              {submitting ? <ActivityIndicator color="#fff" /> : <AppText style={styles.submitText}>Submit Heat Form</AppText>}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      </View>
    </ScreenWrapper>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({

  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.md, paddingBottom: 32 },
  header: { marginBottom: spacing.sm },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  title: { fontSize: 20, color: colors.text, fontWeight: '700' },
  subtitle: { fontSize: 13, color: colors.text },
  card: {
    backgroundColor: colors.card,
    borderRadius: spacing.sm,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  label: { fontSize: 13, color: colors.text, marginTop: 10, marginBottom: 6, fontWeight: '600' },
  small: { fontSize: spacing.sm, color: colors.text },
  input: {
    backgroundColor: colors.card,
    borderRadius: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputPrefilled: { color: colors.text, fontStyle: 'italic' },
  multiline: { minHeight: 72, textAlignVertical: 'top' as const },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 },
  button: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  submitButton: { backgroundColor: colors.primary },
  submitText: { color: colors.card, fontWeight: '700' },
  cancelButton: { backgroundColor: colors.card, borderWidth: 1, borderColor: '#e5e7eb' },
  cancelText: { color: colors.text, fontWeight: '700' },

  // New styles for symptoms, segments and expenses
  symptomGrid2: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 6, justifyContent: 'space-between' },
  symptomField: { width: '49%', marginBottom: spacing.sm },
  symptomLabelSmall: { fontSize: spacing.sm, color: colors.text, marginBottom: 6 },

  // Select input appearance
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  selectText: { fontSize: 14, color: colors.text },
  selectPlaceholder: { color: colors.text },

  // Modal styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', paddingHorizontal: 24 },
  modalContent: { backgroundColor: colors.card, borderRadius: 8, overflow: 'hidden' },
  modalOption: { padding: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  modalOptionText: { fontSize: spacing.md, color: colors.text },

  sectionTitleContainer: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },

  // Date/time icon row
  datetimeIcons: { flexDirection: 'row', alignItems: 'center' },
  sectionTitle: {
    fontSize: spacing.md,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  sectionDivider: {
    height: 3,
    backgroundColor: colors.primary,
    width: 40,
    borderRadius: 1.5,
    marginBottom: 6,
  },

  symptomLabel: { fontSize: 13, color: colors.text },
  segmentRow: { flexDirection: 'row', marginTop: 8 },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  segmentActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  segmentText: { color: colors.text, fontWeight: '600' },
  segmentTextActive: { color: colors.card },
  inputNumeric: {
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionCard: {
  backgroundColor: 'transparent', // ❌ no white
  borderRadius: spacing.sm,
  padding: 14,
  marginTop: 18,

  borderWidth: 1,
  borderColor: colors.border,

  // subtle separation
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 4,

  
},

}); 
