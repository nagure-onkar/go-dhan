// import { useTheme } from "@/theme/useTheme";
// import React from "react";
// import {
//     LayoutAnimation,
//     Platform,
//     Pressable,
//     StyleSheet,
//     Text,
//     UIManager,
//     View,
// } from "react-native";

// /* Enable LayoutAnimation on Android */
// if (
//   Platform.OS === "android" &&
//   UIManager.setLayoutAnimationEnabledExperimental
// ) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// /* ---------------- TYPES ---------------- */

// export type InlineActionItem = {
//   key: string;
//   title: string;
//   icon: React.ReactNode;
//   onPress: () => void;
// };

// type InlineActionMenuProps = {
//   isOpen: boolean;
//   actions: InlineActionItem[];
// };

// /* ---------------- COMPONENT ---------------- */

// export const InlineActionMenu = ({
//   isOpen,
//   actions,
// }: InlineActionMenuProps) => {
//   const { colors } = useTheme();

//   if (!isOpen) return null;

//   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

//   return (
//     <View style={styles.container}>
//       {actions.map((action) => (
//         <Pressable
//           key={action.key}
//           style={[styles.action, { backgroundColor: colors.primary + "12" }]}
//           onPress={action.onPress}
//         >
//           {action.icon}
//           <Text style={[styles.label, { color: colors.text }]}>
//             {action.title}
//           </Text>
//         </Pressable>
//       ))}
//     </View>
//   );
// };

// /* ---------------- STYLES ---------------- */

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },
//   action: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },
//   label: {
//     fontSize: 12,
//     fontWeight: "600",
//   },
// });

import { useTheme } from "@/theme/useTheme";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";

export type InlineActionItem = {
  key: string;
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
};

type Props = {
  visible: boolean;
  actions: InlineActionItem[];
};

export const InlineActionOverlay = ({ visible, actions }: Props) => {
  const { colors } = useTheme();
  const translateX = useRef(new Animated.Value(120)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: visible ? 0 : 120,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible]);

  return (
    <Animated.View
      pointerEvents={visible ? "auto" : "none"}
      style={[
        styles.container,
        {
          opacity,
          transform: [{ translateX }],
        },
      ]}
    >
      {actions.map((action) => (
        <Pressable
          key={action.key}
          style={[styles.action, { backgroundColor: colors.primary + "15" }]}
          onPress={action.onPress}
        >
          {action.icon}
          <Text style={[styles.label, { color: colors.text }]}>
            {action.title}
          </Text>
        </Pressable>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 48, // sits before edit button
    flexDirection: "row",
    gap: 10,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
});
