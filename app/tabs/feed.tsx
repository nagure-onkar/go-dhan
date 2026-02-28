// import FeedStock from "app/drawer/Report/FeedStock";

// export default function FeedScreen() {
//   return <AddFeed />;
// }

import { useTheme } from "@/theme/useTheme";
import FeedStock from "app/screens/FeedManagement/FeedStock";
import { useState } from "react";
import { StyleSheet } from "react-native";

type TabType = "details" | "add";

export default function FeedScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>("details");

  return <FeedStock />;
  // return (
  //   <View style={[styles.container, { backgroundColor: colors.background }]}>
  //     {/* Segmented Buttons */}
  //     <View style={styles.segmentWrapper}>
  //       <View
  //         style={[styles.segmentContainer, { backgroundColor: colors.card }]}
  //       >
  //         {/* Feed Details Button */}
  //         <TouchableOpacity
  //           style={[
  //             styles.segmentButton,
  //             activeTab === "details" && {
  //               backgroundColor: colors.primary,
  //             },
  //           ]}
  //           onPress={() => setActiveTab("details")}
  //         >
  //           <List
  //             size={18}
  //             weight={activeTab === "details" ? "fill" : "regular"}
  //             color={activeTab === "details" ? colors.textInverse : colors.text}
  //           />
  //           <AppText
  //             style={[
  //               styles.segmentText,
  //               {
  //                 color:
  //                   activeTab === "details" ? colors.textInverse : colors.text,
  //               },
  //             ]}
  //           >
  //             Feed Details
  //           </AppText>
  //         </TouchableOpacity>

  //         {/* Add Feed Button */}
  //         <TouchableOpacity
  //           style={[
  //             styles.segmentButton,
  //             activeTab === "add" && {
  //               backgroundColor: colors.primary,
  //             },
  //           ]}
  //           onPress={() => setActiveTab("add")}
  //         >
  //           <Plus
  //             size={18}
  //             weight={activeTab === "add" ? "fill" : "regular"}
  //             color={activeTab === "add" ? colors.textInverse : colors.text}
  //           />
  //           <AppText
  //             style={[
  //               styles.segmentText,
  //               {
  //                 color: activeTab === "add" ? colors.textInverse : colors.text,
  //               },
  //             ]}
  //           >
  //             Add Feed
  //           </AppText>
  //         </TouchableOpacity>
  //       </View>
  //     </View>

  //     {/* Content */}
  //     <View style={styles.content}>
  //       {activeTab === "details" ? <FeedDetails /> : <FeedStock />}
  //     </View>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  segmentWrapper: {
    marginHorizontal: 16,
    marginTop: 16,
  },

  segmentContainer: {
    flexDirection: "row",
    borderRadius: 30,
    padding: 4,
  },

  segmentButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 24,
  },

  segmentText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "500",
  },

  content: {
    flex: 1,
    marginTop: 12,
  },
});
