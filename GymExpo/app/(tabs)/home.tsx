import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Animated,
    Easing,
    ViewStyle,
    TextStyle
} from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';

type TailwindStyles = {
    layout: Record<string, ViewStyle>;
    spacing: Record<string, ViewStyle>;
    text: Record<string, TextStyle>;
    rounded: Record<string, ViewStyle>;
    bg: Record<string, ViewStyle>;
    opacity: Record<string, ViewStyle>;
};

const tw: TailwindStyles = {
    layout: {
        flex1: { flex: 1 },
        itemsCenter: { alignItems: 'center' },
        justifyCenter: { justifyContent: 'center' },
        relative: { position: 'relative' },
        absolute: { position: 'absolute' },
        row: { flexDirection: 'row' },
    },

    spacing: {
        p4: { padding: 16 },
        py8: { paddingVertical: 32 },
        mb3: { marginBottom: 12 },
        mb4: { marginBottom: 16 },
        mt10: { marginTop: 40 },
        gap3: { gap: 12 },
    },

    text: {
        center: { textAlign: 'center' },
        lg: { fontSize: 16 },
        xl: { fontSize: 20 },
        '2xl': { fontSize: 24 },
        '3xl': { fontSize: 28 },
        bold: { fontWeight: 'bold' },
        semibold: { fontWeight: '600' },
        gray500: { color: '#6B7280' },
    },

    rounded: {
        lg: { borderRadius: 12 },
        xl: { borderRadius: 16 },
        full: { borderRadius: 999 },
    },

    bg: {
        transparent: { backgroundColor: 'transparent' },
        dark: { backgroundColor: '#1c1c1c' },
        light: { backgroundColor: '#f0f0f0' },
    },

    opacity: {
        70: { opacity: 0.7 },
    },
} as const;

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 48) / 2;

interface StatCircle {
    value: number;
    maxValue: number;
    label: string;
    color: string;
    unit: string;
}

interface AppointmentItemProps {
    time: string;
    date: string;
    colorScheme: string | null | undefined;
    colors: any;
}

type TextStyles = {
    [K in keyof TailwindStyles['text']]: TextStyle;
};

type ViewStyles = {
    [K in keyof TailwindStyles['spacing'] | keyof TailwindStyles['layout']]: ViewStyle;
};

const AppointmentItem: React.FC<AppointmentItemProps> = ({ time, date, colorScheme, colors }) => (
    <TouchableOpacity
        style={[
            tw.rounded.lg,
            tw.spacing.p4,
            tw.spacing.mb3,
            colorScheme === 'dark' ? tw.bg.dark : tw.bg.light,
            tw.layout.row,
            tw.layout.itemsCenter,
            { justifyContent: 'space-between' }
        ]}
    >
        <View style={tw.layout.flex1}>
            <ThemedText style={[tw.text.lg, tw.text.semibold] as TextStyle[]}>{time}</ThemedText>
            <ThemedText style={[tw.text.gray500] as TextStyle[]}>{date}</ThemedText>
        </View>
        <View
            style={[
                tw.rounded.full,
                { width: 8, height: 8, backgroundColor: '#3A9ADA', marginLeft: 12 }
            ]}
        />
    </TouchableOpacity>
);

