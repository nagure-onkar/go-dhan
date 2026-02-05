import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CallDoctor() {
  const router = useRouter();

  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [visitConfirmed, setVisitConfirmed] = useState<'Yes' | 'No' | ''>('');
  const [reason, setReason] = useState('');
  const [remarks, setRemarks] = useState('');

  const formatDateTime = (d: Date) => {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year}  ${hours}:${minutes}`;
  };

  return (
    <ScrollView style={styles.page}>
      {/* Header */}
     <View style={styles.header}>
  {/* Left Icon */}
     <View style={styles.iconCircle}>
    <Ionicons name="medkit-outline" size={26} color="#16A34A" />
  </View>

  {/* Title */}
  <View style={{ flex: 1 }}>
    <Text style={styles.title}>Call Doctor</Text>
    <Text style={styles.subtitle}>
      Schedule a veterinary visit for your cattle
    </Text>
  </View>

  {/* User Badge */}
  <View style={styles.userBadge}>
    <Ionicons name="person-outline" size={16} color="#065F46" />
    <Text style={styles.userText}>adeep_desai_05</Text>
  </View>
</View>


      <View style={styles.card}>
        {/* Cattle ID */}
        <Text style={styles.label}>Cattle ID</Text>
        <TextInput value="7" editable={false} style={styles.inputDisabled} />

        {/* Date & Time */}
        <Text style={styles.label}>Date & Time *</Text>
        <TouchableOpacity
          style={styles.dateBox}
          onPress={() => setShowPicker(true)}
        >
          <Text style={{ color: date ? '#111827' : '#9CA3AF' }}>
            {date ? formatDateTime(date) : 'dd-mm-yyyy  --:--'}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="datetime"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        {/* Visit Details */}
        <Text style={styles.section}>Visit Details</Text>

        {/* Yes / No Toggle */}
        <Text style={styles.label}>Doctor Visit Confirmed *</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleOption,
              visitConfirmed === 'Yes' && styles.toggleActiveYes,
            ]}
            onPress={() => setVisitConfirmed('Yes')}
          >
            <Text
              style={[
                styles.toggleText,
                visitConfirmed === 'Yes' && styles.toggleTextActive,
              ]}
            >
              Yes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleOption,
              visitConfirmed === 'No' && styles.toggleActiveNo,
            ]}
            onPress={() => setVisitConfirmed('No')}
          >
            <Text
              style={[
                styles.toggleText,
                visitConfirmed === 'No' && styles.toggleTextActive,
              ]}
            >
              No
            </Text>
          </TouchableOpacity>
        </View>

        {/* Reason Dropdown */}
        <Text style={styles.label}>Reason to Call Doctor *</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={reason}
            onValueChange={(value) => setReason(value)}
          >
            <Picker.Item label="Select Reason" value="" />
            <Picker.Item label="Heat Confirmation" value="Heat Confirmation" />
            <Picker.Item label="Treatment" value="Treatment" />
            <Picker.Item label="Insemination" value="Insemination" />
            <Picker.Item label="Delivery Details" value="Delivery Details" />
            <Picker.Item
              label="Treatment Follow-Up"
              value="Treatment Follow-Up"
            />
          </Picker>
        </View>

        {/* Additional Info */}
        <Text style={styles.section}>Additional Information</Text>
        <Text style={styles.label}>Remarks</Text>
        <TextInput
          placeholder="Any additional notes or observations..."
          value={remarks}
          onChangeText={setRemarks}
          multiline
          numberOfLines={4}
          style={styles.textarea}
        />

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelText}>
              Cancel and Go back to Cattle Dashboard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
  style={styles.saveBtn}
  onPress={() => router.push('/(tabs)/delivery/delivery-details' as any)}
>
  <Text style={styles.saveText}>Schedule Visit</Text>
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
    fontSize: 26,
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
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: '600',
    color: '#111827',
  },
  inputDisabled: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#F3F4F6',
    color: '#6B7280',
  },
  dateBox: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 14,
    backgroundColor: '#FFFFFF',
  },
  section: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '700',
    color: '#065F46',
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: '#FFFFFF',
  },

  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  toggleActiveYes: {
    backgroundColor: '#DCFCE7',
  },
  toggleActiveNo: {
    backgroundColor: '#FEE2E2',
  },
  toggleText: {
    fontWeight: '600',
    color: '#374151',
  },
  toggleTextActive: {
    color: '#065F46',
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },

  buttonRow: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
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
    color: '#374151',
    fontWeight: '600',
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#16A34A',
    borderRadius: 12,
    padding: 14,
  },
  saveText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },
  header: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#ECFDF5',
  padding: 14,
  borderRadius: 16,
  marginBottom: 16,
},

iconCircle: {
  width: 44,
  height: 44,
  borderRadius: 22,
  backgroundColor: '#DCFCE7',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 12,
},

userBadge: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#DCFCE7',
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 999,
  gap: 6,
},

userText: {
  color: '#065F46',
  fontWeight: '600',
  fontSize: 13,
},

});
