import BackgroundComp from '@/components/BackgroundComp';
import TextComp from '@/components/TextComp';
import React from 'react';
import { StyleSheet, View, ScrollView, Pressable, Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { router } from 'expo-router';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' }, {text: 'Logout', style: 'destructive', onPress: async () => {
            await dispatch(logout());
            router.replace('/Welcome');
          },
        },
      ]
    );
  };

  if (!user) {
    return (
      <BackgroundComp>
        <TextComp>No user data available</TextComp>
      </BackgroundComp>
    );
  }

  return (
    <BackgroundComp>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TextComp style={styles.title}>My Profile</TextComp>
        </View>

        <View style={styles.infoSection}>
          <TextComp style={styles.label}>Name</TextComp>
          <TextComp style={styles.value}>{user.name}</TextComp>
        </View>

        <View style={styles.infoSection}>
          <TextComp style={styles.label}>Email</TextComp>
          <TextComp style={styles.value}>{user.email}</TextComp>
        </View>

        {user.phone && (
          <View style={styles.infoSection}>
            <TextComp style={styles.label}>Phone</TextComp>
            <TextComp style={styles.value}>{user.phone}</TextComp>
          </View>
        )}

        {user.address && (
          <View style={styles.infoSection}>
            <TextComp style={styles.label}>Address</TextComp>
            <TextComp style={styles.value}>{user.address}</TextComp>
          </View>
        )}

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <TextComp style={styles.logoutText}>Logout</TextComp>
        </Pressable>
      </ScrollView>
    </BackgroundComp>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff9a03',
  },
  infoSection: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProfilePage;