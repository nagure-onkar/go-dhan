import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AppText from "@/components/common/AppText";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import { useLanguage } from "@/constants/localization/useLanguage";

const PregnancyDiagnosisScreen = () => {
  const { t } = useLanguage();

  const [confirmedStatus, setConfirmedStatus] = useState("");

  const [checkDate, setCheckDate] = useState<Date | null>(new Date());
  const [showCheckDate, setShowCheckDate] = useState(false);

  const [vetAssigned, setVetAssigned] = useState("");
  const [methodUsed, setMethodUsed] = useState("");
  const [gestationAge, setGestationAge] = useState("");

  const [calvingDate, setCalvingDate] = useState<Date | null>(null);
  const [showCalvingDate, setShowCalvingDate] = useState(false);

  const [dryOffDate, setDryOffDate] = useState<Date | null>(null);
  const [showDryOffDate, setShowDryOffDate] = useState(false);

  const [nextHeatDate, setNextHeatDate] = useState<Date | null>(null);
  const [showNextHeatDate, setShowNextHeatDate] = useState(false);

  return (
    <ScreenWrapper>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>

          <AppText style={styles.sectionTitle}>
            {t.pregnancyDiagnosis}
          </AppText>

          <View style={styles.row}>
            <DateBox
              label={t.pregnancyCheckDate}
              date={checkDate}
              show={showCheckDate}
              setShow={setShowCheckDate}
              setDate={setCheckDate}
            />

            <PickerBox
              label={t.vetAssigned}
              value={vetAssigned}
              setValue={setVetAssigned}
              data={["DR. A D Dhoop", "Dr. Pramod S Bhuttal", "DR. S B Chote"]}
            />
          </View>

          <View style={styles.row}>
            <PickerBox
              label={t.methodUsed}
              value={methodUsed}
              setValue={setMethodUsed}
              data={["Rectal", "Ultrasound", "Blood Test", "Milk Progesterone"]}
            />

            <PickerBox
              label={t.confirmedStatus}
              value={confirmedStatus}
              setValue={setConfirmedStatus}
              data={["Pregnant", "Not Pregnant"]}
            />
          </View>

          <AppText style={styles.label}>{t.gestationAge}</AppText>
          <TextInput
            style={styles.input}
            value={gestationAge}
            onChangeText={setGestationAge}
            keyboardType="numeric"
          />

          {confirmedStatus === "Pregnant" && (
            <>
              <AppText style={styles.sectionTitle}>
                {t.calvingDetails}
              </AppText>

              <View style={styles.row}>
                <DateBox
                  label={t.expectedCalvingDate}
                  date={calvingDate}
                  show={showCalvingDate}
                  setShow={setShowCalvingDate}
                  setDate={setCalvingDate}
                />

                <PickerBox label={t.twinsSuspected} data={["No", "Yes"]} />
              </View>

              <View style={styles.row}>
                <DateBox
                  label={t.dryOffDate}
                  date={dryOffDate}
                  show={showDryOffDate}
                  setShow={setShowDryOffDate}
                  setDate={setDryOffDate}
                />

                
              </View>

              <Remarks />
            </>
          )}

          {confirmedStatus === "Not Pregnant" && (
            <>
              <AppText style={styles.sectionTitle}>
                {t.pregnancyFailure}
              </AppText>

              <View style={styles.row}>
                <PickerBox
                  label={t.reasonSuspected}
                  data={[
                    "Repeat Breeder",
                    "Failed AI",
                    "Infection",
                    "Low BCS",
                    "Unknown",
                  ]}
                />

                <PickerBox
                  label={t.actionPlan}
                  data={["Re-AI next heat", "Treatment required"]}
                />
              </View>

              <View style={styles.row}>
                <DateBox
                  label={t.nextHeatDate}
                  date={nextHeatDate}
                  show={showNextHeatDate}
                  setShow={setShowNextHeatDate}
                  setDate={setNextHeatDate}
                />

                <PickerBox label={t.isLactating} data={["Yes", "No"]} />
              </View>

              <Remarks />
            </>
          )}

          <AppText style={styles.sectionTitle}>{t.expenses}</AppText>

          <View style={styles.row}>
            <Input label={t.doctorFees} />
            <Input label={t.treatmentExpenses} />
          </View>

          <Input label={t.otherExpenses} full />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn}>
              <AppText style={styles.cancelText}>{t.cancel}</AppText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton}>
              <Ionicons name="save-outline" size={18} color="#fff" />
              <AppText style={styles.saveText}>
                {t.savePregnancyDiagnosis}
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default PregnancyDiagnosisScreen;

/* 🔹 COMPONENTS INSIDE SAME FILE */

const DateBox = ({ label, date, show, setShow, setDate }: any) => (
  <View style={styles.half}>
    <AppText style={styles.label}>{label}</AppText>
    <TouchableOpacity style={styles.dateBox} onPress={() => setShow(true)}>
      <Ionicons name="calendar-outline" size={18} color="#065F46" />
      <AppText>
        {date ? date.toLocaleDateString("en-GB") : "dd-mm-yyyy"}
      </AppText>
    </TouchableOpacity>

    {show && (
      <DateTimePicker
        value={date || new Date()}
        mode="date"
        onChange={(_, d) => {
          setShow(false);
          if (d) setDate(d);
        }}
      />
    )}
  </View>
);

const PickerBox = ({ label, data, value, setValue }: any) => (
  <View style={styles.half}>
    <AppText style={styles.label}>{label}</AppText>
    <View style={styles.picker}>
      <Picker selectedValue={value} onValueChange={setValue}>
        <Picker.Item label="Select" value="" />
        {data.map((item: string) => (
          <Picker.Item key={item} label={item} value={item} />
        ))}
      </Picker>
    </View>
  </View>
);

const Input = ({ label, full }: any) => (
  <View style={[full && { marginTop: 14 }]}>
    <AppText style={styles.label}>{label}</AppText>
    <TextInput style={styles.input} />
  </View>
);

const Remarks = () => (
  <>
    <AppText style={styles.label}>Remarks</AppText>
    <TextInput style={[styles.input, { height: 100 }]} multiline />
  </>
);

/* 🎨 STYLES */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2FBF6", padding: 16 },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#064E3B",
    borderBottomWidth: 2,
    borderBottomColor: "#0A8F47",
    paddingBottom: 8,
    marginTop: 22,
  },

  row: { flexDirection: "row", gap: 14, marginTop: 16 },

  half: { flex: 1 },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    color: "#374151",
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#A7F3D0",
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: "#F9FEFB",
    justifyContent: "center",
  },

  picker: {
    height: 48,
    borderWidth: 1,
    borderColor: "#A7F3D0",
    borderRadius: 12,
    backgroundColor: "#F9FEFB",
    justifyContent: "center",
  },

  dateBox: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#34D399",
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: "#F9FEFB",
  },

  buttonRow: { flexDirection: "row", marginTop: 30 },

  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    height: 50,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: { fontSize: 14, fontWeight: "600", color: "#374151" },

  saveButton: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#0A8F47",
    height: 50,
    borderRadius: 14,
    marginLeft: 12,
    elevation: 5,
  },

  saveText: { color: "#fff", fontSize: 15, fontWeight: "700" },
});