export default function HomeScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const [statsData] = useState<StatCircle[]>([
        {
            value: 300,
            maxValue: 2500,
            label: 'Calories',
            color: '#3A9ADA',
            unit: 'kcal'
        },
        {
            value: 22,
            maxValue: 30,
            label: 'Exercise',
            color: '#9FE870',
            unit: 'min'
        },
        {
            value: 1800,
            maxValue: 2500,
            label: 'Steps',
            color: '#FF9F45',
            unit: 'steps'
        },
        {
            value: 6,
            maxValue: 8,
            label: 'Sleep',
            color: '#B4A7FF',
            unit: 'hr'
        }
    ]);

    const renderExerciseCard = (
        value: string,
        label: string,
        progress?: number,
        remaining?: string
    ) => (
        <TouchableOpacity
            style={[
                styles.exerciseCard,
                { backgroundColor: colorScheme === 'dark' ? '#1c1c1c' : '#f0f0f0' }
            ]}
        >
            {progress !== undefined && (
                <View style={styles.progressContainer}>
                    <View style={[
                        styles.progressRing,
                        {
                            borderColor: colorScheme === 'dark' ? '#2c2c2c' : '#e0e0e0',
                        }
                    ]}>
                        <View style={[
                            styles.progressFill,
                            {
                                borderColor: '#3A9ADA',
                                transform: [{ rotate: `${progress * 3.6}deg` }]
                            }
                        ]} />
                        <ThemedText style={styles.progressText}>{progress}%</ThemedText>
                    </View>
                </View>
            )}
            <View style={styles.exerciseInfo}>
                <ThemedText style={styles.exerciseValue}>{value}</ThemedText>
                <ThemedText
                    style={[
                        styles.exerciseLabel,
                        { color: colors.tabIconDefault }
                    ]}
                >
                    {label}
                </ThemedText>
                {remaining && (
                    <ThemedText
                        style={[
                            styles.remainingText,
                            { color: colors.tabIconDefault }
                        ]}
                    >
                        Remaining: {remaining}
                    </ThemedText>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <ThemedView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={[tw.spacing.p4]}>
                    <ThemedText
                        style={[
                            tw.text.xl,
                            tw.text.bold,
                            { marginBottom: 16, marginTop: 40 }
                        ] as TextStyle[]}
                    >
                        Opkomende Afspraken
                    </ThemedText>
                    <AppointmentItem
                        time="09:00"
                        date="Sat 19 Okt"
                        colorScheme={colorScheme}
                        colors={colors}
                    />
                    <AppointmentItem
                        time="12:00"
                        date="Vri 23 Okt"
                        colorScheme={colorScheme}
                        colors={colors}
                    />
                    <AppointmentItem
                        time="12:00"
                        date="Di 3 Nov"
                        colorScheme={colorScheme}
                        colors={colors}
                    />
                </View>

                <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>Daily Progress</ThemedText>
                    <View style={styles.exercisesGrid}>
                        {statsData.map((stat, index) => {
                            const progress = (stat.value / stat.maxValue) * 100;
                            return (
                                <View
                                    key={stat.label}
                                    style={[
                                        styles.exerciseCard,
                                        {
                                            backgroundColor: colorScheme === 'dark' ? '#1c1c1c' : '#f0f0f0',
                                        }
                                    ]}
                                >
                                    <View style={styles.progressContainer}>
                                        <View style={[
                                            styles.progressRing,
                                            { borderColor: colorScheme === 'dark' ? '#2c2c2c' : '#e0e0e0' }
                                        ]}>
                                            <View style={[
                                                styles.progressBackground,
                                                {
                                                    borderColor: colorScheme === 'dark' ? '#2c2c2c' : '#e0e0e0',
                                                }
                                            ]} />
                                            <View
                                                style={[
                                                    styles.progressFill,
                                                    {
                                                        borderColor: stat.color,
                                                        transform: [{
                                                            // Start at -90 degrees (top) and rotate based on progress
                                                            rotate: `${-90 + (3.6 * progress)}deg`
                                                        }]
                                                    }
                                                ]}
                                            />
                                            <View style={styles.progressContent}>
                                                <ThemedText style={styles.progressText}>
                                                    {stat.value}
                                                </ThemedText>
                                                <ThemedText style={[styles.progressUnit, { color: stat.color }]}>
                                                    {stat.unit}
                                                </ThemedText>
                                            </View>
                                        </View>
                                    </View>
                                    <ThemedText style={styles.exerciseLabel}>
                                        {stat.label}
                                    </ThemedText>
                                    <ThemedText style={[styles.remainingText, { color: colors.tabIconDefault }]}>
                                        {Math.round(progress)}% of goal
                                    </ThemedText>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 32,
    },
    section: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 45
    },
    appointmentItem: {
        flexDirection: 'row',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    appointmentContent: {
        flex: 1,
    },
    appointmentTime: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    appointmentDate: {
        fontSize: 14,
    },
    appointmentIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 12,
    },
    exercisesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    exerciseCard: {
        width: cardWidth,
        borderRadius: 16,
        padding: 16,
        aspectRatio: 1,
    },
    progressContainer: {
        alignItems: 'center',
        marginBottom: 12,
    },
    progressRing: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 8,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: 'transparent',
    },
    progressBackground: {
        position: 'absolute',
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 8,
        borderColor: 'transparent',
        transform: [{ rotate: '-90deg' }],
    },
    progressFill: {
        position: 'absolute',
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 8,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        transform: [{ rotate: '-90deg' }],
    },
    progressContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    progressUnit: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        color: '#666',
    },
    exerciseInfo: {
        alignItems: 'center',
    },
    exerciseValue: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    exerciseLabel: {
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 4,
    },
    remainingText: {
        fontSize: 13,
        textAlign: 'center',
        opacity: 0.7,
    },
    exerciseIcon: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
        marginBottom: 8,
    },
});
