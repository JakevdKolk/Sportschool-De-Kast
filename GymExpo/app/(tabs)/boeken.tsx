import React, { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { View, ScrollView, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FormData {
    appointmentType: 'trainer' | 'course';
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    duration: string;
    trainer: string;
    course: string;
    experience: 'beginner' | 'intermediate' | 'advanced';
    goals: string;
    notes: string;
}

const screenWidth = Dimensions.get('window').width;

export default function AppointmentForm() {
    const [formData, setFormData] = useState<FormData>({
        appointmentType: 'trainer',
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        duration: '60',
        trainer: '',
        course: '',
        experience: 'beginner',
        goals: '',
        notes: ''
    });

    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTrainerPicker, setShowTrainerPicker] = useState(false);
    const [showCoursePicker, setShowCoursePicker] = useState(false);
    const [showDurationPicker, setShowDurationPicker] = useState(false);

    const trainers = [
        { id: 'jake', name: 'Jake - Strength Training' },
        { id: 'sarah', name: 'Sarah - Cardio & HIIT' },
        { id: 'mike', name: 'Mike - CrossFit' },
        { id: 'anna', name: 'Anna - Yoga & Flexibility' }
    ];

    const courses = [
        { id: 'beginners-fitness', name: 'Beginners Fitness Course' },
        { id: 'weight-loss', name: 'Weight Loss Program' },
        { id: 'strength-building', name: 'Strength Building Course' },
        { id: 'hiit-intensive', name: 'HIIT Intensive Course' }
    ];

    const timeSlots = [
        '08:00', '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
    ];

    const durations = [
        { value: '30', label: '30 minuten' },
        { value: '60', label: '60 minuten' },
        { value: '90', label: '90 minuten' }
    ];

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
            alert('Vul alle verplichte velden in');
            return;
        }

        if (formData.appointmentType === 'trainer' && !formData.trainer) {
            alert('Selecteer een personal trainer');
            return;
        }

        if (formData.appointmentType === 'course' && !formData.course) {
            alert('Selecteer een cursus');
            return;
        }

        try {
            // Get existing appointments
            const existing = await AsyncStorage.getItem('appointments');
            let appointments = existing ? JSON.parse(existing) : [];
            // Add new appointment
            appointments.push({ ...formData, id: Date.now() });
            await AsyncStorage.setItem('appointments', JSON.stringify(appointments));
            alert('Afspraak succesvol geboekt!');
        } catch (e) {
            alert('Fout bij opslaan van afspraak.');
        }
    };

    const getSelectedTrainerName = () => {
        const trainer = trainers.find(t => t.id === formData.trainer);
        return trainer ? trainer.name : 'Selecteer trainer';
    };

    const getSelectedCourseName = () => {
        const course = courses.find(c => c.id === formData.course);
        return course ? course.name : 'Selecteer cursus';
    };

    const getSelectedDurationLabel = () => {
        const duration = durations.find(d => d.value === formData.duration);
        return duration ? duration.label : '60 minuten';
    };

    return (
        <ThemedView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
                <ThemedView style={styles.headerContainer}>
                    <ThemedText type="subtitle" style={styles.headerTitle}>
                        Nieuwe Afspraak
                    </ThemedText>

                    <View style={styles.typeButtonContainer}>
                        <TouchableOpacity
                            onPress={() => handleInputChange('appointmentType', 'trainer')}
                            style={[
                                styles.typeButton,
                                formData.appointmentType === 'trainer' && styles.typeButtonSelected
                            ]}
                        >
                            <ThemedText style={[
                                styles.typeButtonText,
                                formData.appointmentType === 'trainer' && styles.typeButtonTextSelected
                            ]}>
                                Personal Trainer
                            </ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => handleInputChange('appointmentType', 'course')}
                            style={[
                                styles.typeButton,
                                formData.appointmentType === 'course' && styles.typeButtonSelected
                            ]}
                        >
                            <ThemedText style={[
                                styles.typeButtonText,
                                formData.appointmentType === 'course' && styles.typeButtonTextSelected
                            ]}>
                                Cursus
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                </ThemedView>

                <ThemedView style={styles.sectionContainer}>
                    <ThemedText style={styles.sectionTitle}>Persoonlijke Gegevens</ThemedText>

                    <TextInput
                        style={styles.textInput}
                        placeholder="Volledige naam"
                        placeholderTextColor="#aaa"
                        value={formData.name}
                        onChangeText={(text) => handleInputChange('name', text)}
                    />

                    <View style={styles.inputRow}>
                        <TextInput
                            style={[styles.textInput, styles.halfInput]}
                            placeholder="E-mail adres"
                            placeholderTextColor="#aaa"
                            keyboardType="email-address"
                            value={formData.email}
                            onChangeText={(text) => handleInputChange('email', text)}
                        />

                        <TextInput
                            style={[styles.textInput, styles.halfInput]}
                            placeholder="Telefoonnummer"
                            placeholderTextColor="#aaa"
                            keyboardType="phone-pad"
                            value={formData.phone}
                            onChangeText={(text) => handleInputChange('phone', text)}
                        />
                    </View>
                </ThemedView>

                <ThemedView style={styles.sectionContainer}>
                    <ThemedText style={styles.sectionTitle}>Datum & Tijd</ThemedText>

                    <View style={styles.inputRow}>
                        <TouchableOpacity
                            style={[styles.textInput, styles.halfInput, styles.pickerButton]}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <ThemedText style={styles.pickerButtonText}>
                                {formData.date || 'Selecteer datum'}
                            </ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.textInput, styles.halfInput, styles.pickerButton]}
                            onPress={() => setShowTimePicker(!showTimePicker)}
                        >
                            <ThemedText style={styles.pickerButtonText}>
                                {formData.time || 'Selecteer tijd'}
                            </ThemedText>
                        </TouchableOpacity>
                    </View>

                    {showDatePicker && (
                        <DateTimePicker
                            value={formData.date ? new Date(formData.date) : new Date()}
                            mode="date"
                            display="default"
                            onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                                setShowDatePicker(false);
                                if (selectedDate) {
                                    const year = selectedDate.getFullYear();
                                    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
                                    const day = String(selectedDate.getDate()).padStart(2, '0');
                                    handleInputChange('date', `${year}-${month}-${day}`);
                                }
                            }}
                            locale="nl-NL"
                        />
                    )}

                    {showTimePicker && (
                        <View style={styles.pickerContainer}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {timeSlots.map(time => (
                                    <TouchableOpacity
                                        key={time}
                                        onPress={() => {
                                            handleInputChange('time', time);
                                            setShowTimePicker(false);
                                        }}
                                        style={styles.pickerItem}
                                    >
                                        <ThemedText style={styles.pickerItemText}>{time}</ThemedText>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    <TouchableOpacity
                        style={[styles.textInput, styles.pickerButton]}
                        onPress={() => setShowDurationPicker(!showDurationPicker)}
                    >
                        <ThemedText style={styles.pickerButtonText}>
                            {getSelectedDurationLabel()}
                        </ThemedText>
                    </TouchableOpacity>

                    {showDurationPicker && (
                        <View style={styles.pickerContainer}>
                            {durations.map(duration => (
                                <TouchableOpacity
                                    key={duration.value}
                                    onPress={() => {
                                        handleInputChange('duration', duration.value);
                                        setShowDurationPicker(false);
                                    }}
                                    style={styles.pickerItem}
                                >
                                    <ThemedText style={styles.pickerItemText}>{duration.label}</ThemedText>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </ThemedView>

                <ThemedView style={styles.sectionContainer}>
                    <ThemedText style={styles.sectionTitle}>
                        {formData.appointmentType === 'trainer' ? 'Personal Trainer' : 'Cursus'}
                    </ThemedText>

                    <TouchableOpacity
                        style={[styles.textInput, styles.pickerButton]}
                        onPress={() => {
                            if (formData.appointmentType === 'trainer') {
                                setShowTrainerPicker(!showTrainerPicker);
                                setShowCoursePicker(false);
                            } else {
                                setShowCoursePicker(!showCoursePicker);
                                setShowTrainerPicker(false);
                            }
                        }}
                    >
                        <ThemedText style={styles.pickerButtonText}>
                            {formData.appointmentType === 'trainer' ? getSelectedTrainerName() : getSelectedCourseName()}
                        </ThemedText>
                    </TouchableOpacity>

                    {showTrainerPicker && formData.appointmentType === 'trainer' && (
                        <View style={styles.pickerContainer}>
                            {trainers.map(trainer => (
                                <TouchableOpacity
                                    key={trainer.id}
                                    onPress={() => {
                                        handleInputChange('trainer', trainer.id);
                                        setShowTrainerPicker(false);
                                    }}
                                    style={styles.pickerItem}
                                >
                                    <ThemedText style={styles.pickerItemText}>{trainer.name}</ThemedText>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {showCoursePicker && formData.appointmentType === 'course' && (
                        <View style={styles.pickerContainer}>
                            {courses.map(course => (
                                <TouchableOpacity
                                    key={course.id}
                                    onPress={() => {
                                        handleInputChange('course', course.id);
                                        setShowCoursePicker(false);
                                    }}
                                    style={styles.pickerItem}
                                >
                                    <ThemedText style={styles.pickerItemText}>{course.name}</ThemedText>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </ThemedView>

                <ThemedView style={styles.sectionContainer}>
                    <ThemedText style={styles.sectionTitle}>Ervaring</ThemedText>

                    <View style={styles.experienceButtonContainer}>
                        {[
                            { key: 'beginner', label: 'Beginner' },
                            { key: 'intermediate', label: 'Gemiddeld' },
                            { key: 'advanced', label: 'Gevorderd' }
                        ].map(level => (
                            <TouchableOpacity
                                key={level.key}
                                onPress={() => handleInputChange('experience', level.key as 'beginner' | 'intermediate' | 'advanced')}
                                style={[
                                    styles.experienceButton,
                                    formData.experience === level.key && styles.experienceButtonSelected
                                ]}
                            >
                                <ThemedText style={[
                                    styles.experienceButtonText,
                                    formData.experience === level.key && styles.experienceButtonTextSelected
                                ]}>
                                    {level.label}
                                </ThemedText>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ThemedView>

                <ThemedView style={styles.sectionContainer}>
                    <ThemedText style={styles.sectionTitle}>Doelen & Opmerkingen</ThemedText>

                    {/* <TextInput
                        style={[styles.textInput, styles.textArea]}
                        placeholder="Wat zijn je fitness doelen?"
                        placeholderTextColor="#aaa"
                        multiline
                        numberOfLines={3}
                        value={formData.goals}
                        onChangeText={(text) => handleInputChange('goals', text)}
                    /> */}

                    <TextInput
                        style={[styles.textInput, styles.textArea]}
                        placeholder="Extra opmerkingen of speciale wensen"
                        placeholderTextColor="#aaa"
                        multiline
                        numberOfLines={2}
                        value={formData.notes}
                        onChangeText={(text) => handleInputChange('notes', text)}
                    />
                </ThemedView>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <ThemedText style={styles.submitButtonText}>Afspraak Bevestigen</ThemedText>
                </TouchableOpacity>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 45,
        backgroundColor: '#000',
        paddingTop: 45,
        paddingHorizontal: 16,
    },
    headerContainer: {
        backgroundColor: '#252525',
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#eee',
        marginBottom: 16,
    },
    typeButtonContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    typeButton: {
        flex: 1,
        backgroundColor: '#1c1c1c',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
    },
    typeButtonSelected: {
        backgroundColor: '#3A9ADA',
    },
    typeButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#eee',
    },
    typeButtonTextSelected: {
        color: '#000',
        fontWeight: '600',
    },
    sectionContainer: {
        backgroundColor: '#000',
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#eee',
        marginBottom: 16,
    },
    textInput: {
        backgroundColor: '#1c1c1c',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#eee',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#555',
    },
    inputRow: {
        flexDirection: 'row',
        gap: 12,
    },
    halfInput: {
        flex: 1,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    pickerButton: {
        justifyContent: 'center',
    },
    pickerButtonText: {
        color: '#eee',
        fontSize: 16,
    },
    pickerContainer: {
        backgroundColor: '#1c1c1c',
        borderRadius: 12,
        padding: 8,
        marginBottom: 12,
        maxHeight: 150,
    },
    pickerItem: {
        padding: 12,
        borderRadius: 8,
        marginBottom: 4,
    },
    pickerItemText: {
        color: '#eee',
        fontSize: 16,
    },
    experienceButtonContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    experienceButton: {
        flex: 1,
        backgroundColor: '#1c1c1c',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
    },
    experienceButtonSelected: {
        backgroundColor: '#3A9ADA',
    },
    experienceButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#eee',
    },
    experienceButtonTextSelected: {
        color: '#000',
        fontWeight: '600',
    },
    submitButton: {
        backgroundColor: '#3A9ADA',
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        marginTop: 8,
    },
    submitButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
});
