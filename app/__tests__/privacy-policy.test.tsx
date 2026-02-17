import React from 'react';
import { render, screen } from '@testing-library/react-native';
import PrivacyPolicy from '../privacy-policy';

describe('PrivacyPolicy', () => {
  it('renders the app name', () => {
    render(<PrivacyPolicy />);
    expect(screen.getAllByText(/Halo/).length).toBeGreaterThan(0);
  });

  it('renders all 8 PIPA required section headings', () => {
    render(<PrivacyPolicy />);

    const requiredSections = [
      /1\. 개인정보의 처리 목적/,
      /2\. 처리하는 개인정보의 항목/,
      /3\. 개인정보의 처리 및 보유 기간/,
      /4\. 개인정보의 제3자 제공/,
      /5\. 개인정보의 파기 절차 및 방법/,
      /6\. 정보주체의 권리·의무 및 행사 방법/,
      /7\. 개인정보 보호책임자/,
      /8\. 시행일자/,
    ];

    for (const section of requiredSections) {
      expect(screen.getByText(section)).toBeTruthy();
    }
  });

  it('renders contact email', () => {
    render(<PrivacyPolicy />);
    expect(screen.getByText(/imcoldsurf@gmail\.com/)).toBeTruthy();
  });

  it('renders effective date', () => {
    render(<PrivacyPolicy />);
    expect(screen.getByText(/2026년 2월 15일/)).toBeTruthy();
  });

  it('states that no personal information is collected', () => {
    render(<PrivacyPolicy />);
    expect(screen.getByText(/수집하지 않습니다/)).toBeTruthy();
  });
});
