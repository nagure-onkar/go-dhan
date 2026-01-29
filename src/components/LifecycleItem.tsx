// import { useTheme } from "@/theme/useTheme";
// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// export type LifecycleStage = {
//   id: string;
//   title: string;
//   description: string;
//   status?: "completed" | "current" | "upcoming";
// };

// type Props = {
//   item: LifecycleStage;
//   isLast: boolean;
// };

// export const LifecycleItem: React.FC<Props> = ({ item, isLast }) => {
//   const { colors } = useTheme();

//   const isCurrent = item.status === "current";
//   const isCompleted = item.status === "completed";

//   return (
//     <View style={styles.container}>
//       {/* LEFT TIMELINE */}
//       <View style={styles.timeline}>
//         <View
//           style={[
//             styles.dot,
//             {
//               backgroundColor: isCompleted
//                 ? colors.primary
//                 : isCurrent
//                   ? colors.card
//                   : colors.card,
//               borderColor: colors.primary,
//               borderWidth: isCurrent || !isCompleted ? 2 : 0,
//             },
//           ]}
//         >
//           {isCompleted && (
//             <Text style={[styles.checkmark, { color: colors.textInverse }]}>
//               ✓
//             </Text>
//           )}
//         </View>
//         {!isLast && (
//           <View
//             style={[
//               styles.line,
//               { backgroundColor: isCompleted ? colors.primary : colors.border },
//             ]}
//           />
//         )}
//       </View>

//       {/* RIGHT CONTENT */}
//       <View
//         style={[
//           styles.content,
//           {
//             backgroundColor: colors.card,
//             borderColor: isCurrent ? colors.primary : colors.border,
//           },
//         ]}
//       >
//         <Text
//           style={[
//             styles.title,
//             {
//               color: colors.text,
//             },
//           ]}
//         >
//           {item.title}
//         </Text>

//         <Text
//           style={[
//             styles.description,
//             {
//               color: colors.text,
//               opacity: 0.75,
//             },
//           ]}
//         >
//           {item.description}
//         </Text>

//         {isCurrent && (
//           <View
//             style={[styles.currentBadge, { backgroundColor: colors.primary }]}
//           >
//             <Text style={[styles.currentText, { color: colors.textInverse }]}>
//               CURRENT
//             </Text>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };

import { useTheme } from "@/theme/useTheme";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type LifecycleStage = {
  id: string;
  title: string;
  description: string;
  status?: "completed" | "current" | "upcoming";
};

type Props = {
  item: LifecycleStage;
  isLast: boolean;
  onPress: () => void;
};

export const LifecycleItem: React.FC<Props> = ({ item, isLast, onPress }) => {
  const { colors } = useTheme();

  const isCurrent = item.status === "current";
  const isCompleted = item.status === "completed";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.85 }]}
    >
      {/* LEFT TIMELINE */}
      <View style={styles.timeline}>
        <View
          style={[
            styles.dot,
            {
              backgroundColor: isCompleted ? colors.primary : colors.card,
              borderColor: colors.primary,
              borderWidth: isCurrent || !isCompleted ? 2 : 0,
            },
          ]}
        >
          {isCompleted && (
            <Text style={[styles.checkmark, { color: colors.textInverse }]}>
              ✓
            </Text>
          )}
        </View>

        {!isLast && (
          <View
            style={[
              styles.line,
              {
                backgroundColor: isCompleted ? colors.primary : colors.border,
              },
            ]}
          />
        )}
      </View>

      {/* RIGHT CONTENT */}
      <View
        style={[
          styles.content,
          {
            backgroundColor: colors.card,
            borderColor: isCurrent ? colors.primary : colors.border,
          },
        ]}
      >
        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>

        <Text
          style={[styles.description, { color: colors.text, opacity: 0.75 }]}
        >
          {item.description}
        </Text>

        {isCurrent && (
          <View
            style={[styles.currentBadge, { backgroundColor: colors.primary }]}
          >
            <Text style={[styles.currentText, { color: colors.textInverse }]}>
              CURRENT
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 14,
  },
  timeline: {
    width: 44,
    alignItems: "center",
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  line: {
    width: 2,
    flex: 1,
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  currentBadge: {
    alignSelf: "flex-start",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  currentText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  checkmark: {
    fontSize: 12,
    fontWeight: "800",
  },
});
