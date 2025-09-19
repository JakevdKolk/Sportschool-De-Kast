import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text,
    Modal,
} from 'react-native';
import { ThemedView } from './components/ThemedView';
import { ThemedText } from './components/ThemedText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const subscriptions = [
    { id: 'basic', title: 'Basic', price: '€20 / maand', description: 'Toegang tot fitness en groepslessen.' },
    { id: 'premium', title: 'Premium', price: '€35 / maand', description: 'Inclusief sauna & zwembad.' },
    { id: 'unlimited', title: 'Unlimited', price: '€50 / maand', description: 'Onbeperkt sporten, all-in.' },
];

export default function SubscriptionScreen() {
    const [selected, setSelected] = useState<string | null>(null);
    const [pendingSelection, setPendingSelection] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const loadSubscription = async () => {
            const saved = await AsyncStorage.getItem('subscription');
            if (saved) {
                setSelected(saved);
            }
        };
        loadSubscription();
    }, []);

    const confirmSelection = async () => {
        if (pendingSelection) {
            await AsyncStorage.setItem('subscription', pendingSelection);
            setSelected(pendingSelection);
            setPendingSelection(null);
            setModalVisible(false);
            router.replace('/home');
        }
    };

    // Voeg dit toe bovenaan je component
    const cancelSubscription = async () => {
        await AsyncStorage.removeItem('subscription');
        setSelected(null);
        setPendingSelection(null);
        setModalVisible(false);
        router.replace('/home');
    };


    return (
        <ThemedView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <ThemedText style={styles.title}>Kies je abonnement</ThemedText>
                {subscriptions.map((sub) => {
                    const isSelected = selected === sub.id;
                    return (
                        <TouchableOpacity
                            key={sub.id}
                            style={[
                                styles.card,
                                isSelected && styles.cardSelected,
                            ]}
                            onPress={() => {
                                setPendingSelection(sub.id);
                                setModalVisible(true);
                            }}
                        >
                            <Text style={[styles.cardTitle, isSelected && styles.textSelected]}>
                                {sub.title}
                            </Text>
                            <Text style={[styles.cardPrice, isSelected && styles.textSelected]}>
                                {sub.price}
                            </Text>
                            <Text style={styles.cardDescription}>
                                {sub.description}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
                {selected && (
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: '#ff6b6b' }]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={[styles.cardTitle, { color: 'white' }]}>
                            Annuleer huidig abonnement
                        </Text>
                    </TouchableOpacity>
                )}

            </ScrollView>

            {/* Modal */}
            {/* <Modal
                transparent
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Bevestigen</Text>
                        <Text style={styles.modalText}>
                            Weet je zeker dat je dit abonnement wilt kiezen?
                        </Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Annuleren</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: '#3A9ADA' }]}
                                onPress={confirmSelection}
                            >
                                <Text style={[styles.modalButtonText, { color: 'white' }]}>
                                    Bevestigen
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal> */}
            <Modal
                transparent
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Bevestigen</Text>
                        <Text style={styles.modalText}>
                            {pendingSelection
                                ? 'Weet je zeker dat je dit abonnement wilt kiezen?'
                                : 'Weet je zeker dat je je huidige abonnement wilt annuleren?'}
                        </Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Annuleren</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    { backgroundColor: pendingSelection ? '#3A9ADA' : '#ff6b6b' },
                                ]}
                                onPress={pendingSelection ? confirmSelection : cancelSubscription}
                            >
                                <Text
                                    style={[
                                        styles.modalButtonText,
                                        { color: 'white' },
                                    ]}
                                >
                                    Bevestigen
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingVertical: 24,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 24,
        marginTop: 40,
    },
    card: {
        width: '90%',
        padding: 20,
        borderRadius: 16,
        backgroundColor: '#f5f5f5',
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    cardSelected: {
        backgroundColor: '#3A9ADA',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
    },
    cardPrice: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 14,
        textAlign: 'center',
        color: '#444',
    },
    textSelected: {
        color: '#fff',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        padding: 24,
        borderRadius: 16,
        backgroundColor: 'white',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 24,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
