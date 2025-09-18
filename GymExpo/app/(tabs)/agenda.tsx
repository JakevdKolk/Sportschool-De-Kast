import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

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

interface CalendarData {
    month: string;
    year: number;
    days: CalendarDay[];
}

export default function AgendaScreen() {
    const colorScheme = useColorScheme();
    const [selectedDate, setSelectedDate] = useState(18);
    const [currentMonth] = useState('September');

    const colors = Colors[colorScheme ?? 'light'];

    const calendarData: CalendarData = {
        month: 'September',
        year: 2024,
        days: [
            
            { day: 29, isCurrentMonth: false, isSelected: false, isToday: false },
            { day: 30, isCurrentMonth: false, isSelected: false, isToday: false },
            { day: 31, isCurrentMonth: false, isSelected: false, isToday: false },

            ...Array.from({ length: 30 }, (_, i) => ({
                day: i + 1,
                isCurrentMonth: true,
                isSelected: i + 1 === selectedDate,
                isToday: i + 1 === 18,
            })),
            // Next month days
            { day: 1, isCurrentMonth: false, isSelected: false, isToday: false },
            { day: 2, isCurrentMonth: false, isSelected: false, isToday: false },
        ],
    };

    const scheduleData: ScheduleItem[] = [
        {
            id: '1',
            title: 'Private lesson',
            subtitle: 'With Jake',
            startTime: '09:00',
            endTime: '10:00',
            type: 'lesson',
        },
        {
            id: '2',
            title: 'Daily Work out',
            subtitle: 'Push up 10x',
            startTime: '09:00',
            endTime: '10:00',
            type: 'workout',
        },
        {
            id: '3',
            title: 'Daily Run',
            subtitle: '10km run',
            startTime: '12:00',
            endTime: '13:00',
            type: 'run',
        },
        {
            id: '4',
            title: 'Daily Run',
            subtitle: '10km run',
            startTime: '12:00',
            endTime: '13:00',
            type: 'run',
        },
    ];

    const weekDays = ['Mon', 'Din', 'Woe', 'Don', 'Vrij', 'Zat', 'Zon'];

    const renderCalendarDay = (dayData: CalendarDay, index: number) => {
        const isSelected = dayData.isSelected;
        const isToday = dayData.isToday;

        return (
            <TouchableOpacity
                key={index}
                style={[
                    styles.calendarDay,
                    { backgroundColor: 'transparent' },
                    isSelected && { backgroundColor: colors.tint },
                    isToday && !isSelected && { backgroundColor: colors.background === '#000000' ? '#333333' : '#e0e0e0' },
                ]}
                onPress={() => setSelectedDate(dayData.day)}
            >
                <ThemedText
                    style={[
                        styles.calendarDayText,
                        !dayData.isCurrentMonth && { color: colors.tabIconDefault },
                        isSelected && { color: colorScheme === 'dark' ? '#ffffff' : '#000000', fontWeight: 'bold' },
                    ]}
                >
                    {dayData.day}
                </ThemedText>
            </TouchableOpacity>
        );
    };

    const renderScheduleItem = (item: ScheduleItem) => (
        <ThemedView key={item.id} style={[styles.scheduleItem, { backgroundColor: colors.background === '#000000' ? '#2a2a2a' : '#f5f5f5' }]}>
            <View style={styles.timeContainer}>
                <ThemedText style={styles.startTime}>{item.startTime}</ThemedText>
                <ThemedText style={[styles.endTime, { color: colors.tabIconDefault }]}>{item.endTime}</ThemedText>
            </View>
            <View style={styles.scheduleContent}>
                <ThemedText style={styles.scheduleTitle}>{item.title}</ThemedText>
                {item.subtitle && (
                    <ThemedText style={[styles.scheduleSubtitle, { color: colors.tabIconDefault }]}>{item.subtitle}</ThemedText>
                )}
            </View>
        </ThemedView>
    );

    return (
        <ThemedView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Calendar Section */}
                <ThemedView style={[styles.calendarContainer, { backgroundColor: colors.background === '#000000' ? '#2a2a2a' : '#f5f5f5' }]}>
                    <ThemedText type="subtitle" style={styles.monthTitle}>
                        {selectedDate} {calendarData.month}
                    </ThemedText>

                    {/* Week days header */}
                    <View style={styles.weekDaysContainer}>
                        {weekDays.map((day, index) => (
                            <ThemedText key={index} style={[styles.weekDay, { color: colors.tabIconDefault }]}>
                                {day}
                            </ThemedText>
                        ))}
                    </View>

                    {/* Calendar grid */}
                    <View style={styles.calendarGrid}>
                        {calendarData.days.map((dayData, index) =>
                            renderCalendarDay(dayData, index)
                        )}
                    </View>
                </ThemedView>

                {/* Schedule Section */}
                <ThemedView style={styles.scheduleContainer}>
                    <ThemedText type="subtitle" style={styles.scheduleDate}>
                        {selectedDate} {currentMonth}
                    </ThemedText>

                    {scheduleData.slice(0, 1).map((item) => renderScheduleItem(item))}

                    <ThemedText type="subtitle" style={styles.todayLabel}>Vandaag</ThemedText>

                    {scheduleData.slice(1).map((item) => renderScheduleItem(item))}
                </ThemedView>
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
    calendarContainer: {
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 12,
        padding: 16,
    },
    monthTitle: {
        marginBottom: 16,
    },
    weekDaysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    weekDay: {
        fontSize: 12,
        textAlign: 'center',
        width: 35,
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    calendarDay: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderRadius: 17.5,
    },
    calendarDayText: {
        fontSize: 14,
        fontWeight: '500',
    },
    scheduleContainer: {
        marginHorizontal: 16,
        marginTop: 16,
        paddingBottom: 100, // Add padding for tab bar
    },
    scheduleDate: {
        marginBottom: 16,
    },
    scheduleItem: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeContainer: {
        marginRight: 16,
        alignItems: 'flex-start',
    },
    startTime: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    endTime: {
        fontSize: 14,
        marginTop: 2,
    },
    scheduleContent: {
        flex: 1,
    },
    scheduleTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    scheduleSubtitle: {
        fontSize: 14,
    },
    todayLabel: {
        marginTop: 24,
        marginBottom: 16,
    },
});
