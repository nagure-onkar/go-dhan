import AppText from "@/components/common/AppText";
import { useLanguage } from "@/constants/localization/useLanguage";
import { useTheme } from "@/theme/useTheme";
import {
  AdministrationScreen,
  LiveStockScreen,
} from "app/navigation/AppNavigator";
import { useRouter } from "expo-router";
import { Gear, Globe, Shield } from "phosphor-react-native";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const STATUS_BAR_HEIGHT =
  Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) : 0;

const router = useRouter();

export default function DrawerContent() {
  const { colors } = useTheme();
  const { t, setLanguage, language } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.drawerBackground,
          paddingTop: STATUS_BAR_HEIGHT + 8,
        },
      ]}
    >
      <AppText style={styles.title}>{t.menu}</AppText>

      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          router.push(AdministrationScreen);
        }}
      >
        <Shield size={28} color={colors.text} />
        <AppText>Administration</AppText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          router.push(LiveStockScreen);
        }}
      >
        <AppText style={{ fontSize: 24 }}>🐄</AppText>
        <AppText>{t.live_stock}</AppText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Gear size={28} color={colors.text} />
        <AppText>{t.settings}</AppText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => setOpen(true)}>
        <Globe size={28} color={colors.text} />
        <AppText>{t.changeLanguage}</AppText>
      </TouchableOpacity>

      {/* DROPDOWN MODAL */}
      <Modal transparent visible={open} animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={[styles.dropdown, { backgroundColor: colors.card }]}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setLanguage("en");
                setOpen(false);
              }}
            >
              <AppText>English</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setLanguage("mr");
                setOpen(false);
              }}
            >
              <AppText>मराठी</AppText>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 12,
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  dropdown: {
    width: 200,
    borderRadius: 12,
    padding: 10,
    elevation: 5,
  },
  option: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
});
