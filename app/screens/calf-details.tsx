import DateTimePicker from '@react-native-community/datetimepicker';
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

export default function CalfDetails() {
  const router = useRouter();

  const [dob, setDob] = useState<Date | null>(null);
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [convert, setConvert] = useState<'Yes' | 'No'>('No');
  const [remarks, setRemarks] = useState('');

  return (
    <ScrollView style={styles.page}>
      {/* HEADER */}
      <Text style={styles.title}>Record Calf Details</Text>
      <Text style={styles.subtitle}>
        Enter birth and health details of the calf
      </Text>

      <View style={styles.card}>
        {/* ================= BIRTH DETAILS ================= */}
        <Text style={styles.section}>Birth Details</Text>

        <Text style={styles.label}>Dam (Mother Cattle) *</Text>
        <View style={styles.searchRow}>
          <TextInput
            placeholder="Search by cattle ID..."
            style={[styles.input, { flex: 1 }]}
          />
          <TouchableOpacity style={styles.searchBtn}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Date of Birth *</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDobPicker(true)}
        >
          <Text style={{ color: dob ? '#111827' : '#9CA3AF' }}>
            {dob ? dob.toDateString() : 'dd-mm-yyyy'}
          </Text>
        </TouchableOpacity>

        {showDobPicker && (
          <DateTimePicker
            value={dob || new Date()}
            mode="date"
            display="default"
            onChange={(e, date) => {
              setShowDobPicker(false);
              if (date) setDob(date);
            }}
          />
        )}

        <Text style={styles.label}>Age</Text>
        <TextInput
          value="Auto-calculated"
          editable={false}
          style={styles.inputDisabled}
        />

        <Text style={styles.label}>Calving Type *</Text>
        <TextInput placeholder="Select Calving Type" style={styles.input} />

        <Text style={styles.label}>Weight (Kg) *</Text>
        <TextInput placeholder="25" keyboardType="numeric" style={styles.input} />

        {/* ================= HEALTH & MANAGEMENT ================= */}
        <Text style={styles.section}>Health & Management</Text>

        <Text style={styles.label}>Status *</Text>
        <TextInput placeholder="Active" style={styles.input} />

        <Text style={styles.label}>Worker Assigned</Text>
        <TextInput placeholder="Select Worker" style={styles.input} />

        <Text style={styles.label}>Veterinarian Assigned</Text>
        <TextInput placeholder="Select Veterinarian" style={styles.input} />

        <Text style={styles.label}>State *</Text>
        <TextInput placeholder="Select State" style={styles.input} />

        <Text style={styles.label}>Current State Date *</Text>
        <TextInput placeholder="dd-mm-yyyy" style={styles.input} />

        <Text style={styles.label}>Insurance Number</Text>
        <TextInput
          placeholder="INS-CALF-2024-001"
          style={styles.input}
        />

        {/* ================= ADDITIONAL INFO ================= */}
        <Text style={styles.section}>Additional Information</Text>

        <Text style={styles.label}>Convert to Full Grown Cattle</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[
              styles.toggleBtn,
              convert === 'Yes' && styles.toggleActive,
            ]}
            onPress={() => setConvert('Yes')}
          >
            <Text style={styles.toggleText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleBtn,
              convert === 'No' && styles.toggleActive,
            ]}
            onPress={() => setConvert('No')}
          >
            <Text style={styles.toggleText}>No</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Remarks</Text>
        <TextInput
          multiline
          numberOfLines={4}
          placeholder="Any additional notes or observations about the calf..."
          value={remarks}
          onChangeText={setRemarks}
          style={styles.textarea}
        />

        {/* ================= BUTTONS ================= */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveText}>Save Calf</Text>
          </TouchableOpacity>

          <TouchableOpacity
  style={styles.doneBtn}
  onPress={() => router.replace('/delivery/delivery-details')}
>
  <Text style={styles.doneText}>Done</Text>
</TouchableOpacity>


        </View>
      </View>
    </ScrollView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F0FDF4', padding: 16 },
  title: { fontSize: 26, fontWeight: '700', color: '#064E3B' },
  subtitle: { color: '#065F46', marginBottom: 16 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16 },

  section: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '700',
    color: '#065F46',
    borderBottomWidth: 2,
    borderBottomColor: '#22C55E',
    paddingBottom: 6,
  },

  label: { marginTop: 12, marginBottom: 4, fontWeight: '600' },

  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
  },

  inputDisabled: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#F3F4F6',
    color: '#6B7280',
  },

  textarea: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
  },

  searchRow: { flexDirection: 'row', gap: 10 },
  searchBtn: {
    backgroundColor: '#16A34A',
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  searchText: { color: '#FFF', fontWeight: '700' },

  toggleRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
  toggleBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  toggleActive: { backgroundColor: '#DCFCE7' },
  toggleText: { fontWeight: '600' },

  buttonRow: { marginTop: 24, gap: 12 },
  saveBtn: {
    backgroundColor: '#16A34A',
    padding: 14,
    borderRadius: 12,
  },
  saveText: { color: '#FFF', fontWeight: '700', textAlign: 'center' },

  doneBtn: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    padding: 14,
    borderRadius: 12,
  },
  doneText: { textAlign: 'center', fontWeight: '600' },
});
