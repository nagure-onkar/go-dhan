
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// @ts-ignore
import DateTimePicker from '@react-native-community/datetimepicker';


// Colors matching web project (Tailwind-like)
const COLORS = {
  primary: '#16a34a', // green-600
  primaryLight: '#dcfce7', // green-100
  danger: '#ef4444', // red-500
  white: '#ffffff',
  gray800: '#1f2937',
  gray600: '#4b5563',
  gray500: '#6b7280',
  cardBg: '#ffffff',
  surface: '#f0fdf4', // green-50
};

// Preset values used as initial defaults — displayed faintly until edited
const PRESET_VALUES = {
  animalId: 'C-001',
  doctorId: 'V4',
  doctorName: 'Dr.Shreya Desai',
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

  const methodOptions = ['Select', 'Clinical Examination', 'Ultrasound', 'Owner Report'];
  const finalResultOptions = ['Select', 'AI Recommended', 'No Action', 'Monitor'];

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

  const getStoredToken = async () => {
    return null;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const token = await getStoredToken();
      const payload = {
        animal_id: animalId.trim(),
        symptoms: symptomsMap,
        date_reported: dateReportedDate ? dateReportedDate.toISOString() : null,
        is_lactating: isLactating,
        vet_confirmation: {
          doctor_id: doctorId.trim() || null,
          doctor_name: doctorName.trim() || null,
          method: methodConfirmation.trim() || null,
          final_result: finalResult.trim() || null,
        },
        recommended_ai: recommendedDateTime ? recommendedDateTime.toISOString() : null,
        diagnosis_summary: diagnosisSummary.trim() || null,
        expenses: {
          doctor_fees: parseFloat(doctorFees) || 0,
          treatment_expenses: parseFloat(treatmentExpenses) || 0,
          other_expenses: parseFloat(otherExpenses) || 0,
        },
        recommend_insemination: recommendInsemination,
        status: 'on_heat',
      }; 

      
      await new Promise((res) => setTimeout(res, 900));
      console.log('Payload (dummy):', payload, 'token:', token);
      Alert.alert('Success', 'Dummy heat record saved (no real network request).');
      navigation?.goBack?.();
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.iconWrap}>
              <MaterialCommunityIcons name="fire" size={24} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.title}>Heat Life Cycle</Text>
              <Text style={styles.subtitle}>State: On Heat</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Animal ID</Text>
          <TextInput
            style={[styles.input, animalId === PRESET_VALUES.animalId && styles.inputPrefilled]}
            placeholder="e.g. C-001"
            value={animalId}
            onChangeText={setAnimalId}
            onFocus={() => animalId === PRESET_VALUES.animalId && setAnimalId('')}
            onBlur={() => animalId.trim() === '' && setAnimalId(PRESET_VALUES.animalId)}
            returnKeyType="next"
          />

          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Current Heat Symptoms</Text>
            <View style={styles.sectionDivider} />
          </View>
          <View style={styles.symptomGrid2}>
  {symptomOptions.map((s) => (
    <View key={s} style={styles.symptomField}>
      <Text style={styles.symptomLabelSmall}>{s} *</Text>
      <TouchableOpacity
        style={styles.selectInput}
        onPress={() => openSelect(`symptom:${s}`, ['Select', 'Yes', 'No'])} // <- fixed here
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
          size={16}
          color={COLORS.gray600}
        />
      </TouchableOpacity>
    </View>
  ))}
</View>


          <Text style={styles.label}>Date of Symptoms Reported *</Text>
          <TouchableOpacity style={styles.selectInput} onPress={() => setShowDateReportedPicker(true)}>
            <Text style={[styles.selectText, !dateReportedDate && styles.selectPlaceholder]}>{dateReportedDate ? formatDate(dateReportedDate) : 'dd-mm-yyyy'}</Text>
            <MaterialCommunityIcons name="calendar" size={16} color={COLORS.gray600} />
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

          <Text style={styles.label}>Is Cattle Lactating *</Text>
          <TouchableOpacity style={styles.selectInput} onPress={() => openSelect('isLactating', ['Select', 'Yes', 'No'])}>
            <Text style={[styles.selectText, !isLactating && styles.selectPlaceholder]}>{isLactating ? (isLactating === 'yes' ? 'Yes' : 'No') : 'Select Answer'}</Text>
            <MaterialCommunityIcons name="chevron-down" size={16} color={COLORS.gray600} />
          </TouchableOpacity>

          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Vet Confirmation</Text>
            <View style={styles.sectionDivider} />
          </View>
          <Text style={styles.small}>Doctor ID</Text>
          <TextInput
            style={[styles.input, doctorId === PRESET_VALUES.doctorId && styles.inputPrefilled]}
            value={doctorId}
            onChangeText={setDoctorId}
            onFocus={() => doctorId === PRESET_VALUES.doctorId && setDoctorId('')}
            onBlur={() => doctorId.trim() === '' && setDoctorId(PRESET_VALUES.doctorId)}
          />
          <Text style={styles.small}>Doctor Name</Text>
          <TextInput
            style={[styles.input, doctorName === PRESET_VALUES.doctorName && styles.inputPrefilled]}
            value={doctorName}
            onChangeText={setDoctorName}
            onFocus={() => doctorName === PRESET_VALUES.doctorName && setDoctorName('')}
            onBlur={() => doctorName.trim() === '' && setDoctorName(PRESET_VALUES.doctorName)}
          />

          <Text style={styles.label}>Method of Confirmation *</Text>
          <TouchableOpacity style={styles.selectInput} onPress={() => openSelect('methodConfirmation', methodOptions)}>
            <Text style={[styles.selectText, !methodConfirmation && styles.selectPlaceholder]}>{methodConfirmation || 'Select'}</Text>
            <MaterialCommunityIcons name="chevron-down" size={16} color={COLORS.gray600} />
          </TouchableOpacity>

          <Text style={styles.label}>Final Result *</Text>
          <TouchableOpacity style={styles.selectInput} onPress={() => openSelect('finalResult', finalResultOptions)}>
            <Text style={[styles.selectText, !finalResult && styles.selectPlaceholder]}>{finalResult || 'Select'}</Text>
            <MaterialCommunityIcons name="chevron-down" size={16} color={COLORS.gray600} />
          </TouchableOpacity>

          <Text style={styles.label}>Recommended Date & Time for AI</Text>
          <TouchableOpacity style={styles.selectInput} onPress={() => { setRecommendedPickerMode('date'); setShowRecommendedPicker(true); }}>
            <Text style={[styles.selectText, !recommendedDateTime && styles.selectPlaceholder]}>{recommendedDateTime ? formatDateTime(recommendedDateTime) : 'dd-mm-yyyy --:--'}</Text>
            <View style={styles.datetimeIcons}>
              <MaterialCommunityIcons name="calendar" size={16} color={COLORS.gray600} />
              <MaterialCommunityIcons name="clock" size={16} color={COLORS.gray600} style={{ marginLeft: 8 }} />
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

          <Text style={styles.label}>Diagnosis Summary</Text>
          <TextInput style={[styles.input, styles.multiline]} placeholder="Diagnosis summary..." value={diagnosisSummary} onChangeText={setDiagnosisSummary} multiline numberOfLines={3} />



          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Expenses</Text>
            <View style={styles.sectionDivider} />
          </View>
          <Text style={styles.small}>Doctor Fees *</Text>
          <TextInput style={styles.inputNumeric} value={doctorFees} onChangeText={setDoctorFees} keyboardType="numeric" />
          <Text style={styles.small}>Treatment Expenses *</Text>
          <TextInput style={styles.inputNumeric} value={treatmentExpenses} onChangeText={setTreatmentExpenses} keyboardType="numeric" />
          <Text style={styles.small}>Other Expenses *</Text>
          <TextInput style={styles.inputNumeric} value={otherExpenses} onChangeText={setOtherExpenses} keyboardType="numeric" />

          <Modal visible={selectModalVisible} transparent animationType="fade" onRequestClose={() => setSelectModalVisible(false)}>
            <Pressable style={styles.modalOverlay} onPress={() => setSelectModalVisible(false)}>
              <View style={styles.modalContent}>
                {selectModalOptions.map((opt) => (
                  <TouchableOpacity key={opt} style={styles.modalOption} onPress={() => onSelectOption(opt)}>
                    <Text style={styles.modalOptionText}>{opt}</Text>
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
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={onSubmit}
              disabled={submitting}
            >
              {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Submit Heat Form</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.surface },
  container: { padding: 16, paddingBottom: 32 },
  header: { marginBottom: 12 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: { fontSize: 20, color: COLORS.gray800, fontWeight: '700' },
  subtitle: { fontSize: 13, color: COLORS.gray600 },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  label: { fontSize: 13, color: COLORS.gray600, marginTop: 10, marginBottom: 6, fontWeight: '600' },
  small: { fontSize: 12, color: COLORS.gray500 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.gray800,
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  inputPrefilled: { color: COLORS.gray500, fontStyle: 'italic' },
  multiline: { minHeight: 72, textAlignVertical: 'top' as const },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  submitButton: { backgroundColor: COLORS.primary },
  submitText: { color: '#fff', fontWeight: '700' },
  cancelButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb' },
  cancelText: { color: COLORS.gray600, fontWeight: '700' },

  // New styles for symptoms, segments and expenses
  symptomGrid2: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 6, justifyContent: 'space-between' },
  symptomField: { width: '49%', marginBottom: 12 },
  symptomLabelSmall: { fontSize: 12, color: COLORS.gray600, marginBottom: 6 },

  // Select input appearance
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e6edf3',
    backgroundColor: '#fff',
  },
  selectText: { fontSize: 14, color: COLORS.gray800 },
  selectPlaceholder: { color: COLORS.gray500 },

  // Modal styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', paddingHorizontal: 24 },
  modalContent: { backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden' },
  modalOption: { padding: 14, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  modalOptionText: { fontSize: 16, color: COLORS.gray800 },

  sectionTitleContainer: {
    marginTop: 20,
    marginBottom: 12,
  },

  // Date/time icon row
  datetimeIcons: { flexDirection: 'row', alignItems: 'center' },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gray800,
    marginBottom: 8,
  },
  sectionDivider: {
    height: 3,
    backgroundColor: COLORS.primary,
    width: 40,
    borderRadius: 1.5,
    marginBottom: 6,
  },

  symptomLabel: { fontSize: 13, color: COLORS.gray800 },
  segmentRow: { flexDirection: 'row', marginTop: 8 },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e6edf3',
    backgroundColor: '#fff',
  },
  segmentActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  segmentText: { color: COLORS.gray600, fontWeight: '600' },
  segmentTextActive: { color: '#fff' },
  inputNumeric: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.gray800,
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
})