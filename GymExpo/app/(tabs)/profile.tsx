import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    ViewStyle,
    TextStyle,
    Alert,
    Modal
} from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TailwindStyles = {
    layout: Record<string, ViewStyle>;
    spacing: Record<string, ViewStyle>;
    text: Record<string, TextStyle>;
    rounded: Record<string, ViewStyle>;
    bg: Record<string, ViewStyle>;
    border: Record<string, ViewStyle>;
};

const tw: TailwindStyles = {
    layout: {
        flex1: { flex: 1 },
        itemsCenter: { alignItems: 'center' },
        justifyCenter: { justifyContent: 'center' },
        relative: { position: 'relative' },
        row: { flexDirection: 'row' },
        absolute: { position: 'absolute' },
    },
    spacing: {
        p4: { padding: 16 },
        py4: { paddingVertical: 16 },
        px4: { paddingHorizontal: 16 },
        mb4: { marginBottom: 16 },
        mt2: { marginTop: 8 },
        mt4: { marginTop: 16 },
        mt8: { marginTop: 32 },
        gap2: { gap: 8 },
        gap4: { gap: 16 },
    },
    text: {
        center: { textAlign: 'center' },
        lg: { fontSize: 16 },
        xl: { fontSize: 20 },
        '2xl': { fontSize: 24 },
        bold: { fontWeight: 'bold' },
        medium: { fontWeight: '500' },
        gray500: { color: '#6B7280' },
        red500: { color: '#EF4444' },
    },
    rounded: {
        full: { borderRadius: 999 },
        xl: { borderRadius: 16 },
        lg: { borderRadius: 12 },
    },
    bg: {
        dark: { backgroundColor: '#1c1c1c' },
        light: { backgroundColor: '#f0f0f0' },
        blue: { backgroundColor: '#3A9ADA' },
        red: { backgroundColor: '#EF4444' },
        white: { backgroundColor: '#FFFFFF' },
        gray: { backgroundColor: '#374151' },
    },
    border: {
        b1: { borderBottomWidth: 1 },
    },
} as const;

interface ProfileInfoItemProps {
    label: string;
    value: string | number;
    isLast?: boolean;
    onPress?: () => void;
}

const ProfileInfoItem: React.FC<ProfileInfoItemProps> = ({ label, value, isLast, onPress }) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                tw.spacing.py4,
                tw.spacing.px4,
                !isLast && tw.border.b1,
                { borderBottomColor: colorScheme === 'dark' ? '#2c2c2c' : '#e5e5e5' }
            ]}
        >
            <View style={[tw.layout.row, { justifyContent: 'space-between', alignItems: 'center' }]}>
                <View>
                    <ThemedText style={[tw.text.gray500, tw.text.lg] as TextStyle[]}>
                        {label}
                    </ThemedText>
                    <ThemedText style={[tw.text.xl, tw.text.bold, tw.spacing.mt2] as TextStyle[]}>
                        {value}
                    </ThemedText>
                </View>
                {/* <Image
                    source={require('../../assets/icons/Anders.png')}
                    style={{ width: 24, height: 24, opacity: onPress ? 1 : 0 }}
                /> */}
            </View>
        </TouchableOpacity>
    );
};

const LogoutConfirmModal: React.FC<{
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}> = ({ visible, onConfirm, onCancel }) => {
    const colorScheme = useColorScheme();

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <View style={styles.modalOverlay}>
                <View style={[
                    styles.modalContent,
                    colorScheme === 'dark' ? tw.bg.gray : tw.bg.white
                ]}>
                    <ThemedText style={[tw.text.xl, tw.text.bold, tw.spacing.mb4] as TextStyle[]}>
                        Log Out
                    </ThemedText>
                    <ThemedText style={[tw.text.lg, tw.spacing.mb4] as TextStyle[]}>
                        Are you sure you want to log out?
                    </ThemedText>
                    <View style={[tw.layout.row, tw.spacing.gap2]}>
                        <TouchableOpacity
                            style={[styles.modalButton, tw.bg.blue]}
                            onPress={onCancel}
                        >
                            <ThemedText style={[tw.text.medium, { color: '#fff' }] as TextStyle[]}>
                                Cancel
                            </ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalButton, tw.bg.red]}
                            onPress={onConfirm}
                        >
                            <ThemedText style={[tw.text.medium, { color: '#fff' }] as TextStyle[]}>
                                Log Out
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default function ProfileScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);

    const userInfo = {
        userName: 'UserName',
        subscriptionType: 'Type 1 abonnement',
        courses: 'Course 1',
        age: '22',
    };

    const handleLogout = () => {
        setLogoutModalVisible(true);
    };

    const confirmLogout = () => {
        setLogoutModalVisible(false);
        AsyncStorage.removeItem('auth');
        router.replace('/LandingsPage');
    };

    return (
        <ThemedView style={[tw.layout.flex1]}>
            <ScrollView
                style={tw.layout.flex1}
                showsVerticalScrollIndicator={false}
            >
                <View style={[tw.spacing.p4, tw.layout.itemsCenter]}>
                    <View style={[styles.profilePicContainer, colorScheme === 'dark' ? tw.bg.dark : tw.bg.light]}>
                        <Image
                            source={require('../../assets/icons/ProfielFoto.png')}
                            style={styles.profilePic}
                            resizeMode="cover"
                        />
                    </View>

                    <View style={[tw.layout.itemsCenter, tw.spacing.mt4]}>
                        <ThemedText style={[tw.text['2xl'], tw.text.bold] as TextStyle[]}>
                            {userInfo.userName}
                        </ThemedText>
                        <TouchableOpacity
                            style={[styles.editButton, tw.spacing.mt4]}
                            onPress={() => {
                            }}
                        >
                            <ThemedText style={[tw.text.medium, { color: '#fff' }] as TextStyle[]}>
                                Edit Profiel
                            </ThemedText>
                        </TouchableOpacity>
                    </View>

                    <View style={[
                        styles.infoContainer,
                        tw.spacing.mt4,
                        colorScheme === 'dark' ? tw.bg.dark : tw.bg.light,
                    ]}>
                        <ProfileInfoItem
                            label="Abonnement"
                            value={userInfo.subscriptionType}
                            onPress={() => {
                            }}
                        />
                        <ProfileInfoItem
                            label="Courses"
                            value={userInfo.courses}
                            onPress={() => {
                            }}
                        />
                        <ProfileInfoItem
                            label="Age"
                            value={userInfo.age}
                            onPress={() => {
                            }}
                            isLast
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.logoutButton, tw.spacing.mt8]}
                        onPress={handleLogout}
                    >
                        <Image
                            source={require('@/assets/icons/Uitloggen.png')}
                            style={styles.logoutIcon}
                        />
                        <ThemedText style={[tw.text.lg, tw.text.medium, tw.text.red500] as TextStyle[]}>
                            Log Out
                        </ThemedText>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <LogoutConfirmModal
                visible={logoutModalVisible}
                onConfirm={confirmLogout}
                onCancel={() => setLogoutModalVisible(false)}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    profilePicContainer: {
        marginTop: 45,
        width: 120,
        height: 120,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
    },
    profilePic: {
        width: '100%',
        height: '100%',
    },
    editPicButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    editIcon: {
        width: 16,
        height: 16,
        tintColor: '#FFFFFF',
    },
    editButton: {
        backgroundColor: '#3A9ADA',
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 20,
    },
    infoContainer: {
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    logoutIcon: {
        width: 24,
        height: 24,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        padding: 24,
        borderRadius: 16,
    },
    modalButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 12,
    },
});
