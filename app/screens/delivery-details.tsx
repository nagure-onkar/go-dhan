import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';


import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function DeliveryDetails() {
  const router = useRouter();

  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const [retainedPlacenta, setRetainedPlacenta] = useState<'Yes' | 'No' | ''>('');
  const [calfStatus, setCalfStatus] = useState<'Alive' | 'Dead' | ''>('');

  const [deliveryExpense, setDeliveryExpense] = useState('0');
  const [doctorFees, setDoctorFees] = useState('0');
  const [medicalExpense, setMedicalExpense] = useState('0');

  const [healthStatus, setHealthStatus] = useState<'Treatment' | 'Healthy' | ''>('');
  const [isLactating, setIsLactating] = useState<'Yes' | 'No' | ''>('');
  const [remarks, setRemarks] = useState('');

  const [calvingType, setCalvingType] = useState('');


  return (
    <ScrollView style={styles.page}>
      {/* HEADER */}
      <Text style={styles.title}>Record Delivery Details (7)</Text>
      <Text style={styles.subtitle}>
        Enter calving and postpartum details of the cattle
      </Text>

      <View style={styles.card}>
        {/* DELIVERY INFO */}
        <Text style={styles.section}>Delivery Information</Text>

        <Text style={styles.label}>Date & Time *</Text>
        <TouchableOpacity
          style={styles.dateBox}
          onPress={() => setShowPicker(true)}
        >
          <Text style={{ color: date ? '#111827' : '#9CA3AF' }}>
            {date ? date.toLocaleString() : 'dd-mm-yyyy  --:--'}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="datetime"
            display="default"
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}
        {/* Calving Type & Status of Calf */}
<View style={styles.row}>
  {/* Calving Type */}
  <View style={styles.half}>
    <Text style={styles.label}>
      Calving Type <Text style={styles.required}>*</Text>
    </Text>

    <View style={styles.selectBox}>
      <Picker
        selectedValue={calvingType}
        onValueChange={(value: string) => setCalvingType(value)}
      >
        <Picker.Item label="Select Calving Type" value="" />
        <Picker.Item label="Normal Birth" value="Normal Birth" />
        <Picker.Item label="Dystocia" value="Dystocia" />
        <Picker.Item label="High Dystocia" value="High Dystocia" />
        <Picker.Item label="Cesarean" value="Cesarean" />
        <Picker.Item label="Premature Birth" value="Premature Birth" />
        <Picker.Item label="Stillbirth" value="Stillbirth" />
      </Picker>
    </View>
  </View>

  
</View>


        {/* Retained Placenta */}
        <Text style={styles.label}>Retained Placenta *</Text>
        <View style={styles.radioRow}>
          {['Yes', 'No'].map((v) => (
            <TouchableOpacity
              key={v}
              style={[
                styles.radioBtn,
                retainedPlacenta === v && styles.radioActive,
              ]}
              onPress={() => setRetainedPlacenta(v as 'Yes' | 'No')}
            >
              <Text
                style={[
                  styles.radioText,
                  retainedPlacenta === v && styles.radioTextActive,
                ]}
              >
                {v}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Status of Calf *</Text>

<View style={styles.radioRow}>
  <TouchableOpacity
    style={[
      styles.radioBtn,
      calfStatus === 'Alive' && styles.radioActive,
    ]}
    onPress={() => {
      setCalfStatus('Alive');
      router.push('/delivery/calf-details');
    }}
  >
    <Text
      style={[
        styles.radioText,
        calfStatus === 'Alive' && styles.radioTextActive,
      ]}
    >
      Alive
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.radioBtn,
      calfStatus === 'Dead' && styles.radioActive,
    ]}
    onPress={() => setCalfStatus('Dead')}
  >
    <Text
      style={[
        styles.radioText,
        calfStatus === 'Dead' && styles.radioTextActive,
      ]}
    >
      Dead
    </Text>
  </TouchableOpacity>
</View>


        {/* TREATMENT EXPENSES */}
        <Text style={styles.section}>Treatment Expenses</Text>

        <Text style={styles.label}>Delivery Expenses *</Text>
        <TextInput
          style={styles.input}
          value={deliveryExpense}
          onChangeText={setDeliveryExpense}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Doctor Fees *</Text>
        <TextInput
          style={styles.input}
          value={doctorFees}
          onChangeText={setDoctorFees}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Medical Treatment Expenses *</Text>
        <TextInput
          style={styles.input}
          value={medicalExpense}
          onChangeText={setMedicalExpense}
          keyboardType="numeric"
        />

        {/* HEALTH & REMARKS */}
<Text style={styles.section}>Health & Remarks</Text>

<Text style={styles.label}>Health of Cattle *</Text>
<View style={styles.radioRow}>
  <TouchableOpacity
    style={[
      styles.radioBtn,
      healthStatus === 'Treatment' && styles.radioActive,
    ]}
    onPress={() => setHealthStatus('Treatment')}
  >
    <Text
      style={[
        styles.radioText,
        healthStatus === 'Treatment' && styles.radioTextActive,
      ]}
    >
      Treatment Required
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.radioBtn,
      healthStatus === 'Healthy' && styles.radioActive,
    ]}
    onPress={() => setHealthStatus('Healthy')}
  >
    <Text
      style={[
        styles.radioText,
        healthStatus === 'Healthy' && styles.radioTextActive,
      ]}
    >
      Healthy Cattle
    </Text>
  </TouchableOpacity>
