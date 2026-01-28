import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Saint } from '@/lib/types/saints';
import { SaintAvatar } from './SaintAvatar';
import { formatFeastDayKo } from '@/lib/utils/dateUtils';
import { formatYearRange } from '@/lib/utils/stringUtils';

interface SaintDetailProps {
  saint: Saint;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

export function SaintDetail({ saint, isFavorite, onFavoriteToggle }: SaintDetailProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <SaintAvatar initials={saint.initials} size="large" />
        <Text style={styles.nameKo}>{saint.nameKo}</Text>
        <Text style={styles.nameEn}>{saint.nameEn}</Text>
        {saint.nameLatin && (
          <Text style={styles.nameLatin}>{saint.nameLatin}</Text>
        )}
      </View>

      {/* Favorite Button */}
      <TouchableOpacity
        style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
        onPress={onFavoriteToggle}
        testID="favorite-toggle"
        accessibilityLabel={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        accessibilityRole="button"
      >
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          color={isFavorite ? '#ffffff' : '#ef4444'}
          testID={isFavorite ? 'favorite-filled' : 'favorite-outline'}
        />
        <Text style={[styles.favoriteText, isFavorite && styles.favoriteTextActive]}>
          {isFavorite ? '즐겨찾기됨' : '즐겨찾기 추가'}
        </Text>
      </TouchableOpacity>

      {/* Info Cards */}
      <View style={styles.infoSection}>
        {/* Feast Day */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="calendar" size={20} color="#0ea5e9" />
            <Text style={styles.infoLabel}>축일</Text>
          </View>
          <Text style={styles.infoValue}>
            {formatFeastDayKo(saint.feastMonth, saint.feastDay)}
          </Text>
        </View>

        {/* Life Years */}
        {(saint.birthYear || saint.deathYear) && (
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Ionicons name="time" size={20} color="#0ea5e9" />
              <Text style={styles.infoLabel}>생몰년</Text>
            </View>
            <Text style={styles.infoValue}>
              {formatYearRange(saint.birthYear, saint.deathYear)}
            </Text>
          </View>
        )}

        {/* Canonization Year */}
        {saint.canonizationYear && (
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Ionicons name="star" size={20} color="#0ea5e9" />
              <Text style={styles.infoLabel}>시성년도</Text>
            </View>
            <Text style={styles.infoValue}>{saint.canonizationYear}년</Text>
          </View>
        )}
      </View>

      {/* Patronages */}
      {saint.patronages.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>수호 분야</Text>
          <View style={styles.patronageList}>
            {saint.patronages.map((patronage, index) => (
              <View key={index} style={styles.patronageTag}>
                <Text style={styles.patronageText}>{patronage}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Biography */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>약력</Text>
        <Text style={styles.biography}>{saint.biography}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  nameKo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 16,
    textAlign: 'center',
  },
  nameEn: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
  },
  nameLatin: {
    fontSize: 14,
    color: '#9ca3af',
    fontStyle: 'italic',
    marginTop: 2,
    textAlign: 'center',
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ef4444',
    marginBottom: 24,
  },
  favoriteButtonActive: {
    backgroundColor: '#ef4444',
  },
  favoriteText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
  favoriteTextActive: {
    color: '#ffffff',
  },
  infoSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    gap: 12,
  },
  infoCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoLabel: {
    marginLeft: 6,
    fontSize: 12,
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  patronageList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  patronageTag: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  patronageText: {
    fontSize: 14,
    color: '#0369a1',
  },
  biography: {
    fontSize: 16,
    lineHeight: 26,
    color: '#374151',
  },
});
