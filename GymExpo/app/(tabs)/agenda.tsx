import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';

interface CalendarDay {
    day: number;
    isCurrentMonth: boolean;
    isSelected: boolean;
    isToday: boolean;
}

interface ScheduleItem {
    id: string;
    title: string;
    subtitle?: string;
    startTime: string;
    endTime: string;
    type: 'lesson' | 'workout' | 'run';
}

const screenWidth = Dimensions.get('window').width;
const daySize = (screenWidth - 64) / 7;

export default function AgendaScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const [selectedDate, setSelectedDate] = useState(18);
    const [currentMonth] = useState('September');

    const calendarDays: CalendarDay[] = [
        { day: 29, isCurrentMonth: false, isSelected: false, isToday: false },
        { day: 30, isCurrentMonth: false, isSelected: false, isToday: false },
        ...Array.from({ length: 30 }, (_, i) => ({
            day: i + 1,
            isCurrentMonth: true,
            isSelected: i + 1 === selectedDate,
            isToday: i + 1 === 18,
        })),
        { day: 1, isCurrentMonth: false, isSelected: false, isToday: false },
        { day: 2, isCurrentMonth: false, isSelected: false, isToday: false },
    ];

    const scheduleData: ScheduleItem[] = [
        { id: '1', title: 'Private Lesson', subtitle: 'With Jake', startTime: '09:00', endTime: '10:00', type: 'lesson' },
        { id: '2', title: 'Daily Workout', subtitle: 'Push up 10x', startTime: '10:00', endTime: '10:30', type: 'workout' },
        { id: '3', title: 'Daily Run', subtitle: '10km run', startTime: '12:00', endTime: '13:00', type: 'run' },
        { id: '4', title: 'Stretching', subtitle: 'Full body', startTime: '18:00', endTime: '18:30', type: 'workout' },
    ];

    const weekDays = ['Mon', 'Din', 'Woe', 'Don', 'Vrij', 'Zat', 'Zon'];

    const renderCalendarDay = (day: CalendarDay, index: number) => {
        const isSelected = day.isSelected;
        const isToday = day.isToday;

        return (
            <TouchableOpacity
                key={index}
                onPress={() => setSelectedDate(day.day)}
                style={[
                    styles.calendarDay,
                    {
                        width: daySize,
                        height: daySize,
                        borderRadius: daySize / 2,
                        backgroundColor: isSelected
                            ? '#3A9ADA'
                            : isToday
                                ? colorScheme === 'dark'
                                    ? '#555'
                                    : '#ddd'
                                : 'transparent',
                    },
                ]}
            >
                <ThemedText
                    style={[
                        styles.calendarDayText,
                        !day.isCurrentMonth && { color: colors.tabIconDefault },
                        isSelected && { color: '#000', fontWeight: '700', fontSize: 14 },
                    ]}
                >
                    {day.day}
                </ThemedText>
            </TouchableOpacity>
        );
    };

    const renderScheduleItem = (item: ScheduleItem) => (
        <ThemedView
            key={item.id}
            style={[
                styles.scheduleItem,
                { backgroundColor: colorScheme === 'dark' ? '#1c1c1c' : '#f0f0f0' },
            ]}
        >
            <View style={styles.timeContainer}>
                <ThemedText style={styles.startTime}>{item.startTime}</ThemedText>
                <ThemedText style={[styles.endTime, { color: colors.tabIconDefault }]}>{item.endTime}</ThemedText>
            </View>
            <View style={styles.scheduleContent}>
                <ThemedText style={styles.scheduleTitle}>{item.title}</ThemedText>
                {item.subtitle && (
                    <ThemedText style={[styles.scheduleSubtitle, { color: colors.tabIconDefault }]}>
                        {item.subtitle}
                    </ThemedText>
                )}
            </View>
        </ThemedView>
    );

    return (
        <ThemedView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
                <ThemedView style={[styles.calendarContainer, { backgroundColor: colorScheme === 'dark' ? '#252525' : '#f8f8f8', paddingTop: 32 }]}>
                    <ThemedText type="subtitle" style={[styles.monthTitle, { color: colorScheme === 'dark' ? '#eee' : '#333' }]}>
                        {selectedDate} {currentMonth}
                    </ThemedText>

                    <View style={styles.weekDaysContainer}>
                        {weekDays.map((day, i) => (
                            <ThemedText
                                key={i}
                                style={[styles.weekDay, { color: colorScheme === 'dark' ? '#aaa' : '#555' }]}
                            >
                                {day}
                            </ThemedText>
                        ))}
                    </View>

                    <View style={styles.calendarGrid}>{calendarDays.map(renderCalendarDay)}</View>
                </ThemedView>

                <ThemedView style={[
                    styles.scheduleContainer,
                    { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff', borderRadius: 14, padding: 16 }
                ]}>
                    <ThemedText type="subtitle" style={[styles.scheduleDate, { color: colorScheme === 'dark' ? '#eee' : '#333' }]}>
                        {selectedDate} {currentMonth}
                    </ThemedText>

                    {scheduleData.slice(0, 1).map(renderScheduleItem)}

                    <ThemedText
                        type="subtitle"
                        style={[styles.todayLabel, { color: colorScheme === 'dark' ? '#ccc' : '#777' }]}
                    >
                        Vandaag
                    </ThemedText>

                    {scheduleData.slice(1).map(renderScheduleItem)}
                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, marginTop: 45 },
    calendarContainer: { margin: 16, borderRadius: 14, padding: 16 },
    monthTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
    weekDaysContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    weekDay: { fontSize: 12, textAlign: 'center', width: (screenWidth - 64) / 7 },
    calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    calendarDay: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    calendarDayText: { fontSize: 12, fontWeight: '500' },
    scheduleContainer: { marginHorizontal: 16, marginTop: 16 },
    scheduleDate: { fontSize: 16, fontWeight: '600', marginBottom: 16 },
    scheduleItem: { borderRadius: 12, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
    timeContainer: { marginRight: 16, alignItems: 'flex-start' },
    startTime: { fontSize: 16, fontWeight: 'bold' },
    endTime: { fontSize: 14, marginTop: 2 },
    scheduleContent: { flex: 1 },
    scheduleTitle: { fontSize: 16, fontWeight: '600', marginBottom: 2 },
    scheduleSubtitle: { fontSize: 14 },
    todayLabel: { marginTop: 24, marginBottom: 12, fontSize: 14, fontWeight: '500' },
});
