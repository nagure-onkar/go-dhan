import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import {
    Animated,
    Dimensions,
    Modal,
    PanResponder,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";

const { height } = Dimensions.get("window");

export interface BottomDrawerRef {
  open: () => void;
  close: () => void;
}

const BottomDrawer = forwardRef<BottomDrawerRef>((props, ref) => {
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;

  // Swipe-down support
  const pan = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          pan.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          // close if swiped down enough
          closeDrawer();
        } else {
          // reset
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const openDrawer = () => {
    setVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0, // fully visible
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      pan.setValue(0); // reset swipe
    });
  };

  useImperativeHandle(ref, () => ({
    open: openDrawer,
    close: closeDrawer,
  }));

  if (!visible) return null;

  return (
    <Modal transparent animationType="none" visible={visible}>
      {/* Overlay */}
      <TouchableWithoutFeedback onPress={closeDrawer}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Drawer */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.drawer,
          {
            transform: [{ translateY: Animated.add(slideAnim, pan) }],
          },
        ]}
      >
        <Text style={styles.text}>Working on it...</Text>
      </Animated.View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  drawer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.4,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BottomDrawer;