</View>

<Text style={styles.label}>Is cattle lactating? *</Text>
<View style={styles.radioRow}>
  <TouchableOpacity
    style={[
      styles.radioBtn,
      isLactating === 'Yes' && styles.radioActive,
    ]}
    onPress={() => setIsLactating('Yes')}
  >
    <Text
      style={[
        styles.radioText,
        isLactating === 'Yes' && styles.radioTextActive,
      ]}
    >
      Yes
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.radioBtn,
      isLactating === 'No' && styles.radioActive,
    ]}
    onPress={() => setIsLactating('No')}
  >
    <Text
      style={[
        styles.radioText,
        isLactating === 'No' && styles.radioTextActive,
      ]}
    >
      No
    </Text>
  </TouchableOpacity>
</View>

<Text style={styles.label}>Remarks</Text>
<TextInput
  placeholder="Any additional observations or notes..."
  value={remarks}
  onChangeText={setRemarks}
  multiline
  numberOfLines={4}
  style={styles.textarea}
/>


        {/* BUTTONS */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelText}>Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveText}>Save Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F0FDF4',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#064E3B',
  },
  subtitle: {
    color: '#065F46',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  section: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '700',
    color: '#065F46',
    borderBottomWidth: 2,
    borderBottomColor: '#22C55E',
    paddingBottom: 6,
  },
  label: {
    marginTop: 14,
    marginBottom: 4,
    fontWeight: '600',
    color: '#111827',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'top',
  },
  dateBox: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 14,
    backgroundColor: '#FFFFFF',
  },

  radioRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  radioBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  radioActive: {
    backgroundColor: '#DCFCE7',
    borderColor: '#22C55E',
  },
  radioText: {
    fontWeight: '600',
    color: '#374151',
  },
  radioTextActive: {
    color: '#065F46',
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 14,
  },
  cancelText: {
    textAlign: 'center',
    fontWeight: '600',
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#16A34A',
    borderRadius: 12,
    padding: 14,
  },
  saveText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '700',
  },
  row: {
  flexDirection: 'row',
  gap: 16,
  marginTop: 16,
},

half: {
  flex: 1,
},

selectBox: {
  borderWidth: 1,
  borderColor: '#22C55E',
  borderRadius: 10,
  overflow: 'hidden',
  backgroundColor: '#FFFFFF',
},

radioOption: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
},

radioCircle: {
  width: 18,
  height: 18,
  borderRadius: 9,
  borderWidth: 2,
  borderColor: '#9CA3AF',
},

radioSelected: {
  borderColor: '#16A34A',
  backgroundColor: '#16A34A',
},

required: {
  color: 'red',
},

});
